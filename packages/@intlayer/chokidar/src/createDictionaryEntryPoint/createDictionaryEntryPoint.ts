import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { getConfiguration } from '@intlayer/config';
import { parallelize } from '../utils/parallelize';
import { writeFileIfChanged } from '../writeFileIfChanged';
import { generateDictionaryListContent } from './generateDictionaryListContent';
import { getBuiltDictionariesPath } from './getBuiltDictionariesPath';
import { getBuiltDynamicDictionariesPath } from './getBuiltDynamicDictionariesPath';
import { getBuiltFetchDictionariesPath } from './getBuiltFetchDictionariesPath';
import { getBuiltRemoteDictionariesPath } from './getBuiltRemoteDictionariesPath';
import { getBuiltUnmergedDictionariesPath } from './getBuiltUnmergedDictionariesPath';

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
  formats?: ('cjs' | 'esm')[]
) => {
  const outputFormats = formats ?? configuration.build.outputFormat;
  const { mainDir } = configuration.content;

  await mkdir(mainDir, { recursive: true });

  const writeOperations = [
    ...outputFormats.map((format) => ({
      paths: getBuiltRemoteDictionariesPath(configuration),
      functionName: 'getRemoteDictionaries',
      fileName: 'remote_dictionaries' as const,
      format,
    })),
    ...outputFormats.map((format) => ({
      paths: getBuiltDictionariesPath(configuration),
      functionName: 'getDictionaries',
      fileName: 'dictionaries' as const,
      format,
    })),
    ...outputFormats.map((format) => ({
      paths: getBuiltUnmergedDictionariesPath(configuration),
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
