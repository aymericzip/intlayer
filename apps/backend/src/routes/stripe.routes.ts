import {
  cancelSubscription,
  getSubscription,
} from '@controllers/stripe.controller';
import { Router } from 'express';
import { Routes } from '@/types/Routes';

export const stripeRouter: Router = Router();

const baseURL = `${process.env.BACKEND_URL}/api/stipe`;

export const stripeRoutes = {
  createSubscription: {
    urlModel: '/create-subscription',
    url: `${baseURL}/create-subscription`,
    method: 'POST',
  },
  cancelSubscription: {
    urlModel: '/cancel-subscription',
    url: `${baseURL}/cancel-subscription`,
    method: 'POST',
  },
} satisfies Routes;

stripeRouter.post(stripeRoutes.createSubscription.urlModel, getSubscription);

stripeRouter.post(stripeRoutes.cancelSubscription.urlModel, cancelSubscription);
