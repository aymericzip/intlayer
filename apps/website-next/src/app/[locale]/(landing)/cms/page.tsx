import { CMSLandingPage } from '@components/CMSLandingPage';
import { OrganizationHeader } from '@structuredData/OrganizationHeader';
import { ProductHeader } from '@structuredData/ProductHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import { getPricing } from '@utils/stripe';
import type { NextPageIntlayer } from 'next-intlayer';
import { generateMetadata } from './metadata';

export { generateMetadata };

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const pricings = await getPricing();

  return (
    <>
      <WebsiteHeader key={locale} />
      <OrganizationHeader />
      <SoftwareApplicationHeader />
      <ProductHeader pricings={pricings} />
      <CMSLandingPage />
    </>
  );
};

export default Page;
