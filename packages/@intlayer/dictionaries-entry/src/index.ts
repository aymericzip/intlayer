/**
 * @intlayer/dictionaries-entry is a package that only returns the dictionary entry path.
 * Using an external package allow to alias it in the bundle configuration (such as webpack).
 * The alias allow hot reload the app (such as nextjs) on any dictionary change.
 */

import { join } from 'path';
import { getConfiguration } from '@intlayer/config';

const { mainDir } = getConfiguration();
const dictionariesPath = join(mainDir, 'dictionaries.cjs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dictionaries = import(dictionariesPath);

export default dictionaries;
