import { DestroyRef, inject, type Signal, signal } from '@angular/core';
import { isEnabled } from '@intlayer/analytics/isEnabled';

/**
 * The state of an A/B experiment for the current session.
 */
export type ExperimentState = {
  /**
   * The variant assigned to this session. Until assignment resolves (and on
   * the server, or when analytics is disabled), this is the first variant —
   * treat the first variant as the control.
   */
  variant: Signal<string>;
  /**
   * `true` once the variant has been deterministically assigned and its
   * exposure recorded. Useful to defer rendering when a flash of the control
   * variant is not acceptable.
   */
  isAssigned: Signal<boolean>;
};

/**
 * Assigns this session to a variant of an A/B experiment and records the
 * exposure, scoped to `experimentKey`, so the backend can compute per-variant
 * conversion rates against `useConversion` events.
 *
 * Assignment is deterministic per session (no server round-trip, stable across
 * re-mounts). The exposure is recorded once per call.
 *
 * Must be called inside an Angular injection context (e.g. a component
 * constructor or field initializer).
 *
 * @param experimentKey - Unique key identifying the experiment.
 * @param variants - The candidate variant names; the first one is the control.
 * @param weights - Optional relative weights, one per variant (e.g. `[9, 1]`).
 * @returns The {@link ExperimentState} for this session.
 *
 * @example
 * ```ts
 * export class HeroComponent {
 *   experiment = useExperiment('homepage-hero', ['a', 'b']);
 *   content = useIntlayer('hero');
 * }
 * ```
 */
export const useExperiment = (
  experimentKey: string,
  variants: string[],
  weights?: number[]
): ExperimentState => {
  const variant = signal(variants[0] ?? '');
  const isAssigned = signal(false);

  if (process.env.INTLAYER_ANALYTICS_ENABLED === 'false' || !isEnabled) {
    return {
      variant: variant.asReadonly(),
      isAssigned: isAssigned.asReadonly(),
    };
  }

  const destroyRef = inject(DestroyRef, { optional: true });

  let cancelled = false;
  let initialized = false;

  import('@intlayer/analytics')
    .then(({ initAnalyticsClient }) => {
      if (cancelled) return;

      // Ref-counted: guarantees a live client even when this call's import
      // resolves before the provider's. Balanced by stop on destroy.
      const client = initAnalyticsClient();
      initialized = true;

      const assigned = client.getVariant(experimentKey, variants, weights);
      variant.set(assigned);
      isAssigned.set(true);

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

  destroyRef?.onDestroy(() => {
    cancelled = true;
    import('@intlayer/analytics')
      .then(({ stopAnalyticsClient }) => {
        if (initialized) stopAnalyticsClient();
      })
      .catch(() => {});
  });

  return { variant: variant.asReadonly(), isAssigned: isAssigned.asReadonly() };
};
