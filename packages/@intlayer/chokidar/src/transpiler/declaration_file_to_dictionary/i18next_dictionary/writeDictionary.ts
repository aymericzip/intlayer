import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { getConfiguration } from '@intlayer/config';
import type { I18nextDictionariesOutput } from './convertContentDeclarationInto18nDictionaries';

const { content } = getConfiguration();
const { i18nextResourcesDir } = content;

export type DictionariesDeclaration = Record<string, I18nextDictionariesOutput>;

/**
 * This function writes the dictionaries to the file system
 */
export const writeDictionary = async (
  dictionariesDeclaration: DictionariesDeclaration
) => {
  const resultDictionariesPaths: string[] = [];

  for (const [nameSpace, localContent] of Object.entries(
    dictionariesDeclaration
  )) {
    for await (const [locale, content] of Object.entries(localContent)) {
      const contentString = JSON.stringify(content);

      const outputFileName = `${nameSpace}.json`;
      const resultDirPath = resolve(i18nextResourcesDir, locale);
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
