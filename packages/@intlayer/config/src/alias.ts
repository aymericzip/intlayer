import { join, relative } from 'path';
import { getConfiguration } from './configFile/getConfiguration';
import { IntlayerConfig } from './types/config';
import { getExtension } from './utils/getExtension';
import { normalizePath } from './utils/normalizePath';

export type GetAliasOptions = {
  configuration?: IntlayerConfig;
  format?: 'esm' | 'cjs';
  formatter?: (value: string) => string;
};

export const getAlias = ({
  configuration = getConfiguration(),
  format,
  formatter = (value: string) => value,
}: GetAliasOptions = {}) => {
  const extension = getExtension(configuration, format);

  const { mainDir, configDir, baseDir } = configuration.content;

  /**
   * Dictionaries
   */
  const dictionariesPath = join(mainDir, `dictionaries.${extension}`);
  const relativeDictionariesPath = relative(baseDir, dictionariesPath);
  const normalizedDictionariesPath = formatter(
    normalizePath(relativeDictionariesPath)
  );

  /**
   * Unmerged dictionaries
   */
  const unmergedDictionariesPath = join(
    mainDir,
    `unmerged_dictionaries.${extension}`
  );
  const relativeUnmergedDictionariesPath = relative(
    baseDir,
    unmergedDictionariesPath
  );
  const normalizedUnmergedDictionariesPath = formatter(
    normalizePath(relativeUnmergedDictionariesPath)
  );

  /**
   * Remote dictionaries
   */
  const remoteDictionariesPath = join(
    mainDir,
    `remote_dictionaries.${extension}`
  );
  const relativeRemoteDictionariesPath = relative(
    baseDir,
    remoteDictionariesPath
  );
  const normalizedRemoteDictionariesPath = formatter(
    normalizePath(relativeRemoteDictionariesPath)
  );

  /**
   * Dynamic dictionaries
   */
  const dynamicDictionariesPath = join(
    mainDir,
    `dynamic_dictionaries.${extension}`
  );
  const relativeDynamicDictionariesPath = relative(
    baseDir,
    dynamicDictionariesPath
  );
  const normalizedDynamicDictionariesPath = formatter(
    normalizePath(relativeDynamicDictionariesPath)
  );

  /**
   * Fetch dictionaries
   */
  const fetchDictionariesPath = join(
    mainDir,
    `fetch_dictionaries.${extension}`
  );
  const relativeFetchDictionariesPath = relative(
    baseDir,
    fetchDictionariesPath
  );
  const normalizedFetchDictionariesPath = formatter(
    normalizePath(relativeFetchDictionariesPath)
  );

  /**
   * Configuration
   */
  const configurationPath = join(configDir, `configuration.json`);
  const relativeConfigurationPath = relative(baseDir, configurationPath);
  const normalizedConfigurationPath = formatter(
    normalizePath(relativeConfigurationPath)
  );

  return {
    '@intlayer/dictionaries-entry': normalizedDictionariesPath,
    '@intlayer/unmerged-dictionaries-entry': normalizedUnmergedDictionariesPath,
    '@intlayer/remote-dictionaries-entry': normalizedRemoteDictionariesPath,
    '@intlayer/dynamic-dictionaries-entry': normalizedDynamicDictionariesPath,
    '@intlayer/fetch-dictionaries-entry': normalizedFetchDictionariesPath,
    '@intlayer/config/built': normalizedConfigurationPath,
  };
};
