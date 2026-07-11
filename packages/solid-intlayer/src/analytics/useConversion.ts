import { isEnabled } from '@intlayer/analytics/isEnabled';

/**
 * Parameters describing a conversion to record.
 */
export type ConversionParams = {
  /** The experiment this conversion is attributed to. */
  experimentKey: string;
  /** The variant the session was assigned. */
  variant: string;
  /** The goal reached (e.g. `"signup"`, `"cta_click"`). */
  goal: string;
  /** Optional numeric value (e.g. revenue). */
  value?: number;
};

/**
 * Returns a `trackConversion` callback for content A/B testing. Safe to call
 * from any component: it resolves to a no-op when analytics is disabled or the
 * client has not been initialized yet.
 *
 * @example
 * ```tsx
 * const trackConversion = useConversion();
 * <button onClick={() => trackConversion({
 *   experimentKey: 'homepage-hero', variant: 'b', goal: 'cta_click',
 * })}>Get started</button>
 * ```
 */
export const useConversion = () => {
  return (params: ConversionParams): void => {
    if (process.env.INTLAYER_ANALYTICS_ENABLED === 'false' || !isEnabled) {
      return;
    }

    import('@intlayer/analytics')
      .then(({ getGlobalAnalyticsClient }) => {
        getGlobalAnalyticsClient()?.trackConversion(params);
      })
      .catch(() => {});
  };
};
