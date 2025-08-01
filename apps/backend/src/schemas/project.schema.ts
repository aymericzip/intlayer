import type {
  OAuth2Access,
  Project,
  ProjectSchema,
} from '@/types/project.types';
import { Locales } from '@intlayer/config';
import type { RenameId } from '@utils/mongoDB/types';
import {
  MEMBERS_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '@utils/validation/validateProject';
import { Schema } from 'mongoose';

// Define the oAuth2Access subdocument schema with timestamps
const oAuth2AccessSchema = new Schema<RenameId<OAuth2Access>>(
  {
    clientId: { type: String, required: true },
    clientSecret: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    expiresAt: { type: Date },
    accessToken: { type: [String], required: true, default: [] },
    grants: { type: [String], required: true, default: [] },
  },
  {
    timestamps: true,
  }
);

const projectConfigSchema = new Schema<Project['configuration']>(
  {
    internationalization: {
      locales: {
        type: [String],
        enum: Object.values(Locales),
        required: true,
      },
      defaultLocale: {
        type: String,
        enum: Object.values(Locales),
      },
    },
    editor: {
      applicationURL: {
        type: String,
      },
      cmsURL: {
        type: String,
      },
    },
  },
  {
    _id: false, // Prevents the generation of an _id field for this subdocument
  }
);

export const projectSchema = new Schema<ProjectSchema>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: NAME_MIN_LENGTH,
      maxlength: NAME_MAX_LENGTH,
    },
    configuration: projectConfigSchema,
    oAuth2Access: [oAuth2AccessSchema],
    membersIds: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      required: true,
      minlength: MEMBERS_MIN_LENGTH,
    },
    adminsIds: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      required: true,
      minlength: MEMBERS_MIN_LENGTH,
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
      transform(doc, ret) {
        ret.id = ret._id.toString(); // convert _id to id
        delete ret._id; // remove _id
      },
    },
    toObject: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id; // convert _id to id
        delete ret._id; // remove _id
      },
    },
  }
);
