import { logger } from '@logger';
import { AICreditUsageModel } from '@schemas/aiCreditUsage.schema';
import {
  AnalyticsLiveActivityModel,
  AnalyticsPageTransitionModel,
  AnalyticsRollupModel,
  AnalyticsShortTermRollupModel,
  AnalyticsVisitorModel,
} from '@schemas/analyticsEvent.schema';
import { AssetModel } from '@schemas/asset.schema';
import { CliSessionTokenModel } from '@schemas/cliSessionToken.schema';
import { DictionaryModel } from '@schemas/dictionary.schema';
import { DiscussionModel } from '@schemas/discussion.schema';
import { OAuth2AccessTokenModel } from '@schemas/oAuth2.schema';
import { OrganizationModel } from '@schemas/organization.schema';
import { ProjectModel } from '@schemas/project.schema';
import { SessionModel } from '@schemas/session.schema';
import { TagModel } from '@schemas/tag.schema';
import { UserModel } from '@schemas/user.schema';
import { deleteAssetFromS3 } from '@services/blog/assetUpload.service';
import { Types } from 'mongoose';
import Stripe from 'stripe';
import type { Organization } from '@/types/organization.types';

/** Subscription statuses Stripe can still bill. */
const BILLABLE_SUBSCRIPTION_STATUSES = new Set([
  'active',
  'trialing',
  'past_due',
  'unpaid',
  'incomplete',
  'paused',
]);

/** Logs a failed best-effort cleanup step without aborting the deletion. */
const logCleanupFailure =
  (step: string) =>
  (error: unknown): void => {
    logger.error(
      `Organization deletion: ${step} failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  };

/** Cancels the organization subscription so Stripe stops billing it. */
const cancelOrganizationSubscription = async (
  organization: Pick<Organization, 'plan'>
): Promise<void> => {
  const { plan } = organization;

  if (!plan?.subscriptionId || !process.env.STRIPE_SECRET_KEY) return;
  if (!BILLABLE_SUBSCRIPTION_STATUSES.has(plan.status)) return;

  await new Stripe(process.env.STRIPE_SECRET_KEY).subscriptions
    .cancel(plan.subscriptionId)
    .catch(logCleanupFailure('Stripe subscription cancellation'));
};

/** Removes the S3 files and records of the projects' assets. */
const deleteProjectAssets = async (
  projectIds: Types.ObjectId[]
): Promise<void> => {
  const assets = await AssetModel.find(
    { projectId: { $in: projectIds } },
    { s3Key: 1 }
  ).lean();

  for (const asset of assets) {
    await deleteAssetFromS3(asset.s3Key).catch(
      logCleanupFailure(`S3 removal of ${asset.s3Key}`)
    );
  }

  await AssetModel.deleteMany({ projectId: { $in: projectIds } });
};

/**
 * Deletes the dictionaries owned only by the given projects, and detaches the
 * ones shared with other projects.
 */
const deleteProjectDictionaries = async (
  projectIds: Types.ObjectId[]
): Promise<void> => {
  await DictionaryModel.deleteMany({
    projectIds: {
      $in: projectIds,
      $not: { $elemMatch: { $nin: projectIds } },
    },
  });

  await DictionaryModel.updateMany(
    { projectIds: { $in: projectIds } },
    { $pull: { projectIds: { $in: projectIds } } }
  );
};

/**
 * Permanently deletes an organization and everything attached to it: projects
 * (with their environments, webhooks and access keys), dictionaries, tags,
 * discussions, assets (S3 files included), analytics, AI credit logs, CLI and
 * OAuth2 tokens. Cancels its Stripe subscription and clears the sessions and
 * users pointing at it.
 *
 * Translation missions are kept: they are payment records shared with
 * reviewers.
 *
 * @param organization - The organization to delete.
 */
export const deleteOrganizationAndData = async (
  organization: Pick<Organization, 'id' | 'plan'>
): Promise<void> => {
  const organizationId = new Types.ObjectId(String(organization.id));

  const projects = await ProjectModel.find(
    { organizationId },
    { _id: 1, oAuth2Access: 1 }
  ).lean();

  const projectIds = projects.map((project) => project._id);
  const projectIdStrings = projectIds.map(String);
  const accessKeyClientIds = projects.flatMap((project) =>
    (project.oAuth2Access ?? []).map((accessKey) => accessKey.clientId)
  );

  await cancelOrganizationSubscription(organization);
  await deleteProjectAssets(projectIds);
  await deleteProjectDictionaries(projectIds);

  const organizationOrProjectFilter = {
    $or: [{ organizationId }, { projectId: { $in: projectIds } }],
  };

  await Promise.all([
    TagModel.deleteMany(organizationOrProjectFilter),
    DiscussionModel.deleteMany(organizationOrProjectFilter),
    AICreditUsageModel.deleteMany({ organizationId }),
    CliSessionTokenModel.deleteMany({ organizationId: String(organizationId) }),
    OAuth2AccessTokenModel.deleteMany({
      clientId: { $in: accessKeyClientIds },
    }),
    AnalyticsRollupModel.deleteMany({ projectId: { $in: projectIds } }),
    AnalyticsVisitorModel.deleteMany({ projectId: { $in: projectIds } }),
    AnalyticsShortTermRollupModel.deleteMany({
      projectId: { $in: projectIds },
    }),
    AnalyticsLiveActivityModel.deleteMany({ projectId: { $in: projectIds } }),
    AnalyticsPageTransitionModel.deleteMany({
      projectId: { $in: projectIds },
    }),
  ]);

  await ProjectModel.deleteMany({ _id: { $in: projectIds } });
  await OrganizationModel.deleteOne({ _id: organizationId });

  await SessionModel.updateMany(
    { activeOrganizationId: organizationId },
    {
      $set: {
        activeOrganizationId: null,
        activeProjectId: null,
        activeEnvironmentId: null,
      },
    }
  );
  await UserModel.updateMany(
    { lastActiveOrganizationId: String(organizationId) },
    { $set: { lastActiveOrganizationId: null, lastActiveProjectId: null } }
  );

  logger.info(
    `Organization ${String(organizationId)} deleted with ${projectIds.length} project(s): ${projectIdStrings.join(', ')}`
  );
};
