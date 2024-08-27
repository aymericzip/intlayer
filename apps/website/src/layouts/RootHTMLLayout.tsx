import GoogleAnalytics from '@components/GoogleAnalytics';
import { cn } from '@utils/cn';
import { type Locales, getHTMLTextDir } from 'intlayer';
import { Inter } from 'next/font/google';
import type { FC, PropsWithChildren } from 'react';

export type LocalParams = PropsWithChildren<{
  locale?: Locales;
}>;

const inter = Inter({ subsets: ['latin'] });

export const RootHTMLLayout: FC<LocalParams> = ({ children, locale }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <GoogleAnalytics />
    <body
      className={cn(
        inter.className,
        'bg-background dark:bg-background-dark relative h-full w-full overflow-scroll scroll-smooth transition'
      )}
    >
      {children}
    </body>
  </html>
);
