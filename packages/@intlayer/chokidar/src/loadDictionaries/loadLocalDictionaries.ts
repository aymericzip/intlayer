import { mkdir } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { loadContentDeclarations } from './loadContentDeclaration';

export const loadLocalDictionaries = async (
  contentDeclarationsPaths: string[] | string,
  configuration: IntlayerConfig
): Promise<Dictionary[]> => {
  const { system } = configuration;
  const { dictionariesDir, baseDir } = system;

  if (typeof contentDeclarationsPaths === 'string') {
    contentDeclarationsPaths = [contentDeclarationsPaths];
  }

  // Create the dictionaries folder if it doesn't exist
  await mkdir(resolve(dictionariesDir), { recursive: true });

  const result: Dictionary[] = [];

  for await (const contentDeclarationPath of contentDeclarationsPaths) {
    const dictionary = await loadContentDeclarations(
      [contentDeclarationPath],
      configuration
    );

    const relativeFilePath = relative(baseDir, contentDeclarationPath);

    const dictionaryWithPath: Dictionary = {
      ...dictionary[0],
      filePath: relativeFilePath,
    };

    result.push(dictionaryWithPath);
  }

  return result;
};
