import { AICreditUsageModel } from '@schemas/aiCreditUsage.schema';
import { OrganizationModel } from '@schemas/organization.schema';
import {
  type AICreditDailyUsageRow,
  type AICreditFeature,
  buildAICreditDailyUsage,
  convertTokensToCredits,
  formatUTCDay,
  getAICreditUsageDayRange,
  getAICreditPeriodBounds,
  getAICreditPeriodKey,
  getMonthlyAITokenAllowance,
  getUsedTokensInPeriod,
  TOKENS_PER_AI_CREDIT,
} from '@utils/aiCredits';
import { GenericError } from '@utils/errors';
import { Types } from 'mongoose';
import type {
  AICreditBalance,
  AICreditDailyUsage,
  AICreditFeatureUsage,
  AIModelUsage,
} from '@/types/aiCreditUsage.types';
import type { Organization } from '@/types/organization.types';

type OrganizationCreditFields = Pick<Organization, 'plan' | 'aiCreditUsage'>;

/**
 * Reads the fields needed to compute an organization's credit balance.
 * Always hits the DB: the session copy of the organization may be stale.
 */
const getOrganizationCreditFields = async (
  organizationId: string
): Promise<OrganizationCreditFields> => {
  const organization = await OrganizationModel.findById(organizationId, {
    plan: 1,
    aiCreditUsage: 1,
  }).lean<OrganizationCreditFields>();

  if (!organization) {
    throw new GenericError('ORGANIZATION_NOT_FOUND', { organizationId });
  }

  return organization;
};

/**
 * Tokens still available to the organization in the current monthly period.
 * Can be negative: the call that crosses the limit is billed in full.
 */
export const getRemainingAITokens = async (
  organizationId: string,
  now: Date = new Date()
): Promise<number> => {
  const { plan, aiCreditUsage } =
    await getOrganizationCreditFields(organizationId);

  return (
    getMonthlyAITokenAllowance(plan) -
    getUsedTokensInPeriod(aiCreditUsage, getAICreditPeriodKey(now))
  );
};

/**
 * Whether the organization can still start an AI call on Intlayer's key.
 */
export const hasRemainingAICredits = async (
  organizationId: string,
  now: Date = new Date()
): Promise<boolean> => (await getRemainingAITokens(organizationId, now)) > 0;

/**
 * Atomically adds `tokens` to the organization's monthly counter, opening a
 * new period when the stored one is from a previous month.
 */
const incrementOrganizationTokenCounter = async (
  organizationId: Types.ObjectId,
  tokens: number,
  periodKey: string
): Promise<void> => {
  const incrementInCurrentPeriod = () =>
    OrganizationModel.updateOne(
      { _id: organizationId, 'aiCreditUsage.periodKey': periodKey },
      { $inc: { 'aiCreditUsage.usedTokens': tokens } }
    );

  const incrementResult = await incrementInCurrentPeriod();
  if (incrementResult.matchedCount > 0) return;

  const openPeriodResult = await OrganizationModel.updateOne(
    { _id: organizationId, 'aiCreditUsage.periodKey': { $ne: periodKey } },
    { $set: { aiCreditUsage: { periodKey, usedTokens: tokens } } }
  );
  if (openPeriodResult.matchedCount > 0) return;

  // A concurrent call opened the period between both updates
  await incrementInCurrentPeriod();
};

export type ConsumeAICreditsParams = {
  organizationId: string;
  projectId?: string;
  userId?: string;
  feature: AICreditFeature;
  tokens: number;
  provider?: string;
  model?: string;
  /** Whether the tokens are deducted from the organization's credits. */
  isBilled: boolean;
  now?: Date;
};

/**
 * Records the call in the usage ledger and, when billed, deducts `tokens`
 * from the organization's monthly credits.
 */
export const consumeAICredits = async ({
  organizationId,
  projectId,
  userId,
  feature,
  tokens,
  provider,
  model,
  isBilled,
  now = new Date(),
}: ConsumeAICreditsParams): Promise<void> => {
  const usedTokens = Math.max(0, Math.ceil(tokens));
  if (usedTokens === 0) return;

  const organizationObjectId = new Types.ObjectId(organizationId);

  await Promise.all([
    isBilled
      ? incrementOrganizationTokenCounter(
          organizationObjectId,
          usedTokens,
          getAICreditPeriodKey(now)
        )
      : undefined,
    AICreditUsageModel.create({
      organizationId: organizationObjectId,
      projectId: projectId ? new Types.ObjectId(projectId) : undefined,
      userId: userId ? new Types.ObjectId(userId) : undefined,
      feature,
      tokens: usedTokens,
      provider,
      model,
      isBilled,
      createdAt: now,
    }),
  ]);
};

/** Ledger filter keeping billed calls (records predating `isBilled` were). */
const BILLED_USAGE_FILTER = { isBilled: { $ne: false } };

/**
 * Per-feature usage of the organization since `periodStart`, most expensive first.
 */
