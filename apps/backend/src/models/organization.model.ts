import type { Organization } from '@/types/organization.types';
import { organizationSchema } from '@schemas/organization.schema';
import { RenameId } from '@schemas/user.schema';
import { Model, model } from 'mongoose';

export const OrganizationModel = model<
  RenameId<Organization>,
  Model<Organization>
>('organization', organizationSchema);
