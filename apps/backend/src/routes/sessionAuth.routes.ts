/* eslint-disable sonarjs/no-misused-promises */
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
import {
  apiAccessControlMiddleWare,
  AccessRule,
} from '@utils/apiAccessControl';
import { Router } from 'express';

export const sessionAuthRouter: Router = Router();

// Authentication
sessionAuthRouter.post(
  '/register',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated),
  registerEmailPassword
);
sessionAuthRouter.post(
  '/login',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated),
  loginEmailPassword
);
sessionAuthRouter.post(
  '/logout',
  apiAccessControlMiddleWare(AccessRule.authenticated),
  logOut
);

// Password
sessionAuthRouter.put(
  '/password',
  apiAccessControlMiddleWare(AccessRule.authenticated),
  updatePassword
);
sessionAuthRouter.post(
  '/password/reset',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated),
  askResetPassword
);
sessionAuthRouter.put(
  '/:userId/password/reset/:secret',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated),
  resetPassword
);

// Email validation
sessionAuthRouter.put(
  '/:userId/active/:secret',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated, AccessRule.admin),
  validEmail
);

// Github auth
sessionAuthRouter.get(
  '/login/github',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated),
  githubLoginQuery
);
sessionAuthRouter.get(
  '/callback/github',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated),
  githubCallback
);

// Google auth
sessionAuthRouter.get(
  '/login/google',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated),
  googleLoginQuery
);
sessionAuthRouter.get(
  '/callback/google',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated),
  googleCallback
);
