import {
  MEMBERS_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '@utils/validation/validateOrganization';
import { Schema } from 'mongoose';
import type { Organization } from '@/types/organization.types';

export const organizationSchema = new Schema<Organization>(
  {
    name: {
      type: String,
      required: true,
      minlength: NAME_MIN_LENGTH,
      maxlength: NAME_MAX_LENGTH,
      description: 'The name of the organization',
      example: 'Intlayer',
    },
    membersIds: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      required: true,
      minlength: MEMBERS_MIN_LENGTH,
      description: 'The members of the organization',
      example: ['5f8d9f1d8a1c6c0d1f9e0e1e'],
    },
    plan: {
      type: String,
      required: true,
      enum: ['FREE', 'PREMIUM', 'ENTERPRISE'],
      default: 'FREE',
      description: 'The plan of the organization',
      example: 'FREE',
    },
    adminsIds: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      required: true,
      minlength: MEMBERS_MIN_LENGTH,
      description: 'The admins of the organization',
      example: ['5f8d9f1d8a1c6c0d1f9e0e1e'],
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      description: 'The creator of the organization',
      example: '5f8d9f1d8a1c6c0d1f9e0e1e',
    },
  },
  {
    timestamps: true,
  }
);
