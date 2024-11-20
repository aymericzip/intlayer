/* eslint-disable import/order */

// Libraries
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors, { type CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express, { raw, type Express } from 'express';
import { intlayer, t } from 'express-intlayer';
import helmet from 'helmet';

// Middlewares
import {
  attachOAuthInstance,
  authenticateOAuth2,
  RequestWithOAuth2Information,
} from '@middlewares/oAuth2.middleware';
import { logAPIRequestURL } from '@middlewares/request.middleware';
import {
  checkUser,
  checkOrganization,
  checkProject,
  checkAdmin,
  ResponseWithInformation,
} from '@middlewares/sessionAuth.middleware';

// Routes
import { dictionaryRouter } from '@routes/dictionary.routes';
import { organizationRouter } from '@routes/organization.routes';
import { projectRouter } from '@routes/project.routes';
import { sessionAuthRouter } from '@routes/sessionAuth.routes';
import { userRouter } from '@routes/user.routes';
import { stripeRouter } from '@routes/stripe.routes';

// Webhooks
import { stripeWebhook } from '@webhooks/stripe.webhook';

// Controllers
import { getOAuth2Token } from '@controllers/oAuth2.controller';
import {
  getSessionInformation,
  setCSRFToken,
} from '@controllers/sessionAuth.controller';

// Utils
import { doubleCsrfProtection } from '@utils/CSRF';
import { connectDB } from '@utils/mongoDB/connectDB';

// Logger
import { logger } from './logger';

const app: Express = express();

app.disable('x-powered-by'); // Disabled to prevent attackers from knowing that the app is running Express
app.use(helmet());

// Environment variables
const env = app.get('env');

logger.info(`run as ${env}`);

dotenv.config({ path: ['.env', `.env.${env}`] });

// Parse incoming requests with cookies
app.use(cookieParser());

// Load internationalization request handler
app.use(intlayer());

const isDev = env === 'development';

// Connect to MongoDB
connectDB();

// Stripe
app.post('/webhook/stripe', raw({ type: 'application/json' }), stripeWebhook);

// Compress all HTTP responses
app.use(compression());

// Parse incoming requests with JSON payloads
app.use(express.json({ limit: '50mb' }));

// Parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// CORS
const whitelist: string[] = [process.env.CLIENT_URL!];
const corsOptions: CorsOptions = {
  origin: whitelist,
  credentials: true,
  allowedHeaders: [
    'authorization',
    'Content-Type',
    'credentials',
    'cache-control',
    'Access-Control-Allow-Origin',
  ],
  exposedHeaders: [''],
  preflightContinue: false,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions));
logger.info('url whitelist : ', whitelist.join(', '));

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

// middleware - jwt & session auth
app.use(/(.*)/, checkUser);
app.use(/(.*)/, checkOrganization);
app.use(/(.*)/, checkProject);
app.use(/(.*)/, checkAdmin);

// debug
if (isDev) {
  app.use(logAPIRequestURL);
}

// Sessions
app.get('/session', getSessionInformation);
app.use('/api/auth', sessionAuthRouter);

// CSRF
app.get('/csrf-token', setCSRFToken);

// oAuth2
app.use(/(.*)/, attachOAuthInstance);
app.post('/oauth2/token', getOAuth2Token); // Route to get the token
app.use(/(.*)/, (req, res, next) => {
  // If the request is not already authenticated check the oAuth2 token
  if (!res.locals.authType) {
    return authenticateOAuth2(
      req as RequestWithOAuth2Information,
      res as ResponseWithInformation,
      next
    );
  }
  next();
});

// CSRF protection
app.use(/(.*)/, (req, res, next) => {
  // If the request is authenticated using the session auth check the CSRF token
  if (res.locals.authType === 'session') {
    return doubleCsrfProtection(req, res, next);
  }
  next();
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/organization', organizationRouter);
app.use('/api/project', projectRouter);
app.use('/api/dictionary', dictionaryRouter);
app.use('/api/stripe', stripeRouter);

// Server
app.listen(process.env.PORT, () => {
  logger.info(`Listening on port ${process.env.PORT}`);
});

// Export tu use as serverless function
export default app;
