import { type NextPageIntlayer, IntlayerClientProvider } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

import { generateMetadata } from './metadata';
export { generateMetadata };

const Page: NextPageIntlayer = ({ params: { locale } }) => {
  return (
    <>
      {/**
       *   IntlayerServerProvider is used to provide the locale to the server children
       *   IntlayerServerProvider don't work if set in the layout
       */}
      <IntlayerServerProvider locale={locale}>
        {/**
         *   IntlayerClientProvider is used to provide the locale to the client children
         *   IntlayerClientProvider can be set in any parent component, including the layout
         */}
        <IntlayerClientProvider locale={locale}>
          <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
        </IntlayerClientProvider>
      </IntlayerServerProvider>
    </>
  );
};

export default Page;
