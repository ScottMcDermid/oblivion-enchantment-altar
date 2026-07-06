import React, { useMemo } from 'react';
import { LinearProgress, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import FlashOn from '@mui/icons-material/FlashOn';
import BatteryIcon from '@mui/icons-material/Battery0Bar';
import AttachMoney from '@mui/icons-material/AttachMoney';
import { capacityBySoulGem, maxMagickaBySoulGem, soulGems } from '@/utils/enchantmentUtils';
import { useEnchantmentStore } from '@/data/enchantmentStore';
import { getGoldCost } from '@/utils/spellEffectUtils';

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

  const goldCost = useMemo(
    () =>
      addedEffects.reduce(
        (total, effect) => total + getGoldCost({ equipmentType, soulGem, effect }),
        0,
      ),
    [addedEffects, equipmentType, soulGem],
  );

  const uses = useMemo(
    () => Math.floor(capacityBySoulGem[soulGem] / magickaCost),
    [magickaCost, soulGem],
  );

  const maxMagicka = maxMagickaBySoulGem[soulGem];
  const isOverBudget = magickaCost > maxMagicka;
  const isWorn = equipmentType === 'Worn';
  const progressValue = isWorn ? 100 : Math.min((magickaCost / maxMagicka) * 100, 100);
  const hasEffects = addedEffects.length > 0;

  return (
    <div className="mb-4 rounded-md border border-[#2e2e2e] bg-[#1a1a1a] px-3 py-3">
      <div className="text-sm text-ghost text-center">Soul Gem</div>
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
        <div className="flex items-center gap-2 px-1">
          <LinearProgress
            variant="determinate"
            value={progressValue}
            color={!isWorn && isOverBudget ? 'error' : (isWorn && hasEffects) || (!isWorn && magickaCost === maxMagicka) ? 'success' : 'secondary'}
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

      {hasEffects && (
        <div className="mt-2 flex items-center justify-end gap-4 px-1 text-sm text-gray-300">
          {!isWorn && (
            <Tooltip title="Uses">
              <div className="flex items-center gap-1">
                <span>{Intl.NumberFormat().format(uses)}</span>
                <BatteryIcon fontSize="small" />
              </div>
            </Tooltip>
          )}

          <Tooltip title="Gold Cost">
            <div className="flex items-center gap-1">
              <span>{Intl.NumberFormat().format(goldCost)}</span>
              <AttachMoney fontSize="small" />
            </div>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
