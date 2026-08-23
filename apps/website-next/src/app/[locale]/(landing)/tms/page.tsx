import { TMSLandingPage } from '@components/TMSLandingPage';
import { OrganizationHeader } from '@structuredData/OrganizationHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
import { TMSProductHeader } from '@structuredData/TMSProductHeader';
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
      <TMSProductHeader pricings={pricings} />
      <TMSLandingPage />
    </>
  );
};

export default Page;
