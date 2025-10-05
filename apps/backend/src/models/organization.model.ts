import { organizationSchema } from '@schemas/organization.schema';
import { model } from 'mongoose';
import type {
  OrganizationModelType,
  OrganizationSchema,
} from '@/types/organization.types';

export const OrganizationModel = model<
  OrganizationSchema,
  OrganizationModelType
>('organization', organizationSchema);
