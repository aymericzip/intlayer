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
    stripeAccountType?: 'express' | 'standard';
    email?: string;
  } = {}
): Promise<AffiliateDocument> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const accountType = options.stripeAccountType ?? 'express';

  const account =
    accountType === 'standard'
      ? await stripe.accounts.create({
          type: 'standard',
          ...(options.email ? { email: options.email } : {}),
        })
      : await stripe.accounts.create({
          controller: {
            stripe_dashboard: { type: 'none' },
            fees: { payer: 'application' },
            losses: { payments: 'stripe' },
            requirement_collection: 'stripe',
          },
          country: options.country ?? 'US',
          business_type: 'individual',
          business_profile: {
            product_description: 'Intlayer Affiliate Program',
          },
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
          },
          settings: {
            payouts: { schedule: { interval: 'monthly' } },
          },
        });

  const referralCode = await ensureUniqueCode();

  const affiliate = await AffiliateModel.create({
    userId,
    stripeAccountId: account.id,
    stripeAccountType: accountType,
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

export const createOnboardingLink = async (
  stripeAccountId: string,
  returnUrl: string,
  refreshUrl: string
): Promise<string> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const accountLink = await stripe.accountLinks.create({
    account: stripeAccountId,
    return_url: returnUrl,
    refresh_url: refreshUrl,
    type: 'account_onboarding',
  });

  await AffiliateModel.findOneAndUpdate(
    { stripeAccountId },
    { stripeOnboardingInitiated: true }
  );

  return accountLink.url;
};

export const markAffiliateActive = async (
  stripeAccountId: string,
  capabilities: { chargesEnabled: boolean; payoutsEnabled: boolean }
): Promise<AffiliateDocument | null> =>
  AffiliateModel.findOneAndUpdate(
    { stripeAccountId, status: { $ne: 'active' } },
    {
      status: 'active',
      chargesEnabled: capabilities.chargesEnabled,
      payoutsEnabled: capabilities.payoutsEnabled,
      activatedAt: new Date(),
    },
    { new: true }
  );

export const payAffiliateCommission = async (
  referral: AffiliateReferralDocument
): Promise<void> => {
  const affiliate = await getAffiliateById(String(referral.affiliateId));
  if (!affiliate?.stripeAccountId) return;

  const fullAmount = referral.commissionAmount ?? 0;
  if (fullAmount <= 0) return;

  const commissionAmount = Math.round(
    fullAmount * (affiliate.commissionRate / 100)
  );
  if (commissionAmount <= 0) return;

  const currency = (referral.commissionCurrency ?? 'usd').toLowerCase();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const transfer = await stripe.transfers.create({
    amount: commissionAmount,
    currency,
    destination: affiliate.stripeAccountId,
    metadata: {
      affiliateId: String(affiliate.id),
      referralId: String((referral as any)._id ?? referral.id),
    },
  });

  await AffiliateReferralModel.findByIdAndUpdate(
    (referral as any)._id ?? referral.id,
    { payoutStatus: 'paid', payoutId: transfer.id }
  );
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

  if (existing) {
    // Keep the subscriptionId in sync with the latest attempt so the webhook
    // can match the referral when invoice.payment_succeeded fires.
    if (
      subscriptionId &&
      existing.subscriptionId !== subscriptionId &&
      existing.conversionStatus === 'pending'
    ) {
      existing.subscriptionId = subscriptionId;
      await existing.save();
    }
    return existing;
  }

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
  commissionCurrency?: string,
  organizationId?: string
): Promise<AffiliateReferralDocument | null> => {
  // Primary lookup: match by the exact subscription ID stored at tracking time.
  const bySubscription = await AffiliateReferralModel.findOneAndUpdate(
    { subscriptionId, conversionStatus: 'pending' },
    { conversionStatus: 'converted', commissionAmount, commissionCurrency },
    { new: true }
  );
  if (bySubscription) return bySubscription;

  // Fallback: the referral was created during a previous payment attempt and still
  // holds an old subscriptionId. Match by organization and update to the current one.
  if (!organizationId) return null;
  return AffiliateReferralModel.findOneAndUpdate(
    { referredOrganizationId: organizationId, conversionStatus: 'pending' },
    {
      conversionStatus: 'converted',
      subscriptionId,
      commissionAmount,
      commissionCurrency,
    },
    { new: true }
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

  const converted = referrals.filter(
    (referral) => referral.conversionStatus === 'converted'
  );
  const pending = referrals.filter(
    (referral) => referral.conversionStatus === 'pending'
  );
  const totalEarned = converted.reduce(
    (sum, referral) => sum + (referral.commissionAmount ?? 0),
    0
  );
  const pendingAmount = pending.reduce(
    (sum, referral) => sum + (referral.commissionAmount ?? 0),
    0
  );

  const appUrl = process.env.APP_URL;
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
  options: {
    country?: string;
    stripeAccountType?: 'express' | 'standard';
    email?: string;
  } = {}
): Promise<AffiliateDocument> => {
  const invitation = await getAffiliateInvitationByToken(token);

  if (!invitation) throw new GenericError('AFFILIATE_INVITATION_NOT_FOUND');
  if (invitation.status !== 'pending')
    throw new GenericError('AFFILIATE_INVITATION_ALREADY_USED');

  const affiliate = await createAffiliate(userId, {
    commissionRate: invitation.commissionRate,
    commissionType: invitation.commissionType,
    country: options.country ?? invitation.country,
    stripeAccountType: options.stripeAccountType ?? 'express',
    email: options.email,
  });

  invitation.status = 'accepted';
  await invitation.save();

  return affiliate;
};
