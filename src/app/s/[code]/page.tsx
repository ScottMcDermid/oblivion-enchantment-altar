'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { decodeEnchantment, type EnchantmentData } from '@/utils/enchantmentCodec';
import EnchantmentAltar from '@/components/EnchantmentAltar';
import { useEnchantmentStore } from '@/data/enchantmentStore';

export default function SharedEnchantmentPage() {
  const params = useParams();
  const [sharedEnchantment, setSharedEnchantment] = useState<EnchantmentData | null>(null);
  const [failed, setFailed] = useState(false);
  const { actions: { loadEnchantment } } = useEnchantmentStore();

  useEffect(() => {
    const code = params.code as string;
    if (!code) {
      setFailed(true);
      return;
    }

    const enchantment = decodeEnchantment(code);
    if (!enchantment) {
      setFailed(true);
      return;
    }

    setSharedEnchantment(enchantment);
    loadEnchantment({
      addedEffects: enchantment.effects,
      equipmentType: enchantment.equipmentType,
      soulGem: enchantment.soulGem,
      itemName: enchantment.name ?? '',
    });
  }, [params.code, loadEnchantment]);

  if (failed) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-[#1e1e1e] text-gray-300">
        <p className="text-lg">Invalid or corrupted enchantment link.</p>
        <a href="/" className="text-yellow-400 underline hover:text-yellow-200">
          Go to enchantment altar
        </a>
      </div>
    );
  }

  if (!sharedEnchantment) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1e1e1e]">
        <p className="text-lg text-gray-400">Loading enchantment...</p>
      </div>
    );
  }

  return <EnchantmentAltar sharedEnchantment={sharedEnchantment} />;
}
