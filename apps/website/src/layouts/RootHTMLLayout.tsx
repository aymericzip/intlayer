import { cn } from '@intlayer/design-system/utils';
import type { LocalesValues } from 'intlayer';
import { getHTMLTextDir } from 'intlayer';

import type { FC, HTMLProps } from 'react';

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
    <>
      {/* DNS Prefetch for Google Analytics */}
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

      {/* DNS Prefetch for first-party backend without unused preconnect */}
      {import.meta.env.VITE_BACKEND_URL && (
        <link rel="dns-prefetch" href={import.meta.env.VITE_BACKEND_URL} />
      )}

      {/* DNS Prefetch for Ahrefs analytics if enabled */}
      {import.meta.env.VITE_AHREFS_KEY && (
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />
      )}
    </>
    <body
      className={cn(
        'relative flex size-full min-h-screen flex-col overflow-auto overflow-x-clip scroll-smooth bg-background leading-8 transition md:flex',
        className
      )}
      {...bodyProps}
    >
      {children}
    </body>
  </html>
);
