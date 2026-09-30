import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { FILE_EXTENSIONS } from '@intlayer/config/defaultValues';
import {
  getConfiguration,
  searchConfigurationFile,
} from '@intlayer/config/node';
import { clearAllCache } from '@intlayer/config/utils';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import { getSelectedEnvironment } from './envStore';
import { getConfigurationOptions } from './getConfiguration';

/** Identity of a file version: changes whenever the file is rewritten. */
type FileVersion = { modifiedTime: number; size: number };

type ConfigurationCacheEntry = {
  configurationFilePath: string | undefined;
  version: FileVersion | null;
  configuration: Promise<IntlayerConfig>;
};

/** Loaded configuration per `${projectDir}:${environment}`. */
const configurationCache = new Map<string, ConfigurationCacheEntry>();

/** Parsed dictionary JSON files per absolute path. */
const dictionaryCache = new Map<
  string,
  { version: FileVersion; dictionaries: Dictionary[] }
>();

/** Version of `filePath`, or `null` when it does not exist. */
const getFileVersion = async (
  filePath: string | undefined
): Promise<FileVersion | null> => {
  if (!filePath) return null;

  try {
    const { mtimeMs, size } = await stat(filePath);

    return { modifiedTime: mtimeMs, size };
  } catch {
    return null;
  }
};

const isSameVersion = (
  first: FileVersion | null,
  second: FileVersion | null
): boolean =>
  first?.modifiedTime === second?.modifiedTime && first?.size === second?.size;

/**
 * Project configuration, re-evaluated when the configuration file changes or
 * another environment is selected — evaluating it compiles the file.
 *
 * Also invalidated by `clearIntlayerConfigCache` (config, `.env` or package.json
 * change seen by the workspace watchers). The version check covers the config
 * file itself for changes the watchers miss (file outside the workspace).
 * Concurrent callers share one evaluation.
 *
 * Loaded as background work: its logger only notifies warnings and errors.
 */
export const getCachedConfig = async (
  projectDir: string
): Promise<IntlayerConfig> => {
  const cacheKey = `${projectDir}:${getSelectedEnvironment(projectDir) ?? ''}`;
  const cached = configurationCache.get(cacheKey);

  if (cached) {
    const currentVersion = await getFileVersion(cached.configurationFilePath);

    if (isSameVersion(currentVersion, cached.version)) {
      return cached.configuration;
    }

    // `getConfiguration` memoizes by options: without this it would return
    // the configuration evaluated before the change.
    clearAllCache();
  }

  const { configurationFilePath } = searchConfigurationFile(projectDir);
  const version = await getFileVersion(configurationFilePath);
  const configuration = getConfigurationOptions(projectDir, {
    isBackground: true,
  }).then(getConfiguration);

  configurationCache.set(cacheKey, {
    configurationFilePath,
    version,
    configuration,
  });

  // A failed evaluation (syntax error being typed) is retried on next access
  configuration.catch(() => {
    if (configurationCache.get(cacheKey)?.configuration === configuration) {
      configurationCache.delete(cacheKey);
    }
  });

  return configuration;
};

/**
 * Drop every loaded configuration, including the memoized evaluations of
 * `@intlayer/config`, so the next access re-reads the configuration.
 */
export const clearIntlayerConfigCache = (): void => {
  configurationCache.clear();
  clearAllCache();
};

/** Whether `filePath` is a content declaration file of the project. */
export const isContentDeclarationFile = (
  filePath: string,
  configuration: IntlayerConfig
): boolean =>
  (configuration.content?.fileExtensions ?? FILE_EXTENSIONS).some((extension) =>
    filePath.endsWith(extension)
  );

/**
 * Built dictionary JSON file, re-read only when it changes on disk (checked on
 * every access, so rebuilds from the CLI or a dev server are picked up).
 * Returns `null` when the file is missing (not built yet) or malformed.
 */
export const getCachedDictionary = async (
  filePath: string
): Promise<Dictionary[] | null> => {
  try {
    const version = await getFileVersion(filePath);

    if (!version) {
      dictionaryCache.delete(filePath);
      return null;
    }

    const cached = dictionaryCache.get(filePath);

    if (cached && isSameVersion(cached.version, version)) {
      return cached.dictionaries;
    }

    const dictionaries = JSON.parse(
      await readFile(filePath, 'utf8')
    ) as Dictionary[];

    dictionaryCache.set(filePath, { version, dictionaries });

    return dictionaries;
  } catch (error) {
    // Read while being rewritten, or malformed: retried on next access
    dictionaryCache.delete(filePath);
    console.warn(`Failed to load dictionary: ${filePath}`, error);

    return null;
  }
};

/** The built unmerged dictionaries of `dictionaryKey` (one per declaration). */
export const getCachedUnmergedDictionaries = (
  configuration: IntlayerConfig,
  dictionaryKey: string
): Promise<Dictionary[] | null> =>
  getCachedDictionary(
    join(configuration.system.unmergedDictionariesDir, `${dictionaryKey}.json`)
  );
