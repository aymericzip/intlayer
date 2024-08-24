import {
  signUp,
  signIn,
  logByFirebase,
  logOut,
} from '@controllers/auth.controller';
import {
  getUsers,
  updateUser,
  updatePassword,
  validEmail,
  askResetPassword,
  resetPassword,
} from '@controllers/user.controller';
import { Router } from 'express';

export const userRouter = Router();

// Authentification
userRouter.post('/register', signUp);
userRouter.post('/login', signIn);
userRouter.post('/logByFirebase', logByFirebase);
userRouter.get('/logout', logOut);

userRouter.get('/', getUsers);
userRouter.put('/', updateUser);

userRouter.put('/:userId/password', updatePassword);

userRouter.put('/:userId/active/:secret', validEmail);

userRouter.post('/password/reset', askResetPassword);
userRouter.put('/:userId/password/reset/:secret', resetPassword);
