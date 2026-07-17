import { spellEffectDefinitionById, type Attribute, type Skill, type SpellEffectDefinitionId } from '@/utils/spellEffectUtils';

// ─── Tier Types ──────────────────────────────────────────────────────────────

export type SigilStoneTier =
  | 'Descendent'
  | 'Subjacent'
  | 'Latent'
  | 'Ascendent'
  | 'Transcendent';

export const sigilStoneTiers: SigilStoneTier[] = [
  'Descendent',
  'Subjacent',
  'Latent',
  'Ascendent',
  'Transcendent',
];

// ─── Sigil Stone Definition ──────────────────────────────────────────────────

export type SigilStoneTierMagnitudes = [number, number, number, number, number];

export type SigilStoneDefinition = {
  /** Unique ID for this stone pairing */
  id: string;
  /** The offensive effect, applied when enchanting a weapon */
  weaponEffectId: SpellEffectDefinitionId;
  /**
   * Values for the primary parameter for each tier (Descendent → Transcendent).
   * For most effects this is Magnitude; for Silence/Soul Trap it is Duration.
   */
  weaponValues: SigilStoneTierMagnitudes;
  /**
   * UOP/Remastered-corrected weapon values. Only present on stones that had
   * a bugged progression in the vanilla game.
   */
  weaponValuesPatched?: SigilStoneTierMagnitudes;
  /**
   * If true, weaponValues represent Durations rather than Magnitudes.
   * Used for Silence and Soul Trap whose sigil stone values are durations.
   */
  weaponValueIsDuration?: boolean;
  /**
   * Fixed duration (in seconds) used alongside weaponValues for timed magnitude effects
   * such as Absorb Attribute (30s), Demoralize (20s), Turn Undead (20-30s).
   * Not used when weaponValueIsDuration is true.
   */
  weaponFixedDuration?: number;
  /** Specific attribute for the weapon effect (e.g. 'Agility' for Absorb Agility) */
  weaponAttribute?: Attribute;
  /** Specific skill for the weapon effect */
  weaponSkill?: Skill;
  /** The defensive effect, applied when enchanting armor/clothing */
  wornEffectId: SpellEffectDefinitionId;
  /** Magnitudes for each tier (Descendent → Transcendent) */
  wornMagnitudes: SigilStoneTierMagnitudes;
  /**
   * UOP/Remastered-corrected worn magnitudes. Only present on stones that had
   * a bugged progression in the vanilla game.
   */
  wornMagnitudesPatched?: SigilStoneTierMagnitudes;
  /** Specific attribute for the worn effect (e.g. 'Agility' for Fortify Agility) */
  wornAttribute?: Attribute;
  /** Specific skill for the worn effect */
  wornSkill?: Skill;
};

// ─── Stone Data (sourced from UESP: https://en.uesp.net/wiki/Oblivion:Sigil_Stone) ──

