'use client';

import { Loader } from '@intlayer/design-system';
import { useSession } from '@intlayer/design-system/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { type FC, useEffect } from 'react';
import { PagesRoutes } from '@/Routes';
import {
  type AuthenticationBarrierProps,
  accessValidation,
} from './accessValidation';

type AuthenticationBarrierPropsClient = Omit<
  AuthenticationBarrierProps,
  'sessionToken' | 'redirectionFunction'
> & {
  redirectionRoute?: PagesRoutes | string;
  originUrl?: string;
};

export const AuthenticationBarrierClient: FC<
  AuthenticationBarrierPropsClient
> = ({
  children,
  redirectionRoute = PagesRoutes.Home,
  session: sessionProp,
  accessRule,
  isEnabled,
  originUrl,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const { session: sessionClient } = useSession(sessionProp);

  const isLoading = sessionClient === undefined && sessionProp === undefined;

  useEffect(() => {
    // Do nothing if we have explicitly disabled it (the server has already made a decision)
    if (isEnabled === false) return;
    if (typeof sessionClient === 'undefined') return;

    const samePath =
      typeof window !== 'undefined' &&
      (redirectionRoute === pathname || redirectionRoute === originUrl);

    if (samePath) return;

    accessValidation(
      accessRule,
      sessionClient,
      (url) => router.replace(url),
      redirectionRoute,
      isEnabled
    );
  }, [
    accessRule,
    redirectionRoute,
    sessionClient,
    isEnabled,
    pathname,
    originUrl,
    router,
  ]);

  return <Loader isLoading={isLoading}>{children}</Loader>;
};
