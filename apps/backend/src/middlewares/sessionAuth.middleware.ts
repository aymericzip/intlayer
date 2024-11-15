/* eslint-disable @typescript-eslint/no-explicit-any */

import { OrganizationModel } from '@models/organization.model';
import { ProjectModel } from '@models/project.model';
import {
  clearOrganizationAuth,
  clearProjectAuth,
} from '@services/sessionAuth.service';
import { getUserBySession as getUserBySessionService } from '@services/user.service';
import { Cookies } from '@utils/cookies';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type {
  Organization,
  OrganizationDocument,
} from '@/types/organization.types';
import type { Project, ProjectDocument, Rights } from '@/types/project.types';
import type { User, UserDocument } from '@/types/user.types';

export type ResponseWithInformation<ResBody = any> = Response<
  ResBody,
  {
    user: User | null;
    // Auth Context
    organization: Organization | null;
    project: Project | null;
    authType: 'session' | 'oauth2' | null;
    // Auth Rights - oAuth2 Auth
    organizationRights: Rights | null;
    projectRights: Rights | null;
    dictionaryRights: Rights | null;
    // Auth Rights - Session Auth
    isOrganizationAdmin: boolean | null;
    isProjectAdmin: boolean | null;
  }
>;

export const checkUser = async (
  req: Request,
  res: ResponseWithInformation,
  next: NextFunction
): Promise<void> => {
  const { [Cookies.JWT_AUTH]: sessionToken } = req.cookies;

  res.locals.user = null;
  res.locals.authType = null;

  try {
    if (sessionToken) {
      const user: UserDocument | null = (await getUserBySessionService(
        sessionToken
      )) as UserDocument | null;

      if (user) {
        res.locals.user = user.toObject();
        res.locals.authType = 'session';
      }
    }
  } catch (error) {
    console.error('Error fetching session:', error);
  }

  return next();
};

export const checkOrganization = async (
  req: Request,
  res: ResponseWithInformation,
  next: NextFunction
): Promise<void> => {
  const jwtTokenOrganization = req.cookies[Cookies.JWT_ORGANIZATION];

  res.locals.organization = null;

  try {
    if (!jwtTokenOrganization || jwtTokenOrganization === 'undefined') {
      clearOrganizationAuth(res);
      return next();
    }

    const organizationData = jwt.verify(
      jwtTokenOrganization,
      process.env.JWT_TOKEN_SECRET!
    ) as Organization;

    if (!organizationData) {
      clearOrganizationAuth(res);
      return next();
    }

    const organization: OrganizationDocument | null =
      await OrganizationModel.findById(organizationData._id);

    if (!organization) {
      clearOrganizationAuth(res);
      return next();
    }

    res.locals.organization = organization.toObject();
  } catch (error) {
    console.error('Error fetching organization:', error);
  }

  return next();
};

export const checkProject = async (
  req: Request,
  res: ResponseWithInformation,
  next: NextFunction
): Promise<void> => {
  const jwtTokenProject = req.cookies[Cookies.JWT_PROJECT];
  res.locals.project = null;

  try {
    if (!jwtTokenProject || jwtTokenProject === 'undefined') {
      clearProjectAuth(res);
      return next();
    }

    const decodedTokenProject = jwt.verify(
      jwtTokenProject,
      process.env.JWT_TOKEN_SECRET!
    ) as Project;

    if (!decodedTokenProject) {
      clearProjectAuth(res);
      return next();
    }

    const project: ProjectDocument | null = await ProjectModel.findById(
      decodedTokenProject._id
    );

    if (
      !project ||
      !res.locals.organization ||
      String(project.organizationId) !== String(res.locals.organization._id)
    ) {
      clearProjectAuth(res);
      return next();
    }

    res.locals.project = project.toObject();
  } catch (error) {
    console.error('Error fetching project:', error);
  }

  return next();
};

/**
 * Middleware to check if the user is an admin of the organization or project
 * Sets the following properties in res.locals:
 * - isOrganizationAdmin: boolean
 * - isProjectAdmin: boolean
 */
export const checkAdmin = async (
  _req: Request,
  res: ResponseWithInformation,
  next: NextFunction
): Promise<void> => {
  const { organization, project, user, authType } = res.locals;

  if (authType !== 'session') {
    return next();
  }

  res.locals.organizationRights = {
    read: true,
    write: false,
    admin: false,
  };
  res.locals.projectRights = {
    read: true,
    write: false,
    admin: false,
  };
  res.locals.projectRights = {
    read: true,
    write: false,
    admin: false,
  };

  if (user) {
    if (organization) {
      const isOrganizationAdmin: boolean =
        organization.adminsIds
          .map((id) => String(id))
          .includes(String(user._id)) ?? false;

      res.locals.isOrganizationAdmin = isOrganizationAdmin;

      res.locals.organizationRights = {
        read: true,
        write: isOrganizationAdmin,
        admin: isOrganizationAdmin,
      };
    }

    if (project) {
      const isProjectAdmin: boolean =
        project.adminsIds.map((id) => String(id)).includes(String(user._id)) ??
        false;

      res.locals.isProjectAdmin = isProjectAdmin;

      res.locals.projectRights = {
        read: true,
        write: isProjectAdmin,
        admin: isProjectAdmin,
      };

      res.locals.dictionaryRights = {
        read: true,
        write: true,
        admin: true,
      };
    }
  }

  return next();
};
