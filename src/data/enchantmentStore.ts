import type { EquipmentType, SpellEffect } from '@/utils/spellEffectUtils';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { upsert } from '@/utils/array';
import { type SoulGem } from '@/utils/enchantmentUtils';
import { type SigilStoneTier } from '@/utils/sigilStoneUtils';

type State = {
  addedEffects: SpellEffect[];
  equipmentType: EquipmentType;
  soulGem: SoulGem;
  itemName: string;
  version: number;
  sigilStoneId: string | null;
  sigilStoneTier: SigilStoneTier;
};

type Action = {
  addSpellEffect: (spellEffect: SpellEffect) => void;
  removeSpellEffect: (spellEffect: SpellEffect) => void;
  resetEnchantment: () => void;
  toggleEquipmentType: () => void;
  setSoulGem: (soulGem: SoulGem) => void;
  setItemName: (name: string) => void;
  setSigilStone: (id: string | null) => void;
  setSigilStoneTier: (tier: SigilStoneTier) => void;
  loadEnchantment: (data: {
    addedEffects: SpellEffect[];
    equipmentType: EquipmentType;
    soulGem: SoulGem;
    itemName?: string;
    sigilStoneId?: string | null;
    sigilStoneTier?: SigilStoneTier;
  }) => void;
};

type EnchantmentStore = State & { actions: Action };

const useEnchantmentStore = create<EnchantmentStore>()(
  persist(
    (set) => {
      return {
        addedEffects: [],
        equipmentType: 'Weapon',
        soulGem: 'Grand',
        itemName: '',
        version: 1,
        sigilStoneId: null,
        sigilStoneTier: 'Transcendent',
        actions: {
          addSpellEffect: (effect) =>
            set((state) => ({
              addedEffects:
                state.equipmentType === 'Worn'
                  ? [effect]
                  : upsert<SpellEffect>(state.addedEffects, effect, 'id'),
              // Adding a regular effect clears any active sigil stone
              sigilStoneId: null,
            })),
          removeSpellEffect: (effect) =>
            set((state) => ({
              addedEffects: state.addedEffects.filter(
                (existingEffect) => effect.id !== existingEffect.id,
              ),
            })),
          toggleEquipmentType: () =>
            set((state) => ({
              equipmentType: state.equipmentType === 'Weapon' ? 'Worn' : 'Weapon',
              addedEffects: [],
            })),
          setSoulGem: (soulGem) => set(() => ({ soulGem })),
          setItemName: (itemName) => set(() => ({ itemName })),
          setSigilStone: (id) =>
            set((state) => ({
              sigilStoneId: id,
              // Selecting a new sigil stone clears regular effects; clearing the stone preserves them (empty)
              addedEffects: id !== null ? [] : state.addedEffects,
            })),
          setSigilStoneTier: (tier) => set(() => ({ sigilStoneTier: tier })),
          resetEnchantment: () => {
            set(() => ({ addedEffects: [], itemName: '', sigilStoneId: null }));
          },
          loadEnchantment: (data) => {
            set(() => ({
              addedEffects: data.addedEffects,
              equipmentType: data.equipmentType,
              soulGem: data.soulGem,
              itemName: data.itemName ?? '',
              sigilStoneId: data.sigilStoneId ?? null,
              sigilStoneTier: data.sigilStoneTier ?? 'Transcendent',
            }));
          },
        },
      };
    },
    {
      name: 'oblivion-enchantment-altar',
      version: 1,
      storage: createJSONStorage(
        () => (typeof window !== 'undefined' ? localStorage : ({} as Storage)), // Fallback for SSR; you might implement a noop Storage if needed
      ),
      partialize: (state) => ({
        addedEffects: state.addedEffects,
        equipmentType: state.equipmentType,
        itemName: state.itemName,
        version: state.version,
        sigilStoneId: state.sigilStoneId,
        sigilStoneTier: state.sigilStoneTier,
      }),
    },
  ),
);

export { useEnchantmentStore };
