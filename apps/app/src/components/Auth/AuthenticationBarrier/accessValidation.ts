import type { SessionAPI } from '@intlayer/backend';
import type { ReactNode } from 'react';

type AccessRule =
  | 'public'
  | 'authenticated'
  | 'admin'
  | 'not-authenticated'
  | 'organization-required'
  | 'project-required';

/**
 * Reason why a session failed the access rules. Lets callers pick a
 * different redirect target per failure (e.g. an unauthenticated user
 * belongs on the login page, while a user without a selected project
 * belongs on the project-selection page).
 */
export type AccessRuleFailure =
  | 'unauthenticated'
  | 'already-authenticated'
  | 'not-admin'
  | 'organization-missing'
  | 'project-missing';

/**
 * Validates the session against the access rules and, on the first failing
 * rule, calls `redirectionFunction` exactly once with the failure reason.
 *
 * Rules are evaluated in priority order (authentication first): a signed-out
 * user visiting a page that also requires an organization/project must be
 * treated as "unauthenticated", not "organization-missing", otherwise the
 * caller would redirect them to another protected page and create a
 * redirect loop between barriers.
 */
export const accessValidation = (
  accessRule: AccessRule | AccessRule[],
  session: SessionAPI | null,
  redirectionFunction: (
    redirectionRoute: string,
    failureReason: AccessRuleFailure
  ) => void,
  redirectionRoute: string,
  isEnabled?: boolean
) => {
  const accessRuleArray: AccessRule[] = Array.isArray(accessRule)
    ? accessRule
    : [accessRule];

  if (isEnabled === false) {
    return;
  }

  if (
    !session?.user &&
    (accessRuleArray?.includes('authenticated') ||
      accessRuleArray?.includes('admin'))
  ) {
    redirectionFunction(redirectionRoute, 'unauthenticated');
    return;
  }

  if (session?.user && accessRuleArray?.includes('not-authenticated')) {
    // Allow users with an unverified email to stay on not-authenticated routes
    // so they can complete the email verification flow.
    if (!session.user.emailVerified) return;

    redirectionFunction(redirectionRoute, 'already-authenticated');
    return;
  }

  if (
    session?.user &&
    accessRuleArray?.includes('admin') &&
    (session.user?.role !== 'admin' || !session?.roles?.includes('admin'))
  ) {
    redirectionFunction(redirectionRoute, 'not-admin');
    return;
  }

  if (
    !session?.organization &&
    accessRuleArray?.includes('organization-required')
  ) {
    redirectionFunction(redirectionRoute, 'organization-missing');
    return;
  }

  if (!session?.project && accessRuleArray?.includes('project-required')) {
    redirectionFunction(redirectionRoute, 'project-missing');
  }
};

export type AuthenticationBarrierProps = {
  children?: ReactNode;
  accessRule: AccessRule | AccessRule[];
  redirectionRoute?: string;
  session?: SessionAPI | null;
  sessionToken?: string;
  /**
   * Function to replace for a nextjs redirection
   *
   * Example:
   * ```js
   * import { useNavigate } from '@tanstack/react-router';
   * ...
   * const navigate = useNavigate();
   * ...
   * redirectionMethod={(url) => navigate({ to: url })}
   * ```
   */
  redirectionFunction: (redirectionRoute: string) => void;
  isEnabled?: boolean;
};
