import {
  buildSync,
  type BuildFailure,
  type BuildOptions,
  type BuildResult,
} from 'esbuild';
import { dirname } from 'path';
import { runInNewContext } from 'vm';
import { LoadEnvFileOptions } from './envVariables/loadEnvFile';
import { getSandBoxContext } from './getSandboxContext';
import { logger } from './logger';
import { logTypeScriptErrors } from './logTypeScriptErrors';
import { ESMxCJSRequire } from './utils/ESMxCJSRequire';

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
    js: `
    globalThis.intlayer_file_path = ${JSON.stringify(filePath)};
    globalThis.intlayer_file_dir = ${JSON.stringify(dirname(filePath))};
    `,
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
  projectRequire = ESMxCJSRequire
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

    if (fileExtension === 'ts' || fileExtension === 'tsx') {
      logTypeScriptErrors(filePath);
    }

    const moduleResult: BuildResult = buildSync({
      entryPoints: [filePath],
      ...getTransformationOptions(filePath),
      logLevel: 'silent', // prevent auto printing
    });

    // Log Warnings from esbuild
    if (moduleResult.warnings?.length > 0) {
      for (const warn of moduleResult.warnings) {
        logger(
          `[ESBUILD WARNING] ${warn.text} at ${warn.location?.file ?? filePath}:${warn.location?.line ?? '?'}:${warn.location?.column ?? '?'}`,
          { level: 'warn' }
        );
      }
    }

    const moduleResultString = moduleResult.outputFiles?.[0].text;

    if (!moduleResultString) {
      logger('File could not be loaded.', { level: 'error' });
      return undefined;
    }

    const sandboxContext = getSandBoxContext(envVarOptions, projectRequire);

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
    // Specific handling for esbuild errors (i.e. build-time TypeScript errors)
    if ((error as BuildFailure).errors) {
      const esbuildErrors = (error as BuildFailure).errors;
      for (const err of esbuildErrors) {
        logger(
          `${err.text} at ${err.location?.file}:${err.location?.line}:${err.location?.column}`,
          { level: 'error' }
        );
      }
    }

    logger(
      `Error: ${error} ${JSON.stringify((error as Error).stack, null, 2)}`,
      {
        level: 'error',
      }
    );
  }
};
