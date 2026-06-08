import { PromoCodeModel } from '@schemas/promoCode.schema';
import Stripe from 'stripe';
import type { PromoCodeDocument } from '@/types/promoCode.types';

export const createPromoCode = async (body: {
  code: string;
  discountType: 'percentage' | 'amount';
  discountValue: number;
  currency?: string;
  affiliateId?: string;
  maxRedemptions?: number;
  expiresAt?: Date;
}): Promise<PromoCodeDocument> => {
  const {
    code,
    discountType,
    discountValue,
    currency,
    affiliateId,
    maxRedemptions,
    expiresAt,
  } = body;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const couponPayload: Stripe.CouponCreateParams = {
    name: code.toUpperCase(),
    ...(discountType === 'percentage'
      ? { percent_off: discountValue }
      : { amount_off: discountValue, currency: currency ?? 'usd' }),
    duration: 'once',
  };
  if (maxRedemptions) couponPayload.max_redemptions = maxRedemptions;
  const coupon = await stripe.coupons.create(couponPayload);

  const promoPayload: Stripe.PromotionCodeCreateParams = {
    promotion: {
      type: 'coupon',
      coupon: coupon.id,
    },
    code: code.toUpperCase(),
  };
  if (maxRedemptions) promoPayload.max_redemptions = maxRedemptions;
  if (expiresAt)
    promoPayload.expires_at = Math.floor(expiresAt.getTime() / 1000);
  const promotionCode = await stripe.promotionCodes.create(promoPayload);

  const promoCodeDoc = await PromoCodeModel.create({
    code: code.toUpperCase(),
    stripeCouponId: coupon.id,
    stripePromotionCodeId: promotionCode.id,
    affiliateId: affiliateId ?? undefined,
    discountType,
    discountValue,
    currency: discountType === 'amount' ? (currency ?? 'usd') : undefined,
    maxRedemptions,
    timesRedeemed: 0,
    active: true,
    expiresAt,
  });

  return promoCodeDoc;
};

export const getPromoCodes = async (
  skip = 0,
  limit = 20,
  affiliateId?: string
): Promise<PromoCodeDocument[]> => {
  const query = affiliateId ? { affiliateId } : {};
  return PromoCodeModel.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

export const countPromoCodes = async (
  affiliateId?: string
): Promise<number> => {
  const query = affiliateId ? { affiliateId } : {};
  return PromoCodeModel.countDocuments(query);
};

export const getPromoCodeById = async (
  id: string
): Promise<PromoCodeDocument | null> => PromoCodeModel.findById(id);

export const getPromoCodeByCode = async (
  code: string
): Promise<PromoCodeDocument | null> =>
  PromoCodeModel.findOne({ code: code.toUpperCase() });

export const updatePromoCode = async (
  id: string,
  update: {
    affiliateId?: string | null;
    active?: boolean;
    maxRedemptions?: number;
    expiresAt?: Date;
  }
): Promise<PromoCodeDocument | null> => {
  const $set: Record<string, unknown> = {};
  const $unset: Record<string, unknown> = {};

  if (update.affiliateId === null) {
    $unset.affiliateId = '';
  } else if (update.affiliateId !== undefined) {
    $set.affiliateId = update.affiliateId;
  }
  if (update.active !== undefined) $set.active = update.active;
  if (update.maxRedemptions !== undefined)
    $set.maxRedemptions = update.maxRedemptions;
  if (update.expiresAt !== undefined) $set.expiresAt = update.expiresAt;

  const op: Record<string, unknown> = {};
  if (Object.keys($set).length > 0) op.$set = $set;
  if (Object.keys($unset).length > 0) op.$unset = $unset;

  return PromoCodeModel.findByIdAndUpdate(id, op, { new: true });
};

export const deletePromoCode = async (
  id: string
): Promise<PromoCodeDocument | null> => {
  const promoCode = await PromoCodeModel.findById(id);
  if (!promoCode) return null;

  if (promoCode.stripePromotionCodeId) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
      await stripe.promotionCodes.update(promoCode.stripePromotionCodeId, {
        active: false,
      });
    } catch {
      // best-effort — continue even if Stripe call fails
    }
  }

  return PromoCodeModel.findByIdAndUpdate(id, { active: false }, { new: true });
};
