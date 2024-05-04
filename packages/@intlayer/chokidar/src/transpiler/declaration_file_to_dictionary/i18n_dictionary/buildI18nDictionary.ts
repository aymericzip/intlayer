import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { getConfiguration } from '@intlayer/config';
import type { DeclarationContent } from '@intlayer/core';
import {
  processContentDeclaration,
  extractObjectsWithId,
} from '../intlayer_dictionary/index';
import {
  type I18nDictionariesOutput,
  createI18nDictionaries,
} from './convertContentDeclarationInto18nDictionaries';

const { content } = getConfiguration();
const { i18nDictionariesDir } = content;

type DictionariesDeclaration = Record<string, I18nDictionariesOutput>;

/**
 * This function writes the dictionaries to the file system
 */
const writeDictionary = async (
  dictionariesDeclaration: DictionariesDeclaration
) => {
  const resultDictionariesPaths: string[] = [];

  for (const [nameSpace, localContent] of Object.entries(
    dictionariesDeclaration
  )) {
    for await (const [locale, content] of Object.entries(localContent)) {
      const contentString = JSON.stringify(content);

      const outputFileName = `${nameSpace}.json`;
      const resultDirPath = resolve(i18nDictionariesDir, locale);
      const resultFilePath = resolve(resultDirPath, outputFileName);

      // Create the dictionaries folder if it doesn't exist
      await mkdir(resultDirPath, { recursive: true });

      // Create the json file
      await writeFile(resultFilePath, contentString, 'utf8').catch((err) => {
        console.error(`Error creating ${outputFileName}:`, err);
      });

      resultDictionariesPaths.push(resultFilePath);
    }
  }

  return resultDictionariesPaths;
};

/**
 * This function transpile content declaration to i18n dictionaries
 */
export const buildI18nDictionary = async (
  contentDeclarationsPaths: string[] | string
) => {
  const resultDictionariesPaths: string[] = [];

  if (typeof contentDeclarationsPaths === 'string') {
    contentDeclarationsPaths = [contentDeclarationsPaths];
  }

  for await (const contentDeclarationPath of contentDeclarationsPaths) {
    const result = await processContentDeclaration(contentDeclarationPath);

    if (!result) {
      continue;
    }

    const nestedContent: DeclarationContent[] = extractObjectsWithId(result);

    // Create dictionaries for each nested content and format them
    const dictionariesDeclaration: DictionariesDeclaration =
      nestedContent.reduce((acc, content) => {
        const id = content.id;
        const i18Content = createI18nDictionaries(content);

        return {
          ...acc,
          [id]: i18Content,
        };
      }, {});

    // Write the dictionaries to the file system
    const dictionariesPaths: string[] = await writeDictionary(
      dictionariesDeclaration
    );

    // Add the paths to the result
    resultDictionariesPaths.push(...dictionariesPaths);
  }

  return resultDictionariesPaths;
};
