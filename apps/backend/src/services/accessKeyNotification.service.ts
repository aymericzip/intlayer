import type { AccessKeyNotificationKind } from '@emails/AccessKeyNotificationEmail';
import type { Locale } from '@intlayer/types/allLocales';
import { logger } from '@logger';
import { ProjectModel } from '@schemas/project.schema';
import { sendEmail } from '@services/email.service';
import { getUserById } from '@services/user.service';
import type { Types } from 'mongoose';
import type { OAuth2Access, Project } from '@/types/project.types';

/** How long before expiration the reminder email is sent. */
export const ACCESS_KEY_REMINDER_WINDOW_MS = 3 * 24 * 60 * 60 * 1000;

/**
 * Keys expired longer ago than this get no "has expired" email, so the first
 * run after a deployment does not mail every key that expired long ago.
 */
export const ACCESS_KEY_EXPIRED_NOTICE_GRACE_MS = 7 * 24 * 60 * 60 * 1000;

type ExpirationNotificationKind = Exclude<AccessKeyNotificationKind, 'deleted'>;

/** Bookkeeping field claimed before sending each expiration email. */
const SENT_AT_FIELD = {
  expiringSoon: 'expirationReminderSentAt',
  expired: 'expirationNoticeSentAt',
} as const satisfies Record<ExpirationNotificationKind, keyof OAuth2Access>;

type ExpirationCheckedAccessKey = Pick<
  OAuth2Access,
  'expiresAt' | 'expirationReminderSentAt' | 'expirationNoticeSentAt'
> &
  Partial<Pick<OAuth2Access, 'createdAt'>>;

/**
 * Expiration email an access key is due, if any.
 *
 * - `expiringSoon`: expires within the reminder window. Skipped for keys
 *   created with a lifetime shorter than the window, whose creator already
 *   chose the date.
 * - `expired`: past its date, within the grace period.
 *
 * @param accessKey - The access key to check.
 * @param now - Reference date.
 * @returns The due email kind, or `null`.
 */
export const getDueExpirationNotification = (
  accessKey: ExpirationCheckedAccessKey,
  now: Date
): ExpirationNotificationKind | null => {
  if (!accessKey.expiresAt) return null;

  const expirationTime = new Date(accessKey.expiresAt).getTime();
  const remainingMs = expirationTime - now.getTime();

  if (remainingMs <= 0) {
    const isWithinGrace = -remainingMs <= ACCESS_KEY_EXPIRED_NOTICE_GRACE_MS;

    return isWithinGrace && !accessKey.expirationNoticeSentAt
      ? 'expired'
      : null;
  }

  if (remainingMs > ACCESS_KEY_REMINDER_WINDOW_MS) return null;
  if (accessKey.expirationReminderSentAt) return null;

  const lifetimeMs = accessKey.createdAt
    ? expirationTime - new Date(accessKey.createdAt).getTime()
    : Number.POSITIVE_INFINITY;

  return lifetimeMs > ACCESS_KEY_REMINDER_WINDOW_MS ? 'expiringSoon' : null;
};

/**
 * Atomically marks an expiration email as sent. Only one caller wins, so
 * several backend instances never send the same email twice.
 *
 * @returns True when this call claimed the email.
 */
const claimExpirationNotification = async (
  projectId: Types.ObjectId,
  clientId: OAuth2Access['clientId'],
  kind: ExpirationNotificationKind,
  now: Date
): Promise<boolean> => {
  const field = SENT_AT_FIELD[kind];

  const result = await ProjectModel.updateOne(
    {
      _id: projectId,
      oAuth2Access: {
        $elemMatch: { clientId, [field]: { $exists: false } },
      },
    },
    {
      $set: {
        [`oAuth2Access.$.${field}`]: now,
        // An expired key never needs its reminder anymore.
        'oAuth2Access.$.expirationReminderSentAt': now,
      },
    }
  );

  return result.modifiedCount === 1;
};

export type SendAccessKeyNotificationOptions = {
  kind: AccessKeyNotificationKind;
  accessKey: Pick<OAuth2Access, 'name' | 'clientId' | 'userId'>;
  project: {
    name: Project['name'];
    organizationId: Project['organizationId'] | string;
  };
  /** Expiration date, or deletion date for `deleted`. */
  eventDate: Date;
};

/**
 * Emails the owner of an access key about one of its lifecycle events, in the
 * owner's language and through the organization mailer when configured.
 */
export const sendAccessKeyNotification = async ({
  kind,
  accessKey,
  project,
  eventDate,
}: SendAccessKeyNotificationOptions): Promise<void> => {
  const owner = await getUserById(accessKey.userId);

  if (!owner?.email) {
    logger.warn(
      `Access key ${accessKey.clientId} has no reachable owner, ${kind} email skipped`
    );
    return;
  }

  const emailType = {
    expiringSoon: 'accessKeyExpiringSoon',
    expired: 'accessKeyExpired',
    deleted: 'accessKeyDeleted',
  } as const satisfies Record<AccessKeyNotificationKind, string>;

  await sendEmail({
    type: emailType[kind],
    to: owner.email,
    locale: owner.lang as Locale | undefined,
    organizationId: project.organizationId,
    username: owner.name,
    accessKeyName: accessKey.name ?? accessKey.clientId,
    projectName: project.name,
    eventDate,
    accessKeysUrl: `${process.env.APP_URL}/projects`,
    supportUrl: `${process.env.APP_URL}/support`,
  });
};

/**
 * Sends every due "expires in 3 days" and "has expired" access key email.
 *
 * @param now - Reference date.
 * @returns The number of emails sent.
 */
export const processAccessKeyExpirations = async (
  now: Date = new Date()
): Promise<number> => {
  const projects = await ProjectModel.find(
    {
      'oAuth2Access.expiresAt': {
        $gt: new Date(now.getTime() - ACCESS_KEY_EXPIRED_NOTICE_GRACE_MS),
        $lte: new Date(now.getTime() + ACCESS_KEY_REMINDER_WINDOW_MS),
      },
    },
    { name: 1, organizationId: 1, oAuth2Access: 1 }
  ).lean();

  let sentCount = 0;

  for (const project of projects) {
    for (const accessKey of project.oAuth2Access ?? []) {
      const kind = getDueExpirationNotification(accessKey, now);

      if (!kind || !accessKey.expiresAt) continue;

      const isClaimed = await claimExpirationNotification(
        project._id,
        accessKey.clientId,
        kind,
        now
      );

      if (!isClaimed) continue;

      await sendAccessKeyNotification({
        kind,
        accessKey,
        project,
        eventDate: accessKey.expiresAt,
      });
      sentCount += 1;
    }
  }

  return sentCount;
};
