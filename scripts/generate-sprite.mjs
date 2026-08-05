/**
 * Generates a CSS sprite sheet from all PNGs in public/icons/spell-effects/.
 *
 * Output:
 *   public/icons/spell-effects-sprite.png  — the combined sprite image
 *   public/icons/spell-effects-sprite.json — map of icon name -> { x, y }
 *
 * Layout: 8 columns × N rows, each cell 64×64px (the source icon size).
 * Icons are placed in alphabetical order by filename.
 *
 * Usage: node scripts/generate-sprite.mjs
 *    or: pnpm sprite
 */

import sharp from 'sharp';
import { readdir, writeFile } from 'fs/promises';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const ICONS_DIR = join(ROOT, 'public', 'icons', 'spell-effects');
const OUT_PNG = join(ROOT, 'public', 'icons', 'spell-effects-sprite.png');
const OUT_JSON = join(ROOT, 'public', 'icons', 'spell-effects-sprite.json');

const CELL_SIZE = 64;
const COLUMNS = 8;

async function main() {
  // Collect and sort all PNG filenames
  const files = (await readdir(ICONS_DIR))
    .filter((f) => f.endsWith('.png'))
    .sort();

  const count = files.length;
  const rows = Math.ceil(count / COLUMNS);
  const spriteWidth = COLUMNS * CELL_SIZE;
  const spriteHeight = rows * CELL_SIZE;

  console.log(`Found ${count} icons → ${COLUMNS}×${rows} grid (${spriteWidth}×${spriteHeight}px)`);

  // Build composite inputs and JSON map
  const composites = [];
  const spriteMap = {};

  for (let i = 0; i < files.length; i++) {
    const name = basename(files[i], '.png');
    const col = i % COLUMNS;
    const row = Math.floor(i / COLUMNS);
    const x = col * CELL_SIZE;
    const y = row * CELL_SIZE;

    composites.push({
      input: join(ICONS_DIR, files[i]),
      left: x,
      top: y,
    });

    spriteMap[name] = { x, y };
  }

  // Create blank RGBA canvas and composite all icons onto it
  await sharp({
    create: {
      width: spriteWidth,
      height: spriteHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(composites)
    .png()
    .toFile(OUT_PNG);

  await writeFile(OUT_JSON, JSON.stringify(spriteMap, null, 2));

  console.log(`Written: public/icons/spell-effects-sprite.png`);
  console.log(`Written: public/icons/spell-effects-sprite.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
