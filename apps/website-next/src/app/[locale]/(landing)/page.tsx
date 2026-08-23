import { LandingPage as LandingPageContent } from '@components/LandingPage';
import { OrganizationHeader } from '@structuredData/OrganizationHeader';
import { ProductHeader } from '@structuredData/ProductHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import { getPricing } from '@utils/stripe';
import type { NextPageIntlayer } from 'next-intlayer';

const LandingPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const pricings = await getPricing();

  return (
    <>
      <WebsiteHeader key={locale} />
      <OrganizationHeader />
      <SoftwareApplicationHeader />
      <ProductHeader pricings={pricings} />
      <LandingPageContent />
    </>
  );
};

export default LandingPage;
