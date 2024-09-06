import {
  getUsers,
  updateUser,
  getUserByEmail,
  getUserById,
  createUser,
  getUserByAccount,
} from '@controllers/user.controller';
import { Router } from 'express';

export const userRouter: Router = Router();

userRouter.get('/', getUsers);
userRouter.put('/', updateUser);
userRouter.post('/', createUser);
userRouter.get('/:userId', getUserById);
userRouter.get('/email/:email', getUserByEmail);
userRouter.get('/account/:provider/:providerAccountId', getUserByAccount);

userRouter.delete('/:userId', getUserById);
