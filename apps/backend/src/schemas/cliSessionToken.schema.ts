import type { Types } from 'mongoose';
import { Schema } from 'mongoose';

export type CliSessionToken = {
  token: string;
  userId: Types.ObjectId;
  organizationId: string;
  projectId: string;
  expiresAt: Date;
};

export const cliSessionTokenSchema = new Schema<CliSessionToken>(
  {
    token: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    organizationId: { type: String, required: true },
    projectId: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// Auto-delete expired tokens via MongoDB TTL
cliSessionTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
