import {
  App_Auth_SignIn_Path,
  App_Home_Path,
} from '@intlayer/design-system/routes';
import { getQueryParams } from '@utils/queryProxy';
import { getLocalizedUrl, type LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { AuthenticationBarrierClient } from './AuthenticationBarrierClient';
import { AuthenticationBarrierServer } from './AuthenticationBarrierServer';
import type { AuthenticationBarrierProps as AuthenticationBarrierPropsBoth } from './accessValidation';

type AuthenticationBarrierProps = Omit<
  AuthenticationBarrierPropsBoth,
  'sessionToken' | 'redirectionFunction'
> & {
  redirectionRoute?: string;
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
    data.pathname === App_Auth_SignIn_Path ? App_Home_Path : data.pathname;

  const redirectURL =
    redirectionRoute ??
    data.redirectUrl ??
    `${App_Auth_SignIn_Path}?redirect_url=${encodeURIComponent(pathname)}`;

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
