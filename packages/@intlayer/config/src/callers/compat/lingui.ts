import type { CallerDescriptor } from '../types';

/**
 * Lingui — `@intlayer/lingui` compat adapter.
 *
 * Lingui is a single-catalog library: the namespace lives *inside* the message
 * id rather than in the file layout, so `i18n._('footer.github')` names both
 * the group (`footer`) and the field (`github`).
 *
 * The adapter therefore addresses lingui catalogs by the id's first dot-segment,
 * which lets a catalog split with `syncJSON({ splitKeys: 'key-prefix' })` resolve
 * one small dictionary per call site instead of the whole catalog. None of these
 * callers carries a namespace argument, so the optimize passes leave them to the
 * runtime resolver and only the usage analysis reads the ids.
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
    // `const { i18n, t, _ } = useLingui()` takes no namespace argument, so the
    // dictionary is only knowable from the ids passed to the returned
    // functions — which the usage analysis reads and the optimize passes do not.
    namespaceSources: [],
    allowRootScope: true,
    translationFunction: 'destructured-t',
  },
  {
    callerName: '_',
    library: 'lingui',
    importSources: LINGUI_IMPORT_SOURCES,
    requiresImport: true,
    // `i18n._('id')` and the destructured `const { _ } = useLingui()` form.
    matchAsMethod: true,
    namespaceSources: [{ from: 'path-first-segment' }],
    translationFunction: 'self',
  },
  {
    callerName: 't',
    library: 'lingui',
    importSources: LINGUI_IMPORT_SOURCES,
    requiresImport: true,
    // `i18n.t('id')`, `t({ id: 'id' })` and the macro tagged template ``t`…` ``.
    matchAsMethod: true,
    matchAsTaggedTemplate: true,
    namespaceSources: [{ from: 'path-first-segment' }],
    translationFunction: 'self',
  },
  {
    callerName: 'Trans',
    library: 'lingui',
    importSources: LINGUI_IMPORT_SOURCES,
    requiresImport: true,
    // <Trans id="home.title" message="Welcome" />
    jsxIdAttribute: 'id',
    namespaceSources: [{ from: 'path-first-segment' }],
    translationFunction: 'self',
  },
];
