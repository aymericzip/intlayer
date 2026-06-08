'use client';

import type {
  NewsletterSubscriptionBody,
  NewsletterUnsubscriptionBody,
} from '@intlayer/backend';
import { useMutation } from '@tanstack/react-query';
import { useNewsletterAPI } from '../useIntlayerAPI';

export const useSubscribeToNewsletter = () => {
  const newsletterAPI = useNewsletterAPI();

  return useMutation({
    mutationKey: ['newsletter'],
    mutationFn: (args: NewsletterSubscriptionBody) =>
      newsletterAPI.subscribeToNewsletter(args),
  });
};

export const useUnsubscribeFromNewsletter = () => {
  const newsletterAPI = useNewsletterAPI();

  return useMutation({
    mutationKey: ['newsletter'],
    mutationFn: (args: NewsletterUnsubscriptionBody) =>
      newsletterAPI.unsubscribeFromNewsletter(args),
  });
};

export const useGetNewsletterStatus = () => {
  const newsletterAPI = useNewsletterAPI();

  return useMutation({
    mutationKey: ['newsletter'],
    mutationFn: () => newsletterAPI.getNewsletterStatus(),
  });
};
