import { App_Home_Path } from '@intlayer/design-system/routes';
import { redirect } from '@tanstack/react-router';
import type { FC } from 'react';
import {
  type AuthenticationBarrierProps,
  accessValidation,
} from './accessValidation';

type AuthenticationBarrierServerProps = Omit<
  AuthenticationBarrierProps,
  'sessionToken' | 'redirectionFunction'
> & {
  redirectionRoute?: string;
};

export const AuthenticationBarrierServer: FC<
  AuthenticationBarrierServerProps
> = ({
  children,
  redirectionRoute = App_Home_Path,
  session,
  accessRule,
  isEnabled,
}) => {
  // Do nothing if we have explicitly disabled it
  if (isEnabled === false) return children;

  if (typeof session !== 'undefined') {
    accessValidation(
      accessRule,
      session,
      (url) => {
        throw redirect({ to: url as any });
      },
      redirectionRoute,
      isEnabled
    );
  }

  return children;
};
