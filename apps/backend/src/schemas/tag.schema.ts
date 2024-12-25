import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
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
    name: {
      type: String,
      required: true,
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
