'use client';

import { OAuth2Token } from '@intlayer/backend';
import type { IntlayerConfig } from '@intlayer/config/client';
import { Session } from './index';
import { useOAuth2 } from './useOAuth2';
import { useSession } from './useSession';

type SessionContextProps = {
  session: Session | null | undefined;
  setSession: (session: Session | null) => void;
  fetchSession: () => Promise<Session | null | undefined>;
  revalidateSession: () => Promise<Session | null | undefined>;
  isAuthenticated: boolean;
  oAuth2AccessToken: OAuth2Token | null | undefined;
};

export const useAuth = ({
  session: sessionProp,
  intlayerConfiguration,
}: {
  session?: Session | null;
  intlayerConfiguration?: IntlayerConfig;
} = {}): SessionContextProps => {
  const { session, fetchSession, revalidateSession, setSession } = useSession(
    sessionProp,
    intlayerConfiguration
  );
  const { oAuth2AccessToken } = useOAuth2(intlayerConfiguration);

  return {
    session,
    fetchSession,
    setSession,
    revalidateSession,
    oAuth2AccessToken,
    isAuthenticated: Boolean(session?.user || oAuth2AccessToken),
  };
};
