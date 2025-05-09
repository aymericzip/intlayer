import { appLogger } from '@intlayer/config';
import {
  createProgram,
  findConfigFile,
  flattenDiagnosticMessageText,
  getPreEmitDiagnostics,
  parseConfigFileTextToJson,
  parseJsonConfigFileContent,
  sys,
} from 'typescript';

export const logTypeScriptErrors = (filePath: string) => {
  const configFileName = findConfigFile(
    process.cwd(),
    sys.fileExists,
    'tsconfig.json'
  );
  if (!configFileName) {
    appLogger("Could not find a 'tsconfig.json' file.", { level: 'error' });
    return;
  }

  const configFileText = sys.readFile(configFileName);
  if (!configFileText) {
    appLogger(`Could not read the 'tsconfig.json' file at ${configFileName}.`, {
      level: 'error',
    });
    return;
  }

  const configJson = parseConfigFileTextToJson(configFileName, configFileText);
  if (configJson.error) {
    appLogger(
      `Error parsing 'tsconfig.json': ${flattenDiagnosticMessageText(configJson.error.messageText, '\n')}`,
      { level: 'error' }
    );
    return;
  }

  const parsedConfig = parseJsonConfigFileContent(
    configJson.config,
    sys,
    process.cwd()
  );
  if (parsedConfig.errors.length > 0) {
    parsedConfig.errors.forEach((error) => {
      appLogger(
        `Error in tsconfig.json: ${flattenDiagnosticMessageText(error.messageText, '\n')}`,
        { level: 'error' }
      );
    });
    return;
  }

  // Remove incremental options to avoid the error
  const { incremental, tsBuildInfoFile, ...compilerOptions } =
    parsedConfig.options;

  // Create a program with the modified compiler options
  const program = createProgram([filePath], {
    ...compilerOptions,
    noEmit: true,
  });
  const diagnostics = getPreEmitDiagnostics(program);

  diagnostics.forEach((diagnostic) => {
    const message = flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    if (diagnostic.file && diagnostic.start !== undefined) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start
      );
      appLogger(
        `TS Error in ${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`,
        { level: 'error' }
      );
    } else {
      appLogger(`TS Error: ${message}`, { level: 'error' });
    }
  });
};
