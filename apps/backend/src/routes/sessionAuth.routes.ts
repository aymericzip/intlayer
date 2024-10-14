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
import { accessControlMiddleWare, AccessRule } from '@utils/accessControl';
import { Router } from 'express';

export const sessionAuthRouter: Router = Router();

// Authentication
sessionAuthRouter.post(
  '/register',
  accessControlMiddleWare(AccessRule.noneAuthenticated),
  registerEmailPassword
);
sessionAuthRouter.post(
  '/login',
  accessControlMiddleWare(AccessRule.noneAuthenticated),
  loginEmailPassword
);
sessionAuthRouter.post(
  '/logout',
  accessControlMiddleWare(AccessRule.authenticated),
  logOut
);

// Password
sessionAuthRouter.put(
  '/password',
  accessControlMiddleWare(AccessRule.authenticated),
  updatePassword
);
sessionAuthRouter.post(
  '/password/reset',
  accessControlMiddleWare(AccessRule.noneAuthenticated),
  askResetPassword
);
sessionAuthRouter.put(
  '/:userId/password/reset/:secret',
  accessControlMiddleWare(AccessRule.noneAuthenticated),
  resetPassword
);

// Email validation
sessionAuthRouter.put(
  '/:userId/active/:secret',
  accessControlMiddleWare(AccessRule.noneAuthenticated, AccessRule.admin),
  validEmail
);

// Github auth
sessionAuthRouter.get(
  '/login/github',
  accessControlMiddleWare(AccessRule.noneAuthenticated),
  githubLoginQuery
);
sessionAuthRouter.get(
  '/callback/github',
  accessControlMiddleWare(AccessRule.noneAuthenticated),
  githubCallback
);

// Google auth
sessionAuthRouter.get(
  '/login/google',
  accessControlMiddleWare(AccessRule.noneAuthenticated),
  googleLoginQuery
);
sessionAuthRouter.get(
  '/callback/google',
  accessControlMiddleWare(AccessRule.noneAuthenticated),
  googleCallback
);
