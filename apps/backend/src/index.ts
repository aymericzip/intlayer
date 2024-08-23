import { controlJWT } from '@controllers/auth.controller';
import { checkUser, checkOrganization } from '@middlewares/auth.middleware';
import { logRequestURL } from '@middlewares/request.middleware';
import { organizationRouter } from '@routes/organization.routes';
import { userRouter } from '@routes/user.routes';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { logger } from './logger';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
logger.info(`run as ${process.env.NODE_ENV}`);

const app = express();

// Compress all HTTP responses
app.use(compression());

const whitelist: string[] = [process.env.CLIENT_URL ?? ''];

logger.info('url whitelist :');
logger.info(whitelist);

const corsOptions = {
  origin: whitelist,
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type', 'x-xsrf-token', 'x-csrf-token'],
  exposedHeaders: ['sessionId', 'x-csrf-token'],
  preflightContinue: false,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(logRequestURL);
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware - jwt
app.use('*', checkOrganization);
app.use('*', checkUser);

// Liveness check
app.get('/', (_req, res) => res.sendStatus(200));

app.get('/api/token', controlJWT);

// Routes
app.use('/api/user', userRouter);
app.use('/api/organization', organizationRouter);

// Server
app.listen(process.env.PORT, () => {
  logger.info(`Listening on port ${process.env.PORT}`);
});
