'use client';

import type { AudienceRange } from '@intlayer/backend';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useAnalyticsAPI } from '../useIntlayerAPI';
import { useAppQuery } from './utils';

/**
 * Fetches the audience report for the active project: distinct visitors
 * (today / 7d / window), page views, the evolution series, and locale +
 * country breakdowns.
 *
 * @param range - Rolling window, either a named range (`1h`, `24h`, `7d`,
 *   `30d`, `90d`, `6mo`, `1y`, `3y`) or a number of days (default 30).
 * @param options - Extra react-query options.
 */
export const useGetAnalyticsAudience = (
  range: AudienceRange | number = 30,
  options?: Partial<UseQueryOptions>
) => {
  const analyticsAPI = useAnalyticsAPI();

  return useAppQuery({
    queryKey: ['analytics', 'audience', range],
    queryFn: ({ signal }) => analyticsAPI.getAudience(range, { signal }),
    requireUser: true,
    requireOrganization: true,
    requireProject: true,
    ...options,
  });
};

/**
 * Fetches per-content exposure totals — "which content is actually shown".
 *
 * @param options - Extra react-query options.
 */
export const useGetContentStats = (options?: Partial<UseQueryOptions>) => {
  const analyticsAPI = useAnalyticsAPI();

  return useAppQuery({
    queryKey: ['analytics', 'content-stats'],
    queryFn: ({ signal }) => analyticsAPI.getContentStats({ signal }),
    requireUser: true,
    requireOrganization: true,
    requireProject: true,
    ...options,
  });
};

/**
 * Fetches A/B experiment results for the active project.
 *
 * @param experimentKey - The experiment to evaluate.
 * @param options - Extra react-query options.
 */
export const useGetExperimentResults = (
  experimentKey: string,
  options?: Partial<UseQueryOptions>
) => {
  const analyticsAPI = useAnalyticsAPI();

  return useAppQuery({
    queryKey: ['analytics', 'experiment', experimentKey],
    queryFn: ({ signal }) =>
      analyticsAPI.getExperimentResults(experimentKey, { signal }),
    requireUser: true,
    requireOrganization: true,
    requireProject: true,
    enabled: Boolean(experimentKey),
    ...options,
  });
};
