import { readFileSync } from 'node:fs';
import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';

const DEFAULT_PATTERNS = [
  'src/**/*.{md,mdx,txt,json}',
  '!src/**/*.test.*',
  '!src/**/*.stories.*',
  '!src/**/_*',
  '!src/**/*.spec.*',
  '!src/**/__tests__/**',
];
const DEFAULT_SRC_BASE_DIR = 'src';
const DEFAULT_ASSETS_DIRNAME_IN_DIST = 'assets';
const DEFAULT_COPY_IN = 'all';
const VIRTUAL_ID = 'utils:asset';
const RESOLVED_ID = '\0utils:asset';
const RETRYABLE_COPY_ERROR_CODES = new Set(['EBUSY', 'EPERM']);
const COPY_RETRY_ATTEMPTS = 5;
const COPY_RETRY_BASE_DELAY_MS = 50;

/**
 * In-flight copy per destination root. tsdown builds the esm/cjs/types
 * configs concurrently in one process, so without this the same file is
 * copied to the same path three times at once (EBUSY on Windows).
 * @type {Map<string, Promise<void>>}
 */
const inFlightCopies = new Map();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Copies a file, retrying on transient Windows lock errors (antivirus,
 * concurrent writers).
 * @param {string} fromAbs
 * @param {string} toAbs
 */
const copyFileWithRetry = async (fromAbs, toAbs) => {
  for (let attempt = 1; ; attempt++) {
    try {
      await copyFile(fromAbs, toAbs);
      return;
    } catch (error) {
      const isRetryable =
        RETRYABLE_COPY_ERROR_CODES.has(error?.code) &&
        attempt < COPY_RETRY_ATTEMPTS;
      if (!isRetryable) throw error;
      await sleep(COPY_RETRY_BASE_DELAY_MS * attempt);
    }
  }
};

/**
 * Copies every matched asset under `distAssetsRoot`, once per process for a
 * given destination even if several builds request it concurrently.
 * @param {{ cwd: string, patterns: string[], srcBaseDir: string, distAssetsRoot: string }} params
 */
const copyAssetsOnce = ({ cwd, patterns, srcBaseDir, distAssetsRoot }) => {
  const key = `${cwd}\0${distAssetsRoot}`;
  const pending = inFlightCopies.get(key);
  if (pending) return pending;

  const copy = (async () => {
    const entries = await fg(patterns, { cwd, dot: false });

    await Promise.all(
      entries.map(async (rel) => {
        // keep path relative to srcBaseDir
        const normalized = rel.replaceAll('\\', '/');
        const stripped = normalized.startsWith(`${srcBaseDir}/`)
          ? normalized.slice(srcBaseDir.length + 1)
          : normalized;

        const fromAbs = join(cwd, rel);
        const toAbs = join(distAssetsRoot, stripped);

        await mkdir(dirname(toAbs), { recursive: true });
        await copyFileWithRetry(fromAbs, toAbs);
      })
    );
  })().finally(() => {
    inFlightCopies.delete(key);
  });

  inFlightCopies.set(key, copy);
  return copy;
};

/**
 * A tsdown/rolldown-compatible plugin that:
 *  - exposes a virtual module "utils:asset"
 *  - copies asset files into dist/assets
 * @param {Object} opts - Plugin options
 * @param {string | string[]} [opts.patterns] - Glob(s) to copy from your source tree.
 * @param {string} [opts.srcBaseDir='src'] - Source root to strip when placing in dist/assets. For most repos this is 'src'.
 * @param {string} [opts.assetsDirnameInDist='assets'] - Where to put copied files inside dist.
 * @param {'esm'|'cjs'|'all'} [opts.copyIn='all'] - If you build multiple formats, you can choose to copy only on one of them to avoid redundant work.
 */
export const AssetPlugin = (opts = {}) => {
  const patterns = opts.patterns
    ? Array.isArray(opts.patterns)
      ? opts.patterns
      : [opts.patterns]
    : Array.isArray(DEFAULT_PATTERNS)
      ? DEFAULT_PATTERNS
      : [DEFAULT_PATTERNS];

  const srcBaseDir = opts.srcBaseDir ?? DEFAULT_SRC_BASE_DIR;
  const assetsDirnameInDist =
    opts.assetsDirnameInDist ?? DEFAULT_ASSETS_DIRNAME_IN_DIST;
  const copyIn = opts.copyIn ?? DEFAULT_COPY_IN;

  const dir = dirname(fileURLToPath(import.meta.url));

  // plugins/assetPlugin.mjs (only the virtualSource content changed)
  const virtualSource = readFileSync(
    join(dir, 'asset-plugin-virtual-source.mjs'),
    'utf-8'
  );

  return {
    name: 'asset-plugin',

    // Make sure the virtual id is resolved
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
      return null;
    },

    // Provide the virtual module source
    load(id) {
      if (id === RESOLVED_ID) return virtualSource;
      return null;
    },

    async writeBundle(outputOptions) {
      // Determine whether we should copy for this output
      // tsdown passes Rollup-style outputOptions; we infer format from it.
      const fmt = (outputOptions?.format ?? '').toLowerCase();

      if (copyIn !== 'all' && fmt && copyIn !== fmt) return;

      const outDir = outputOptions?.dir;
      if (!outDir) return;

      const distAssetsRoot = join(outDir, '..', assetsDirnameInDist);

      await copyAssetsOnce({
        cwd: process.cwd(),
        patterns,
        srcBaseDir,
        distAssetsRoot,
      });
    },
  };
};
