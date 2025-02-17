import { Schema } from 'mongoose';
import type { Dictionary, VersionedContentEl } from '@/types/dictionary.types';

const versionedContentElSchema = new Schema<VersionedContentEl>(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    content: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

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
    tags: {
      type: [String],
      default: [],
    },
    content: {
      type: Map,
      of: versionedContentElSchema,
      required: true,
      default: null,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    filePath: {
      type: Map,
      of: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
