import {
  addOrganization,
  addOrganizationMember,
  deleteOrganization,
  getOrganizations,
  selectOrganization,
  unselectOrganization,
  updateOrganization,
  updateOrganizationMembers,
  updateOrganizationMembersById,
} from '@controllers/organization.controller';
import type { FastifyInstance } from 'fastify';
import type { Routes } from '@/types/Routes';

export const organizationRoute = '/api/organization';

const baseURL = () => `${process.env.BACKEND_URL}${organizationRoute}`;

export const getOrganizationRoutes = () =>
  ({
    getOrganizations: {
      urlModel: '/',
      url: baseURL(),
      method: 'GET',
    },
    addOrganization: {
      urlModel: '/',
      url: baseURL(),
      method: 'POST',
    },
    updateOrganization: {
      urlModel: '/',
      url: baseURL(),

      method: 'PUT',
    },
    updateOrganizationMembers: {
      urlModel: '/members',
      url: `${baseURL()}/members`,
      method: 'PUT',
    },
    updateOrganizationMembersById: {
      urlModel: '/:organizationId/members',
      url: ({ organizationId }: { organizationId: string }) =>
        `${baseURL()}/${organizationId}/members`,
      method: 'PUT',
    },
    addOrganizationMember: {
      urlModel: '/member',
      url: `${baseURL()}/member`,
      method: 'POST',
    },
    deleteOrganization: {
      urlModel: '/',
      url: baseURL(),
      method: 'DELETE',
    },
    selectOrganization: {
      urlModel: '/:organizationId',
      url: ({ organizationId }: { organizationId: string }) =>
        `${baseURL()}/${organizationId}`,
      method: 'PUT',
    },
    unselectOrganization: {
      urlModel: '/logout',
      url: `${baseURL()}/logout`,
      method: 'POST',
    },
  }) satisfies Routes;

export const organizationRouter = async (fastify: FastifyInstance) => {
  fastify.get(
    getOrganizationRoutes().getOrganizations.urlModel,
    getOrganizations
  );
  fastify.post(
    getOrganizationRoutes().addOrganization.urlModel,
    addOrganization
  );
  fastify.put(
    getOrganizationRoutes().updateOrganization.urlModel,
    updateOrganization
  );
  fastify.put(
    getOrganizationRoutes().updateOrganizationMembers.urlModel,
    updateOrganizationMembers
  );
  fastify.put(
    getOrganizationRoutes().updateOrganizationMembersById.urlModel,
    updateOrganizationMembersById
  );
  fastify.post(
    getOrganizationRoutes().addOrganizationMember.urlModel,
    addOrganizationMember
  );
  fastify.delete(
    getOrganizationRoutes().deleteOrganization.urlModel,
    deleteOrganization
  );
  fastify.put(
    getOrganizationRoutes().selectOrganization.urlModel,
    selectOrganization
  );
  fastify.post(
    getOrganizationRoutes().unselectOrganization.urlModel,
    unselectOrganization
  );
};
