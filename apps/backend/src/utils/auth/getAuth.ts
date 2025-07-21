import type { Organization } from '@/types/organization.types';
import type { Project, Rights } from '@/types/project.types';
import type { User } from '@/types/user.types';
import { sendVerificationUpdate } from '@controllers/user.controller';
import { logger } from '@logger';
import { sendEmail } from '@services/email.service';
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { createAuthMiddleware } from 'better-auth/api';
import {
  admin,
  anonymous,
  bearer,
  customSession,
  genericOAuth,
} from 'better-auth/plugins';
import type { GenericOAuthConfig } from 'better-auth/plugins/generic-oauth';
import type { Response } from 'express';
import type { MongoClient } from 'mongodb';

export const getAuth = (
  dbClient: MongoClient
): ReturnType<typeof betterAuth> => {
  if (!dbClient) {
    throw new Error('MongoDB connection not established');
  }

  // OAuth2 providers configuration (extend later if needed)
  const oauthConfig: GenericOAuthConfig[] = [];

  const auth = betterAuth({
    appName: 'Intlayer',

    database: mongodbAdapter(dbClient.db()),

    /**
     * User model
     */
    user: {
      id: 'id',
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

    session: {
      modelName: 'sessions',
      id: 'id',
      // additionalFields: {
      //   activeOrganizationId: { type: 'string', nullable: true },
      //   activeProjectId: { type: 'string', nullable: true },
      // },
    },

    plugins: [
      genericOAuth({ config: oauthConfig }),
      admin(),
      anonymous(),
      bearer({ requireSignature: true }),
      customSession(async ({ session, user }) => {
        // Transform user object to use _id instead of id
        const transformedUser = {
          ...user,
          id: user.id,
        };
        delete (transformedUser as any).id;

        return { user: transformedUser, session };
      }),
    ],

    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
      requireEmailVerification: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
      sendResetPassword: async ({ user, url }) => {
        logger.info('sending reset password email', { email: user.email });
        await sendEmail({
          type: 'resetPassword',
          to: user.email,
          username: user.name ?? user.email.split('@')[0],
          resetLink: url,
        });
      },
      resetPasswordTokenExpiresIn: 3600,
    },

    emailVerification: {
      autoSignInAfterVerification: true,
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
    },

    logger: {
      log: (level, message, ...args) => logger[level](message, ...args),
    },
  });

  return auth;
};

export type ResponseWithInformation<ResBody = any> = Response<
  ResBody,
  {
    user: User | null;
    organization: Organization | null;
    project: Project | null;
    authType: 'session' | 'oauth2' | null;
    organizationRights: Rights | null;
    projectRights: Rights | null;
    dictionaryRights: Rights | null;
    isOrganizationAdmin: boolean | null;
    isProjectAdmin: boolean | null;
    session: any | null;
  }
>;
