import { type Session } from '@intlayer/backend';
import { ReactNode } from 'react';

export const accessValidation = (
  accessRule: AuthenticationBarrierProps['accessRule'],
  session: Session | null,
  redirectionFunction: (redirectionRoute: string) => void,
  redirectionRoute: string,
  isEnabled?: boolean
) => {
  if (isEnabled === false) {
    return;
  }

  if (
    !session?.user &&
    (accessRule === 'authenticated' || accessRule === 'admin')
  ) {
    redirectionFunction(redirectionRoute);
  }

  if (session?.user && accessRule === 'none-authenticated') {
    redirectionFunction(redirectionRoute);
  }

  if (
    session?.user &&
    accessRule === 'admin' &&
    !session.user?.role?.includes('admin')
  ) {
    redirectionFunction(redirectionRoute);
  }
};

export type AuthenticationBarrierProps = {
  children?: ReactNode;
  accessRule?: 'public' | 'authenticated' | 'admin' | 'none-authenticated';
  redirectionRoute?: string;
  session?: Session | null;
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
