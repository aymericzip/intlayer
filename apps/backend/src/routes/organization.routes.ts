import type { Routes } from '@/types/Routes';
import {
  addOrganization,
  addOrganizationMember,
  deleteOrganization,
  getOrganizations,
  selectOrganization,
  unselectOrganization,
  updateOrganization,
  updateOrganizationMembers,
} from '@controllers/organization.controller';
import { Router } from 'express';

export const organizationRouter: Router = Router();

export const organizationRoute = '/api/organization';

const baseURL = () => `${process.env.BACKEND_URL}${organizationRoute}`;

export const getOrganizationRoutes = () =>
  ({
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
  }) satisfies Routes;

organizationRouter.get(
  getOrganizationRoutes().getOrganizations.urlModel,
  getOrganizations
);

organizationRouter.post(
  getOrganizationRoutes().addOrganization.urlModel,
  addOrganization
);
organizationRouter.put(
  getOrganizationRoutes().updateOrganization.urlModel,
  updateOrganization
);
organizationRouter.put(
  getOrganizationRoutes().updateOrganizationMembers.urlModel,
  updateOrganizationMembers
);
organizationRouter.post(
  getOrganizationRoutes().addOrganizationMember.urlModel,
  addOrganizationMember
);
organizationRouter.delete(
  getOrganizationRoutes().deleteOrganization.urlModel,
  deleteOrganization
);
organizationRouter.put(
  getOrganizationRoutes().selectOrganization.urlModel,
  selectOrganization
);

organizationRouter.post(
  getOrganizationRoutes().unselectOrganization.urlModel,
  unselectOrganization
);
