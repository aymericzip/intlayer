import {
  addOrganization,
  deleteOrganization,
  selectOrganization,
  getOrganizations,
  updateOrganization,
  updateOrganizationMembers,
  unselectOrganization,
  addOrganizationMember,
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
organizationRouter.put(
  '/members',
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  updateOrganizationMembers
);
organizationRouter.post(
  '/member',
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  addOrganizationMember
);
organizationRouter.delete(
  '/',
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
