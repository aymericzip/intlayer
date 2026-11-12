import type { AICreditDayUsage, AICreditFeature } from '@utils/aiCredits';
import type { RenameId } from '@utils/mongoDB/types';
import type { Model, Types } from 'mongoose';
import type { PlanType } from './plan.types';

/** One AI call, recorded for per-feature and per-model usage breakdowns. */
export type AICreditUsageData = {
  organizationId: Types.ObjectId;
  projectId?: Types.ObjectId;
  userId?: Types.ObjectId;
  feature: AICreditFeature;
  /** Tokens (input + output) consumed by the call. */
  tokens: number;
  /** Provider the call ran on, e.g. `openai`. */
  provider?: string;
  /** Model the call ran on, e.g. `gpt-4o-mini`. */
  model?: string;
  /**
   * Whether the call ran on Intlayer's key and drew from the credits.
   * Missing on records written before own-key calls were recorded (billed).
   */
  isBilled?: boolean;
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

/** Tokens consumed on one provider / model during the current period. */
export type AIModelUsage = {
  provider?: string;
  model?: string;
  /** `true` when the calls ran on the organization's own AI key. */
  isOwnKey: boolean;
  tokens: number;
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
  /**
   * `false` when no monthly credit is granted (self-hosted): AI calls only
   * run on the organization's own key.
   */
  hasCreditAllowance: boolean;
  /** Every AI call of the period, own key included, per provider and model. */
  usageByModel: AIModelUsage[];
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
