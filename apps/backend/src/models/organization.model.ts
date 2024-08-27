import { organizationSchema } from '@schemas/organization.schema';
import { model } from 'mongoose';
import type { Organization } from '@/types/organization.types';

export const OrganizationModel = model<Organization>(
  'organization',
  organizationSchema
);
