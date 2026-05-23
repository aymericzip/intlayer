import { logger } from '@logger';
import { OrganizationModel } from '@schemas/organization.schema';
import { ProjectModel } from '@schemas/project.schema';
import { UserModel } from '@schemas/user.schema';
import { createDemoDictionaries } from '@services/dictionary.service';
import { getUserByEmail } from '@services/user.service';
import { getAuthSingleton } from '@utils/auth/getAuth';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { Types } from 'mongoose';

const DEMO_ADMIN_EMAIL =
  process.env.DEMO_ADMIN_EMAIL ?? 'demo-admin@intlayer.org';
const DEMO_EMAIL = process.env.DEMO_USER_EMAIL ?? 'demo@intlayer.org';
const DEMO_PASSWORD = process.env.DEMO_USER_PASSWORD ?? 'DemoIntlayer2024!';

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

  const auth = getAuthSingleton();
  const ctx = await (auth as any).$context;

  // ── 1. Demo admin (system user, no credentials) ────────────────────────────
  let demoAdmin = await getUserByEmail(DEMO_ADMIN_EMAIL);
  if (!demoAdmin) {
    logger.info('[demo] creating demo-admin user');
    await ctx.db.create({
      model: 'user',
      data: {
        email: DEMO_ADMIN_EMAIL,
        emailVerified: true,
        name: 'Demo Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    demoAdmin = await getUserByEmail(DEMO_ADMIN_EMAIL);
  }

  // ── 2. Demo user (with credentials) ────────────────────────────────────────
  let demoUser = await getUserByEmail(DEMO_EMAIL);
  if (!demoUser) {
    logger.info('[demo] creating demo user');
    const baUser = await ctx.db.create({
      model: 'user',
      data: {
        email: DEMO_EMAIL,
        emailVerified: true,
        name: 'Demo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const hashedPassword = await ctx.password.hash(DEMO_PASSWORD);
    await ctx.db.create({
      model: 'account',
      data: {
        userId: baUser.id,
        accountId: baUser.id,
        providerId: 'credential',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    demoUser = await getUserByEmail(DEMO_EMAIL);
  }

  if (!demoAdmin || !demoUser) {
    throw new Error('[demo] failed to create demo users');
  }

  const demoAdminId = new Types.ObjectId(String(demoAdmin.id));
  const demoUserId = new Types.ObjectId(String(demoUser.id));

  // ── 3. Demo organization ────────────────────────────────────────────────────
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
    // Ensure demo user is a member (idempotent)
    await OrganizationModel.updateOne(
      { _id: demoOrg._id },
      { $addToSet: { membersIds: demoUserId } }
    );
    demoOrg = (await OrganizationModel.findById(demoOrg._id))!;
  }

  // ── 4. Demo project ─────────────────────────────────────────────────────────
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

    // Seed demo dictionaries
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

  // ── 5. Keep demo user's last-active context up to date ────────────────────
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
      if (setCookies.length > 0) {
        reply.header('set-cookie', setCookies);
      }
    }

    signInResponse.headers.forEach((value: string, key: string) => {
      if (key.toLowerCase() !== 'set-cookie') {
        reply.header(key, value);
      }
    });

    reply.status(200).send({ ok: true });
  } catch (error) {
    logger.error('[demo] getDemoSessionHandler error:', error);
    reply.status(500).send({ error: 'Failed to create demo session' });
  }
};
