/* eslint-disable @typescript-eslint/no-var-requires */
import { readFileSync } from 'fs';
import { type Context, runInNewContext } from 'vm';
import { transformFileSync } from '@swc/core';
import type { CustomIntlayerConfig } from './types';

const sandbox: Context = {
  exports: {
    default: {},
  },
  module: {
    exports: {},
  },
  console: console,
  require: require,
};

export const loadConfigurationFile = (
  configFilePath: string
): CustomIntlayerConfig | undefined => {
  let customConfiguration: CustomIntlayerConfig | undefined = undefined;

  const configFileExtension = configFilePath.split('.').pop() ?? '';

  try {
    if (configFileExtension === 'json') {
      // Assume JSON
      return require(configFilePath);
    }

    if (configFileExtension === 'cjs') {
      // Load CJS directly
      return require(configFilePath).default;
    }

    // Rest is JS, MJS or TS

    let isESModule = false;

    // For .js files, attempt to determine if they're using ES Module syntax
    if (configFileExtension === 'js') {
      const fileContents = readFileSync(configFilePath, 'utf8');

      isESModule = fileContents.match(/import |export /) !== null;
    }

    const type =
      isESModule || configFileExtension === 'mjs' ? 'es6' : 'commonjs';

    const moduleResult = transformFileSync(configFilePath, {
      jsc: {
        target: 'es5',
      },
      module: {
        type,
      },
    }).code;

    runInNewContext(moduleResult, sandbox);

    if (Object.keys(sandbox.exports.default).length > 0) {
      // ES Module
      customConfiguration = sandbox.exports.default;
    } else if (Object.keys(sandbox.module.exports).length > 0) {
      // CommonJS
      customConfiguration = sandbox.module.exports;
    }

    return customConfiguration;
  } catch (error) {
    console.error('Error:', error);
  }
};
