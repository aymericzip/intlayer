#!/usr/bin/env node

/**
 * To make the setup easier, we are using craco to override the webpack configuration.
 * This script is used to run the craco scripts with the custom configuration.
 *
 * The script is based on the original craco script from create-react-app.
 */

import { spawnSync } from 'node:child_process';
import { logger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import { getProjectRequire } from '@intlayer/config/utils';
import { findDuplicateWebpackPaths } from '../findDuplicateWebpackPaths';

const args = process.argv.slice(2);
const scriptIndex = args.findIndex(
  (index) => index === 'build' || index === 'start' || index === 'test'
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];

/**
 * Surface a duplicated webpack install up-front, instead of leaving the user
 * with the unactionable `TypeError: The 'compilation' argument must be an
 * instance of Compilation` stack trace webpack throws much later.
 */
const warnOnDuplicateWebpack = (): void => {
  const duplicateWebpackPaths = findDuplicateWebpackPaths();

  if (duplicateWebpackPaths.length === 0) return;

  logger(
    [
      'Multiple copies of webpack were found in this project:',
      ...duplicateWebpackPaths.map((webpackPath) => `  - ${webpackPath}`),
      '',
      'react-scripts and its plugins must share a single webpack instance, otherwise the build fails with "The \'compilation\' argument must be an instance of Compilation".',
      'Deduplicate the install — for example by removing node_modules and the lockfile and reinstalling, or by pinning a single webpack version through your package manager (npm `overrides`, yarn `resolutions`, pnpm/bun `overrides`).',
    ].join('\n'),
    { level: 'warn' }
  );
};

/**
 * Build the Intlayer dictionaries (i.e. populate the `.intlayer` folder that
 * backs the `@intlayer/dictionaries-entry` alias) before craco/webpack starts.
 *
 * Unlike the webpack `IntlayerPlugin` — whose `beforeCompile` hook fires only
 * after webpack has already begun resolving modules — this runs ahead of the
 * compiler so the dictionaries entry exists the moment resolution starts.
 * Mirrors the async `withIntlayer` flow used by the Next.js integration.
 */
const prepareDictionaries = async (
  currentScript: string | undefined
): Promise<void> => {
  // `start` runs the dev server, `build` a production bundle, `test` the suite.
  const isBuild = currentScript === 'build';
  const isDev = currentScript === 'start';

  const { prepareIntlayer } = await import('@intlayer/engine/build');
  const intlayerConfig = getConfiguration();

  // `prepareIntlayer` uses `runOnce`, so a redundant call from the webpack
  // plugin later in the pipeline is a cheap no-op.
  await prepareIntlayer(intlayerConfig, {
    clean: isBuild,
    env: isBuild ? 'prod' : 'dev',
    cacheTimeoutMs: isDev
      ? 1000 * 60 * 60 // 1 hour for dev (default cache timeout)
      : 1000 * 30, // 30 seconds for build/test (ensure dictionaries are fresh)
  });
};

const runScript = async (): Promise<void> => {
  if (script !== 'build' && script !== 'start' && script !== 'test') {
    logger(`Unknown script "${script}".`);
    logger('Perhaps you need to update craco?');
    return;
  }

  warnOnDuplicateWebpack();

  await prepareDictionaries(script);

  const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];
  const scriptPath = getProjectRequire().resolve(
    `@craco/craco/dist/scripts/${script}`
  );

  const scriptArgs = args.slice(scriptIndex + 1);
  const processArgs = nodeArgs
    .concat(scriptPath)
    .concat([
      ...scriptArgs,
      '--config',
      './node_modules/react-scripts-intlayer/dist/cjs/craco.config.cjs',
    ]);

  const child = spawnSync('node', processArgs, {
    stdio: 'inherit',
  });

  if (child.signal) {
    if (child.signal === 'SIGKILL') {
      logger(`
                The build failed because the process exited too early.
                This probably means the system ran out of memory or someone called
                \`kill -9\` on the process.
            `);
    } else if (child.signal === 'SIGTERM') {
      logger(`
                The build failed because the process exited too early.
                Someone might have called  \`kill\` or \`killall\`, or the system could
                be shutting down.
            `);
    }

    process.exit(1);
  }

  process.exit(child.status ?? undefined);
};

runScript();
