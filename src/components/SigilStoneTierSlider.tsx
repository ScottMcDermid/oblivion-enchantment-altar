'use client';

import React from 'react';
import { Slider } from '@mui/material';

import { sigilStoneTiers, type SigilStoneTier } from '@/utils/sigilStoneUtils';

const tierLevelRanges: Record<SigilStoneTier, string> = {
  Descendent:   'Level 1–4',
  Subjacent:    'Level 5–8',
  Latent:       'Level 9–12',
  Ascendent:    'Level 13–16',
  Transcendent: 'Level 17+',
};
import { useEnchantmentStore } from '@/data/enchantmentStore';

const tierMarks = sigilStoneTiers.map((tier, i) => ({ value: i, label: tier }));

export default function SigilStoneTierSlider() {
  const {
    sigilStoneTier,
    actions: { setSigilStoneTier },
  } = useEnchantmentStore();

  const tierIndex = sigilStoneTiers.indexOf(sigilStoneTier);

  return (
    <div className="mb-4 rounded-md border border-[#2e2e2e] bg-[#1a1a1a] px-6 py-4">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-semibold text-yellow-400">Sigil Stone Tier</span>
        <div className="flex flex-col items-end">
          <span className="text-gray-300">{sigilStoneTier}</span>
          <span className="text-[11px] text-gray-500">{tierLevelRanges[sigilStoneTier]}</span>
        </div>
      </div>
      <Slider
        value={tierIndex}
        min={0}
        max={4}
        step={1}
        marks={tierMarks}
        onChange={(_, val) => setSigilStoneTier(sigilStoneTiers[val as number] as SigilStoneTier)}
        sx={{
          '& .MuiSlider-markLabel': {
            fontSize: '0.65rem',
            color: '#9ca3af',
          },
          '& .MuiSlider-markLabel[data-index="0"]': {
            transform: 'translateX(0%)',
          },
          '& .MuiSlider-markLabel[data-index="4"]': {
            transform: 'translateX(-100%)',
          },
        }}
      />
    </div>
  );
}
