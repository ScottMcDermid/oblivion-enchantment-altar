import React, { useMemo, useState } from 'react';
import { TextField, Button, Chip, Tooltip, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Image from 'next/image';
import type { IconType } from 'react-icons';
import { FaBriefcaseMedical, FaEye, FaFeather, FaFireAlt } from 'react-icons/fa';
import { GiDevilMask, GiDominoMask } from 'react-icons/gi';

import {
  equipmentTypes,
  schools,
  weaponSpellEffectDefinitions,
  wornSpellEffectDefinitions,
  type EquipmentType,
  type School,
  type SpellEffectDefinition,
} from '@/utils/spellEffectUtils';
import { useEnchantmentStore } from '@/data/enchantmentStore';

const schoolIcons: Record<School, IconType> = {
  Alteration: FaFeather,
  Conjuration: GiDevilMask,
  Destruction: FaFireAlt,
  Illusion: GiDominoMask,
  Mysticism: FaEye,
  Restoration: FaBriefcaseMedical,
};

export default function SpellEffectSelector({
  onEffectSelect,
  equipmentType,
  onEquipmentTypeChange,
}: {
  onEffectSelect: (effect: SpellEffectDefinition) => void;
  equipmentType: EquipmentType;
  onEquipmentTypeChange: (type: EquipmentType) => void;
}) {
  const [search, setSearch] = useState('');
  const [schoolFilter, setSchoolFilter] = useState<School | null>(null);

  const { addedEffects } = useEnchantmentStore();

  const [spellEffectDefinitions, setSpellEffectDefinitions] = useState<SpellEffectDefinition[]>(
    weaponSpellEffectDefinitions,
  );

  useMemo(() => {
    if (equipmentType === 'Weapon') setSpellEffectDefinitions(weaponSpellEffectDefinitions);
    else if (equipmentType === 'Worn') setSpellEffectDefinitions(wornSpellEffectDefinitions);
  }, [equipmentType]);

  const filteredEffects: SpellEffectDefinition[] = spellEffectDefinitions.filter((effect) => {
    const addedSpellEffectIds = addedEffects.map((effect) => effect.id);
    return (
      effect.name.toLowerCase().includes(search.toLowerCase()) &&
      !addedSpellEffectIds.includes(effect.id) &&
      (schoolFilter === null || effect.school === schoolFilter)
    );
  });

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col place-items-center">
        <div className="text-sm text-ghost">Equipment</div>
        <ToggleButtonGroup
          exclusive
          value={equipmentType}
          onChange={(_e, type) => type !== null && onEquipmentTypeChange(type)}
          className="m-auto mb-4"
        >
          {equipmentTypes.map((type) => (
            <ToggleButton key={type} value={type} className="min-w-14 py-1 sm:min-w-32">
              {type}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      <TextField
        label="Search Effects"
        variant="outlined"
        size="small"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-2 px-2"
      />

      <div className="mb-2 flex flex-wrap gap-1 px-2">
        {schools.map((school) => {
          const Icon = schoolIcons[school];
          return (
            <Chip
              key={school}
              icon={<Icon className="!text-xs" />}
              label={school}
              size="small"
              variant={schoolFilter === school ? 'filled' : 'outlined'}
              color={schoolFilter === school ? 'primary' : 'default'}
              onClick={() => setSchoolFilter(schoolFilter === school ? null : school)}
              className="text-xs"
            />
          );
        })}
      </div>

      <div className="min-h-0 flex-1">
        <div className="h-full space-y-1 overflow-y-auto rounded-md border border-[#2e2e2e] p-1.5">
          {filteredEffects.map((effect) => (
            <Button
              key={effect.id}
              variant="outlined"
              fullWidth
              onClick={() => {
                setSearch('');
                onEffectSelect(effect);
              }}
              className="justify-start text-left normal-case"
            >
              <div className="flex items-center gap-2 p-0.5">
                <Tooltip title={effect.school}>
                  <Image
                    src={`/icons/spell-effects/${effect.id}.png`}
                    width={64}
                    height={64}
                    alt={effect.name}
                    className="h-7 w-7 lg:h-9 lg:w-9"
                  />
                </Tooltip>
                <span className="flex-1 text-sm lg:text-base">{effect.name}</span>
              </div>
            </Button>
          ))}

          {filteredEffects.length === 0 && <div className="text-sm italic">No effects found.</div>}
        </div>
      </div>
    </div>
  );
}
