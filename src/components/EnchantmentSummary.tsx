import React, { useMemo } from 'react';
import { useEnchantmentStore } from '@/data/enchantmentStore';
import { getGoldCost, spellEffectDefinitionById } from '@/utils/spellEffectUtils';
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
    [addedEffects],
  );

  const uses = useMemo(
    () => Math.floor(capacityBySoulGem[soulGem] / magickaCost),
    [magickaCost, soulGem],
  );

  return (
    <div className="mt-4 w-full">
      <div className="flex w-full justify-end gap-1 px-2 shadow-sm">
        {equipmentType === 'Worn' && (
          <div className="flex place-items-center justify-end gap-1">
            <FlashOn fontSize="small" />
            <div className="text-ghost">Constant Effect</div>
          </div>
        )}

        {equipmentType !== 'Worn' && (
          <Tooltip title="Magicka Cost">
            <div className="flex place-items-center justify-end gap-1">
              <FlashOn fontSize="small" />
              <Typography
                className="text-lg"
                color={magickaCost > maxMagickaBySoulGem[soulGem] ? 'error' : ''}
              >
                {Intl.NumberFormat().format(Math.floor(magickaCost))} /{' '}
                {Intl.NumberFormat().format(Math.floor(maxMagickaBySoulGem[soulGem]))}
              </Typography>
            </div>
          </Tooltip>
        )}

        {equipmentType !== 'Worn' && (
          <Tooltip title="Uses">
            <div className="flex min-w-16 items-center justify-end gap-1">
              <BatteryIcon fontSize="small" />
              <span className="text-lg">{Intl.NumberFormat().format(uses)}</span>
            </div>
          </Tooltip>
        )}

        <Tooltip title="Gold Cost">
          <div className="flex min-w-16 items-center justify-end gap-1">
            <AttachMoney fontSize="small" />
            <span className="text-lg">{Intl.NumberFormat().format(Math.floor(goldCost))}</span>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
