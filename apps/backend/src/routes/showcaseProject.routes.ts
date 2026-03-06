import {
  getOtherShowcaseProjects,
  getShowcaseProjectById,
  getShowcaseProjects,
  submitShowcaseProject,
  toggleShowcaseLike,
} from '@controllers/showcaseProject.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const showcaseProjectRoute = '/api/showcase-project';

const baseURL = () => `${process.env.BACKEND_URL}${showcaseProjectRoute}`;

export const getShowcaseProjectRoutes = () =>
  ({
    getShowcaseProjects: {
      urlModel: '/',
      url: baseURL(),
      method: 'GET',
    },
    submitShowcaseProject: {
      urlModel: '/submit',
      url: `${baseURL()}/submit`,
      method: 'POST',
    },
    getOtherShowcaseProjects: {
      urlModel: '/others',
      url: `${baseURL()}/others`,
      method: 'GET',
    },
    toggleShowcaseLike: {
      urlModel: '/like',
      url: `${baseURL()}/like`,
      method: 'POST',
    },
    getShowcaseProjectById: {
      urlModel: '/:projectId',
      url: ({ projectId }: { projectId: string }) =>
        `${baseURL()}/${projectId}`,
      method: 'GET',
    },
  }) satisfies Routes;

export const showcaseProjectRouter = async (fastify: FastifyInstance) => {
  fastify.get(
    getShowcaseProjectRoutes().getShowcaseProjects.urlModel,
    getShowcaseProjects
  );
  fastify.post(
    getShowcaseProjectRoutes().submitShowcaseProject.urlModel,
    submitShowcaseProject
  );
  fastify.get(
    getShowcaseProjectRoutes().getOtherShowcaseProjects.urlModel,
    getOtherShowcaseProjects
  );
  fastify.post(
    getShowcaseProjectRoutes().toggleShowcaseLike.urlModel,
    toggleShowcaseLike
  );
  fastify.get(
    getShowcaseProjectRoutes().getShowcaseProjectById.urlModel,
    getShowcaseProjectById
  );
};
