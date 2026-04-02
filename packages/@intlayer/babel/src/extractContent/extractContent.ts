import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { extname, relative } from 'node:path';
import type * as t from '@babel/types';
import { detectFormatCommand } from '@intlayer/chokidar/cli';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, colorizePath, getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import { getProjectRequire } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
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
  codeOnly?: boolean;
  declarationOnly?: boolean;
  unmergedDictionaries?: Record<string, unknown>;
  configuration?: IntlayerConfig;
  code?: string;
  onExtract?: (result: {
    key: string;
    content: Record<string, string>;
    filePath: string;
  }) => void | Promise<void>;
};

type ExternalCompilerResult = {
  extractedContent: Record<string, string>;
  code: string;
};

type ExternalCompilerOptions = {
  generateKey: typeof generateKey;
  shouldExtract: typeof shouldExtract;
  attributesToExtract: typeof ATTRIBUTES_TO_EXTRACT;
  extractDictionaryKeyFromPath: typeof extractDictionaryKeyFromPath;
  extractTsContent: (
    ast: unknown,
    code: string,
    keys: Set<string>,
    config: IntlayerConfig,
    path: string
  ) => ReturnType<typeof extractTsContent>;
};

type VueCompiler = typeof import('@intlayer/vue-compiler');
type SvelteCompiler = typeof import('@intlayer/svelte-compiler');

// Module caches
let vueCompiler: VueCompiler | null = null;
let svelteCompiler: SvelteCompiler | null = null;

type InternalExtractResult = {
  extractedContentMap: Record<string, Record<string, string>> | null;
  transformedCode: string | null;
};

const formatCompilerResult = (
  componentKey: string,
  res?: ExternalCompilerResult
): InternalExtractResult | undefined => {
  if (!res) return undefined;

  return {
    extractedContentMap: { [componentKey]: res.extractedContent },
    transformedCode: res.code,
  };
};

type Dependencies = {
  vueCompiler: VueCompiler | null;
  svelteCompiler: SvelteCompiler | null;
  unmergedDictionaries: Record<string, unknown>;
  configuration: IntlayerConfig;
};

const processFileInternal = (
  filePath: string,
  packageName: PackageName,
  options: ExtractIntlayerOptions | undefined,
  dependencies: Dependencies,
  saveComponent: boolean,
  providedComponentKey?: string
): InternalExtractResult | undefined => {
  const fileText = options?.code ?? readFileSync(filePath, 'utf-8');
  const componentKey =
    providedComponentKey ??
    extractDictionaryKey(
      filePath,
      fileText,
      dependencies.configuration.compiler.dictionaryKeyPrefix
    );
  const ext = extname(filePath);

  const { vueCompiler, svelteCompiler, unmergedDictionaries, configuration } =
    dependencies;

  const compilerCommonOptions: ExternalCompilerOptions = {
    generateKey,
    shouldExtract,
    attributesToExtract: ATTRIBUTES_TO_EXTRACT,
    extractDictionaryKeyFromPath,
    extractTsContent: (ast, code, keys, config, path) =>
      extractTsContent(
        ast as t.File,
        code,
        keys,
        config,
        path,
        unmergedDictionaries
      ),
  };

  if (ext === '.vue') {
    if (!vueCompiler) {
      throw new Error(
        `Please install ${colorizePath('@intlayer/vue-compiler', ANSIColors.YELLOW)} to process Vue files.`
      );
    }

    const res = vueCompiler.processVueFile(
      filePath,
      componentKey,
      packageName,
      compilerCommonOptions,
      saveComponent
    );

    if (res) {
      return formatCompilerResult(componentKey, res);
    }
  }

  if (ext === '.svelte') {
    if (!svelteCompiler) {
      throw new Error(
        `Please install ${colorizePath('@intlayer/svelte-compiler', ANSIColors.YELLOW)} to process Svelte files.`
      );
    }

    const res = svelteCompiler.processSvelteFile(
      filePath,
      componentKey,
      packageName,
      compilerCommonOptions,
      saveComponent
    );

    if (res) {
      return formatCompilerResult(componentKey, res);
    }
  }

  if (['.tsx', '.jsx', '.ts', '.js', '.cjs', '.mjs'].includes(ext)) {
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
      return {
        extractedContentMap: result.extractedContent,
        transformedCode: result.modifiedCode,
      };
    }
  }

  return undefined;
};

