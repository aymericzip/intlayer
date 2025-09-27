import { buildSync, type BuildOptions, type BuildResult } from 'esbuild';
import { dirname } from 'path';
import { runInNewContext } from 'vm';
import { getSandBoxContext } from './getSandboxContext';
import { LoadEnvFileOptions } from './loadEnvFile';
import { logger } from './logger';
import { ESMxCJSRequire } from './utils/ESMxCJSHelpers';

const getTransformationOptions = (filePath: string): BuildOptions => ({
  loader: {
    '.js': 'js',
    '.jsx': 'jsx',
    '.mjs': 'js',
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.cjs': 'js',
    '.json': 'json',
    '.md': 'text',
    '.mdx': 'text',
  },
  format: 'cjs', // Output format as commonjs
  target: 'es2017',
  packages: 'external',
  write: false,
  bundle: true,
  banner: {
    js: [
      `globalThis.intlayer_file_path = ${JSON.stringify(filePath)};`,
      `globalThis.intlayer_file_dir = ${JSON.stringify(dirname(filePath))};`,
    ].join('\n'),
  },
});

/**
 * Load the content declaration from the given path
 *
 * Accepts JSON, JS, MJS and TS files as configuration
 */
export const loadExternalFile = (
  filePath: string,
  envVarOptions?: LoadEnvFileOptions,
  projectRequire?: NodeJS.Require,
  additionalEnvVars?: Record<string, string>
): any | undefined => {
  let fileContent: any | undefined = undefined;

  const fileExtension = filePath.split('.').pop() ?? '';

  try {
    if (fileExtension === 'json') {
      // Remove cache to force reloading
      delete ESMxCJSRequire.cache[ESMxCJSRequire.resolve(filePath)];
      // Assume JSON
      return ESMxCJSRequire(filePath);
    }

    // Rest is JS, MJS or TS

    const moduleResult: BuildResult = buildSync({
      entryPoints: [filePath],
      ...getTransformationOptions(filePath),
    });

    const moduleResultString = moduleResult.outputFiles?.[0].text;

    if (!moduleResultString) {
      logger('File could not be loaded.', { level: 'error' });
      return undefined;
    }

    const sandboxContext = getSandBoxContext(
      envVarOptions,
      projectRequire,
      additionalEnvVars
    );

    runInNewContext(moduleResultString, sandboxContext);

    if (
      sandboxContext.exports.default &&
      Object.keys(sandboxContext.exports.default).length > 0
    ) {
      // ES Module
      fileContent = sandboxContext.exports.default;
    } else if (
      sandboxContext.module.exports.defaults &&
      Object.keys(sandboxContext.module.exports.defaults).length > 0
    ) {
      // CommonJS
      fileContent = sandboxContext.module.exports.default;
    } else if (
      sandboxContext.module.exports.default &&
      Object.keys(sandboxContext.module.exports.default).length > 0
    ) {
      // ES Module
      fileContent = sandboxContext.module.exports.default;
    } else if (
      sandboxContext.module.exports &&
      Object.keys(sandboxContext.module.exports).length > 0
    ) {
      // Other
      fileContent = sandboxContext.module.exports;
    }

    if (typeof fileContent === 'undefined') {
      logger(`File file could not be loaded. Path : ${filePath}`);
      return undefined;
    }

    return fileContent;
  } catch (error) {
    logger(
      `Error: ${error} ${JSON.stringify((error as Error).stack, null, 2)}`,
      {
        level: 'error',
      }
    );
  }
};
