import type { Session } from '@intlayer/design-system/hooks';
import { ReactNode } from 'react';

export const accessValidation = (
  accessRule: AuthenticationBarrierProps['accessRule'],
  session: Session | null,
  redirectionFunction: (redirectionRoute: string) => void,
  redirectionRoute: string
) => {
  if (
    !session?.user &&
    (accessRule === 'authenticated' || accessRule === 'admin')
  ) {
    console.log('redirecting to login because user is not authenticated');
    redirectionFunction(redirectionRoute);
  }

  if (session?.user && accessRule === 'none-authenticated') {
    console.log('redirecting to home because user is authenticated');
    redirectionFunction(redirectionRoute);
  }

  if (
    session?.user &&
    accessRule === 'admin' &&
    !session.user?.role?.includes('admin')
  ) {
    console.log('redirecting to home because user is authenticated');
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
};
