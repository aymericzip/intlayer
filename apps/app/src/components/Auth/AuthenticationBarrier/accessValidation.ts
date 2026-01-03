import type { SessionAPI } from '@intlayer/backend';
import type { ReactNode } from 'react';

type AccessRule =
  | 'public'
  | 'authenticated'
  | 'admin'
  | 'not-authenticated'
  | 'organization-required'
  | 'project-required';

export const accessValidation = (
  accessRule: AccessRule | AccessRule[],
  session: SessionAPI | null,
  redirectionFunction: (redirectionRoute: string) => void,
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
    redirectionFunction(redirectionRoute);
  }

  if (session?.user && accessRuleArray?.includes('not-authenticated')) {
    redirectionFunction(redirectionRoute);
  }

  if (
    session?.user &&
    accessRuleArray?.includes('admin') &&
    (session.user?.role !== 'admin' || !session?.roles?.includes('admin'))
  ) {
    redirectionFunction(redirectionRoute);
  }

  if (
    !session?.organization &&
    accessRuleArray?.includes('organization-required')
  ) {
    redirectionFunction(redirectionRoute);
  }

  if (!session?.project && accessRuleArray?.includes('project-required')) {
    redirectionFunction(redirectionRoute);
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
   * import { redirect } from 'next/navigation';
   * ...
   * redirectionMethod={(url) => redirect(url)}
   * ```
   */
  redirectionFunction: (redirectionRoute: string) => void;
  isEnabled?: boolean;
};
