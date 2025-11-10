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
  const { session: sessionClient, setSession } = useSession(sessionProp);
  const isLoading = sessionClient === undefined && sessionProp === undefined;

  useEffect(() => {
    if (!sessionClient && sessionProp) {
      setSession(sessionProp ?? null);
    }
  }, [sessionClient, sessionProp, setSession]);

  useEffect(() => {
    if (typeof sessionClient === 'undefined') return;
    if (isEnabled === false) return;

    // Avoid auto-redirect (ex: /login -> /login)
    const samePath =
      typeof window !== 'undefined' &&
      (redirectionRoute === pathname || redirectionRoute === originUrl);

    if (samePath) return;

    // Use replace to avoid stacking the history
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
