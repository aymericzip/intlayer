import { Schema } from 'mongoose';
import type { DiscussionSchema } from '@/types/discussion.types';

export const discussionSchema = new Schema<DiscussionSchema>(
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

    toJSON: {
      virtuals: true, // keep the automatic `id` getter
      versionKey: false, // drop __v
      transform(doc, ret: any) {
        ret.id = ret._id.toString(); // convert _id to id
        delete ret._id; // remove _id
      },
    },
    toObject: {
      virtuals: true,
      transform(doc, ret: any) {
        ret.id = ret._id; // convert _id to id
        delete ret._id; // remove _id
      },
    },
  }
);
