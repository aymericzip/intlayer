import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import type { ContentModule } from 'intlayer';
import { getConfiguration } from 'intlayer-config';
import { extractObjectsWithId } from './extractNestedJSON';
import { processModule } from './processModule';

const { dictionariesDir, bundleFileExtension } = getConfiguration();

const loadBundledModule = async (bundledEntryPath: string) => {
  const entryFilePath = resolve(bundledEntryPath);

  const isEntryFilePathExist = existsSync(entryFilePath);

  if (!isEntryFilePathExist) {
    console.error('Entry file not found. ' + entryFilePath);
    return;
  }

  const isEntryPathValid = entryFilePath.endsWith(bundleFileExtension);

  if (!isEntryPathValid) {
    return;
  }

  try {
    // Remove the module from the cache
    delete require.cache[entryFilePath];

    // Require the module anew
    const entry = await import(entryFilePath);

    let result: ContentModule | undefined;

    if (entry.default) {
      // JS or TS file
      result = await processModule(entryFilePath);
    } else {
      // JSON file
      result = entry;
    }

    return result;
  } catch (err) {
    console.error(`Error transpiling ${entryFilePath}:`, err);
  }
};

const buildDictionary = async (dictionaries: ContentModule[]) => {
  const resultDictionariesPaths: string[] = [];

  for await (const content of dictionaries) {
    const contentString = JSON.stringify(content);

    const id = content.id;
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

/**
 * This function transpile the bundled code to to make dictionaries as JSON files
 */
export const transpileBundledCode = async (
  bundledEntriesPaths: string[] | string
) => {
  const resultDictionariesPaths: string[] = [];

  if (typeof bundledEntriesPaths === 'string') {
    bundledEntriesPaths = [bundledEntriesPaths];
  }

  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(dictionariesDir), { recursive: true });

  for await (const bundledEntryPath of bundledEntriesPaths) {
    const result = await loadBundledModule(bundledEntryPath);

    if (!result) {
      continue;
    }

    const nestedContent: ContentModule[] = extractObjectsWithId(result);

    const dictionariesPaths: string[] = await buildDictionary(nestedContent);

    resultDictionariesPaths.push(...dictionariesPaths);
  }

  return resultDictionariesPaths;
};
