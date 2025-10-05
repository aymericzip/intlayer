import { redirect } from 'next/navigation';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';
import {
  type AuthenticationBarrierProps,
  accessValidation,
} from './accessValidation';

type AuthenticationBarrierServerProps = Omit<
  AuthenticationBarrierProps,
  'sessionToken' | 'redirectionFunction'
> & {
  redirectionRoute?: PagesRoutes | string;
};

export const AuthenticationBarrierServer: FC<
  AuthenticationBarrierServerProps
> = ({
  children,
  redirectionRoute = PagesRoutes.Home,
  session,
  accessRule,
  isEnabled,
}) => {
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
