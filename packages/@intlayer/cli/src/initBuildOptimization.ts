import { existsSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import * as p from '@clack/prompts';
import {
  detectPackageManager,
  installPackages,
  NEXT_INTLAYER_BABEL_CONFIG_CONTENT,
} from '@intlayer/engine/cli';
import { findProjectRoot } from './init';

/** Intlayer build optimization plugin choices for Next.js. */
export type BuildOptimizationPlugin = 'babel' | 'swc';

/** Babel config filenames Next.js picks up, ordered by preference. */
const BABEL_CONFIG_CANDIDATES = [
  'babel.config.js',
  'babel.config.cjs',
  'babel.config.mjs',
  'babel.config.ts',
];

/**
 * Interactive prompt to select a build optimization plugin for Next.js and
 * scaffold the required files. The two options are independent — pick one:
 *
 * - `@intlayer/babel` — runs the full compiler pipeline (extract, purge, minify,
 *   optimize) through Babel. Installs `@intlayer/babel` and creates a
 *   `babel.config.js`.
 * - `@intlayer/swc` — lightweight SWC plugin that rewrites `useIntlayer` imports.
 *   Installs only the dependency; `withIntlayer` wires it in automatically, so
 *   no config file is required.
 *
 * @param projectRoot - Optional project root; defaults to the current directory.
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
        value: 'babel',
        label: '@intlayer/babel',
        hint: 'Full pipeline — extract, purge, minify and optimize via Babel; creates babel.config.js',
      },
      {
        value: 'swc',
        label: '@intlayer/swc',
        hint: 'Lightweight — SWC plugin that rewrites useIntlayer imports; wired automatically by withIntlayer',
      },
    ],
  })) as BuildOptimizationPlugin;

  if (p.isCancel(plugin) || !plugin) {
    p.cancel('Operation cancelled.');
    return;
  }

  const packageManager = detectPackageManager(root);
  const packageToInstall =
    plugin === 'babel' ? '@intlayer/babel' : '@intlayer/swc';

  const spinner = p.spinner();
  spinner.start('Installing packages...');

  try {
    installPackages(root, [packageToInstall], packageManager, true);
    spinner.stop(`Installed: ${packageToInstall}`);
  } catch {
    spinner.stop('Package installation failed');
    p.log.warn(`Please install manually: ${packageToInstall} (dev dependency)`);
  }

  // SWC needs no extra setup — withIntlayer injects the plugin at build time.
  if (plugin === 'swc') {
    p.outro('Build optimization configuration complete');
    return;
  }

  // BABEL — scaffold babel.config.js with the full compiler pipeline.
  const existingBabelConfig = BABEL_CONFIG_CANDIDATES.find((file) =>
    existsSync(join(root, file))
  );

  if (existingBabelConfig) {
    p.log.warn(
      `${existingBabelConfig} already exists — add the Intlayer plugins manually.`
    );
    p.note(
      NEXT_INTLAYER_BABEL_CONFIG_CONTENT,
      'Plugins to add to your babel config'
    );
  } else {
    try {
      writeFileSync(
        join(root, 'babel.config.js'),
        NEXT_INTLAYER_BABEL_CONFIG_CONTENT,
        { encoding: 'utf-8' }
      );
      p.log.success(
        'Created babel.config.js with the Intlayer compiler plugins (extract, purge, minify, optimize)'
      );
    } catch {
      p.log.warn(
        'Could not create babel.config.js — please create it manually.'
      );
      p.note(NEXT_INTLAYER_BABEL_CONFIG_CONTENT, 'babel.config.js');
    }
  }

  p.outro('Build optimization configuration complete');
};
