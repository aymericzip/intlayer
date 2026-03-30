/**
 * @intlayer/fetch-dictionaries-entry is a package that only returns the fetch dictionary entry file.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import { default as builtConfiguration } from '@intlayer/config/built';

import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  StrictModeLocaleMap,
} from '@intlayer/types/module_augmentation';

export type FetchDictionaries = Record<
  DictionaryKeys,
  StrictModeLocaleMap<Dictionary>
>;

type GetFetchDictionaries = (
  configuration?: IntlayerConfig
) => FetchDictionaries;

export const getDynamicDictionaries: GetFetchDictionaries = (
  configuration: IntlayerConfig = builtConfiguration
) => {
  const { system } = configuration;
  const { fetchDictionariesDir } = system;

  const dictionaries: Record<string, any> = {};

  if (existsSync(fetchDictionariesDir)) {
    // Read JSON files directly to avoid require.cache memory leak
    const files = readdirSync(fetchDictionariesDir).filter((file) =>
      file.endsWith('.json')
    );

    for (const file of files) {
      const key = basename(file, extname(file));
      const content = readFileSync(join(fetchDictionariesDir, file), 'utf-8');
      dictionaries[key] = JSON.parse(content);
    }
  }

  return dictionaries as FetchDictionaries;
};
