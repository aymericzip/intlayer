import { PagesRoutes } from '@/Routes';
import { redirect } from 'next/navigation';
import { type FC } from 'react';
import {
  accessValidation,
  AuthenticationBarrierProps,
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
}) => {
  if (typeof session !== 'undefined') {
    accessValidation(accessRule, session, redirect, redirectionRoute);
  }

  return children;
};
