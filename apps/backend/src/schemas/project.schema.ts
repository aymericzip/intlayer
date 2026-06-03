import { ALL_LOCALES } from '@intlayer/types/allLocales';
import { AiProviders } from '@intlayer/types/config';
import type { RenameId } from '@utils/mongoDB/types';
import {
  MEMBERS_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '@utils/validation/validateProject';
import { model, Schema } from 'mongoose';
import type {
  Environment,
  OAuth2Access,
  Project,
  ProjectModelType,
  ProjectSchema,
} from '@/types/project.types';

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
    allowedEnvironmentIds: { type: Schema.Types.Mixed, default: null },
    allowedLocales: { type: [String], default: null },
  },
  {
    timestamps: true,
  }
);

const memberAccessSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    allowedEnvironmentIds: { type: Schema.Types.Mixed, default: null },
    allowedLocales: { type: [String], default: null },
  },
  { _id: false }
);

// Schema for generic webhooks (Vercel, Netlify, Custom, etc.)
const webhookSchema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    secret: { type: String }, // Optional signature secret
  },
  { _id: true }
);

const projectConfigSchema = new Schema<Project['configuration']>(
  {
    internationalization: {
      locales: {
        type: [String],
        enum: Object.values(ALL_LOCALES),
        required: true,
      },
      defaultLocale: {
        type: String,
        enum: Object.values(ALL_LOCALES),
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
    ai: {
      provider: {
        type: String,
        enum: Object.values(AiProviders),
      },
      model: {
        type: String,
      },
      apiKey: {
        type: String,
      },
      applicationContext: {
        type: String,
      },
      baseURL: {
        type: String,
      },
    },
  },
  {
    _id: false, // Prevents the generation of an _id field for this subdocument
  }
);

// Schema for webhooks/CI configuration (top-level project property, not part of configuration)
const webhooksConfigSchema = new Schema<Project['webhooks']>(
  {
    autoTriggerBuilds: { type: Boolean, default: false }, // Master toggle
    webhooks: [webhookSchema], // Generic hooks (Vercel, Netlify, Custom)
  },
  {
    _id: false,
  }
);

const repositorySchema = new Schema<Project['repository']>(
  {
    provider: {
      type: String,
      enum: ['github', 'gitlab', 'bitbucket'],
      required: true,
    },
    owner: { type: String, required: true },
    repository: { type: String, required: true },
    branch: { type: String, default: 'main' },
    url: { type: String, required: true },
    configFilePath: { type: String, required: true },
    token: { type: String }, // Repo-scoped OAuth token for CI operations
    // GitHub specific
    installationId: { type: Number },
    // GitLab specific
    projectId: { type: Number },
    instanceUrl: { type: String },
    // Bitbucket specific
    workspace: { type: String },
  },
  {
    _id: false,
  }
);

const environmentSchema = new Schema<Environment>(
  {
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => !/\s/.test(value),
        message: 'Environment name must not contain spaces.',
      },
    },
    isDefault: { type: Boolean, default: false },
    configuration: projectConfigSchema,
  },
  { timestamps: true }
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
    repository: repositorySchema,
    webhooks: webhooksConfigSchema,
    autoFill: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
    },
    environments: {
      type: [environmentSchema],
      default: [],
    },
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
    viewersIds: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    memberAccess: {
      type: [memberAccessSchema],
      default: [],
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
          id: _id,
        };
      },
    },
  }
);

export const ProjectModel = model<ProjectSchema, ProjectModelType>(
  'project',
  projectSchema
);
