/* eslint-disable sonarjs/no-misused-promises */
import {
  addOrganization,
  deleteOrganization,
  selectOrganization,
  getOrganizations,
  updateOrganization,
  unselectOrganization,
} from '@controllers/organization.controller';
import { accessControlMiddleWare, AccessRule } from '@utils/accessControl';
import { Router } from 'express';

export const organizationRouter: Router = Router();

organizationRouter.get(
  '/',
  accessControlMiddleWare(AccessRule.authenticated),
  getOrganizations
);

organizationRouter.post(
  '/',
  accessControlMiddleWare(AccessRule.authenticated),
  addOrganization
);
organizationRouter.put(
  '/',
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  updateOrganization
);
organizationRouter.delete(
  '/:organizationId',
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  deleteOrganization
);
organizationRouter.put(
  '/:organizationId',
  accessControlMiddleWare([AccessRule.authenticated]),
  selectOrganization
);

organizationRouter.post(
  '/logout',
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  unselectOrganization
);
