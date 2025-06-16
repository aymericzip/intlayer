import { LocaleSwitcher } from '@components/LocaleSwitcher/LocaleSwitcher';
import { IntlayerProvider } from '@providers/IntlayerProvider';
import { getHTMLTextDir, getIntlayer } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams, NextLayoutIntlayer } from 'next-intlayer';
import localFont from 'next/font/local';

export { generateStaticParams } from 'next-intlayer';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer('page-metadata', locale);

  return metadata;
};

export const dynamic = 'force-static';

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <IntlayerProvider locale={locale}>
      <html lang={locale} dir={getHTMLTextDir(locale)}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="fixed top-5 flex w-full justify-end px-10">
            <LocaleSwitcher />
          </header>
          {children}
        </body>
      </html>
    </IntlayerProvider>
  );
};

export default LocaleLayout;
