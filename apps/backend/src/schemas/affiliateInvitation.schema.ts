import { model, Schema } from 'mongoose';
import type {
  AffiliateInvitationModelType,
  AffiliateInvitationSchema,
} from '@/types/affiliateInvitation.types';

export const affiliateInvitationSchema = new Schema<AffiliateInvitationSchema>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'expired'],
      default: 'pending',
    },
    invitedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    commissionRate: {
      type: Number,
      default: 20,
      min: 0,
      max: 100,
    },
    commissionType: {
      type: String,
      enum: ['recurring', 'one_time'],
      default: 'one_time',
    },
    country: {
      type: String,
      required: false,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_doc, ret: any) {
        const { _id, ...rest } = ret;
        return { ...rest, id: _id.toString() };
      },
    },
    toObject: {
      virtuals: true,
      transform(_doc, ret: any) {
        const { _id, ...rest } = ret;
        return { ...rest, id: _id };
      },
    },
  }
);

export const AffiliateInvitationModel = model<
  AffiliateInvitationSchema,
  AffiliateInvitationModelType
>('affiliateInvitation', affiliateInvitationSchema);
