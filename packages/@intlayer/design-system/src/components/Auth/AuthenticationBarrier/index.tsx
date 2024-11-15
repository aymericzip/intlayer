import type { ReactNode } from 'react';
import type { AuthProviderProps } from '../useAuth';

export { AuthenticationBarrierServer } from './AuthenticationBarrierServer';
export { AuthenticationBarrierClient } from './AuthenticationBarrierClient';

export type AuthenticationBarrierProps = AuthProviderProps & {
  children?: ReactNode;
  accessRule?: 'public' | 'authenticated' | 'admin' | 'none-authenticated';
  redirectionRoute?: string;
  session?: AuthProviderProps['session'];
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