export const sigilStoneDefinitions: SigilStoneDefinition[] = [
  // Absorb Agility / Fortify Agility
  {
    id: 'absorb-agility',
    weaponEffectId: 'ABAT',
    weaponValues: [5, 10, 15, 20, 25],
    weaponFixedDuration: 30,
    weaponAttribute: 'Agility',
    wornEffectId: 'FOAT',
    wornMagnitudes: [7, 8, 9, 10, 12],
    wornAttribute: 'Agility',
  },
  // Absorb Endurance / Resist Disease
  {
    id: 'absorb-endurance',
    weaponEffectId: 'ABAT',
    weaponValues: [5, 10, 15, 20, 25],
    weaponFixedDuration: 30,
    weaponAttribute: 'Endurance',
    wornEffectId: 'RSDI', // Resist Disease
    wornMagnitudes: [15, 25, 35, 45, 50],
  },
  // Absorb Fatigue / Fortify Fatigue
  {
    id: 'absorb-fatigue',
    weaponEffectId: 'ABFA', // Absorb Fatigue
    weaponValues: [10, 20, 30, 40, 50],
    wornEffectId: 'FOFA', // Fortify Fatigue
    wornMagnitudes: [10, 20, 30, 40, 50],
  },
  // Absorb Health / Fortify Health
  {
    id: 'absorb-health',
    weaponEffectId: 'ABHE', // Absorb Health
    weaponValues: [5, 10, 15, 20, 25],
    wornEffectId: 'FOHE', // Fortify Health
    wornMagnitudes: [10, 15, 20, 25, 30],
  },
  // Absorb Intelligence / Fortify Intelligence
  {
    id: 'absorb-intelligence',
    weaponEffectId: 'ABAT',
    weaponValues: [5, 10, 15, 20, 25],
    weaponFixedDuration: 30,
    weaponAttribute: 'Intelligence',
    wornEffectId: 'FOAT',
    wornMagnitudes: [7, 8, 9, 10, 12],
    wornAttribute: 'Intelligence',
  },
  // Absorb Magicka / Fortify Magicka
  {
    id: 'absorb-magicka',
    weaponEffectId: 'ABSP', // Absorb Magicka
    weaponValues: [10, 20, 30, 40, 50],
    wornEffectId: 'FOSP', // Fortify Magicka
    wornMagnitudes: [10, 20, 30, 40, 50],
  },
  // Absorb Speed / Fortify Speed
  {
    id: 'absorb-speed',
    weaponEffectId: 'ABAT',
    weaponValues: [5, 10, 15, 20, 25],
    weaponFixedDuration: 30,
    weaponAttribute: 'Speed',
    wornEffectId: 'FOAT',
    wornMagnitudes: [7, 8, 9, 10, 12],
    wornAttribute: 'Speed',
  },
  // Absorb Strength / Fortify Strength
  {
    id: 'absorb-strength',
    weaponEffectId: 'ABAT',
    weaponValues: [5, 10, 15, 20, 25],
    weaponFixedDuration: 30,
    weaponAttribute: 'Strength',
    wornEffectId: 'FOAT',
    wornMagnitudes: [7, 8, 9, 10, 12],
    wornAttribute: 'Strength',
  },
  // Burden / Feather
  {
    id: 'burden-feather',
    weaponEffectId: 'BRDN', // Burden
    weaponValues: [20, 40, 60, 80, 100],
    weaponFixedDuration: 30,
    wornEffectId: 'FTHR', // Feather
    wornMagnitudes: [25, 50, 75, 100, 125],
  },
  // Damage Fatigue / Fortify Fatigue (duplicate pair - separate stone)
  {
    id: 'damage-fatigue',
    weaponEffectId: 'DGFA', // Damage Fatigue
    weaponValues: [15, 25, 35, 50, 60],
    wornEffectId: 'FOFA', // Fortify Fatigue
    wornMagnitudes: [10, 20, 30, 40, 50],
  },
  // Damage Health / Fortify Health
  {
    id: 'damage-health',
    weaponEffectId: 'DGHE', // Damage Health
    weaponValues: [10, 15, 20, 25, 30],
    wornEffectId: 'FOHE', // Fortify Health
    wornMagnitudes: [10, 15, 20, 25, 30],
  },
  // Damage Magicka / Fortify Magicka
  {
    id: 'damage-magicka',
    weaponEffectId: 'DGSP', // Damage Magicka
    weaponValues: [15, 25, 35, 50, 60],
    wornEffectId: 'FOSP', // Fortify Magicka
    wornMagnitudes: [10, 20, 30, 40, 50],
  },
  // Demoralize / Fortify Willpower
  {
    id: 'demoralize',
    weaponEffectId: 'DEMO', // Demoralize
    weaponValues: [2, 5, 7, 10, 12],
    weaponFixedDuration: 20,
    wornEffectId: 'FOAT',
    wornMagnitudes: [7, 8, 9, 10, 12],
    wornAttribute: 'Willpower',
  },
  // Disintegrate Armor / Shield
  {
    id: 'disintegrate-armor',
    weaponEffectId: 'DIAR', // Disintegrate Armor
    weaponValues: [20, 20, 30, 40, 50],
    wornEffectId: 'SHLD', // Shield
    wornMagnitudes: [8, 10, 12, 15, 20],
  },
  // Disintegrate Weapon / Fortify Blade
  {
    id: 'disintegrate-weapon-blade',
    weaponEffectId: 'DIWE', // Disintegrate Weapon
    weaponValues: [10, 20, 30, 40, 50],
    wornEffectId: 'FOSK',
    wornMagnitudes: [7, 8, 9, 10, 12],
    wornSkill: 'Blade',
  },
  // Disintegrate Weapon / Fortify Blunt
  {
    id: 'disintegrate-weapon-blunt',
    weaponEffectId: 'DIWE', // Disintegrate Weapon
    weaponValues: [10, 20, 30, 40, 50],
    wornEffectId: 'FOSK',
    wornMagnitudes: [7, 8, 9, 10, 12],
    wornSkill: 'Blunt',
  },
  // Dispel / Spell Absorption
  {
    id: 'dispel',
    weaponEffectId: 'DSPL', // Dispel
    weaponValues: [30, 50, 80, 100, 120],
    wornEffectId: 'SABS', // Spell Absorption
    wornMagnitudes: [7, 8, 10, 12, 15],
  },
  // Fire Damage / Fire Shield
  {
    id: 'fire-damage-fire-shield',
    weaponEffectId: 'FIDG', // Fire Damage
    weaponValues: [5, 10, 15, 20, 25],
    wornEffectId: 'FISH', // Fire Shield
    wornMagnitudes: [10, 13, 16, 18, 25],
  },
  // Fire Damage / Light
  {
    id: 'fire-damage-light',
    weaponEffectId: 'FIDG', // Fire Damage
    weaponValues: [5, 10, 15, 20, 25],
    wornEffectId: 'LGHT', // Light
    wornMagnitudes: [15, 30, 45, 60, 75],
  },
  // Fire Damage / Resist Fire
  {
    id: 'fire-damage-resist-fire',
    weaponEffectId: 'FIDG', // Fire Damage
    weaponValues: [5, 10, 15, 20, 25],
    wornEffectId: 'RSFI', // Resist Fire
    wornMagnitudes: [15, 20, 25, 30, 35],
  },
  // Frost Damage / Frost Shield
  {
    id: 'frost-damage-frost-shield',
    weaponEffectId: 'FRDG', // Frost Damage
    weaponValues: [5, 10, 15, 20, 25],
    wornEffectId: 'FRSH', // Frost Shield
    wornMagnitudes: [10, 13, 25, 18, 25],   // Latent 25 is a vanilla bug
    wornMagnitudesPatched: [10, 13, 16, 18, 25],
  },
  // Frost Damage / Resist Frost
  {
    id: 'frost-damage-resist-frost',
    weaponEffectId: 'FRDG', // Frost Damage
    weaponValues: [5, 10, 15, 20, 25],
    wornEffectId: 'RSFR', // Resist Frost
    wornMagnitudes: [15, 20, 25, 30, 35],
  },
  // Frost Damage / Water Walking
  {
    id: 'frost-damage-water-walking',
    weaponEffectId: 'FRDG', // Frost Damage
    weaponValues: [5, 10, 15, 20, 25],
    wornEffectId: 'WAWA', // Water Walking
    wornMagnitudes: [0, 0, 0, 0, 0],
  },
  // Shock Damage / Night-Eye
  {
    id: 'shock-damage-night-eye',
    weaponEffectId: 'SHDG', // Shock Damage
    weaponValues: [5, 10, 15, 20, 25],
    wornEffectId: 'NEYE', // Night-Eye
    wornMagnitudes: [0, 0, 0, 0, 0],
  },
  // Shock Damage / Resist Shock
  {
    id: 'shock-damage-resist-shock',
    weaponEffectId: 'SHDG', // Shock Damage
    weaponValues: [15, 20, 15, 20, 25],      // Descendent 15 / Subjacent 20 are vanilla bugs
    weaponValuesPatched: [5, 10, 15, 20, 25],
    wornEffectId: 'RSSH', // Resist Shock
    wornMagnitudes: [5, 10, 25, 30, 35],     // Latent 25 is a vanilla bug
    wornMagnitudesPatched: [5, 10, 15, 30, 35],
  },
  // Shock Damage / Shock Shield
  {
    id: 'shock-damage-shock-shield',
    weaponEffectId: 'SHDG', // Shock Damage
    weaponValues: [5, 10, 15, 20, 25],
    wornEffectId: 'LISH', // Shock Shield
    wornMagnitudes: [10, 13, 25, 18, 25],    // Latent 25 is a vanilla bug
    wornMagnitudesPatched: [10, 13, 16, 18, 25],
  },
  // Silence / Chameleon — weaponValues are durations (seconds)
  {
    id: 'silence-chameleon',
    weaponEffectId: 'SLNC', // Silence
    weaponValues: [5, 7, 10, 12, 15],
    weaponValueIsDuration: true,
    wornEffectId: 'CHML', // Chameleon
    wornMagnitudes: [10, 15, 20, 25, 30],
  },
  // Silence / Resist Magic — weaponValues are durations (seconds)
  {
    id: 'silence-resist-magic',
    weaponEffectId: 'SLNC', // Silence
    weaponValues: [5, 7, 10, 12, 15],
    weaponValueIsDuration: true,
    wornEffectId: 'RSMA', // Resist Magic
    wornMagnitudes: [5, 7, 10, 15, 20],
  },
  // Soul Trap / Resist Magic — weaponValues are durations (seconds)
  {
    id: 'soul-trap',
    weaponEffectId: 'STRP', // Soul Trap
    weaponValues: [5, 10, 10, 15, 20],
    weaponValueIsDuration: true,
    wornEffectId: 'RSMA', // Resist Magic
    wornMagnitudes: [5, 10, 10, 15, 20],     // Subjacent 10 is a vanilla bug (should be 7)
    wornMagnitudesPatched: [5, 7, 10, 15, 20],
  },
  // Turn Undead / Detect Life
  {
    id: 'turn-undead',
    weaponEffectId: 'TURN', // Turn Undead
    weaponValues: [7, 11, 15, 18, 25],
    weaponFixedDuration: 20,
    wornEffectId: 'DTCT', // Detect Life
    wornMagnitudes: [30, 60, 90, 120, 180],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getSigilStoneTierIndex(tier: SigilStoneTier): number {
  return sigilStoneTiers.indexOf(tier);
}

export function getSigilStoneDefinitionById(id: string): SigilStoneDefinition | undefined {
  return sigilStoneDefinitions.find((s) => s.id === id);
}

/**
 * Returns the tier magnitudes/values for one side of a sigil stone,
 * using patched values if available and requested.
 */
export function getSigilStoneValues(
  stone: SigilStoneDefinition,
  side: 'weapon' | 'worn',
  patched: boolean,
): SigilStoneTierMagnitudes {
  if (side === 'weapon') {
    return (patched && stone.weaponValuesPatched) ? stone.weaponValuesPatched : stone.weaponValues;
  }
  return (patched && stone.wornMagnitudesPatched) ? stone.wornMagnitudesPatched : stone.wornMagnitudes;
}

/**
 * Returns the display name for one side of a sigil stone, resolving any
 * specific attribute or skill into the base effect name.
 *
 * e.g. ABAT + Agility → "Absorb Agility"
 *      FOAT + Willpower → "Fortify Willpower"
 *      FOSK + Blade → "Fortify Blade"
 *      FIDG (no attr) → "Fire Damage"
 */
export function getSigilStoneEffectName(
  stone: SigilStoneDefinition,
  side: 'weapon' | 'worn',
): string {
  const effectId = side === 'weapon' ? stone.weaponEffectId : stone.wornEffectId;
  const attribute = side === 'weapon' ? stone.weaponAttribute : stone.wornAttribute;
  const skill = side === 'weapon' ? stone.weaponSkill : stone.wornSkill;
  const baseName = spellEffectDefinitionById[effectId].name;

  if (attribute) return baseName.replace('Attribute', attribute);
  if (skill) return baseName.replace('Skill', skill);
  return baseName;
}
