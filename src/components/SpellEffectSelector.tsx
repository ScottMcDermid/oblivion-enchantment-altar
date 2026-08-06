'use client';

import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
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
import SpellEffectIcon from '@/components/SpellEffectIcon';
import { GiBroadsword, GiChestArmor, GiCrystalBall, GiSpellBook } from 'react-icons/gi';

import {
  equipmentTypes,
  spellEffectDefinitionById,
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
  onSigilStoneSelect,
  equipmentType,
  onEquipmentTypeChange,
  showSigilStones,
  onModeChange,
  schoolFilter,
  onToggleFilterDrawer,
}: {
  onEffectSelect: (effect: SpellEffectDefinition) => void;
  onSigilStoneSelect: (id: string | null) => void;
  equipmentType: EquipmentType;
  onEquipmentTypeChange: (type: EquipmentType) => void;
  showSigilStones: boolean;
  onModeChange: (showSigilStones: boolean) => void;
  schoolFilter: School | null;
  onToggleFilterDrawer: () => void;
}) {
  const [search, setSearch] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { addedEffects, sigilStoneId } = useEnchantmentStore();

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
      const side = equipmentType === 'Weapon' ? 'weapon' : 'worn' as const;
      const activeEffectId = side === 'weapon' ? stone.weaponEffectId : stone.wornEffectId;
      const school = spellEffectDefinitionById[activeEffectId].school;
      if (schoolFilter !== null && school !== schoolFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        getSigilStoneEffectName(stone, 'weapon').toLowerCase().includes(q) ||
        getSigilStoneEffectName(stone, 'worn').toLowerCase().includes(q)
      );
    }),
    [search, schoolFilter, equipmentType],
  );

  const listLength = showSigilStones ? filteredStones.length : filteredEffects.length;

  // Reset focused index when filtered results change
  useEffect(() => {
    setFocusedIndex(-1);
    itemRefs.current = [];
  }, [search, showSigilStones, listLength]);

  // Global '/' hotkey: focus the search field
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key !== '/') return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement).isContentEditable) return;
      e.preventDefault();
      searchInputRef.current?.focus();
    };
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Navigate the list with arrow keys / hjkl
  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setSearch('');
      searchInputRef.current?.blur();
      return;
    }

    if (e.key === 'Enter') {
      if (listLength > 0) {
        e.preventDefault();
        setFocusedIndex(0);
        itemRefs.current[0]?.focus();
      }
      return;
    }

    const isDown = e.key === 'ArrowDown' || e.key === 'j';
    const isUp = e.key === 'ArrowUp' || e.key === 'k';
    if (!isDown && !isUp) return;

    e.preventDefault();
    setFocusedIndex((prev) => {
      const next = isDown
        ? Math.min(prev + 1, listLength - 1)
        : Math.max(prev - 1, 0);
      itemRefs.current[next]?.focus();
      return next;
    });
  }, [listLength]);

  // Navigate the list from within the list itself (h/j/k/l + arrows)
  const handleListKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const isDown = e.key === 'ArrowDown' || e.key === 'j' || e.key === 'l';
    const isUp = e.key === 'ArrowUp' || e.key === 'k' || e.key === 'h';
    if (!isDown && !isUp) return;

    e.preventDefault();
    setFocusedIndex((prev) => {
      const next = isDown
        ? Math.min(prev + 1, listLength - 1)
        : Math.max(prev - 1, 0);
      itemRefs.current[next]?.focus();
      return next;
    });
  }, [listLength]);

  return (
    <div className="flex h-full flex-col">
      {/* Equipment type toggle */}
      <div className="mb-3 flex flex-col place-items-center">
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Equipment</div>
        <ToggleButtonGroup
          exclusive
          fullWidth
          value={equipmentType}
          onChange={(_e, type) => type !== null && onEquipmentTypeChange(type)}
          size="small"
        >
          {equipmentTypes.map((type) => (
            <ToggleButton key={type} value={type} className="normal-case gap-1.5 py-1.5">
              {type === 'Weapon' ? <GiBroadsword className="text-base" /> : <GiChestArmor className="text-base" />}
              {type}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      {/* Effects / Sigil Stones toggle */}
      <div className="mb-3 flex flex-col place-items-center">
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Type</div>
        <ToggleButtonGroup
          exclusive
          fullWidth
          value={showSigilStones ? 'sigil-stones' : 'effects'}
          onChange={(_e, val) => val !== null && onModeChange(val === 'sigil-stones')}
          size="small"
        >
          <ToggleButton value="effects" className="normal-case gap-1.5 py-1.5">
            <GiSpellBook className="text-base" />
            Effects
          </ToggleButton>
          <ToggleButton
            value="sigil-stones"
            className="normal-case gap-1.5 py-1.5"
          >
            <GiCrystalBall className="text-base" />
            Sigil Stones
          </ToggleButton>
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
          onKeyDown={handleSearchKeyDown}
          inputRef={searchInputRef}
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
              invisible={schoolFilter === null}
            >
              <FilterListIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </div>

      {/* Effect / sigil stone list */}
      <div className="min-h-0 flex-1">
        <div className="h-full space-y-1 overflow-y-auto rounded-md border border-[#2e2e2e] p-1.5" onKeyDown={handleListKeyDown}>
          {showSigilStones ? (
            <>
              {filteredStones.map((stone, i) => {
                const isSelected = sigilStoneId === stone.id;
                const isFocused = focusedIndex === i;
                return (
                  <Button
                    key={stone.id}
                    ref={(el) => { itemRefs.current[i] = el; }}
                    variant={isSelected ? 'contained' : 'outlined'}
                    color={isSelected ? 'primary' : 'inherit'}
                    fullWidth
                    onClick={() => onSigilStoneSelect(isSelected ? null : stone.id)}
                    className="justify-start text-left normal-case"
                    sx={{
                      borderColor: isSelected ? undefined : '#3a3a3a',
                      ...(isFocused && !isSelected && { outline: '2px solid', outlineColor: 'secondary.main', outlineOffset: '1px' }),
                    }}
                  >
                    <div className="flex items-center gap-2 p-0.5">
                      <SpellEffectIcon
                        id={equipmentType === 'Weapon' ? stone.weaponEffectId : stone.wornEffectId}
                        size={28}
                        alt={getSigilStoneEffectName(stone, equipmentType === 'Weapon' ? 'weapon' : 'worn')}
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
              {filteredEffects.map((effect, i) => {
                const isFocused = focusedIndex === i;
                return (
                  <Button
                    key={effect.id}
                    ref={(el) => { itemRefs.current[i] = el; }}
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      setSearch('');
                      onEffectSelect(effect);
                    }}
                    className="justify-start text-left normal-case"
                    sx={isFocused ? { outline: '2px solid', outlineColor: 'secondary.main', outlineOffset: '1px' } : undefined}
                  >
                    <div className="flex items-center gap-2 p-0.5">
                      <Tooltip title={effect.school}>
                        <SpellEffectIcon
                          id={effect.id}
                          size={28}
                          alt={effect.name}
                        />
                      </Tooltip>
                      <span className="flex-1 text-sm lg:text-base">{effect.name}</span>
                    </div>
                  </Button>
                );
              })}
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
