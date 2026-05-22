import { model, Schema } from 'mongoose';
import type {
  AffiliateModelType,
  AffiliateReferralModelType,
  AffiliateReferralSchema,
  AffiliateSchema,
} from '@/types/affiliate.types';

const toJSONTransform = (_doc: any, ret: any) => {
  const { _id, ...rest } = ret;
  return { ...rest, id: _id.toString() };
};

const toObjectTransform = (_doc: any, ret: any) => {
  const { _id, ...rest } = ret;
  return { ...rest, id: _id };
};

const schemaOptions = {
  timestamps: true,
  toJSON: { virtuals: true, versionKey: false, transform: toJSONTransform },
  toObject: { virtuals: true, transform: toObjectTransform },
};

export const affiliateSchema = new Schema<AffiliateSchema>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      unique: true,
    },
    stripeAccountId: {
      type: String,
      required: false,
    },
    referralCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'onboarding', 'active', 'suspended'],
      default: 'pending',
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
    category: {
      type: String,
      enum: [
        'native_speaker',
        'marketing_expert',
        'copywriter',
        'certified_translator',
      ],
      required: false,
    },
  },
  schemaOptions
);

export const AffiliateModel = model<AffiliateSchema, AffiliateModelType>(
  'affiliate',
  affiliateSchema
);

export const affiliateReferralSchema = new Schema<AffiliateReferralSchema>(
  {
    affiliateId: {
      type: Schema.Types.ObjectId,
      ref: 'affiliate',
      required: true,
    },
    referredOrganizationId: {
      type: Schema.Types.ObjectId,
      ref: 'organization',
      required: true,
    },
    subscriptionId: {
      type: String,
      required: false,
    },
    commissionAmount: {
      type: Number,
      required: false,
    },
    commissionCurrency: {
      type: String,
      required: false,
    },
    conversionStatus: {
      type: String,
      enum: ['pending', 'converted', 'canceled', 'refunded'],
      default: 'pending',
    },
    payoutStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    payoutId: {
      type: String,
      required: false,
    },
  },
  schemaOptions
);

export const AffiliateReferralModel = model<
  AffiliateReferralSchema,
  AffiliateReferralModelType
>('affiliateReferral', affiliateReferralSchema);
