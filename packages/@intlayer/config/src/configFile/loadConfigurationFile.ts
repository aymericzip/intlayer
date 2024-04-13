/* eslint-disable @typescript-eslint/no-var-requires */
import { createRequire } from 'module';
import { type Context, runInNewContext } from 'vm';
import { type Options, transformFileSync } from '@swc/core';
import type { CustomIntlayerConfig } from '../types';

const isESModule = typeof import.meta.url === 'string';

const sandboxContext: Context = {
  exports: {
    default: {},
  },
  module: {
    exports: {},
  },
  console,
  require: isESModule ? createRequire(import.meta.url) : require,
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

    const transformationOption: Options = {
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: false,
        },
        loose: false,
        minify: {
          compress: false,
          mangle: false,
        },
      },
      module: {
        type: 'commonjs',
      },
      minify: false,
      isModule: true,
      sourceMaps: false,
      filename: configFilePath,
    };

    const moduleResult = transformFileSync(
      configFilePath,
      transformationOption
    ).code;

    runInNewContext(moduleResult, sandboxContext);

    if (Object.keys(sandboxContext.exports.default).length > 0) {
      // ES Module
      customConfiguration = sandboxContext.exports.default;
    } else if (Object.keys(sandboxContext.module.exports).length > 0) {
      // CommonJS
      customConfiguration = sandboxContext.module.exports;
    }

    return customConfiguration;
  } catch (error) {
    console.error('Error:', error);
  }
};
