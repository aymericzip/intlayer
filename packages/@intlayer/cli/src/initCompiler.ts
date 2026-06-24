import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import * as p from '@clack/prompts';
import { detectPackageManager, installPackages } from '@intlayer/chokidar/cli';
import { findProjectRoot } from './init';

/** Framework the Intlayer compiler can be wired into during init. */
type CompilerFramework = 'vite' | 'nextjs' | 'unknown';

/**
 * babel.config.js that runs the Intlayer compiler passes for Next.js.
 *
 * Mirrors the Next.js (Babel) tab of `docs/docs/en/compiler.md`: the extract
 * plugin pulls inline content into dictionaries and the optimize plugin
 * rewrites `useIntlayer` into direct dictionary imports. On Vite the same work
 * is handled by the `intlayerCompiler()` plugin, so no Babel config is needed.
 */
const BABEL_COMPILER_CONFIG_CONTENT = `const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Extract content from components into dictionaries
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Optimize imports by replacing useIntlayer with direct dictionary imports
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
`;

/**
 * Reads the project dependencies and detects which framework the compiler
 * should target. Next.js is checked before Vite because a Next.js project may
 * transitively depend on Vite tooling.
 */
const detectCompilerFramework = (root: string): CompilerFramework => {
  try {
    const packageJsonPath = join(root, 'package.json');
    if (!existsSync(packageJsonPath)) return 'unknown';

    const { dependencies = {}, devDependencies = {} } = JSON.parse(
      readFileSync(packageJsonPath, 'utf-8')
    );
    const allDependencies = { ...dependencies, ...devDependencies };

    if (allDependencies.next) return 'nextjs';
    if (allDependencies.vite) return 'vite';

    return 'unknown';
  } catch {
    return 'unknown';
  }
};

/**
 * Scaffolds the Intlayer compiler for the current project during interactive
 * init.
 *
 * - **Vite** — nothing to do: the compiler is plugged in directly through the
 *   `intlayerCompiler()` plugin in `vite.config.ts`, so this only confirms the
 *   setup to the user.
 * - **Next.js** — installs `@intlayer/babel` and writes a `babel.config.js`
 *   that runs the extract + optimize compiler passes.
 *
 * In non-interactive init this function is never called, so the compiler setup
 * is left untouched.
 */
export const initCompiler = async (projectRoot?: string): Promise<void> => {
  const root = findProjectRoot(
    projectRoot ? resolve(projectRoot) : process.cwd()
  );

  const framework = detectCompilerFramework(root);

  if (framework === 'vite') {
    // The Vite plugin plugs the compiler in directly — nothing to scaffold.
    p.log.info(
      'Vite detected — the compiler is plugged in directly through `intlayerCompiler()` in your vite.config. Nothing to configure.'
    );
    return;
  }

  if (framework !== 'nextjs') {
    p.log.warn(
      'No supported framework detected for the compiler — skipping. See the compiler docs for manual setup.'
    );
    return;
  }

  p.intro('Configuring the Intlayer compiler for Next.js');

  const packageManager = detectPackageManager(root);
  const devPackagesToInstall = ['@intlayer/babel'];

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

  const babelConfigCandidates = [
    'babel.config.js',
    'babel.config.cjs',
    'babel.config.mjs',
    'babel.config.ts',
    '.babelrc',
    '.babelrc.js',
  ];

  const existingBabelConfig = babelConfigCandidates.find((file) =>
    existsSync(join(root, file))
  );

  if (existingBabelConfig) {
    p.log.warn(
      `${existingBabelConfig} already exists — add the Intlayer compiler plugins manually.`
    );
    p.note(
      BABEL_COMPILER_CONFIG_CONTENT,
      'Plugins to add to your babel config'
    );
  } else {
    try {
      writeFileSync(
        join(root, 'babel.config.js'),
        BABEL_COMPILER_CONFIG_CONTENT,
        { encoding: 'utf-8' }
      );
      p.log.success(
        'Created babel.config.js with the Intlayer compiler extract and optimize plugins'
      );
    } catch {
      p.log.warn(
        'Could not create babel.config.js — please create it manually.'
      );
      p.note(BABEL_COMPILER_CONFIG_CONTENT, 'babel.config.js');
    }
  }

  p.outro('Compiler configuration complete');
};
