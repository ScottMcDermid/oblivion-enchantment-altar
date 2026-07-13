'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Box, Button, IconButton, InputAdornment, Snackbar, StyledEngineProvider, TextField, Toolbar, Typography } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ShareIcon from '@mui/icons-material/Share';

import theme from '@/app/theme';
import { useShareEnchantment } from '@/hooks/useShareEnchantment';
import type { EnchantmentData } from '@/utils/enchantmentCodec';

import SpellEffectSelector from '@/components/SpellEffectSelector';
import {
  getMagickaCost,
  MIN_DURATION,
  MIN_MAGNITUDE,
  MIN_LEVEL_MAGNITUDE,
  lockLevels,
  magnitudeByLockLevel,
  attributes,
  skills as selectableSkills,
  type SpellEffectDefinition,
} from '@/utils/spellEffectUtils';

import { useEnchantmentStore } from '@/data/enchantmentStore';
import ActiveSpellEffects, { EffectsSkeleton } from '@/components/ActiveSpellEffects';
import ConfirmDialog from '@/components/ConfirmDialog';
import { SoulGemSelector } from '@/components/SoulGemSelector';
import { useHydrated } from '@/hooks/useHydrated';
import { cn } from '@/utils/cn';

function createDefaultEffect(definition: SpellEffectDefinition) {
  const magnitude = definition.availableParameters.includes('Magnitude')
    ? definition.selectableLockLevel
      ? magnitudeByLockLevel[lockLevels[0]]
      : definition.isLevelBasedMagnitude
        ? MIN_LEVEL_MAGNITUDE
        : MIN_MAGNITUDE
    : 0;
  const area = 0;
  const duration = definition.availableParameters.includes('Duration') ? MIN_DURATION : 0;

  const magickaCost = getMagickaCost({
    baseCost: definition.baseCost,
    isLevelBasedMagnitude: definition.isLevelBasedMagnitude,
    magnitude,
    area,
    duration,
  });

  return {
    id: definition.id,
    magnitude,
    area,
    duration,
    magickaCost,
    ...(definition.selectableAttribute && { attribute: attributes[0] }),
    ...(definition.selectableSkill && { skill: selectableSkills[0] }),
    ...(definition.selectableLockLevel && { lockLevel: lockLevels[0] }),
  };
}

const MAX_ITEM_NAME_LENGTH = 64;

