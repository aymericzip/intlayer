import { isEnabled } from '@intlayer/analytics/isEnabled';
import { onDestroy, onMount } from 'svelte';
import { intlayerStore } from '../client/intlayerStore';
import { setExposureSink } from './exposureSink';

/**
 * Initializes the Intlayer analytics client singleton when analytics is
 * enabled (mirrors {@link useEditor}). Records an initial page view, keeps the
 * client aware of the current locale via `intlayerStore`, and wires node-level
 * content exposures.
 *
 * The module is loaded via a dynamic `import()` so it ships as its own async
 * chunk, off the critical rendering path. Apps that don't opt in
 * (`analytics.enabled !== true`) pay nothing — the whole body is guarded by
 * `INTLAYER_ANALYTICS_ENABLED` and dead-code-eliminated at build time.
 */
export const useAnalytics = () => {
  if (process.env.INTLAYER_ANALYTICS_ENABLED === 'false' || !isEnabled) return;

  let unsubscribeLocale: (() => void) | null = null;
  let cancelled = false;
  // Tracks whether initAnalyticsClient actually ran, so cleanup never calls
  // stopAnalyticsClient for an init that was cancelled — that would decrement
  // the shared reference count once too many.
  let initialized = false;

  onMount(() => {
    import('@intlayer/analytics')
      .then(({ initAnalyticsClient, buildContentExposure }) => {
        if (cancelled) return;

        const client = initAnalyticsClient();
        initialized = true;

        // Svelte stores call the subscriber with the current value on
        // subscription — that first call seeds the locale; later calls are
        // locale switches, which are a real signal worth a page view.
        let isInitialStoreValue = true;
        unsubscribeLocale = intlayerStore.subscribe(({ locale }) => {
          if (!locale) return;
          client.setLocale(locale);
          if (isInitialStoreValue) {
            isInitialStoreValue = false;
            return;
          }
          client.trackPageView({ reason: 'locale_change' });
        });

        client.trackPageView({ reason: 'initial' });

        // Route node-level exposures (from the interpreter plugins) into the
        // client. Serialization happens here, off the hot render path.
        setExposureSink((input) =>
          client.trackContentExposure(buildContentExposure(input))
        );
      })
      .catch(() => {
        /* chunk failed to load — analytics stays a no-op */
      });
  });

  onDestroy(() => {
    cancelled = true;
    unsubscribeLocale?.();
    setExposureSink(null);
    import('@intlayer/analytics')
      .then(({ stopAnalyticsClient }) => {
        if (initialized) stopAnalyticsClient();
      })
      .catch(() => {});
  });
};
