'use client';

import type { AnalyticsClient } from '@intlayer/analytics';
import { isEnabled } from '@intlayer/analytics/isEnabled';
import { useContext, useEffect, useRef } from 'react';
import { IntlayerClientContext } from '../client/IntlayerProvider';
import { setExposureSink } from './exposureSink';

/**
 * Initializes the Intlayer analytics client singleton when analytics is enabled
 * and keeps it aware of the current locale.
 *
 * Mirrors {@link useEditor}: the dependency is loaded via a dynamic `import()`
 * wrapped so that apps which never install `@intlayer/analytics` (or disable it
 * via `INTLAYER_ANALYTICS_ENABLED`) pay nothing — the whole body is guarded and
 * dead-code-eliminated at build time.
 */
export const useAnalytics = () => {
  const { locale } = useContext(IntlayerClientContext) ?? {};
  const clientRef = useRef<AnalyticsClient | null>(null);

  useEffect(() => {
    if (process.env.INTLAYER_ANALYTICS_ENABLED === 'false' || !isEnabled) {
      return;
    }

    let cancelled = false;

    import('@intlayer/analytics')
      .then(({ initAnalyticsClient, buildContentExposure }) => {
        if (cancelled) return;

        const client = initAnalyticsClient();
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
        /* package not installed — analytics stays a no-op */
      });

    return () => {
      cancelled = true;
      clientRef.current = null;
      setExposureSink(null);
      import('@intlayer/analytics')
        .then(({ stopAnalyticsClient }) => stopAnalyticsClient())
        .catch(() => {});
    };
    // Run once on mount; locale updates are handled by the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!locale || !clientRef.current) return;

    clientRef.current.setLocale(locale);
    clientRef.current.trackPageView({ reason: 'locale_change' });
  }, [locale]);
};
