import type { CallerDescriptor } from '../types';

/**
 * Lingui — `@intlayer/lingui` compat adapter.
 *
 * Lingui is a single-catalog library: every message lives in the `messages`
 * dictionary and catalog keys are flat (a dotted id such as
 * `results-table.bundleSize` is one literal key, not a nested path).
 *
 * `t` and `_` are generic names, so all lingui callers require an import from
 * a lingui module to participate in matching — this avoids false positives on
 * unrelated `t()` helpers.
 *
 * Mirrors `compat/lingui/src/plugin/index.ts`.
 */
const LINGUI_IMPORT_SOURCES = [
  '@lingui/core',
  '@lingui/react',
  '@lingui/macro',
  '@lingui/core/macro',
  '@lingui/react/macro',
  '@intlayer/lingui',
];

export const LINGUI_CALLERS: CallerDescriptor[] = [
  {
    callerName: 'useLingui',
    library: 'lingui',
    importSources: LINGUI_IMPORT_SOURCES,
    // `const { i18n, t, _ } = useLingui()` — single-catalog hook, no
    // namespace argument: every call reads the `messages` dictionary.
    namespaceSources: [{ from: 'fixed', value: 'messages' }],
    translationFunction: 'destructured-t',
    staticReplacement: 'useDictionary',
    dynamicReplacement: 'useDictionaryDynamic',
  },
  {
    callerName: '_',
    library: 'lingui',
    importSources: LINGUI_IMPORT_SOURCES,
    requiresImport: true,
    // `i18n._('id')` and the destructured `const { _ } = useLingui()` form.
    matchAsMethod: true,
    namespaceSources: [{ from: 'fixed', value: 'messages' }],
    translationFunction: 'self',
    flatKey: true,
  },
  {
    callerName: 't',
    library: 'lingui',
    importSources: LINGUI_IMPORT_SOURCES,
    requiresImport: true,
    // `i18n.t('id')`, `t({ id: 'id' })` and the macro tagged template ``t`…` ``.
    matchAsMethod: true,
    matchAsTaggedTemplate: true,
    namespaceSources: [{ from: 'fixed', value: 'messages' }],
    translationFunction: 'self',
    flatKey: true,
  },
  {
    callerName: 'Trans',
    library: 'lingui',
    importSources: LINGUI_IMPORT_SOURCES,
    requiresImport: true,
    // <Trans id="home.title" message="Welcome" />
    jsxIdAttribute: 'id',
    namespaceSources: [{ from: 'fixed', value: 'messages' }],
    translationFunction: 'self',
    flatKey: true,
  },
];
