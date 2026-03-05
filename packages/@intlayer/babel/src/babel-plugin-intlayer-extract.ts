import { dirname, extname, relative } from 'node:path';
import type { PluginObj, PluginPass } from '@babel/core';
import { parse } from '@babel/parser';
import type * as BabelTypes from '@babel/types';
import {
  ANSIColors,
  colorize,
  colorizePath,
  getAppLogger,
} from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import { processTsxFile } from './extractContent/processTsxFile';
import type { PackageName } from './extractContent/utils/constants';
import { detectPackageName } from './extractContent/utils/detectPackageName';
import { extractDictionaryKeyFromPath } from './extractContent/utils/extractDictionaryKey';

/** Packages that support a `/server` sub-path for React Server Components. */
const SERVER_CAPABLE_PACKAGES: ReadonlySet<string> = new Set(['next-intlayer']);

export type ExtractResult = {
  dictionaryKey: string;
  filePath: string;
  content: Record<string, string>;
  locale: string;
};

export type ExtractPluginOptions = {
  defaultLocale?: string;
  packageName?: string;
  filesList?: string[];
  shouldExtract?: (text: string) => boolean;
  enabled?: boolean;
  prefix?: string;
  saveComponents?: boolean;
  formatCommand?: string;
  /**
   * Callback invoked for each extracted dictionary key/content pair.
   * Used by `getExtractPluginOptions` to write dictionaries to disk.
   * May be async — the plugin will fire-and-forget (Babel transforms are sync).
   */
  onExtract?: (result: ExtractResult) => void | Promise<void>;
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
export const intlayerExtractBabelPlugin = (babel: {
  types: typeof BabelTypes;
}): PluginObj<State> => {
  return {
    name: 'babel-plugin-intlayer-extract',

    visitor: {
      Program: {
        enter(programPath, state) {
          const opts = state.opts;

          if (opts.enabled === false) return;

          const filename = state.file.opts.filename;
          if (!filename) return;

          const ext = extname(filename);
          if (!['.tsx', '.jsx', '.ts', '.js'].includes(ext)) return;

          if (opts.filesList && !opts.filesList.includes(filename)) return;

          // Grab the original source from the Babel file object
          const fileCode: string = (state.file as any).code ?? '';
          if (!fileCode) return;

          const configuration = getConfiguration();
          const appLogger = getAppLogger(configuration);

          const packageName = (opts.packageName ??
            detectPackageName(dirname(filename)) ??
            'react-intlayer') as PackageName;

          const prefix = opts.prefix ?? 'comp-';
          const componentKey = extractDictionaryKeyFromPath(filename, prefix);
          const saveComponents = opts.saveComponents ?? false;

          // For packages that expose a `/server` entry (e.g. next-intlayer),
          // use that sub-path when no "use client" directive is present so that
          // React Server Components receive the correct import.
          const hasUseClient = programPath.node.directives.some(
            (d) => d.value.value === 'use client'
          );
          const effectivePackageName =
            SERVER_CAPABLE_PACKAGES.has(packageName) && !hasUseClient
              ? `${packageName}/server`
              : packageName;

          const result = processTsxFile(
            filename,
            componentKey,
            effectivePackageName,
            configuration,
            saveComponents,
            {}, // unmergedDictionaries — not needed for Babel plugin use case
            fileCode
          );

          if (!result) return;

          const { extractedContent, modifiedCode } = result;

          // Fire-and-forget: Babel transforms are synchronous, but onExtract may
          // be async (e.g. writing files). We don't await here.
          if (opts.onExtract) {
            const defaultLocale =
              opts.defaultLocale ??
              configuration.internationalization.defaultLocale;

            for (const [key, content] of Object.entries(extractedContent)) {
              void opts.onExtract({
                dictionaryKey: key,
                filePath: filename,
                content,
                locale: defaultLocale,
              });
            }
          }

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
              `${colorize('Compiler:', ANSIColors.GREY_DARK)} Extracted content from ${colorizePath(relative(configuration.content.baseDir, filename))}`,
              { level: 'debug' }
            );
          } catch (error) {
            console.error(
              `[intlayer] Failed to parse transformed code for ${filename}:`,
              error
            );
          }
        },
      },
    },
  };
};
