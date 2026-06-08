import { model, Schema } from 'mongoose';
import type {
  PromoCodeModelType,
  PromoCodeSchema,
} from '@/types/promoCode.types';

const toJSONTransform = (_doc: any, ret: any) => {
  const { _id, ...rest } = ret;
  return { ...rest, id: _id.toString() };
};

const toObjectTransform = (_doc: any, ret: any) => {
  const { _id, ...rest } = ret;
  return { ...rest, id: _id };
};

export const promoCodeSchema = new Schema<PromoCodeSchema>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    stripeCouponId: { type: String, required: true },
    stripePromotionCodeId: { type: String, required: false },
    affiliateId: {
      type: Schema.Types.ObjectId,
      ref: 'affiliate',
      required: false,
    },
    discountType: {
      type: String,
      enum: ['percentage', 'amount'],
      required: true,
    },
    discountValue: { type: Number, required: true },
    currency: { type: String, required: false },
    maxRedemptions: { type: Number, required: false },
    timesRedeemed: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    expiresAt: { type: Date, required: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: toJSONTransform,
    },
    toObject: {
      virtuals: true,
      transform: toObjectTransform,
    },
  }
);

export const PromoCodeModel = model<PromoCodeSchema, PromoCodeModelType>(
  'promoCode',
  promoCodeSchema
);
export default PromoCodeModel;
