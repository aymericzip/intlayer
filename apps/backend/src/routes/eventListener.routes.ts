import { listenChangeSSE } from '@controllers/eventListener.controller';
import { Router } from 'express';
import type { Routes } from '@/types/Routes';

export const eventListenerRouter: Router = Router();

export const eventListenerRoute = '/api/event-listener';

const baseURL = () => `${process.env.BACKEND_URL}${eventListenerRoute}`;

export const eventListenerRoutes = () =>
  ({
    checkDictionaryChangeSSE: {
      urlModel: '/',
      url: baseURL(),
      method: 'GET',
    },
  }) satisfies Routes;

eventListenerRouter.get(
  eventListenerRoutes().checkDictionaryChangeSSE.urlModel,
  listenChangeSSE
);
