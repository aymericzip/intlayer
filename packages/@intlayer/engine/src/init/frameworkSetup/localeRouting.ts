import type { FrameworkSetupContext } from './types';

/**
 * Whether the locale is carried by a URL path segment (`/fr/about`), which the
 * framework router must declare (`[locale]`, `{-$locale}`, `$locale`…). Only the
 * prefix routing modes do, and only while the proxy is enabled: `no-prefix` and
 * `search-params` resolve the locale from storage/headers/query instead.
 */
export const usesLocalePathSegment = ({
  routingMode,
  enableProxy,
}: Pick<FrameworkSetupContext, 'routingMode' | 'enableProxy'>): boolean =>
  enableProxy &&
  (routingMode === 'prefix-all' || routingMode === 'prefix-no-default');
