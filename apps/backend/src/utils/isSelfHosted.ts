/**
 * Whether the backend is running in self-hosted mode.
 *
 * In self-hosted mode every cloud-only / monetization capability is turned off:
 * the Stripe REST routes, the Stripe webhook, the subscription/affiliate/
 * promo-code endpoints and the reviewer marketplace endpoints are never
 * registered.
 *
 * Toggled through the `SELF_HOSTED` environment variable (read at runtime).
 *
 * @returns `true` when `process.env.SELF_HOSTED` is the string `"true"`.
 */
export const isSelfHosted = (): boolean => process.env.SELF_HOSTED === 'true';
