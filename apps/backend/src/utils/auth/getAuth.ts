import type { Organization } from '@/types/organization.types';
import type { Project, Rights } from '@/types/project.types';
import type { User } from '@/types/user.types';
import { logger } from '@logger';
import { sendEmail } from '@services/email.service';
import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { admin, anonymous, bearer, customSession } from 'better-auth/plugins';
import type { Response } from 'express';
import type { MongoClient } from 'mongodb';

export const getAuth = (
  dbClient: MongoClient
): ReturnType<typeof betterAuth> => {
  if (!dbClient) {
    throw new Error('MongoDB connection not established');
  }

  return betterAuth({
    database: mongodbAdapter(dbClient.db()),
    user: {
      id: '_id',
      additionalFields: {
        role: { type: 'string', required: false },
        lang: { type: 'string', required: false },
      },
    },

    session: {
      id: '_id',
      /** keep the usual expiry / refresh options here */
      additionalFields: {
        /** “context” the user has chosen in the UI */
        activeOrganizationId: { type: 'string', nullable: true },
        activeProjectId: { type: 'string', nullable: true },
      },
    },
    plugins: [
      admin(),
      anonymous(),
      bearer({
        requireSignature: true, // tamper‑proof
      }),
      customSession(async ({ session, user }) => ({
        user,
        session,
        context: {
          activeOrganizationId: (session as any).session.activeOrganizationId,
          activeProjectId: (session as any).session.activeProjectId,
        },
      })),
    ],
    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
      requireEmailVerification: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
      sendResetPassword: async ({ user, url, token }) => {
        // Send reset password email
        await sendEmail({
          type: 'resetPassword',
          to: user.email,
          username: user.name,
          resetLink: url,
        });
      },

      resetPasswordTokenExpiresIn: 3600, // 1 hour
    },

    emailVerification: {
      sendVerificationEmail: async ({ user, url, token }) => {
        await sendEmail({
          type: 'validate',
          to: user.email,
          username: user.name,
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
    // trustedOrigins: [process.env.CLIENT_URL as string],
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
      disabled: false,
      level: 'error',
      log: (level, message, ...args) => {
        // Custom logging implementation
        if (level === 'error') {
          logger.error(message, ...args);
        } else if (level === 'warn') {
          logger.warn(message, ...args);
        } else if (level === 'info') {
          logger.info(message, ...args);
        } else if (level === 'debug') {
          logger.debug(message, ...args);
        } else {
          logger.info(message, ...args);
        }
      },
    },
  });
};

export type ResponseWithInformation<ResBody = any> = Response<
  ResBody,
  {
    user: User | null;
    // Auth Context
    organization: Organization | null;
    project: Project | null;
    authType: 'session' | 'oauth2' | null;
    // Auth Rights - oAuth2 Auth
    organizationRights: Rights | null;
    projectRights: Rights | null;
    dictionaryRights: Rights | null;
    // Auth Rights - Session Auth
    isOrganizationAdmin: boolean | null;
    isProjectAdmin: boolean | null;
    // Session data from better-auth
    session: any | null;
  }
>;
