import { OrganizationModel } from '@models/organization.model';
import { UserModel } from '@models/user.model';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

type Test = {
  tokenData: {
    userId: string;
    email: string;
    organizationId: string;
  };
};

export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtTokenAuth = req.cookies.jwt_auth;
  const jwtTokenAuth2 = req.cookies.jwt_auth_2;
  const tokenSecret = process.env.TOKEN_SECRET!;

  if (jwtTokenAuth && jwtTokenAuth !== 'undefined') {
    const decodedTokenAuth = jwt.verify(jwtTokenAuth, tokenSecret);

    const userData = (decodedTokenAuth as Test).tokenData;

    const user = await UserModel.findOne({
      _id: userData.userId,
      email: userData.email,
    });
    if (userData && user) {
      res.locals.user = user;
    } else {
      res.locals.user = null;
      res.cookie('jwt_auth', '', {
        httpOnly: true,
        path: '/',
        maxAge: 1,
        secure: true,
        domain: process.env.DOMAIN,
        sameSite: 'strict',
      });
      res.cookie('jwt_auth_2', '', {
        httpOnly: true,
        path: '/',
        maxAge: 1,
        secure: true,
        domain: process.env.DOMAIN,
        sameSite: 'strict',
      });
      res.cookie('jwt_logged', '', {
        httpOnly: true,
        path: '/',
        maxAge: 1,
        secure: true,
        domain: process.env.DOMAIN,
        sameSite: 'strict',
      });
    }
  } else res.locals.user = null;

  if (jwtTokenAuth2 && jwtTokenAuth2 !== 'undefined') {
    const decodedTokenAuth2 = jwt.verify(jwtTokenAuth2, tokenSecret);

    const userData = (decodedTokenAuth2 as Test).tokenData;
    const unregisteredUser = await UserModel.findOne({
      _id: userData.userId,
      email: userData.email,
    });

    if (userData && unregisteredUser) {
      res.locals.unregisteredUser = unregisteredUser;
    } else {
      res.locals.unregisteredUser = null;

      res.cookie('jwt_auth_2', '', {
        httpOnly: true,
        path: '/',
        maxAge: 1,
        secure: true,
        domain: process.env.DOMAIN,
        sameSite: 'strict',
      });
    }
  } else res.locals.unregisteredUser = null;

  next();
};

export const checkOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtTokenOrganization = req.cookies.jwt_organization;
  const tokenSecret = process.env.TOKEN_SECRET!;
  const host = req.get('host');

  res.locals.organization = await OrganizationModel.findById(
    process.env.ORGANIZATION_ID
  );

  if (jwtTokenOrganization && jwtTokenOrganization !== 'undefined') {
    const decodedTokenOrganization = jwt.verify(
      jwtTokenOrganization,
      tokenSecret
    );
    const organizationData = (decodedTokenOrganization as Test).tokenData;
    const organization = await OrganizationModel.findById(
      organizationData.organizationId
    );

    if (organizationData && organization) {
      res.locals.organization = organization;
    } else
      res.cookie('jwt_organization', '', {
        httpOnly: true,
        path: '/',
        maxAge: 1,
        secure: true,
        domain: process.env.DOMAIN,
        sameSite: 'strict',
      });
  } else if (host) {
    const organization = await OrganizationModel.findOne({ domain: host });
    if (organization) res.locals.organization = organization;
  }

  next();
};
