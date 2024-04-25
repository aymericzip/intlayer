import { mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { getConfiguration } from '@intlayer/config';
import type { ContentModule } from '@intlayer/core';
import { extractObjectsWithId } from './extractNestedJSON';
import { processContentDeclaration } from './processContentDeclaration';

const { content } = getConfiguration();
const { dictionariesDir } = content;

const writeDictionary = async (dictionaries: ContentModule[]) => {
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
export const buildIntlayerDictionary = async (
  contentDeclarationsPaths: string[] | string
) => {
  const resultDictionariesPaths: string[] = [];

  if (typeof contentDeclarationsPaths === 'string') {
    contentDeclarationsPaths = [contentDeclarationsPaths];
  }

  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(dictionariesDir), { recursive: true });

  for await (const contentDeclarationPath of contentDeclarationsPaths) {
    const result = await processContentDeclaration(contentDeclarationPath);

    if (!result) {
      continue;
    }

    const nestedContent: ContentModule[] = extractObjectsWithId(result);

    const dictionariesPaths: string[] = await writeDictionary(nestedContent);

    resultDictionariesPaths.push(...dictionariesPaths);
  }

  return resultDictionariesPaths;
};
