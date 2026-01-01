import {
  cancelSubscription,
  getPricing,
  getSubscription,
} from '@controllers/stripe.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const stripeRoute = '/api/stripe';

const baseURL = () => `${process.env.BACKEND_URL}${stripeRoute}`;

export const getStripeRoutes = () =>
  ({
    getPricing: {
      urlModel: '/pricing',
      url: `${baseURL()}/pricing`,
      method: 'POST',
    },
    createSubscription: {
      urlModel: '/create-subscription',
      url: `${baseURL()}/create-subscription`,
      method: 'POST',
    },
    cancelSubscription: {
      urlModel: '/cancel-subscription',
      url: `${baseURL()}/cancel-subscription`,
      method: 'POST',
    },
  }) satisfies Routes;

export const stripeRouter = async (fastify: FastifyInstance) => {
  fastify.post(getStripeRoutes().getPricing.urlModel, getPricing);
  fastify.post(getStripeRoutes().createSubscription.urlModel, getSubscription);
  fastify.post(
    getStripeRoutes().cancelSubscription.urlModel,
    cancelSubscription
  );
};
