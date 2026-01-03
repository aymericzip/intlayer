import { getQueryParams } from '@utils/queryProxy';
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
  const pathname =
    data.pathname === PagesRoutes.Auth_SignIn
      ? PagesRoutes.Home
      : data.pathname;

  const redirectURL =
    redirectionRoute ??
    data.redirectUrl ??
    `${PagesRoutes.Auth_SignIn}?redirect_url=${encodeURIComponent(pathname)}`;

  const localizedRedirectionURL = getLocalizedUrl(redirectURL, locale);

  // If the server has a value (even null), it decides; otherwise, the client decides.
  // const serverEnabled = typeof props.session !== 'undefined';

  // The client must remain active on authenticated pages to react to session changes
  // and on not-authenticated pages to react to login in SPA
  const clientEnabled = true;

  return (
    <AuthenticationBarrierServer
      {...props}
      redirectionRoute={localizedRedirectionURL}
      isEnabled={false} // Disabled because of infinite redirection
    >
      <AuthenticationBarrierClient
        {...props}
        session={undefined} // Don't pass session to client - let it fetch fresh data
        redirectionRoute={localizedRedirectionURL}
        isEnabled={clientEnabled}
      >
        {children}
      </AuthenticationBarrierClient>
    </AuthenticationBarrierServer>
  );
};
