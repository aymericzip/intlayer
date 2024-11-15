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
} from '@controllers/sessionAuth.controller';
import { Router } from 'express';
import { Routes } from '@/types/Routes';

export const sessionAuthRouter: Router = Router();

const baseURL = `${process.env.CLIENT_URL}/api/auth`;

export const sessionAuthRoutes = {
  registerEmailPassword: {
    urlModel: '/register',
    url: `${baseURL}/register`,
    method: 'POST',
  },
  loginEmailPassword: {
    urlModel: '/login',
    url: `${baseURL}/login`,
    method: 'POST',
  },
  logOut: {
    urlModel: '/logout',
    url: `${baseURL}/logout`,
    method: 'POST',
  },
  updatePassword: {
    urlModel: '/password',
    url: `${baseURL}/password`,
    method: 'PUT',
  },
  askResetPassword: {
    urlModel: '/password/reset',
    url: `${baseURL}/password/reset`,
    method: 'POST',
  },
  resetPassword: {
    urlModel: '/:userId/password/reset/:secret',
    url: ({ userId, secret }: { userId: string; secret: string }) =>
      `${baseURL}/${userId}/password/reset/${secret}`,
    method: 'PUT',
  },
  validEmail: {
    urlModel: '/:userId/active/:secret',
    url: ({ userId, secret }: { userId: string; secret: string }) =>
      `${baseURL}/${userId}/active/${secret}`,
    method: 'PUT',
  },
  githubLoginQuery: {
    urlModel: '/login/github',
    url: `${baseURL}/login/github`,
    method: 'GET',
  },
  githubCallback: {
    urlModel: '/callback/github',
    url: `${baseURL}/callback/github`,
    method: 'GET',
  },
  googleLoginQuery: {
    urlModel: '/login/google',
    url: `${baseURL}/login/google`,
    method: 'GET',
  },
  googleCallback: {
    urlModel: '/callback/google',
    url: `${baseURL}/callback/google`,
    method: 'GET',
  },
} satisfies Routes;

// Authentication
sessionAuthRouter.post(
  sessionAuthRoutes.registerEmailPassword.urlModel,
  registerEmailPassword
);
sessionAuthRouter.post(
  sessionAuthRoutes.loginEmailPassword.urlModel,
  loginEmailPassword
);
sessionAuthRouter.post(sessionAuthRoutes.logOut.urlModel, logOut);

// Password
sessionAuthRouter.put(
  sessionAuthRoutes.updatePassword.urlModel,
  updatePassword
);
sessionAuthRouter.post(
  sessionAuthRoutes.askResetPassword.urlModel,
  askResetPassword
);
sessionAuthRouter.put(sessionAuthRoutes.resetPassword.urlModel, resetPassword);

// Email validation
sessionAuthRouter.put(sessionAuthRoutes.validEmail.urlModel, validEmail);

// Github auth
sessionAuthRouter.get(
  sessionAuthRoutes.githubLoginQuery.urlModel,
  githubLoginQuery
);
sessionAuthRouter.get(
  sessionAuthRoutes.githubCallback.urlModel,
  githubCallback
);

// Google auth
sessionAuthRouter.get(
  sessionAuthRoutes.googleLoginQuery.urlModel,
  googleLoginQuery
);
sessionAuthRouter.get(
  sessionAuthRoutes.googleCallback.urlModel,
  googleCallback
);
