import { passkey } from '@better-auth/passkey';
import { sso } from '@better-auth/sso';
import { sendVerificationUpdate } from '@controllers/user.controller';
import { logger } from '@logger';
import { sendEmail } from '@services/email.service';
import { getOrganizationById } from '@services/organization.service';
import { getProjectById } from '@services/project.service';
import { getUserById } from '@services/user.service';
import { mapOrganizationToAPI } from '@utils/mapper/organization';
import { mapProjectToAPI } from '@utils/mapper/project';
import { mapSessionToAPI } from '@utils/mapper/session';
import { mapUserToAPI } from '@utils/mapper/user';
import {
  computeEffectivePermission,
  getSessionRoles,
  intersectPermissions,
} from '@utils/permissions';
import { betterAuth, type OmitId } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { createAuthMiddleware } from 'better-auth/api';
import { customSession, lastLoginMethod, twoFactor } from 'better-auth/plugins';
import { magicLink } from 'better-auth/plugins/magic-link';
import type { MongoClient } from 'mongodb';
import type { OrganizationAPI } from '@/types/organization.types';
import type { ProjectAPI } from '@/types/project.types';
import type {
  Session,
  SessionContext,
  SessionDataApi,
} from '@/types/session.types';
import type { User, UserAPI } from '@/types/user.types';

export type Auth = ReturnType<typeof betterAuth>;

export const formatSession = (session: SessionContext): OmitId<Session> => {
  const roles = getSessionRoles(session);
  let permissions = computeEffectivePermission(roles);

  // Intersect in the case a Access Token try to override the permissions
  if (session.permissions) {
    permissions = intersectPermissions(permissions, session.permissions);
  }

  const resultSession = {
    session: session.session,
    user: session.user,
    organization: session.organization,
    project: session.project,
    authType: 'session',
    permissions,
    roles,
  } as OmitId<Session>;

  return resultSession;
};

