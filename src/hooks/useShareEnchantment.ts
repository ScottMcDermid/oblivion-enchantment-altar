'use client';

import { useCallback } from 'react';
import { useEnchantmentStore } from '@/data/enchantmentStore';
import { encodeEnchantment, type EnchantmentData } from '@/utils/enchantmentCodec';

/**
 * Hook that provides functions to generate and copy a shareable URL
 * for the current enchantment configuration.
 */
export function useShareEnchantment() {
  const addedEffects = useEnchantmentStore((s) => s.addedEffects);
  const equipmentType = useEnchantmentStore((s) => s.equipmentType);
  const soulGem = useEnchantmentStore((s) => s.soulGem);

  const getShareUrl = useCallback((): string => {
    const enchantmentData: EnchantmentData = {
      equipmentType,
      soulGem,
      effects: addedEffects,
    };

    const code = encodeEnchantment(enchantmentData);
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `${origin}/s/${code}`;
  }, [addedEffects, equipmentType, soulGem]);

  const copyShareUrl = useCallback(async (): Promise<boolean> => {
    try {
      const url = getShareUrl();
      await navigator.clipboard.writeText(url);
      return true;
    } catch {
      return false;
    }
  }, [getShareUrl]);

  return { getShareUrl, copyShareUrl };
}
