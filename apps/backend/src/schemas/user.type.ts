import type { ObjectId, Model } from 'mongoose';

export type User = Document & {
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
};

export type UserWithPasswordNotHashed = Omit<User, 'passwordHash'> & {
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
