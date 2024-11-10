import { mkdir } from 'fs/promises';
import { resolve, relative } from 'path';
import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { loadContentDeclarations } from './loadContentDeclaration';

export const loadLocalDictionaries = async (
  contentDeclarationsPaths: string[] | string
): Promise<Dictionary[]> => {
  const { content } = getConfiguration();
  const { dictionariesDir, baseDir } = content;

  if (typeof contentDeclarationsPaths === 'string') {
    contentDeclarationsPaths = [contentDeclarationsPaths];
  }

  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(dictionariesDir), { recursive: true });

  const result: Dictionary[] = [];

  for await (const contentDeclarationPath of contentDeclarationsPaths) {
    const dictionary = await loadContentDeclarations([contentDeclarationPath]);

    const relativeFilePath = relative(baseDir, contentDeclarationPath);

    const dictionaryWithPath: Dictionary = {
      ...dictionary[0],
      filePath: relativeFilePath,
    };

    result.push(dictionaryWithPath);
  }

  return result;
};
