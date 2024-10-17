import { mkdir, writeFile } from 'fs/promises';
import { resolve, relative } from 'path';
import { getConfiguration } from '@intlayer/config';
import type { DeclarationContent } from '@intlayer/core';
import { processContentDeclaration } from './processContentDeclaration';

const { content } = getConfiguration();
const { dictionariesDir, baseDir } = content;

const writeDictionary = async (dictionaries: DeclarationContent[]) => {
  const resultDictionariesPaths: string[] = [];

  for await (const dictionaryContent of dictionaries) {
    const contentString = JSON.stringify(dictionaryContent);

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

    const nestedContent: DeclarationContent[] = [result];

    const relativeFilePath = relative(baseDir, contentDeclarationPath);

    const contentWithFilePath: DeclarationContent[] = nestedContent.map(
      (content) => ({
        ...content,
        filePath: relativeFilePath,
      })
    );

    const dictionariesPaths: string[] =
      await writeDictionary(contentWithFilePath);

    resultDictionariesPaths.push(...dictionariesPaths);
  }

  return resultDictionariesPaths;
};
