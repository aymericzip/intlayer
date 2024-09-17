import type { NextFunction, Request, Response } from 'express';
import { HttpStatusCodes } from './httpStatusCodes';
import { logger } from '@/logger';

type ApiAccessControlResult =
  | {
      success: true;
      message?: undefined;
    }
  | {
      success: false;
      message: string;
    };

export enum AccessRule {
  public = 'public',
  authenticated = 'authenticated',
  admin = 'admin',
  noneAuthenticated = 'none-authenticated',
  hasOrganization = 'has-organization',
  hasProject = 'has-project',
}

export const apiAccessControl = (
  res: Response,
  accessRule: AccessRule | AccessRule[]
): ApiAccessControlResult => {
  const accessRuleArray = Array.isArray(accessRule) ? accessRule : [accessRule];

  const { user, organization, project } = res.locals;

  const accessResults = accessRuleArray.map((rule) => {
    switch (rule) {
      case AccessRule.public:
        return true;
      case AccessRule.authenticated:
        if (!user) {
          return 'User is not authenticated';
        }
        return !!user;
      case AccessRule.admin:
        if (!user?.role.includes('admin')) {
          return 'User is not an admin';
        }
        return true;
      case AccessRule.noneAuthenticated:
        if (user) {
          return 'User is authenticated';
        }
        return true;
      case AccessRule.hasOrganization:
        if (!organization) {
          return 'Organization is not set';
        }
        return true;
      case AccessRule.hasProject:
        if (!project) {
          return 'Project is not set';
        }
        return true;
      default:
        return false;
    }
  });

  if (accessResults.every((result) => result)) {
    return { success: true };
  }

  const errorMessage = accessResults
    .map((result, index) => {
      if (result) {
        return '';
      }

      return accessRuleArray[index];
    })
    .filter((result) => result)
    .join(', ');

  return { success: false, message: errorMessage };
};

/**
 * Middleware to control API access based on access rules.
 *
 * This middleware allows for multiple access rules to be passed, either as individual `AccessRule` or
 * an array of `AccessRule` groups. Access is granted if at least one of the following conditions is met:
 *
 * - The user satisfies all `AccessRule` within any group of rules passed as an array.
 * - The user satisfies any single `AccessRule` passed individually.
 *
 * Example usage:
 *
 * ```typescript
 * // Allow access if the user has both `hasProject` and `hasOrganization`, or if they have `admin` rights
 * app.use('/protected-route', apiAccessControlMiddleWare([AccessRule.hasProject, AccessRule.hasOrganization], AccessRule.admin));
 * ```
 *
 * In this example:
 * - The user will be granted access if they have both `hasProject` and `hasOrganization`.
 * - Alternatively, the user will also be granted access if they have `admin` privileges.
 *
 * @param {...(AccessRule | AccessRule[])[]} accessRules - One or more access rules or groups of access rules.
 * - Single `AccessRule`: The user must satisfy this rule for access to be granted.
 * - Array of `AccessRule`: The user must satisfy all rules in the array for access to be granted.
 * @returns {Function} Express middleware function that checks if the user has the required access.
 *
 * If the user does not meet any of the provided access rules, a 403 Forbidden status is returned.
 *
 * @example
 * // Example 1: Require admin privileges
 * app.use('/admin', apiAccessControlMiddleWare(AccessRule.admin));
 *
 * @example
 * // Example 2: Require both project and organization access, or admin privileges
 * app.use('/dashboard', apiAccessControlMiddleWare([AccessRule.hasProject, AccessRule.hasOrganization], AccessRule.admin));
 */
export const apiAccessControlMiddleWare =
  (...accessRules: (AccessRule | AccessRule[])[]) =>
  (_req: Request<any>, res: Response, next: NextFunction) => {
    let hasAccess = false;

    // Iterate over each access rule group (either single AccessRule or an array of AccessRules)
    for (const ruleGroup of accessRules) {
      if (Array.isArray(ruleGroup)) {
        // If ruleGroup is an array, check if all rules in the group are satisfied
        const accessResults = ruleGroup.map(
          (rule) => apiAccessControl(res, rule).success
        );
        hasAccess = accessResults.every((result) => result); // All rules must be satisfied in this case
      } else {
        // Single rule: just check this one
        const accessResult = apiAccessControl(res, ruleGroup);
        if (accessResult.success) {
          hasAccess = true;
        }
      }

      // If access is granted at any point, stop further checks
      if (hasAccess) {
        break;
      }
    }

    // If no access rule group was satisfied, deny access
    if (!hasAccess) {
      logger.error('Access denied');

      const errorStatusCode = HttpStatusCodes.FORBIDDEN_403;
      return res.sendStatus(errorStatusCode);
    }

    return next();
  };
