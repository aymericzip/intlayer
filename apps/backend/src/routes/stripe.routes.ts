import { getCheckoutSession } from '@controllers/stripe.controller';
import { Router } from 'express';
import { Routes } from '@/types/Routes';

export const stripeRouter: Router = Router();

const baseURL = `${process.env.BACKEND_URL}/api/stipe`;

export const stripeRoutes = {
  getCheckoutSession: {
    urlModel: '/',
    url: `${baseURL}/`,
    method: 'POST',
  },
} satisfies Routes;

// Authentication
stripeRouter.post(stripeRoutes.getCheckoutSession.urlModel, getCheckoutSession);
