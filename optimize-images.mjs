#!/usr/bin/env node
/**
 * optimize-images.mjs — resize + re-encode images for web (Next.js / static sites).
 *
 * WHAT IT DOES
 *   Walks <input> recursively and, for every PNG/JPG/JPEG/WEBP:
 *     - optionally downscales to a max width (aspect preserved, never enlarges);
 *     - re-encodes to WebP (if the source has an alpha channel) or JPG (otherwise);
 *     - prints a per-file and total before/after size report.
 *   Non-destructive by default — originals are left untouched and results go to
 *   <input>-optimized/ (override with --output, or overwrite with --in-place).
 *
 * WHY (for next/image projects)
 *   next/image already re-encodes at request time, so the bytes a browser
 *   receives are independent of the source format. This tool shrinks the
 *   *sources* — repo size, clone/CI cost, and the first-request server-side
 *   decode spike (the real cost of, say, a 7 MB hero PNG).
 *
 * REQUIREMENTS
 *   Node 18+ and sharp. sharp ships with Next.js, so the easiest way to run
 *   this is from inside a project whose node_modules has sharp:
 *       cd ~/.../ArtStudio-landingpage
 *       node ../ArtStudio/optimize-images.mjs --input public --width 1600
 *   Or install it anywhere (`npm i sharp`) or point at an install explicitly:
 *       SHARP_PATH=/abs/node_modules/sharp node optimize-images.mjs --input <dir>
 *
 * USAGE
 *   node optimize-images.mjs --input <dir> [options]
 *
 *   Options:
 *     --input <dir>       Source directory (scanned recursively). Required.
 *     --output <dir>      Destination dir (structure mirrored). Default: <input>-optimized
 *     --width <px>        Max output width; wider images are downscaled (aspect
 *                         kept, never enlarged). Omit to keep original resolution.
 *     --format <f>        auto | webp | jpg   (default: auto)
 *                         auto = webp if source has alpha, else jpg.
 *     --quality <1-100>   Encoder quality. Default: 82.
 *     --in-place          Overwrite the originals (and delete the old file when
 *                         the extension changes). Default: off (non-destructive).
 *     --min-size <KB>     Skip files smaller than this. Default: 0.
 *     -h, --help          Show this header.
 *
 * EXAMPLES
 *   # Uniform pass: everything under public/ to <=1600px, auto format, q82
 *   node optimize-images.mjs --input public --width 1600
 *
 *   # Reproduce the ArtStudio-landingpage optimization (run from that project
 *   # root; per-subfolder widths match each image's on-screen display size):
 *   node ../ArtStudio/optimize-images.mjs --input public/gallery --width 2304 --in-place
 *   node ../ArtStudio/optimize-images.mjs --input public/hero    --width 1000 --in-place
 *   node ../ArtStudio/optimize-images.mjs --input public/color   --width 960  --in-place
 *   node ../ArtStudio/optimize-images.mjs --input public/frames  --width 1000 --in-place
 *   node ../ArtStudio/optimize-images.mjs --input public/story   --in-place        # convert only
 *
 * NOTE
 *   Changing extensions (png -> webp/jpg) means <Image src=...> references in
 *   code must be updated. Use the default (non-destructive) mode first to
 *   review, then swap the files in and fix the src paths.
 */

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

/* ------------------------------------------------------------------ *
 * Resolve sharp: try SHARP_PATH, then the cwd's node_modules (so you
 * can run this from a Next.js project that ships sharp), then the
 * script's own location.
 * ------------------------------------------------------------------ */
function loadSharp() {
  const req = createRequire(import.meta.url);
  const attempts = [];
  if (process.env.SHARP_PATH) attempts.push(process.env.SHARP_PATH);
  try { attempts.push(req.resolve('sharp', { paths: [process.cwd()] })); } catch {}
  try { attempts.push(req.resolve('sharp')); } catch {}
  for (const a of attempts) {
    try { return req(a); } catch {}
  }
  return null;
}
const sharp = loadSharp();
if (!sharp) {
  console.error('✗ sharp not found. Run from a project that has sharp installed, or set SHARP_PATH.');
  process.exit(1);
}

