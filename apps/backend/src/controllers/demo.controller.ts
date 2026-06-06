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

const DEMO_ADMIN_EMAIL = process.env.DEMO_ADMIN_EMAIL;
const DEMO_EMAIL = process.env.DEMO_USER_EMAIL;
const DEMO_PASSWORD = process.env.DEMO_USER_PASSWORD;

let _initialized = false;
let _demoOrgId: string | null = null;
let _demoProjectId: string | null = null;

const ensureDemoResources = async (): Promise<{
  demoOrgId: string;
  demoProjectId: string;
}> => {
  if (_initialized && _demoOrgId && _demoProjectId) {
    return { demoOrgId: _demoOrgId, demoProjectId: _demoProjectId };
  }

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

    const hashedPassword = await hashPassword(DEMO_PASSWORD);
    await AccountModel.create({
      userId: String(demoUser._id),
      accountId: String(demoUser._id),
      providerId: 'credential',
      password: hashedPassword,
    });
  }

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
      },
    });

    await createDemoDictionaries(
      [String(demoProject._id)],
      String(demoAdminId)
    );
  } else if (
    !(demoProject as any).viewersIds?.map(String).includes(String(demoUserId))
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

  _demoOrgId = String(demoOrg._id);
  _demoProjectId = String(demoProject._id);
  _initialized = true;

  return { demoOrgId: _demoOrgId, demoProjectId: _demoProjectId };
};

export const getDemoSessionHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    await ensureDemoResources();

    const auth = getAuthSingleton();

    const signInResponse = await (auth as any).api.signInEmail({
      body: { email: DEMO_EMAIL, password: DEMO_PASSWORD },
      headers: new Headers({
        'user-agent':
          (request.headers['user-agent'] as string) ?? 'Demo Browser',
        'x-forwarded-for': request.ip ?? '127.0.0.1',
      }),
      asResponse: true,
    });

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