export default function EnchantmentAltar({ sharedEnchantment }: { sharedEnchantment?: EnchantmentData }) {
  const isViewOnly = !!sharedEnchantment;
  const {
    addedEffects,
    equipmentType,
    itemName,
    actions: { addSpellEffect, resetEnchantment, removeSpellEffect, toggleEquipmentType, loadEnchantment, setItemName },
  } = useEnchantmentStore();
  const { copyShareUrl } = useShareEnchantment();
  const hydrated = useHydrated();
  const [expandedEffectId, setExpandedEffectId] = useState<string | null>(null);
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);
  const [isConfirmingEquipmentToggle, setIsConfirmingEquipmentToggle] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const handleReset = (confirm: boolean) => {
    if (confirm) {
      resetEnchantment();
      setExpandedEffectId(null);
    }
    setIsConfirmingReset(false);
  };

  const handleEquipmentToggle = (confirm: boolean) => {
    if (confirm) {
      toggleEquipmentType();
      setExpandedEffectId(null);
    }
    setIsConfirmingEquipmentToggle(false);
  };

  const handleShare = async () => {
    const success = await copyShareUrl();
    setSnackbarMessage(success ? 'Link copied to clipboard!' : 'Failed to copy link');
  };

  const handleCopyToMyAltar = () => {
    if (!sharedEnchantment) return;
    loadEnchantment({
      addedEffects: sharedEnchantment.effects,
      equipmentType: sharedEnchantment.equipmentType,
      soulGem: sharedEnchantment.soulGem,
    });
    setSnackbarMessage('Enchantment copied to your altar!');
    window.location.href = '/';
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Shared enchantment banner */}
        {isViewOnly && (
          <div className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-2 bg-yellow-900/80 px-4 py-2 text-sm text-yellow-200">
            <span>
              {sharedEnchantment?.name
                ? <><b>Viewing: </b><strong>{sharedEnchantment.name}</strong></>
                : 'Viewing a shared enchantment'}
            </span>
            <div className="flex gap-2">
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={handleCopyToMyAltar}
                className="text-xs normal-case"
              >
                Copy to my altar
              </Button>
              <Button
                size="small"
                variant="outlined"
                href="/"
                className="border-yellow-200/50 text-xs normal-case text-yellow-200"
              >
                Back to my altar
              </Button>
            </div>
          </div>
        )}

        <AppBar position="static" sx={{ backgroundColor: 'background.paper' }} elevation={1}>
          <Toolbar variant="dense" sx={{ gap: 1, overflow: 'hidden' }}>
            <IconButton
              component="a"
              href="https://oblivion.tools"
              size="small"
              aria-label="Oblivion Tools home"
              sx={{ p: 0.5 }}
            >
              <img src="/oblivion-tools-icon.ico" alt="Oblivion Tools" width={16} height={16} style={{ display: 'block' }} />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              sx={{ fontSize: '1rem', fontWeight: 'bold', color: 'secondary.main' }}
            >
              Oblivion Enchantment Altar
            </Typography>
            <Box sx={{ flex: 1 }} />
            {!isViewOnly && (
              <>
                {addedEffects.length > 0 && (
                  <>
                    <Button
                      size="small"
                      aria-label="Share Enchantment"
                      onClick={handleShare}
                      sx={{ minWidth: 0, px: { xs: '6px', sm: undefined } }}
                    >
                      <ShareIcon fontSize="small" />
                      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }, ml: 0.5 }}>Share</Box>
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      aria-label="Reset Enchantment"
                      onClick={() => setIsConfirmingReset(true)}
                      sx={{ minWidth: 0, px: { xs: '6px', sm: undefined } }}
                    >
                      <RestartAltIcon fontSize="small" />
                      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }, ml: 0.5 }}>Reset</Box>
                    </Button>
                  </>
                )}
              </>
            )}
          </Toolbar>
        </AppBar>

        <Box sx={{ height: 'calc(100vh - 48px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div className="flex h-full w-full flex-col gap-6 overflow-hidden bg-inherit sm:flex-row">
            {/* Spell effect selector (hidden in view-only mode) */}
            {!isViewOnly && (
              <div className="flex min-h-0 flex-1 flex-shrink-0 flex-col sm:max-w-80">
                <SpellEffectSelector
                  onEffectSelect={(effect) => {
                    if (equipmentType === 'Worn') {
                      addSpellEffect({
                        id: effect.id,
                        magickaCost: effect.baseCost,
                        magnitude: 0,
                        area: 0,
                        duration: 0,
                      });
                      return;
                    }
                    const defaultEffect = createDefaultEffect(effect);
                    addSpellEffect(defaultEffect);
                    setExpandedEffectId(effect.id);
                  }}
                  equipmentType={equipmentType}
                  onEquipmentTypeChange={() =>
                    addedEffects.length > 0
                      ? setIsConfirmingEquipmentToggle(true)
                      : toggleEquipmentType()
                  }
                />
              </div>
            )}

            <div className={cn(
              'flex h-full flex-1 flex-col overflow-y-auto bg-inherit lg:max-w-full',
              isViewOnly && 'mx-auto max-w-4xl',
            )}>
              <SoulGemSelector />
              {isViewOnly ? (
                <>
                  {sharedEnchantment?.name && (
                    <h2 className="mb-4 text-center text-2xl font-semibold text-gray-100">
                      {sharedEnchantment.name}
                    </h2>
                  )}
                  <ActiveSpellEffects
                    expandedEffectId={null}
                    onToggleExpand={() => {}}
                  />
                </>
              ) : (
                <>
                  {!hydrated && <EffectsSkeleton />}
                  <div className={cn(
                    'transition-opacity duration-200',
                    hydrated ? 'opacity-100' : 'h-0 overflow-hidden opacity-0',
                  )}>
                    <div className="mb-4">
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Unnamed Item"
                        label="Item Name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value.slice(0, MAX_ITEM_NAME_LENGTH))}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position="end">
                                <span className="text-xs text-gray-500">
                                  {itemName.length}/{MAX_ITEM_NAME_LENGTH}
                                </span>
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                    </div>
                    <ActiveSpellEffects
                      expandedEffectId={expandedEffectId}
                      onToggleExpand={(id) => {
                        if (equipmentType === 'Worn') {
                          removeSpellEffect(
                            addedEffects.find((e) => e.id === id)!,
                          );
                          return;
                        }
                        setExpandedEffectId((prev) => (prev === id ? null : id));
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </Box>
        <footer className="mt-16 w-full border-t border-gray-700 bg-neutral-900 px-6 py-8 text-sm text-gray-400">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 text-center sm:text-left">
            <div className="space-y-2">
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
            <div className="flex w-full justify-end">
              <a
                href="https://github.com/ScottMcDermid/oblivion-enchantment-altar"
                className="inline-flex items-center gap-2 rounded-md border border-transparent px-3 py-1 text-xs font-medium text-gray-400 transition hover:border-gray-600 hover:text-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current" focusable="false">
                  <path d="M12 .297C5.375.297 0 5.67 0 12.297c0 5.302 3.438 9.799 8.205 11.387.6.112.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.746.083-.73.083-.73 1.203.085 1.836 1.236 1.836 1.236 1.07 1.835 2.808 1.305 3.492.998.108-.775.418-1.305.762-1.606-2.665-.303-5.467-1.334-5.467-5.934 0-1.31.469-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.47 11.47 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.292-1.552 3.298-1.23 3.298-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.628-5.48 5.923.43.37.823 1.096.823 2.21 0 1.595-.015 2.882-.015 3.274 0 .32.22.694.825.576C20.565 22.092 24 17.597 24 12.297 24 5.67 18.627.297 12 .297z" />
                </svg>
                <span className="uppercase tracking-wide">GitHub</span>
              </a>
            </div>
          </div>
        </footer>

        {!isViewOnly && (
          <>
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
          </>
        )}

        <Snackbar
          open={snackbarMessage !== null}
          autoHideDuration={3000}
          onClose={() => setSnackbarMessage(null)}
          message={snackbarMessage}
        />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
