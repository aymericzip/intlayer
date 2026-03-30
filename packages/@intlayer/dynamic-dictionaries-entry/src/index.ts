/**
 * @intlayer/dynamic-dictionaries-entry is a package that only returns the dynamic dictionary entry file.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { default as defaultConfiguration } from '@intlayer/config/built';
import { configESMxCJSRequire } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { DictionaryKeys } from '@intlayer/types/module_augmentation';

export type UnmergedDictionaries = Record<DictionaryKeys, Dictionary[]>;

type GetUnmergedDictionaries = (
  configuration?: IntlayerConfig
) => UnmergedDictionaries;

export const getUnmergedDictionaries: GetUnmergedDictionaries = (
  configuration: IntlayerConfig = defaultConfiguration
) => {
  const { system, build } = configuration;

  // Always use cjs for dictionaries entry as it uses require
  const dictionariesPath = join(system.mainDir, `unmerged_dictionaries.cjs`);
  let dictionaries: Record<DictionaryKeys, Dictionary[]> = {};

  if (existsSync(dictionariesPath)) {
    dictionaries = (build.require ?? configESMxCJSRequire)(dictionariesPath);
  }

  return dictionaries;
};