export const getAuth = (dbClient: MongoClient): Auth => {
  if (!dbClient) {
    throw new Error('MongoDB connection not established');
  }

  const auth = betterAuth({
    appName: 'Intlayer',

    database: mongodbAdapter(dbClient.db()),

    /**
     * User model
     */
    user: {
      modelName: 'users',
    },

    databaseHooks: {
      user: {
        create: {
          // Runs once, immediately after the INSERT
          after: async (user) => {
            if (!user?.emailVerified) return;

            await sendEmail({
              type: 'welcome',
              to: user.email,
              username: user.name ?? user.email.split('@')[0],
              loginLink: `${process.env.CLIENT_URL}/auth/login`,
              locale: (user as any).lang,
            });
            logger.info('Welcome e‑mail delivered', {
              email: user.email,
            });
          },
        },
      },
    },

    hooks: {
      after: createAuthMiddleware(async (ctx) => {
        const { path, context } = ctx;

        const newUser = context.newSession?.user;
        const existingUser = context.session?.user;
        const user = newUser ?? existingUser;

        if (!user) return;

        if (['/verify-email'].includes(path)) {
          sendVerificationUpdate(user as unknown as User);
          logger.info('SSE verification update sent', {
            email: user.email,
            userId: user.id,
          });

          await sendEmail({
            type: 'welcome',
            to: user.email,
            username: user.name ?? user.email.split('@')[0],
            loginLink: `${process.env.CLIENT_URL}/auth/login`,
            locale: (user as any).lang,
          });
          logger.info('Welcome e‑mail delivered', {
            email: user.email,
          });
        }
      }),
    },

    advanced: {
      // 1️⃣  Change or drop the global prefix
      // cookiePrefix: "intlayer",          // =>  intlayer.session_token
      cookiePrefix: 'intlayer', // =>  session_token  (no prefix)

      // 2️⃣  Override just the session‑token cookie
      cookies: {
        session_token: {
          // name: 'intlayer_session_token', // final name depends on the prefix above
          // attributes: { sameSite: "lax", maxAge: 60 * 60 * 24 } // optional
        },
      },

      // 3️⃣  (optional) turn off the automatic __Secure‑ prefix in non‑prod
      // useSecureCookies: false,
    },

    secret: process.env.BETTER_AUTH_SECRET as string,
    session: {
      modelName: 'sessions',
      id: 'id',

      additionalFields: {
        activeOrganizationId: { type: 'string', nullable: true, input: false },
        activeProjectId: { type: 'string', nullable: true, input: false },
      },
    },

    plugins: [
      customSession(async ({ session }) => {
        const typedSession = session as unknown as SessionDataApi;

        let userAPI: UserAPI | null = null;
        let organizationAPI: OrganizationAPI | null = null;
        let projectAPI: ProjectAPI | null = null;

        if (typedSession.userId) {
          const userData = await getUserById(typedSession.userId);

          if (userData) {
            userAPI = mapUserToAPI(userData);
          }
        }

        if (typedSession.activeOrganizationId) {
          const orgData = await getOrganizationById(
            typedSession.activeOrganizationId
          );

          if (orgData) {
            organizationAPI = mapOrganizationToAPI(orgData);
          }
        }
        if (typedSession.activeProjectId) {
          const projectData = await getProjectById(
            typedSession.activeProjectId
          );

          if (projectData) {
            projectAPI = mapProjectToAPI(projectData);
          }
        }

        const sessionWithNoPermission: SessionContext = {
          session: typedSession,
          user: userAPI!,
          organization: organizationAPI ?? null,
          project: projectAPI ?? null,
          authType: 'session',
        };

        const formattedSession = formatSession(sessionWithNoPermission);

        return mapSessionToAPI(formattedSession);
      }),
      lastLoginMethod({
        storeInDatabase: true, // adds user.lastLoginMethod in DB and session
        schema: {
          user: {
            lastLoginMethod: 'lastLoginMethod', // Custom field name
          },
        },
        customResolveMethod: (context) => {
          // When user clicks the magic link
          if (context.path === '/magic-link/verify') {
            return 'magic-link';
          }

          // Fallback to default behavior for everything else
          return null;
        },
      }),
      passkey({
        rpID: process.env.BACKEND_URL,
        rpName: 'Intlayer',
      }),
      twoFactor(),
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          logger.info('sending magic link', { email, url });
          await sendEmail({
            type: 'magicLink',
            to: email,
            username: email.split('@')[0],
            magicLink: url,
          });
        },
      }),
      sso(),
    ],

    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
      requireEmailVerification: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
      sendResetPassword: async ({ user, token }) => {
        logger.info('sending reset password email', { email: user.email });
        await sendEmail({
          type: 'resetPassword',
          to: user.email,
          username: user.name ?? user.email.split('@')[0],
          resetLink: `${process.env.CLIENT_URL}/auth/password/reset?token=${token}`,
        });
      },
      resetPasswordTokenExpiresIn: 3600,
    },
    accountLinking: {
      enabled: true, // allow linking in general
      trustedProviders: ['google', 'github', 'linkedin'], // optional: auto‑link when Google verifies the e‑mail
    },
    emailVerification: {
      autoSignInAfterVerification: true,
      sendOnSignIn: true,
      sendVerificationEmail: async ({ user, url }) => {
        logger.info('sending verification email', { email: user.email });
        await sendEmail({
          type: 'validate',
          to: user.email,
          username: user.name ?? user.email.split('@')[0],
          validationLink: url,
        });
      },
    },

    crossSubDomainCookies: {
      enabled: true,
      additionalCookies: ['session_token'],
      domain: process.env.CLIENT_URL as string,
    },
    cookiePrefix: 'intlayer',
    cookies: {
      session_token: {
        name: 'session_token',
        attributes: {
          httpOnly: true,
          secure: true,
        },
      },
    },

    trustedOrigins: [process.env.CLIENT_URL as string],

    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      },
      linkedin: {
        clientId: process.env.LINKEDIN_CLIENT_ID as string,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
      },
      // socialProviders: {
      //   apple: {
      //     clientId: process.env.APPLE_CLIENT_ID as string,
      //     clientSecret: process.env.APPLE_CLIENT_SECRET as string,
      //     // Optional
      //     appBundleIdentifier: process.env
      //       .APPLE_APP_BUNDLE_IDENTIFIER as string,
      //   },
      // },
      // // Add appleid.apple.com to trustedOrigins for Sign In with Apple flows
      // trustedOrigins: ['https://appleid.apple.com'],
    },

    logger: {
      log: (level, message, ...args) => logger[level](message, ...args),
    },
  });

  return auth;
};
