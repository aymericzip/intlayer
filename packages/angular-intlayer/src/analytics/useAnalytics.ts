import {
  DestroyRef,
  effect,
  Injector,
  inject,
  provideAppInitializer,
  runInInjectionContext,
  signal,
} from '@angular/core';
import type { AnalyticsClient } from '@intlayer/analytics';
import { isEnabled } from '@intlayer/analytics/isEnabled';
// Import from the standalone token file to avoid a circular dependency:
//   installIntlayer.ts → useAnalytics.ts → ../client → installIntlayer.ts
import { INTLAYER_TOKEN, type IntlayerProvider } from '../client/intlayerToken';
import { setExposureSink } from './exposureSink';

/**
 * Initializes the Intlayer analytics client singleton when analytics is
 * enabled (mirrors {@link useEditor}). Records an initial page view, keeps the
 * client aware of the current locale, and wires node-level content exposures.
 *
 * Must be called inside an Angular injection context (e.g. a component
 * constructor, `provideAppInitializer`, or `runInInjectionContext`).
 *
 * @param client - The IntlayerProvider instance to sync locale from.
 *   When omitted the function injects `INTLAYER_TOKEN` from the DI tree,
 *   so it still works when called directly from a component.
 */
export const useAnalytics = (client?: IntlayerProvider | null): void => {
  if (process.env.INTLAYER_ANALYTICS_ENABLED === 'false' || !isEnabled) return;

  const destroyRef = inject(DestroyRef, { optional: true });
  const injector = inject(Injector);

  // Resolve the client: use the passed-in reference or fall back to injection.
  const resolvedClient =
    client ??
    inject<IntlayerProvider>(INTLAYER_TOKEN, { optional: true } as any);

  // `analyticsClient` signal is set once the async import resolves.
  // Using a signal lets an `effect()` react to it becoming available.
  const analyticsClient = signal<AnalyticsClient | null>(null);

  // Guard: prevents the async callback from acting after the view is destroyed.
  let stopped = false;
  // Tracks whether initAnalyticsClient actually ran, so teardown never calls
  // stopAnalyticsClient for an init that was cancelled — that would decrement
  // the shared reference count once too many.
  let initialized = false;

  import('@intlayer/analytics')
    .then(({ initAnalyticsClient, buildContentExposure }) => {
      if (stopped) return;

      const clientInstance = initAnalyticsClient();
      initialized = true;

      const currentLocale = resolvedClient?.locale();
      if (currentLocale) clientInstance.setLocale(currentLocale);
      clientInstance.trackPageView({ reason: 'initial' });

      // Route node-level exposures (from the interpreter plugins) into the
      // client. Serialization happens here, off the hot render path.
      setExposureSink((input) =>
        clientInstance.trackContentExposure(buildContentExposure(input))
      );

      analyticsClient.set(clientInstance);
    })
    .catch(() => {
      /* chunk failed to load — analytics stays a no-op */
    });

  // Locale switches are a real signal — record them as page views.
  let previousLocale: string | undefined;
  const effectRef = runInInjectionContext(injector, () =>
    effect(() => {
      const clientInstance = analyticsClient();
      const locale = resolvedClient?.locale();

      if (!clientInstance || !locale) return;

      if (previousLocale === undefined) {
        // First run after init — the initial page view already covered it.
        previousLocale = locale;
        return;
      }
      if (previousLocale === locale) return;

      previousLocale = locale;
      clientInstance.setLocale(locale);
      clientInstance.trackPageView({ reason: 'locale_change' });
    })
  );

  // Tear down on destroy
  destroyRef?.onDestroy(() => {
    stopped = true;
    effectRef.destroy();
    analyticsClient.set(null);
    setExposureSink(null);
    import('@intlayer/analytics')
      .then(({ stopAnalyticsClient }) => {
        if (initialized) stopAnalyticsClient();
      })
      .catch(() => {});
  });
};

/**
 * Angular provider that wires `useAnalytics` into the application
 * initialisation phase via `provideAppInitializer`.
 *
 * `provideIntlayer()` already calls this internally, so you only need this
 * function when you want to manage providers individually.
 *
 * @example
 * ```ts
 * // app.config.ts
 * import { provideIntlayer, provideIntlayerAnalytics } from 'angular-intlayer';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [provideIntlayer(), provideIntlayerAnalytics()],
 * };
 * ```
 */
export const provideIntlayerAnalytics = (client?: IntlayerProvider | null) =>
  provideAppInitializer(() => useAnalytics(client));
