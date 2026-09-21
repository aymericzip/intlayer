import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import { createContextKey } from 'remix/router';

/**
 * Intlayer state attached to the Remix `RequestContext` by the {@link intlayer} middleware.
 */
export type IntlayerState = {
  /** Locale resolved for the current request. */
  locale: DeclaredLocales;
  /** Locale configured as fallback in `intlayer.config.ts`. */
  defaultLocale: DeclaredLocales;
  /** Every locale declared in `intlayer.config.ts`. */
  availableLocales: DeclaredLocales[];
};

/**
 * Request-context key holding the {@link IntlayerState} of the current request.
 *
 * @example
 * ```ts
 * router.get('/', (context) => Response.json({ locale: context.get(Intlayer).locale }));
 * ```
 */
export const Intlayer: { defaultValue?: IntlayerState } =
  createContextKey<IntlayerState>();

/**
 * Name of the direct property installed on the request context by the middleware,
 * so `context.intlayer` mirrors `context.get(Intlayer)`.
 */
export const INTLAYER_CONTEXT_PROPERTY = 'intlayer';
