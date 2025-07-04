'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, StyledEngineProvider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '@/app/theme';

import SpellEffectSelector from '@/components/SpellEffectSelector';
import AddSpellEffectDialog from '@/components/AddSpellEffectDialog';
import {
  SpellEffect,
  spellEffectDefinitionById,
  type SpellEffectDefinition,
} from '@/utils/spellEffectUtils';

import { useEnchantmentStore } from '@/data/enchantmentStore';
import ActiveSpellEffects from '@/components/ActiveSpellEffects';
import EnchantmentSummary from '@/components/EnchantmentSummary';
import ConfirmDialog from '@/components/ConfirmDialog';
import { SoulGemSelector } from '@/components/SoulGemSelector';

export default function Home() {
  const {
    addedEffects,
    equipmentType,
    actions: { addSpellEffect, resetEnchantment, removeSpellEffect, toggleEquipmentType },
  } = useEnchantmentStore();
  const [isAddSpellEffectOpen, setIsAddSpellEffectOpen] = useState(false);
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);
  const [isConfirmingEquipmentToggle, setIsConfirmingEquipmentToggle] = useState(false);
  const [editEffect, setEditEffect] = useState<SpellEffect | null>(null);
  const [selectedEffect, setSelectedEffect] = useState<SpellEffectDefinition | null>(null);

  const handleReset = (confirm: boolean) => {
    if (confirm) {
      resetEnchantment();
    }
    setIsConfirmingReset(false);
  };

  const handleEquipmentToggle = (confirm: boolean) => {
    if (confirm) {
      toggleEquipmentType();
    }
    setIsConfirmingEquipmentToggle(false);
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

          <div className="flex w-full flex-1 flex-col justify-center gap-6 overflow-y-auto bg-inherit sm:flex-row">
            <div className="flex min-h-0 flex-1 flex-shrink-0 flex-col sm:max-w-80">
              <SpellEffectSelector
                onEffectSelect={(effect) => {
                  if (equipmentType === 'Worn')
                    return addSpellEffect({
                      id: effect.id,
                      magickaCost: effect.baseCost,
                      magnitude: 0,
                      area: 0,
                      duration: 0,
                    });
                  setSelectedEffect(effect);
                  setIsAddSpellEffectOpen(true);
                }}
                equipmentType={equipmentType}
                onEquipmentTypeChange={() =>
                  addedEffects.length > 0
                    ? setIsConfirmingEquipmentToggle(true)
                    : toggleEquipmentType()
                }
              />
            </div>

            <div className="mt-3 max-h-80 flex-1 bg-inherit sm:max-h-full lg:max-w-full">
              <SoulGemSelector />
              <ActiveSpellEffects
                onEffectSelect={(effect) => {
                  if (equipmentType === 'Worn') return removeSpellEffect(effect);
                  setSelectedEffect(spellEffectDefinitionById[effect.id]);
                  setEditEffect(effect);
                  setIsAddSpellEffectOpen(true);
                }}
              />
              <div className="mt-3">{addedEffects.length > 0 && <EnchantmentSummary />}</div>
            </div>
          </div>
        </div>
        <footer className="mt-16 w-full border-t border-gray-700 bg-neutral-900 px-6 py-8 text-sm text-gray-400">
          <div className="mx-auto max-w-4xl space-y-2 text-center">
            <p>Oblivion Tool Suite © 2025 Scott McDermid</p>
            <p>
              Licensed under the{' '}
              <a
                href="https://www.gnu.org/licenses/gpl-3.0.html"
                className="underline hover:text-gray-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                GNU General Public License v3.0
              </a>
              .
            </p>
            <p>
              The Elder Scrolls and Oblivion are trademarks of Bethesda Softworks LLC, a ZeniMax
              Media company.
            </p>
            <p>This site is fan-made and not affiliated with Bethesda.</p>
          </div>
        </footer>

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

        <ConfirmDialog
          open={isConfirmingReset}
          description="This will delete all enchantment effects"
          handleClose={handleReset}
        />

        <ConfirmDialog
          open={isConfirmingEquipmentToggle}
          description="This will delete all enchantment effects"
          handleClose={handleEquipmentToggle}
        />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
