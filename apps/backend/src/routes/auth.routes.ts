import {
  registerEmailPassword,
  loginEmailPassword,
  logOut,
  updatePassword,
  validEmail,
  askResetPassword,
  resetPassword,
  getSessionInformation,
  githubCallback,
  googleCallback,
  githubLoginQuery,
  googleLoginQuery,
} from '@controllers/auth.controller';
import {
  apiAccessControlMiddleWare,
  AccessRule,
} from '@utils/apiAccessControl';
import { Router } from 'express';

export const authRouter: Router = Router();

// Authentication
authRouter.post(
  '/register',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated),
  registerEmailPassword
);
authRouter.post(
  '/login',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated),
  loginEmailPassword
);
authRouter.post(
  '/logout',
  apiAccessControlMiddleWare(AccessRule.authenticated),
  logOut
);

// Password
authRouter.put(
  '/password',
  apiAccessControlMiddleWare(AccessRule.authenticated),
  updatePassword
);
authRouter.post(
  '/password/reset',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated),
  askResetPassword
);
authRouter.put(
  '/:userId/password/reset/:secret',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated),
  resetPassword
);

// Email validation
authRouter.put(
  '/:userId/active/:secret',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated, AccessRule.admin),
  validEmail
);

// Sessions
authRouter.get(
  '/session',
  apiAccessControlMiddleWare(AccessRule.public),
  getSessionInformation
);

// Github auth
authRouter.get(
  '/login/github',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated),
  githubLoginQuery
);
authRouter.get(
  '/callback/github',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated),
  githubCallback
);

// Google auth
authRouter.get(
  '/login/google',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated),
  googleLoginQuery
);
authRouter.get(
  '/callback/google',
  apiAccessControlMiddleWare(AccessRule.noneAuthenticated),
  googleCallback
);
