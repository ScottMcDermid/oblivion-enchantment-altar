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
  attributes,
  skills as selectableSkills,
  Attribute,
  Skill,
  MAX_LEVEL_MAGNITUDE,
  MIN_LEVEL_MAGNITUDE,
} from '@/utils/spellEffectUtils';

import { useEnchantmentStore } from '@/data/enchantmentStore';
import DeleteIcon from '@mui/icons-material/Delete';
import { getConstantEffectMagnitude } from '@/utils/enchantmentUtils';

export default function SpellEffectDialog(props: {
  effectDefinition: SpellEffectDefinition;
  open: boolean;
  effect?: SpellEffect;
  onClose: () => void;
  onSpellEffectConfirmed: (effectDefinition: SpellEffect) => void;
}) {
  const [magnitude, setMagnitude] = useState(MIN_MAGNITUDE);
  const [area, setArea] = useState(MIN_AREA);
  const [duration, setDuration] = useState(MIN_DURATION);
  const [attribute, setAttribute] = useState(
    props.effect?.attribute ? props.effect.attribute : attributes[0],
  );
  const [skill, setSkill] = useState(
    props.effect?.skill ? props.effect.skill : selectableSkills[0],
  );
  const {
    equipmentType,
    soulGem,
    actions: { removeSpellEffect },
  } = useEnchantmentStore();

  const magickaCost = useMemo(
    () =>
      getMagickaCost({
        baseCost: props.effectDefinition.baseCost,
        isLevelBasedMagnitude: props.effectDefinition.isLevelBasedMagnitude,
        magnitude,
        area,
        duration,
      }),
    [
      props.effectDefinition.baseCost,
      props.effectDefinition.isLevelBasedMagnitude,
      magnitude,
      area,
      duration,
    ],
  );

  const goldCost = useMemo(
    () =>
      getGoldCost({
        equipmentType,
        effect: {
          id: props.effectDefinition.id,
          magnitude,
          magickaCost,
          area,
          duration,
        },
        soulGem,
      }),
    [magickaCost, equipmentType, props.effectDefinition.id, soulGem, magnitude, area, duration],
  );

  useEffect(() => {
    if (!props.open) return;

    if (props.effect) {
      setMagnitude(props.effect.magnitude);
      setArea(props.effect.area);
      setDuration(props.effect.duration);
      setAttribute(props.effect.attribute ?? attributes[0]);
      setSkill(props.effect.skill ?? selectableSkills[0]);
    } else {
      setMagnitude(
        props.effectDefinition.availableParameters.includes('Magnitude')
          ? equipmentType === 'Worn'
            ? getConstantEffectMagnitude(props.effectDefinition.id, soulGem)
            : props.effectDefinition.isLevelBasedMagnitude
              ? MIN_LEVEL_MAGNITUDE
              : MIN_MAGNITUDE
          : 0,
      );
      setArea(0);
      setDuration(
        props.effectDefinition.availableParameters.includes('Duration') ? MIN_DURATION : 0,
      );
      setAttribute(attributes[0]);
      setSkill(selectableSkills[0]);
    }
  }, [props.open, props.effect, props.effectDefinition, equipmentType, soulGem]);

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

          {props.effectDefinition.availableParameters.includes('Magnitude') && (
            <div>
              <div className="mb-1 flex justify-between">
                <label>Magnitude</label>
                {props.effectDefinition.isLevelBasedMagnitude ? (
                  <span>
                    {props.effectDefinition.unit} {magnitude}
                  </span>
                ) : (
                  <span>
                    {magnitude} {props.effectDefinition.unit}
                  </span>
                )}
              </div>
              <Slider
                value={magnitude}
                aria-label="Magnitude"
                onChange={(_, val) => setMagnitude(val as number)}
                min={
                  props.effectDefinition.isLevelBasedMagnitude ? MIN_LEVEL_MAGNITUDE : MIN_MAGNITUDE
                }
                max={
                  props.effectDefinition.isLevelBasedMagnitude ? MAX_LEVEL_MAGNITUDE : MAX_MAGNITUDE
                }
              />
            </div>
          )}
          {props.effectDefinition.availableParameters.includes('Area') && (
            <div>
              <div className="mb-1 flex justify-between">
                <label>Area</label>
                <span>{area > 0 ? `${area} ft` : '-'}</span>
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
                magnitude,
                area,
                duration,
                magickaCost,
                ...(props.effectDefinition.selectableAttribute && { attribute }),
                ...(props.effectDefinition.selectableSkill && { skill }),
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
