import { OrganizationModel } from '@models/organization.model';
import { ProjectModel } from '@models/project.model';
import { UserModel } from '@models/user.model';
import {
  clearUserAuth,
  clearOrganizationAuth,
  clearProjectAuth,
} from '@services/auth.service';
import { getUserBySession as getUserBySessionService } from '@services/user.service';
import { Cookies } from '@utils/cookies';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { Organization } from '@/types/organization.types';
import type { Project } from '@/types/project.types';
import type { User } from '@/types/user.types';

type JWTContent = {
  tokenData: {
    userId: string;
    email: string;
    organizationId?: string;
    projectId?: string;
  };
};

type UserInformation = {
  user: User | null;
  organization: Organization | null;
  project: Project | null;
};

export type ResponseWithInformation<ResBody = any> = Response<
  ResBody,
  UserInformation
>;

export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { [Cookies.JWT_AUTH]: sessionToken } = req.cookies;

  res.locals.user = null;

  if (sessionToken) {
    const user = await getUserBySessionService(sessionToken);

    if (user) {
      res.locals.user = user;
    }
  }

  return next();
};

export const checkOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtTokenOrganization = req.cookies.jwt_organization;
  res.locals.project = null;

  if (!jwtTokenOrganization || jwtTokenOrganization === 'undefined') {
    clearOrganizationAuth(res);
    return next();
  }

  const decodedTokenOrganization = jwt.verify(
    jwtTokenOrganization,
    process.env.JWT_TOKEN_SECRET!
  );

  const organizationData = (decodedTokenOrganization as JWTContent).tokenData;

  if (!organizationData) {
    clearOrganizationAuth(res);
    return next();
  }

  const organization = await OrganizationModel.findById(
    organizationData.organizationId
  );

  if (!organization) {
    clearOrganizationAuth(res);
    return next();
  }

  res.locals.organization = organization;
  return next();
};

export const checkProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtTokenProject = req.cookies.jwt_project;
  res.locals.project = null;

  if (!jwtTokenProject || jwtTokenProject === 'undefined') {
    clearProjectAuth(res);
    return next();
  }

  const decodedTokenProject = jwt.verify(
    jwtTokenProject,
    process.env.JWT_TOKEN_SECRET!
  );

  const projectData = (decodedTokenProject as JWTContent).tokenData;

  if (!projectData) {
    clearProjectAuth(res);
    return next();
  }

  const project = await ProjectModel.findById(projectData.projectId);

  if (!project) {
    clearProjectAuth(res);
    return next();
  }

  res.locals.project = project;
  return next();
};
