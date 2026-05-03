import {
  cancelSubscription,
  createPortalSession,
  getInvoices,
  getPaymentMethod,
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
    getInvoices: {
      urlModel: '/invoices',
      url: `${baseURL()}/invoices`,
      method: 'GET',
    },
    getPaymentMethod: {
      urlModel: '/payment-method',
      url: `${baseURL()}/payment-method`,
      method: 'GET',
    },
    createPortalSession: {
      urlModel: '/portal-session',
      url: `${baseURL()}/portal-session`,
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
  fastify.get(getStripeRoutes().getInvoices.urlModel, getInvoices);
  fastify.get(getStripeRoutes().getPaymentMethod.urlModel, getPaymentMethod);
  fastify.post(
    getStripeRoutes().createPortalSession.urlModel,
    createPortalSession
  );
};
