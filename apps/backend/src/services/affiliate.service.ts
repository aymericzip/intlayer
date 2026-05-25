import { randomUUID } from 'node:crypto';
import {
  AffiliateModel,
  AffiliateReferralModel,
} from '@schemas/affiliate.schema';
import { AffiliateInvitationModel } from '@schemas/affiliateInvitation.schema';
import { GenericError } from '@utils/errors';
import Stripe from 'stripe';
import type {
  Affiliate,
  AffiliateDocument,
  AffiliateReferralDocument,
  AffiliateStats,
  CommissionType,
} from '@/types/affiliate.types';
import type { AffiliateInvitationDocument } from '@/types/affiliateInvitation.types';
import type { Organization } from '@/types/organization.types';
import type { User } from '@/types/user.types';

const generateReferralCode = (): string =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

const ensureUniqueCode = async (): Promise<string> => {
  let code = generateReferralCode();
  let attempts = 0;
  while (await AffiliateModel.exists({ referralCode: code })) {
    code = generateReferralCode();
    if (++attempts > 10)
      throw new GenericError('AFFILIATE_CODE_GENERATION_FAILED');
  }
  return code;
};

export const createAffiliate = async (
  userId: User['id'],
  options: {
    commissionRate?: number;
    commissionType?: CommissionType;
    country?: string;
  } = {}
): Promise<AffiliateDocument> => {
  const existing = await AffiliateModel.findOne({ userId });
  if (existing) throw new GenericError('AFFILIATE_ALREADY_EXISTS');

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const account = await stripe.accounts.create({
    controller: {
      stripe_dashboard: { type: 'none' },
      fees: { payer: 'application' },
      losses: { payments: 'stripe' },
      requirement_collection: 'stripe',
    },
    country: options.country ?? 'FR',
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  const referralCode = await ensureUniqueCode();

  const affiliate = await AffiliateModel.create({
    userId,
    stripeAccountId: account.id,
    referralCode,
    status: 'onboarding',
    commissionRate: options.commissionRate ?? 20,
    commissionType: options.commissionType ?? 'one_time',
  });

  return affiliate;
};

export const getAffiliateByUserId = async (
  userId: User['id'] | string
): Promise<AffiliateDocument | null> =>
  AffiliateModel.findOne({ userId: String(userId) });

export const getAffiliateById = async (
  affiliateId: Affiliate['id'] | string
): Promise<AffiliateDocument | null> =>
  AffiliateModel.findById(String(affiliateId));

export const getAffiliateByCode = async (
  referralCode: string
): Promise<AffiliateDocument | null> =>
  AffiliateModel.findOne({ referralCode: referralCode.toUpperCase() });

export const findAffiliates = async (
  query: Record<string, unknown> = {},
  skip = 0,
  limit = 20
): Promise<AffiliateDocument[]> =>
  AffiliateModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);

export const countAffiliates = async (
  query: Record<string, unknown> = {}
): Promise<number> => AffiliateModel.countDocuments(query);

export const createAccountSession = async (
  stripeAccountId: string
): Promise<string> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const accountSession = await stripe.accountSessions.create({
    account: stripeAccountId,
    components: {
      account_onboarding: { enabled: true },
    },
  });

  return accountSession.client_secret;
};

export const markAffiliateActive = async (
  stripeAccountId: string
): Promise<void> => {
  await AffiliateModel.updateOne({ stripeAccountId }, { status: 'active' });
};

export const setAffiliateStatus = async (
  affiliateId: string,
  update: { status?: 'active' | 'suspended' }
): Promise<AffiliateDocument | null> =>
  AffiliateModel.findByIdAndUpdate(affiliateId, update, { new: true });

