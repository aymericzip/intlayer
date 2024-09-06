import {
  addOrganization,
  deleteOrganization,
  getOrganizations,
  updateOrganization,
} from '@controllers/organization.controller';
import { Router } from 'express';

export const organizationRouter: Router = Router();

organizationRouter.get('/', getOrganizations);

organizationRouter.post('/', addOrganization);
organizationRouter.put('/', updateOrganization);
organizationRouter.delete('/', deleteOrganization);
