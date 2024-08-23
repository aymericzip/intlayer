import { UserModel } from '@models/user.model';
import { genSalt, hash, compare } from 'bcrypt';
import * as CryptoJS from 'crypto-js';
import { Schema } from 'mongoose';
import validator from 'validator';
import type {
  User,
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
    firstname: {
      type: String,
      maxlength: 1024,
      minlength: 6,
    },
    lastname: {
      type: String,
      uppercase: true,
      maxlength: 1024,
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
  const userWithPasswordNotHashed =
    this as unknown as UserWithPasswordNotHashed;

  const { password, ...userData } = userWithPasswordNotHashed;

  const { firstname, lastname } = userData;
  const user: User = {
    ...userData,
    firstname:
      firstname.charAt(0).toUpperCase() + firstname.slice(1).toLowerCase(),
    lastname: lastname.toUpperCase(),
  };

  if (password) {
    const salt = await genSalt();

    user.passwordHash = await hash(password, salt);
  }

  next();
});

userSchema.statics.login = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });

  if (user?.passwordHash) {
    const isMatch = await compare(password, user.passwordHash);
    if (isMatch) {
      return user;
    }
  }

  throw new Error('Incorrect email or password');
};

userSchema.statics.changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await UserModel.findById(userId);

  if (user && newPassword) {
    if (user.passwordHash) {
      const isMatch = await compare(oldPassword, user.passwordHash);
      if (isMatch) {
        user.passwordHash = await hash(newPassword, await genSalt());
        await user.save();
        return user;
      }
    } else {
      user.passwordHash = await hash(newPassword, await genSalt());
      await user.save();
      return user;
    }
  }

  throw new Error('Incorrect password');
};

userSchema.statics.resetPassword = async (userId: string, password: string) => {
  const user = await UserModel.findById(userId);

  if (user) {
    user.passwordHash = await hash(password, await genSalt());
    await user.save();
    return user;
  }

  throw new Error('Incorrect password');
};

userSchema.statics.add = async (
  newUser: Partial<UserWithPasswordNotHashed>
) => {
  if (process.env.BIT_256_KEY && newUser.password) {
    const bit256Key = process.env.BIT_256_KEY;

    const decryptedPassword = CryptoJS.AES.decrypt(
      newUser.password,
      bit256Key
    ).toString(CryptoJS.enc.Utf8);

    return await UserModel.create({
      ...newUser,
      password: decryptedPassword,
    });
  }

  throw new Error('Incorrect account');
};
