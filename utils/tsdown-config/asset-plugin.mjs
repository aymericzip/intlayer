import { readFileSync } from 'node:fs';
import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';

const DEFAULT_PATTERNS = 'src/**/*.{md,mdx,txt,json}';
const DEFAULT_SRC_BASE_DIR = 'src';
const DEFAULT_ASSETS_DIRNAME_IN_DIST = 'assets';
const DEFAULT_COPY_IN = 'all';
const VIRTUAL_ID = 'utils:asset';
const RESOLVED_ID = '\0utils:asset';

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
  const patterns = Array.isArray(opts.patterns)
    ? opts.patterns
    : [opts.patterns ?? DEFAULT_PATTERNS];

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

      const cwd = process.cwd();
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
          await copyFile(fromAbs, toAbs);
        })
      );
    },
  };
};
