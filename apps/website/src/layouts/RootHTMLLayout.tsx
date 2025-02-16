'use client';

import GoogleAnalytics from '@components/GoogleAnalytics';
import { useKeyboardDetector } from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import { type Locales, getHTMLTextDir } from 'intlayer';
import { Inter } from 'next/font/google';
import type { FC, PropsWithChildren } from 'react';

export type LocalParams = PropsWithChildren<{
  locale?: Locales;
}>;

const inter = Inter({ subsets: ['latin'] });

export const RootHTMLLayout: FC<LocalParams> = ({ children, locale }) => {
  const { windowHeight } = useKeyboardDetector();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)} suppressHydrationWarning>
      <GoogleAnalytics />
      <body
        className={cn(
          inter.className,
          'bg-background dark:bg-background-dark relative h-full w-full overflow-scroll scroll-smooth leading-8 transition'
        )}
        style={{
          maxHeight: windowHeight ? `${windowHeight * 0.9}px` : '',
        }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
};
