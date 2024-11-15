import {
  NAMES_MAX_LENGTH,
  NAMES_MIN_LENGTH,
} from '@utils/validation/validateUser';
import { Schema } from 'mongoose';
import validator from 'validator';
import type { User } from '@/types/user.types';

const SessionSchema = new Schema(
  {
    sessionToken: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  { _id: false } // This prevents Mongoose from creating an _id field for the session subdocument
);

const ProviderSchema = new Schema(
  {
    provider: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
    },
    secret: {
      type: String,
      maxlength: 1024,
      minlength: 6,
    },
    emailValidated: {
      type: Boolean,
    },
    passwordHash: {
      type: String,
    },
  },
  { _id: false } // This prevents Mongoose from creating an _id field for the session subdocument
);

export const userSchema = new Schema<User>(
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
    session: {
      type: SessionSchema,
      required: false,
    },

    customerId: {
      type: String,
      required: false,
    },

    provider: {
      type: [ProviderSchema],
      default: undefined,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
