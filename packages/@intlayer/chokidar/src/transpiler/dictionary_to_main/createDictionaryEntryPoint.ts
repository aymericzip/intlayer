import { getConfiguration } from '@intlayer/config';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { getBuiltDictionariesPath } from '../../getBuiltDictionariesPath';
import { getBuiltDynamicDictionariesPath } from '../../getBuiltDynamicDictionariesPath';
import { getBuiltFetchDictionariesPath } from '../../getBuiltFetchDictionariesPath';
import { getBuiltRemoteDictionariesPath } from '../../getBuiltRemoteDictionariesPath';
import { getBuiltUnmergedDictionariesPath } from '../../getBuiltUnmergedDictionariesPath';
import { generateDictionaryListContent } from './generateDictionaryListContent';

const filterDictionaries = (paths: string[], keys?: string[]) => {
  if (!keys) return paths;
  return paths.filter((path) =>
    keys.some((key) => path.endsWith(`${key}.json`))
  );
};

const writeDictionaryFiles = (
  paths: string[],
  fileName: string,
  format: 'cjs' | 'esm',
  configuration = getConfiguration()
) => {
  const content = generateDictionaryListContent(paths, format, configuration);
  const extension = format === 'cjs' ? 'cjs' : 'mjs';

  const { mainDir } = configuration.content;

  writeFileSync(resolve(mainDir, `${fileName}.${extension}`), content);
};

/**
 * This function generates a list of dictionaries in the main directory
 */
export const createDictionaryEntryPoint = (
  configuration = getConfiguration(),
  dictionariesKeys?: string[],
  formats: ('cjs' | 'esm')[] = ['cjs', 'esm']
) => {
  const { mainDir } = configuration.content;

  // Create main directory if it doesn't exist
  if (!existsSync(mainDir)) {
    mkdirSync(mainDir, { recursive: true });
  }

  const remoteDictionariesPath = getBuiltRemoteDictionariesPath(configuration);

  for (const format of formats) {
    writeDictionaryFiles(
      remoteDictionariesPath,
      'remote_dictionaries',
      format,
      configuration
    );
  }

  const dictionariesPath = filterDictionaries(
    getBuiltDictionariesPath(configuration),
    dictionariesKeys
  );

  for (const format of formats) {
    writeDictionaryFiles(
      dictionariesPath,
      'dictionaries',
      format,
      configuration
    );
  }

  const unmergedDictionariesPath =
    getBuiltUnmergedDictionariesPath(configuration);

  for (const format of formats) {
    writeDictionaryFiles(
      unmergedDictionariesPath,
      'unmerged_dictionaries',
      format,
      configuration
    );
  }

  for (const format of formats) {
    const dynamicDictionariesPath = getBuiltDynamicDictionariesPath(
      configuration,
      format
    );

    writeDictionaryFiles(
      dynamicDictionariesPath,
      'dynamic_dictionaries',
      format,
      configuration
    );
  }

  for (const format of formats) {
    const fetchDictionariesPath = getBuiltFetchDictionariesPath(
      configuration,
      format
    );

    writeDictionaryFiles(
      fetchDictionariesPath,
      'fetch_dictionaries',
      format,
      configuration
    );
  }
};
