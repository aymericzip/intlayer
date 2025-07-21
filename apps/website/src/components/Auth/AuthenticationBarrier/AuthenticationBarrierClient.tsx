'use client';

import { PagesRoutes } from '@/Routes';
import { useRouter } from 'next/navigation';
import { type FC } from 'react';
import {
  AuthenticationBarrierClient as AuthenticationBarrierClientUI,
  type AuthenticationBarrierProps as AuthenticationBarrierPropsUI,
} from './AuthenticationBarrier/index';

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
