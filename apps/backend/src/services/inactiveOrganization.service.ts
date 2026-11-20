import type { Locale } from '@intlayer/types/allLocales';
import { logger } from '@logger';
import { OAuth2AccessTokenModel } from '@schemas/oAuth2.schema';
import { OrganizationModel } from '@schemas/organization.schema';
import { ProjectModel } from '@schemas/project.schema';
import { SessionModel } from '@schemas/session.schema';
import { UserModel } from '@schemas/user.schema';
import { sendEmail } from '@services/email.service';
import { deleteOrganizationAndData } from '@services/organizationDeletion.service';
import { Types } from 'mongoose';
import type { Organization } from '@/types/organization.types';

const dayMs = 24 * 60 * 60 * 1000;

/** Organizations without activity for this long get the deletion warning. */
export const ORGANIZATION_INACTIVITY_THRESHOLD_MS = 183 * dayMs;

/** Delay between the warning email and the deletion. */
export const ORGANIZATION_DELETION_NOTICE_MS = 30 * dayMs;

/** Subscription statuses of paying customers, never deleted. */
const PAYING_SUBSCRIPTION_STATUSES = new Set([
  'active',
  'trialing',
  'past_due',
]);

export type InactiveOrganizationAction = 'warn' | 'delete' | 'cancel';

export type InactiveOrganizationState = {
  lastActivityAt: Date;
  inactivityWarningSentAt?: Date;
  inactivityDeletionScheduledAt?: Date;
};

/**
 * What the inactive organization job does with one organization.
 *
 * - `warn`: inactive for 6 months and not warned yet.
 * - `delete`: still inactive once the scheduled deletion date is reached.
 * - `cancel`: warned, but someone was active since.
 *
 * @param state - Last activity and inactivity bookkeeping.
 * @param now - Reference date.
 * @returns The action, or `null` when nothing is due.
 */
export const getInactiveOrganizationAction = (
  {
    lastActivityAt,
    inactivityWarningSentAt,
    inactivityDeletionScheduledAt,
  }: InactiveOrganizationState,
  now: Date
): InactiveOrganizationAction | null => {
  const isInactive =
    now.getTime() - lastActivityAt.getTime() >=
    ORGANIZATION_INACTIVITY_THRESHOLD_MS;
  const isActiveSinceWarning =
    Boolean(inactivityWarningSentAt) &&
    lastActivityAt.getTime() > new Date(inactivityWarningSentAt!).getTime();

  if (!isInactive || isActiveSinceWarning) {
    return inactivityWarningSentAt ? 'cancel' : null;
  }

  if (!inactivityWarningSentAt) return 'warn';

  const isDeletionDue =
    Boolean(inactivityDeletionScheduledAt) &&
    new Date(inactivityDeletionScheduledAt!).getTime() <= now.getTime();

  return isDeletionDue ? 'delete' : null;
};

/** Latest of the given dates, ignoring missing ones. */
const getLatestDate = (dates: (Date | null | undefined)[]): Date =>
  new Date(
    Math.max(
      0,
      ...dates
        .filter((date): date is Date => Boolean(date))
        .map((date) => new Date(date).getTime())
    )
  );

/** Every member and admin of the organization, without duplicates. */
const getOrganizationMemberIds = (
  organization: Pick<Organization, 'membersIds' | 'adminsIds' | 'creatorId'>
): Types.ObjectId[] => {
  const uniqueIds = new Set(
    [
      ...(organization.membersIds ?? []),
      ...(organization.adminsIds ?? []),
      organization.creatorId,
    ]
      .filter(Boolean)
      .map(String)
  );

  return [...uniqueIds].map((userId) => new Types.ObjectId(userId));
};

/**
 * Last sign-in or access key use in the organization:
 * - member `updatedAt`: better-auth's `lastLoginMethod` plugin updates the user
 *   on every sign-in, which refreshes it;
 * - member sessions, refreshed daily while used (covers SSO sign-ins too);
 * - OAuth2 tokens of its access keys (CI usage);
 * - the organization creation date.
 */
