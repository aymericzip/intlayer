import { logger } from '@logger';

import type { NextFunction, Request, Response } from 'express';
import { HttpStatusCodes } from './httpStatusCodes';

export enum AccessRule {
  none = 'none',
  authenticated = 'authenticated',
  admin = 'admin',
  noneAuthenticated = 'not-authenticated',
  hasOrganization = 'has-organization',
  hasProject = 'has-project',
  hasBearer = 'has-bearer',
  oauth2 = 'oauth2',
}

export const accessControl = <R extends AccessRule | AccessRule[]>(
  res: Response,
  accessRule: R
) => {
  const accessRuleArray: AccessRule[] = Array.isArray(accessRule)
    ? accessRule
    : [accessRule];

  const localsAuthInformation = res.locals;
  const { user, organization, project, authType } = localsAuthInformation;

  // If 'none' access rule is present, immediately return success
  if (accessRuleArray.includes(AccessRule.none)) {
    return {
      success: true,
      message: null,
      data: { user, organization, project, authType },
    };
  }

  let success = true;
  const messages: string[] = [];

  // Check for 'authenticated' access rule
  if (accessRuleArray.includes(AccessRule.authenticated)) {
    if (!user) {
      success = false;
      messages.push('User is not authenticated');
    }
  }

  // Check for 'admin' access rule
  // if (accessRuleArray.includes(AccessRule.admin)) {
  //   if (!user?.role.includes('admin')) {
  //     success = false;
  //     messages.push('User is not an admin');
  //   }
  // }

  // Check for 'not-authenticated' access rule
  if (accessRuleArray.includes(AccessRule.noneAuthenticated)) {
    if (user) {
      success = false;
      messages.push('User is authenticated');
    }
  }

  // Check for 'has-organization' access rule
  if (accessRuleArray.includes(AccessRule.hasOrganization)) {
    if (!organization) {
      success = false;
      messages.push('Organization is not set');
    }
  }

  // Check for 'has-project' access rule
  if (accessRuleArray.includes(AccessRule.hasProject)) {
    if (!project) {
      success = false;
      messages.push('Project is not set');
    }
  }

  // Check for 'oauth2' access rule
  if (accessRuleArray.includes(AccessRule.oauth2)) {
    if (authType !== 'oauth2') {
      success = false;
      messages.push('OAuth2 authentication is required');
    }
  }

  // Handle unknown access rules
  const knownRules = Object.values(AccessRule);
  const unknownRules = accessRuleArray.filter(
    (rule) => !knownRules.includes(rule)
  );
  if (unknownRules.length > 0) {
    success = false;
    messages.push(`Unknown access rules: ${unknownRules.join(', ')}`);
  }

  return {
    success,
    message: messages.join(', '),
    data: { user, organization, project, authType },
  };
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
export const accessControlMiddleWare =
  (...accessRules: (AccessRule | AccessRule[])[]) =>
  (_req: Request<unknown>, res: Response, next: NextFunction): void => {
    let hasAccess = false;

    // Iterate over each access rule group (either single AccessRule or an array of AccessRules)
    for (const ruleGroup of accessRules) {
      if (Array.isArray(ruleGroup)) {
        // If ruleGroup is an array, check if all rules in the group are satisfied
        const accessResults = ruleGroup.map(
          (rule) => accessControl(res, rule).success
        );
        hasAccess = accessResults.every((result) => result); // All rules must be satisfied in this case
      } else {
        // Single rule: just check this one
        const accessResult = accessControl(res, ruleGroup);
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
      res.sendStatus(errorStatusCode);
      return;
    }

    next();
  };
