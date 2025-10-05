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
      transform(doc, ret: any) {
        ret.id = ret._id.toString(); // convert _id to id
        delete ret._id; // remove _id
      },
    },
    toObject: {
      virtuals: true,
      transform(doc, ret: any) {
        ret.id = ret._id; // convert _id to id
        delete ret._id; // remove _id
      },
    },
  }
);
