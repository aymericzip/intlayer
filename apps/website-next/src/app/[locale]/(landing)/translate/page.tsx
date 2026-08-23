import { AiTranslationLandingCore } from '@components/TranslationLandingPage';
import { OrganizationHeader } from '@structuredData/OrganizationHeader';
import { TranslateProductHeader } from '@structuredData/TranslateProductHeader';
import { TranslateSoftwareApplicationHeader } from '@structuredData/TranslateSoftwareApplicationHeader';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import { getPricing } from '@utils/stripe';
import type { NextPageIntlayer } from 'next-intlayer';
import { generateMetadata } from './metadata';

export { generateMetadata };

const TranslationPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const pricings = await getPricing();

  return (
    <>
      <WebsiteHeader key={locale} />
      <OrganizationHeader />
      <TranslateSoftwareApplicationHeader />
      <TranslateProductHeader pricings={pricings} />
      <AiTranslationLandingCore />
    </>
  );
};

export default TranslationPage;
