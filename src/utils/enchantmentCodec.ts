/**
 * Enchantment Codec — encodes/decodes the enchantment altar state into a compact,
 * URL-safe string using binary packing + lz-string compression.
 *
 * Encoding format (v1):
 *   Byte 0: version (1)
 *   Then bit-packed fields:
 *     - 1 bit: equipment type (0=Weapon, 1=Worn)
 *     - 3 bits: soul gem index (0-4)
 *     - 4 bits: effect count (0-15)
 *     - Per effect:
 *       - 7 bits: effect definition index (into spellEffectDefinitions array)
 *       - 7 bits: magnitude (0-127)
 *       - 7 bits: area (0-127)
 *       - 7 bits: duration (0-127)
 *       - 1 bit: has attribute flag
 *       - if set: 3 bits attribute index (0-7)
 *       - 1 bit: has skill flag
 *       - if set: 5 bits skill index (0-20)
 *       - 1 bit: has lock level flag
 *       - if set: 3 bits lock level index (0-4)
 *
 * Encoding format (v2): all of v1, plus after all effects:
 *   - 1 bit: has name flag
 *   - if set: 7 bits name length, then (length × 7) bits of 7-bit ASCII chars
 */

import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

import {
  type SpellEffect,
  type Attribute,
  type Skill,
  type LockLevel,
  type EquipmentType,
  spellEffectDefinitions,
  attributes,
  skills as allSkills,
  lockLevels,
  getMagickaCost,
  spellEffectDefinitionById,
} from '@/utils/spellEffectUtils';

import { type SoulGem, soulGems } from '@/utils/enchantmentUtils';

const CODEC_VERSION = 2;
const MAX_ITEM_NAME_LENGTH = 64;

const equipmentTypes: EquipmentType[] = ['Weapon', 'Worn'];

// Build lookup maps for fast encoding
const effectIndexById: Record<string, number> = {};
for (let i = 0; i < spellEffectDefinitions.length; i++) {
  effectIndexById[spellEffectDefinitions[i].id] = i;
}

// ─── Bit Writer / Reader ────────────────────────────────────────────────────

class BitWriter {
  private buffer: number[] = [];
  private currentByte = 0;
  private bitPos = 0;

  writeBits(value: number, numBits: number): void {
    for (let i = numBits - 1; i >= 0; i--) {
      const bit = (value >> i) & 1;
      this.currentByte = (this.currentByte << 1) | bit;
      this.bitPos++;
      if (this.bitPos === 8) {
        this.buffer.push(this.currentByte);
        this.currentByte = 0;
        this.bitPos = 0;
      }
    }
  }

  toUint8Array(): Uint8Array {
    const result = [...this.buffer];
    if (this.bitPos > 0) {
      result.push(this.currentByte << (8 - this.bitPos));
    }
    return new Uint8Array(result);
  }
}

class BitReader {
  private data: Uint8Array;
  private bytePos = 0;
  private bitPos = 0;

  constructor(data: Uint8Array) {
    this.data = data;
  }

  readBits(numBits: number): number {
    let value = 0;
    for (let i = 0; i < numBits; i++) {
      const byte = this.data[this.bytePos];
      const bit = (byte >> (7 - this.bitPos)) & 1;
      value = (value << 1) | bit;
      this.bitPos++;
      if (this.bitPos === 8) {
        this.bytePos++;
        this.bitPos = 0;
      }
    }
    return value;
  }
}

// ─── Types ──────────────────────────────────────────────────────────────────

export interface EnchantmentData {
  equipmentType: EquipmentType;
  soulGem: SoulGem;
  effects: SpellEffect[];
  name?: string;
}

// ─── Encode ─────────────────────────────────────────────────────────────────

