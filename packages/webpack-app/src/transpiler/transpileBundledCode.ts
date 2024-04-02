import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import type { ContentModule } from 'intlayer';
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
      // Resolve the full path of the module
      const fullPath = require.resolve(entryFilePath);

      // Remove the module from the cache
      delete require.cache[fullPath];

      // Require the module anew
      const entry = await import(fullPath);

      let result: ContentModule | undefined;

      if (entry.default) {
        // JS or TS file
        result = await processModule(entryFilePath);
      } else {
        // JSON file
        result = entry;
      }

      if (!result) {
        console.error(`No content found in ${entryFilePath}`);
        continue;
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
