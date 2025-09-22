import { getConfiguration } from '@intlayer/config';
import { mkdir } from 'fs/promises';
import { resolve } from 'path';
import { getBuiltDictionariesPath } from '../../getBuiltDictionariesPath';
import { getBuiltDynamicDictionariesPath } from '../../getBuiltDynamicDictionariesPath';
import { getBuiltFetchDictionariesPath } from '../../getBuiltFetchDictionariesPath';
import { getBuiltRemoteDictionariesPath } from '../../getBuiltRemoteDictionariesPath';
import { getBuiltUnmergedDictionariesPath } from '../../getBuiltUnmergedDictionariesPath';
import { parallelize } from '../../utils/parallelize';
import { writeFileIfChanged } from '../../writeFileIfChanged';
import { generateDictionaryListContent } from './generateDictionaryListContent';

const filterDictionaries = (paths: string[], keys?: string[]) => {
  if (!keys) return paths;
  return paths.filter((path) =>
    keys.some((key) => path.endsWith(`${key}.json`))
  );
};

const writeDictionaryFiles = async (
  paths: string[],
  fileName: string,
  functionName: string,
  format: 'cjs' | 'esm',
  configuration = getConfiguration()
) => {
  const content = generateDictionaryListContent(
    paths,
    functionName,
    format,
    configuration
  );
  const extension = format === 'cjs' ? 'cjs' : 'mjs';

  const { mainDir } = configuration.content;

  await writeFileIfChanged(
    resolve(mainDir, `${fileName}.${extension}`),
    content
  );
};

/**
 * This function generates a list of dictionaries in the main directory
 */
export const createDictionaryEntryPoint = async (
  configuration = getConfiguration(),
  dictionariesKeys?: string[],
  formats?: ('cjs' | 'esm')[]
) => {
  const outputFormats = formats ?? configuration.build.outputFormat;
  const { mainDir } = configuration.content;

  await mkdir(mainDir, { recursive: true });

  const remoteDictionariesPath = getBuiltRemoteDictionariesPath(configuration);
  const dictionariesPath = filterDictionaries(
    getBuiltDictionariesPath(configuration),
    dictionariesKeys
  );
  const unmergedDictionariesPath =
    getBuiltUnmergedDictionariesPath(configuration);

  const writeOperations = [
    ...outputFormats.map((format) => ({
      paths: remoteDictionariesPath,
      functionName: 'getRemoteDictionaries',
      fileName: 'remote_dictionaries' as const,
      format,
    })),
    ...outputFormats.map((format) => ({
      paths: dictionariesPath,
      functionName: 'getDictionaries',
      fileName: 'dictionaries' as const,
      format,
    })),
    ...outputFormats.map((format) => ({
      paths: unmergedDictionariesPath,
      functionName: 'getUnmergedDictionaries',
      fileName: 'unmerged_dictionaries' as const,
      format,
    })),
    ...outputFormats.map((format) => ({
      paths: getBuiltDynamicDictionariesPath(configuration, format),
      functionName: 'getDynamicDictionaries',
      fileName: 'dynamic_dictionaries' as const,
      format,
    })),
    ...outputFormats.map((format) => ({
      paths: getBuiltFetchDictionariesPath(configuration, format),
      functionName: 'getFetchDictionaries',
      fileName: 'fetch_dictionaries' as const,
      format,
    })),
  ];

  await parallelize(
    writeOperations,
    async ({ paths, fileName, format, functionName }) =>
      writeDictionaryFiles(paths, fileName, functionName, format, configuration)
  );
};
