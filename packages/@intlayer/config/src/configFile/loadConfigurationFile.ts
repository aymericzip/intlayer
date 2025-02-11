import { runInNewContext } from 'vm';
import { type BuildOptions, buildSync, type BuildResult } from 'esbuild';
import { type LoadEnvFileOptions } from '../envVariables/loadEnvFile';
import { getSandBoxContext } from '../getSandboxContext';
import { logger } from '../logger';
import type { CustomIntlayerConfig } from '../types/config';
import { ESMxCJSRequire } from '../utils/ESMxCJSRequire';

const getTransformationOptions = (): BuildOptions => {
  const define: Record<string, string> = {};

  for (const k in process.env) {
    define[`process.env.${k}`] = JSON.stringify(process.env[k]);
  }

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
    define,
  };

  return transformationOption;
};

const filterValidConfiguration = (
  configuration: CustomIntlayerConfig
): CustomIntlayerConfig => {
  // @TODO Implement filtering of valid configuration
  return configuration;
};

/**
 * Load the configuration file from the given path
 * Example of configuration file: intlayer.config.js
 *
 * Accepts JSON, JS, MJS and TS files as configuration
 */
export const loadConfigurationFile = (
  configFilePath: string,
  envVarOptions?: LoadEnvFileOptions
): CustomIntlayerConfig | undefined => {
  let customConfiguration: CustomIntlayerConfig | undefined = undefined;

  const configFileExtension = configFilePath.split('.').pop() ?? '';

  try {
    if (configFileExtension === 'json') {
      // Assume JSON

      return ESMxCJSRequire(configFilePath);
    }

    const sandboxContext = getSandBoxContext(envVarOptions);

    // Rest is JS, MJS or TS

    const moduleResult: BuildResult = buildSync({
      entryPoints: [configFilePath],
      ...getTransformationOptions(),
    });

    const moduleResultString = moduleResult.outputFiles?.[0].text;

    if (!moduleResultString) {
      logger('Configuration file could not be loaded.', { level: 'error' });
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

    if (typeof customConfiguration === 'undefined') {
      logger('Configuration file could not be loaded.');
      return undefined;
    }

    return filterValidConfiguration(customConfiguration);
  } catch (error) {
    logger(
      `Error: ${error} ${JSON.stringify((error as Error).stack, null, 2)}`,
      {
        level: 'error',
      }
    );
  }
};
