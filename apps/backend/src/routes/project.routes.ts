import {
  addProject,
  deleteProject,
  getProjects,
  updateProject,
  selectProject,
  unselectProject,
} from '@controllers/project.controller';
import {
  apiAccessControlMiddleWare,
  AccessRule,
} from '@utils/apiAccessControl';
import { Router } from 'express';

export const projectRouter: Router = Router();

projectRouter.get(
  '/',
  apiAccessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  getProjects
);

projectRouter.post(
  '/',
  apiAccessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  addProject
);
projectRouter.put(
  '/',
  apiAccessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
    AccessRule.hasProject,
  ]),
  updateProject
);
projectRouter.delete(
  '/:projectId',
  apiAccessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
    AccessRule.hasProject,
  ]),
  deleteProject
);
projectRouter.put(
  '/:projectId',
  apiAccessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  selectProject
);

projectRouter.post(
  '/logout',
  apiAccessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
    AccessRule.hasProject,
  ]),
  unselectProject
);
