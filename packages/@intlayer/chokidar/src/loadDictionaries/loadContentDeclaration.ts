import { runInNewContext } from 'vm';
import { ESMxCJSRequire, getSandBoxContext } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { type BuildOptions, buildSync, type BuildResult } from 'esbuild';
import { processContentDeclaration } from '../transpiler/declaration_file_to_dictionary/intlayer_dictionary/processContentDeclaration';

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

/**
 * Load the content declaration from the given path
 *
 * Accepts JSON, JS, MJS and TS files as configuration
 */
const loadContentDeclaration = (
  contentDeclarationFilePath: string
): Dictionary | undefined => {
  let contentDeclaration: Dictionary | undefined = undefined;

  const fileExtension = contentDeclarationFilePath.split('.').pop() ?? '';

  try {
    if (fileExtension === 'json') {
      // Assume JSON
      return ESMxCJSRequire(contentDeclarationFilePath);
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

    const sandboxContext = getSandBoxContext();

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

    return contentDeclaration;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const loadContentDeclarations = async (
  contentDeclarationFilePath: string[]
): Promise<Dictionary[]> => {
  const contentDeclarations = contentDeclarationFilePath.map((path) => ({
    ...loadContentDeclaration(path),
    filePath: path,
  }));
  const resultDictionariesPaths: Dictionary[] = [];

  for await (const contentDeclaration of contentDeclarations) {
    if (!contentDeclaration) {
      continue;
    }

    const processedContentDeclaration = await processContentDeclaration(
      contentDeclaration as Dictionary
    );

    if (!processedContentDeclaration) {
      continue;
    }

    resultDictionariesPaths.push(processedContentDeclaration);
  }

  return resultDictionariesPaths;
};
