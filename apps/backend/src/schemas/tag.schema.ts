import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  KEY_MAX_LENGTH,
  KEY_MIN_LENGTH,
} from '@utils/validation/validateTag';
import { Schema } from 'mongoose';
import { Tag } from '@/types/tag.types';

export const tagSchema = new Schema<Tag>(
  {
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
