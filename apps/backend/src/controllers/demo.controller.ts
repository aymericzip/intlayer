import { createLocalAccountIssuer } from '@better-auth/core/db';
import { logger } from '@logger';
import { AccountModel } from '@schemas/account.schema';
import { OrganizationModel } from '@schemas/organization.schema';
import { ProjectModel } from '@schemas/project.schema';
import { UserModel } from '@schemas/user.schema';
import { createDemoDictionaries } from '@services/dictionary.service';
import { createUser, getUserByEmail } from '@services/user.service';
import { getAuthSingleton } from '@utils/auth/getAuth';
import { hashPassword } from 'better-auth/crypto';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { Types } from 'mongoose';

/** Issuer better-auth expects on an email/password account. */
const CREDENTIAL_ISSUER = createLocalAccountIssuer('credential');

type DemoResources = {
  demoOrgId: string;
  demoProjectId: string;
};

/**
 * Deduplicates concurrent bootstraps. Deliberately *not* a persistent memo:
 * caching the result across requests means a demo user deleted from the
 * database is never recreated, and every later demo sign-in fails with a 401.
 */
let pendingBootstrap: Promise<DemoResources> | null = null;

const bootstrapDemoResources = async (): Promise<DemoResources> => {
  const DEMO_ADMIN_EMAIL = process.env.DEMO_ADMIN_EMAIL;
  const DEMO_EMAIL = process.env.DEMO_USER_EMAIL;
  const DEMO_PASSWORD = process.env.DEMO_USER_PASSWORD;

  if (!DEMO_ADMIN_EMAIL || !DEMO_EMAIL || !DEMO_PASSWORD) {
    throw new Error(
      '[demo] missing required env vars: DEMO_ADMIN_EMAIL, DEMO_USER_EMAIL, DEMO_USER_PASSWORD'
    );
  }

  // Demo admin (system user, no credentials)
  let demoAdmin = await getUserByEmail(DEMO_ADMIN_EMAIL);
  if (!demoAdmin) {
    logger.info('[demo] creating demo-admin user');
    demoAdmin = await createUser({
      email: DEMO_ADMIN_EMAIL,
      emailVerified: true,
      name: 'Demo Admin',
    });
  }

  // Demo user (with credentials)
  let demoUser = await getUserByEmail(DEMO_EMAIL);
  if (!demoUser) {
    logger.info('[demo] creating demo user');
    demoUser = await createUser({
      email: DEMO_EMAIL,
      emailVerified: true,
      name: 'Demo',
    });
  }

  // better-auth resolves the credential account by `providerId` + `issuer` +
  // `accountId`, so all three must be written here — an account missing
  // `issuer` is invisible to `signInEmail` and yields INVALID_EMAIL_OR_PASSWORD.
  const hashedPassword = await hashPassword(DEMO_PASSWORD);
  await AccountModel.findOneAndUpdate(
    { userId: String(demoUser._id), providerId: 'credential' },
    {
      userId: String(demoUser._id),
      accountId: String(demoUser._id),
      providerId: 'credential',
      issuer: CREDENTIAL_ISSUER,
      password: hashedPassword,
    },
    { upsert: true }
  );

  if (!demoAdmin || !demoUser) {
    throw new Error('[demo] failed to create demo users');
  }

  const demoAdminId = new Types.ObjectId(String(demoAdmin.id));
  const demoUserId = new Types.ObjectId(String(demoUser.id));

  // Demo organization
  let demoOrg = await OrganizationModel.findOne({ creatorId: demoAdminId });
  if (!demoOrg) {
    logger.info('[demo] creating demo organization');
    demoOrg = await OrganizationModel.create({
      name: 'Intlayer Demo',
      creatorId: demoAdminId,
      membersIds: [demoAdminId, demoUserId],
      adminsIds: [demoAdminId],
      ssoEnabled: false,
      domain: '',
    });
  } else if (!demoOrg.membersIds.map(String).includes(String(demoUserId))) {
    await OrganizationModel.updateOne(
      { _id: demoOrg._id },
      { $addToSet: { membersIds: demoUserId } }
    );
    demoOrg = (await OrganizationModel.findById(demoOrg._id))!;
  }

  // Demo project
  let demoProject = await ProjectModel.findOne({ organizationId: demoOrg._id });
  if (!demoProject) {
    logger.info('[demo] creating demo project');
    demoProject = await ProjectModel.create({
      organizationId: demoOrg._id,
      name: 'Demo Project',
      creatorId: demoAdminId,
      membersIds: [demoAdminId],
      adminsIds: [demoAdminId],
      viewersIds: [demoUserId],
      configuration: {
        internationalization: {
          locales: ['en', 'fr', 'es', 'de', 'ja'],
          defaultLocale: 'en',
        },
        editor: {
          applicationURL: 'https://intlayer.org',
        },
      },
    });

    await createDemoDictionaries(
      [String(demoProject._id)],
      String(demoAdminId)
    );
  } else if (
    !demoProject.viewersIds?.map(String).includes(String(demoUserId))
  ) {
    await ProjectModel.updateOne(
      { _id: demoProject._id },
      { $addToSet: { viewersIds: demoUserId } }
    );
    demoProject = (await ProjectModel.findById(demoProject._id))!;
  }

  // Keep demo user's last-active context up to date ────────────────────
  await UserModel.updateOne(
    { _id: demoUser.id },
    {
      $set: {
        lastActiveOrganizationId: String(demoOrg._id),
        lastActiveProjectId: String(demoProject._id),
      },
    }
  );

  return {
    demoOrgId: String(demoOrg._id),
    demoProjectId: String(demoProject._id),
  };
};

