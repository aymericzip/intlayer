import { getOAuth2Token } from '@controllers/oAuth2.controller';
import {
  getSessionInformation,
  setCSRFToken,
} from '@controllers/sessionAuth.controller';
import { checkAdmin } from '@middlewares/admin.middleware';
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
  ResponseWithInformation,
} from '@middlewares/sessionAuth.middleware';
import { dictionaryRouter } from '@routes/dictionary.routes';
import { organizationRouter } from '@routes/organization.routes';
import { projectRouter } from '@routes/project.routes';
import { sessionAuthRouter } from '@routes/sessionAuth.routes';
import { userRouter } from '@routes/user.routes';
import { doubleCsrfProtection } from '@utils/CSRF';
import { connectDB } from '@utils/mongoDB/connectDB';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors, { type CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express, { type Express } from 'express';
import { logger } from './logger';

const app: Express = express();

app.disable('x-powered-by'); // Disabled to prevent attackers from knowing that the app is running Express

// Environment variables
const env = app.get('env');

logger.info(`run as ${env}`);

dotenv.config({ path: ['.env', `.env.${env}`] });

const isDev = env === 'development';

connectDB();

// Compress all HTTP responses
app.use(compression());

// Parse incoming requests with JSON payloads
app.use(express.json());
// Parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// Parse incoming requests with cookies
app.use(cookieParser());

// CORS
const whitelist: string[] = [process.env.CLIENT_URL!];
const corsOptions: CorsOptions = {
  origin: whitelist,
  credentials: true,
  allowedHeaders: ['authorization', 'Content-Type', 'credentials'],
  exposedHeaders: [''],
  preflightContinue: false,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions));
logger.info('url whitelist : ', whitelist.join(', '));

// Liveness check
app.get('/', (_req, res) => {
  res.send('ok');
});

// middleware - jwt & session auth
app.use(/(.*)/, checkUser);
app.use(/(.*)/, checkOrganization);
app.use(/(.*)/, checkProject);

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

// Admin check for project and organization
app.use(/(.*)/, checkAdmin);

// Routes
app.use('/api/user', userRouter);
app.use('/api/organization', organizationRouter);
app.use('/api/project', projectRouter);
app.use('/api/dictionary', dictionaryRouter);

// Server
app.listen(process.env.PORT, () => {
  logger.info(`Listening on port ${process.env.PORT}`);
});

// Export tu use as serverless function
export default app;
