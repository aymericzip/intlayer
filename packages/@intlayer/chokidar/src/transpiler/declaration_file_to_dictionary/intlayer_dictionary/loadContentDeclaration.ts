/* eslint-disable @typescript-eslint/no-var-requires */
import { createRequire } from 'module';
import { type Context, runInNewContext } from 'vm';
import type { DeclarationContent } from '@intlayer/core';
import { type BuildOptions, buildSync, type BuildResult } from 'esbuild';

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

const filterValidContentDeclaration = (
  contentDeclaration: DeclarationContent
): DeclarationContent => {
  // @TODO Implement filtering of valid content declaration
  return contentDeclaration;
};

/**
 * Load the content declaration from the given path
 *
 * Accepts JSON, JS, MJS and TS files as configuration
 */
export const loadContentDeclaration = (
  contentDeclarationFilePath: string
): DeclarationContent | undefined => {
  let contentDeclaration: DeclarationContent | undefined = undefined;

  const fileExtension = contentDeclarationFilePath.split('.').pop() ?? '';

  try {
    if (fileExtension === 'json') {
      // Assume JSON
      return require(contentDeclarationFilePath);
    }

    // Rest is JS, MJS or TS

    const moduleResult: BuildResult = buildSync({
      entryPoints: [contentDeclarationFilePath],

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
      contentDeclaration = sandboxContext.exports.default;
    } else if (
      sandboxContext.module.exports.defaults &&
      Object.keys(sandboxContext.module.exports.defaults).length > 0
    ) {
      // CommonJS
      contentDeclaration = sandboxContext.module.exports.default;
    } else if (
      sandboxContext.module.exports.default &&
      Object.keys(sandboxContext.module.exports.default).length > 0
    ) {
      // ES Module
      contentDeclaration = sandboxContext.module.exports.default;
    } else if (
      sandboxContext.module.exports &&
      Object.keys(sandboxContext.module.exports).length > 0
    ) {
      // Other
      contentDeclaration = sandboxContext.module.exports;
    }

    if (typeof contentDeclaration === 'undefined') {
      console.error('Configuration file could not be loaded.');
      return undefined;
    }

    return filterValidContentDeclaration(contentDeclaration);
  } catch (error) {
    console.error('Error:', error);
  }
};
