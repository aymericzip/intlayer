import { constants, promises as fs } from 'node:fs';
import {
  getConfiguration,
  searchConfigurationFile,
} from '@intlayer/config/node';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import { getConfigurationOptions } from './getConfiguration';

// GLOBAL CACHES
let configCache: {
  path: string;
  data: IntlayerConfig;
  mtime: number;
} | null = null;
const dictionaryCache = new Map<
  string,
  { mtime: number; data: Dictionary[] }
>();

/**
 * Loads configuration with caching.
 * Prevents re-parsing the config file on every mouse move.
 */
export const getCachedConfig = async (
  projectDir: string
): Promise<IntlayerConfig> => {
  let mtime = 0;

  try {
    const searchResult = searchConfigurationFile(projectDir);
    if (searchResult?.configurationFilePath) {
      await fs.access(searchResult.configurationFilePath, constants.F_OK);
      const stats = await fs.stat(searchResult.configurationFilePath);
      mtime = stats.mtimeMs;
    }
  } catch {
    // If file doesn't exist or stat fails, ignore and proceed
  }

  // Return cached config if it exists and hasn't changed
  if (
    configCache &&
    configCache.path === projectDir &&
    configCache.mtime === mtime
  ) {
    return configCache.data;
  }

  // Load fresh config
  const configOptions = await getConfigurationOptions(projectDir);
  const config = getConfiguration(configOptions);

  configCache = {
    path: projectDir,
    data: config,
    mtime,
  };

  return config;
};

export const clearIntlayerConfigCache = (): void => {
  configCache = null;
};

/**
 * Loads a dictionary file with caching and async I/O.
 * Shared between Hover and Definition providers.
 */
export const getCachedDictionary = async (
  filePath: string
): Promise<Dictionary[] | null> => {
  try {
    // Check if file exists (fast)
    await fs.access(filePath, constants.F_OK);

    // Check file stats
    const stats = await fs.stat(filePath);
    const cached = dictionaryCache.get(filePath);

    // Return cache if file hasn't changed
    if (cached && cached.mtime === stats.mtimeMs) {
      return cached.data;
    }

    // Read file (Async)
    const content = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(content) as Dictionary[];

    // Update Cache
    dictionaryCache.set(filePath, {
      mtime: stats.mtimeMs,
      data,
    });

    return data;
  } catch (error) {
    // ENOENT just means the dictionary hasn't been built yet — expected and silent.
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.warn(`Failed to load dictionary: ${filePath}`, error);
    }
    return null;
  }
};
