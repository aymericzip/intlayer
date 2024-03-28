import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { DICTIONARIES_DIR } from '../settings';
import { extractObjectsWithId } from './extractNestedJSON';
import { processModule } from './processModule';

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

    const isEntryFilePathExist = existsSync(entryFilePath);

    if (!isEntryFilePathExist) {
      console.error('Entry file not found. ' + entryFilePath);
      return;
    }

    try {
      const entry = require(entryFilePath);
      let result;

      if (entry.default) {
        // JS or TS file
        result = await processModule(entryFilePath);
      } else {
        // JSON file
        result = entry;
      }

      const nestedContent = extractObjectsWithId(result);

      for (const content of nestedContent) {
        const contentString = JSON.stringify(content);

        const id = content.id;
        const outputFileName = `${id}.json`;
        const resultFilePath = resolve(DICTIONARIES_DIR, outputFileName);

        // Create the json file
        await writeFile(resultFilePath, contentString, 'utf8').catch((err) => {
          console.error(`Error creating ${outputFileName}:`, err);
        });
      }
    } catch (err) {
      console.error(`Error transpiling ${entryFilePath}:`, err);
    }
  }
};
