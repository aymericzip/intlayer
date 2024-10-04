/* eslint-disable sonarjs/no-misused-promises */
import {
  getUsers,
  updateUser,
  getUserByEmail,
  getUserById,
  createUser,
  getUserByAccount,
} from '@controllers/user.controller';
import {
  apiAccessControlMiddleWare,
  AccessRule,
} from '@utils/apiAccessControl';
import { Router } from 'express';

export const userRouter: Router = Router();

userRouter.get('/', apiAccessControlMiddleWare(AccessRule.admin), getUsers);
userRouter.put('/', apiAccessControlMiddleWare(AccessRule.none), updateUser);
userRouter.post('/', apiAccessControlMiddleWare(AccessRule.admin), createUser);
userRouter.get(
  '/:userId',
  apiAccessControlMiddleWare(AccessRule.authenticated),
  getUserById
);
userRouter.get(
  '/email/:email',
  apiAccessControlMiddleWare(AccessRule.authenticated),
  getUserByEmail
);
userRouter.get('/account/:provider/:providerAccountId', getUserByAccount);
