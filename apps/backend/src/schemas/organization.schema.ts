import {
  MEMBERS_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '@utils/validation/validateOrganization';
import { Schema } from 'mongoose';
import type { OrganizationSchema } from '@/types/organization.types';
import { planSchema } from './plans.schema';

// SAML Configuration sub-schema
const samlConfigSchema = new Schema(
  {
    idpEntityId: { type: String },
    idpSSOUrl: { type: String },
    idpCertificate: { type: String },
    idpSLOUrl: { type: String },
  },
  { _id: false }
);

// OIDC Configuration sub-schema
const oidcConfigSchema = new Schema(
  {
    issuer: { type: String },
    clientId: { type: String },
    clientSecret: { type: String },
    scopes: { type: [String], default: ['openid', 'profile', 'email'] },
    authorizationEndpoint: { type: String },
    tokenEndpoint: { type: String },
    userinfoEndpoint: { type: String },
  },
  { _id: false }
);

// SSO Configuration sub-schema
const ssoConfigSchema = new Schema(
  {
    enabled: { type: Boolean, default: false },
    providerType: { type: String, enum: ['saml', 'oidc'] },
    providerId: { type: String },
    domains: { type: [String], default: [] },
    samlConfig: { type: samlConfigSchema },
    oidcConfig: { type: oidcConfigSchema },
    enforceSSO: { type: Boolean, default: false },
    allowPasswordLogin: { type: Boolean, default: true },
  },
  { _id: false }
);

export const organizationSchema = new Schema<OrganizationSchema>(
  {
    name: {
      type: String,
      required: true,
      minlength: NAME_MIN_LENGTH,
      maxlength: NAME_MAX_LENGTH,
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
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    plan: {
      type: planSchema,
    },
    ssoConfig: {
      type: ssoConfigSchema,
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

// Add virtual field for id
organizationSchema.virtual('id').get(function () {
  return this._id.toString();
});
