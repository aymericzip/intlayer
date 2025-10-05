import {
  MEMBERS_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '@utils/validation/validateOrganization';
import { Schema } from 'mongoose';
import type { OrganizationSchema } from '@/types/organization.types';
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

// Add virtual field for id
organizationSchema.virtual('id').get(function () {
  return this._id.toString();
});
