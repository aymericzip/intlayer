import {
  addOrganization,
  addOrganizationMember,
  deleteOrganization,
  deleteOrganizationByIdAdmin,
  getOrganizations,
  selectOrganization,
  unselectOrganization,
  updateOrganization,
  updateOrganizationMailerConfig,
  updateOrganizationMembers,
  updateOrganizationMembersById,
} from '@controllers/organization.controller';
import { organizationContract } from '@intlayer/backend-contract/organization';
import { registerContractRoutes } from '@utils/contract/registerContractRoutes';
import type { FastifyInstance } from 'fastify';

export const organizationRoute = organizationContract.prefix;

export const organizationRouter = async (fastify: FastifyInstance) => {
  registerContractRoutes(fastify, organizationContract, {
    getOrganizations,
    addOrganization,
    updateOrganization,
    updateOrganizationMailerConfig,
    updateOrganizationMembers,
    updateOrganizationMembersById,
    addOrganizationMember,
    deleteOrganization,
    selectOrganization,
    unselectOrganization,
    deleteOrganizationByIdAdmin,
  });
};
