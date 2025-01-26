import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';

const { dictionariesDir } = getConfiguration().content;

export const writeDictionary = async (dictionaries: Dictionary[]) => {
  const resultDictionariesPaths: string[] = [];

  for await (const dictionaryContent of dictionaries) {
    const contentString = JSON.stringify({
      $schema: 'https://intlayer.org/schema.json',
      ...dictionaryContent,
    });

    const id = dictionaryContent.key;
    const outputFileName = `${id}.json`;
    const resultFilePath = resolve(dictionariesDir, outputFileName);

    // Create the json file
    await writeFile(resultFilePath, contentString, 'utf8').catch((err) => {
      console.error(`Error creating ${outputFileName}:`, err);
    });

    resultDictionariesPaths.push(resultFilePath);
  }

  return resultDictionariesPaths;
};
