/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import { existsSync } from 'fs';
import { join } from 'path';
import { getConfiguration, ESMxCJSRequire } from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';

let dictionaries = undefined;

const { content } = getConfiguration();
const dictionariesPath = join(content.mainDir, 'dictionaries.cjs');

// Test if the dictionaries file exists
if (existsSync(dictionariesPath)) {
  ESMxCJSRequire(dictionariesPath);
  dictionaries = ESMxCJSRequire(dictionariesPath);
}

export default (dictionaries ?? {}) as Record<Dictionary['id'], Dictionary>;
