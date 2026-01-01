import {
  getNewsletterStatus,
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
} from '@controllers/newsletter.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

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

export const newsletterRouter = async (fastify: FastifyInstance) => {
  fastify.post(
    getNewsletterRoutes().subscribeToNewsletter.urlModel,
    subscribeToNewsletter
  );
  fastify.post(
    getNewsletterRoutes().unsubscribeFromNewsletter.urlModel,
    unsubscribeFromNewsletter
  );
  fastify.get(
    getNewsletterRoutes().getNewsletterStatus.urlModel,
    getNewsletterStatus
  );
};