export const getAICreditUsageByFeature = async (
  organizationId: string,
  periodStart: Date,
  periodEnd: Date
): Promise<AICreditFeatureUsage[]> => {
  const aggregation = await AICreditUsageModel.aggregate<{
    _id: AICreditFeature;
    tokens: number;
    requestCount: number;
  }>([
    {
      $match: {
        organizationId: new Types.ObjectId(organizationId),
        createdAt: { $gte: periodStart, $lt: periodEnd },
        ...BILLED_USAGE_FILTER,
      },
    },
    {
      $group: {
        _id: '$feature',
        tokens: { $sum: '$tokens' },
        requestCount: { $sum: 1 },
      },
    },
    { $sort: { tokens: -1 } },
  ]);

  return aggregation.map((entry) => ({
    feature: entry._id,
    tokens: entry.tokens,
    credits: convertTokensToCredits(entry.tokens),
    requestCount: entry.requestCount,
  }));
};

/**
 * Every AI call of the organization since `periodStart` (own key included),
 * per provider and model, most expensive first.
 */
export const getAIUsageByModel = async (
  organizationId: string,
  periodStart: Date,
  periodEnd: Date
): Promise<AIModelUsage[]> => {
  const aggregation = await AICreditUsageModel.aggregate<{
    _id: { provider?: string; model?: string; isBilled?: boolean };
    tokens: number;
    requestCount: number;
  }>([
    {
      $match: {
        organizationId: new Types.ObjectId(organizationId),
        createdAt: { $gte: periodStart, $lt: periodEnd },
      },
    },
    {
      $group: {
        _id: {
          provider: '$provider',
          model: '$model',
          isBilled: { $ne: ['$isBilled', false] },
        },
        tokens: { $sum: '$tokens' },
        requestCount: { $sum: 1 },
      },
    },
    { $sort: { tokens: -1 } },
  ]);

  return aggregation.map((entry) => ({
    provider: entry._id.provider ?? undefined,
    model: entry._id.model ?? undefined,
    isOwnKey: entry._id.isBilled === false,
    tokens: entry.tokens,
    requestCount: entry.requestCount,
  }));
};

/**
 * Credit balance of the organization for the monthly period containing `now`.
 */
export const getAICreditBalance = async (
  organizationId: string,
  now: Date = new Date()
): Promise<AICreditBalance> => {
  const { plan, aiCreditUsage } =
    await getOrganizationCreditFields(organizationId);
  const { periodStart, periodEnd } = getAICreditPeriodBounds(now);

  const allowanceTokens = getMonthlyAITokenAllowance(plan);
  const usedTokens = getUsedTokensInPeriod(
    aiCreditUsage,
    getAICreditPeriodKey(now)
  );

  const [usageByFeature, usageByModel] = await Promise.all([
    getAICreditUsageByFeature(organizationId, periodStart, periodEnd),
    getAIUsageByModel(organizationId, periodStart, periodEnd),
  ]);

  return {
    organizationId,
    planType: plan?.status === 'active' ? plan.type : 'FREE',
    tokensPerCredit: TOKENS_PER_AI_CREDIT,
    monthlyCredits: convertTokensToCredits(allowanceTokens),
    usedCredits: convertTokensToCredits(usedTokens),
    remainingCredits: convertTokensToCredits(
      Math.max(0, allowanceTokens - usedTokens)
    ),
    periodStart,
    periodEnd,
    usageByFeature,
    hasCreditAllowance: allowanceTokens > 0,
    usageByModel,
  };
};

/**
 * Day-by-day usage of the organization over the last `dayCount` UTC days,
 * today included.
 */
export const getAICreditDailyUsage = async (
  organizationId: string,
  dayCount: number,
  now: Date = new Date()
): Promise<AICreditDailyUsage> => {
  const { from, to } = getAICreditUsageDayRange(dayCount, now);

  const rows = await AICreditUsageModel.aggregate<{
    _id: { date: string; feature: AICreditFeature };
    tokens: number;
    requestCount: number;
  }>([
    {
      $match: {
        organizationId: new Types.ObjectId(organizationId),
        createdAt: { $gte: from, $lt: to },
        ...BILLED_USAGE_FILTER,
      },
    },
    {
      $group: {
        _id: {
          date: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          feature: '$feature',
        },
        tokens: { $sum: '$tokens' },
        requestCount: { $sum: 1 },
      },
    },
  ]);

  const dailyRows: AICreditDailyUsageRow[] = rows.map((row) => ({
    date: row._id.date,
    feature: row._id.feature,
    tokens: row.tokens,
    requestCount: row.requestCount,
  }));

  return {
    organizationId,
    tokensPerCredit: TOKENS_PER_AI_CREDIT,
    from: formatUTCDay(from),
    to: formatUTCDay(new Date(to.getTime() - 1)),
    days: buildAICreditDailyUsage(dailyRows, from, dayCount),
  };
};
