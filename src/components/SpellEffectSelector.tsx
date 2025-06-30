import React, { useState } from 'react';
import { TextField, Button, Tooltip } from '@mui/material';
import Image from 'next/image';

import { spellEffectDefinitions, type SpellEffectDefinition } from '@/utils/spellEffectUtils';
import { useSpellStore } from '@/data/spellStore';

export default function SpellEffectSelector({
  onEffectSelect,
}: {
  onEffectSelect: (effect: SpellEffectDefinition) => void;
}) {
  const [search, setSearch] = useState('');

  const { addedEffects } = useSpellStore();

  const filteredEffects: SpellEffectDefinition[] = spellEffectDefinitions.filter((effect) => {
    const addedSpellEffectIds = addedEffects.map((effect) => effect.id);
    return (
      effect.name.toLowerCase().includes(search.toLowerCase()) &&
      !addedSpellEffectIds.includes(effect.id)
    );
  });

  return (
    <div className="flex h-full flex-col">
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
