import {
  addProject,
  deleteProject,
  getProjects,
  updateProject,
  selectProject,
  unselectProject,
} from '@controllers/project.controller';
import {
  addNewAccessKey,
  deleteAccessKey,
  refreshAccessKey,
} from '@controllers/projectAccessKey.controller';
import { accessControlMiddleWare, AccessRule } from '@utils/accessControl';
import { Router } from 'express';

export const projectRouter: Router = Router();

projectRouter.get(
  '/',
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  getProjects
);

projectRouter.post(
  '/',
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  addProject
);
projectRouter.put(
  '/',
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
    AccessRule.hasProject,
  ]),
  updateProject
);

projectRouter.post(
  '/access_key',
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
    AccessRule.hasProject,
  ]),
  addNewAccessKey
);

projectRouter.patch(
  '/access_key',
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
    AccessRule.hasProject,
  ]),
  refreshAccessKey
);

projectRouter.delete(
  '/access_key',
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
    AccessRule.hasProject,
  ]),
  deleteAccessKey
);

projectRouter.post(
  '/logout',
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
    AccessRule.hasProject,
  ]),
  unselectProject
);

projectRouter.delete(
  '/:projectId',
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
    AccessRule.hasProject,
  ]),
  deleteProject
);
projectRouter.put(
  '/:projectId',
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  selectProject
);
