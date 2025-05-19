import { getConfiguration } from '@intlayer/config';
import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import type { I18nextDictionariesOutput } from './convertContentDeclarationInto18nDictionaries';

export type DictionariesDeclaration = Record<string, I18nextDictionariesOutput>;

/**
 * This function writes the dictionaries to the file system
 */
export const writeDictionary = async (
  dictionariesDeclaration: DictionariesDeclaration,
  configuration = getConfiguration()
) => {
  const { i18nextResourcesDir } = configuration.content;

  const resultDictionariesPaths: string[] = [];

  for (const [nameSpace, localContent] of Object.entries(
    dictionariesDeclaration
  )) {
    for await (const [locale, content] of Object.entries(localContent)) {
      const contentString = JSON.stringify(content);

      const outputFileName = `${nameSpace}.json`;
      const dictionariesDirPath = resolve(i18nextResourcesDir, locale);
      const resultFilePath = resolve(dictionariesDirPath, outputFileName);

      // Create the dictionaries folder if it doesn't exist
      await mkdir(dictionariesDirPath, { recursive: true });

      // Create the json file
      await writeFile(resultFilePath, contentString, 'utf8').catch((err) => {
        console.error(`Error creating ${outputFileName}:`, err);
      });

      resultDictionariesPaths.push(resultFilePath);
    }
  }

  return resultDictionariesPaths;
};
