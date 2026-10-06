import type { RenameId } from '@utils/mongoDB/types';
import { type Model, model, Schema } from 'mongoose';
import type {
  Dictionary,
  DictionarySchema,
  DictionarySourceSync,
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

const dictionarySourceSyncSchema = new Schema<DictionarySourceSync>(
  {
    status: {
      type: String,
      enum: [
        'committed',
        'pull-request',
        'up-to-date',
        'file-not-found',
        'unsupported',
        'error',
      ],
      required: true,
    },
    url: { type: String },
    commitSha: { type: String },
    message: { type: String },
    syncedAt: { type: Date, required: true },
  },
  { _id: false }
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
    // Qualifier coordinates of collections / variants. Sibling dictionaries
    // sharing a `key` are distinguished by these; persisting them lets the build
    // re-merge remote dictionaries into a qualified group. `variant` is a named
    // string or a structured object, hence `Mixed`.
    variant: {
      type: Schema.Types.Mixed,
      default: undefined,
    },
    item: {
      type: Number,
      default: undefined,
    },
    importMode: {
      type: String,
      enum: ['static', 'dynamic', 'fetch'],
      default: undefined,
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
    environmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      default: null,
    },
    // Source declaration of the dictionary in the codebase (pushed by the CLI)
    location: {
      type: String,
      default: undefined,
    },
    filePath: {
      type: String,
      default: undefined,
    },
    sourceSync: {
      type: dictionarySourceSyncSchema,
      default: undefined,
    },
  },
  {
    timestamps: true,

    toJSON: {
      virtuals: true, // keep the automatic `id` getter
      versionKey: false, // drop __v
      transform(_doc, ret: Record<string, unknown>) {
        const { _id, ...rest } = ret;
        return {
          ...rest,
          id: String(_id),
        };
      },
    },
    toObject: {
      virtuals: true,
      transform(_doc, ret: Record<string, unknown>) {
        const { _id, ...rest } = ret;
        return {
          ...rest,
          id: _id,
        };
      },
    },
  }
);

export const DictionaryModel = model<RenameId<Dictionary>, Model<Dictionary>>(
  'dictionary',
  dictionarySchema
);
