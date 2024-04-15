/* eslint-disable @typescript-eslint/no-var-requires */
import { createRequire } from 'module';
import { type Context, runInNewContext } from 'vm';
import { type BuildOptions, buildSync, type BuildResult } from 'esbuild';
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

const transformationOption: BuildOptions = {
  loader: {
    '.js': 'js',
    '.jsx': 'jsx',
    '.mjs': 'js',
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.cjs': 'js',
    '.json': 'json',
  },
  format: 'cjs', // Output format as commonjs
  target: 'es2017',
  packages: 'external',
  write: false,
  bundle: true,
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

    // Rest is JS, MJS or TS

    const moduleResult: BuildResult = buildSync({
      entryPoints: [configFilePath],

      ...transformationOption,
    });

    const moduleResultString = moduleResult.outputFiles?.[0].text;

    if (!moduleResultString) {
      console.error('Configuration file could not be loaded.');
      return undefined;
    }

    runInNewContext(moduleResultString, sandboxContext);

    if (
      sandboxContext.exports.default &&
      Object.keys(sandboxContext.exports.default).length > 0
    ) {
      // ES Module
      customConfiguration = sandboxContext.exports.default;
    } else if (
      sandboxContext.module.exports.defaults &&
      Object.keys(sandboxContext.module.exports.defaults).length > 0
    ) {
      // CommonJS
      customConfiguration = sandboxContext.module.exports.default;
    } else if (
      sandboxContext.module.exports.default &&
      Object.keys(sandboxContext.module.exports.default).length > 0
    ) {
      // ES Module
      customConfiguration = sandboxContext.module.exports.default;
    } else if (
      sandboxContext.module.exports &&
      Object.keys(sandboxContext.module.exports).length > 0
    ) {
      // Other
      customConfiguration = sandboxContext.module.exports;
    }

    return customConfiguration;
  } catch (error) {
    console.error('Error:', error);
  }
};