const handleExtractionSideEffects = async (
  extractedContentMap: Record<string, Record<string, string>>,
  filePath: string,
  options: ExtractIntlayerOptions | undefined,
  {
    configuration,
    baseDir,
    appLogger,
  }: {
    configuration: IntlayerConfig;
    baseDir: string;
    appLogger: ReturnType<typeof getAppLogger>;
  },
  saveComponent: boolean
) => {
  if (options?.onExtract) {
    for (const [key, content] of Object.entries(extractedContentMap)) {
      await options.onExtract({ key, content, filePath });
    }
  }

  const writeContent = !options?.codeOnly && !options?.onExtract;

  if (writeContent) {
    for (const [key, content] of Object.entries(extractedContentMap)) {
      const contentFilePath = await writeContentHelper(
        content,
        key,
        filePath,
        configuration
      );

      const relativeContentFilePath = relative(baseDir, contentFilePath);
      appLogger(
        `${colorize('Compiler:', ANSIColors.GREY_DARK)} Created content file: ${colorizePath(relativeContentFilePath)}`
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
      `${colorize('Compiler:', ANSIColors.GREY_DARK)} Updated component: ${colorizePath(relative(baseDir, filePath))}`
    );
  }
};

type ExtractResult = {
  transformedCode: string | null;
  extractedContentMap: Record<string, Record<string, string>>;
};

type ExtractContext = {
  configuration: IntlayerConfig;
  appLogger: ReturnType<typeof getAppLogger>;
  baseDir: string;
  unmergedDictionaries: Record<string, unknown>;
  saveComponent: boolean;
  componentExtension: string;
};

const buildContext = (
  filePath: string,
  options: ExtractIntlayerOptions | undefined
): ExtractContext => {
  const configuration =
    options?.configuration ?? getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(configuration);
  const { baseDir } = configuration.system;
  const unmergedDictionaries =
    options?.unmergedDictionaries ?? getUnmergedDictionaries(configuration);
  const saveComponent = !options?.declarationOnly;
  const componentExtension = extname(filePath);

  return {
    configuration,
    appLogger,
    baseDir,
    unmergedDictionaries,
    saveComponent,
    componentExtension,
  };
};

export const extractContent = async (
  filePath: string,
  packageName: PackageName,
  options?: ExtractIntlayerOptions
): Promise<ExtractResult | undefined> => {
  const {
    configuration,
    appLogger,
    baseDir,
    unmergedDictionaries,
    saveComponent,
    componentExtension,
  } = buildContext(filePath, options);

  if (componentExtension === '.vue' && !vueCompiler) {
    try {
      vueCompiler = await import('@intlayer/vue-compiler');
    } catch {
      appLogger(
        `${colorize('Compiler:', ANSIColors.GREY_DARK)} Install ${colorizePath('@intlayer/vue-compiler', ANSIColors.YELLOW)} to process Vue files.`
      );
    }
  }

  if (componentExtension === '.svelte' && !svelteCompiler) {
    try {
      svelteCompiler = await import('@intlayer/svelte-compiler');
    } catch {
      appLogger(
        `${colorize('Compiler:', ANSIColors.GREY_DARK)} Install ${colorizePath('@intlayer/svelte-compiler', ANSIColors.YELLOW)} to process Svelte files.`
      );
    }
  }

  const fileText = options?.code ?? readFileSync(filePath, 'utf-8');
  const dictionaryKey = extractDictionaryKey(
    filePath,
    fileText,
    configuration.compiler.dictionaryKeyPrefix
  );

  const result = processFileInternal(
    filePath,
    packageName,
    options,
    { vueCompiler, svelteCompiler, unmergedDictionaries, configuration },
    saveComponent,
    dictionaryKey
  );

  if (!result?.extractedContentMap) {
    appLogger(
      `${colorize('Compiler:', ANSIColors.GREY_DARK)} No extractable text found in ${colorizePath(relative(baseDir, filePath))}`,
      { isVerbose: true }
    );
    return undefined;
  }

  await handleExtractionSideEffects(
    result.extractedContentMap,
    filePath,
    options,
    { configuration, baseDir, appLogger },
    saveComponent
  );

  return {
    transformedCode: result.transformedCode,
    extractedContentMap: result.extractedContentMap,
  };
};

/**
 * Synchronous variant of `extractContent` — used by the Babel plugin which
 * runs in a sync transform context (e.g. Next.js / Webpack).
 *
 * Differences from `extractContent`:
 * - Loads external compilers (Vue, Svelte) via `require()` instead of `import()`
 * - Fires `onExtract` callbacks as fire-and-forget (cannot await in sync context)
 * - Does NOT write dictionary files or run the code formatter; callers that
 *   need persistence should supply an `onExtract` callback
 */
export const extractContentSync = (
  filePath: string,
  packageName: PackageName,
  options?: ExtractIntlayerOptions
): ExtractResult | undefined => {
  const {
    configuration,
    appLogger,
    baseDir,
    unmergedDictionaries,
    saveComponent,
    componentExtension,
  } = buildContext(filePath, options);

  const requireFn = getProjectRequire();

  if (componentExtension === '.vue' && !vueCompiler) {
    try {
      vueCompiler = requireFn('@intlayer/vue-compiler') as VueCompiler;
    } catch {
      appLogger(
        `${colorize('Compiler:', ANSIColors.GREY_DARK)} Install ${colorizePath('@intlayer/vue-compiler', ANSIColors.YELLOW)} to process Vue files.`
      );
    }
  }

  if (componentExtension === '.svelte' && !svelteCompiler) {
    try {
      svelteCompiler = requireFn('@intlayer/svelte-compiler') as SvelteCompiler;
    } catch {
      appLogger(
        `${colorize('Compiler:', ANSIColors.GREY_DARK)} Install ${colorizePath('@intlayer/svelte-compiler', ANSIColors.YELLOW)} to process Svelte files.`
      );
    }
  }

  const result = processFileInternal(
    filePath,
    packageName,
    options,
    { vueCompiler, svelteCompiler, unmergedDictionaries, configuration },
    saveComponent
  );

  if (!result?.extractedContentMap) {
    appLogger(
      `${colorize('Compiler:', ANSIColors.GREY_DARK)} No extractable text found in ${colorizePath(relative(baseDir, filePath))}`,
      { isVerbose: true }
    );
    return undefined;
  }

  const { extractedContentMap, transformedCode } = result;

  if (options?.onExtract) {
    for (const [key, content] of Object.entries(extractedContentMap)) {
      void options.onExtract({ key, content, filePath });
    }
  }

  return { transformedCode, extractedContentMap };
};
