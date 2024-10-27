import { type AuthenticationBarrierProps as AuthenticationBarrierPropsUI } from '@intlayer/design-system';
import { type FC } from 'react';
import { AuthenticationBarrierClient } from './AuthenticationBarrierClient';
import { AuthenticationBarrierServer } from './AuthenticationBarrierServer';
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
  <AuthenticationBarrierServer {...props} redirectionRoute={redirectionRoute}>
    <AuthenticationBarrierClient {...props} redirectionRoute={redirectionRoute}>
      {children}
    </AuthenticationBarrierClient>
  </AuthenticationBarrierServer>
);
