import { LandingPage } from '@components/LandingPage';
import { PageLayout } from '@layouts/PageLayout';
import type { NextPageIntlayer } from 'next-intlayer';
import { generateMetadata } from './metadata';
export { generateMetadata };

const Page: NextPageIntlayer = ({ params: { locale } }) => (
  <PageLayout locale={locale}>
    <LandingPage />
  </PageLayout>
);
export default Page;
