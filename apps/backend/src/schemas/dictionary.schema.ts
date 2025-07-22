import type {
  DictionarySchema,
  VersionedContentEl,
} from '@/types/dictionary.types';
import { Schema } from 'mongoose';

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
    _id: {
      type: Schema.Types.ObjectId,
      alias: 'id',
    },
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

    toJSON: {
      virtuals: true, // keep the automatic `id` getter
      versionKey: false, // drop __v
      transform(doc, ret) {
        ret.id = ret.id.toString(); // or rely on the virtual
        delete ret.id; // remove _id
      },
    },
    toObject: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret.id.toString();
        delete ret.id;
      },
    },
  }
);