export const getOrganizationLastActivityAt = async (
  organization: Pick<
    Organization,
    'id' | 'membersIds' | 'adminsIds' | 'creatorId' | 'createdAt'
  >
): Promise<Date> => {
  const memberIds = getOrganizationMemberIds(organization);

  const [members, latestSession, projects] = await Promise.all([
    UserModel.find({ _id: { $in: memberIds } }, { updatedAt: 1 }).lean(),
    // `userId` is written by better-auth and absent from the mongoose schema:
    // query the raw collection, strictQuery would drop the filter.
    SessionModel.collection.findOne(
      { userId: { $in: [...memberIds, ...memberIds.map(String)] } },
      { sort: { updatedAt: -1 }, projection: { updatedAt: 1 } }
    ),
    ProjectModel.find(
      { organizationId: organization.id },
      { oAuth2Access: 1 }
    ).lean(),
  ]);

  const accessKeyClientIds = projects.flatMap((project) =>
    (project.oAuth2Access ?? []).map((accessKey) => accessKey.clientId)
  );

  const latestToken =
    accessKeyClientIds.length > 0
      ? await OAuth2AccessTokenModel.findOne(
          { clientId: { $in: accessKeyClientIds } },
          { updatedAt: 1 }
        )
          .sort({ updatedAt: -1 })
          .lean<{ updatedAt?: Date }>()
      : null;

  return getLatestDate([
    organization.createdAt,
    ...members.map((member) => member.updatedAt),
    latestSession?.updatedAt as Date | undefined,
    latestToken?.updatedAt,
  ]);
};

/** Emails every member that the organization will be deleted. */
const sendInactivityWarnings = async (
  organization: Pick<
    Organization,
    'id' | 'name' | 'membersIds' | 'adminsIds' | 'creatorId'
  >,
  deletionDate: Date
): Promise<void> => {
  const members = await UserModel.find(
    { _id: { $in: getOrganizationMemberIds(organization) } },
    { email: 1, name: 1, lang: 1 }
  ).lean();

  for (const member of members) {
    if (!member.email) continue;

    await sendEmail({
      type: 'organizationInactivity',
      to: member.email,
      locale: member.lang as Locale | undefined,
      organizationId: organization.id,
      username: member.name,
      organizationName: organization.name,
      deletionDate,
      loginUrl: `${process.env.APP_URL}/auth/login`,
      supportUrl: `${process.env.APP_URL}/support`,
    });
  }
};

export type InactiveOrganizationReport = Record<
  InactiveOrganizationAction,
  string[]
>;

export type ProcessInactiveOrganizationsOptions = {
  now?: Date;
  /** Reports the actions without sending emails or deleting anything. */
  isDryRun?: boolean;
};

/**
 * Warns the members of organizations inactive for 6 months, deletes the ones
 * still inactive 30 days after the warning, and cancels the deletion of the
 * ones active again. Organizations of paying customers are never touched.
 *
 * @returns The organization ids per action taken.
 */
export const processInactiveOrganizations = async ({
  now = new Date(),
  isDryRun = false,
}: ProcessInactiveOrganizationsOptions = {}): Promise<InactiveOrganizationReport> => {
  const report: InactiveOrganizationReport = {
    warn: [],
    delete: [],
    cancel: [],
  };

  const organizations = OrganizationModel.find({
    $or: [
      {
        createdAt: {
          $lte: new Date(now.getTime() - ORGANIZATION_INACTIVITY_THRESHOLD_MS),
        },
      },
      { inactivityWarningSentAt: { $exists: true } },
    ],
  })
    .lean()
    .cursor();

  for await (const document of organizations) {
    const organization = {
      ...document,
      id: document._id,
    } as unknown as Organization;

    if (PAYING_SUBSCRIPTION_STATUSES.has(organization.plan?.status ?? '')) {
      continue;
    }

    const lastActivityAt = await getOrganizationLastActivityAt(organization);
    const action = getInactiveOrganizationAction(
      { ...organization, lastActivityAt },
      now
    );

    if (!action) continue;

    report[action].push(String(organization.id));

    if (isDryRun) continue;

    if (action === 'cancel') {
      await OrganizationModel.updateOne(
        { _id: organization.id },
        {
          $unset: {
            inactivityWarningSentAt: '',
            inactivityDeletionScheduledAt: '',
          },
        }
      );
      continue;
    }

    if (action === 'warn') {
      const deletionDate = new Date(
        now.getTime() + ORGANIZATION_DELETION_NOTICE_MS
      );

      // Claim first so concurrent runs never warn twice.
      const result = await OrganizationModel.updateOne(
        { _id: organization.id, inactivityWarningSentAt: { $exists: false } },
        {
          $set: {
            inactivityWarningSentAt: now,
            inactivityDeletionScheduledAt: deletionDate,
          },
        }
      );

      if (result.modifiedCount === 1) {
        await sendInactivityWarnings(organization, deletionDate);
      }
      continue;
    }

    await deleteOrganizationAndData(organization).catch((error) => {
      logger.error(
        `Inactive organization ${String(organization.id)} deletion failed: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    });
  }

  return report;
};
