import type { AnalyticsClient } from '@intlayer/analytics';
import { isEnabled } from '@intlayer/analytics/isEnabled';
import { useContext, useEffect, useRef } from 'preact/hooks';
import { IntlayerClientContext } from '../client/IntlayerProvider';
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
  const { locale } = useContext(IntlayerClientContext) ?? {};
  const clientRef = useRef<AnalyticsClient | null>(null);

  useEffect(() => {
    if (process.env.INTLAYER_ANALYTICS_ENABLED === 'false' || !isEnabled) {
      return;
    }

    let cancelled = false;
    // Tracks whether initAnalyticsClient actually ran, so cleanup never calls
    // stopAnalyticsClient for an init that was cancelled — that would decrement
    // the shared reference count once too many.
    let initialized = false;

    import('@intlayer/analytics')
      .then(({ initAnalyticsClient, buildContentExposure }) => {
        if (cancelled) return;

        const client = initAnalyticsClient();
        initialized = true;
        clientRef.current = client;

        if (locale) client.setLocale(locale);
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

    return () => {
      cancelled = true;
      clientRef.current = null;
      setExposureSink(null);
      import('@intlayer/analytics')
        .then(({ stopAnalyticsClient }) => {
          if (initialized) stopAnalyticsClient();
        })
        .catch(() => {});
    };
    // Run once on mount; locale updates are handled by the effect below.
  }, []);

  useEffect(() => {
    if (!locale || !clientRef.current) return;

    clientRef.current.setLocale(locale);
    clientRef.current.trackPageView({ reason: 'locale_change' });
  }, [locale]);
};
