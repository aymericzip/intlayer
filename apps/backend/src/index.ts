/// Controllers
import { getOAuth2AccessToken } from '@controllers/oAuth2.controller';
import fastifyCompress from '@fastify/compress';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastifyFormbody from '@fastify/formbody';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
// Middlewares
import {
  attachOAuthInstance,
  oAuth2Middleware,
} from '@middlewares/oAuth2.middleware';
import { authMiddleware } from '@middlewares/sessionAuth.middleware';
// Routes
import { aiRoute, aiRouter } from '@routes/ai.routes';
import { bitbucketRoute, bitbucketRouter } from '@routes/bitbucket.routes';
import { dictionaryRoute, dictionaryRouter } from '@routes/dictionary.routes';
import {
  eventListenerRoute,
  eventListenerRouter,
} from '@routes/eventListener.routes';
import { githubRoute, githubRouter } from '@routes/github.routes';
import { gitlabRoute, gitlabRouter } from '@routes/gitlab.routes';
import { newsletterRoute, newsletterRouter } from '@routes/newsletter.routes';
import {
  organizationRoute,
  organizationRouter,
} from '@routes/organization.routes';
import { projectRoute, projectRouter } from '@routes/project.routes';
import { searchRoute, searchRouter } from '@routes/search.routes';
import { stripeRoute, stripeRouter } from '@routes/stripe.routes';
import { tagRoute, tagRouter } from '@routes/tags.routes';
import { userRoute, userRouter } from '@routes/user.routes';
// Utils
import { getAuth } from '@utils/auth/getAuth';
import { corsOptions } from '@utils/cors';
import { connectDB } from '@utils/mongoDB/connectDB';
import { ipLimiter } from '@utils/rateLimiter';
// Webhooks
import { stripeWebhook } from '@webhooks/stripe.webhook';
// Libraries
import dotenv from 'dotenv';
import Fastify, { type FastifyInstance } from 'fastify';
import { intlayer, t } from 'fastify-intlayer';
/// Logger
import { logger } from './logger/index';

const startServer = async () => {
  const app: FastifyInstance = Fastify({
    disableRequestLogging: true,
    trustProxy: true,
    ignoreTrailingSlash: true,
  });

  // Environment variables
  const env = process.env.NODE_ENV || 'development';

  logger.info(`run as ${env}`);

  dotenv.config({
    path: [`.env.${env}.local`, `.env.${env}`, '.env.local', '.env'],
  });

  // Security Headers
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
    global: true,
  });

  // CORS
  await app.register(fastifyCors, corsOptions);

  // Compression
  await app.register(fastifyCompress);

  // Cookie Parser
  await app.register(fastifyCookie);

  // Parse application/x-www-form-urlencoded
  await app.register(fastifyFormbody);

  // Load internationalization request handler
  await app.register(intlayer);

  // Rate limiter
  await app.register(fastifyRateLimit, ipLimiter);

  // Connect to MongoDB
  const dbClient = await connectDB();

  // Stripe webhook (needs raw body)
  // Register a content type parser for raw body
  await app.register(async (stripeScope) => {
    stripeScope.addContentTypeParser(
      'application/json',
      { parseAs: 'buffer' },
      (_req, body, done) => {
        done(null, body);
      }
    );

    stripeScope.post('/webhook/stripe', async (request, reply) => {
      // For Stripe webhooks, we need the raw body as a Buffer
      // Fastify will parse it as buffer when content-type parser is set
      const rawBody = request.body as Buffer;
      // Create a mock request object for the webhook handler
      const mockReq = {
        ...request.raw,
        body: rawBody,
        headers: request.headers,
      } as any;
      await stripeWebhook(mockReq, reply as any);
    });
  });

  // Liveness check
  app.get('/', async (_request, reply) => {
    return reply.send(
      t({
        en: 'Ok - locale: en',
        fr: 'Ok - locale: fr',
        es: 'Ok - locale: es',
      })
    );
  });

  // Session Auth
  const auth = getAuth(dbClient as any);

  // Better Auth handler - Using Fetch API approach for Fastify compatibility
  app.route({
    method: ['GET', 'POST'],
    url: '/api/auth/*',
    async handler(request, reply) {
      try {
        // This respects the X-Forwarded-Proto header from Coolify
        const protocol = request.protocol;
        const host = request.headers.host;

        // Construct request URL using the detected protocol
        const url = new URL(request.url, `${protocol}://${host}`);

        const headers = new Headers();
        Object.entries(request.headers).forEach(([key, value]) => {
          if (value) headers.append(key, String(value));
        });

        // Create Fetch API-compatible request
        const req = new Request(url.toString(), {
          method: request.method,
          headers,
          ...(request.body ? { body: JSON.stringify(request.body) } : {}),
        });

        // Process authentication request
        const response = await auth.handler(req);

        // Forward response to client
        reply.status(response.status);
        response.headers.forEach((value, key) => {
          reply.header(key, value);
        });

        const responseBody = response.body ? await response.text() : null;
        return reply.send(responseBody);
      } catch (error) {
        logger.error('Authentication Error:', error);
        return reply.status(500).send({
          error: 'Internal authentication error',
          code: 'AUTH_FAILURE',
        });
      }
    },
  });

  // Register auth middleware as a hook
  app.addHook('onRequest', authMiddleware(auth));

  // // oAuth2 Auth
  app.addHook('onRequest', attachOAuthInstance);
  app.post('/oauth2/token', getOAuth2AccessToken); // Route to get the token
  app.addHook('preHandler', oAuth2Middleware);

  // // debug
  const isDev = env === 'development';
  if (isDev) {
    app.addHook('onRequest', async (request) => {
      const queryDetails = {
        params: request.params,
        query: request.query,
        body: request.body,
        locals: request.locals,
      };

      logger.info(
        `API Request - ${request.method} - ${request.url} - ${JSON.stringify(queryDetails, null, 2)}`
      );
    });
  }

  // Routes
  await app.register(userRouter, { prefix: userRoute });
  await app.register(organizationRouter, { prefix: organizationRoute });
  await app.register(projectRouter, { prefix: projectRoute });
  await app.register(tagRouter, { prefix: tagRoute });
  await app.register(dictionaryRouter, { prefix: dictionaryRoute });
  await app.register(stripeRouter, { prefix: stripeRoute });
  await app.register(aiRouter, { prefix: aiRoute });
  await app.register(eventListenerRouter, { prefix: eventListenerRoute });
  await app.register(searchRouter, { prefix: searchRoute });
  await app.register(newsletterRouter, { prefix: newsletterRoute });
  await app.register(githubRouter, { prefix: githubRoute });
  await app.register(gitlabRouter, { prefix: gitlabRoute });
  await app.register(bitbucketRouter, { prefix: bitbucketRoute });

  // Server
  await app.listen({
    port: Number(process.env.PORT) || 3100,
    host: '0.0.0.0',
  });
  logger.info(`Listening on port ${process.env.PORT || 3100}`);
};

startServer();
