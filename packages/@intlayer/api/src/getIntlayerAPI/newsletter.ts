import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/config/client';
import { type FetcherOptions, fetcher } from '../fetcher';
import type {
  NewsletterSubscriptionBody,
  NewsletterSubscriptionResult,
  NewsletterUnsubscriptionBody,
} from '../types';

export const getNewsletterAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration.editor?.backendURL;

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration.'
    );
  }

  const NEWSLETTER_API_ROUTE = `${backendURL}/api/newsletter`;

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
      `${NEWSLETTER_API_ROUTE}/subscribe`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
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
      `${NEWSLETTER_API_ROUTE}/unsubscribe`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: body,
      }
    );

  /**
   * Get newsletter subscription status for the authenticated user
   * @returns Newsletter subscription status.
   */
  const getNewsletterStatus = async (otherOptions: FetcherOptions = {}) =>
    await fetcher<NewsletterSubscriptionResult>(
      `${NEWSLETTER_API_ROUTE}/status`,
      authAPIOptions,
      otherOptions,
      {
        method: 'GET',
      }
    );

  return {
    subscribeToNewsletter,
    unsubscribeFromNewsletter,
    getNewsletterStatus,
  };
};
