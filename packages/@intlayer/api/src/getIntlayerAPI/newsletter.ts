import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type {
  NewsletterRoutes,
  NewsletterSubscriptionBody,
  NewsletterSubscriptionResult,
  NewsletterUnsubscriptionBody,
  newsletterContract,
} from '@intlayer/backend-contract/newsletter';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

/** Prefix of the routes, checked against the backend contract. */
const newsletterGroup = {
  prefix: '/api/newsletter',
} as const satisfies Pick<typeof newsletterContract, 'prefix'>;

/**
 * Method and path of every route, checked against the backend contract at
 * compile time (the contract's zod schemas are never loaded).
 */
const newsletterEndpoints = {
  subscribeToNewsletter: { method: 'POST', path: '/subscribe' },
  unsubscribeFromNewsletter: { method: 'POST', path: '/unsubscribe' },
  getNewsletterStatus: { method: 'GET', path: '/status' },
} as const satisfies RouteEndpoints<NewsletterRoutes>;

export const getNewsletterAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

  /**
   * Subscribe a user to newsletter(s)
   * @param body - Newsletter subscription parameters.
   * @returns Newsletter subscription result.
   */
  const subscribeToNewsletter = async (
    body: NewsletterSubscriptionBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<NewsletterSubscriptionResult>(
      buildRouteURL(
        backendURL,
        newsletterGroup,
        newsletterEndpoints.subscribeToNewsletter
      ),
      authAPIOptions,
      otherOptions,
      {
        method: newsletterEndpoints.subscribeToNewsletter.method,
        body: body,
      }
    );

  /**
   * Unsubscribe a user from newsletter(s)
   * @param body - Newsletter unsubscription parameters.
   * @returns Newsletter unsubscription result.
   */
  const unsubscribeFromNewsletter = async (
    body: NewsletterUnsubscriptionBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<NewsletterSubscriptionResult>(
      buildRouteURL(
        backendURL,
        newsletterGroup,
        newsletterEndpoints.unsubscribeFromNewsletter
      ),
      authAPIOptions,
      otherOptions,
      {
        method: newsletterEndpoints.unsubscribeFromNewsletter.method,
        body: body,
      }
    );

  /**
   * Get newsletter subscription status for the authenticated user
   * @returns Newsletter subscription status.
   */
  const getNewsletterStatus = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<NewsletterSubscriptionResult>(
      buildRouteURL(
        backendURL,
        newsletterGroup,
        newsletterEndpoints.getNewsletterStatus
      ),
      authAPIOptions,
      otherOptions,
      {
        method: newsletterEndpoints.getNewsletterStatus.method,
      }
    );

  return {
    subscribeToNewsletter,
    unsubscribeFromNewsletter,
    getNewsletterStatus,
  };
};

/**
 * Authenticated `newsletter` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const newsletterEndpoint = createEndpoint(getNewsletterAPI);
