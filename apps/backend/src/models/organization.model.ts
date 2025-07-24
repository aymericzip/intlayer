import type {
  OrganizationModelType,
  OrganizationSchema,
} from '@/types/organization.types';
import { organizationSchema } from '@schemas/organization.schema';
import { model } from 'mongoose';

export const OrganizationModel = model<
  OrganizationSchema,
  OrganizationModelType
>('organization', organizationSchema);
