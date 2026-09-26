import { dirname, extname, resolve } from 'node:path';
import { getAppLogger } from '@intlayer/config/logger';
import type { IntlayerConfig } from '@intlayer/types/config';
import type {
  API as NativeTypeScriptAPI,
  Diagnostic as NativeTypeScriptDiagnostic,
} from 'typescript/unstable/sync';

/** Diagnostic of the classic (TS <= 6) compiler API. */
interface ClassicTypeScriptDiagnostic {
  file?: {
    fileName: string;
    getLineAndCharacterOfPosition: (position: number) => {
      line: number;
      character: number;
    };
  };
  start?: number;
  messageText: string | { messageText: string };
}

/** Subset of the classic (TS <= 6) compiler API used here. */
interface ClassicTypeScriptCompiler {
  findConfigFile: (
    searchPath: string,
    fileExists: (path: string) => boolean,
    configName?: string
  ) => string | undefined;
  sys: {
    fileExists: (path: string) => boolean;
    readFile: (path: string, encoding?: string) => string | undefined;
  };
  parseConfigFileTextToJson: (
    fileName: string,
    jsonText: string
  ) => { config?: Record<string, unknown>; error?: unknown };
  parseJsonConfigFileContent: (
    json: unknown,
    host: unknown,
    basePath: string
  ) => {
    options: Record<string, unknown>;
  };
  createProgram: (
    rootNames: readonly string[],
    options: Record<string, unknown>
  ) => {
    getSourceFile: (fileName: string) => unknown;
  };
  getPreEmitDiagnostics: (
    program: unknown,
    sourceFile?: unknown
  ) => readonly ClassicTypeScriptDiagnostic[];
  flattenDiagnosticMessageText: (
    diagnostic: string | { messageText: string },
    newLine: string
  ) => string;
}

/** Root module of `typescript`, possibly wrapped in a CJS `default`. */
type ClassicTypeScriptModule = Partial<ClassicTypeScriptCompiler> & {
  default?: Partial<ClassicTypeScriptCompiler>;
};

/** Engine-agnostic diagnostic, with 0-based line and character. */
interface TypeScriptError {
  fileName: string;
  line: number;
  character: number;
  message: string;
}

const CHECKABLE_EXTENSIONS = [
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.cjs',
  '.mjs',
  '.json',
];

/**
 * Checks files with the classic compiler API (`typescript` <= 6), which is
 * exposed from the package root.
 */
const collectClassicTypeScriptErrors = (
  typescript: ClassicTypeScriptCompiler,
  filePaths: string[],
  baseDir: string
): TypeScriptError[] => {
  const configFileName = typescript.findConfigFile(
    baseDir,
    typescript.sys.fileExists,
    'tsconfig.json'
  );

  let compilerOptions: Record<string, unknown> = {
    noEmit: true,
    allowJs: true,
    resolveJsonModule: true,
  };

  const configFileText = configFileName
    ? typescript.sys.readFile(configFileName)
    : undefined;

  if (configFileName && configFileText) {
    const configJson = typescript.parseConfigFileTextToJson(
      configFileName,
      configFileText
    );

    if (!configJson.error) {
      const parsedConfig = typescript.parseJsonConfigFileContent(
        configJson.config,
        typescript.sys,
        dirname(configFileName)
      );

      const { incremental, tsBuildInfoFile, ...restOptions } =
        parsedConfig.options;

      compilerOptions = { ...compilerOptions, ...restOptions, noEmit: true };
    }
  }

  const program = typescript.createProgram(filePaths, compilerOptions);

  return filePaths.flatMap((filePath) => {
    const sourceFile = program.getSourceFile(filePath);

    if (!sourceFile) return [];

    return typescript
      .getPreEmitDiagnostics(program, sourceFile)
      .flatMap((diagnostic) => {
        if (!diagnostic.file || diagnostic.start === undefined) return [];

        const { line, character } =
          diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);

        return {
          fileName: diagnostic.file.fileName,
          line,
          character,
          message: typescript.flattenDiagnosticMessageText(
            diagnostic.messageText,
            '\n'
          ),
        };
      });
  });
};

