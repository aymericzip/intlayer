import { internationalization } from '@intlayer/config/built';
import type { DeclaredLocales } from '@intlayer/types/module_augmentation';
import type {
  UseLocaleProps,
  UseLocaleResult as VanillaUseLocaleResult,
} from 'vanilla-intlayer';
import { getRequestLocale } from './requestStorage';

export type { UseLocaleProps } from 'vanilla-intlayer';

export type UseLocaleResult = VanillaUseLocaleResult;

const { defaultLocale, locales: availableLocales } = internationalization;

/**
 * Returns the locale of the request being rendered, read from
 * `Astro.locals.intlayer`, with the configured default and available locales.
 *
 * Falls back to the default locale outside of a request, i.e. when the
 * `astro-intlayer/middleware` did not run.
 *
 * Same shape as the client-side hook this entry resolves to in the browser
 * (`vanilla-intlayer`). A request has no locale to switch, so `setLocale` and
 * `subscribe` are inert here: switch the locale from a `<script>`, where the
 * same import gives the client implementation.
 *
 * @example
 * ```astro
 * ---
 * import { useLocale } from 'astro-intlayer';
 *
 * const { locale, availableLocales } = useLocale();
 * ---
 * <html lang={locale}>
 * ```
 */
export const useLocale = (_props: UseLocaleProps = {}): UseLocaleResult => ({
  locale: getRequestLocale() ?? (defaultLocale as DeclaredLocales),
  defaultLocale: defaultLocale as DeclaredLocales,
  availableLocales: availableLocales as DeclaredLocales[],
  setLocale: () => {
    console.warn(
      '[astro-intlayer] setLocale() has no effect during a server render. Call it from a client <script> instead.'
    );
  },
  subscribe: () => () => {},
});
