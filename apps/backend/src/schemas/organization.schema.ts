import { OrganizationSchema } from '@/export';
import {
  MEMBERS_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '@utils/validation/validateOrganization';
import { Schema } from 'mongoose';
import { planSchema } from './plans.schema';

export const organizationSchema = new Schema<OrganizationSchema>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      alias: 'id',
    },
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