/** Flattens a native diagnostic message chain, indenting nested messages. */
const flattenNativeDiagnosticMessage = (
  diagnostic: NativeTypeScriptDiagnostic,
  depth = 0
): string =>
  [
    `${'  '.repeat(depth)}${diagnostic.text}`,
    ...(diagnostic.messageChain ?? []).map((chainedDiagnostic) =>
      flattenNativeDiagnosticMessage(chainedDiagnostic, depth + 1)
    ),
  ].join('\n');

/**
 * Checks files with the native API (`typescript` >= 7, Go port), whose root
 * export only exposes the version. It spawns the bundled `tsgo` binary, which
 * resolves the closest tsconfig of each file.
 */
const collectNativeTypeScriptErrors = (
  NativeAPI: typeof NativeTypeScriptAPI,
  filePaths: string[],
  baseDir: string
): TypeScriptError[] => {
  const api = new NativeAPI({ cwd: baseDir });

  try {
    const snapshot = api.updateSnapshot({ openFiles: filePaths });

    try {
      return filePaths.flatMap((filePath) => {
        const program = snapshot.getDefaultProjectForFile(filePath)?.program;
        const sourceFile = program?.getSourceFile(filePath);

        if (!program || !sourceFile) return [];

        return [
          ...program.getSyntacticDiagnostics(filePath),
          ...program.getSemanticDiagnostics(filePath),
        ].map((diagnostic) => {
          const { line, character } = sourceFile.getLineAndCharacterOfPosition(
            diagnostic.pos
          );

          return {
            fileName: diagnostic.fileName ?? filePath,
            line,
            character,
            message: flattenNativeDiagnosticMessage(diagnostic),
          };
        });
      });
    } finally {
      snapshot.dispose();
    }
  } finally {
    api.close();
  }
};

/**
 * Resolves the installed TypeScript and returns its errors for the given
 * files, or `undefined` if TypeScript is not installed.
 */
const collectTypeScriptErrors = async (
  filePaths: string[],
  baseDir: string
): Promise<TypeScriptError[] | undefined> => {
  let typescriptModule: ClassicTypeScriptModule;

  try {
    // Typed against the installed version, whose root may be version-only (>= 7)
    typescriptModule = (await import(
      'typescript'
    )) as unknown as ClassicTypeScriptModule;
  } catch {
    return undefined;
  }

  const classicTypeScript = typescriptModule.createProgram
    ? typescriptModule
    : typescriptModule.default;

  if (classicTypeScript?.createProgram) {
    return collectClassicTypeScriptErrors(
      classicTypeScript as ClassicTypeScriptCompiler,
      filePaths,
      baseDir
    );
  }

  let nativeModule: { API: typeof NativeTypeScriptAPI };

  try {
    nativeModule = await import('typescript/unstable/sync');
  } catch {
    // Neither the classic nor the native API is available
    return undefined;
  }

  return collectNativeTypeScriptErrors(nativeModule.API, filePaths, baseDir);
};

/**
 * Type-checks content declaration files and logs errors as warnings.
 * Supports both the classic (`typescript` <= 6) and native (>= 7) compilers.
 */
export const logTypeScriptErrors = async (
  filePaths: string[],
  configuration: IntlayerConfig
): Promise<void> => {
  const appLogger = getAppLogger(configuration);
  const baseDir = configuration.system?.baseDir ?? process.cwd();

  const filesToCheck = filePaths
    .filter((filePath) => CHECKABLE_EXTENSIONS.includes(extname(filePath)))
    .map((filePath) => resolve(baseDir, filePath));

  if (filesToCheck.length === 0) return;

  const typeScriptErrors = await collectTypeScriptErrors(filesToCheck, baseDir);

  typeScriptErrors?.forEach(({ fileName, line, character, message }) => {
    appLogger(
      `TS Error in ${fileName} (${line + 1},${character + 1}): ${message}`,
      { level: 'warn' }
    );
  });
};
