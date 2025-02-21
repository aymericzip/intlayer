import {
  registerEmailPassword,
  loginEmailPassword,
  logOut,
  updatePassword,
  validEmail,
  askResetPassword,
  resetPassword,
  githubCallback,
  googleCallback,
  githubLoginQuery,
  googleLoginQuery,
  verifyEmailStatusSSE,
  checkIfUserHasPassword,
} from '@controllers/sessionAuth.controller';
import { Router } from 'express';
import type { Routes } from '@/types/Routes';

export const sessionAuthRouter: Router = Router();

const baseURL = () => `${process.env.BACKEND_URL}/api/auth`;

export const getSessionAuthRoutes = () =>
  ({
    registerEmailPassword: {
      urlModel: '/register',
      url: `${baseURL}/register`,
      method: 'POST',
    },
    loginEmailPassword: {
      urlModel: '/login',
      url: `${baseURL()}/login`,
      method: 'POST',
    },
    logOut: {
      urlModel: '/logout',
      url: `${baseURL()}/logout`,
      method: 'POST',
    },
    updatePassword: {
      urlModel: '/password',
      url: `${baseURL()}/password`,
      method: 'PUT',
    },
    askResetPassword: {
      urlModel: '/password/reset',
      url: `${baseURL()}/password/reset`,
      method: 'POST',
    },
    resetPassword: {
      urlModel: '/:userId/password/reset/:secret',
      url: ({ userId, secret }: { userId: string; secret: string }) =>
        `${baseURL()}/${userId}/password/reset/${secret}`,
      method: 'PUT',
    },
    checkIfUserHasPassword: {
      urlModel: '/password/has',
      url: `${baseURL()}/password/has`,
      method: 'GET',
    },
    validEmail: {
      urlModel: '/:userId/active/:secret',
      url: ({
        userId,
        secret,
        callBack_url,
      }: {
        userId: string;
        secret: string;
        callBack_url?: string;
      }) =>
        `${baseURL()}/${userId}/active/${secret}${
          callBack_url ? `?callBack_url=${callBack_url}` : ''
        }`,
      method: 'GET',
    },
    verifyEmailStatusSSE: {
      urlModel: '/verify-email-status/:userId',
      url: ({ userId }: { userId: string }) =>
        `${baseURL()}/verify-email-status/${userId}`,
      method: 'GET',
    },
    githubLoginQuery: {
      urlModel: '/login/github',
      url: `${baseURL()}/login/github`,
      method: 'GET',
    },
    githubCallback: {
      urlModel: '/callback/github',
      url: `${baseURL()}/callback/github`,
      method: 'GET',
    },
    googleLoginQuery: {
      urlModel: '/login/google',
      url: `${baseURL()}/login/google`,
      method: 'GET',
    },
    googleCallback: {
      urlModel: '/callback/google',
      url: `${baseURL()}/callback/google`,
      method: 'GET',
    },
  }) satisfies Routes;

// Authentication
sessionAuthRouter.post(
  getSessionAuthRoutes().registerEmailPassword.urlModel,
  registerEmailPassword
);
sessionAuthRouter.post(
  getSessionAuthRoutes().loginEmailPassword.urlModel,
  loginEmailPassword
);
sessionAuthRouter.post(getSessionAuthRoutes().logOut.urlModel, logOut);

// Password
sessionAuthRouter.put(
  getSessionAuthRoutes().updatePassword.urlModel,
  updatePassword
);
sessionAuthRouter.post(
  getSessionAuthRoutes().askResetPassword.urlModel,
  askResetPassword
);
sessionAuthRouter.put(
  getSessionAuthRoutes().resetPassword.urlModel,
  resetPassword
);

sessionAuthRouter.get(
  getSessionAuthRoutes().checkIfUserHasPassword.urlModel,
  checkIfUserHasPassword
);

// Email validation
sessionAuthRouter.get(getSessionAuthRoutes().validEmail.urlModel, validEmail);

// Verify email status
sessionAuthRouter.get(
  getSessionAuthRoutes().verifyEmailStatusSSE.urlModel,
  verifyEmailStatusSSE
);

// Github auth
sessionAuthRouter.get(
  getSessionAuthRoutes().githubLoginQuery.urlModel,
  githubLoginQuery
);
sessionAuthRouter.get(
  getSessionAuthRoutes().githubCallback.urlModel,
  githubCallback
);

// Google auth
sessionAuthRouter.get(
  getSessionAuthRoutes().googleLoginQuery.urlModel,
  googleLoginQuery
);
sessionAuthRouter.get(
  getSessionAuthRoutes().googleCallback.urlModel,
  googleCallback
);
