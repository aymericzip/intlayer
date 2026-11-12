'use client';

import type { OrganizationAPI } from '@intlayer/backend-contract/organization';
import type { ProjectAPI } from '@intlayer/backend-contract/project';
import type { UserAPI } from '@intlayer/backend-contract/user';
import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
} from 'react';

/**
 * CMS identity supplied by the host app instead of the session cookie (ex: the
 * local `intlayer-editor`, served from an origin the cookie never reaches).
 */
export type BearerAuth = {
  /** Token sent as `Authorization: Bearer`, `null` while signed out. */
  accessToken: string | null;
  user?: UserAPI | null;
  organization?: OrganizationAPI | null;
  project?: ProjectAPI | null;
  /** Starts the host sign-in flow (ex: opens the CMS login page). */
  login?: () => void;
  /** Whether a sign-in started by {@link BearerAuth.login} is in progress. */
  isLoggingIn?: boolean;
};

const BearerAuthContext = createContext<BearerAuth | null>(null);

/**
 * Makes every API hook authenticate with the given bearer token, and lets
 * signed-out actions start the host sign-in flow.
 */
export const BearerAuthProvider: FC<
  PropsWithChildren<{ value: BearerAuth }>
> = ({ value, children }) => (
  <BearerAuthContext.Provider value={value}>
    {children}
  </BearerAuthContext.Provider>
);

/** The bearer identity from the closest {@link BearerAuthProvider}, if any. */
export const useBearerAuth = (): BearerAuth | null =>
  useContext(BearerAuthContext);
