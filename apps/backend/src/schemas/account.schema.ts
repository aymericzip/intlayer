import { model, Schema } from 'mongoose';
import type { AccountModelType, AccountSchema } from '@/types/account.types';

export const accountSchema = new Schema<AccountSchema>(
  {
    userId: {
      type: Schema.Types.ObjectId as any,
      required: true,
      ref: 'User',
    },
    accountId: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: false,
    },
    access_token: {
      type: String,
      required: false,
    },
    refreshToken: {
      type: String,
      required: false,
    },
    refresh_token: {
      type: String,
      required: false,
    },
    idToken: {
      type: String,
      required: false,
    },
    expiresAt: {
      type: Date,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    scope: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: 'account', // Explicitly set collection name

    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_doc, ret: any) {
        const { _id, ...rest } = ret;
        return {
          ...rest,
          id: _id.toString(),
        };
      },
    },
    toObject: {
      virtuals: true,
      transform(_doc, ret: any) {
        const { _id, ...rest } = ret;
        return {
          ...rest,
          id: _id,
        };
      },
    },
  }
);

export const AccountModel = model<AccountSchema, AccountModelType>(
  'account',
  accountSchema
);
