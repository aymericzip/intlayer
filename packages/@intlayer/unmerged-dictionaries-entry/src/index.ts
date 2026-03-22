/**
 * @intlayer/unmerged-dictionaries-entry is a package that only returns the unmerged dictionary entry file.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import config from '@intlayer/config/built';
import { clearModuleCache, configESMxCJSRequire } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { DictionaryKeys } from '@intlayer/types/module_augmentation';

export type UnmergedDictionaries = Record<DictionaryKeys, Dictionary[]>;

type GetUnmergedDictionaries = (
  configuration?: IntlayerConfig
) => UnmergedDictionaries;

export const getUnmergedDictionaries: GetUnmergedDictionaries = (
  configuration: IntlayerConfig = config
) => {
  const { system } = configuration;
  const { unmergedDictionariesDir } = system;

  const dictionaries: Record<string, any> = {};

  if (existsSync(unmergedDictionariesDir)) {
    // Read JSON files directly to avoid require.cache memory leak
    const files = readdirSync(unmergedDictionariesDir).filter((file) =>
      file.endsWith('.json')
    );

    for (const file of files) {
      const key = basename(file, extname(file));
      const content = readFileSync(
        join(unmergedDictionariesDir, file),
        'utf-8'
      );
      dictionaries[key] = JSON.parse(content);
    }
  }

  return dictionaries as UnmergedDictionaries;
};
