import {
  MEMBERS_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '@utils/validation/validateOrganization';
import { model, Schema } from 'mongoose';
import type {
  OrganizationModelType,
  OrganizationSchema,
} from '@/types/organization.types';
import { planSchema } from './plans.schema';

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
    ssoEnabled: {
      type: Boolean,
      default: false,
    },
    domain: {
      type: String,
    },
    mailerConfig: {
      type: new Schema(
        {
          isActive: { type: Boolean, default: false },
          provider: {
            type: String,
            enum: ['resend', 'smtp'],
            default: 'resend',
          },
          fromName: { type: String },
          fromEmail: { type: String },
          resend: {
            type: new Schema(
              {
                // Stored encrypted (see @utils/crypto/encryption)
                apiKey: { type: String },
              },
              { _id: false }
            ),
          },
          smtp: {
            type: new Schema(
              {
                host: { type: String },
                port: { type: Number },
                secure: { type: Boolean, default: false },
                user: { type: String },
                // Stored encrypted (see @utils/crypto/encryption)
                password: { type: String },
              },
              { _id: false }
            ),
          },
        },
        { _id: false }
      ),
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

export const OrganizationModel = model<
  OrganizationSchema,
  OrganizationModelType
>('organization', organizationSchema);
