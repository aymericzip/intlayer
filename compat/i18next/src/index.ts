import type {
  changeLanguage as _changeLanguage,
  dir as _dir,
  exists as _exists,
  hasLoadedNamespace as _hasLoadedNamespace,
  init as _init,
  keyFromSelector as _keyFromSelector,
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

const i18next: i18n = createInstance();

export { createInstance };
export default i18next;
export { i18next };

export const dir = i18next.dir.bind(i18next) as unknown as typeof _dir;
export const init = i18next.init.bind(i18next) as unknown as typeof _init;
export const loadResources = i18next.loadResources.bind(
  i18next
) as unknown as typeof _loadResources;
export const reloadResources = i18next.reloadResources.bind(
  i18next
) as unknown as typeof _reloadResources;
export const use = i18next.use.bind(i18next) as unknown as typeof _use;
export const changeLanguage = i18next.changeLanguage.bind(
  i18next
) as unknown as typeof _changeLanguage;
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
) as unknown as TypedGetFixedT;
export const t = i18next.t.bind(i18next) as unknown as typeof _t;
export const exists = i18next.exists.bind(i18next) as unknown as typeof _exists;
export const setDefaultNamespace = i18next.setDefaultNamespace.bind(
  i18next
) as unknown as typeof _setDefaultNamespace;
export const hasLoadedNamespace = i18next.hasLoadedNamespace.bind(
  i18next
) as unknown as typeof _hasLoadedNamespace;
export const loadNamespaces = i18next.loadNamespaces.bind(
  i18next
) as unknown as typeof _loadNamespaces;
export const loadLanguages = i18next.loadLanguages.bind(
  i18next
) as unknown as typeof _loadLanguages;

export const keyFromSelector = ((selector: any) =>
  selector) as unknown as typeof _keyFromSelector;

export type { InitOptions, i18n, TFunction, TOptions } from 'i18next';
export { initReactI18next } from 'react-i18next';
