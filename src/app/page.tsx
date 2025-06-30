'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, StyledEngineProvider } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '@/app/theme';

import SpellEffectSelector from '@/components/SpellEffectSelector';
import AddSpellEffectDialog from '@/components/AddSpellEffectDialog';
import {
  SpellEffect,
  spellEffectDefinitionById,
  type SpellEffectDefinition,
} from '@/utils/spellEffectUtils';

import { useSpellStore } from '@/data/spellStore';
import ActiveSpellEffects from '@/components/ActiveSpellEffects';
import ActiveSpellSummary from '@/components/ActiveSpellSummary';
import CharacterSkillsDrawer from '@/components/CharacterSkillsDrawer';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function Home() {
  const {
    addedEffects,
    actions: { addSpellEffect, resetSpell },
  } = useSpellStore();
  const [isAddSpellEffectOpen, setIsAddSpellEffectOpen] = useState(false);
  const [isCharacterSkillsOpen, setIsCharacterSkillsOpen] = useState(false);
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);
  const [editEffect, setEditEffect] = useState<SpellEffect | null>(null);
  const [selectedEffect, setSelectedEffect] = useState<SpellEffectDefinition | null>(null);

  const handleReset = (confirm: boolean) => {
    if (confirm) {
      resetSpell();
    }
    setIsConfirmingReset(false);
  };

  useEffect(() => {
    if (!isAddSpellEffectOpen) setEditEffect(null);
  }, [isAddSpellEffectOpen]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <h1 className="absolute w-screen text-center text-lg">Oblivion Enchantment Altar</h1>
        <div className="max-w-screen m-auto flex h-screen max-h-screen max-w-6xl flex-col bg-inherit">
          {/* Title */}

          {/* Nav bar */}
          <div className="z-20 flex h-12 w-full flex-row justify-between px-2 pt-6 sm:pt-2">
            <div className="flex place-items-center">
              <Button
                variant="contained"
                aria-label="Adjust your skills"
                onClick={() => setIsCharacterSkillsOpen(true)}
              >
                <BookIcon />
                <div className="hidden sm:block">&nbsp;Skills</div>
              </Button>
              {addedEffects.length > 0 && (
                <Button
                  className="mx-2"
                  color="error"
                  aria-label="Reset Character"
                  onClick={() => setIsConfirmingReset(true)}
                >
                  <DeleteIcon />
                  <div className="hidden sm:block">&nbsp;Reset</div>
                </Button>
              )}
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col justify-center gap-6 overflow-y-auto bg-inherit pt-4 sm:flex-row">
            <div className="flex min-h-0 flex-1 flex-shrink-0 flex-col sm:max-w-80">
              <SpellEffectSelector
                onEffectSelect={(effect) => {
                  setSelectedEffect(effect);
                  setIsAddSpellEffectOpen(true);
                }}
              />
            </div>

            <div className="mt-3 max-h-80 flex-1 bg-inherit sm:max-h-full lg:max-w-full">
              <ActiveSpellEffects
                onEffectSelect={(effect) => {
                  setSelectedEffect(spellEffectDefinitionById[effect.id]);
                  setEditEffect(effect);
                  setIsAddSpellEffectOpen(true);
                }}
              />
              <div className="mt-3">{addedEffects.length > 0 && <ActiveSpellSummary />}</div>
            </div>
          </div>
        </div>

        {selectedEffect && (
          <AddSpellEffectDialog
            effectDefinition={selectedEffect}
            open={isAddSpellEffectOpen}
            {...(editEffect && { effect: editEffect })}
            onClose={() => setIsAddSpellEffectOpen(false)}
            onSpellEffectConfirmed={(effect) => {
              addSpellEffect(effect);
              setIsAddSpellEffectOpen(false);
            }}
          />
        )}

        <CharacterSkillsDrawer
          open={isCharacterSkillsOpen}
          onClose={() => setIsCharacterSkillsOpen(false)}
        />

        <ConfirmDialog
          open={isConfirmingReset}
          description="This will delete all spell effects"
          handleClose={handleReset}
        />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