/* ----------------------------- arg parsing ----------------------------- */
function parseArgs() {
  const a = process.argv.slice(2);
  const opts = { input: null, output: null, width: null, format: 'auto', quality: 82, inPlace: false, minSize: 0 };
  for (let i = 0; i < a.length; i++) {
    const k = a[i];
    const v = () => a[++i];
    switch (k) {
      case '--input':    opts.input = v(); break;
      case '--output':   opts.output = v(); break;
      case '--width':    opts.width = parseInt(v(), 10); break;
      case '--format':   opts.format = v(); break;
      case '--quality':  opts.quality = parseInt(v(), 10); break;
      case '--in-place': opts.inPlace = true; break;
      case '--min-size': opts.minSize = parseFloat(v()) * 1024; break;
      case '-h':
      case '--help':
        console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8'));
        process.exit(0);
      default:
        console.error('✗ unknown argument:', k, '\n   use --help');
        process.exit(2);
    }
  }
  if (!opts.input) { console.error('✗ --input is required'); process.exit(2); }
  if (!['auto', 'webp', 'jpg'].includes(opts.format)) { console.error('✗ --format must be auto|webp|jpg'); process.exit(2); }
  return opts;
}
const opts = parseArgs();

/* ------------------------------- helpers ------------------------------- */
const EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);
function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (EXT.has(path.extname(e.name).toLowerCase())) yield p;
  }
}
const chooseFormat = (hasAlpha) => (opts.format === 'auto' ? (hasAlpha ? 'webp' : 'jpg') : opts.format);

async function processFile(src, inputRoot) {
  const meta = await sharp(src).metadata();
  const fmt = chooseFormat(meta.hasAlpha);

  let pipe = sharp(src, { failOn: 'none' });
  if (opts.width && (meta.width || 0) > opts.width) {
    pipe = pipe.resize({ width: opts.width, withoutEnlargement: true });
  }
  if (fmt === 'webp') pipe = pipe.webp({ quality: opts.quality });
  else                pipe = pipe.jpeg({ quality: opts.quality, mozjpeg: true });

  const rel = path.relative(inputRoot, src);
  const stem = path.basename(src, path.extname(src));
  const outPath = opts.inPlace
    ? path.join(path.dirname(src), `${stem}.${fmt}`)
    : path.join(opts.output, path.dirname(rel), `${stem}.${fmt}`);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const before = fs.statSync(src).size;
  // Write to a temp file first so in-place re-encoding of the same name is safe.
  const tmp = `${outPath}.tmp`;
  await pipe.toFile(tmp);
  fs.renameSync(tmp, outPath);
  const after = fs.statSync(outPath).size;

  // Extension changed under --in-place: remove the original source file.
  if (opts.inPlace && path.resolve(outPath) !== path.resolve(src)) {
    fs.rmSync(src, { force: true });
  }
  return { src, outPath, before, after, fmt };
}

/* -------------------------------- main -------------------------------- */
(async () => {
  const root = path.resolve(opts.input);
  if (!fs.existsSync(root)) { console.error('✗ input not found:', root); process.exit(1); }
  if (!opts.inPlace && !opts.output) opts.output = `${root}-optimized`;

  const files = [...walk(root)].filter((f) => fs.statSync(f).size >= opts.minSize);
  if (!files.length) {
    console.log(`no matching images found under ${root}`);
    return;
  }

  let totalBefore = 0, totalAfter = 0;
  for (const f of files) {
    const r = await processFile(f, root);
    totalBefore += r.before;
    totalAfter += r.after;
    const pct = r.before > 0 ? (r.after / r.before * 100).toFixed(0) : '0';
    console.log(
      `${(r.before / 1048576).toFixed(2).padStart(7)}MB -> ${(r.after / 1048576).toFixed(2).padStart(6)}MB (${pct.padStart(3)}%)  ` +
      `${path.relative(root, r.src)}  =>  .${r.fmt}`
    );
  }
  const pct = totalBefore > 0 ? (totalAfter / totalBefore * 100).toFixed(0) : '0';
  console.log(`\nTOTAL  ${(totalBefore / 1048576).toFixed(2)}MB -> ${(totalAfter / 1048576).toFixed(2)}MB (${pct}%)  across ${files.length} files`);
  if (!opts.inPlace) console.log(`\nOutput written to: ${opts.output}  (originals untouched)`);
})();
