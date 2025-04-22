/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry file.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import { ESMxCJSRequire, getConfiguration } from '@intlayer/config';
import { existsSync } from 'fs';
import { join } from 'path';
// @ts-ignore intlayer declared for module augmentation
import type { IntlayerDictionaryTypesConnector } from 'intlayer';

let dictionaries = undefined;

const { content } = getConfiguration();
const dictionariesPath = join(content.mainDir, 'dictionaries.cjs');

// Test if the dictionaries file exists
if (existsSync(dictionariesPath)) {
  dictionaries = ESMxCJSRequire(dictionariesPath);
}

export default (dictionaries ?? {}) as Record<
  IntlayerDictionaryTypesConnector['key'],
  IntlayerDictionaryTypesConnector
>;
