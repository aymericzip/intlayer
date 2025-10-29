#!/usr/bin/env node

/**
 * To make the setup easier, we are using craco to override the webpack configuration.
 * This script is used to run the craco scripts with the custom configuration.
 *
 * The script is based on the original craco script from create-react-app.
 */

import { spawnSync } from 'node:child_process';
import { getProjectRequire, logger } from '@intlayer/config';

const args = process.argv.slice(2);
const scriptIndex = args.findIndex(
  (index) => index === 'build' || index === 'start' || index === 'test'
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];

switch (script) {
  case 'build':
  case 'start':
  case 'test': {
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
    break;
  }
  default:
    logger(`Unknown script "${script}".`);
    logger('Perhaps you need to update craco?');
    break;
}