export const trackReferral = async (
  referralCode: string,
  organizationId: Organization['id'] | string,
  subscriptionId?: string,
  commissionAmount?: number,
  commissionCurrency?: string
): Promise<AffiliateReferralDocument | null> => {
  const affiliate = await getAffiliateByCode(referralCode);
  if (!affiliate) return null;

  const existing = await AffiliateReferralModel.findOne({
    affiliateId: affiliate.id,
    referredOrganizationId: String(organizationId),
  });
  if (existing) return existing;

  return AffiliateReferralModel.create({
    affiliateId: affiliate.id,
    referredOrganizationId: String(organizationId),
    subscriptionId,
    commissionAmount,
    commissionCurrency,
    conversionStatus: 'pending',
    payoutStatus: 'pending',
  });
};

export const convertReferral = async (
  subscriptionId: string,
  commissionAmount?: number,
  commissionCurrency?: string
): Promise<void> => {
  await AffiliateReferralModel.updateOne(
    { subscriptionId, conversionStatus: 'pending' },
    {
      conversionStatus: 'converted',
      commissionAmount,
      commissionCurrency,
    }
  );
};

export const getAffiliateStats = async (
  userId: User['id'] | string
): Promise<AffiliateStats | null> => {
  const affiliate = await getAffiliateByUserId(userId);
  if (!affiliate) return null;

  const referrals = await AffiliateReferralModel.find({
    affiliateId: affiliate.id,
  });

  const converted = referrals.filter((r) => r.conversionStatus === 'converted');
  const pending = referrals.filter((r) => r.conversionStatus === 'pending');
  const totalEarned = converted.reduce(
    (sum, r) => sum + (r.commissionAmount ?? 0),
    0
  );
  const pendingAmount = pending.reduce(
    (sum, r) => sum + (r.commissionAmount ?? 0),
    0
  );

  const appUrl = process.env.APP_URL ?? 'https://app.intlayer.org';
  const referralLink = `${appUrl}/pricing?ref=${affiliate.referralCode}`;

  return {
    affiliate: affiliate.toJSON() as any,
    totalReferrals: referrals.length,
    convertedReferrals: converted.length,
    pendingReferrals: pending.length,
    totalCommissionEarned: totalEarned,
    pendingCommission: pendingAmount,
    referralLink,
  };
};

// ─── Invitation flow ──────────────────────────────────────────────────────────

const INVITATION_TTL_DAYS = 7;

export const createAffiliateInvitation = async (
  email: string,
  invitedBy: User['id'],
  options: {
    commissionRate?: number;
    commissionType?: CommissionType;
    country?: string;
  } = {}
): Promise<AffiliateInvitationDocument> => {
  const token = randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + INVITATION_TTL_DAYS);

  // Replace any existing pending invitation for this email
  await AffiliateInvitationModel.deleteMany({ email, status: 'pending' });

  return AffiliateInvitationModel.create({
    email,
    token,
    status: 'pending',
    invitedBy,
    commissionRate: options.commissionRate ?? 20,
    commissionType: options.commissionType ?? 'one_time',
    country: options.country,
    expiresAt,
  });
};

export const getAffiliateInvitationByToken = async (
  token: string
): Promise<AffiliateInvitationDocument | null> => {
  const invitation = await AffiliateInvitationModel.findOne({ token });
  if (!invitation) return null;

  if (invitation.status === 'pending' && invitation.expiresAt < new Date()) {
    invitation.status = 'expired';
    await invitation.save();
  }

  return invitation;
};

export const acceptAffiliateInvitation = async (
  token: string,
  userId: User['id'],
  country?: string
): Promise<AffiliateDocument> => {
  const invitation = await getAffiliateInvitationByToken(token);

  if (!invitation) throw new GenericError('AFFILIATE_INVITATION_NOT_FOUND');
  if (invitation.status !== 'pending')
    throw new GenericError('AFFILIATE_INVITATION_ALREADY_USED');

  const affiliate = await createAffiliate(userId, {
    commissionRate: invitation.commissionRate,
    commissionType: invitation.commissionType,
    country: country ?? invitation.country,
  });

  invitation.status = 'accepted';
  await invitation.save();

  return affiliate;
};
