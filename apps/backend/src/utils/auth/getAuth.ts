import { passkey } from '@better-auth/passkey';
import { sso } from '@better-auth/sso';
import { sendVerificationUpdate } from '@controllers/user.controller';
import { logger } from '@logger';
import { sendEmail } from '@services/email.service';
import { resolveSessionEnvironment } from '@services/environment.service';
import { getOrganizationById } from '@services/organization.service';
import { getProjectById } from '@services/project.service';
import {
  clearZombieSessionContext,
  restoreSessionContext,
} from '@services/session.service';
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
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { createAuthMiddleware } from 'better-auth/api';
import { customSession, lastLoginMethod, twoFactor } from 'better-auth/plugins';
import { magicLink } from 'better-auth/plugins/magic-link';
import type { MongoClient } from 'mongodb';
import { Types } from 'mongoose';

import type { OrganizationAPI } from '@/types/organization.types';
import type { ProjectAPI } from '@/types/project.types';
import type {
  Session,
  SessionContext,
  SessionDataApi,
} from '@/types/session.types';
import type { UserAPI } from '@/types/user.types';

export type Auth = ReturnType<typeof betterAuth>;

// Check if we are in production based on the domain or NODE_ENV
const isProd = process.env.DOMAIN !== 'localhost';

let _authSingleton: Auth | null = null;

export const initializeAuth = (dbClient: MongoClient): Auth => {
  _authSingleton = getAuth(dbClient);
  return _authSingleton;
};

export const getAuthSingleton = (): Auth => {
  if (!_authSingleton) {
    throw new Error('Auth not initialized. Call initializeAuth first.');
  }
  return _authSingleton;
};

export const formatSession = (session: SessionContext): Session => {
  const roles = getSessionRoles(session);
  let permissions = computeEffectivePermission(roles);

  // Intersect in the case a Access Token try to override the permissions
  if (session.permissions) {
    permissions = intersectPermissions(permissions, session.permissions);
  }

  const resultSession: Session = {
    session: session.session as Session['session'],
    user: session.user as Session['user'],
    organization: session.organization ?? null,
    project: session.project ?? null,
    environment: session.environment ?? null,
    authType: 'session',
    permissions,
    roles,
    allowedEnvironmentIds: session.allowedEnvironmentIds ?? null,
    allowedLocales: session.allowedLocales ?? null,
    ...(session.session?.id && {
      id: new Types.ObjectId(session.session.id),
    }),
  };

  return resultSession;
};

