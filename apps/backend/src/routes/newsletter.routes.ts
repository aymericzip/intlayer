import {
  getNewsletterStatus,
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
} from '@controllers/newsletter.controller';
import { newsletterContract } from '@intlayer/backend-contract/newsletter';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const newsletterRoute = newsletterContract.prefix;

export const newsletterRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, newsletterContract, {
    subscribeToNewsletter,
    unsubscribeFromNewsletter,
    getNewsletterStatus,
  });
};
