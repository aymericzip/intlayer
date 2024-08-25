import { organizationSchema } from '@schemas/organization.schema';
import type { Organization } from '@types/organization.type';
import { model } from 'mongoose';

export const OrganizationModel = model<Organization>(
  'organization',
  organizationSchema
);
