import { BASE_CALLERS } from './base';
import { I18NEXT_CALLERS } from './compat/i18next';
import { LINGUI_CALLERS } from './compat/lingui';
import { NEXT_INTL_CALLERS } from './compat/nextIntl';
import { REACT_I18NEXT_CALLERS } from './compat/reactI18next';
import { REACT_INTL_CALLERS } from './compat/reactIntl';
import { USE_INTL_CALLERS } from './compat/useIntl';
import { VUE_I18N_CALLERS } from './compat/vueI18n';
import type { CallerDescriptor } from './types';

export { BASE_CALLERS } from './base';
export { I18NEXT_CALLERS } from './compat/i18next';
export { LINGUI_CALLERS } from './compat/lingui';
export { NEXT_INTL_CALLERS } from './compat/nextIntl';
export { REACT_I18NEXT_CALLERS } from './compat/reactI18next';
export { REACT_INTL_CALLERS } from './compat/reactIntl';
export { USE_INTL_CALLERS } from './compat/useIntl';
export { VUE_I18N_CALLERS } from './compat/vueI18n';
export {
  getRewritableCallers,
  type SwcExtraCallerConfig,
  toSwcExtraCallers,
} from './transform';
export type {
  CallerDescriptor,
  CallerResultShape,
  CallerValueSource,
} from './types';

/**
 * Compat-adapter callers, grouped in one list. Each compat package's bundler
 * plugin injects its own slice (e.g. `REACT_I18NEXT_CALLERS`) into the build
 * pipeline; this aggregate exists for consumers that need every syntax at
 * once, such as the LSP.
 */
export const COMPAT_CALLERS: CallerDescriptor[] = [
  ...I18NEXT_CALLERS,
  ...REACT_I18NEXT_CALLERS,
  ...NEXT_INTL_CALLERS,
  ...USE_INTL_CALLERS,
  ...REACT_INTL_CALLERS,
  ...LINGUI_CALLERS,
  ...VUE_I18N_CALLERS,
];

/** Base + compat callers — the full registry the matchers run against. */
export const ALL_CALLERS: CallerDescriptor[] = [
  ...BASE_CALLERS,
  ...COMPAT_CALLERS,
];

/**
 * Descriptors indexed by caller name. A name can map to several descriptors
 * (e.g. `Trans` exists in both react-i18next and lingui with different
 * attributes); matchers try them in registry order.
 */
export const CALLERS_BY_NAME: Map<string, CallerDescriptor[]> = (() => {
  const byName = new Map<string, CallerDescriptor[]>();

  for (const descriptor of ALL_CALLERS) {
    const existing = byName.get(descriptor.callerName);

    if (existing) {
      existing.push(descriptor);
    } else {
      byName.set(descriptor.callerName, [descriptor]);
    }
  }

  return byName;
})();

/**
 * Caller names whose dictionary key can appear as a positional string literal
 * argument (`caller('key', …)` / `caller(locale, 'key', …)`). Used to build
 * text-search regexes over project source files (find-references) and the
 * completion trigger pattern. Callers whose key never appears positionally
 * (fixed namespace, options object, JSX-only) are excluded on purpose.
 */
export const getPositionalKeyCallerNames = (): string[] => {
  const names = new Set<string>();

  for (const descriptor of ALL_CALLERS) {
    const hasPositionalNamespace = descriptor.namespaceSources.some(
      (source) => source.from === 'argument'
    );

    if (hasPositionalNamespace) names.add(descriptor.callerName);
  }

  return [...names];
};

/**
 * Returns `true` when the descriptor may participate in matching for a file
 * importing from `importSources`. Descriptors flagged `requiresImport` only
 * activate when the file imports from one of their declared modules;
 * everything else is always active (results are still validated against the
 * project's dictionaries downstream).
 *
 * @param descriptor - The caller descriptor to gate.
 * @param fileImportSources - Module specifiers imported by the analysed file.
 */
export const isCallerActive = (
  descriptor: CallerDescriptor,
  fileImportSources: ReadonlySet<string>
): boolean => {
  if (!descriptor.requiresImport) return true;

  return descriptor.importSources.some((source) =>
    fileImportSources.has(source)
  );
};
