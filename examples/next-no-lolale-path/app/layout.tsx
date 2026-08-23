import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { getHTMLTextDir, getIntlayer } from 'intlayer';
import { getLocale, IntlayerProvider } from 'next-intlayer/server';

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
      <IntlayerProvider locale={locale}>
        <body>{children}</body>
      </IntlayerProvider>
    </html>
  );
};

export default RootLayout;
