import type { Session } from '@intlayer/design-system/hooks';
import type { ReactNode } from 'react';

export {
  AuthenticationBarrierClient,
  type AuthenticationBarrierClientProps,
} from './AuthenticationBarrierClient';
export {
  AuthenticationBarrierServer,
  type AuthenticationBarrierServerProps,
} from './AuthenticationBarrierServer';

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
