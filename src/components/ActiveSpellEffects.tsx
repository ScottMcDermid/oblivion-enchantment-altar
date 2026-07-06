import React, { useMemo } from 'react';
import { useEnchantmentStore } from '@/data/enchantmentStore';
import Image from 'next/image';
import { getGoldCost, spellEffectDefinitionById } from '@/utils/spellEffectUtils';
import { Tooltip } from '@mui/material';
import { cn } from '@/utils/cn';
import { getConstantEffectMagnitude } from '@/utils/enchantmentUtils';
import SpellEffectEditor from '@/components/SpellEffectEditor';

const SKELETON_ROWS = [
  { nameWidth: 'w-3/4' },
  { nameWidth: 'w-1/2' },
  { nameWidth: 'w-2/3' },
];

export function EffectsSkeleton() {
  return (
    <div className="relative w-full animate-pulse bg-inherit">
      {/* Header skeleton */}
      <div className="grid grid-cols-[2rem_minmax(0,1fr)_4rem_4rem_4rem] items-center py-2 pb-2 pr-2 pt-6 lg:grid-cols-[2rem_minmax(0,1fr)_6rem_4rem_6rem_6rem_6rem]">
        <span />
        <span />
        <div className="ml-auto h-3 w-10 rounded bg-[#2e2e2e]" />
        <div className="ml-auto h-3 w-8 rounded bg-[#2e2e2e]" />
        <div className="ml-auto h-3 w-8 rounded bg-[#2e2e2e]" />
        <div className="ml-auto hidden h-3 w-12 rounded bg-[#2e2e2e] lg:block" />
        <div className="ml-auto hidden h-3 w-10 rounded bg-[#2e2e2e] lg:block" />
      </div>
      {/* Placeholder rows */}
      {SKELETON_ROWS.map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-[2rem_minmax(0,1fr)_4rem_4rem_4rem] items-center py-2 pl-1 pr-2 lg:grid-cols-[2rem_minmax(0,1fr)_6rem_4rem_6rem_6rem_6rem]"
        >
          <div className="ml-1 h-6 w-6 rounded bg-[#2e2e2e]" />
          <div className={cn('ml-1 h-4 rounded bg-[#2e2e2e]', row.nameWidth)} />
          <div className="ml-auto h-3 w-8 rounded bg-[#2e2e2e]" />
          <div className="ml-auto h-3 w-6 rounded bg-[#2e2e2e]" />
          <div className="ml-auto h-3 w-6 rounded bg-[#2e2e2e]" />
          <div className="ml-auto hidden h-3 w-10 rounded bg-[#2e2e2e] lg:block" />
          <div className="ml-auto hidden h-3 w-8 rounded bg-[#2e2e2e] lg:block" />
        </div>
      ))}
    </div>
  );
}

export default function ActiveSpellEffects({
  expandedEffectId,
  onToggleExpand,
}: {
  expandedEffectId: string | null;
  onToggleExpand: (id: string) => void;
}) {
  const { addedEffects, equipmentType, soulGem } = useEnchantmentStore();

  const magnitudes = useMemo(
    () =>
      addedEffects.map((effect) =>
        equipmentType === 'Worn'
          ? getConstantEffectMagnitude(effect.id, soulGem)
          : effect.magnitude,
      ),
    [equipmentType, addedEffects, soulGem],
  );

  const goldCosts = useMemo(
    () =>
      addedEffects.map((effect) =>
        getGoldCost({
          effect,
          equipmentType,
          soulGem,
        }),
      ),
    [addedEffects, equipmentType, soulGem],
  );

  const spellDefinitions = useMemo(
    () => addedEffects.map((effect) => spellEffectDefinitionById[effect.id]),
    [addedEffects],
  );

  const spellNames = useMemo(
    () =>
      addedEffects.map((effect, i) =>
        effect.attribute
          ? spellDefinitions[i].name.replace(/Attribute/, effect.attribute)
          : effect.skill
            ? spellDefinitions[i].name.replace(/Skill/, effect.skill)
            : effect.lockLevel
              ? `${spellDefinitions[i].name} ${effect.lockLevel} Lock`
              : spellDefinitions[i].name,
      ),
    [addedEffects, spellDefinitions],
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
      </div>
      {addedEffects.length === 0 && (
        <div className="items-center px-2 py-2 text-sm">No Active Effects</div>
      )}

      {addedEffects.map((effect, i) => {
        const isExpanded = expandedEffectId === effect.id;
        const definition = spellDefinitions[i];

        return (
          <div key={effect.id}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => onToggleExpand(effect.id)}
              onKeyDown={(e) => e.key === 'Enter' && onToggleExpand(effect.id)}
              className={cn(
                'grid items-center py-2 pr-2 text-sm cursor-pointer hover:bg-[#2f2f2f]',
                'grid-cols-[2rem_minmax(0,1fr)_4rem_4rem_4rem]',
                'lg:grid-cols-[2rem_minmax(0,1fr)_6rem_4rem_6rem_6rem_6rem]',
                isExpanded ? 'border-l-4 border-l-yellow-400' : 'pl-1',
              )}
            >
              {/* Spell effect icon */}
              <Tooltip title={definition.school}>
                <Image
                  width={64}
                  height={64}
                  src={`/icons/spell-effects/${effect.id}.png`}
                  alt={definition.name}
                  className="h-8 w-8 object-contain pl-1 lg:h-8 lg:w-8"
                />
              </Tooltip>

              {/* Spell effect name */}
              <span className="pl-1 lg:text-lg">{spellNames[i]}</span>

              {/* Magnitude */}
              <span className="text-right">
                {definition.availableParameters.includes('Magnitude') &&
                definition.isLevelBasedMagnitude ? (
                  <span>
                    {definition.unit} {magnitudes[i]}
                  </span>
                ) : (
                  <span>
                    {magnitudes[i]} {definition.unit}
                  </span>
                )}
              </span>

              {/* Area */}
              <span className="text-right">
                {definition.availableParameters.includes('Area') && equipmentType !== 'Worn'
                  ? effect.area === 0
                    ? '-'
                    : `${effect.area} ft`
                  : ''}
              </span>

              {/* Duration */}
              <span className="text-right">
                {definition.availableParameters.includes('Duration') &&
                  equipmentType !== 'Worn' &&
                  `${effect.duration}s`}
              </span>

              {/* Magicka Cost */}
              <span className="col-span-0 hidden text-right lg:col-span-1 lg:inline">
                {equipmentType !== 'Worn' && Intl.NumberFormat().format(effect.magickaCost)}
              </span>

              {/* Gold Cost */}
              <span className="col-span-0 hidden text-right lg:col-span-1 lg:inline">
                {Intl.NumberFormat().format(goldCosts[i])}
              </span>
            </div>

            {/* Inline editor panel */}
            {equipmentType !== 'Worn' && (
              <div
                className={cn(
                  'grid transition-[grid-template-rows,opacity] duration-300 ease-in-out',
                  isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <SpellEffectEditor effect={effect} effectDefinition={definition} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
