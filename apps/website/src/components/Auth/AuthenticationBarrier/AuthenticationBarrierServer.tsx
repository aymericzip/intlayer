import { PagesRoutes } from '@/Routes';
import { redirect } from 'next/navigation';
import { type FC } from 'react';
import {
  AuthenticationBarrierServer as AuthenticationBarrierServerUI,
  type AuthenticationBarrierServerProps as AuthenticationBarrierServerPropsUI,
} from './AuthenticationBarrier/AuthenticationBarrierServer';

type AuthenticationBarrierServerProps = Omit<
  AuthenticationBarrierServerPropsUI,
  'sessionToken' | 'redirectionFunction'
> & {
  redirectionRoute?: PagesRoutes | string;
};

export const AuthenticationBarrierServer: FC<
  AuthenticationBarrierServerProps
> = ({ children, redirectionRoute = PagesRoutes.Home, ...props }) => (
  <AuthenticationBarrierServerUI
    {...props}
    redirectionRoute={redirectionRoute}
    redirectionFunction={redirect}
  >
    {children}
  </AuthenticationBarrierServerUI>
);
