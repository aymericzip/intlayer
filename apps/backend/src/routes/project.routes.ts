import type { Routes } from '@/types/Routes';
import {
  addProject,
  deleteProject,
  getProjects,
  pushProjectConfiguration,
  selectProject,
  unselectProject,
  updateProject,
  updateProjectMembers,
} from '@controllers/project.controller';
import {
  addNewAccessKey,
  deleteAccessKey,
  refreshAccessKey,
} from '@controllers/projectAccessKey.controller';
import { Router } from 'express';

export const projectRouter: Router = Router();

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
  }) satisfies Routes;

projectRouter.get(getProjectRoutes().getProjects.urlModel, getProjects as any);

projectRouter.post(getProjectRoutes().addProject.urlModel, addProject as any);
projectRouter.put(
  getProjectRoutes().updateProject.urlModel,
  updateProject as any
);
projectRouter.put(
  getProjectRoutes().updateProjectMembers.urlModel,
  updateProjectMembers as any
);
projectRouter.put(
  getProjectRoutes().pushProjectConfiguration.urlModel,
  pushProjectConfiguration as any
);
projectRouter.delete(
  getProjectRoutes().deleteProject.urlModel,
  deleteProject as any
);

projectRouter.post(
  getProjectRoutes().addNewAccessKey.urlModel,
  addNewAccessKey as any
);

projectRouter.patch(
  getProjectRoutes().refreshAccessKey.urlModel,
  refreshAccessKey as any
);

projectRouter.delete(
  getProjectRoutes().deleteAccessKey.urlModel,
  deleteAccessKey as any
);

projectRouter.post(
  getProjectRoutes().unselectProject.urlModel,
  unselectProject as any
);

projectRouter.put(
  getProjectRoutes().selectProject.urlModel,
  selectProject as any
);
