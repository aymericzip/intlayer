import type { Document, Model, ObjectId, Schema } from 'mongoose';

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
  id: Schema.Types.ObjectId;
  emailsList?: {
    [key in EmailsList]: boolean;
  };
  customerId?: Schema.Types.ObjectId;
  emailVerified?: boolean;
  role?: string;
  lang?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserAPI = Omit<User, 'provider' | 'session' | 'createdAt'>;

export type UserModel = User;
export type UserDocument = Document<unknown, {}, UserModel> & UserModel;

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
  resetPassword: (userId: User['id'], password: string) => Promise<User>;
};
