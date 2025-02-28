import {
  AuthenticationBarrierServer as AuthenticationBarrierServerUI,
  type AuthenticationBarrierProps as AuthenticationBarrierPropsUI,
} from '@intlayer/design-system';
import { redirect } from 'next/navigation';
import { type FC } from 'react';
import { PagesRoutes } from '@/Routes';

type AuthenticationBarrierProps = Omit<
  AuthenticationBarrierPropsUI,
  'sessionToken' | 'redirectionFunction'
> & {
  redirectionRoute?: PagesRoutes | string;
};

export const AuthenticationBarrierServer: FC<AuthenticationBarrierProps> = ({
  children,
  redirectionRoute = PagesRoutes.Home,
  ...props
}) => (
  <AuthenticationBarrierServerUI
    {...props}
    redirectionRoute={redirectionRoute}
    redirectionFunction={console.log}
  >
    {children}
  </AuthenticationBarrierServerUI>
);
