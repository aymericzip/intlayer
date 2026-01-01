import {
  addTag,
  deleteTag,
  getTags,
  updateTag,
} from '@controllers/tag.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

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

export const tagRouter = async (fastify: FastifyInstance) => {
  fastify.get(getTagRoutes().getTags.urlModel, getTags);
  fastify.post(getTagRoutes().addTag.urlModel, addTag);
  fastify.put(getTagRoutes().updateTag.urlModel, updateTag);
  fastify.delete(getTagRoutes().deleteTag.urlModel, deleteTag);
};
