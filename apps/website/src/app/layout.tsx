import type { FC, PropsWithChildren } from 'react';
import './globals.css';
import { AuthProvider } from '@/providers/AuthProvider';

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default RootLayout;
