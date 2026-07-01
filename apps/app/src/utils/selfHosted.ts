import { redirect } from '@tanstack/react-router';
import type { LocalesValues } from 'intlayer';

/**
 * Whether the dashboard is running in self-hosted mode.
 *
 * In self-hosted mode every cloud-only / monetization feature is disabled:
 * Stripe billing, pricing pages, the plan & billing UI, the onboarding payment
 * step, the affiliate and promo-code programs, the reviewer marketplace and
 * third-party analytics (PostHog, Ahrefs).
 *
 * The flag is provided at build time through the `VITE_SELF_HOSTED` environment
 * variable, which Vite inlines into the client bundle. Server code (server
 * functions, loaders running on the server) reads the same value from
 * `process.env`, so both sources are checked.
 */
export const IS_SELF_HOSTED: boolean =
  (import.meta.env.VITE_SELF_HOSTED ??
    (typeof process !== 'undefined'
      ? process.env?.VITE_SELF_HOSTED
      : undefined)) === 'true';

/**
 * Redirects to the dashboard home when running in self-hosted mode.
 *
 * Meant to be called from a route `beforeLoad` so that cloud-only pages
 * (pricing, affiliation, reviewer marketplace, monetization admin screens…)
 * are unreachable on self-hosted instances.
 *
 * @param locale - The current locale, forwarded to keep the URL prefix intact.
 */
export const redirectIfSelfHosted = (locale?: LocalesValues): void => {
  if (IS_SELF_HOSTED) {
    throw redirect({ to: '/{-$locale}', params: { locale } });
  }
};
