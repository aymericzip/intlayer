import type { RenameId } from '@utils/mongoDB/types';
import type { Document, Model, ObjectIdToString, Types } from 'mongoose';
import type { Organization } from './organization.types';
import type { User } from './user.types';

export type AffiliateStatus = 'pending' | 'onboarding' | 'active' | 'suspended';
export type CommissionType = 'recurring' | 'one_time';
export type ConversionStatus =
  | 'pending'
  | 'converted'
  | 'canceled'
  | 'refunded';
export type PayoutStatus = 'pending' | 'paid' | 'failed';

export type AffiliateData = {
  userId: User['id'];
  stripeAccountId?: string;
  referralCode: string;
  status: AffiliateStatus;
  commissionRate: number; // percentage (e.g. 20 for 20%)
  commissionType: CommissionType;
};

export type Affiliate = AffiliateData & {
  id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type AffiliateAPI = ObjectIdToString<Affiliate>;
export type AffiliateSchema = RenameId<Affiliate>;
export type AffiliateModelType = Model<Affiliate>;
export type AffiliateDocument = Document<unknown, {}, Affiliate> & Affiliate;

export type AffiliateReferralData = {
  affiliateId: Affiliate['id'];
  referredOrganizationId: Organization['id'];
  subscriptionId?: string;
  commissionAmount?: number; // in cents
  commissionCurrency?: string;
  conversionStatus: ConversionStatus;
  payoutStatus: PayoutStatus;
  payoutId?: string;
};

export type AffiliateReferral = AffiliateReferralData & {
  id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type AffiliateReferralAPI = ObjectIdToString<AffiliateReferral>;
export type AffiliateReferralSchema = RenameId<AffiliateReferral>;
export type AffiliateReferralModelType = Model<AffiliateReferral>;
export type AffiliateReferralDocument = Document<
  unknown,
  {},
  AffiliateReferral
> &
  AffiliateReferral;

export type AffiliateStats = {
  affiliate: AffiliateAPI;
  totalReferrals: number;
  convertedReferrals: number;
  pendingReferrals: number;
  totalCommissionEarned: number; // in cents
  pendingCommission: number; // in cents
  referralLink: string;
};
