import GoogleAnalytics from '@components/GoogleAnalytics';
import { cn } from '@utils/cn';
import type { Locales } from 'intlayer';
import { Inter } from 'next/font/google';
import type { FC, PropsWithChildren } from 'react';

export type LocalParams = PropsWithChildren<{
  locale?: Locales;
}>;

const inter = Inter({ subsets: ['latin'] });

export const RootHTMLLayout: FC<LocalParams> = ({ children, locale }) => {
  const activeLocale = locale;

  return (
    <html lang={activeLocale} className="h-screen w-screen">
      <GoogleAnalytics />
      <body
        className={cn(
          inter.className,
          'bg-background dark:bg-background-dark h-screen overflow-y-auto overflow-x-hidden scroll-smooth transition'
        )}
      >
        {children}
      </body>
    </html>
  );
};
