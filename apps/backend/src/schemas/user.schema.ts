import {
  formatUser,
  hackUserPassword,
  testUserPassword,
} from '@services/user.service';
import {
  NAMES_MAX_LENGTH,
  NAMES_MIN_LENGTH,
} from '@utils/validation/validateUser';
import { Schema } from 'mongoose';
import validator from 'validator';
import type {
  User,
  UserDocument,
  UserModelType,
  UserWithPasswordNotHashed,
} from './user.type';

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
    emailValidated: {
      type: Boolean,
      default: false,
    },
    firstname: {
      type: String,
      maxlength: NAMES_MAX_LENGTH,
      minlength: NAMES_MIN_LENGTH,
    },
    lastname: {
      type: String,
      uppercase: true,
      maxlength: NAMES_MAX_LENGTH,
      minlength: NAMES_MIN_LENGTH,
    },
    phone: {
      type: String,
      maxlength: 20,
    },
    passwordHash: {
      type: String,
    },
    secret: {
      type: String,
      maxlength: 1024,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<UserModelType>('save', async (next) => {
  const user = this as unknown as UserDocument;

  const userWithPasswordNotHashed = (await hackUserPassword(
    this as unknown as UserWithPasswordNotHashed
  )) as User;

  const formattedUser = formatUser(userWithPasswordNotHashed);

  user.set(formattedUser);

  next();
});

userSchema.statics.login = testUserPassword;
