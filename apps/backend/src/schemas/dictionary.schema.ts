import { Schema } from 'mongoose';
import type {
  DictionarySchema,
  VersionedContentEl,
} from '@/types/dictionary.types';

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

export const dictionarySchema = new Schema<DictionarySchema>(
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
          id: _id.toString(),
        };
      },
    },
  }
);
