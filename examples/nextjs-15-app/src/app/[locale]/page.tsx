import { IntlayerProvider } from '@providers/IntlayerProvider';
import { HomeContent } from '@components/HomeContent';
import { NextPageIntlayer } from 'next-intlayer';

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerProvider locale={locale}>
      <HomeContent />
    </IntlayerProvider>
  );
};

export default Page;
