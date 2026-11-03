import { getHTMLTextDir, getIntlayer } from 'intlayer';
import type { Metadata } from 'next';
import './globals.css';
import { getLocale, IntlayerProvider } from 'next-intlayer/server';
import type { ReactNode } from 'react';

export { generateStaticParams } from 'next-intlayer';

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer('metadata', locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
