import {
  AuthenticationBarrierServer as AuthenticationBarrierServerUI,
  AuthenticationBarrierClient as AuthenticationBarrierClientUI,
  type AuthenticationBarrierProps as AuthenticationBarrierPropsUI,
} from '@intlayer/design-system';
import { redirect } from 'next/navigation';
import React, { type FC } from 'react';
import { PagesRoutes } from '@/Routes';

type AuthenticationBarrierProps = Omit<
  AuthenticationBarrierPropsUI,
  'sessionToken' | 'redirectionFunction'
> & {
  redirectionRoute?: PagesRoutes | string;
};

export const AuthenticationBarrier: FC<AuthenticationBarrierProps> = ({
  children,
  redirectionRoute = PagesRoutes.Home,
  ...props
}) => (
  <AuthenticationBarrierServerUI
    {...props}
    redirectionRoute={redirectionRoute}
    redirectionFunction={redirect}
  >
    <AuthenticationBarrierClientUI
      {...props}
      redirectionRoute={redirectionRoute}
    >
      {children}
    </AuthenticationBarrierClientUI>
  </AuthenticationBarrierServerUI>
);
