import type { CallerDescriptor } from '../types';

/**
 * react-intl (FormatJS) — `@intlayer/react-intl` compat adapter.
 *
 * The full dotted message id encodes both the dictionary key and the field
 * path: `formatMessage({ id: 'home.title' })` → dictionary `home`, field
 * `title`.
 *
 * Mirrors `compat/react-intl/src/plugin/index.ts`.
 */
export const REACT_INTL_CALLERS: CallerDescriptor[] = [
  {
    callerName: 'formatMessage',
    library: 'react-intl',
    importSources: ['react-intl', '@intlayer/react-intl'],
    // Matches both `intl.formatMessage(...)` and the destructured
    // `const { formatMessage } = useIntl()` identifier form.
    matchAsMethod: true,
    namespaceSources: [{ from: 'path-first-segment' }],
    translationFunction: 'self',
  },
  {
    callerName: 'FormattedMessage',
    library: 'react-intl',
    importSources: ['react-intl', '@intlayer/react-intl'],
    jsxIdAttribute: 'id',
    namespaceSources: [{ from: 'path-first-segment' }],
    translationFunction: 'self',
  },
];
