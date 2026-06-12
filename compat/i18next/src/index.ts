import type {
  changeLanguage as _changeLanguage,
  dir as _dir,
  exists as _exists,
  hasLoadedNamespace as _hasLoadedNamespace,
  init as _init,
  loadLanguages as _loadLanguages,
  loadNamespaces as _loadNamespaces,
  loadResources as _loadResources,
  reloadResources as _reloadResources,
  setDefaultNamespace as _setDefaultNamespace,
  t as _t,
  use as _use,
  i18n,
} from 'i18next';
import { createInstance, type TypedGetFixedT } from './createInstance';

export {
  getInterpolationValues,
  type ResolveTranslationParams,
  resolveTranslation,
} from './resolveTranslation';

const i18next: i18n = createInstance();

export { createInstance };
export default i18next;
export { i18next };

export const dir: typeof _dir = i18next.dir.bind(i18next);
export const init: typeof _init = i18next.init.bind(i18next);
export const loadResources: typeof _loadResources =
  i18next.loadResources.bind(i18next);
export const reloadResources: typeof _reloadResources =
  i18next.reloadResources.bind(i18next);
export const use: typeof _use = i18next.use.bind(i18next);
export const changeLanguage: typeof _changeLanguage =
  i18next.changeLanguage.bind(i18next);

/**
 * Returns a `t()` function bound to a fixed locale and namespace.
 * When `ns` matches a registered intlayer dictionary key, the returned
 * function's `key` parameter is typed to only accept valid dot-notation
 * paths for that dictionary.
 *
 * @example
 * ```ts
 * const tAbout = getFixedT(null, 'about');
 * tAbout('counter.label'); // ✓ typed
 * ```
 */
export const getFixedT: TypedGetFixedT = i18next.getFixedT.bind(
  i18next
) as TypedGetFixedT;

export const t: typeof _t = i18next.t.bind(i18next);
export const exists: typeof _exists = i18next.exists.bind(i18next);
export const setDefaultNamespace: typeof _setDefaultNamespace =
  i18next.setDefaultNamespace.bind(i18next);
export const hasLoadedNamespace: typeof _hasLoadedNamespace =
  i18next.hasLoadedNamespace.bind(i18next);
export const loadNamespaces: typeof _loadNamespaces =
  i18next.loadNamespaces.bind(i18next);
export const loadLanguages: typeof _loadLanguages =
  i18next.loadLanguages.bind(i18next);

/**
 * No-op shim for i18next's `keyFromSelector`. This helper is not exposed by
 * every supported i18next version, so a permissive identity function is
 * provided to keep `.keyFromSelector(...)` call-sites working.
 */
export const keyFromSelector = (selector: unknown): unknown => selector;

export type { InitOptions, i18n, TFunction, TOptions } from 'i18next';
export { initReactI18next } from 'react-i18next';
