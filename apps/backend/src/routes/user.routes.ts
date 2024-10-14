/* eslint-disable sonarjs/no-misused-promises */
import {
  getUsers,
  updateUser,
  getUserByEmail,
  getUserById,
  createUser,
  getUserByAccount,
} from '@controllers/user.controller';
import { accessControlMiddleWare, AccessRule } from '@utils/accessControl';
import { Router } from 'express';

export const userRouter: Router = Router();

userRouter.get('/', accessControlMiddleWare(AccessRule.admin), getUsers);
userRouter.put('/', accessControlMiddleWare(AccessRule.none), updateUser);
userRouter.post('/', accessControlMiddleWare(AccessRule.admin), createUser);
userRouter.get(
  '/:userId',
  accessControlMiddleWare(AccessRule.authenticated),
  getUserById
);
userRouter.get(
  '/email/:email',
  accessControlMiddleWare(AccessRule.authenticated),
  getUserByEmail
);
userRouter.get('/account/:provider/:providerAccountId', getUserByAccount);
