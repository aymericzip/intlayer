import { existsSync } from 'node:fs';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import { getAppLogger, logger } from '@intlayer/config/logger';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { runFormatCommand } from '../detectFormatCommand';
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
  noMetadata?: boolean
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
    // Only the dictionary's own metadata: the config-level defaults
    // (`fill`, `importMode`…) apply on their own and must not be duplicated.
    const template = await getContentDeclarationFileTemplate(
      mergedDictionary.key,
      format,
      // Filter out undefined values
      Object.fromEntries(
        Object.entries({
          id: noMetadata ? undefined : dictionary.id,
          locale: noMetadata ? undefined : dictionary.locale,
          filled: noMetadata ? undefined : dictionary.filled,
          fill: noMetadata ? undefined : dictionary.fill,
          description: noMetadata ? undefined : dictionary.description,
          title: noMetadata ? undefined : dictionary.title,
          tags: noMetadata ? undefined : dictionary.tags,
          version: noMetadata ? undefined : dictionary.version,
          priority: noMetadata ? undefined : dictionary.priority,
          importMode: noMetadata ? undefined : dictionary.importMode,
        }).filter(([, value]) => value !== undefined)
      ),
      noMetadata
    );

    const tempDir = configuration.system?.tempDir;
    if (tempDir) {
      await mkdir(tempDir, { recursive: true });
    }

    const tempFileName = `${basename(filePath)}.${Date.now()}-${Math.random().toString(36).slice(2)}.tmp`;
    const tempPath = tempDir
      ? join(tempDir, tempFileName)
      : `${filePath}.${tempFileName}`;
    try {
      await writeFile(tempPath, template, 'utf-8');
      await rename(tempPath, filePath);
    } catch (error) {
      try {
        await rm(tempPath, { force: true });
      } catch {
        // Ignore
      }
      throw error;
    }
  }

  let fileContent = await readFile(filePath, 'utf-8');

  if (fileContent === '') {
    const format = getFormatFromExtension(extname(filePath) as Extension);

    fileContent = await getContentDeclarationFileTemplate(
      mergedDictionary.key,
      format,
      {},
      noMetadata
    );
  }

  const finalCode = await transformJSFile(
    fileContent,
    dictionary,
    dictionary.locale as any,
    noMetadata
  );

  // Write the modified code back to the file
  const tempDir = configuration.system?.tempDir;
  if (tempDir) {
    await mkdir(tempDir, { recursive: true });
  }

  const tempFileName = `${basename(filePath)}.${Date.now()}-${Math.random().toString(36).slice(2)}.tmp`;
  const tempPath = tempDir
    ? join(tempDir, tempFileName)
    : `${filePath}.${tempFileName}`;
  try {
    await writeFile(tempPath, finalCode, 'utf-8');
    await rename(tempPath, filePath);
    logger(`Successfully updated ${filePath}`, {
      level: 'info',
      isVerbose: true,
    });
  } catch (error) {
    try {
      await rm(tempPath, { force: true });
    } catch {
      // Ignore
    }
    const err = error as Error;
    logger(`Failed to write updated file: ${filePath}`, {
      level: 'error',
    });
    throw new Error(`Failed to write updated file ${filePath}: ${err.message}`);
  }

  runFormatCommand(filePath, configuration);
};