export const getAuth = (dbClient: MongoClient): Auth => {
  if (!dbClient) {
    throw new Error('MongoDB connection not established');
  }

  const auth = betterAuth({
    appName: 'Intlayer',

    baseURL: process.env.BACKEND_URL,

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
              loginLink: `${process.env.APP_URL}/auth/login`,
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

        if (path.includes('/verify-email')) {
          // Fetch fresh user from DB so emailVerified is definitely up-to-date
          // (the hook context user may be a stale snapshot from before the DB write).
          const freshUser = await getUserById(user.id);

          if (freshUser) {
            sendVerificationUpdate(freshUser);
          }

          logger.info('SSE verification update sent', {
            email: user.email,
            userId: user.id,
          });

          await sendEmail({
            type: 'welcome',
            to: user.email,
            username: user.name ?? user.email.split('@')[0],
            loginLink: `${process.env.APP_URL}/auth/login`,
            locale: (user as any).lang,
          });
          logger.info('Welcome e‑mail delivered', {
            email: user.email,
          });
        }
      }),
    },

    advanced: {
      crossSubDomainCookies: {
        enabled: isProd,
        domain: isProd ? process.env.DOMAIN : undefined,
        additionalCookies: ['session_token'],
      },
      cookiePrefix: 'intlayer',
      cookies: {
        session_token: {
          name: 'session_token',
          attributes: {
            httpOnly: true,
            secure: isProd,
            sameSite: 'lax',
          },
        },
      },
    },

    secret: process.env.BETTER_AUTH_SECRET as string,
    session: {
      modelName: 'sessions',
      id: 'id',

      // Session lives for 30 days; each access made more than 1 day after the
      // last refresh slides the expiry forward, so an active user effectively
      // stays signed in indefinitely.
      expiresIn: 60 * 60 * 24 * 30,
      updateAge: 60 * 60 * 24,

      // Cache the session in a signed cookie for 5 minutes to avoid hitting
      // Mongo on every request while still picking up updateAge refreshes.
      cookieCache: {
        enabled: false,
        maxAge: 5 * 60,
      },

      additionalFields: {
        activeOrganizationId: { type: 'string', nullable: true, input: false },
        activeProjectId: { type: 'string', nullable: true, input: false },
        activeEnvironmentId: { type: 'string', nullable: true, input: false },
      },
    },

    plugins: [
      customSession(async ({ session }) => {
        const typedSession = session as unknown as SessionDataApi;

        const normalizeId = (rawId: unknown): string | null => {
          if (typeof rawId === 'string') return rawId;
          if (
            rawId &&
            typeof rawId === 'object' &&
            'buffer' in rawId &&
            (rawId as any).buffer instanceof Uint8Array
          ) {
            return Buffer.from((rawId as any).buffer).toString('hex');
          }
          return null;
        };

        const storedOrganizationId = typedSession.activeOrganizationId
          ? normalizeId(typedSession.activeOrganizationId)
          : null;
        const storedProjectId = typedSession.activeProjectId
          ? normalizeId(typedSession.activeProjectId)
          : null;
        // null = production (default env); ObjectId string = non-default env
        const storedEnvironmentId = typedSession.activeEnvironmentId
          ? normalizeId(typedSession.activeEnvironmentId)
          : null;

        const userData = typedSession.userId
          ? await getUserById(typedSession.userId)
          : null;

        // Restore org/project context from user document when the session lacks it
        const { organizationId, projectId } = await restoreSessionContext({
          sessionId: typedSession.id,
          currentOrganizationId: storedOrganizationId,
          currentProjectId: storedProjectId,
          lastActiveOrganizationId: userData?.lastActiveOrganizationId,
          lastActiveProjectId: userData?.lastActiveProjectId,
        });

        typedSession.activeOrganizationId = organizationId ?? undefined;
        typedSession.activeProjectId = projectId ?? undefined;

        const [organizationData, projectData] = await Promise.all([
          organizationId ? getOrganizationById(organizationId) : null,
          projectId ? getProjectById(projectId) : null,
        ]);

        const userAPI: UserAPI | null = userData
          ? mapUserToAPI(userData)
          : null;
        let organizationAPI: OrganizationAPI | null = organizationData
          ? mapOrganizationToAPI(organizationData)
          : null;
        let projectAPI: ProjectAPI | null = projectData
          ? mapProjectToAPI(projectData)
          : null;

        // Resolve the active environment; null resolvedEnvironmentId = production
        const {
          environmentAPI: resolvedEnvironmentAPI,
          resolvedEnvironmentId,
        } = await resolveSessionEnvironment({
          projectData,
          sessionId: typedSession.id,
          sessionEnvironmentId: storedEnvironmentId,
        });
        let environmentAPI = resolvedEnvironmentAPI;

        if (resolvedEnvironmentId !== storedEnvironmentId) {
          typedSession.activeEnvironmentId = resolvedEnvironmentId as any;
        }

        // Clear stale session references whose documents no longer exist
        const zombieCleanup = await clearZombieSessionContext({
          sessionId: typedSession.id,
          userId: userData?.id ?? null,
          storedOrganizationId: organizationId,
          organizationExists: Boolean(organizationData),
          storedProjectId: projectId,
          projectExists: Boolean(projectData),
        });

        if (zombieCleanup) {
          if (zombieCleanup.organizationCleared) {
            typedSession.activeOrganizationId = undefined;
            organizationAPI = null;
          }
          if (zombieCleanup.projectCleared) {
            typedSession.activeProjectId = undefined;
            typedSession.activeEnvironmentId = undefined;
            projectAPI = null;
            environmentAPI = null;
          }
        }

        // Resolve granular access constraints for this user in this project
        const memberAccessEntry =
          projectData?.memberAccess?.find(
            (access) => String(access.userId) === String(userData?.id)
          ) ?? null;

        const allowedEnvironmentIds =
          memberAccessEntry?.allowedEnvironmentIds != null
            ? (
                memberAccessEntry.allowedEnvironmentIds as ({
                  toString(): string;
                } | null)[]
              ).map((id) => (id === null ? null : String(id)))
            : null;
        const allowedLocales = memberAccessEntry?.allowedLocales ?? null;

        return mapSessionToAPI(
          formatSession({
            session: typedSession,
            user: userAPI!,
            organization: organizationAPI,
            project: projectAPI,
            environment: environmentAPI,
            authType: 'session',
            allowedEnvironmentIds,
            allowedLocales,
          })
        );
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
        rpID: process.env.DOMAIN,
        rpName: 'Intlayer',
      }),
      twoFactor(),
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          logger.info('sending magic link', { email, url });
          await sendEmail({
            type: 'magicLink',
            to: email,
            username: email.split('@')[0]!,
            magicLink: url,
          });
        },
      }),
      sso({
        organizationProvisioning: {},
      }),
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
          resetLink: `${process.env.APP_URL}/auth/password/reset?token=${token}`,
        });
      },
      resetPasswordTokenExpiresIn: 3600,
    },

    emailVerification: {
      autoSignInAfterVerification: true,
      sendOnSignIn: true,
      sendVerificationEmail: async ({ user, url }) => {
        logger.info('sending verification email', { email: user.email });
        // Override callbackURL so the link redirects to the app after verification,
        // not to the backend root which just shows the raw API response.
        const verificationUrl = new URL(url);
        verificationUrl.searchParams.set(
          'callbackURL',
          process.env.APP_URL ?? '/'
        );
        await sendEmail({
          type: 'validate',
          to: user.email,
          username: user.name ?? user.email.split('@')[0],
          validationLink: verificationUrl.toString(),
        });
      },
    },

    trustedOrigins: [
      process.env.WEBSITE_URL,
      process.env.APP_URL,
      process.env.SHOWCASE_URL,
    ].filter(Boolean) as string[],

    accountLinking: {
      enabled: true, // allow linking in general
      trustedProviders: [
        'google',
        'github',
        'linkedin',
        'gitlab',
        'atlassian',
        'microsoft',
        'email-password',
        'magic-link',
        'passkey',
      ],
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      },
      atlassian: {
        clientId: process.env.ATLASSIAN_CLIENT_ID as string,
        clientSecret: process.env.ATLASSIAN_CLIENT_SECRET as string,
      },
      gitlab: {
        clientId: process.env.GITLAB_CLIENT_ID as string,
        clientSecret: process.env.GITLAB_CLIENT_SECRET as string,
      },
      linkedin: {
        clientId: process.env.LINKEDIN_CLIENT_ID as string,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
      },
      microsoft: {
        clientId: process.env.MICROSOFT_CLIENT_ID as string,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
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

  return auth as any;
};
