import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const hereDirname = () => {
  try {
    return dirname(fileURLToPath(import.meta.url));
  } catch {
    return typeof __dirname !== 'undefined' ? __dirname : process.cwd();
  }
};

const findDistRoot = (startDir) => {
  let dir = startDir;
  for (let i = 0; i < 12; i++) {
    const base = basename(dir);
    if (base === 'dist') return dir;
    const parent = resolve(dir, '..');
    if (parent === dir) break;
    dir = parent;
  }
  return null;
};

// --- FIX 1: normalize stack frame filenames (handles 'file://...' properly)
const normalizeFrameFile = (file) => {
  if (!file) return null;

  try {
    // If it's a file URL, convert to a filesystem path
    if (file.startsWith('file://')) return fileURLToPath(file);
  } catch {}
  return file;
};

/**
 * Returns the directory of the *caller* module that invoked readAsset.
 * Prefers non-virtual frames; falls back to the first real frame.
 */
const getCallerDir = () => {
  const prev = Error.prepareStackTrace;

  try {
    Error.prepareStackTrace = (_, structured) => structured;
    const err = new Error();

    Error.captureStackTrace(err, getCallerDir);
    /** @type {import('node:vm').CallSite[]} */
    const frames = err.stack || [];

    const isVirtualPath = (p) =>
      p.includes(`${sep}_virtual${sep}`) || p.includes('/_virtual/');

    // First pass: real (non-virtual) frames
    for (const frame of frames) {
      const raw =
        typeof frame.getFileName === 'function' ? frame.getFileName() : null;

      const file = normalizeFrameFile(raw);

      if (!file) continue;

      if (
        file.includes('node:internal') ||
        file.includes(`${sep}internal${sep}modules${sep}`)
      )
        continue;

      if (!isVirtualPath(file)) return dirname(file);
    }
    // Second pass: accept virtual if that's all we have
    for (const frame of frames) {
      const raw =
        typeof frame.getFileName === 'function' ? frame.getFileName() : null;
      const file = normalizeFrameFile(raw);

      if (file) return dirname(file);
    }
  } catch {
    // ignore
  } finally {
    Error.prepareStackTrace = prev;
  }

  return hereDirname();
};

/**
 * Read an asset copied from src/** to dist/assets/**.
 * - './' or '../' is resolved relative to the *caller module's* emitted directory.
 * - otherwise, treat as src-relative.
 *
 * @param {string} relPath - e.g. './PROMPT.md' or 'utils/AI/askDocQuestion/embeddings/<fileKey>.json'
 * @param {BufferEncoding} [encoding='utf8']
 */
export const readAsset = (relPath, encoding = 'utf8') => {
  const here = hereDirname();
  const distRoot = findDistRoot(here) ?? resolve(here, '..', '..', 'dist');
  const assetsRoot = join(distRoot, 'assets');

  const tried = [];

  // Determine caller subpath under dist/, stripping esm/ or cjs/ and _virtual/
  const callerDirAbs = getCallerDir();

  // --- FIX 2: ensure both sides are filesystem paths before relative()
  const callerSubpathRaw = relative(distRoot, callerDirAbs)
    .split('\\')
    .join('/');

  /**
   * Transform dist/(esm|cjs)/... and _virtual/ prefix to clean subpath (Windows-safe)
   */
  const callerSubpath = callerSubpathRaw
    .replace(/^(?:dist\/)?(?:esm|cjs)\//, '')
    .replace(/^_virtual\//, '');

  // 1) Relative path from caller (./ or ../)
  const looksRelative = relPath.startsWith('./') || relPath.startsWith('../');

  if (looksRelative) {
    // Use resolve to collapse any ../ correctly
    const fromCallerAbs = resolve(assetsRoot, callerSubpath, relPath);

    // 1.1) Path in assets source (/dist/assets/<caller-subpath>/<file>)
    tried.push(fromCallerAbs);

    if (existsSync(fromCallerAbs)) {
      return readFileSync(fromCallerAbs, encoding);
    }
  }

  // 2) Src-relative directly under assets (/dist/assets/my/file.txt)
  const directPath = join(assetsRoot, relPath);
  tried.push(directPath);

  if (existsSync(directPath)) {
    return readFileSync(directPath, encoding);
  }

  // 3) Fallback: caller subpath + src-relative (when virtual re-emits into subfolders)
  if (callerSubpath) {
    const nested = join(assetsRoot, callerSubpath, relPath);
    tried.push(nested);

    if (existsSync(nested)) {
      return readFileSync(nested, encoding);
    }
  }

  const msg = [
    'readAsset: file not found.',
    'Searched:',
    ...tried.map((p) => `- ${p}`),
  ].join('\n');

  throw new Error(msg);
};
