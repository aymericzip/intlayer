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
} from '@controllers/auth.controller';
import { Router } from 'express';

export const authRouter: Router = Router();

// Authentication
authRouter.post('/register', registerEmailPassword);
authRouter.post('/login', loginEmailPassword);
authRouter.post('/logout', logOut);

// Password
authRouter.put('/password', updatePassword);
authRouter.post('/password/reset', askResetPassword);
authRouter.put('/:userId/password/reset/:secret', resetPassword);

// Email validation
authRouter.put('/:userId/active/:secret', validEmail);

// Sessions
authRouter.get('/session', getSessionInformation);

// Github auth
authRouter.get('/callback/github', githubCallback);

// Google auth
authRouter.get('/callback/google', googleCallback);
