'use client';

import React from 'react';
import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FaBriefcaseMedical, FaEye, FaFeather, FaFireAlt } from 'react-icons/fa';
import { GiDevilMask, GiDominoMask } from 'react-icons/gi';
import type { IconType } from 'react-icons';

import { schools, type School } from '@/utils/spellEffectUtils';

const DRAWER_WIDTH = 280;

const schoolIcons: Record<School, IconType> = {
  Alteration: FaFeather,
  Conjuration: GiDevilMask,
  Destruction: FaFireAlt,
  Illusion: GiDominoMask,
  Mysticism: FaEye,
  Restoration: FaBriefcaseMedical,
};

function FiltersContent({
  schoolFilter,
  onSchoolFilterChange,
  sigilStonePatchEnabled,
  onSigilStonePatchChange,
}: {
  schoolFilter: School | null;
  onSchoolFilterChange: (school: School | null) => void;
  sigilStonePatchEnabled: boolean;
  onSigilStonePatchChange: (enabled: boolean) => void;
}) {
  return (
    <div className="space-y-4 p-4">
      {/* School chips */}
      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          School
        </div>
        <div className="flex flex-wrap gap-1.5">
          {schools.map((school) => {
            const Icon = schoolIcons[school];
            return (
              <Chip
                key={school}
                icon={<Icon className="!text-xs" />}
                label={school}
                size="small"
                variant={schoolFilter === school ? 'filled' : 'outlined'}
                color={schoolFilter === school ? 'primary' : 'default'}
                onClick={() => onSchoolFilterChange(schoolFilter === school ? null : school)}
                className="text-xs"
              />
            );
          })}
        </div>
      </div>

      {/* Vanilla / Patched toggle */}
      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Sigil Stone Values
        </div>
        <ToggleButtonGroup
          exclusive
          fullWidth
          value={sigilStonePatchEnabled ? 'patched' : 'vanilla'}
          onChange={(_e, val) => val !== null && onSigilStonePatchChange(val === 'patched')}
          size="small"
        >
          <ToggleButton value="vanilla" className="normal-case py-1.5">
            Vanilla
          </ToggleButton>
          <ToggleButton value="patched" className="normal-case py-1.5">
            Patched
          </ToggleButton>
        </ToggleButtonGroup>
        <p className="mt-1.5 text-[11px] text-gray-500">
          Patched fixes erroneous values corrected by the Unofficial Oblivion Patch and Remastered.
        </p>
      </div>
    </div>
  );
}

export default function EffectFilterDrawer({
  open,
  onClose,
  schoolFilter,
  onSchoolFilterChange,
  sigilStonePatchEnabled,
  onSigilStonePatchChange,
}: {
  open: boolean;
  onClose: () => void;
  schoolFilter: School | null;
  onSchoolFilterChange: (school: School | null) => void;
  sigilStonePatchEnabled: boolean;
  onSigilStonePatchChange: (enabled: boolean) => void;
}) {
  const isDesktop = useMediaQuery('(min-width: 1024px)', { defaultMatches: false });

  const sharedProps = { schoolFilter, onSchoolFilterChange, sigilStonePatchEnabled, onSigilStonePatchChange };

  // ── Desktop: MUI persistent Drawer ─────────────────────────────────────────
  if (isDesktop) {
    return (
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: open ? DRAWER_WIDTH : 0,
          flexShrink: 0,
          transition: 'width 225ms cubic-bezier(0.4, 0, 0.2, 1)',
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            position: 'relative',
            height: '100%',
            border: 'none',
            borderRight: '1px solid #2e2e2e',
            backgroundColor: 'inherit',
            overflowX: 'hidden',
            overflowY: 'auto',
          },
        }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-base font-semibold">Filters</h2>
          <IconButton aria-label="Close filters" onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <FiltersContent {...sharedProps} />
      </Drawer>
    );
  }

  // ── Mobile / tablet: MUI Dialog ─────────────────────────────────────────────
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ className: 'w-[90vw] max-w-sm sm:max-w-md' }}
    >
      <IconButton
        aria-label="Close filters"
        onClick={onClose}
        sx={{ position: 'absolute', right: 8, top: 8 }}
        size="small"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <DialogTitle className="text-base font-semibold">Filters</DialogTitle>
      <DialogContent className="!p-0">
        <FiltersContent {...sharedProps} />
      </DialogContent>
    </Dialog>
  );
}
