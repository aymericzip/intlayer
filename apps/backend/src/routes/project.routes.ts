import {
  addProject,
  deleteProject,
  getProjects,
  updateProject,
  selectProject,
  unselectProject,
  updateProjectMembers,
} from '@controllers/project.controller';
import {
  addNewAccessKey,
  deleteAccessKey,
  refreshAccessKey,
} from '@controllers/projectAccessKey.controller';
import { Router } from 'express';
import { Routes } from '@/types/Routes';

export const projectRouter: Router = Router();

const baseURL = `${process.env.CLIENT_URL}/api/project`;

export const projectRoutes = {
  getProjects: {
    urlModel: '/',
    url: baseURL,
    method: 'GET',
  },
  addProject: {
    urlModel: '/',
    url: baseURL,
    method: 'POST',
  },
  updateProject: {
    urlModel: '/',
    url: baseURL,
    method: 'PUT',
  },
  updateProjectMembers: {
    urlModel: '/members',
    url: `${process.env.CLIENT_URL}/api/members`,
    method: 'PUT',
  },
  deleteProject: {
    urlModel: '/',
    url: baseURL,
    method: 'DELETE',
  },
  selectProject: {
    urlModel: '/:projectId',
    url: ({ projectId }: { projectId: string }) => `${baseURL}/${projectId}`,
    method: 'PUT',
  },
  unselectProject: {
    urlModel: '/logout',
    url: `${baseURL}/logout`,
    method: 'POST',
  },
  addNewAccessKey: {
    urlModel: '/access_key',
    url: `${baseURL}/access_key`,
    method: 'POST',
  },
  refreshAccessKey: {
    urlModel: '/access_key',
    url: `${baseURL}/access_key`,
    method: 'PATCH',
  },
  deleteAccessKey: {
    urlModel: '/access_key',
    url: `${baseURL}/access_key`,
    method: 'DELETE',
  },
} satisfies Routes;

projectRouter.get(projectRoutes.getProjects.urlModel, getProjects);

projectRouter.post(projectRoutes.addProject.urlModel, addProject);
projectRouter.put(projectRoutes.updateProject.urlModel, updateProject);
projectRouter.put(
  projectRoutes.updateProjectMembers.urlModel,
  updateProjectMembers
);
projectRouter.delete(projectRoutes.deleteProject.urlModel, deleteProject);

projectRouter.post(projectRoutes.addNewAccessKey.urlModel, addNewAccessKey);

projectRouter.patch(projectRoutes.refreshAccessKey.urlModel, refreshAccessKey);

projectRouter.delete(projectRoutes.deleteAccessKey.urlModel, deleteAccessKey);

projectRouter.post(projectRoutes.unselectProject.urlModel, unselectProject);

projectRouter.put(projectRoutes.selectProject.urlModel, selectProject);
