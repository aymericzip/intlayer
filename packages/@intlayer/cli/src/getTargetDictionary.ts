import { join, relative } from 'node:path';
import { type ListGitFilesOptions, listGitFiles } from '@intlayer/chokidar';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config';
import type { Dictionary } from '@intlayer/types';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';

export const ensureArray = <T>(value: T | T[]): T[] => [value].flat() as T[];

// Arguments for the fill function
export type GetTargetDictionaryOptions = {
  file?: string | string[];
  keys?: string | string[];
  excludedKeys?: string | string[];
  filter?: (entry: Dictionary) => boolean; // DictionaryEntry needs to be defined
  pathFilter?: string | string[];
  gitOptions?: ListGitFilesOptions;
  configOptions?: GetConfigurationOptions;
};

export const getTargetUnmergedDictionaries = async (
  options?: GetTargetDictionaryOptions
): Promise<Dictionary[]> => {
  const configuration = getConfiguration(options?.configOptions);

  const { baseDir } = configuration.content;

  const unmergedDictionariesRecord = getUnmergedDictionaries(configuration);
  let result = Object.values(unmergedDictionariesRecord).flat();

  // 1. if filePath not defined, list all content declaration files based on unmerged dictionaries list
  if (typeof options?.file !== 'undefined') {
    const fileArray = ensureArray(options?.file);
    const relativeFilePaths = fileArray.map((file) =>
      file.startsWith('/') ? relative(baseDir, file) : join('./', file)
    );

    result = result.filter(
      (dict) =>
        dict.filePath &&
        // Check for absolute path
        relativeFilePaths.includes(dict.filePath)
    );
  }

  if (typeof options?.keys !== 'undefined') {
    result = result.filter((dict) =>
      ensureArray(options?.keys)?.includes(dict.key)
    );
  }

  if (typeof options?.excludedKeys !== 'undefined') {
    result = result.filter(
      (dict) => !ensureArray(options?.excludedKeys)?.includes(dict.key)
    );
  }

  if (typeof options?.pathFilter !== 'undefined') {
    result = result.filter((dict) =>
      ensureArray(options?.pathFilter)?.includes(dict.filePath ?? '')
    );
  }

  if (typeof options?.filter !== 'undefined') {
    result = result.filter(options?.filter);
  }

  const gitOptions = options?.gitOptions;
  if (gitOptions) {
    const gitChangedFiles = await listGitFiles(gitOptions);

    if (gitChangedFiles) {
      // Convert dictionary file paths to be relative to git root for comparison

      // Filter dictionaries based on git changed files
      result = result.filter((dict) => {
        if (!dict.filePath) return false;

        return gitChangedFiles.some((gitFile) => dict.filePath === gitFile);
      });
    }
  }

  return result.filter((dict) => !dict.autoFilled);
};
