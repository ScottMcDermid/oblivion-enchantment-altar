import React, { useMemo } from 'react';
import { LinearProgress, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import FlashOn from '@mui/icons-material/FlashOn';
import { maxMagickaBySoulGem, soulGems } from '@/utils/enchantmentUtils';
import { useEnchantmentStore } from '@/data/enchantmentStore';

export function SoulGemSelector() {
  const {
    soulGem,
    addedEffects,
    equipmentType,
    actions: { setSoulGem },
  } = useEnchantmentStore();

  const magickaCost = useMemo(
    () => addedEffects.reduce((total, effect) => total + effect.magickaCost, 0),
    [addedEffects],
  );

  const maxMagicka = maxMagickaBySoulGem[soulGem];
  const isOverBudget = magickaCost > maxMagicka;
  const isWorn = equipmentType === 'Worn';
  const progressValue = isWorn ? 100 : Math.min((magickaCost / maxMagicka) * 100, 100);

  return (
    <div>
      <ToggleButtonGroup
        value={soulGem}
        exclusive
        onChange={(_e, type) => type !== null && setSoulGem(type)}
        className="mb-2 flex w-full justify-center"
      >
        {soulGems.map((type) => (
          <ToggleButton key={type} value={type} className="min-w-14 py-1 sm:min-w-32">
            {type}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Tooltip title="Magicka Cost">
        <div className="mb-4 flex items-center gap-2 px-1">
          <LinearProgress
            variant="determinate"
            value={progressValue}
            color={!isWorn && isOverBudget ? 'error' : 'secondary'}
            className="flex-1"
            sx={{ height: 8, borderRadius: 1 }}
          />
          <div
            className={`flex items-center gap-1 text-sm whitespace-nowrap ${
              !isWorn && isOverBudget ? 'text-red-500' : 'text-gray-300'
            }`}
          >
            <span className="inline-block min-w-[6rem] text-right">
              {isWorn
                ? 'Constant Effect'
                : `${Intl.NumberFormat().format(magickaCost)} / ${Intl.NumberFormat().format(maxMagicka)}`}
            </span>
            <FlashOn fontSize="small" />
          </div>
        </div>
      </Tooltip>
    </div>
  );
}
