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
import { Router } from 'express';
import type { Routes } from '@/types/Routes';

export const organizationRouter: Router = Router();

const baseURL = `${process.env.BACKEND_URL}/api/organization`;

export const organizationRoutes = {
  getOrganizations: {
    urlModel: '/',
    url: baseURL,
    method: 'GET',
  },
  addOrganization: {
    urlModel: '/',
    url: baseURL,
    method: 'POST',
  },
  updateOrganization: {
    urlModel: '/',
    url: baseURL,

    method: 'PUT',
  },
  updateOrganizationMembers: {
    urlModel: '/members',
    url: `${baseURL}/members`,
    method: 'PUT',
  },
  addOrganizationMember: {
    urlModel: '/member',
    url: `${baseURL}/member`,
    method: 'POST',
  },
  deleteOrganization: {
    urlModel: '/',
    url: baseURL,
    method: 'DELETE',
  },
  selectOrganization: {
    urlModel: '/:organizationId',
    url: ({ organizationId }: { organizationId: string }) =>
      `${baseURL}/${organizationId}`,
    method: 'PUT',
  },
  unselectOrganization: {
    urlModel: '/logout',
    url: `${baseURL}/logout`,
    method: 'POST',
  },
} satisfies Routes;

organizationRouter.get(
  organizationRoutes.getOrganizations.urlModel,
  getOrganizations
);

organizationRouter.post(
  organizationRoutes.addOrganization.urlModel,
  addOrganization
);
organizationRouter.put(
  organizationRoutes.updateOrganization.urlModel,
  updateOrganization
);
organizationRouter.put(
  organizationRoutes.updateOrganizationMembers.urlModel,
  updateOrganizationMembers
);
organizationRouter.post(
  organizationRoutes.addOrganizationMember.urlModel,
  addOrganizationMember
);
organizationRouter.delete(
  organizationRoutes.deleteOrganization.urlModel,
  deleteOrganization
);
organizationRouter.put(
  organizationRoutes.selectOrganization.urlModel,
  selectOrganization
);

organizationRouter.post(
  organizationRoutes.unselectOrganization.urlModel,
  unselectOrganization
);
