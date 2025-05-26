import { getConfiguration } from '@intlayer/config';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { getBuiltDictionariesPath } from '../../getBuiltDictionariesPath';
import { getBuiltUnmergedDictionariesPath } from '../../getBuiltUnmergedDictionariesPath';
import { generateDictionaryListContent } from './generateDictionaryListContent';

/**
 * This function generates a list of dictionaries in the main directory
 */
export const createDictionaryEntryPoint = (
  configuration = getConfiguration(),
  dictionariesKeys?: string[]
) => {
  const { mainDir } = configuration.content;

  // Create main directory if it doesn't exist
  if (!existsSync(mainDir)) {
    mkdirSync(mainDir, { recursive: true });
  }

  let dictionariesPath: string[] = getBuiltDictionariesPath(configuration);

  if (dictionariesKeys) {
    dictionariesPath = dictionariesPath.filter((dictionaryPath) =>
      dictionariesKeys.some((key) => dictionaryPath.endsWith(`${key}.json`))
    );
  }

  // Create the dictionary list file
  const cjsContent = generateDictionaryListContent(
    dictionariesPath,
    'cjs',
    configuration
  );
  writeFileSync(resolve(mainDir, 'dictionaries.cjs'), cjsContent);

  const esmContent = generateDictionaryListContent(
    dictionariesPath,
    'esm',
    configuration
  );
  writeFileSync(resolve(mainDir, 'dictionaries.mjs'), esmContent);

  const unmergedDictionariesPath: string[] =
    getBuiltUnmergedDictionariesPath(configuration);

  const unmergedCjsContent = generateDictionaryListContent(
    unmergedDictionariesPath,
    'cjs',
    configuration
  );
  writeFileSync(
    resolve(mainDir, 'unmerged_dictionaries.cjs'),
    unmergedCjsContent
  );

  const unmergedEsmContent = generateDictionaryListContent(
    unmergedDictionariesPath,
    'esm',
    configuration
  );
  writeFileSync(
    resolve(mainDir, 'unmerged_dictionaries.mjs'),
    unmergedEsmContent
  );
};
