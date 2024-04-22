/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import { existsSync } from 'fs';
import { createRequire } from 'module';
import { join } from 'path';
import { getConfiguration } from '@intlayer/config';

const isESModule = typeof import.meta.url === 'string';
let dictionaries = undefined;

const requireFunction = isESModule ? createRequire(import.meta.url) : require;

const { content } = getConfiguration();
const dictionariesPath = join(content.mainDir, 'dictionaries.cjs');

// Test if the dictionaries file exists
if (existsSync(dictionariesPath)) {
  requireFunction(dictionariesPath);
  dictionaries = requireFunction(dictionariesPath);
}

export default dictionaries ?? {};
