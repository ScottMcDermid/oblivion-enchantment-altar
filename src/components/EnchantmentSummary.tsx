import React, { useMemo } from 'react';
import { useEnchantmentStore } from '@/data/enchantmentStore';
import { getGoldCost } from '@/utils/spellEffectUtils';
import { Tooltip, Typography } from '@mui/material';
import FlashOn from '@mui/icons-material/FlashOn';
import BatteryIcon from '@mui/icons-material/Battery0Bar';
import AttachMoney from '@mui/icons-material/AttachMoney';
import { capacityBySoulGem, maxMagickaBySoulGem } from '@/utils/enchantmentUtils';

export default function EnchantmentSummary() {
  const { addedEffects, soulGem, equipmentType } = useEnchantmentStore();

  const magickaCost = useMemo(
    () => addedEffects.reduce((magickaCost, effect) => magickaCost + effect.magickaCost, 0),
    [addedEffects],
  );

  const goldCost = useMemo(
    () =>
      addedEffects.reduce(
        (goldCost, effect) =>
          goldCost +
          getGoldCost({ equipmentType, magickaCost: effect.magickaCost, spellId: effect.id }),
        0,
      ),
    [addedEffects, equipmentType],
  );

  const uses = useMemo(
    () => Math.floor(capacityBySoulGem[soulGem] / magickaCost),
    [magickaCost, soulGem],
  );

  return (
    <div className="mt-4">
      <div className="flex w-full flex-col items-end gap-1 px-2 shadow-sm">
        {equipmentType === 'Worn' && (
          <Tooltip title="Magicka Cost">
            <div className="flex place-items-center gap-1">
              <div className="text-ghost">Constant Effect</div>
              <FlashOn fontSize="small" />
            </div>
          </Tooltip>
        )}

        {equipmentType !== 'Worn' && (
          <Tooltip title="Magicka Cost">
            <div className="flex place-items-center gap-1">
              <Typography
                className="text-lg"
                color={magickaCost > maxMagickaBySoulGem[soulGem] ? 'error' : ''}
              >
                {Intl.NumberFormat().format(magickaCost)} /{' '}
                {Intl.NumberFormat().format(maxMagickaBySoulGem[soulGem])}
              </Typography>
              <FlashOn fontSize="small" />
            </div>
          </Tooltip>
        )}

        {equipmentType !== 'Worn' && (
          <Tooltip title="Uses">
            <div className="flex items-center gap-1">
              <span className="text-lg">{Intl.NumberFormat().format(uses)}</span>
              <BatteryIcon fontSize="small" />
            </div>
          </Tooltip>
        )}

        <Tooltip title="Gold Cost">
          <div className="flex items-center gap-1">
            <span className="text-lg">{Intl.NumberFormat().format(goldCost)}</span>
            <AttachMoney fontSize="small" />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
