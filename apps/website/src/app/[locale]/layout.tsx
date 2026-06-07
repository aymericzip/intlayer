import { getHTMLTextDir } from 'intlayer';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { AppProviders } from '@/providers/AppProviders';

import '@/globals.css';
import '@/shiki.css';

export { generateStaticParams } from 'next-intlayer';
export { generateMetadata, viewport } from './metadata';

const RootLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
