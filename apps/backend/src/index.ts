/* eslint-disable sonarjs/no-misused-promises */
import {
  getSessionInformation,
  setCSRFToken,
} from '@controllers/auth.controller';
import {
  checkUser,
  checkOrganization,
  checkProject,
} from '@middlewares/auth.middleware';
import { logAPIRequestURL } from '@middlewares/request.middleware';
import { authRouter } from '@routes/auth.routes';
import { dictionaryRouter } from '@routes/dictionary.routes';
import { organizationRouter } from '@routes/organization.routes';
import { projectRouter } from '@routes/project.routes';
import { userRouter } from '@routes/user.routes';
import { doubleCsrfProtection } from '@utils/CSRF';
import { connectDB } from '@utils/mongoDB/connectDB';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors, { type CorsOptions } from 'cors';
import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import { logger } from './logger';

const app = express();
app.disable('x-powered-by');

const env = app.get('env');

logger.info(`run as ${env}`);

dotenv.config({ path: ['.env', `.env.${env}`] });

const isDev = env === 'development';

connectDB();

// Compress all HTTP responses
app.use(compression());

const whitelist: string[] = [process.env.CLIENT_URL!];

logger.info('url whitelist : ', whitelist.join(', '));

const corsOptions: CorsOptions = {
  origin: whitelist,
  credentials: true,
  allowedHeaders: [
    'sessionId',
    'Content-Type',
    'x-xsrf-token',
    'x-csrf-token',
    'credentials',
  ],
  exposedHeaders: ['sessionId', 'x-csrf-token'],
  preflightContinue: false,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware - jwt
app.use('*', checkUser);
app.use('*', checkOrganization);
app.use('*', checkProject);

// debug
if (isDev) {
  app.use(logAPIRequestURL);
}

// Sessions
app.get('/session', getSessionInformation);

// CSRF
app.get('/csrf-token', setCSRFToken);
app.use(doubleCsrfProtection);

// Liveness check
app.get('/', (_req: Request, res: Response) => res.send('ok'));

// Routes
app.use('/api/auth', authRouter);
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
