import { existsSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import * as p from '@clack/prompts';
import { detectPackageManager, installPackages } from '@intlayer/chokidar/cli';
import { findProjectRoot } from './init';

/** Intlayer build optimization plugin choices for Next.js. */
export type BuildOptimizationPlugin = 'swc' | 'babel';

/**
 * babel.config.js that adds purge + minify passes for Next.js.
 * The @intlayer/swc plugin handles the optimize (import-rewriting) pass;
 * these Babel plugins cover field removal and field renaming.
 */
const BABEL_CONFIG_CONTENT = `const {
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  getPurgePluginOptions,
  getMinifyPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Purge: removes unused content fields from .intlayer/**/*.json
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: renames content field keys in JSON and source code
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // Note: intlayerOptimizeBabelPlugin is NOT needed here —
    // @intlayer/swc handles the useIntlayer → useDictionary rewrite.
  ],
};
`;

/**
 * Interactive prompt to select a build optimization plugin for Next.js and
 * scaffold the required files.
 *
 * - `@intlayer/swc`   — quicker: SWC plugin for import rewriting only.
 * - `@intlayer/babel` — more advanced: adds purge + minify Babel passes on top
 *                       of the SWC plugin; creates `babel.config.js`.
 */
export const initBuildOptimization = async (
  projectRoot?: string
): Promise<void> => {
  const root = findProjectRoot(
    projectRoot ? resolve(projectRoot) : process.cwd()
  );
  p.intro('Configuring Next.js build optimization');

  const plugin = (await p.select({
    message: 'Which build optimization plugin do you want to use?',
    options: [
      {
        value: 'swc',
        label: '@intlayer/swc',
        hint: 'Quicker — SWC plugin rewrites useIntlayer imports at build time',
      },
      {
        value: 'babel',
        label: '@intlayer/babel',
        hint: 'More advanced — adds purge + minify passes on top of SWC; creates babel.config.js',
      },
    ],
  })) as BuildOptimizationPlugin;

  if (p.isCancel(plugin) || !plugin) {
    p.cancel('Operation cancelled.');
    return;
  }

  const packageManager = detectPackageManager(root);
  const devPackagesToInstall: string[] = ['@intlayer/swc'];

  if (plugin === 'babel') {
    devPackagesToInstall.push('@intlayer/babel');
  }

  const spinner = p.spinner();
  spinner.start('Installing packages...');

  try {
    installPackages(root, devPackagesToInstall, packageManager, true);
    spinner.stop(`Installed: ${devPackagesToInstall.join(', ')}`);
  } catch {
    spinner.stop('Package installation failed');
    p.log.warn(
      `Please install manually: ${devPackagesToInstall.join(' ')} (dev dependency)`
    );
  }

  if (plugin === 'babel') {
    const babelConfigCandidates = [
      'babel.config.js',
      'babel.config.cjs',
      'babel.config.mjs',
      'babel.config.ts',
    ];

    const existingBabelConfig = babelConfigCandidates.find((file) =>
      existsSync(join(root, file))
    );

    if (existingBabelConfig) {
      p.log.warn(
        `${existingBabelConfig} already exists — add the Intlayer plugins manually.`
      );
      p.note(BABEL_CONFIG_CONTENT, 'Plugins to add to your babel config');
    } else {
      try {
        writeFileSync(join(root, 'babel.config.js'), BABEL_CONFIG_CONTENT, {
          encoding: 'utf-8',
        });
        p.log.success(
          'Created babel.config.js with Intlayer purge and minify plugins'
        );
      } catch {
        p.log.warn(
          'Could not create babel.config.js — please create it manually.'
        );
        p.note(BABEL_CONFIG_CONTENT, 'babel.config.js');
      }
    }
  }

  p.outro('Build optimization configuration complete');
};
