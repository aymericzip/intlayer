import type { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';

export type PromoCodeData = {
  code: string;
  stripeCouponId: string;
  stripePromotionCodeId?: string;
  affiliateId?: Types.ObjectId;
  discountType: 'percentage' | 'amount';
  discountValue: number;
  currency?: string;
  maxRedemptions?: number;
  timesRedeemed: number;
  active: boolean;
  expiresAt?: Date;
};

export type PromoCode = PromoCodeData & {
  id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type PromoCodeAPI = ObjectIdToString<PromoCode>;
export type PromoCodeSchema = RenameId<PromoCode>;
export type PromoCodeModelType = Model<PromoCode>;
export type PromoCodeDocument = Document<unknown, {}, PromoCode> & PromoCode;
