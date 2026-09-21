import { AsyncLocalStorage } from 'node:async_hooks';
import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import type { IntlayerLocals } from './middleware';

/**
 * `Astro.locals` of the request being rendered, made available to every
 * function running inside the middleware scope — page and component
 * frontmatter, endpoints, nested middleware — without passing `Astro` around.
 */
export const requestStorage = new AsyncLocalStorage<{
  intlayer?: IntlayerLocals;
}>();

/**
 * Returns the Intlayer locals of the request being rendered, if any.
 */
export const getIntlayerLocals = (): IntlayerLocals | undefined =>
  requestStorage.getStore()?.intlayer;

/**
 * Returns the locale of the request being rendered, if any.
 */
export const getRequestLocale = (): DeclaredLocales | undefined =>
  getIntlayerLocals()?.locale;
