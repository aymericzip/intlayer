import type { UserSchema } from '@/types/user.types';
import {
  NAMES_MAX_LENGTH,
  NAMES_MIN_LENGTH,
} from '@utils/validation/validateUser';
import { Schema } from 'mongoose';
import validator from 'validator';

export const userSchema = new Schema<UserSchema>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      alias: 'id',
    },
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
