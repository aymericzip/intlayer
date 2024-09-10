import {
  addProject,
  deleteProject,
  getProjects,
  updateProject,
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
  '/',
  apiAccessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  deleteProject
);
