import { spellEffectDefinitionById, type SpellEffectDefinitionId } from '@/utils/spellEffectUtils';

export type SoulGem = 'Petty' | 'Lesser' | 'Common' | 'Greater' | 'Grand';
export const soulGems: SoulGem[] = ['Petty', 'Lesser', 'Common', 'Greater', 'Grand'];

export const capacityBySoulGem: Record<SoulGem, number> = {
  Petty: 150,
  Lesser: 300,
  Common: 800,
  Greater: 1200,
  Grand: 1600,
};

export const levelBySoulGem: Record<SoulGem, number> = {
  Petty: 1,
  Lesser: 2,
  Common: 3,
  Greater: 4,
  Grand: 5,
};

export const maxMagickaBySoulGem: Record<SoulGem, number> = {
  Petty: 15,
  Lesser: 25,
  Common: 40,
  Greater: 60,
  Grand: 85,
};

// https://en.uesp.net/wiki/Oblivion:Enchanting#Worn_Enchantments
const MAGIC_CE_ENCHANT_MAG_OFFSET = 5.0;
export function getConstantEffectMagnitude(spellId: SpellEffectDefinitionId, soulGem: SoulGem) {
  const constantEffectFactor = spellEffectDefinitionById[spellId].constantEffectFactor ?? 0;
  const soulGemLevel = levelBySoulGem[soulGem];

  const constantEffectOverrides: Partial<Record<SpellEffectDefinitionId, Record<SoulGem, number>>> =
    {
      FISH: { Petty: 6, Lesser: 6, Common: 7, Greater: 8, Grand: 9 },
      FRSH: { Petty: 6, Lesser: 6, Common: 7, Greater: 8, Grand: 9 },
      LISH: { Petty: 6, Lesser: 6, Common: 7, Greater: 8, Grand: 9 },
      NEYE: { Petty: 0, Lesser: 0, Common: 0, Greater: 0, Grand: 0 },
      WABR: { Petty: 0, Lesser: 0, Common: 0, Greater: 0, Grand: 0 },
      WAWA: { Petty: 0, Lesser: 0, Common: 0, Greater: 0, Grand: 0 },
    };

  if (constantEffectOverrides[spellId]) {
    return constantEffectOverrides[spellId][soulGem];
  }

  return MAGIC_CE_ENCHANT_MAG_OFFSET + constantEffectFactor * soulGemLevel;
}
