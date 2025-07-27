import type { Routes } from '@/types/Routes';
import { listenChangeSSE } from '@controllers/eventListener.controller';
import { Router } from 'express';

export const eventListenerRouter: Router = Router();

export const eventListenerRoute = '/api/event-listener';

const baseURL = () => `${process.env.BACKEND_URL}${eventListenerRoute}`;

export const eventListenerRoutes = () =>
  ({
    checkDictionaryChangeSSE: {
      urlModel: '/:accessToken',
      url: ({ accessToken }: { accessToken: string }) =>
        `${baseURL()}/${accessToken}`,
      method: 'GET',
    },
  }) satisfies Routes;

eventListenerRouter.get(
  eventListenerRoutes().checkDictionaryChangeSSE.urlModel,
  listenChangeSSE
);
