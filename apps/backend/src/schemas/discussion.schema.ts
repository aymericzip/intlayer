import type { Discussion } from '@/types/discussion.types';
import { Schema } from 'mongoose';

export const discussionSchema = new Schema<Discussion>(
  {
    discutionId: {
      type: String,
      required: true,
      unique: true,
    },
    messages: [
      {
        role: {
          type: String,
          required: true,
          enum: ['user', 'assistant', 'system'],
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'project',
      required: true,
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'organization',
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
