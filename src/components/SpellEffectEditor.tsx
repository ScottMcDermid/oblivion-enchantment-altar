'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Tooltip,
} from '@mui/material';
import FlashOn from '@mui/icons-material/FlashOn';
import AttachMoney from '@mui/icons-material/AttachMoney';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  getMagickaCost,
  getGoldCost,
  MAX_AREA,
  MAX_DURATION,
  MAX_MAGNITUDE,
  MAX_LEVEL_MAGNITUDE,
  MIN_AREA,
  MIN_DURATION,
  MIN_MAGNITUDE,
  MIN_LEVEL_MAGNITUDE,
  type SpellEffect,
  type SpellEffectDefinition,
  attributes,
  skills as selectableSkills,
  type Attribute,
  type Skill,
  lockLevels,
  type LockLevel,
  magnitudeByLockLevel,
} from '@/utils/spellEffectUtils';

import { useEnchantmentStore } from '@/data/enchantmentStore';

const THROTTLE_MS = 150;

export default function SpellEffectEditor({
  effect,
  effectDefinition,
}: {
  effect: SpellEffect;
  effectDefinition: SpellEffectDefinition;
}) {
  const [magnitude, setMagnitude] = useState(effect.magnitude);
  const [area, setArea] = useState(effect.area);
  const [duration, setDuration] = useState(effect.duration);
  const [attribute, setAttribute] = useState<Attribute>(effect.attribute ?? attributes[0]);
  const [skill, setSkill] = useState<Skill>(effect.skill ?? selectableSkills[0]);
  const [lockLevel, setLockLevel] = useState<LockLevel>(effect.lockLevel ?? lockLevels[0]);

  const {
    equipmentType,
    soulGem,
    actions: { addSpellEffect, removeSpellEffect },
  } = useEnchantmentStore();

  const throttleRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const magickaCost = useMemo(
    () =>
      getMagickaCost({
        baseCost: effectDefinition.baseCost,
        isLevelBasedMagnitude: effectDefinition.isLevelBasedMagnitude,
        magnitude,
        area,
        duration,
      }),
    [effectDefinition.baseCost, effectDefinition.isLevelBasedMagnitude, magnitude, area, duration],
  );

  const goldCost = useMemo(
    () =>
      getGoldCost({
        equipmentType,
        effect: {
          id: effectDefinition.id,
          magnitude,
          magickaCost,
          area,
          duration,
        },
        soulGem,
      }),
    [magickaCost, equipmentType, effectDefinition.id, soulGem, magnitude, area, duration],
  );

  // Build the current effect object from local state
  const buildEffect = useCallback(
    (): SpellEffect => ({
      id: effectDefinition.id,
      magnitude,
      area,
      duration,
      magickaCost,
      ...(effectDefinition.selectableAttribute && { attribute }),
      ...(effectDefinition.selectableSkill && { skill }),
      ...(effectDefinition.selectableLockLevel && { lockLevel }),
    }),
    [effectDefinition, magnitude, area, duration, magickaCost, attribute, skill, lockLevel],
  );

  // Throttled store update
  const flushUpdate = useCallback(() => {
    if (throttleRef.current) {
      clearTimeout(throttleRef.current);
      throttleRef.current = null;
    }
    addSpellEffect(buildEffect());
  }, [addSpellEffect, buildEffect]);

  const scheduleUpdate = useCallback(() => {
    if (throttleRef.current) {
      clearTimeout(throttleRef.current);
    }
    throttleRef.current = setTimeout(flushUpdate, THROTTLE_MS);
  }, [flushUpdate]);

  // Flush pending updates on unmount
  useEffect(() => {
    return () => {
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }
    };
  }, []);

  // Schedule store update whenever local state changes (skip initial mount)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    scheduleUpdate();
    return () => {
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
        throttleRef.current = null;
      }
    };
  }, [magnitude, area, duration, attribute, skill, lockLevel, scheduleUpdate]);

  // Lock level -> magnitude sync
  useEffect(() => {
    if (effectDefinition.selectableLockLevel) {
      setMagnitude(magnitudeByLockLevel[lockLevel]);
    }
  }, [lockLevel, effectDefinition.selectableLockLevel]);

  return (
    <div className="border-t border-[#2e2e2e] bg-[#1a1a1a] px-4 py-3">
      <div className="space-y-4">
        {effectDefinition.selectableAttribute && (
          <FormControl className="w-full" size="small">
            <InputLabel id={`attribute-select-${effect.id}`}>Attribute</InputLabel>
            <Select
              labelId={`attribute-select-${effect.id}`}
              value={attribute}
              label="Attribute"
              onChange={(e) => setAttribute(e.target.value as Attribute)}
            >
              {attributes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {effectDefinition.selectableSkill && (
          <FormControl className="w-full" size="small">
            <InputLabel id={`skill-select-${effect.id}`}>Skill</InputLabel>
            <Select
              labelId={`skill-select-${effect.id}`}
              value={skill}
              label="Skill"
              onChange={(e) => setSkill(e.target.value as Skill)}
            >
              {selectableSkills.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {effectDefinition.selectableLockLevel && (
          <FormControl className="w-full" size="small">
            <InputLabel id={`lock-level-select-${effect.id}`}>Lock Level</InputLabel>
            <Select
              labelId={`lock-level-select-${effect.id}`}
              value={lockLevel}
              label="Lock Level"
              onChange={(e) => setLockLevel(e.target.value as LockLevel)}
            >
              {lockLevels.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {effectDefinition.availableParameters.includes('Magnitude') && (
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <label>Magnitude</label>
              {effectDefinition.isLevelBasedMagnitude ? (
                <span>
                  {effectDefinition.unit} {magnitude}
                </span>
              ) : (
                <span>
                  {magnitude} {effectDefinition.unit}
                </span>
              )}
            </div>
            <Slider
              value={magnitude}
              size="small"
              aria-label="Magnitude"
              onChange={(_, val) => setMagnitude(val as number)}
              min={effectDefinition.isLevelBasedMagnitude ? MIN_LEVEL_MAGNITUDE : MIN_MAGNITUDE}
              max={effectDefinition.isLevelBasedMagnitude ? MAX_LEVEL_MAGNITUDE : MAX_MAGNITUDE}
            />
          </div>
        )}

        {effectDefinition.availableParameters.includes('Area') && (
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <label>Area</label>
              <span>{area > 0 ? `${area} ft` : '-'}</span>
            </div>
            <Slider
              value={area}
              size="small"
              aria-label="Area"
              onChange={(_, val) => setArea((val as number) < MIN_AREA ? 0 : (val as number))}
              min={MIN_AREA - 1}
              max={MAX_AREA}
            />
          </div>
        )}

        {effectDefinition.availableParameters.includes('Duration') && (
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <label>Duration</label>
              <span>{duration}s</span>
            </div>
            <Slider
              value={duration}
              size="small"
              aria-label="Duration"
              onChange={(_, val) => setDuration(val as number)}
              min={MIN_DURATION}
              max={MAX_DURATION}
            />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <Tooltip title="Magicka Cost">
            <div className="flex items-center gap-1">
              <FlashOn fontSize="small" />
              <span>{Intl.NumberFormat().format(Math.floor(magickaCost))}</span>
            </div>
          </Tooltip>
          <Tooltip title="Gold Cost">
            <div className="flex items-center gap-1">
              <AttachMoney fontSize="small" />
              <span>{Intl.NumberFormat().format(Math.floor(goldCost))}</span>
            </div>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2">
          <IconButton
            className="sm:hidden"
            color="error"
            size="small"
            aria-label="Remove Effect"
            onClick={() => removeSpellEffect(effect)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
          <Button
            className="hidden sm:inline-flex"
            color="error"
            size="small"
            aria-label="Remove Effect"
            onClick={() => removeSpellEffect(effect)}
            startIcon={<DeleteIcon fontSize="small" />}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
