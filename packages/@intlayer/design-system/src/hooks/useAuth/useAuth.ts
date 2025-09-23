'use client';

import type { OAuth2Token, SessionAPI } from '@intlayer/backend';
import type { IntlayerConfig } from '@intlayer/config/client';
import { useOAuth2 } from './useOAuth2';
import { useSession } from './useSession';

type SessionContextProps = {
  session: SessionAPI | null | undefined;
  setSession: (session: SessionAPI | null) => void;
  fetchSession: () => Promise<SessionAPI | null | undefined>;
  revalidateSession: () => Promise<SessionAPI | null | undefined>;
  isAuthenticated: boolean;
  oAuth2AccessToken: OAuth2Token | null | undefined;
};

export type Session = SessionAPI;

export const useAuth = ({
  session: sessionProp,
  intlayerConfiguration,
}: {
  session?: SessionAPI | null;
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
