import type { Document, Model, ObjectId } from 'mongoose';

export interface UserData {
  email: string;
  name: string;
  phone?: string;
  dateOfBirth?: Date;
}

export enum EmailsList {
  NEWS_LETTER = 'newsLetter',
}

export interface User extends UserData {
  _id: ObjectId;
  emailsList?: {
    [key in EmailsList]: boolean;
  };
  customerId?: string;
  emailVerified?: boolean;
  role?: string;
  lang?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserAPI = Omit<User, 'provider' | 'session' | 'createdAt'>;

export type UserDocument = Document<unknown, {}, User> & User;

export type UserWithPasswordNotHashed = Partial<User> &
  Pick<User, 'email'> & {
    password?: string;
  };

export type UserModelType = Model<User> & {
  login: (email: string, password: string) => Promise<User>;
  changePassword: (
    userId: ObjectId | string,
    oldPassword: string,
    newPassword: string
  ) => Promise<User>;
  resetPassword: (userId: User['_id'], password: string) => Promise<User>;
};
