import { listenChangeSSE } from '@controllers/eventListener.controller';
import { Router } from 'express';
import type { Routes } from '@/types/Routes';

export const eventListenerRouter: Router = Router();

const baseURL = () => `${process.env.BACKEND_URL}/api/event-listener`;

export const eventListenerRoutes = () =>
  ({
    checkDictionaryChangeSSE: {
      urlModel: '/:accessToken',
      url: ({ accessToken }: { accessToken: string }) =>
        `${baseURL}/${accessToken}`,
      method: 'GET',
    },
  }) satisfies Routes;

eventListenerRouter.get(
  eventListenerRoutes().checkDictionaryChangeSSE.urlModel,
  listenChangeSSE
);
