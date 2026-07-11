import type { EquipmentType, SpellEffect } from '@/utils/spellEffectUtils';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { upsert } from '@/utils/array';
import { type SoulGem } from '@/utils/enchantmentUtils';

type State = {
  addedEffects: SpellEffect[];
  equipmentType: EquipmentType;
  soulGem: SoulGem;
  itemName: string;
  version: number;
};

type Action = {
  addSpellEffect: (spellEffect: SpellEffect) => void;
  removeSpellEffect: (spellEffect: SpellEffect) => void;
  resetEnchantment: () => void;
  toggleEquipmentType: () => void;
  setSoulGem: (soulGem: SoulGem) => void;
  setItemName: (name: string) => void;
  loadEnchantment: (data: {
    addedEffects: SpellEffect[];
    equipmentType: EquipmentType;
    soulGem: SoulGem;
    itemName?: string;
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
        actions: {
          addSpellEffect: (effect) =>
            set((state) => ({
              addedEffects:
                state.equipmentType === 'Worn'
                  ? [effect]
                  : upsert<SpellEffect>(state.addedEffects, effect, 'id'),
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
          resetEnchantment: () => {
            set(() => ({ addedEffects: [], itemName: '' }));
          },
          loadEnchantment: (data) => {
            set(() => ({
              addedEffects: data.addedEffects,
              equipmentType: data.equipmentType,
              soulGem: data.soulGem,
              itemName: data.itemName ?? '',
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
      }),
    },
  ),
);

export { useEnchantmentStore };
