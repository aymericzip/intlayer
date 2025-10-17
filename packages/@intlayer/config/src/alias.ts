import { join, relative } from 'node:path';
import type { IntlayerConfig } from '@intlayer/types';
import { getExtension } from './utils/getExtension';
import { normalizePath } from './utils/normalizePath';

export type GetAliasOptions = {
  configuration: IntlayerConfig;
  format?: 'esm' | 'cjs';
  formatter?: (value: string) => string;
};

export const getAlias = ({
  configuration,
  format = 'esm',
  formatter = (value: string) => value,
}: GetAliasOptions) => {
  const extension = getExtension(configuration, format);

  const { mainDir, configDir, baseDir } = configuration.content;

  /**
   * Dictionaries
   */
  const dictionariesPath = join(mainDir, `dictionaries.${extension}`);
  const relativeDictionariesPath = relative(baseDir, dictionariesPath);
  const fixedDictionariesPath = formatter(
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
  const fixedUnmergedDictionariesPath = formatter(
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
  const fixedRemoteDictionariesPath = formatter(
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
  const fixedDynamicDictionariesPath = formatter(
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
  const fixedFetchDictionariesPath = formatter(
    normalizePath(relativeFetchDictionariesPath)
  );

  /**
   * Configuration
   */
  const configurationPath = join(configDir, `configuration.json`);
  const relativeConfigurationPath = relative(baseDir, configurationPath);
  const fixedConfigurationPath = formatter(
    normalizePath(relativeConfigurationPath)
  );

  return {
    '@intlayer/dictionaries-entry': fixedDictionariesPath,
    '@intlayer/unmerged-dictionaries-entry': fixedUnmergedDictionariesPath,
    '@intlayer/remote-dictionaries-entry': fixedRemoteDictionariesPath,
    '@intlayer/dynamic-dictionaries-entry': fixedDynamicDictionariesPath,
    '@intlayer/fetch-dictionaries-entry': fixedFetchDictionariesPath,
    '@intlayer/config/built': fixedConfigurationPath,
  };
};
