import { AiTranslationLandingCore } from '@components/TranslationLandingPage';
import { OrganizationHeader } from '@structuredData/OrganizationHeader';
import { TranslateSoftwareApplicationHeader } from '@structuredData/TranslateSoftwareApplicationHeader';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';

export { generateMetadata };

const TranslationPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <WebsiteHeader key={locale} />
      <OrganizationHeader />
      <TranslateSoftwareApplicationHeader />
      <AiTranslationLandingCore />
    </IntlayerServerProvider>
  );
};

export default TranslationPage;
