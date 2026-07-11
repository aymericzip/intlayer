import { isEnabled } from '@intlayer/analytics/isEnabled';
import { type Accessor, createSignal, onCleanup, onMount } from 'solid-js';

/**
 * The state of an A/B experiment for the current session.
 */
export type ExperimentState = {
  /**
   * The variant assigned to this session. Until assignment resolves (and on
   * the server, or when analytics is disabled), this is the first variant —
   * treat the first variant as the control.
   */
  variant: Accessor<string>;
  /**
   * `true` once the variant has been deterministically assigned and its
   * exposure recorded. Useful to defer rendering when a flash of the control
   * variant is not acceptable.
   */
  isAssigned: Accessor<boolean>;
};

/**
 * Assigns this session to a variant of an A/B experiment and records the
 * exposure, scoped to `experimentKey`, so the backend can compute per-variant
 * conversion rates against `useConversion` events.
 *
 * Assignment is deterministic per session (no server round-trip, stable across
 * re-mounts). The exposure is recorded once per mount.
 *
 * @param experimentKey - Unique key identifying the experiment.
 * @param variants - The candidate variant names; the first one is the control.
 * @param weights - Optional relative weights, one per variant (e.g. `[9, 1]`).
 * @returns The {@link ExperimentState} for this session.
 *
 * @example
 * ```tsx
 * const { variant } = useExperiment('homepage-hero', ['a', 'b']);
 * const content = useIntlayer(variant() === 'b' ? 'hero-b' : 'hero');
 * ```
 */
export const useExperiment = (
  experimentKey: string,
  variants: string[],
  weights?: number[]
): ExperimentState => {
  const [variant, setVariant] = createSignal(variants[0] ?? '');
  const [isAssigned, setIsAssigned] = createSignal(false);

  let cancelled = false;
  let initialized = false;

  onMount(() => {
    if (process.env.INTLAYER_ANALYTICS_ENABLED === 'false' || !isEnabled) {
      return;
    }

    import('@intlayer/analytics')
      .then(({ initAnalyticsClient }) => {
        if (cancelled) return;

        // Ref-counted: guarantees a live client even when this hook's import
        // resolves before the provider's. Balanced by stop in the cleanup.
        const client = initAnalyticsClient();
        initialized = true;

        const assigned = client.getVariant(experimentKey, variants, weights);
        setVariant(assigned);
        setIsAssigned(true);

        // Experiment-level exposure — the denominator of the conversion rate.
        client.trackContentExposure({
          dictionaryKey: experimentKey,
          keyPath: '',
          nodeType: 'experiment',
          experimentKey,
          variant: assigned,
        });
      })
      .catch(() => {
        /* chunk failed to load — control variant stays in place */
      });
  });

  onCleanup(() => {
    cancelled = true;
    import('@intlayer/analytics')
      .then(({ stopAnalyticsClient }) => {
        if (initialized) stopAnalyticsClient();
      })
      .catch(() => {});
  });

  return { variant, isAssigned };
};
