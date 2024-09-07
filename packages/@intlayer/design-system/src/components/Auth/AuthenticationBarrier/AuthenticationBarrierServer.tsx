import type { FC } from 'react';
import type { AuthProviderProps } from '../AuthProvider';
import { accessValidation } from './accessValidation';
import type { AuthenticationBarrierProps } from '.';

export type AuthenticationBarrierClientProps = Omit<
  AuthenticationBarrierProps,
  'sessionToken'
> & {
  session: AuthProviderProps['session'];
};

export const AuthenticationBarrierServer: FC<AuthenticationBarrierProps> = ({
  children,
  accessRule = 'public',
  redirectionRoute = '/',
  session: sessionProp,
  redirectionFunction,
}) => {
  const session = sessionProp ?? null;

  accessValidation(accessRule, session, redirectionFunction, redirectionRoute);

  return children;
};
