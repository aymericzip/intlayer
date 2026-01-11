import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { getHTMLTextDir, getIntlayer } from 'intlayer';
import { IntlayerClientProvider, type LocalPromiseParams } from 'next-intlayer';
import { getLocale } from 'next-intlayer/server';

export { generateStaticParams } from 'next-intlayer';

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
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
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
