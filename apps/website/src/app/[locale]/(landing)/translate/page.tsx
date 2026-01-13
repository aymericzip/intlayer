import { AiTranslationLandingCore } from '@components/TranslationLandingPage';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';

export { generateMetadata };

const TranslationPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <AiTranslationLandingCore />
    </IntlayerServerProvider>
  );
};

export default TranslationPage;
