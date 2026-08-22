/**
 * Default values for the `analytics` configuration block.
 * Analytics is opt-out — enabled unless the user disables it, and only
 * effective once the optional `@intlayer/analytics` package is installed.
 */
export const ANALYTICS_ENABLED = true;
export const ANALYTICS_FLUSH_INTERVAL = 20_000;
export const ANALYTICS_SAMPLE_RATE = 1;
