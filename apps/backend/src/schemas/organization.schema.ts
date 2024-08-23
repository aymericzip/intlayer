import { Schema } from 'mongoose';
import type { Organization } from './organization.type';

export const organizationSchema = new Schema<Organization>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
