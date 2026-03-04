import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { basename, extname, relative } from 'node:path';
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
import { detectFormatCommand } from '../detectFormatCommand';
import { writeContentHelper } from './contentWriter';
import { extractDictionaryKey } from './extractDictionaryKey';
import type { PackageName } from './extractor';
import { shouldExtract } from './extractor';
import { generateKey } from './generateKey';

export type ExtractIntlayerOptions = {
  configOptions?: GetConfigurationOptions;
  outputDir?: string;
  codeOnly?: boolean;
  declarationOnly?: boolean;
  unmergedDictionaries?: Record<string, unknown>;
  configuration?: IntlayerConfig;
};

// Module caches
let vueCompiler: typeof import('@intlayer/vue-compiler') | null = null;
let svelteCompiler: typeof import('@intlayer/svelte-compiler') | null = null;
let babelCompiler: typeof import('@intlayer/babel') | null = null;

/**
 * Main function to extract Intlayer content from a single file.
 * Supports .vue, .svelte, .tsx, .jsx, .ts, and .js files.
 */
export const extractIntlayer = async (
  filePath: string,
  packageName: PackageName,
  options?: ExtractIntlayerOptions
) => {
  const saveComponent = !options?.declarationOnly;
  const writeContent = !options?.codeOnly;

  const configuration =
    options?.configuration ?? getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(configuration);
  const { baseDir } = configuration.content;

  const unmergedDictionaries =
    options?.unmergedDictionaries ?? getUnmergedDictionaries(configuration);

  const fileText = readFileSync(filePath, 'utf-8');
  const componentKey = extractDictionaryKey(filePath, fileText);
  const ext = extname(filePath);
  const fileBaseName = basename(filePath, ext);

  let extractedContent: Record<string, Record<string, string>> | null = null;

  if (ext === '.vue') {
    try {
      vueCompiler ??= await import('@intlayer/vue-compiler');
      babelCompiler ??= await import('@intlayer/babel');

      const res = await vueCompiler.processVueFile(
        filePath,
        componentKey,
        packageName,
        {
          generateKey,
          shouldExtract,
          extractTsContent: (
            ast: any,
            code: string,
            keys: Set<string>,
            config: any,
            path: string
          ) =>
            babelCompiler!.extractTsContent(
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
        extractedContent = { [componentKey]: res as Record<string, string> };
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
      babelCompiler ??= await import('@intlayer/babel');

      const res = await svelteCompiler.processSvelteFile(
        filePath,
        componentKey,
        packageName,
        {
          generateKey,
          shouldExtract,
          extractTsContent: (
            ast: any,
            code: string,
            keys: Set<string>,
            config: any,
            path: string
          ) =>
            babelCompiler!.extractTsContent(
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
        extractedContent = { [componentKey]: res as Record<string, string> };
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
      babelCompiler ??= await import('@intlayer/babel');

      extractedContent = await babelCompiler.processTsxFile(
        filePath,
        componentKey,
        packageName,
        configuration,
        saveComponent,
        unmergedDictionaries
      );
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

  if (!extractedContent || Object.keys(extractedContent).length === 0) {
    appLogger(`No extractable text found in ${fileBaseName}`);
    return;
  }

  if (writeContent) {
    for (const [key, content] of Object.entries(extractedContent)) {
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
          cwd: configuration.content.baseDir,
        });
      } catch (error) {
        console.error(error);
      }
    }

    appLogger(
      `Updated component: ${colorizePath(relative(baseDir, filePath))}`
    );
  }
};

/**
 * Transforms a list of files by extracting Intlayer content.
 */
export const transformFiles = async (
  filePaths: string[],
  packageName: PackageName,
  options?: ExtractIntlayerOptions
) => {
  const configuration = getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(configuration);

  const unmergedDictionaries =
    options?.unmergedDictionaries ?? getUnmergedDictionaries(configuration);

  await Promise.all(
    filePaths.map(async (filePath) => {
      try {
        await extractIntlayer(filePath, packageName, {
          ...options,
          unmergedDictionaries,
          configuration,
        });
      } catch (error) {
        appLogger(
          `Failed to transform ${filePath}: ${(error as Error).message}`
        );
      }
    })
  );
};
