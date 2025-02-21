import {
  addTag,
  deleteTag,
  getTags,
  updateTag,
} from '@controllers/tag.controller';
import { Router } from 'express';
import type { Routes } from '@/types/Routes';

export const tagRouter: Router = Router();

const baseURL = () => `${process.env.BACKEND_URL}/api/tag`;

export const getTagRoutes = () =>
  ({
    getTags: {
      urlModel: '/',
      url: baseURL,
      method: 'GET',
    },
    addTag: {
      urlModel: '/',
      url: baseURL,
      method: 'POST',
    },
    updateTag: {
      urlModel: '/:tagId',
      url: ({ tagId }: { tagId: string }) => `${baseURL}/${tagId}`,
      method: 'PUT',
    },
    deleteTag: {
      urlModel: '/:tagId',
      url: ({ tagId }: { tagId: string }) => `${baseURL}/${tagId}`,
      method: 'DELETE',
    },
  }) satisfies Routes;

tagRouter.get(getTagRoutes().getTags.urlModel, getTags);

tagRouter.post(getTagRoutes().addTag.urlModel, addTag);
tagRouter.put(getTagRoutes().updateTag.urlModel, updateTag);
tagRouter.delete(getTagRoutes().deleteTag.urlModel, deleteTag);
