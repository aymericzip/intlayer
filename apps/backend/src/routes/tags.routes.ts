import {
  addTag,
  deleteTag,
  getTags,
  updateTag,
} from '@controllers/tag.controller';
import { Router } from 'express';
import { Routes } from '@/types/Routes';

export const tagRouter: Router = Router();

const baseURL = `${process.env.BACKEND_URL}/api/tag`;

export const tagRoutes = {
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
} satisfies Routes;

tagRouter.get(tagRoutes.getTags.urlModel, getTags);

tagRouter.post(tagRoutes.addTag.urlModel, addTag);
tagRouter.put(tagRoutes.updateTag.urlModel, updateTag);
tagRouter.delete(tagRoutes.deleteTag.urlModel, deleteTag);
