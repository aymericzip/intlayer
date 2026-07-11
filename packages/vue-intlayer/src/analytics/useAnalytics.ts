import { isEnabled } from '@intlayer/analytics/isEnabled';
import type { Locale } from '@intlayer/types/allLocales';
import { type App, inject, onMounted, onUnmounted, type Ref, watch } from 'vue';
import {
  INTLAYER_SYMBOL,
  type IntlayerProvider,
} from '../client/installIntlayer';
import { setExposureSink } from './exposureSink';

/**
 * Starts the analytics client and syncs the given locale ref into it.
 * Returns a cleanup function that stops the locale watcher and the client.
 */
const startAnalytics = (locale: Ref<Locale> | undefined): (() => void) => {
  let stopLocaleWatch: (() => void) | null = null;
  let stopped = false;
  // Tracks whether initAnalyticsClient actually ran, so cleanup never calls
  // stopAnalyticsClient for an init that was cancelled — that would decrement
  // the shared reference count once too many.
  let initialized = false;

  import('@intlayer/analytics')
    .then(({ initAnalyticsClient, buildContentExposure }) => {
      if (stopped) return;

      const client = initAnalyticsClient();
      initialized = true;

      if (locale?.value) client.setLocale(locale.value);
      client.trackPageView({ reason: 'initial' });

      // Route node-level exposures (from the interpreter plugins) into the
      // client. Serialization happens here, off the hot render path.
      setExposureSink((input) =>
        client.trackContentExposure(buildContentExposure(input))
      );

      if (locale) {
        stopLocaleWatch = watch(locale, (nextLocale) => {
          if (!nextLocale) return;
          client.setLocale(nextLocale);
          client.trackPageView({ reason: 'locale_change' });
        });
      }
    })
    .catch(() => {
      /* chunk failed to load — analytics stays a no-op */
    });

  return () => {
    stopped = true;
    stopLocaleWatch?.();
    setExposureSink(null);
    import('@intlayer/analytics')
      .then(({ stopAnalyticsClient }) => {
        if (initialized) stopAnalyticsClient();
      })
      .catch(() => {});
  };
};

/**
 * Initializes the Intlayer analytics client singleton when analytics is
 * enabled (mirrors {@link useEditor}). Records an initial page view, keeps the
 * client aware of the current locale, and wires node-level content exposures.
 *
 * @param app - When provided, hooks into the root component lifecycle via
 *   `app.mixin` (use from `installIntlayer`). When omitted, uses Vue composable
 *   lifecycle hooks (use from a component's `setup`).
 */
export const useAnalytics = (app?: App): void => {
  if (process.env.INTLAYER_ANALYTICS_ENABLED === 'false' || !isEnabled) return;

  if (app) {
    let stopAnalytics: (() => void) | null = null;

    app.mixin({
      inject: { _intlayerClient: { from: INTLAYER_SYMBOL, default: null } },
      mounted() {
        if ((this as any).$parent !== null) return;
        const client = (this as any)._intlayerClient as IntlayerProvider | null;
        stopAnalytics = startAnalytics(client?.locale);
      },
      unmounted() {
        if ((this as any).$parent !== null) return;
        stopAnalytics?.();
      },
    });

    return;
  }

  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);
  let stopAnalytics: (() => void) | null = null;

  onMounted(() => {
    stopAnalytics = startAnalytics(intlayer?.locale);
  });

  onUnmounted(() => {
    stopAnalytics?.();
  });
};
