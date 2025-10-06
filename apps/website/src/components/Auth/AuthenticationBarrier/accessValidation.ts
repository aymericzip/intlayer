import type { SessionAPI } from '@intlayer/backend';
import type { ReactNode } from 'react';

type AccessRule =
  | 'public'
  | 'authenticated'
  | 'admin'
  | 'none-authenticated'
  | 'organization-required'
  | 'project-required';

export const accessValidation = (
  accessRule: AccessRule | AccessRule[],
  session: SessionAPI | null,
  redirectionFunction: (redirectionRoute: string) => void,
  redirectionRoute: string,
  isEnabled?: boolean
) => {
  if (isEnabled === false) {
    return;
  }

  if (
    !session?.user &&
    (accessRule?.includes('authenticated') || accessRule?.includes('admin'))
  ) {
    redirectionFunction(redirectionRoute);
  }

  if (session?.user && accessRule?.includes('none-authenticated')) {
    redirectionFunction(redirectionRoute);
  }

  if (
    session?.user &&
    accessRule?.includes('admin') &&
    !session.user?.role?.includes('admin')
  ) {
    redirectionFunction(redirectionRoute);
  }

  if (!session?.organization && accessRule?.includes('organization-required')) {
    redirectionFunction(redirectionRoute);
  }

  if (!session?.project && accessRule?.includes('project-required')) {
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
