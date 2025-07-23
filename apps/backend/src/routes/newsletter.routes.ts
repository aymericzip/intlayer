import type { Routes } from '@/types/Routes';
import {
  getNewsletterStatus,
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
} from '@controllers/newsletter.controller';
import { Router } from 'express';

export const newsletterRouter: Router = Router();

export const newsletterRoute = '/api/newsletter';

const baseURL = () => `${process.env.BACKEND_URL}${newsletterRoute}`;

export const getNewsletterRoutes = () =>
  ({
    subscribeToNewsletter: {
      urlModel: '/subscribe',
      url: `${baseURL()}/subscribe`,
      method: 'POST',
    },
    unsubscribeFromNewsletter: {
      urlModel: '/unsubscribe',
      url: `${baseURL()}/unsubscribe`,
      method: 'POST',
    },
    getNewsletterStatus: {
      urlModel: '/status',
      url: `${baseURL()}/status`,
      method: 'GET',
    },
  }) satisfies Routes;

newsletterRouter.post(
  getNewsletterRoutes().subscribeToNewsletter.urlModel,
  subscribeToNewsletter as any
);
newsletterRouter.post(
  getNewsletterRoutes().unsubscribeFromNewsletter.urlModel,
  unsubscribeFromNewsletter as any
);
newsletterRouter.get(
  getNewsletterRoutes().getNewsletterStatus.urlModel,
  getNewsletterStatus as any
);
