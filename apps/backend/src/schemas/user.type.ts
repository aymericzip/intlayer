import type { ObjectId, Model, Document } from 'mongoose';

export type User = {
  _id: string;
  firebaseUid?: string;
  email: string;
  emailValidated?: boolean;
  firstname: string;
  lastname: string;
  phone?: string;
  dateOfBirth?: Date;
  passwordHash?: string;
  secret?: string;
  createdAt: number;
  updatedAt: number;
};

export type UserDocument = Document<User> & User;

export type UserWithPasswordNotHashed = Pick<
  User,
  'firstname' | 'lastname' | 'phone' | 'email' | 'secret'
> & {
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
