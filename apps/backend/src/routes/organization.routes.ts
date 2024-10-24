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
import { Routes } from '@/types/Routes';

export const organizationRouter: Router = Router();

export const organizationRoutes = {
  getOrganizations: {
    urlModel: '/',
    url: '/',
    method: 'GET',
  },
  addOrganization: {
    urlModel: '/',
    url: '/',
    method: 'POST',
  },
  updateOrganization: {
    urlModel: '/',
    url: '/',
    method: 'PUT',
  },
  updateOrganizationMembers: {
    urlModel: '/members',
    url: '/members',
    method: 'PUT',
  },
  addOrganizationMember: {
    urlModel: '/member',
    url: '/member',
    method: 'POST',
  },
  deleteOrganization: {
    urlModel: '/',
    url: '/',
    method: 'DELETE',
  },
  selectOrganization: {
    urlModel: '/:organizationId',
    url: ({ organizationId }: { organizationId: string }) =>
      `/${organizationId}`,
    method: 'PUT',
  },
  unselectOrganization: {
    urlModel: '/logout',
    url: '/logout',
    method: 'POST',
  },
} satisfies Routes;

organizationRouter.get(
  organizationRoutes.getOrganizations.urlModel,
  accessControlMiddleWare(AccessRule.authenticated),
  getOrganizations
);

organizationRouter.post(
  organizationRoutes.addOrganization.urlModel,
  accessControlMiddleWare(AccessRule.authenticated),
  addOrganization
);
organizationRouter.put(
  organizationRoutes.updateOrganization.urlModel,
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  updateOrganization
);
organizationRouter.put(
  organizationRoutes.updateOrganizationMembers.urlModel,
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  updateOrganizationMembers
);
organizationRouter.post(
  organizationRoutes.addOrganizationMember.urlModel,
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  addOrganizationMember
);
organizationRouter.delete(
  organizationRoutes.deleteOrganization.urlModel,
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  deleteOrganization
);
organizationRouter.put(
  organizationRoutes.selectOrganization.urlModel,
  accessControlMiddleWare([AccessRule.authenticated]),
  selectOrganization
);

organizationRouter.post(
  organizationRoutes.unselectOrganization.urlModel,
  accessControlMiddleWare([
    AccessRule.authenticated,
    AccessRule.hasOrganization,
  ]),
  unselectOrganization
);
