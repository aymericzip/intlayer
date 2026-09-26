import type { CallerDescriptor } from '../types';

/**
 * svelte-i18n — `@intlayer/svelte-i18n` compat adapter.
 *
 * svelte-i18n is a single-catalog library: `$_('home.title')` names both the
 * dictionary (`home`) and the field (`title`), so every caller reads its
 * dictionary from the id's first dot-segment.
 *
 * `_` / `t` / `format` are Svelte *stores* consumed through auto-subscription
 * (`$_(…)`), never called directly. None of them carries a build-time
 * replacement: re-pointing the store import at a dictionary-accepting helper
 * would break every `$_` subscription in the file. Call sites keep resolving
 * through the runtime dictionary registry.
 *
 * `_` and `t` are generic names, so matching requires an import from a
 * svelte-i18n module.
 *
 * Mirrors `compat-comming/svelte-i18n/src/plugin/index.ts`.
 */
const SVELTE_I18N_IMPORT_SOURCES = ['svelte-i18n', '@intlayer/svelte-i18n'];

const createMessageStoreCaller = (callerName: string): CallerDescriptor => ({
  callerName,
  library: 'svelte-i18n',
  importSources: SVELTE_I18N_IMPORT_SOURCES,
  requiresImport: true,
  // `$_('home.title')` / `$_({ id: 'home.title' })`
  namespaceSources: [{ from: 'path-first-segment' }],
  translationFunction: 'self',
});

export const SVELTE_I18N_CALLERS: CallerDescriptor[] = [
  createMessageStoreCaller('_'),
  createMessageStoreCaller('t'),
  createMessageStoreCaller('format'),
  // `$json('home.nav')` returns a whole subtree: every field may be read.
  {
    ...createMessageStoreCaller('json'),
    translationFunction: 'all',
  },
];
