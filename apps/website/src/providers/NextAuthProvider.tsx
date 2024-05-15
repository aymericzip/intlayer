'use client';

import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { PropsWithChildren, FC } from 'react';

export type NextAuthProviderProps = PropsWithChildren<{
  /**
   * next-auth session
   */
  session?: Session | null;
}>;

const NextAuthProvider: FC<NextAuthProviderProps> = ({ children, session }) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default NextAuthProvider;
