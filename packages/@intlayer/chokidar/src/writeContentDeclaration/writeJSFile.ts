import {
  getAppLogger,
  getConfiguration,
  IntlayerConfig,
  logger,
} from '@intlayer/config';
import { Dictionary } from '@intlayer/core';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { extname } from 'path';
import { getContentDeclarationFileTemplate } from '../getContentDeclarationFileTemplate/getContentDeclarationFileTemplate';
import {
  Extension,
  getFormatFromExtension,
} from '../utils/getFormatFromExtension';
import { formatCode } from './formatCode';
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
  configuration: IntlayerConfig = getConfiguration()
): Promise<void> => {
  const { key, locale, autoFilled } = dictionary;
  const appLogger = getAppLogger(configuration);

  // Check if the file exist
  if (!existsSync(filePath)) {
    const fileExtension = extname(filePath) as Extension;

    let format = getFormatFromExtension(fileExtension);

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

  const finalCode = await transformJSFile(fileContent, dictionary);

  const formattedCode = await formatCode(filePath, finalCode);

  // Write the modified code back to the file
  try {
    await writeFile(filePath, formattedCode, 'utf-8');
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
};
