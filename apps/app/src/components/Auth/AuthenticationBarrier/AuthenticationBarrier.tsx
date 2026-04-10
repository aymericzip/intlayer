import {
  App_Auth_SignIn_Path,
  App_Home_Path,
} from '@intlayer/design-system/routes';
import { useLocation, useSearch } from '@tanstack/react-router';
import { getLocalizedUrl, type LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { AuthenticationBarrierClient } from './AuthenticationBarrierClient';
import type { AuthenticationBarrierProps as AuthenticationBarrierPropsBoth } from './accessValidation';

type AuthenticationBarrierProps = Omit<
  AuthenticationBarrierPropsBoth,
  'sessionToken' | 'redirectionFunction'
> & {
  redirectionRoute?: string;
  locale?: LocalesValues;
  originUrl?: string;
};

export const AuthenticationBarrier: FC<AuthenticationBarrierProps> = ({
  children,
  redirectionRoute,
  locale,
  ...props
}) => {
  const { pathname } = useLocation();
  const search = useSearch({ strict: false }) as Record<string, unknown>;

  const redirectUrl =
    typeof search.redirect_url === 'string' ? search.redirect_url : null;

  const effectivePathname =
    pathname === App_Auth_SignIn_Path ? App_Home_Path : pathname;

  const redirectURL =
    redirectionRoute ??
    redirectUrl ??
    `${App_Auth_SignIn_Path}?redirect_url=${encodeURIComponent(effectivePathname)}`;

  const localizedRedirectionURL = locale
    ? getLocalizedUrl(redirectURL, locale)
    : redirectURL;

  return (
    <AuthenticationBarrierClient
      {...props}
      session={undefined} // Let client fetch fresh session data
      redirectionRoute={localizedRedirectionURL}
      isEnabled={true}
    >
      {children}
    </AuthenticationBarrierClient>
  );
};
