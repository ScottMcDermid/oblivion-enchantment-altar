import React, { useMemo } from 'react';
import { useEnchantmentStore } from '@/data/enchantmentStore';
import Image from 'next/image';
import { getGoldCost, SpellEffect, spellEffectDefinitionById } from '@/utils/spellEffectUtils';
import { Tooltip } from '@mui/material';
import { cn } from '@/utils/cn';
import { getConstantEffectMagnitude } from '@/utils/enchantmentUtils';

export default function ActiveSpellEffects({
  onEffectSelect = () => {},
}: {
  onEffectSelect?: (effect: SpellEffect) => void;
}) {
  const { addedEffects, equipmentType, soulGem } = useEnchantmentStore();

  const wornMagnitude = useMemo(() => {
    if (equipmentType === 'Worn' && addedEffects.length > 0) {
      return getConstantEffectMagnitude(addedEffects[0].id, soulGem);
    }
    return 0;
  }, [addedEffects, soulGem, equipmentType]);

  const goldCosts = useMemo(
    () =>
      addedEffects.map((effect) =>
        Math.floor(
          getGoldCost({
            magickaCost: equipmentType === 'Worn' ? wornMagnitude : effect.magickaCost,
            equipmentType,
            spellId: effect.id,
          }),
        ),
      ),
    [addedEffects, equipmentType, wornMagnitude],
  );

  return (
    <div className="relative w-full bg-inherit">
      <div className="sticky top-0 z-10 grid grid-cols-[2rem_minmax(0,1fr)_4rem_4rem_4rem] items-center bg-inherit py-2 pb-2 pr-2 pt-6 text-sm font-semibold shadow-lg lg:grid-cols-[2rem_minmax(0,1fr)_6rem_4rem_6rem_6rem_6rem]">
        {/* Spell effect icon */}
        <span></span>

        {/* Spell effect name */}
        <span></span>

        {/* Magnitude */}
        <span className="text-right">
          <span className="inline lg:hidden">Mag.</span>
          <span className="hidden lg:inline">Magnitude</span>
        </span>

        {/* Area */}
        <span className="text-right">
          <span className="inline lg:hidden">Area</span>
          <span className="hidden lg:inline">Area</span>
        </span>

        {/* Duration */}
        <span className="text-right">
          <span className="inline lg:hidden">Dur.</span>
          <span className="hidden lg:inline">Duration</span>
        </span>

        {/* Magicka */}
        <span className="col-span-0 hidden text-right lg:col-span-1 lg:inline">Magicka</span>

        {/* Gold */}
        <span className="col-span-0 hidden text-right lg:col-span-1 lg:inline">Gold</span>

        {/* Actions*/}
        <span></span>
      </div>
      {addedEffects.length === 0 && (
        <div className="items-center px-2 py-2 text-sm">No Active Effects</div>
      )}

      {addedEffects.map((effect, i) => (
        <div
          key={effect.id}
          role="button"
          tabIndex={0}
          onClick={() => onEffectSelect(effect)}
          onKeyDown={(e) => e.key === 'Enter' && onEffectSelect(effect)}
          className={cn(
            'grid items-center py-2 pr-2 text-sm hover:bg-[#2f2f2f]',
            'grid-cols-[2rem_minmax(0,1fr)_4rem_4rem_4rem]',
            'lg:grid-cols-[2rem_minmax(0,1fr)_6rem_4rem_6rem_6rem_6rem]',
          )}
        >
          {/* Spell effect icon */}
          <Tooltip title={spellEffectDefinitionById[effect.id].school}>
            <Image
              width={64}
              height={64}
              src={`/icons/spell-effects/${effect.id}.png`}
              alt={spellEffectDefinitionById[effect.id].name}
              className="h-8 w-8 object-contain pl-1 lg:h-8 lg:w-8"
            />
          </Tooltip>

          {/* Spell effect name */}
          <span className="pl-1 lg:text-lg">
            {effect.attribute
              ? spellEffectDefinitionById[effect.id].name.replace(/Attribute/, effect.attribute)
              : effect.skill
                ? spellEffectDefinitionById[effect.id].name.replace(/Skill/, effect.skill)
                : effect.lockLevel
                  ? `${spellEffectDefinitionById[effect.id].name} ${effect.lockLevel} Lock`
                  : spellEffectDefinitionById[effect.id].name}
          </span>

          {/* Magnitude */}
          <span className="text-right">
            {equipmentType === 'Worn'
              ? wornMagnitude > 0 && `${wornMagnitude} ${spellEffectDefinitionById[effect.id].unit}`
              : spellEffectDefinitionById[effect.id].availableParameters.includes('Magnitude') &&
                `${effect.magnitude} ${spellEffectDefinitionById[effect.id].unit}`}
          </span>

          {/* Area */}
          <span className="text-right">
            {spellEffectDefinitionById[effect.id].availableParameters.includes('Area') &&
            equipmentType !== 'Worn'
              ? effect.area === 0
                ? '-'
                : `${effect.area} ft`
              : ''}
          </span>

          {/* Duration */}
          <span className="text-right">
            {spellEffectDefinitionById[effect.id].availableParameters.includes('Duration') &&
              equipmentType !== 'Worn' &&
              `${effect.duration}s`}
          </span>

          {/* Magicka Cost */}
          <span className="col-span-0 hidden text-right lg:col-span-1 lg:inline">
            {equipmentType !== 'Worn' && Intl.NumberFormat().format(Math.floor(effect.magickaCost))}
          </span>

          {/* Gold Cost */}
          <span className="col-span-0 hidden text-right lg:col-span-1 lg:inline">
            {Intl.NumberFormat().format(goldCosts[i])}
          </span>
        </div>
      ))}
    </div>
  );
}
