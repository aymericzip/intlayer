import type { Request, NextFunction } from 'express';
import { ResponseWithInformation } from './sessionAuth.middleware';

/**
 * Middleware to check if the user is an admin of the organization or project
 * Sets the following properties in res.locals:
 * - isOrganizationAdmin: boolean
 * - isProjectAdmin: boolean
 *
 * @param _req - The request object
 * @param res - The response object
 * @param next - The next function
 */
export const checkAdmin = async (
  _req: Request,
  res: ResponseWithInformation,
  next: NextFunction
): Promise<void> => {
  const { organization, project, user } = res.locals;

  res.locals.isOrganizationAdmin = false;
  res.locals.isProjectAdmin = false;

  if (user) {
    if (organization) {
      const isOrganizationAdmin: boolean =
        organization.adminsIds.includes(user._id) ?? false;

      res.locals.isOrganizationAdmin = isOrganizationAdmin;
    }

    if (project) {
      const isProjectAdmin: boolean =
        project.adminsIds.includes(user._id) ?? false;

      res.locals.isProjectAdmin = isProjectAdmin;
    }
  }

  return next();
};