export function encodeEnchantment(data: EnchantmentData): string {
  const writer = new BitWriter();

  // Version (8 bits)
  writer.writeBits(CODEC_VERSION, 8);

  // Equipment type (1 bit: 0=Weapon, 1=Worn)
  writer.writeBits(equipmentTypes.indexOf(data.equipmentType), 1);

  // Soul gem (3 bits, index into soulGems array)
  const soulGemIdx = soulGems.indexOf(data.soulGem);
  writer.writeBits(soulGemIdx >= 0 ? soulGemIdx : 4, 3); // default to Grand (index 4)

  // Effect count (4 bits, max 15)
  const count = Math.min(data.effects.length, 15);
  writer.writeBits(count, 4);

  // Per effect
  for (let i = 0; i < count; i++) {
    const effect = data.effects[i];

    // Effect definition index (7 bits)
    const effectIdx = effectIndexById[effect.id] ?? 0;
    writer.writeBits(effectIdx, 7);

    // Magnitude (7 bits, 0-127)
    writer.writeBits(Math.min(effect.magnitude, 127), 7);

    // Area (7 bits, 0-127)
    writer.writeBits(Math.min(effect.area, 127), 7);

    // Duration (7 bits, 0-127)
    writer.writeBits(Math.min(effect.duration, 127), 7);

    // Attribute (1 flag bit + 3 index bits if set)
    if (effect.attribute) {
      writer.writeBits(1, 1);
      const attrIdx = attributes.indexOf(effect.attribute);
      writer.writeBits(attrIdx >= 0 ? attrIdx : 0, 3);
    } else {
      writer.writeBits(0, 1);
    }

    // Skill (1 flag bit + 5 index bits if set)
    if (effect.skill) {
      writer.writeBits(1, 1);
      const skillIdx = allSkills.indexOf(effect.skill);
      writer.writeBits(skillIdx >= 0 ? skillIdx : 0, 5);
    } else {
      writer.writeBits(0, 1);
    }

    // Lock level (1 flag bit + 3 index bits if set)
    if (effect.lockLevel) {
      writer.writeBits(1, 1);
      const lockIdx = lockLevels.indexOf(effect.lockLevel);
      writer.writeBits(lockIdx >= 0 ? lockIdx : 0, 3);
    } else {
      writer.writeBits(0, 1);
    }
  }

  // Name (v2: 1 flag bit, then 7-bit length + 7 bits per ASCII char)
  const rawName = (data.name ?? '').slice(0, MAX_ITEM_NAME_LENGTH);
  const name = rawName.replace(/[^\x20-\x7E]/g, '');
  if (name.length > 0) {
    writer.writeBits(1, 1);
    writer.writeBits(name.length, 7);
    for (let i = 0; i < name.length; i++) {
      writer.writeBits(name.charCodeAt(i), 7);
    }
  } else {
    writer.writeBits(0, 1);
  }

  // Compress
  const bytes = writer.toUint8Array();
  const binaryString = String.fromCharCode.apply(null, Array.from(bytes));
  return compressToEncodedURIComponent(binaryString);
}

// ─── Decode ─────────────────────────────────────────────────────────────────

export function decodeEnchantment(code: string): EnchantmentData | null {
  try {
    const binaryString = decompressFromEncodedURIComponent(code);
    if (!binaryString) return null;

    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const reader = new BitReader(bytes);

    // Version
    const version = reader.readBits(8);
    if (version !== 1 && version !== 2) return null;

    // Equipment type
    const equipmentTypeIdx = reader.readBits(1);
    const equipmentType: EquipmentType = equipmentTypes[equipmentTypeIdx] ?? 'Weapon';

    // Soul gem
    const soulGemIdx = reader.readBits(3);
    const soulGem: SoulGem = soulGems[soulGemIdx] ?? 'Grand';

    // Effect count
    const count = reader.readBits(4);

    // Effects
    const effects: SpellEffect[] = [];
    for (let i = 0; i < count; i++) {
      // Effect definition index
      const effectIdx = reader.readBits(7);
      if (effectIdx >= spellEffectDefinitions.length) return null;
      const definition = spellEffectDefinitions[effectIdx];

      // Magnitude
      const magnitude = reader.readBits(7);

      // Area
      const area = reader.readBits(7);

      // Duration
      const duration = reader.readBits(7);

      // Attribute
      const hasAttribute = reader.readBits(1);
      let attribute: Attribute | undefined;
      if (hasAttribute) {
        const attrIdx = reader.readBits(3);
        attribute = attributes[attrIdx];
      }

      // Skill
      const hasSkill = reader.readBits(1);
      let skill: Skill | undefined;
      if (hasSkill) {
        const skillIdx = reader.readBits(5);
        skill = allSkills[skillIdx];
      }

      // Lock level
      const hasLockLevel = reader.readBits(1);
      let lockLevel: LockLevel | undefined;
      if (hasLockLevel) {
        const lockIdx = reader.readBits(3);
        lockLevel = lockLevels[lockIdx];
      }

      // Recalculate magickaCost from the definition and decoded values
      const magickaCost = getMagickaCost({
        baseCost: spellEffectDefinitionById[definition.id].baseCost,
        isLevelBasedMagnitude: spellEffectDefinitionById[definition.id].isLevelBasedMagnitude,
        magnitude,
        area,
        duration,
      });

      effects.push({
        id: definition.id,
        magnitude,
        area,
        duration,
        magickaCost,
        ...(attribute && { attribute }),
        ...(skill && { skill }),
        ...(lockLevel && { lockLevel }),
      });
    }

    // Name (v2 only)
    let name: string | undefined;
    if (version === 2) {
      const hasName = reader.readBits(1);
      if (hasName) {
        const nameLength = reader.readBits(7);
        let decoded = '';
        for (let i = 0; i < nameLength; i++) {
          decoded += String.fromCharCode(reader.readBits(7));
        }
        name = decoded;
      }
    }

    return { equipmentType, soulGem, effects, ...(name !== undefined && { name }) };
  } catch {
    return null;
  }
}
