import { Session } from '@intlayer/design-system/hooks';
import type { FC } from 'react';
import type { AuthenticationBarrierProps } from '.';
import { accessValidation } from './accessValidation';

export type AuthenticationBarrierServerProps = Omit<
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
