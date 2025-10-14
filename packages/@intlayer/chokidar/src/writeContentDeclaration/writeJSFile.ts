import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { extname } from 'node:path';
import {
  getAppLogger,
  type IntlayerConfig,
  type Locales,
  logger,
} from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { getContentDeclarationFileTemplate } from '../getContentDeclarationFileTemplate/getContentDeclarationFileTemplate';
import {
  type Extension,
  getFormatFromExtension,
} from '../utils/getFormatFromExtension';
import { transformJSFile } from './transformJSFile';

/**
 * Updates a JavaScript/TypeScript file based on the provided JSON instructions.
 * It targets a specific dictionary object within the file (identified by its 'key' property)
 * and updates its 'content' entries. Currently, it focuses on modifying arguments
 * of 't' (translation) function calls.
 */
export const writeJSFile = async (
  filePath: string,
  dictionary: Dictionary,
  configuration: IntlayerConfig,
  fallbackLocale?: Locales
): Promise<void> => {
  const { key, locale, autoFilled } = dictionary;
  const appLogger = getAppLogger(configuration);

  // Check if the file exist
  if (!existsSync(filePath)) {
    const fileExtension = extname(filePath) as Extension;

    const format = getFormatFromExtension(fileExtension);

    appLogger('File does not exist, creating it', {
      isVerbose: true,
    });
    const template = await getContentDeclarationFileTemplate(key, format, {
      locale,
      autoFilled,
    });

    await writeFile(filePath, template, 'utf-8');
  }

  const fileContent = await readFile(filePath, 'utf-8');

  const finalCode = await transformJSFile(
    fileContent,
    dictionary,
    fallbackLocale
  );

  // Write the modified code back to the file
  try {
    await writeFile(filePath, finalCode, 'utf-8');
    logger(`Successfully updated ${filePath}`, {
      level: 'info',
      isVerbose: true,
    });
  } catch (error) {
    const err = error as Error;
    logger(`Failed to write updated file: ${filePath}`, {
      level: 'error',
    });
    throw new Error(`Failed to write updated file ${filePath}: ${err.message}`);
  }

  if (configuration.editor.formatCommand) {
    try {
      execSync(
        configuration.editor.formatCommand.replace('{{file}}', filePath),
        {
          stdio: 'inherit',
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
};
