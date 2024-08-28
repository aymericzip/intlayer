import { register, login, logOut } from '@controllers/auth.controller';
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

// Authentication
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/logout', logOut);

userRouter.get('/', getUsers);
userRouter.put('/', updateUser);

userRouter.put('/password', updatePassword);
userRouter.post('/password/reset', askResetPassword);
userRouter.put('/:userId/password/reset/:secret', resetPassword);
userRouter.put('/:userId/active/:secret', validEmail);
