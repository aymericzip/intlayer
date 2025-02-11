import type { ReactNode } from 'react';
import type { Session } from '../useAuth';

export { AuthenticationBarrierServer } from './AuthenticationBarrierServer';
export { AuthenticationBarrierClient } from './AuthenticationBarrierClient';

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
