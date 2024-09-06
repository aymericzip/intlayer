import { AuthProvider } from '@intlayer/design-system';
import type { FC, PropsWithChildren } from 'react';
import './globals.css';

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default RootLayout;
