import type { Locale } from '@intlayer/types/allLocales';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { getServerContext, IntlayerServer } from 'react-intlayer/server';
import { getLocale } from './getLocale';
import { createSuspendingReader } from './suspendingReader';

/**
 * Whether the call site already carries a locale — either a plain locale
 * argument or a selector object with an explicit `locale` field.
 */
const hasExplicitLocale = (localeOrSelector?: unknown): boolean =>
  typeof localeOrSelector === 'string' ||
  (typeof localeOrSelector === 'object' &&
    localeOrSelector !== null &&
    Boolean((localeOrSelector as { locale?: unknown }).locale));

/**
 * Whether the request-derived locale is worth reading at all.
 *
 * The base hooks in `react-intlayer/server` already prefer, in order, the
 * locale passed at the call site and the request-scoped server context seeded
 * by `IntlayerProvider`; they only fall back to the third argument these
 * helpers produce. Reading request storage means calling `headers()` /
 * `cookies()`, which opts the route into dynamic rendering — so it must stay
 * behind both of those, and never run when either already answers.
 */
const needsRequestLocale = (localeOrSelector?: unknown): boolean =>
  !hasExplicitLocale(localeOrSelector) && !getServerContext(IntlayerServer);

/**
 * Reads the locale carried by the request: the `x-intlayer-locale` header set
 * by the intlayer proxy, then the locale cookie, then `accept-language`.
 *
 * Errors are not swallowed — during prerendering Next.js relies on the throw
 * from `headers()` to mark the route dynamic.
 */
const readStoredLocale = createSuspendingReader<Locale>(getLocale);

/**
 * Fallback locale for the synchronous server hooks, so a page does not need a
 * provider of its own. Not a React hook despite suspending — it holds no
 * positional state, which is what lets it run conditionally (see
 * {@link createSuspendingReader}): on a client-side navigation that re-renders only the
 * page segment, the layout — and with it `IntlayerProvider` — does not re-run,
 * and the locale carried by the request takes over.
 *
 * Suspends until the request storage resolves. Returns `undefined` when the
 * call site or the server context already carries the locale.
 */
export const resolveFallbackLocale = (
  localeOrSelector?: unknown
): Locale | undefined =>
  needsRequestLocale(localeOrSelector) ? readStoredLocale() : undefined;

/**
 * Asynchronous twin of {@link resolveFallbackLocale}, for the hooks that are
 * already async and can await the request storage instead of suspending on it.
 */
export const getFallbackLocale = async (
  localeOrSelector?: unknown
): Promise<Locale | undefined> =>
  needsRequestLocale(localeOrSelector) ? await getLocale() : undefined;

/**
 * Full ambient locale for the server APIs that take a plain locale argument
 * (or none at all): call site → server context → locale carried by the
 * request.
 *
 * {@link resolveFallbackLocale} only yields the last rung, because the base hooks
 * in `react-intlayer/server` consult the first two themselves. The APIs
 * reimplemented here have no such fallback slot, so they need the resolved
 * value.
 */
export const resolveAmbientLocale = (
  locale?: LocalesValues
): LocalesValues | undefined =>
  locale ??
  getServerContext<LocalesValues>(IntlayerServer) ??
  resolveFallbackLocale(locale);
