import { OrganizationModel } from '@models/organization.model';
import { ProjectModel } from '@models/project.model';
import { UserModel } from '@models/user.model';
import {
  clearUserAuth,
  clearOrganizationAuth,
  clearProjectAuth,
} from '@services/auth.service';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { Organization } from '@/types/organization.types';
import type { Project } from '@/types/project.types';
import type { User } from '@/types/user.types';

type Test = {
  tokenData: {
    userId: string;
    email: string;
    organizationId: string;
    projectId: string;
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

const tokenSecret = process.env.TOKEN_SECRET!;

export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtTokenAuth = req.cookies.jwt_auth;

  if (!jwtTokenAuth || jwtTokenAuth === 'undefined') {
    clearUserAuth(res);
    return next();
  }

  const decodedTokenAuth = jwt.verify(jwtTokenAuth, tokenSecret);

  const userData = (decodedTokenAuth as Test).tokenData;

  if (!userData) {
    clearUserAuth(res);
    return next();
  }

  const user = await UserModel.findOne({
    _id: userData.userId,
    email: userData.email,
  });

  if (!user) {
    clearUserAuth(res);
    return next();
  }

  res.locals.user = user;

  return next();
};

export const checkOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtTokenOrganization = req.cookies.jwt_organization;

  res.locals.organization = await OrganizationModel.findById(
    process.env.ORGANIZATION_ID
  );

  if (!jwtTokenOrganization || jwtTokenOrganization === 'undefined') {
    clearOrganizationAuth(res);
    return next();
  }

  const decodedTokenOrganization = jwt.verify(
    jwtTokenOrganization,
    tokenSecret
  );

  const organizationData = (decodedTokenOrganization as Test).tokenData;

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

  res.locals.organization = await OrganizationModel.findById(
    process.env.ORGANIZATION_ID
  );

  if (!jwtTokenProject || jwtTokenProject === 'undefined') {
    clearProjectAuth(res);
    return next();
  }

  const decodedTokenProject = jwt.verify(jwtTokenProject, tokenSecret);

  const projectData = (decodedTokenProject as Test).tokenData;

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
