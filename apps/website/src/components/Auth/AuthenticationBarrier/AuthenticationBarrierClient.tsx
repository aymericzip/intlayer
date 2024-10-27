'use client';

import {
  AuthenticationBarrierClient as AuthenticationBarrierClientUI,
  type AuthenticationBarrierProps as AuthenticationBarrierPropsUI,
} from '@intlayer/design-system';
import { useRouter } from 'next/navigation';
import { type FC } from 'react';
import { PagesRoutes } from '@/Routes';

type AuthenticationBarrierProps = Omit<
  AuthenticationBarrierPropsUI,
  'sessionToken' | 'redirectionFunction'
> & {
  redirectionRoute?: PagesRoutes | string;
};

export const AuthenticationBarrierClient: FC<AuthenticationBarrierProps> = ({
  children,
  redirectionRoute = PagesRoutes.Home,
  ...props
}) => {
  const router = useRouter();
  return (
    <AuthenticationBarrierClientUI
      {...props}
      redirectionRoute={redirectionRoute}
      redirectionFunction={router.push}
    >
      {children}
    </AuthenticationBarrierClientUI>
  );
};
