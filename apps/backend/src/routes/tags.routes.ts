import type { Routes } from '@/types/Routes';
import {
  addTag,
  deleteTag,
  getTags,
  updateTag,
} from '@controllers/tag.controller';
import { Router } from 'express';

export const tagRouter: Router = Router();

export const tagRoute = '/api/tag';

const baseURL = () => `${process.env.BACKEND_URL}${tagRoute}`;

export const getTagRoutes = () =>
  ({
    getTags: {
      urlModel: '/',
      url: baseURL(),
      method: 'GET',
    },
    addTag: {
      urlModel: '/',
      url: baseURL(),
      method: 'POST',
    },
    updateTag: {
      urlModel: '/:tagId',
      url: ({ tagId }: { tagId: string }) => `${baseURL()}/${tagId}`,
      method: 'PUT',
    },
    deleteTag: {
      urlModel: '/:tagId',
      url: ({ tagId }: { tagId: string }) => `${baseURL()}/${tagId}`,
      method: 'DELETE',
    },
  }) satisfies Routes;

tagRouter.get(getTagRoutes().getTags.urlModel, getTags);
tagRouter.post(getTagRoutes().addTag.urlModel, addTag);
tagRouter.put(getTagRoutes().updateTag.urlModel, updateTag);
tagRouter.delete(getTagRoutes().deleteTag.urlModel, deleteTag);
