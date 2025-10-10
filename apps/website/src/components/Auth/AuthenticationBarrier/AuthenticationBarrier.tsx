import { getQueryParams } from '@utils/queryMiddleware';
import { getLocalizedUrl, type LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';
import { AuthenticationBarrierClient } from './AuthenticationBarrierClient';
import { AuthenticationBarrierServer } from './AuthenticationBarrierServer';
import type { AuthenticationBarrierProps as AuthenticationBarrierPropsBoth } from './accessValidation';

type AuthenticationBarrierProps = Omit<
  AuthenticationBarrierPropsBoth,
  'sessionToken' | 'redirectionFunction'
> & {
  redirectionRoute?: PagesRoutes | string;
  locale: LocalesValues;
  originUrl?: string;
};

export const AuthenticationBarrier: FC<AuthenticationBarrierProps> = async ({
  children,
  redirectionRoute,
  locale,
  ...props
}) => {
  const data = await getQueryParams();
  const redirectURL =
    redirectionRoute ??
    data.redirectUrl ??
    `${PagesRoutes.Auth_SignIn}?redirect_url=${encodeURIComponent(data.pathname)}`;
  const localizedRedirectionURL = getLocalizedUrl(redirectURL, locale);

  return (
    <AuthenticationBarrierServer
      {...props}
      redirectionRoute={localizedRedirectionURL}
      isEnabled={false} // We disable the barrier on the server side to avoid infinite re-renders
    >
      <AuthenticationBarrierClient
        {...props}
        redirectionRoute={localizedRedirectionURL}
      >
        {children}
      </AuthenticationBarrierClient>
    </AuthenticationBarrierServer>
  );
};
