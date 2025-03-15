import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';

const { dictionariesDir } = getConfiguration().content;

export const writeDictionary = async (dictionaries: Dictionary[]) => {
  const resultDictionariesPaths: string[] = [];

  for await (const dictionaryContent of dictionaries) {
    const isDevelopement = process.env.NODE_ENV === 'development';
    const contentString = isDevelopement
      ? JSON.stringify(dictionaryContent, null, 2)
      : JSON.stringify(dictionaryContent);

    const key = dictionaryContent.key;
    const outputFileName = `${key}.json`;
    const resultFilePath = resolve(dictionariesDir, outputFileName);

    // Create the json file
    await writeFile(resultFilePath, contentString, 'utf8').catch((err) => {
      console.error(`Error creating ${outputFileName}:`, err);
    });

    resultDictionariesPaths.push(resultFilePath);
  }

  return resultDictionariesPaths;
};
