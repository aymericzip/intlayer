import { App_Home_Path } from '@intlayer/design-system/routes';
import { redirect } from 'next/navigation';
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
      redirect,
      redirectionRoute,
      isEnabled
    );
  }

  return children;
};
