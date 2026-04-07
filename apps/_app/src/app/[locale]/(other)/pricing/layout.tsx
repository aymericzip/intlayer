import { BackgroundLayout } from '@components/BackgroundLayout';
import type { FC, PropsWithChildren } from 'react';

const PricingLayout: FC<PropsWithChildren> = ({ children }) => (
  <BackgroundLayout>{children}</BackgroundLayout>
);

export default PricingLayout;
