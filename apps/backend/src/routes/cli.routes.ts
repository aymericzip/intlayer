/* eslint-disable sonarjs/no-misused-promises */
import { token } from '@controllers/cli.controller';
import {
  attachOAuthInstance,
  authenticate,
} from '@middlewares/oAuth2.middleware';
import { Router, Request, Response } from 'express';

export const cliRouter: Router = Router();

cliRouter.use('*', attachOAuthInstance);

// Route to get the token
cliRouter.post('/oauth/token', token);

// Route protected
cliRouter.post(
  '/dictionaries',
  authenticate,
  (_req: Request, res: Response) => {
    res.json({ message: 'Accès autorisé à la ressource sécurisée' });
  }
);
