import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { soulGems } from '@/utils/enchantmentUtils';
import { useEnchantmentStore } from '@/data/enchantmentStore';

export function SoulGemSelector() {
  const {
    soulGem,
    actions: { setSoulGem },
  } = useEnchantmentStore();

  return (
    <div>
      <ToggleButtonGroup
        value={soulGem}
        exclusive
        onChange={(_e, type) => type !== null && setSoulGem(type)}
        className="mb-4 flex w-full justify-center"
      >
        {soulGems.map((type) => (
          <ToggleButton key={type} value={type} className="min-w-14 py-1 sm:min-w-32">
            {type}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}
