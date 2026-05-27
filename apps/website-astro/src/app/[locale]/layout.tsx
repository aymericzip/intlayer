import type { FC, PropsWithChildren } from 'react';
import { AppProviders } from '@/providers/AppProviders';

export { generateMetadata, viewport } from './metadata';

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <AppProviders>{children}</AppProviders>
);

export default RootLayout;
