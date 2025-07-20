import { handleOAuth2Token } from '@middlewares/betterAuthOAuth2.middleware';
import { Router } from 'express';

/**
 * Create OAuth2 routes that work with better-auth
 */
export const createOAuth2Routes = (): Router => {
  const router = Router();

  // OAuth2 token endpoint (client credentials flow)
  router.post('/oauth2/token', handleOAuth2Token);

  return router;
};
