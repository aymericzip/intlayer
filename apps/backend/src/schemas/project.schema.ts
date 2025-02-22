import { Locales } from '@intlayer/config';
import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  MEMBERS_MIN_LENGTH,
} from '@utils/validation/validateProject';
import { Schema } from 'mongoose';
import type { Project, Rights, TokenRights } from '@/types/project.types';

const RightsSchema = new Schema<Rights>({
  read: { type: Boolean, required: true },
  write: { type: Boolean, required: true },
  admin: { type: Boolean, required: true },
});

export const TokenRightsSchema = new Schema<TokenRights>({
  dictionary: { type: RightsSchema, required: true },
  project: { type: RightsSchema, required: true },
  organization: { type: RightsSchema, required: true },
});

// Define the oAuth2Access subdocument schema with timestamps
const oAuth2AccessSchema = new Schema(
  {
    clientId: { type: String, required: true },
    clientSecret: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    expiresAt: { type: Date },
    accessToken: { type: [String], required: true, default: [] },
    rights: { type: TokenRightsSchema, required: true },
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

export const projectSchema = new Schema<Project>(
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
  }
);
