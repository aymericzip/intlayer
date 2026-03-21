/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry file.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { runInThisContext } from 'node:vm';
import config from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { DictionaryRegistry } from '@intlayer/types/module_augmentation';

type GetDictionaries = (configuration?: IntlayerConfig) => DictionaryRegistry;

export const getDictionaries: GetDictionaries = (
  configuration: IntlayerConfig = config
) => {
  const { system } = configuration;

  const dictionariesPath = join(system.mainDir, `dictionaries.cjs`);

  let dictionaries = {};
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

  return (dictionaries ?? {}) as DictionaryRegistry;
};
