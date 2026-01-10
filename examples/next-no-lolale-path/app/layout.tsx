import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { getHTMLTextDir, getIntlayer, getLocale } from 'intlayer';
import { cookies, headers } from 'next/headers';
import { IntlayerClientProvider, type LocalPromiseParams } from 'next-intlayer';

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
  // Await headers and cookies in Next.js 15+
  const headerList = await headers();
  const cookieList = await cookies();

  const locale = await getLocale({
    // First check for intlayer cookie (default: 'INTLAYER_LOCALE')
    getCookie: (name) => cookieList.get(name)?.value,

    // Then check for intlayer header (default: 'x-intlayer-locale')
    // And finally check for accept-language header ('accept-language')
    getHeader: (name) => headerList.get(name),
  });

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
