import {
  addProject,
  deleteProject,
  getCIConfiguration,
  getProjects,
  pushCIConfiguration,
  pushProjectConfiguration,
  selectProject,
  triggerBuild,
  triggerWebhook,
  unselectProject,
  updateProject,
  updateProjectMembers,
} from '@controllers/project.controller';
import {
  addNewAccessKey,
  deleteAccessKey,
  refreshAccessKey,
} from '@controllers/projectAccessKey.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const projectRoute = '/api/project';

const baseURL = () => `${process.env.BACKEND_URL}${projectRoute}`;

export const getProjectRoutes = () =>
  ({
    getProjects: {
      urlModel: '/',
      url: baseURL(),
      method: 'GET',
    },
    addProject: {
      urlModel: '/',
      url: baseURL(),
      method: 'POST',
    },
    updateProject: {
      urlModel: '/',
      url: baseURL(),
      method: 'PUT',
    },
    updateProjectMembers: {
      urlModel: '/members',
      url: `${baseURL()}/members`,
      method: 'PUT',
    },
    pushProjectConfiguration: {
      urlModel: '/configuration',
      url: `${baseURL()}/configuration`,
      method: 'PUT',
    },
    deleteProject: {
      urlModel: '/',
      url: baseURL(),
      method: 'DELETE',
    },
    selectProject: {
      urlModel: '/:projectId',
      url: ({ projectId }: { projectId: string }) =>
        `${baseURL()}/${projectId}`,
      method: 'PUT',
    },
    unselectProject: {
      urlModel: '/logout',
      url: `${baseURL()}/logout`,
      method: 'POST',
    },
    addNewAccessKey: {
      urlModel: '/access_key',
      url: `${baseURL()}/access_key`,
      method: 'POST',
    },
    refreshAccessKey: {
      urlModel: '/access_key',
      url: `${baseURL()}/access_key`,
      method: 'PATCH',
    },
    deleteAccessKey: {
      urlModel: '/access_key',
      url: `${baseURL()}/access_key`,
      method: 'DELETE',
    },
    triggerBuild: {
      urlModel: '/build',
      url: `${baseURL()}/build`,
      method: 'POST',
    },
    triggerWebhook: {
      urlModel: '/webhook',
      url: `${baseURL()}/webhook`,
      method: 'POST',
    },
    getCIConfiguration: {
      urlModel: '/ci',
      url: `${baseURL()}/ci`,
      method: 'GET',
    },
    pushCIConfiguration: {
      urlModel: '/ci',
      url: `${baseURL()}/ci`,
      method: 'POST',
    },
  }) satisfies Routes;

export const projectRouter = async (fastify: FastifyInstance) => {
  fastify.get(getProjectRoutes().getProjects.urlModel, getProjects);
  fastify.post(getProjectRoutes().addProject.urlModel, addProject);
  fastify.put(getProjectRoutes().updateProject.urlModel, updateProject);
  fastify.put(
    getProjectRoutes().updateProjectMembers.urlModel,
    updateProjectMembers
  );
  fastify.put(
    getProjectRoutes().pushProjectConfiguration.urlModel,
    pushProjectConfiguration
  );
  fastify.delete(getProjectRoutes().deleteProject.urlModel, deleteProject);
  fastify.post(getProjectRoutes().addNewAccessKey.urlModel, addNewAccessKey);
  fastify.patch(getProjectRoutes().refreshAccessKey.urlModel, refreshAccessKey);
  fastify.delete(getProjectRoutes().deleteAccessKey.urlModel, deleteAccessKey);
  fastify.post(getProjectRoutes().unselectProject.urlModel, unselectProject);
  fastify.put(getProjectRoutes().selectProject.urlModel, selectProject);
  fastify.post(getProjectRoutes().triggerBuild.urlModel, triggerBuild);
  fastify.post(getProjectRoutes().triggerWebhook.urlModel, triggerWebhook);
  fastify.get(
    getProjectRoutes().getCIConfiguration.urlModel,
    getCIConfiguration
  );
  fastify.post(
    getProjectRoutes().pushCIConfiguration.urlModel,
    pushCIConfiguration
  );
};
