'use client';

import React, { useEffect, useState } from 'react';
import { Drawer, Slider } from '@mui/material';

import { schools } from '@/utils/spellEffectUtils';
import { useSpellStore } from '@/data/spellStore';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';

export default function CharacterSkillsDrawer(props: { open: boolean; onClose: () => void }) {
  const {
    luck,
    skills,
    actions: { setSkills, setLuck },
  } = useSpellStore();

  const [localSkills, setLocalSkills] = useState(skills);
  const [localLuck, setLocalLuck] = useState(luck);

  const debouncedSetSkill = useDebouncedCallback<[string, number]>(
    (school: string, val: number) => {
      setSkills({ [school]: val });
    },
    50,
  );

  const debouncedSetLuck = useDebouncedCallback<[number]>((val: number) => {
    setLuck(val);
  }, 50);

  useEffect(() => {
    setLocalSkills(skills);
  }, [skills]);

  useEffect(() => {
    setLocalLuck(luck);
  }, [luck]);

  return (
    <Drawer anchor="left" open={props.open} onClose={props.onClose}>
      <div className="w-64 space-y-6 p-4 px-6">
        <h2 className="mb-4 text-lg font-bold">Skills</h2>

        {schools.map((school) => (
          <div key={school}>
            <div className="mb-1 flex justify-between text-sm">
              <label>{school}</label>
              <span>{localSkills[school]}</span>
            </div>
            <Slider
              value={localSkills[school]}
              onChange={(_, val) => {
                setLocalSkills({ ...localSkills, [school]: val });
                debouncedSetSkill(school, val as number);
              }}
              min={1}
              max={100}
            />
          </div>
        ))}
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <label>Luck</label>
            <span>{localLuck}</span>
          </div>
          <Slider
            value={localLuck}
            onChange={(_, val) => {
              setLocalLuck(val as number);
              debouncedSetLuck(val as number);
            }}
            min={1}
            max={100}
          />
        </div>
      </div>
    </Drawer>
  );
}
