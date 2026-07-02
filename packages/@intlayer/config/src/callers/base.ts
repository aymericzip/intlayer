import type { CallerDescriptor } from './types';

/**
 * Base intlayer getters — always active, independent of any compat library.
 *
 * Their result is the dictionary content object itself: fields are consumed
 * through member access (`content.title`) or destructuring
 * (`const { title } = useIntlayer('home')`).
 */
export const BASE_CALLERS: CallerDescriptor[] = [
  {
    callerName: 'useIntlayer',
    library: 'intlayer',
    importSources: [
      'intlayer',
      'react-intlayer',
      'next-intlayer',
      'vue-intlayer',
      'svelte-intlayer',
      'solid-intlayer',
      'preact-intlayer',
      'angular-intlayer',
    ],
    namespaceSources: [{ from: 'argument', index: 0 }],
    translationFunction: 'content',
  },
  {
    callerName: 'getIntlayer',
    library: 'intlayer',
    importSources: ['intlayer', '@intlayer/core'],
    namespaceSources: [{ from: 'argument', index: 0 }],
    translationFunction: 'content',
  },
];
