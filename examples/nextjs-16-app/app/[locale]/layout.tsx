import '../globals.css';
import { getHTMLTextDir } from 'intlayer';
import { Inter } from 'next/font/google';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { IntlayerProvider } from 'next-intlayer';

export { generateStaticParams } from 'next-intlayer';

const inter = Inter({ subsets: ['latin'] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
