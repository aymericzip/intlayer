import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { extname, relative } from 'node:path';
import type * as t from '@babel/types';
import { detectFormatCommand } from '@intlayer/chokidar/cli';
import { formatPath } from '@intlayer/chokidar/utils';
import {
  ANSIColors,
  colorize,
  colorizePath,
  getAppLogger,
} from '@intlayer/config/logger';
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
import { resolveContentFilePaths } from './utils/extractDictionaryInfo';
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
):
  | InternalExtractResult
  | Promise<InternalExtractResult | undefined>
  | undefined => {
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

export const extractContent = async (
  filePath: string,
  packageName: PackageName,
  options?: ExtractIntlayerOptions
): Promise<{ transformedCode: string | null } | undefined> => {
  const configuration =
    options?.configuration ?? getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(configuration);

  const { baseDir } = configuration.system;
  const unmergedDictionaries =
    options?.unmergedDictionaries ?? getUnmergedDictionaries(configuration);
  const saveComponent = !options?.declarationOnly;
  const componentExtension = extname(filePath);

  if (componentExtension === '.vue' && !vueCompiler) {
    vueCompiler = (await import(
      '@intlayer/vue-compiler'
    )) as unknown as VueCompiler;
  }

  if (componentExtension === '.svelte' && !svelteCompiler) {
    svelteCompiler = (await import(
      '@intlayer/svelte-compiler'
    )) as unknown as SvelteCompiler;
  }

  const fileText = options?.code ?? readFileSync(filePath, 'utf-8');
  const dictionaryKey = extractDictionaryKey(
    filePath,
    fileText,
    configuration.compiler.dictionaryKeyPrefix
  );

  const result = await processFileInternal(
    filePath,
    packageName,
    options,
    { vueCompiler, svelteCompiler, unmergedDictionaries, configuration },
    saveComponent,
    dictionaryKey
  );

  if (!result || !result.extractedContentMap) {
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

  return { transformedCode: result.transformedCode };
};

export const extractContentSync = (
  filePath: string,
  packageName: PackageName,
  options?: ExtractIntlayerOptions
):
  | {
      transformedCode: string | null;
      extractedContent: Record<string, Record<string, string>>;
    }
  | undefined => {
  const configuration =
    options?.configuration ?? getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(configuration);
  const { baseDir } = configuration.system;
  const unmergedDictionaries =
    options?.unmergedDictionaries ?? getUnmergedDictionaries(configuration);
  const saveComponent = !options?.declarationOnly;
  const componentExtension = extname(filePath);

  const requireFn = getProjectRequire();

  if (componentExtension === '.vue' && !vueCompiler) {
    try {
      vueCompiler = requireFn('@intlayer/vue-compiler') as VueCompiler;
    } catch {
      // Ignored
    }
  }
  if (componentExtension === '.svelte' && !svelteCompiler) {
    try {
      svelteCompiler = requireFn('@intlayer/svelte-compiler') as SvelteCompiler;
    } catch {
      // Ignored
    }
  }

  const result = processFileInternal(
    filePath,
    packageName,
    options,
    { vueCompiler, svelteCompiler, unmergedDictionaries, configuration },
    saveComponent
  );

  if (result instanceof Promise) {
    throw new Error(
      `Synchronous extraction failed: External compiler returned a Promise for ${formatPath(relative(baseDir, filePath))}`
    );
  }

  if (result?.extractedContentMap) {
    const { extractedContentMap, transformedCode } = result;

    if (options?.onExtract) {
      for (const [key, content] of Object.entries(extractedContentMap)) {
        void options.onExtract({ key, content, filePath });
      }
    }

    return { transformedCode, extractedContent: extractedContentMap };
  }

  appLogger(
    `${colorize('Compiler:', ANSIColors.GREY_DARK)} No extractable text found in ${colorizePath(relative(baseDir, filePath))}`,
    { isVerbose: true }
  );

  return undefined;
};
