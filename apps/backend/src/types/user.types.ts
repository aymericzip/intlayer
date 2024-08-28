import type { ObjectId, Model, Document } from 'mongoose';

export interface UserData {
  firebaseUid?: string;
  email: string;
  emailValidated?: boolean;
  firstname: string;
  lastname: string;
  phone?: string;
  dateOfBirth?: Date;
  passwordHash?: string;
  secret?: string;
}

export interface User extends UserData {
  _id: ObjectId;
  createdAt: number;
  updatedAt: number;
}

export interface UserAPI
  extends Omit<User, '_id' | 'passwordHash' | 'secret' | 'emailValidated'> {
  role: string;
}

export type UserDocument = Document<User> & User;

export type UserWithPasswordNotHashed = Partial<UserData> & {
  email: string;
  password: string;
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
