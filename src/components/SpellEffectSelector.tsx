import React, { useMemo, useState } from 'react';
import { TextField, Button, Tooltip, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Image from 'next/image';

import {
  equipmentTypes,
  weaponSpellEffectDefinitions,
  wornSpellEffectDefinitions,
  type EquipmentType,
  type SpellEffectDefinition,
} from '@/utils/spellEffectUtils';
import { useEnchantmentStore } from '@/data/enchantmentStore';

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
      !addedSpellEffectIds.includes(effect.id)
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
        className="mb-4 px-2"
      />

      <div className="min-h-0 flex-1">
        <div className="h-full space-y-2 overflow-y-auto rounded-md border border-[#2e2e2e] p-2">
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
              <div className="flex items-center gap-3 p-1">
                <Tooltip title={effect.school}>
                  <Image
                    src={`/icons/spell-effects/${effect.id}.png`}
                    width={64}
                    height={64}
                    alt={effect.name}
                    className="h-10 w-10 lg:h-16 lg:w-16"
                  />
                </Tooltip>
                <span className="flex-1 text-lg">{effect.name}</span>
              </div>
            </Button>
          ))}

          {filteredEffects.length === 0 && <div className="text-sm italic">No effects found.</div>}
        </div>
      </div>
    </div>
  );
}
