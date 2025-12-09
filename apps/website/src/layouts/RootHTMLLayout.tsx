import { cn } from '@utils/cn';
import { getHTMLTextDir } from 'intlayer';
import { Inter } from 'next/font/google';
import type { FC } from 'react';

export type LocalParams = HTMLProps<HTMLHtmlElement> & {
  bodyProps?: HTMLProps<HTMLBodyElement>;
};

const inter = Inter({ subsets: ['latin'] });

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
    <head>
      {/* Preconnect and DNS Prefetch for Google Tag Manager */}
      <link
        rel="preconnect"
        href="https://www.googletagmanager.com"
        crossOrigin=""
      />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

      {/* Preconnect and DNS Prefetch for your first-party backend */}
      <link
        rel="preconnect"
        href={process.env.NEXT_PUBLIC_BACKEND_URL}
        crossOrigin=""
      />
      <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_BACKEND_URL} />
    </head>
    <body
      className={cn(
        inter.className,
        'relative flex size-full min-h-screen flex-col overflow-auto overflow-x-clip scroll-smooth bg-background leading-8 transition',
        className
      )}
      {...bodyProps}
    >
      {children}
    </body>
  </html>
);
