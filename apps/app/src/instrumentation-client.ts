import posthog from 'posthog-js';

if (
  import.meta.env.VITE_POSTHOG_KEY &&
  import.meta.env.VITE_POSTHOG_HOST
) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST,
    defaults: '2026-01-30',
  });
}
