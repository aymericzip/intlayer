import { ClientComponentExample } from '@component/ClientComponentExample';
import { LocaleSwitcher } from '@component/LangSwitcherDropDown';
import { NestedServerComponentExample } from '@component/NestedServerComponentExample';
import { ServerComponentExample } from '@component/ServerComponentExample';
import { type Next14PageIntlayer, IntlayerClientProvider } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const PageDemoUsageComponents: Next14PageIntlayer = ({
  params: { locale },
}) => {
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
          <main className="size-screen m-auto flex max-w-xl flex-col items-center justify-center gap-8 p-20">
            <ClientComponentExample />
            <ServerComponentExample />
            <NestedServerComponentExample />
          </main>
          <div className="absolute bottom-5 right-5 z-50">
            <LocaleSwitcher />
          </div>
        </IntlayerClientProvider>
      </IntlayerServerProvider>
    </>
  );
};
export default PageDemoUsageComponents;
