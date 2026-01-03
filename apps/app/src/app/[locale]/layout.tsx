import type { NextLayoutIntlayer } from 'next-intlayer';
import { AppProviders } from '@/providers/AppProviders';

export { generateStaticParams } from 'next-intlayer';
export { generateMetadata, viewport } from './metadata';

const LandingLayout: NextLayoutIntlayer = async ({ children }) => {
  return <AppProviders>{children}</AppProviders>;
};

export default LandingLayout;
