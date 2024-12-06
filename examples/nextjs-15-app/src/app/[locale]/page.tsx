import { IntlayerProvider } from '@providers/IntlayerProvider';
import { HomeContent } from '@components/HomeContent';
import { Next15PageIntlayer } from 'next-intlayer';

const Page: Next15PageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerProvider locale={locale}>
      <HomeContent />
    </IntlayerProvider>
  );
};

export default Page;
