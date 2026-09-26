import type { CallerDescriptor } from '../types';

/**
 * @ngx-translate/core — `@intlayer/ngx-translate` compat adapter.
 *
 * Mirrors `compat-comming/ngx-translate/src/plugin/index.ts`.
 */
export const NGX_TRANSLATE_CALLERS: CallerDescriptor[] = [
  {
    callerName: 'translate',
    library: '@ngx-translate/core',
    importSources: ['@ngx-translate/core', '@intlayer/ngx-translate'],
    namespaceSources: [{ from: 'argument', index: 0 }],
    translationFunction: 'self',
    allowRootScope: true,
    staticReplacement: 'useDictionary',
    dynamicReplacement: 'useDictionaryDynamic',
  },
];
