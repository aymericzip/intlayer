import { cn } from '@utils/cn';
import { type LocalesValues, getHTMLTextDir } from 'intlayer';
import { Inter } from 'next/font/google';
import type { FC, PropsWithChildren } from 'react';

export type LocalParams = PropsWithChildren<{
  locale?: LocalesValues;
}>;

const inter = Inter({ subsets: ['latin'] });

export const RootHTMLLayout: FC<LocalParams> = ({ children, locale }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)} suppressHydrationWarning>
    <body
      className={cn(
        inter.className,
        'bg-background dark:bg-background-dark relative size-full overflow-scroll scroll-smooth leading-8 transition'
      )}
      suppressHydrationWarning
    >
      {children}
    </body>
  </html>
);
