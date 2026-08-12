import { internationalization } from '@intlayer/config/built';
import { setIntlayerIdentifier } from '@intlayer/config/client';
import type { Locale } from '@intlayer/types/allLocales';
import type {
  LocalesValues,
  ProviderVariant,
} from '@intlayer/types/module_augmentation';
import { type App, type Ref, readonly, ref } from 'vue';

export const INTLAYER_SYMBOL = Symbol('intlayer');

/**
 * Singleton instance
 */
let instance: IntlayerProvider | null = null;

export type IntlayerProvider = {
  locale: Ref<Locale>;
  setLocale: (locale: LocalesValues) => void;
  /**
   * Ambient variant applied to every dictionary read in the app, the same way
   * `locale` is. Overridden per call by an explicit selector.
   */
  variant: Ref<ProviderVariant | undefined>;
  setVariant: (variant: ProviderVariant | undefined) => void;
  isCookieEnabled?: boolean;
};

/**
 * Create and return a single IntlayerProvider instance
 */
export const createIntlayerClient = (
  locale?: LocalesValues,
  isCookieEnabled = true,
  variant?: ProviderVariant
): IntlayerProvider => {
  if (instance) return instance;

  setIntlayerIdentifier();

  const { defaultLocale } = internationalization ?? {};

  const targetLocale = ref<Locale>((locale as Locale) ?? defaultLocale);

  const setLocale = (newLocale: LocalesValues) => {
    targetLocale.value = newLocale as Locale;
  };

  const targetVariant = ref<ProviderVariant | undefined>(variant);

  const setVariant = (newVariant: ProviderVariant | undefined) => {
    targetVariant.value = newVariant;
  };

  instance = {
    locale: readonly(targetLocale),
    setLocale,
    variant: readonly(targetVariant) as Ref<ProviderVariant | undefined>,
    setVariant,
    isCookieEnabled,
  };

  return instance;
};

/**
 * Vue plugin to install Intlayer in your application.
 *
 * It provides the Intlayer context to your app and enables the use of composables
 * like `useIntlayer` and `useLocale`.
 *
 * @param app - The Vue application instance.
 * @param options.locale - Initial locale to use.
 * @param options.isCookieEnabled - Whether to store the locale in cookies.
 * @param options.variant - Ambient variant applied to every dictionary read in
 *   the app — for a dimension fixed for the whole session (tenant, school type,
 *   plan tier…) that no component should have to pass by hand. Accepts a name
 *   (`'school1'`), an ordered preference chain (`['school1', 'default']`), or a
 *   per-key map (`{ key1: 'school1', default: 'base' }`). A plain object is
 *   always the per-key map; nest a structured variant as
 *   `{ default: { id: 'prod_abc' } }`. A call-site selector always wins.
 * @returns The Vue application instance.
 *
 * @example
 * ```ts
 * import { createApp } from 'vue';
 * import { installIntlayer } from 'vue-intlayer';
 * import App from './App.vue';
 *
 * const app = createApp(App);
 *
 * installIntlayer(app);
 *
 * app.mount('#app');
 * ```
 */
export const installIntlayer = (
  app: App,
  options?: {
    locale?: LocalesValues;
    isCookieEnabled?: boolean;
    variant?: ProviderVariant;
  }
) => {
  const { locale, isCookieEnabled, variant } = options ?? {};

  const client = createIntlayerClient(locale, isCookieEnabled, variant);

  app.provide(INTLAYER_SYMBOL, client);

  if (process.env.INTLAYER_EDITOR_ENABLED !== 'false') {
    import('../editor/useEditor')
      .then(({ useEditor }) => {
        useEditor(app);
      })
      .catch(() => {});
  }

  if (process.env.INTLAYER_ANALYTICS_ENABLED !== 'false') {
    import('../analytics/useAnalytics')
      .then(({ useAnalytics }) => {
        useAnalytics(app);
      })
      .catch(() => {});
  }

  return app;
};

/**
 * Vue plugin object for Intlayer. Can be used with `app.use(intlayer)`.
 *
 * @example
 * ```ts
 * import { createApp } from 'vue';
 * import { intlayer } from 'vue-intlayer';
 * import App from './App.vue';
 *
 * const app = createApp(App);
 * app.use(intlayer);
 * app.mount('#app');
 * ```
 */
export const intlayer: {
  install: typeof installIntlayer;
} = {
  install: installIntlayer,
};