/**
 * Creates (or repairs) the shared demo user, organization and project.
 *
 * Idempotent, and re-run on every demo sign-in so a demo account removed from
 * the database self-heals; concurrent calls share a single bootstrap.
 */
const ensureDemoResources = async (): Promise<DemoResources> => {
  pendingBootstrap ??= bootstrapDemoResources().finally(() => {
    pendingBootstrap = null;
  });

  return await pendingBootstrap;
};

export const getDemoSessionHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    await ensureDemoResources();

    const auth = getAuthSingleton();

    const DEMO_EMAIL = process.env.DEMO_USER_EMAIL;
    const DEMO_PASSWORD = process.env.DEMO_USER_PASSWORD;

    if (!DEMO_EMAIL || !DEMO_PASSWORD) {
      throw new Error(
        '[demo] missing required env vars: DEMO_USER_EMAIL, DEMO_USER_PASSWORD'
      );
    }

    const signInResponse = await auth.api.signInEmail({
      body: { email: DEMO_EMAIL, password: DEMO_PASSWORD },
      headers: new Headers({
        'user-agent':
          (request.headers['user-agent'] as string) ?? 'Demo Browser',
        'x-forwarded-for': request.ip ?? '127.0.0.1',
      }),
      asResponse: true,
    });

    if (!signInResponse.ok) {
      // `asResponse: true` makes better-auth return its error response instead
      // of throwing, so a failed sign-in would otherwise be reported as a
      // successful demo session with no cookie attached.
      const failureBody = await signInResponse.text();
      throw new Error(
        `[demo] sign-in failed with ${signInResponse.status}: ${failureBody}`
      );
    }

    if (typeof signInResponse.headers.getSetCookie === 'function') {
      const setCookies = signInResponse.headers.getSetCookie();
      // reply.raw.setHeader correctly forwards an array as multiple Set-Cookie
      // entries; reply.header() with an array joins with commas which breaks cookies.
      if (setCookies.length > 0) {
        reply.raw.setHeader('set-cookie', setCookies);
      }
    }

    reply.status(200).send({ ok: true });
  } catch (error) {
    logger.error('[demo] getDemoSessionHandler error:', error);
    reply.status(500).send({ error: 'Failed to create demo session' });
  }
};
