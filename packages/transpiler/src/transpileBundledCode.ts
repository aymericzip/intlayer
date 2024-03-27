import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { DICTIONARIES_DIR } from '../settings';
import { getEntryName } from './utils';

export const transpileBundledCode = async (
  bundledEntriesPaths: string[] | string
) => {
  if (typeof bundledEntriesPaths === 'string') {
    bundledEntriesPaths = [bundledEntriesPaths];
  }

  // Create the dist folder if it doesn't exist
  await mkdir(resolve(DICTIONARIES_DIR), { recursive: true });

  for (const bundledEntryPath of bundledEntriesPaths) {
    const entryFilePath = resolve(bundledEntryPath);
    const bundledEntryName = getEntryName(entryFilePath, ['.bundle.js']);

    const outputFileName = `${bundledEntryName}.json`;

    const resultFilePath = resolve(DICTIONARIES_DIR, outputFileName);

    const isEntryFilePathExist = existsSync(entryFilePath);

    if (!isEntryFilePathExist) {
      console.error('Entry file not found. ' + entryFilePath);
      return;
    }

    try {
      const entry = require(entryFilePath);
      const result = entry.default ?? entry;

      const resultString = JSON.stringify(result);

      // Create the json file
      await writeFile(resultFilePath, resultString, 'utf8')
        .then(() => {
          console.log(`${outputFileName} has been created successfully.`);
        })
        .catch((err) => {
          console.error(`Error creating ${outputFileName}:`, err);
        });
    } catch (err) {
      console.error(`Error transpiling ${entryFilePath}:`, err);
    }
  }
};
