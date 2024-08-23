import {
  addOrganization,
  deleteOrganization,
  getOrganizations,
  updateOrganization,
} from '@controllers/organization.controller';
import { Router } from 'express';

export const organizationRouter = Router();

organizationRouter.get('/', getOrganizations);

organizationRouter.post('/', addOrganization);
organizationRouter.put('/', updateOrganization);
organizationRouter.delete('/', deleteOrganization);
