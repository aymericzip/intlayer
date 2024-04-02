import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { getConfiguration } from 'intlayer-config';
import { extractObjectsWithId } from './extractNestedJSON';
import { processModule } from './processModule';

const { dictionariesDir, bundleFileExtension } = getConfiguration();

export const transpileBundledCode = async (
  bundledEntriesPaths: string[] | string
) => {
  if (typeof bundledEntriesPaths === 'string') {
    bundledEntriesPaths = [bundledEntriesPaths];
  }

  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(dictionariesDir), { recursive: true });

  for (const bundledEntryPath of bundledEntriesPaths) {
    const entryFilePath = resolve(bundledEntryPath);

    const isEntryFilePathExist = existsSync(entryFilePath);

    if (!isEntryFilePathExist) {
      console.error('Entry file not found. ' + entryFilePath);
      return;
    }

    const isEntryPathValid = entryFilePath.endsWith(bundleFileExtension);

    if (!isEntryPathValid) {
      continue;
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
        const resultFilePath = resolve(dictionariesDir, outputFileName);

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
