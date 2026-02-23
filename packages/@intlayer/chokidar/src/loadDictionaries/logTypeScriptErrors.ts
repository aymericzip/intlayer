import { dirname, extname } from 'node:path';

import { getAppLogger } from '@intlayer/config';

import type { IntlayerConfig } from '@intlayer/types';

export const logTypeScriptErrors = async (
  filePaths: string[],

  configuration: IntlayerConfig
) => {
  const appLogger = getAppLogger(configuration);

  const filesToCheck = filePaths.filter((path) => {
    const ext = extname(path);

    return ['.ts', '.tsx', '.js', '.jsx', '.cjs', '.mjs', '.json'].includes(
      ext
    );
  });

  if (filesToCheck.length === 0) return;

  let ts: typeof import('typescript');

  try {
    ts = (await import('typescript')).default || (await import('typescript'));
  } catch {
    // TypeScript not installed, skip type checking

    return;
  }

  const configFileName = ts.findConfigFile(
    configuration.content?.baseDir ?? process.cwd(),

    ts.sys.fileExists,

    'tsconfig.json'
  );

  let compilerOptions: any = {
    noEmit: true,

    allowJs: true,

    resolveJsonModule: true,
  };

  if (configFileName) {
    const configFileText = ts.sys.readFile(configFileName);

    if (configFileText) {
      const configJson = ts.parseConfigFileTextToJson(
        configFileName,

        configFileText
      );

      if (!configJson.error) {
        const parsedConfig = ts.parseJsonConfigFileContent(
          configJson.config,

          ts.sys,

          dirname(configFileName)
        );

        const { incremental, tsBuildInfoFile, ...restOptions } =
          parsedConfig.options;

        compilerOptions = { ...compilerOptions, ...restOptions, noEmit: true };
      }
    }
  }

  const program = ts.createProgram(filesToCheck, compilerOptions);

  filesToCheck.forEach((filePath) => {
    const sourceFile = program.getSourceFile(filePath);

    if (!sourceFile) return;

    const diagnostics = ts.getPreEmitDiagnostics(program, sourceFile);

    diagnostics.forEach((diagnostic) => {
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,

        '\n'
      );

      if (diagnostic.file && diagnostic.start !== undefined) {
        const { line, character } =
          diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);

        appLogger(
          `TS Error in ${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`,

          { level: 'warn' }
        );
      }
    });
  });
};
