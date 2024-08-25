import type { ObjectId, Model, Document } from 'mongoose';

export type UserData = {
  firebaseUid?: string;
  email: string;
  emailValidated?: boolean;
  firstname: string;
  lastname: string;
  phone?: string;
  dateOfBirth?: Date;
  passwordHash?: string;
  secret?: string;
};

export type User = UserData & {
  _id: string;
  createdAt: number;
  updatedAt: number;
};

export type UserDocument = Document<User> & User;

export type UserWithPasswordNotHashed = UserData & {
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
