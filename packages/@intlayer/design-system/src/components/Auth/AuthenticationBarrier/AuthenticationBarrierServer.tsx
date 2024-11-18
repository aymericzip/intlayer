import type { FC } from 'react';
import type { Session } from '../useAuth';
import { accessValidation } from './accessValidation';
import type { AuthenticationBarrierProps } from '.';

export type AuthenticationBarrierClientProps = Omit<
  AuthenticationBarrierProps,
  'sessionToken'
> & {
  session: Session;
};

export const AuthenticationBarrierServer: FC<AuthenticationBarrierProps> = ({
  children,
  accessRule = 'public',
  redirectionRoute = '/',
  session,
  redirectionFunction,
}) => {
  if (typeof session !== 'undefined') {
    accessValidation(
      accessRule,
      session,
      redirectionFunction,
      redirectionRoute
    );
  }

  return children;
};
