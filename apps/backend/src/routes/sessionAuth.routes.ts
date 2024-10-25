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
import { accessControlMiddleWare, AccessRule } from '@utils/accessControl';
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
  accessControlMiddleWare(AccessRule.noneAuthenticated),
  registerEmailPassword
);
sessionAuthRouter.post(
  sessionAuthRoutes.loginEmailPassword.urlModel,
  accessControlMiddleWare(AccessRule.noneAuthenticated),
  loginEmailPassword
);
sessionAuthRouter.post(
  sessionAuthRoutes.logOut.urlModel,
  accessControlMiddleWare(AccessRule.authenticated),
  logOut
);

// Password
sessionAuthRouter.put(
  sessionAuthRoutes.updatePassword.urlModel,
  accessControlMiddleWare(AccessRule.authenticated),
  updatePassword
);
sessionAuthRouter.post(
  sessionAuthRoutes.askResetPassword.urlModel,
  accessControlMiddleWare(AccessRule.noneAuthenticated),
  askResetPassword
);
sessionAuthRouter.put(
  sessionAuthRoutes.resetPassword.urlModel,
  accessControlMiddleWare(AccessRule.noneAuthenticated),
  resetPassword
);

// Email validation
sessionAuthRouter.put(
  sessionAuthRoutes.validEmail.urlModel,
  accessControlMiddleWare(AccessRule.noneAuthenticated, AccessRule.admin),
  validEmail
);

// Github auth
sessionAuthRouter.get(
  sessionAuthRoutes.githubLoginQuery.urlModel,
  accessControlMiddleWare(AccessRule.noneAuthenticated),
  githubLoginQuery
);
sessionAuthRouter.get(
  sessionAuthRoutes.githubCallback.urlModel,
  accessControlMiddleWare(AccessRule.noneAuthenticated),
  githubCallback
);

// Google auth
sessionAuthRouter.get(
  sessionAuthRoutes.googleLoginQuery.urlModel,
  accessControlMiddleWare(AccessRule.noneAuthenticated),
  googleLoginQuery
);
sessionAuthRouter.get(
  sessionAuthRoutes.googleCallback.urlModel,
  accessControlMiddleWare(AccessRule.noneAuthenticated),
  googleCallback
);
