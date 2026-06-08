import { cn } from '@intlayer/design-system/utils';
import type { LocalesValues } from 'intlayer';
import { getHTMLTextDir } from 'intlayer';
import { Inter } from 'next/font/google';
import type { FC, HTMLProps } from 'react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export type LocalParams = HTMLProps<HTMLHtmlElement> & {
  bodyProps?: HTMLProps<HTMLBodyElement>;
  locale: LocalesValues;
};

export const RootHTMLLayout: FC<LocalParams> = ({
  children,
  className,
  locale,
  bodyProps,
  ...props
}) => (
  <html
    lang={locale}
    dir={getHTMLTextDir(locale)}
    suppressHydrationWarning
    {...props}
  >
    <body
      className={cn(
        'relative flex size-full min-h-screen flex-col overflow-auto overflow-x-clip scroll-smooth bg-background leading-8 transition md:flex',
        inter.className,
        className
      )}
      {...bodyProps}
    >
      {children}
    </body>
  </html>
);
