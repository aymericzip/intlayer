import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { extname, relative } from 'node:path';
import { detectFormatCommand } from '@intlayer/chokidar/cli';
import {
  ANSIColors,
  colorizePath,
  getAppLogger,
} from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import type { IntlayerConfig } from '@intlayer/types';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import { extractTsContent } from './babelProcessor';
import { writeContentHelper } from './contentWriter';
import { processTsxFile } from './processTsxFile';
import {
  ATTRIBUTES_TO_EXTRACT,
  extractDictionaryKeyFromPath,
  type PackageName,
  shouldExtract,
} from './utils';
import { extractDictionaryKey } from './utils/extractDictionaryKey';
import { generateKey } from './utils/generateKey';

export type ExtractIntlayerOptions = {
  configOptions?: GetConfigurationOptions;
  outputDir?: string;
  /**
   * If true, only transform the source file — skip writing content declarations.
   */
  codeOnly?: boolean;
  /**
   * If true, only write content declarations — skip transforming the source file.
   * When set, `transformedCode` will still be returned (computed but not written to disk).
   */
  declarationOnly?: boolean;
  unmergedDictionaries?: Record<string, unknown>;
  configuration?: IntlayerConfig;
  /**
   * Raw source code to process instead of reading from disk.
   * Useful for Vite/webpack transform hooks where the code may already
   * have been modified by a previous plugin.
   */
  code?: string;
  /**
   * Callback invoked for each extracted dictionary key/content pair.
   * When provided, the caller is responsible for writing content declarations
   * (the built-in `writeContentHelper` is skipped unless `writeContent` is also true).
   * Used by Vite/webpack plugins that manage their own dictionary write pipeline.
   */
  onExtract?: (result: {
    key: string;
    content: Record<string, string>;
    filePath: string;
  }) => void | Promise<void>;
};

// Module caches for optional compiler packages
let vueCompiler: typeof import('@intlayer/vue-compiler') | null = null;
let svelteCompiler: typeof import('@intlayer/svelte-compiler') | null = null;

/**
 * Extracts Intlayer content from a single source file and optionally transforms it.
 *
 * - For `.vue` / `.svelte` files the matching optional compiler package is used.
 * - For `.tsx` / `.jsx` / `.ts` / `.js` files the Babel-based `processTsxFile` is used.
 *
 * Returns `{ transformedCode }` so callers (e.g. the Vite plugin) can pass the
 * modified source back to the bundler without writing the file to disk.
 */
export const extractContent = async (
  filePath: string,
  packageName: PackageName,
  options?: ExtractIntlayerOptions
): Promise<{ transformedCode: string | null } | undefined> => {
  const saveComponent = !options?.declarationOnly;
  const writeContent = !options?.codeOnly && !options?.onExtract;

  const configuration =
    options?.configuration ?? getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(configuration);
  const { baseDir } = configuration.content;

  const unmergedDictionaries =
    options?.unmergedDictionaries ?? getUnmergedDictionaries(configuration);

  const fileText = options?.code ?? readFileSync(filePath, 'utf-8');
  const componentKey = extractDictionaryKey(filePath, fileText);
  const ext = extname(filePath);
  const relativeFilePath = relative(baseDir, filePath);

  let extractedContentMap: Record<string, Record<string, string>> | null = null;
  let transformedCode: string | null = null;

  if (ext === '.vue') {
    try {
      vueCompiler ??= await import('@intlayer/vue-compiler');

      const res = await vueCompiler.processVueFile(
        filePath,
        componentKey,
        packageName,
        {
          generateKey,
          shouldExtract,
          attributesToExtract: ATTRIBUTES_TO_EXTRACT,
          extractDictionaryKeyFromPath,
          extractTsContent: (
            ast: any,
            code: string,
            keys: Set<string>,
            config: any,
            path: string
          ) =>
            extractTsContent(
              ast,
              code,
              keys,
              config,
              path,
              unmergedDictionaries
            ),
        },
        saveComponent
      );

      if (res) {
        extractedContentMap = {
          [componentKey]: res as Record<string, string>,
        };
      }
    } catch (error: any) {
      if (
        error.code === 'ERR_MODULE_NOT_FOUND' ||
        error.message?.includes('Cannot find module')
      ) {
        throw new Error(
          `Please install ${colorizePath('@intlayer/vue-compiler', ANSIColors.YELLOW)} to process Vue files.`
        );
      }
      throw error;
    }
  } else if (ext === '.svelte') {
    try {
      svelteCompiler ??= await import('@intlayer/svelte-compiler');

      const res = await svelteCompiler.processSvelteFile(
        filePath,
        componentKey,
        packageName,
        {
          generateKey,
          shouldExtract,
          attributesToExtract: ATTRIBUTES_TO_EXTRACT,
          extractDictionaryKeyFromPath,
          extractTsContent: (
            ast: any,
            code: string,
            keys: Set<string>,
            config: any,
            path: string
          ) =>
            extractTsContent(
              ast,
              code,
              keys,
              config,
              path,
              unmergedDictionaries
            ),
        },
        saveComponent
      );

      if (res) {
        extractedContentMap = {
          [componentKey]: res as Record<string, string>,
        };
      }
    } catch (error: any) {
      if (
        error.code === 'ERR_MODULE_NOT_FOUND' ||
        error.message?.includes('Cannot find module')
      ) {
        throw new Error(
          `Please install ${colorizePath('@intlayer/svelte-compiler', ANSIColors.YELLOW)} to process Svelte files.`
        );
      }
      throw error;
    }
  } else if (['.tsx', '.jsx', '.ts', '.js'].includes(ext)) {
    try {
      const result = processTsxFile(
        filePath,
        componentKey,
        packageName,
        configuration,
        saveComponent,
        unmergedDictionaries,
        fileText
      );

      if (result) {
        extractedContentMap = result.extractedContent;
        transformedCode = result.modifiedCode;
      }
    } catch (error: any) {
      if (
        error.code === 'ERR_MODULE_NOT_FOUND' ||
        error.message?.includes('Cannot find module')
      ) {
        throw new Error(
          `Please install ${colorizePath('@intlayer/babel', ANSIColors.YELLOW)} to process TSX/JSX/TS/JS files.`
        );
      }
      throw error;
    }
  }

  if (!extractedContentMap || Object.keys(extractedContentMap).length === 0) {
    appLogger(
      `No extractable text found in ${colorizePath(relativeFilePath)}`,
      {
        isVerbose: true,
      }
    );
    return undefined;
  }

  // Notify caller via callback (e.g. Vite plugin's own dictionary pipeline)
  if (options?.onExtract) {
    for (const [key, content] of Object.entries(extractedContentMap)) {
      await options.onExtract({ key, content, filePath });
    }
  }

  // Write content declarations using the built-in helper when no custom callback
  if (writeContent) {
    for (const [key, content] of Object.entries(extractedContentMap)) {
      const contentFilePath = await writeContentHelper(
        content,
        key,
        filePath,
        configuration,
        options?.outputDir
      );

      const relativeContentFilePath = relative(
        configuration.content.baseDir,
        contentFilePath
      );
      appLogger(
        `Created content file: ${colorizePath(relativeContentFilePath)}`
      );
    }
  }

  if (saveComponent) {
    const formatCommand = detectFormatCommand(configuration);

    if (formatCommand) {
      try {
        execSync(formatCommand.replace('{{file}}', filePath), {
          stdio: 'inherit',
          cwd: baseDir,
        });
      } catch (error) {
        console.error(error);
      }
    }

    appLogger(
      `Updated component: ${colorizePath(relative(baseDir, filePath))}`
    );
  }

  return { transformedCode };
};
