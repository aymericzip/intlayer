import {
  deleteShowcaseProjectHandler,
  getOtherShowcaseProjects,
  getShowcaseProjectById,
  getShowcaseProjects,
  scanShowcaseProject,
  submitShowcaseProject,
  toggleShowcaseDownvote,
  toggleShowcaseUpvote,
  updateShowcaseProjectHandler,
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
    toggleShowcaseUpvote: {
      urlModel: '/upvote',
      url: `${baseURL()}/upvote`,
      method: 'POST',
    },
    toggleShowcaseDownvote: {
      urlModel: '/downvote',
      url: `${baseURL()}/downvote`,
      method: 'POST',
    },
    getShowcaseProjectById: {
      urlModel: '/:projectId',
      url: ({ projectId }: { projectId: string }) =>
        `${baseURL()}/${projectId}`,
      method: 'GET',
    },
    scanShowcaseProject: {
      urlModel: '/:projectId/scan',
      url: ({ projectId }: { projectId: string }) =>
        `${baseURL()}/${projectId}/scan`,
      method: 'GET',
    },
    deleteShowcaseProject: {
      urlModel: '/:projectId',
      url: ({ projectId }: { projectId: string }) =>
        `${baseURL()}/${projectId}`,
      method: 'DELETE',
    },
    updateShowcaseProject: {
      urlModel: '/:projectId',
      url: ({ projectId }: { projectId: string }) =>
        `${baseURL()}/${projectId}`,
      method: 'PATCH',
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
    getShowcaseProjectRoutes().toggleShowcaseUpvote.urlModel,
    toggleShowcaseUpvote
  );
  fastify.post(
    getShowcaseProjectRoutes().toggleShowcaseDownvote.urlModel,
    toggleShowcaseDownvote
  );
  fastify.get(
    getShowcaseProjectRoutes().getShowcaseProjectById.urlModel,
    getShowcaseProjectById
  );
  fastify.get(
    getShowcaseProjectRoutes().scanShowcaseProject.urlModel,
    scanShowcaseProject
  );
  fastify.delete(
    getShowcaseProjectRoutes().deleteShowcaseProject.urlModel,
    deleteShowcaseProjectHandler
  );
  fastify.patch(
    getShowcaseProjectRoutes().updateShowcaseProject.urlModel,
    updateShowcaseProjectHandler
  );
};
