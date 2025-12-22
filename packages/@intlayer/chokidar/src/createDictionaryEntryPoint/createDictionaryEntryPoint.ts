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
  paths: Promise<string[]>,
  fileName: string,
  importType: 'json' | 'javascript',
  functionName: string,
  format: 'cjs' | 'esm',
  configuration = getConfiguration()
) => {
  const content = generateDictionaryListContent(
    await paths,
    functionName,
    importType,
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

export type CreateDictionaryEntryPointOptions = {
  formats?: ('cjs' | 'esm')[];
  excludeKeys?: string[];
};

/**
 * This function generates a list of dictionaries in the main directory
 */
export const createDictionaryEntryPoint = async (
  configuration = getConfiguration(),
  options: CreateDictionaryEntryPointOptions = {}
) => {
  const { formats, excludeKeys = [] } = options;
  const outputFormats = formats ?? configuration.build.outputFormat;
  const { mainDir } = configuration.content;

  await mkdir(mainDir, { recursive: true });

  const writeOperations = [
    ...outputFormats.map(
      (format) =>
        ({
          paths: getBuiltDictionariesPath(configuration, excludeKeys),
          importType: 'json',
          functionName: 'getDictionaries',
          fileName: 'dictionaries' as const,
          format,
        }) as const
    ),
    ...outputFormats.map(
      (format) =>
        ({
          paths: getBuiltUnmergedDictionariesPath(configuration, excludeKeys),
          importType: 'json',
          functionName: 'getUnmergedDictionaries',
          fileName: 'unmerged_dictionaries' as const,
          format,
        }) as const
    ),
    ...outputFormats.map(
      (format) =>
        ({
          paths: getBuiltDynamicDictionariesPath(
            configuration,
            format,
            excludeKeys
          ),
          importType: 'javascript',
          functionName: 'getDynamicDictionaries',
          fileName: 'dynamic_dictionaries' as const,
          format,
        }) as const
    ),
    ...outputFormats.map(
      (format) =>
        ({
          paths: getBuiltFetchDictionariesPath(
            configuration,
            format,
            excludeKeys
          ),
          importType: 'javascript',
          functionName: 'getFetchDictionaries',
          fileName: 'fetch_dictionaries' as const,
          format,
        }) as const
    ),
    ...outputFormats.map(
      (format) =>
        ({
          paths: getBuiltRemoteDictionariesPath(configuration, excludeKeys),
          importType: 'json',
          functionName: 'getRemoteDictionaries',
          fileName: 'remote_dictionaries' as const,
          format,
        }) as const
    ),
  ];

  await parallelize(
    writeOperations,
    async ({ paths, fileName, format, functionName, importType }) =>
      writeDictionaryFiles(
        paths,
        fileName,
        importType,
        functionName,
        format,
        configuration
      )
  );
};
