import * as ANSIColors from '@intlayer/config/colors';
import { colorize, colorizePath, logger, v, x } from '@intlayer/config/logger';
import { exists, readFileFromRoot } from './fileSystem';
import { installPackages, type PackageManager } from './packageManager';

/**
 * `babel.config.js` wiring the full Intlayer compiler + build-optimization
 * pipeline for Next.js.
 *
 * The four passes run in a fixed order — extract first (so dictionaries exist),
 * optimize last (because it erases the dictionary key the previous passes rely
 * on). `presets: ["next/babel"]` is required so Babel keeps compiling JSX/TS
 * the way Next.js does; without it the build breaks.
 */
export const NEXT_INTLAYER_BABEL_CONFIG_CONTENT = `const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extract: compile .content.ts files → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: remove unused fields from .intlayer/**/*.json
    //    (reads intlayer.config.ts build.purge flag)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: rename field keys in JSON + source code
    //    (reads intlayer.config.ts build.minify flag)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: rewrite useIntlayer('key') → useDictionary(hash)
    //    Must come last because it erases the dictionary key.
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
`;

/** Babel config filenames Next.js picks up, ordered by preference. */
const BABEL_CONFIG_CANDIDATES = [
  'babel.config.js',
  'babel.config.cjs',
  'babel.config.mjs',
  'babel.config.ts',
  'babel.config.json',
  '.babelrc',
  '.babelrc.js',
  '.babelrc.cjs',
  '.babelrc.json',
];

/** Dev dependency required to run the Intlayer Babel compiler passes. */
const INTLAYER_BABEL_PACKAGE = '@intlayer/babel';

/**
 * Returns the first existing config file from `candidates`, or `undefined` when
 * none are present.
 */
const findExistingConfig = async (
  rootDir: string,
  candidates: string[]
): Promise<string | undefined> => {
  for (const candidate of candidates) {
    if (await exists(rootDir, candidate)) return candidate;
  }
  return undefined;
};

/**
 * Wires the Intlayer compiler + build-optimization Babel plugins into a Next.js
 * project that already uses Babel.
 *
 * Only acts when a Babel config is detected. A default Next.js project compiles
 * with SWC, where the Intlayer optimize pass is injected automatically by
 * `withIntlayer` once `@intlayer/swc` is installed — no Babel config is needed,
 * so there is nothing to set up here. Writing a `babel.config.js` would in fact
 * be harmful: Next.js falls back from SWC to Babel as soon as one exists, which
 * disables both the project's SWC compiler and the `@intlayer/swc` plugin.
 *
 * When a Babel config is present it:
 *
 * 1. Installs `@intlayer/babel` as a dev dependency (unless already present or
 *    `skipInstall` is set).
 * 2. Leaves the existing config untouched and prints the plugins to add, since
 *    arbitrary user configs cannot be safely merged.
 *
 * Idempotent: re-running detects the already-wired `@intlayer/babel` import and
 * skips.
 *
 * @param rootDir - Project root directory.
 * @param packageManager - Detected package manager used to install the package.
 * @param allDeps - Combined prod + dev dependencies, used to skip a redundant install.
 * @param skipInstall - When `true`, dependency installation is skipped.
 */
export const setupNextCompilerBabelConfig = async ({
  rootDir,
  packageManager,
  allDeps,
  skipInstall,
}: {
  rootDir: string;
  packageManager: PackageManager;
  allDeps: Record<string, string>;
  skipInstall: boolean;
}): Promise<void> => {
  const existingBabelConfig = await findExistingConfig(
    rootDir,
    BABEL_CONFIG_CANDIDATES
  );

  // Nothing to wire into: the project compiles with SWC, where `withIntlayer`
  // injects the optimize pass automatically once `@intlayer/swc` is installed.
  if (!existingBabelConfig) return;

  // INSTALL @intlayer/babel
  if (!skipInstall && !allDeps[INTLAYER_BABEL_PACKAGE]) {
    logger(
      colorize(
        'Installing the Intlayer Babel compiler dependency...',
        ANSIColors.CYAN
      )
    );
    try {
      installPackages(rootDir, [INTLAYER_BABEL_PACKAGE], packageManager, true);
      logger(
        `${v} Installed: ${colorize(INTLAYER_BABEL_PACKAGE, ANSIColors.MAGENTA)}`
      );
    } catch {
      logger(
        `${x} Failed to install ${INTLAYER_BABEL_PACKAGE}. Please install manually: ${INTLAYER_BABEL_PACKAGE} (dev dependency)`,
        { level: 'warn' }
      );
    }
  }

  // EXISTING BABEL CONFIG — never overwrite, print the plugins to add instead.
  const content = await readFileFromRoot(rootDir, existingBabelConfig);

  if (content.includes(INTLAYER_BABEL_PACKAGE)) {
    logger(
      `${v} ${colorizePath(existingBabelConfig)} already includes the Intlayer compiler plugins`
    );
    return;
  }

  logger(
    `${x} ${colorizePath(existingBabelConfig)} already exists. Add the Intlayer compiler plugins manually:\n${NEXT_INTLAYER_BABEL_CONFIG_CONTENT}`,
    { level: 'warn' }
  );
};
