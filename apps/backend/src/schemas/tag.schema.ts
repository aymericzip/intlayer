import type { TagSchema } from '@/types/tag.types';
import {
  KEY_MAX_LENGTH,
  KEY_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '@utils/validation/validateTag';
import { Schema } from 'mongoose';

export const tagSchema = new Schema<TagSchema>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      alias: 'id',
    },
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    key: {
      type: String,
      required: true,
      minlength: KEY_MIN_LENGTH,
      maxlength: KEY_MAX_LENGTH,
    },
    name: {
      type: String,
      minlength: NAME_MIN_LENGTH,
      maxlength: NAME_MAX_LENGTH,
    },
    description: {
      type: String,
    },
    instructions: {
      type: String,
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
