import type { AICreditDayUsage, AICreditFeature } from '@utils/aiCredits';
import type { RenameId } from '@utils/mongoDB/types';
import type { Model, Types } from 'mongoose';
import type { PlanType } from './plan.types';

/** One billed AI call, recorded for per-feature usage breakdowns. */
export type AICreditUsageData = {
  organizationId: Types.ObjectId;
  projectId?: Types.ObjectId;
  userId?: Types.ObjectId;
  feature: AICreditFeature;
  /** Tokens (input + output) consumed on Intlayer's AI key. */
  tokens: number;
};

export type AICreditUsage = AICreditUsageData & {
  id: Types.ObjectId;
  createdAt: Date;
};

export type AICreditUsageSchema = RenameId<AICreditUsage>;
export type AICreditUsageModelType = Model<AICreditUsage>;

/** Credits consumed by one feature during the current period. */
export type AICreditFeatureUsage = {
  feature: AICreditFeature;
  tokens: number;
  credits: number;
  requestCount: number;
};

/** Organization AI credit balance for the current monthly period. */
export type AICreditBalance = {
  organizationId: string;
  /** Plan whose allowance applies (an inactive plan counts as `FREE`). */
  planType: PlanType;
  tokensPerCredit: number;
  monthlyCredits: number;
  usedCredits: number;
  remainingCredits: number;
  periodStart: Date;
  /** Exclusive: the balance resets at this instant. */
  periodEnd: Date;
  usageByFeature: AICreditFeatureUsage[];
};

/** Day-by-day AI credit usage of an organization (UTC days). */
export type AICreditDailyUsage = {
  organizationId: string;
  tokensPerCredit: number;
  /** First day of the series, `YYYY-MM-DD`. */
  from: string;
  /** Last day of the series (inclusive), `YYYY-MM-DD`. */
  to: string;
  days: AICreditDayUsage[];
};
