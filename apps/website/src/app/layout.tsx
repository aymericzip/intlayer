import type { FC, PropsWithChildren } from 'react';
import './globals.css';
import NextAuthProvider from '@/providers/NextAuthProvider';

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <NextAuthProvider>{children}</NextAuthProvider>
);

export default RootLayout;
