import type { Session } from '@/types/session.types';
import { Schema } from 'mongoose';

export const sessionSchema = new Schema<Session>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    expires: {
      type: Date,
      required: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    organizationId: {
      type: String,
      required: false,
    },
    projectId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
