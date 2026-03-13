import { relative } from 'node:path';
import type { PluginObj, PluginPass } from '@babel/core';
import { parse } from '@babel/parser';
import type * as BabelTypes from '@babel/types';
import {
  ANSIColors,
  colorize,
  colorizePath,
  getAppLogger,
} from '@intlayer/config/logger';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { FilePathPattern } from '@intlayer/types/filePathPattern';
import { extractContentSync } from './extractContent/extractContent';
import type { PackageName } from './extractContent/utils/constants';
import { detectPackageName } from './extractContent/utils/detectPackageName';

export type ExtractResult = {
  dictionaryKey: string;
  filePath: string;
  content: Record<string, string>;
  locale: Locale;
};

export type ExtractPluginOptions = {
  packageName?: PackageName;
  filesList: string[];
  enabled: boolean;

  shouldExtract?: (text: string) => boolean;
  configuration: IntlayerConfig;
  /**
   * Callback invoked for each extracted dictionary key/content pair.
   * Used by `getExtractPluginOptions` to write dictionaries to disk.
   * May be async — the plugin will fire-and-forget (Babel transforms are sync).
   */
  onExtract?: (result: ExtractResult) => void | Promise<void>;
  /**
   * Defines the output files path.
   */
  output?: FilePathPattern;
};

type State = PluginPass & { opts: ExtractPluginOptions };

/**
 * Babel plugin that extracts translatable content from source files and
 * injects Intlayer hooks (`useIntlayer` / `getIntlayer`) automatically.
 *
 * Designed for use with Babel-based build tools such as Next.js and Webpack.
 *
 * @example babel.config.js
 * ```js
 * const { intlayerExtractBabelPlugin, getExtractPluginOptions } = require('@intlayer/babel');
 * module.exports = {
 *   presets: ['next/babel'],
 *   plugins: [
 *     [intlayerExtractBabelPlugin, getExtractPluginOptions()],
 *   ],
 * };
 * ```
 */
export const intlayerExtractBabelPlugin = (_babel: {
  types: typeof BabelTypes;
}): PluginObj<State> => {
  return {
    name: 'babel-plugin-intlayer-extract',

    visitor: {
      Program: {
        enter(programPath, state) {
          const opts = state.opts;

          // Merge plugin options with the unified compiler config
          const isEnabled = opts.enabled;

          if (isEnabled === false) return;

          const filename = state.file.opts.filename;

          if (!filename) return;

          if (opts.filesList && !opts.filesList.includes(filename)) return;

          const fileCode: string = state.file.code ?? '';
          if (!fileCode) return;

          const appLogger = getAppLogger(opts.configuration);
          const packageName = opts.packageName ?? detectPackageName(filename);

          const { saveComponents } = opts.configuration.compiler;

          const result = extractContentSync(filename, packageName, {
            configuration: opts.configuration,
            code: fileCode,
            onExtract: (extractResult: {
              key: string;
              content: Record<string, string>;
            }) => {
              if (opts.onExtract) {
                opts.onExtract({
                  dictionaryKey: extractResult.key,
                  filePath: filename,
                  content: extractResult.content,
                  locale: opts.configuration.internationalization.defaultLocale,
                });
              }
            },
            declarationOnly: !saveComponents,
          });

          if (!result) return;

          const { transformedCode: modifiedCode } = result;

          if (!modifiedCode) return;

          // Replace the Babel AST with the transformed code by re-parsing it.
          // This lets Babel serialise the injected hooks/imports through its
          // own code generator, preserving compatibility with other plugins.
          try {
            const newAst = parse(modifiedCode, {
              sourceType: 'module',
              plugins: ['jsx', 'typescript'],
            });

            programPath.node.body = newAst.program.body;
            programPath.node.directives = newAst.program.directives;

            appLogger(
              `${colorize('Compiler:', ANSIColors.GREY_DARK)} Extracted content from ${colorizePath(relative(opts.configuration.system.baseDir, filename))}`,
              { level: 'debug' }
            );
          } catch (error) {
            appLogger(
              [
                `Failed to parse transformed code for ${colorizePath(relative(opts.configuration.system.baseDir, filename))}:`,
                error,
              ],
              { level: 'error' }
            );
          }
        },
      },
    },
  };
};
