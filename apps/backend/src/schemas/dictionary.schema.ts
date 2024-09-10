import { Schema } from 'mongoose';
import type { Dictionary } from '@/types/dictionary.types';

export const dictionarySchema = new Schema<Dictionary>(
  {
    projectIds: {
      type: [Schema.Types.ObjectId],
      ref: 'Project',
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    content: {
      type: JSON,
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
