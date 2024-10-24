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
import { accessControlMiddleWare, AccessRule } from '@utils/accessControl';
import { Router } from 'express';
import { Routes } from '@/types/Routes';

export const projectRouter: Router = Router();

export const projectRoutes = {
  getProjects: {
    urlModel: '/',
    url: '/',
    method: 'GET',
  },
  addProject: {
    urlModel: '/',
    url: '/',
    method: 'POST',
  },
  updateProject: {
    urlModel: '/',
    url: '/',
    method: 'PUT',
  },
  updateProjectMembers: {
    urlModel: '/members',
    url: '/members',
    method: 'PUT',
  },
  deleteProject: {
    urlModel: '/',
    url: '/',
    method: 'DELETE',
  },
  selectProject: {
    urlModel: '/:projectId',
    url: ({ projectId }: { projectId: string }) => `/${projectId}`,
    method: 'PUT',
  },
  unselectProject: {
    urlModel: '/logout',
    url: '/logout',
    method: 'POST',
  },
  addNewAccessKey: {
    urlModel: '/access_key',
    url: '/access_key',
    method: 'POST',
  },
  refreshAccessKey: {
    urlModel: '/access_key',
    url: '/access_key',
    method: 'PATCH',
  },
  deleteAccessKey: {
    urlModel: '/access_key',
    url: '/access_key',
    method: 'DELETE',
  },
} satisfies Routes;

projectRouter.get(
  projectRoutes.getProjects.urlModel,
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  getProjects
);

projectRouter.post(
  projectRoutes.addProject.urlModel,
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  addProject
);
projectRouter.put(
  projectRoutes.updateProject.urlModel,
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
    AccessRule.hasProject,
  ]),
  updateProject
);
projectRouter.put(
  projectRoutes.updateProjectMembers.urlModel,
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
    AccessRule.hasProject,
  ]),
  updateProjectMembers
);
projectRouter.delete(
  projectRoutes.deleteProject.urlModel,
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
    AccessRule.hasProject,
  ]),
  deleteProject
);

projectRouter.post(
  projectRoutes.addNewAccessKey.urlModel,
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
    AccessRule.hasProject,
  ]),
  addNewAccessKey
);

projectRouter.patch(
  projectRoutes.refreshAccessKey.urlModel,
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
    AccessRule.hasProject,
  ]),
  refreshAccessKey
);

projectRouter.delete(
  projectRoutes.deleteAccessKey.urlModel,
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
    AccessRule.hasProject,
  ]),
  deleteAccessKey
);

projectRouter.post(
  projectRoutes.unselectProject.urlModel,
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
    AccessRule.hasProject,
  ]),
  unselectProject
);

projectRouter.put(
  projectRoutes.selectProject.urlModel,
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  selectProject
);
