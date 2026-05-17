import type { Client, Token as TokenType } from '@node-oauth/oauth2-server';
import { Schema } from 'mongoose';
import type { User } from '@/types/user.types';

export type Token = Omit<TokenType, 'client' | 'user'> & {
  clientId: Client['id'];
  userId: User['id'];
};

export const accessTokenSchema = new Schema<Token>(
  {
    accessToken: {
      type: String,
      required: true,
    },
    accessTokenExpiresAt: {
      type: Date,
    },
    clientId: {
      type: String,
      ref: 'Project',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,

    toJSON: {
      virtuals: true, // keep the automatic `id` getter
      versionKey: false, // drop __v
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

// MongoDB TTL fallback: tokens are normally garbage collected by their
// accessTokenExpiresAt, but if the sliding-refresh keeps a token alive for a
// long time we still want a hard upper bound from creation.
accessTokenSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 60 * 60 * 24 * 90, // 90 Days
  }
);
