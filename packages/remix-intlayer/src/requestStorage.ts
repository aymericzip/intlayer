import { AsyncLocalStorage } from 'node:async_hooks';
import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import type { RequestContext } from 'remix/router';
import { Intlayer, type IntlayerState } from './context';

/**
 * Request context of the request being handled, made available to every
 * function running inside the `intlayer()` middleware scope — route handlers,
 * views, Remix UI components rendered from them — without passing it around.
 */
export const requestStorage = new AsyncLocalStorage<RequestContext<any, any>>();

/**
 * Returns the Intlayer state of the request being handled, if any.
 */
export const getIntlayerState = (): IntlayerState | undefined =>
  requestStorage.getStore()?.get(Intlayer) as IntlayerState | undefined;

/**
 * Returns the locale of the request being handled, if any.
 */
export const getRequestLocale = (): DeclaredLocales | undefined =>
  getIntlayerState()?.locale;
