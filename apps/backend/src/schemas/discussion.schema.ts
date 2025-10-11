import { Schema } from 'mongoose';
import type { DiscussionSchema } from '@/types/discussion.types';

export const discussionSchema = new Schema<DiscussionSchema>(
  {
    discussionId: {
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
        relatedFiles: {
          type: [String],
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

    toJSON: {
      virtuals: true, // keep the automatic `id` getter
      versionKey: false, // drop __v
      transform(_doc, ret: any) {
        const { _id, ...rest } = ret;
        return {
          ...rest,
          id: _id.toString(),
        };
      },
    },
    toObject: {
      virtuals: true,
      transform(_doc, ret: any) {
        const { _id, ...rest } = ret;
        return {
          ...rest,
          id: _id,
        };
      },
    },
  }
);
