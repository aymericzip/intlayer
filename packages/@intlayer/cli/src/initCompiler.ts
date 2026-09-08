import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { detectPackageManager, installPackages } from '@intlayer/engine/cli';
import { findProjectRoot } from './init';
import { loadPrompts } from './loadPrompts';

/** Framework the Intlayer compiler can be wired into during init. */
type CompilerFramework = 'vite' | 'nextjs' | 'unknown';

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
 * - **Vite** — nothing to do: since v9 the compiler is built into the
 *   `intlayer()` plugin in `vite.config.ts`, so this only confirms the setup
 *   to the user.
 * - **Next.js** — installs `@intlayer/babel`, which is all that is needed:
 *   `withIntlayer` registers `next-intlayer/extractor-loader` on both webpack
 *   and Turbopack as soon as the package resolves. No `babel.config.js` is
 *   written — Turbopack never reads one, and on webpack its mere presence
 *   switches Next.js off SWC, taking the `@intlayer/swc` optimize pass with it.
 *
 * In non-interactive init this function is never called, so the compiler setup
 * is left untouched.
 */
export const initCompiler = async (projectRoot?: string): Promise<void> => {
  const p = await loadPrompts();

  const root = findProjectRoot(
    projectRoot ? resolve(projectRoot) : process.cwd()
  );

  const framework = detectCompilerFramework(root);

  if (framework === 'vite') {
    // Since v9 the compiler is bundled inside intlayer() — nothing to scaffold.
    p.log.info(
      'Vite detected — the compiler is built into `intlayer()` in your vite.config. Nothing to configure.'
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

  p.log.success(
    'The compiler runs through `withIntlayer` in your next.config — nothing else to wire up.'
  );
  p.log.info(
    'Set `compiler.enabled` in intlayer.config.ts to turn the extraction on.'
  );

  p.outro('Compiler configuration complete');
};
