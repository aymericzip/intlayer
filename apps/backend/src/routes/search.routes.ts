import type { Routes } from '@/types/Routes';
import { searchDocUtil } from '@controllers/search.controller';
import { Router } from 'express';

export const searchRouter: Router = Router();

const baseURL = () => `${process.env.BACKEND_URL}/api/search`;

export const getSearchRoutes = () =>
  ({
    doc: {
      urlModel: '/doc',
      url: `${baseURL()}/doc`,
      method: 'GET',
    },
  }) satisfies Routes;

searchRouter.get(getSearchRoutes().doc.urlModel, searchDocUtil);
