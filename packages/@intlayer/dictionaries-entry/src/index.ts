/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry file.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import config from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { DictionaryRegistry } from '@intlayer/types/module_augmentation';

type GetDictionaries = (configuration?: IntlayerConfig) => DictionaryRegistry;

export const getDictionaries: GetDictionaries = (
  configuration: IntlayerConfig = config
) => {
  const { system } = configuration;
  const { dictionariesDir } = system;

  const dictionaries: Record<string, any> = {};

  if (existsSync(dictionariesDir)) {
    // Read JSON files directly to avoid require.cache memory leak
    const files = readdirSync(dictionariesDir).filter((file) =>
      file.endsWith('.json')
    );

    for (const file of files) {
      const key = basename(file, extname(file));
      const content = readFileSync(join(dictionariesDir, file), 'utf-8');
      dictionaries[key] = JSON.parse(content);
    }
  }

  return dictionaries as DictionaryRegistry;
};
