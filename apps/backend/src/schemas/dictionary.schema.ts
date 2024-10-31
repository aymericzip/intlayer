import { Schema } from 'mongoose';
import type { Dictionary } from '@/types/dictionary.types';

export const dictionarySchema = new Schema<Dictionary>(
  {
    projectIds: {
      type: [Schema.Types.ObjectId],
      ref: 'Project',
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    version: {
      type: Number,
      default: 1,
    },
    content: {
      type: Schema.Types.Mixed,
      required: true,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
