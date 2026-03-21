/**
 * @intlayer/unmerged-dictionaries-entry is a package that only returns the unmerged dictionary entry file.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { runInThisContext } from 'node:vm';
import config from '@intlayer/config/built';
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

  const dictionariesPath = join(system.mainDir, `unmerged_dictionaries.cjs`);
  let dictionaries: Record<DictionaryKeys, Dictionary[]> = {};

  if (existsSync(dictionariesPath)) {
    // Execute directly instead of require() to avoid require.cache memory leak
    const code = readFileSync(dictionariesPath, 'utf-8');
    const moduleObj = { exports: {} as any };
    const wrappedFn = runInThisContext(
      `(function(exports, require, module, __filename, __dirname) {\n${code}\n})`,
      { filename: dictionariesPath }
    );
    wrappedFn(moduleObj.exports, require, moduleObj, dictionariesPath, dirname(dictionariesPath));
    dictionaries = moduleObj.exports;
  }

  return dictionaries;
};
