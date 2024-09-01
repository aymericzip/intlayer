import { controlJWT } from '@controllers/auth.controller';
import {
  checkUser,
  checkOrganization,
  checkProject,
} from '@middlewares/auth.middleware';
import { logAPIRequestURL } from '@middlewares/request.middleware';
import { authRouter } from '@routes/auth.routes';
import { organizationRouter } from '@routes/organization.routes';
import { projectRouter } from '@routes/project.routes';
import { userRouter } from '@routes/user.routes';
import { connectDB } from '@utils/mongoDB/connectDB';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { logger } from './logger';

const app = express();

const env = app.get('env');

logger.info(`run as ${env}`);

dotenv.config({ path: ['.env', `.env.${env}`] });

const isDev = env === 'development';

connectDB();

// Compress all HTTP responses
app.use(compression());

const whitelist: string[] = [process.env.CLIENT_URL ?? ''];

logger.info('url whitelist : ', whitelist.join(', '));

const corsOptions = {
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

// Liveness check
app.get('/', (_req, res) => res.sendStatus(200));

app.get('/api/token', controlJWT);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/organization', organizationRouter);
app.use('/api/project', projectRouter);

// Server
app.listen(process.env.PORT, () => {
  logger.info(`Listening on port ${process.env.PORT}`);
});
