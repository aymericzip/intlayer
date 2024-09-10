import { controlJWT } from '@controllers/auth.controller';
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
import { connectDB } from '@utils/mongoDB/connectDB';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors, { type CorsOptions } from 'cors';
import { doubleCsrf } from 'csrf-csrf';
import dotenv from 'dotenv';
import { getCookieOptions } from 'export';
import express, { type Request, type Response } from 'express';
import { logger } from './logger';

const app = express();

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

// CSRF
const {
  generateToken, // Use this in your routes to provide a CSRF hash + token cookie and token.
  doubleCsrfProtection, // This is the default CSRF protection middleware.
} = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET,
  getTokenFromRequest: (req) => req.body.csrfToken,
  cookieName: 'csrf_token',
  cookieOptions: getCookieOptions(),
});

app.get('/csrf-token', (req, res) => {
  const csrfToken = generateToken(req, res);
  // You could also pass the token into the context of a HTML response.
  res.json({ csrfToken });
});
app.use(doubleCsrfProtection);

// debug
if (isDev) {
  app.use(logAPIRequestURL);
}

// Liveness check
app.get('/', (_req: Request, res: Response) => res.send('ok'));

app.get('/api/token', controlJWT);

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
