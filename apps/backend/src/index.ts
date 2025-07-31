// Libraries
import { toNodeHandler } from 'better-auth/node';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Express } from 'express';
import { intlayer, t } from 'express-intlayer';
import helmet from 'helmet';

// Middlewares
import { getOAuth2AccessToken } from '@controllers/oAuth2.controller';
import {
  attachOAuthInstance,
  oAuth2Middleware,
} from '@middlewares/oAuth2.middleware';
import { logAPIRequestURL } from '@middlewares/request.middleware';

// Services

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
import { authMiddleware } from '@middlewares/sessionAuth.middleware';
import { corsOptions } from '@utils/cors';
import { logger } from './logger/index';

const startServer = async () => {
  const app: Express = express();

  // Headers security
  app.disable('x-powered-by'); // Disabled to prevent attackers from knowing that the app is running Express
  app.use(helmet());
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

  // Rate limiter
  app.use(/(.*)/, ipLimiter);

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

  // CORS
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

  // Session Auth
  const auth = getAuth(dbClient);
  app.all('/api/auth/{*any}', toNodeHandler(auth));
  app.use(/(.*)/, authMiddleware(auth));

  // oAuth2 Auth
  app.use(/(.*)/, attachOAuthInstance);
  app.post('/oauth2/token', getOAuth2AccessToken); // Route to get the token
  app.use(/(.*)/, oAuth2Middleware);

  // Body parser
  app.use(express.json()); // Should be placed after auth. Attach body to next routes

  // debug
  const isDev = env === 'development';
  if (isDev) {
    app.use(logAPIRequestURL);
  }

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
