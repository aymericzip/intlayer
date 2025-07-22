// Libraries
import { Session } from '@/types/session.types';
import { fromNodeHeaders, toNodeHandler } from 'better-auth/node';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors, { type CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express, { type Express } from 'express';
import { intlayer, t } from 'express-intlayer';
import helmet from 'helmet';

// Middlewares
import { getOAuth2AccessToken } from '@controllers/oAuth2.controller';
import { attachOAuthInstance } from '@middlewares/oAuth2.middleware';
import { logAPIRequestURL } from '@middlewares/request.middleware';

// Services
import { validateOAuth2AccessToken } from '@services/oAuth2.service';

// Routes
import { aiRoute, aiRouter } from '@routes/ai.routes';
import { dictionaryRoute, dictionaryRouter } from '@routes/dictionary.routes';
import {
  eventListenerRoute,
  eventListenerRouter,
} from '@routes/eventListener.routes';
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

// Webhooks
import { stripeWebhook } from '@webhooks/stripe.webhook';

// Utils
import { getAuth } from '@utils/auth/getAuth';
import { connectDB } from '@utils/mongoDB/connectDB';
import { ipLimiter } from '@utils/rateLimiter';

// Logger
import { logger } from './logger/index';

const startServer = async () => {
  const app: Express = express();

  app.disable('x-powered-by'); // Disabled to prevent attackers from knowing that the app is running Express
  app.use(helmet());

  // Configure trust proxy more securely
  // Only trust the first proxy hop to prevent rate limit bypass
  app.set('trust proxy', 1);

  // Environment variables
  const env = app.get('env');

  logger.info(`run as ${env}`);

  dotenv.config({
    path: [`.env.${env}.local`, `.env.${env}`, '.env.local', '.env'],
  });

  // Parse incoming requests with cookies
  app.use(cookieParser());

  // Load internationalization request handler
  app.use(intlayer());

  app.use(/(.*)/, ipLimiter);

  const isDev = env === 'development';

  // Connect to MongoDB
  const dbClient = await connectDB();

  // Stripe
  app.post(
    '/webhook/stripe',
    express.raw({ type: 'application/json' }),
    stripeWebhook
  );

  // Compress all HTTP responses
  app.use(compression());

  // Parse incoming requests with urlencoded payloads
  app.use(express.urlencoded({ extended: true }));

  const whitelist = [process.env.CLIENT_URL!];

  // CORS
  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (whitelist.includes(origin)) {
        logger.info('whitelisted origin', origin);
        return callback(null, true);
      }

      logger.info('non whitelisted origin', origin);
      // Reflect the request's origin (echo back the origin header)
      callback(null, origin);
    },
    allowedHeaders: [
      'authorization',
      'Content-Type',
      'credentials',
      'cache-control',
      'Access-Control-Allow-Origin',
      'private-state-token-redemption',
      'private-state-token-issuance',
      'browsing-topics',
    ],
    exposedHeaders: [''],
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  app.use(cors(corsOptions));

  // Liveness check
  app.get('/', (_req, res) => {
    res.send(
      t({
        en: 'Ok - locale: en',
        fr: 'Ok - locale: fr',
        es: 'Ok - locale: es',
      })
    );
  });

  // Auth
  const auth = getAuth(dbClient);
  app.all('/api/auth/{*any}', toNodeHandler(auth));

  app.use(express.json()); // Should be placed after auth. Attach body to next routes

  app.use(/(.*)/, async (req, res, next) => {
    const session = (await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })) as Session;

    if (session) {
      res.locals.session = session?.session;
      res.locals.user = session?.user;
      res.locals.organization = session?.organization;
      res.locals.project = session?.project;
      res.locals.authType = 'session';

      return next();
    }

    // Check if this is a bearer token authentication
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        const result = await validateOAuth2AccessToken(token);

        if (result) {
          const { user, project, organization, rights } = result;

          res.locals.user = user;
          res.locals.organization = organization;
          res.locals.project = project;
          res.locals.authType = 'oauth2';

          logger.info('OAuth2 bearer token authenticated', {
            userId: user.id,
            projectId: project.id,
            organizationId: organization.id,
          });
        }
      } catch (error) {
        logger.error('Bearer token validation failed:', error);
      }
    }

    next();
  });

  // debug
  if (isDev) {
    app.use(logAPIRequestURL);
  }

  // oAuth2
  app.use(/(.*)/, attachOAuthInstance);
  app.post('/oauth2/token', getOAuth2AccessToken); // Route to get the token

  // Routes
  app.use(userRoute, userRouter);
  app.use(organizationRoute, organizationRouter);
  app.use(projectRoute, projectRouter);
  app.use(tagRoute, tagRouter);
  app.use(dictionaryRoute, dictionaryRouter);
  app.use(stripeRoute, stripeRouter);
  app.use(aiRoute, aiRouter);
  app.use(eventListenerRoute, eventListenerRouter);
  app.use(searchRoute, searchRouter);
  app.use(newsletterRoute, newsletterRouter);

  // Server
  app.listen(process.env.PORT, () => {
    logger.info(`Listening on port ${process.env.PORT}`);
  });
};

startServer();
