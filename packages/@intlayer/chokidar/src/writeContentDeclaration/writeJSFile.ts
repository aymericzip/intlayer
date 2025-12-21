import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { getAppLogger, logger } from '@intlayer/config';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import { getContentDeclarationFileTemplate } from '../getContentDeclarationFileTemplate/getContentDeclarationFileTemplate';
import {
  type Extension,
  getFormatFromExtension,
} from '../utils/getFormatFromExtension';
import { detectFormatCommand } from './detectFormatCommand';
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
  configuration: IntlayerConfig
): Promise<void> => {
  const mergedDictionary = {
    ...configuration.dictionary,
    ...dictionary,
  };

  const appLogger = getAppLogger(configuration);

  // Check if the file exist
  if (!existsSync(filePath)) {
    const fileExtension = extname(filePath) as Extension;

    const format = getFormatFromExtension(fileExtension);

    appLogger('File does not exist, creating it', {
      isVerbose: true,
    });
    const template = await getContentDeclarationFileTemplate(
      mergedDictionary.key,
      format,
      // Filter out undefined values
      Object.fromEntries(
        Object.entries({
          id: mergedDictionary.id,
          locale: mergedDictionary.locale,
          filled: mergedDictionary.filled,
          fill: mergedDictionary.fill,
          description: mergedDictionary.description,
          title: mergedDictionary.title,
          tags: mergedDictionary.tags,
          version: mergedDictionary.version,
          priority: mergedDictionary.priority,
          live: mergedDictionary.live,
        }).filter(([, value]) => value !== undefined)
      )
    );

    await writeFile(filePath, template, 'utf-8');
  }

  let fileContent = await readFile(filePath, 'utf-8');

  if (fileContent === '') {
    const format = getFormatFromExtension(extname(filePath) as Extension);

    fileContent = await getContentDeclarationFileTemplate(
      mergedDictionary.key,
      format
    );
  }

  const finalCode = await transformJSFile(fileContent, dictionary);

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
};
