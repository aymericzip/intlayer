import { PageLayout } from '@layouts/PageLayout';
import type { NextPageIntlayer } from 'next-intlayer';
import { generateMetadata } from './metadata';
export { generateMetadata };

const Page: NextPageIntlayer = ({ params: { locale } }) => {
  return <PageLayout locale={locale}></PageLayout>;
};

export default Page;
