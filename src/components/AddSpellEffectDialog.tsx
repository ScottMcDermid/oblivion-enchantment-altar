'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FlashOn from '@mui/icons-material/FlashOn';
import AttachMoney from '@mui/icons-material/AttachMoney';

import {
  getMagickaCost,
  getGoldCost,
  MAX_AREA,
  MAX_DURATION,
  MAX_MAGNITUDE,
  MIN_AREA,
  MIN_DURATION,
  MIN_MAGNITUDE,
  type SpellEffect,
  type SpellEffectDefinition,
  type SpellEffectRange,
  applySkillMultiplier,
  spellEffectDefinitionById,
  attributes,
  skills as selectableSkills,
  Attribute,
  Skill,
  lockLevels,
  LockLevel,
  magnitudeByLockLevel,
} from '@/utils/spellEffectUtils';

import ToggleButtons from '@/components/ToggleButtons';
import { useSpellStore } from '@/data/spellStore';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SpellEffectDialog(props: {
  effectDefinition: SpellEffectDefinition;
  open: boolean;
  effect?: SpellEffect;
  onClose: () => void;
  onSpellEffectConfirmed: (effectDefinition: SpellEffect) => void;
}) {
  const [range, setRange] = useState<SpellEffectRange>('Touch');
  const [magnitude, setMagnitude] = useState(MIN_MAGNITUDE);
  const [area, setArea] = useState(MIN_AREA);
  const [duration, setDuration] = useState(MIN_DURATION);
  const [attribute, setAttribute] = useState(
    props.effect?.attribute ? props.effect.attribute : attributes[0],
  );
  const [skill, setSkill] = useState(
    props.effect?.skill ? props.effect.skill : selectableSkills[0],
  );
  const [lockLevel, setLockLevel] = useState(
    props.effect?.lockLevel ? props.effect.lockLevel : lockLevels[0],
  );

  const {
    skills,
    luck,
    actions: { removeSpellEffect },
  } = useSpellStore();

  const baseMagickaCost = useMemo(
    () =>
      getMagickaCost({
        baseCost: props.effectDefinition.baseCost,
        magnitude,
        area,
        duration,
        range,
      }),
    [props.effectDefinition.baseCost, range, magnitude, area, duration],
  );

  const magickaCost = useMemo(
    () =>
      applySkillMultiplier(
        baseMagickaCost,
        skills[spellEffectDefinitionById[props.effectDefinition.id].school],
        luck,
      ),
    [baseMagickaCost, skills, luck, props.effectDefinition.id],
  );

  const goldCost = useMemo(() => getGoldCost(magickaCost), [magickaCost]);

  useEffect(() => {
    if (!props.open) return;

    if (props.effect) {
      setMagnitude(props.effect.magnitude);
      setArea(props.effect.area);
      setDuration(props.effect.duration);
      setRange(props.effect.range);
      setAttribute(props.effect.attribute ?? attributes[0]);
      setSkill(props.effect.skill ?? selectableSkills[0]);
      setLockLevel(props.effect.lockLevel ?? lockLevels[0]);
    } else {
      setMagnitude(
        props.effectDefinition.availableParameters.includes('Magnitude') ? MIN_MAGNITUDE : 0,
      );
      setArea(0);
      setDuration(
        props.effectDefinition.availableParameters.includes('Duration') ? MIN_DURATION : 0,
      );
      setRange(props.effectDefinition.availableRanges[0]);
      setAttribute(attributes[0]);
      setSkill(selectableSkills[0]);
      setLockLevel(lockLevels[0]);
    }
  }, [
    props.open,
    props.effect,
    props.effectDefinition.availableParameters,
    props.effectDefinition.availableRanges,
  ]);

  useEffect(() => {
    if (props.effectDefinition.selectableLockLevel) {
      setMagnitude(magnitudeByLockLevel[lockLevel]);
    }
  }, [lockLevel, props.effectDefinition.selectableLockLevel]);

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      keepMounted={false}
      TransitionProps={{
        onExited: () => props.onClose,
      }}
      PaperProps={{
        className: 'w-[90vw] max-w-md sm:max-w-lg md:max-w-lg',
      }}
    >
      <IconButton
        aria-label="close"
        onClick={props.onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent className="p-3">
        <div className="my-2 pr-8 text-3xl">{props.effectDefinition.name}</div>

        <div className="space-y-6 p-4">
          {props.effectDefinition.selectableAttribute && (
            <FormControl className="w-full">
              <InputLabel id="attribute-select-label">Attribute</InputLabel>
              <Select
                labelId="attribute-select-label"
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

          {props.effectDefinition.selectableSkill && (
            <FormControl className="w-full">
              <InputLabel id="skill-select-label">Skill</InputLabel>
              <Select
                labelId="skill-select-label"
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

          {props.effectDefinition.selectableLockLevel && (
            <FormControl className="w-full">
              <InputLabel id="lock-level-select-label">LockLevel</InputLabel>
              <Select
                labelId="lock-level-select-label"
                value={lockLevel}
                label="LockLevel"
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

          {props.effectDefinition.availableRanges.length > 1 && (
            <ToggleButtons
              name="Range"
              value={range}
              options={props.effectDefinition.availableRanges}
              onChangeHandler={(range) => setRange(range as SpellEffectRange)}
            />
          )}

          {props.effectDefinition.availableParameters.includes('Magnitude') && (
            <div>
              <div className="mb-1 flex justify-between">
                <label>Magnitude</label>
                <span>{magnitude} pts</span>
              </div>
              <Slider
                value={magnitude}
                aria-label="Magnitude"
                onChange={(_, val) => setMagnitude(val as number)}
                min={MIN_MAGNITUDE}
                max={MAX_MAGNITUDE}
              />
            </div>
          )}
          {props.effectDefinition.availableParameters.includes('Area') && (
            <div>
              <div className="mb-1 flex justify-between">
                <label>Area</label>
                <span>{area} ft</span>
              </div>
              <Slider
                value={area}
                aria-label="Area"
                onChange={(_, val) => setArea((val as number) < MIN_AREA ? 0 : (val as number))}
                min={MIN_AREA - 1}
                max={MAX_AREA}
              />
            </div>
          )}
          {props.effectDefinition.availableParameters.includes('Duration') && (
            <div>
              <div className="mb-1 flex justify-between">
                <label>Duration</label>
                <span>{duration}s</span>
              </div>

              <Slider
                value={duration}
                aria-label="Duration"
                onChange={(_, val) => setDuration(val as number)}
                min={MIN_DURATION}
                max={MAX_DURATION}
              />
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions className="space-between flex">
        <div className="flex w-full place-items-center gap-4 text-lg">
          <Tooltip title="Magicka Cost">
            <div className="flex items-center gap-1">
              <FlashOn fontSize="small" />
              <span>{Intl.NumberFormat().format(magickaCost)}</span>
            </div>
          </Tooltip>

          <Tooltip title="Gold Cost">
            <div className="flex items-center gap-1">
              <AttachMoney fontSize="small" />
              <span>{Intl.NumberFormat().format(goldCost)}</span>
            </div>
          </Tooltip>
        </div>
        <div className="flex flex-1 justify-end">
          {props.effect && (
            <>
              <IconButton
                className="mx-2 sm:hidden"
                color="error"
                aria-label="Remove Spell"
                onClick={() => {
                  if (props.effect) {
                    removeSpellEffect(props.effect);
                    props.onClose();
                  }
                }}
              >
                <DeleteIcon />
                <div className="hidden sm:block">&nbsp;Remove</div>
              </IconButton>
              <Button
                className="mx-2 hidden sm:inline"
                color="error"
                aria-label="Remove Spell"
                onClick={() => {
                  if (props.effect) {
                    removeSpellEffect(props.effect);
                    props.onClose();
                  }
                }}
              >
                Remove
              </Button>
            </>
          )}
          <Button
            variant="contained"
            onClick={() => {
              const spellEffectConfig: SpellEffect = {
                id: props.effectDefinition.id,
                range,
                magnitude,
                area,
                duration,
                magickaCost: baseMagickaCost,
                ...(props.effectDefinition.selectableAttribute && { attribute }),
                ...(props.effectDefinition.selectableSkill && { skill }),
                ...(props.effectDefinition.selectableLockLevel && { lockLevel }),
              };
              props.onSpellEffectConfirmed(spellEffectConfig);
            }}
          >
            {props.effect ? 'Modify' : 'Add'}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
