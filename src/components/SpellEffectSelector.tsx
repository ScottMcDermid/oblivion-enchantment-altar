'use client';

import React, { useMemo, useState } from 'react';
import {
  TextField,
  Button,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  IconButton,
  Badge,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Image from 'next/image';

import {
  equipmentTypes,
  weaponSpellEffectDefinitions,
  wornSpellEffectDefinitions,
  type EquipmentType,
  type School,
  type SpellEffectDefinition,
} from '@/utils/spellEffectUtils';
import { getSigilStoneEffectName, sigilStoneDefinitions, type SigilStoneDefinition } from '@/utils/sigilStoneUtils';
import { useEnchantmentStore } from '@/data/enchantmentStore';

export default function SpellEffectSelector({
  onEffectSelect,
  equipmentType,
  onEquipmentTypeChange,
  showSigilStones,
  schoolFilter,
  onToggleFilterDrawer,
}: {
  onEffectSelect: (effect: SpellEffectDefinition) => void;
  equipmentType: EquipmentType;
  onEquipmentTypeChange: (type: EquipmentType) => void;
  showSigilStones: boolean;
  schoolFilter: School | null;
  onToggleFilterDrawer: () => void;
}) {
  const [search, setSearch] = useState('');

  const { addedEffects, sigilStoneId, actions: { setSigilStone } } = useEnchantmentStore();

  const spellEffectDefinitions = useMemo(
    () => equipmentType === 'Weapon' ? weaponSpellEffectDefinitions : wornSpellEffectDefinitions,
    [equipmentType],
  );

  const addedSpellEffectIds = useMemo(
    () => addedEffects.map((e) => e.id),
    [addedEffects],
  );

  const filteredEffects: SpellEffectDefinition[] = useMemo(
    () => spellEffectDefinitions.filter((effect) =>
      effect.name.toLowerCase().includes(search.toLowerCase()) &&
      !addedSpellEffectIds.includes(effect.id) &&
      (schoolFilter === null || effect.school === schoolFilter),
    ),
    [spellEffectDefinitions, search, addedSpellEffectIds, schoolFilter],
  );

  const filteredStones: SigilStoneDefinition[] = useMemo(
    () => sigilStoneDefinitions.filter((stone) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        getSigilStoneEffectName(stone, 'weapon').toLowerCase().includes(q) ||
        getSigilStoneEffectName(stone, 'worn').toLowerCase().includes(q)
      );
    }),
    [search],
  );

  return (
    <div className="flex h-full flex-col">
      {/* Equipment type toggle */}
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

      {/* Search field + filter button */}
      <div className="mb-2 flex items-center gap-1 px-1">
        <TextField
          placeholder={showSigilStones ? 'Search sigil stones...' : 'Search effects...'}
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ fontSize: 18, color: '#fff' }} />
              </InputAdornment>
            ),
          }}
          sx={{ '& .MuiOutlinedInput-root': { fontSize: '0.85rem' } }}
        />
        <Tooltip title="Filter effects">
          <IconButton
            onClick={onToggleFilterDrawer}
            size="small"
            sx={{ color: '#9ca3af' }}
          >
            <Badge
              color="secondary"
              variant="dot"
              invisible={schoolFilter === null && !showSigilStones}
            >
              <FilterListIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </div>

      {/* Effect / sigil stone list */}
      <div className="min-h-0 flex-1">
        <div className="h-full space-y-1 overflow-y-auto rounded-md border border-[#2e2e2e] p-1.5">
          {showSigilStones ? (
            <>
              {filteredStones.map((stone) => {
                const isSelected = sigilStoneId === stone.id;
                return (
                  <Button
                    key={stone.id}
                    variant={isSelected ? 'contained' : 'outlined'}
                    color={isSelected ? 'primary' : 'inherit'}
                    fullWidth
                    onClick={() => setSigilStone(isSelected ? null : stone.id)}
                    className="justify-start text-left normal-case"
                    sx={{ borderColor: isSelected ? undefined : '#3a3a3a' }}
                  >
                    <div className="flex items-center gap-2 p-0.5">
                      <Image
                        src="/icons/sigil-stone.png"
                        width={64}
                        height={64}
                        alt="Sigil Stone"
                        className="h-7 w-7 flex-shrink-0 object-contain lg:h-9 lg:w-9"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm lg:text-base">
                          {getSigilStoneEffectName(stone, equipmentType === 'Weapon' ? 'weapon' : 'worn')}
                        </span>
                        <span className="mt-0.5 w-fit rounded bg-yellow-900/50 px-1.5 py-0.5 text-[10px] leading-none text-yellow-300">
                          Sigil Stone
                        </span>
                      </div>
                    </div>
                  </Button>
                );
              })}
              {filteredStones.length === 0 && (
                <div className="text-sm italic text-gray-500">No sigil stones found.</div>
              )}
            </>
          ) : (
            <>
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
              {filteredEffects.length === 0 && (
                <div className="text-sm italic">No effects found.</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
