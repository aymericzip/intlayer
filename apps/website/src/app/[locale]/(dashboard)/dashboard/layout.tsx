import type { FC, PropsWithChildren } from 'react';
import { WarmupClient } from './WarmupClient';

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <WarmupClient />
    {children}
  </>
);

export default DashboardLayout;
