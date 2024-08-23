import { UserModel } from '@models/user.model';
import type { User } from '@schemas/user.type';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '@/logger';

const MAX_AGE = 3 * 24 * 60 * 60 * 1000;
const TOKEN_SECRET = process.env.TOKEN_SECRET!;
const DOMAIN = process.env.DOMAIN!;

const createToken = (user: User | null) => {
  const tokenData = {
    userId: user?._id ?? '',
    email: user?.email ?? '',
  };
  const date = new Date().toDateString();

  return {
    jwt_auth: jwt.sign({ tokenData }, TOKEN_SECRET, { expiresIn: MAX_AGE }),
    jwt_logged: jwt.sign({ date }, TOKEN_SECRET, { expiresIn: MAX_AGE }),
  };
};

const generateRandomString = (length: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join('');
};

export const controlJWT = (req: Request, res: Response) => {
  const user: User | null = res.locals.user;
  const csrfToken = (
    req as unknown as Request & { csrfToken: () => string }
  ).csrfToken();

  if (csrfToken) {
    res.cookie('XSRF-TOKEN', csrfToken, {
      httpOnly: false,
      maxAge: MAX_AGE,
      secure: true,
      domain: DOMAIN,
      sameSite: 'strict',
    });
  }

  if (user) {
    const token = createToken(user);
    if (token) {
      res.cookie('jwt_auth', token.jwt_auth, {
        httpOnly: true,
        path: '/',
        maxAge: MAX_AGE,
        secure: true,
        domain: DOMAIN,
        sameSite: 'strict',
      });
      res.cookie('jwt_logged', token.jwt_logged, {
        httpOnly: false,
        path: '/',
        maxAge: MAX_AGE,
        secure: true,
        domain: DOMAIN,
        sameSite: 'strict',
      });
    }
  }

  return res.status(200).json({ csrfToken, user });
};

export const signUp = async (req: Request, res: Response) => {
  const { email, password, firstname, lastname, phone } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser?.passwordHash) {
      const newUser = await UserModel.create({
        email,
        firstname,
        lastname,
        phone,
        password,
        secret: generateRandomString(35),
      });

      if (newUser) {
        logger.info(
          `New registration: ${newUser.firstname} ${newUser.lastname} - ${newUser.email}`
        );
        return res.status(200).json(newUser);
      }
    }

    return res.sendStatus(401);
  } catch (err) {
    logger.error(err);
    return res.sendStatus(500);
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    if (user) {
      const token = createToken(user);
      logger.info(
        `New log: ${user.firstname} ${user.lastname} - ${user.email}`
      );

      if (token) {
        res.cookie('jwt_logged', token.jwt_logged, {
          httpOnly: false,
          maxAge: MAX_AGE,
          secure: true,
          domain: DOMAIN,
          sameSite: 'strict',
        });
        res.cookie('jwt_auth', token.jwt_auth, {
          httpOnly: true,
          maxAge: MAX_AGE,
          secure: true,
          domain: DOMAIN,
          sameSite: 'strict',
        });
      }

      return res.status(200).json(user);
    }

    return res.status(200).json(null);
  } catch (err) {
    const errorMessage: string = (err as { message: string }).message;

    logger.error(`errors: ${errorMessage}`);
    return res.sendStatus(401);
  }
};

export const logByFirebase = async (req: Request, res: Response) => {
  const userData: User = req.body;

  try {
    let user = await UserModel.findOne({ email: userData.email });

    if (user) {
      logger.info(
        `New log: ${user.firstname} ${user.lastname} - ${user.email}`
      );
      const token = createToken(user);

      if (token) {
        res.cookie('jwt_auth', token.jwt_auth, {
          httpOnly: true,
          maxAge: MAX_AGE,
        });
        res.cookie('jwt_logged', token.jwt_logged, {
          httpOnly: false,
          maxAge: MAX_AGE,
        });
      }

      return res.status(200).json(user);
    }

    user = await UserModel.create(userData);
    if (user) return res.status(200).json(user);

    return res.sendStatus(401);
  } catch (err) {
    logger.error(err);
    return res
      .status(200)
      .json({ state: 'Not send', user: 'Not created', errors: err });
  }
};

export const isRegistered = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    return res.status(200).json({ user: !!user, actived: !!user });
  } catch (err) {
    const errorMessage: string = (err as { message: string }).message;

    logger.error(`errors: ${errorMessage}`);
    return res.status(200).json({ err });
  }
};

export const logOut = (req: Request, res: Response) => {
  const user: User | null = res.locals.user;

  if (user) {
    logger.info(`Unlog: ${user.firstname} ${user.lastname} - ${user.email}`);
  }

  const clearCookieOptions = {
    maxAge: 1,
    path: '/',
    httpOnly: true,
    secure: true,
    domain: DOMAIN,
    sameSite: 'lax' as 'lax' | 'strict' | 'none',
  };

  res.cookie('jwt_auth', '', clearCookieOptions);
  res.cookie('jwt_logged', '', { ...clearCookieOptions, httpOnly: false });

  return res.status(200).json(null);
};
