/**
 * Returns the remote dictionaries pulled from the Intlayer CMS.
 *
 * `@intlayer/dictionaries-entry/remote` is meant to be aliased by the bundler
 * configuration to the generated `.intlayer/main/remote_dictionaries` entry.
 * Outside a bundler (Node) this stub reads the entry itself.
 */

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { DictionaryAPI } from '@intlayer/backend';
import { build, system } from '@intlayer/config/built';
import { clearModuleCache, configESMxCJSRequire } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { DictionaryKey } from '@intlayer/types/dictionary';

export type RemoteDictionaries = Record<DictionaryKey, DictionaryAPI[]>;

type GetRemoteDictionaries = (
  configuration?: Pick<IntlayerConfig, 'system' | 'build'>
) => RemoteDictionaries;

export const getRemoteDictionaries: GetRemoteDictionaries = (
  configuration: Pick<IntlayerConfig, 'system' | 'build'> = { system, build }
) => {
  const { system, build } = configuration;

  // Always use cjs for dictionaries entry as it uses require
  const dictionariesPath = join(system.mainDir, `remote_dictionaries.cjs`);
  let dictionaries: RemoteDictionaries = {};

  if (existsSync(dictionariesPath)) {
    // Clear cache for remote_dictionaries.cjs and all its dependencies (JSON files)
    clearModuleCache(dictionariesPath);
    dictionaries = (build.require ?? configESMxCJSRequire)(dictionariesPath);
  }

  return dictionaries;
};
