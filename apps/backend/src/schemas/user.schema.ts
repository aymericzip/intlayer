import {
  NAMES_MAX_LENGTH,
  NAMES_MIN_LENGTH,
} from '@utils/validation/validateUser';
import { Schema } from 'mongoose';
import validator from 'validator';
import type { UserSchema } from '@/types/user.types';

export const userSchema = new Schema<UserSchema>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'Please fill a valid email address'],
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      maxlength: NAMES_MAX_LENGTH,
      minlength: NAMES_MIN_LENGTH,
    },
    phone: {
      type: String,
      maxlength: 20,
    },

    customerId: {
      type: String,
      required: false,
    },

    emailsList: {
      type: {
        newsLetter: {
          type: Boolean,
          default: false,
        },
      },
      required: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
      required: false,
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
