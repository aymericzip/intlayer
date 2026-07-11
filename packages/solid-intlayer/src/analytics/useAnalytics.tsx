import type { AnalyticsClient } from '@intlayer/analytics';
import { isEnabled } from '@intlayer/analytics/isEnabled';
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { useIntlayerContext } from '../client';
import { setExposureSink } from './exposureSink';

/**
 * Initializes the Intlayer analytics client singleton when analytics is enabled
 * and keeps it aware of the current locale.
 *
 * Mirrors {@link useEditor}: the module is loaded via a dynamic `import()` so it
 * ships as its own async chunk, off the critical rendering path. Apps that
 * don't opt in (`analytics.enabled !== true`) pay nothing — the whole body is
 * guarded by `INTLAYER_ANALYTICS_ENABLED` and dead-code-eliminated at build
 * time.
 */
export const useAnalytics = () => {
  if (process.env.INTLAYER_ANALYTICS_ENABLED === 'false' || !isEnabled) return;

  // `useIntlayerContext` widens to `{}` because of its `?? {}` fallback —
  // narrow to the locale accessor shape actually provided by the context.
  const { locale } = useIntlayerContext() as Partial<{
    locale: () => string | undefined;
  }>;
  const [client, setClient] = createSignal<AnalyticsClient | null>(null);

  let cancelled = false;
  // Tracks whether initAnalyticsClient actually ran, so cleanup never calls
  // stopAnalyticsClient for an init that was cancelled — that would decrement
  // the shared reference count once too many.
  let initialized = false;

  onMount(() => {
    import('@intlayer/analytics')
      .then(({ initAnalyticsClient, buildContentExposure }) => {
        if (cancelled) return;

        const clientInstance = initAnalyticsClient();
        initialized = true;

        const currentLocale = locale?.();
        if (currentLocale) clientInstance.setLocale(currentLocale);
        clientInstance.trackPageView({ reason: 'initial' });

        // Route node-level exposures (from the interpreter plugins) into the
        // client. Serialization happens here, off the hot render path.
        setExposureSink((input) =>
          clientInstance.trackContentExposure(buildContentExposure(input))
        );

        setClient(clientInstance);
      })
      .catch(() => {
        /* chunk failed to load — analytics stays a no-op */
      });
  });

  // Locale switches are a real signal — record them as page views.
  let previousLocale: string | undefined;
  createEffect(() => {
    const clientInstance = client();
    const currentLocale = locale?.();

    if (!clientInstance || !currentLocale) return;

    if (previousLocale === undefined) {
      // First run after init — the initial page view already covered it.
      previousLocale = currentLocale;
      return;
    }
    if (previousLocale === currentLocale) return;

    previousLocale = currentLocale;
    clientInstance.setLocale(currentLocale);
    clientInstance.trackPageView({ reason: 'locale_change' });
  });

  onCleanup(() => {
    cancelled = true;
    setExposureSink(null);
    import('@intlayer/analytics')
      .then(({ stopAnalyticsClient }) => {
        if (initialized) stopAnalyticsClient();
      })
      .catch(() => {});
  });
};
