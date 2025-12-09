import { IntlayerClientProvider } from 'next-intlayer';
import type { IntlayerServerProviderProps } from 'next-intlayer/server';
import { ThemeProvider } from 'next-themes';
import type { FC } from 'react';
import { IntlayerMarkdownProvider } from '@/providers/IntlayerMarkdownProvider';
import {
  PageContentLayout,
  type PageContentLayoutProps,
} from './PageContentLayout';
import { RootHTMLLayout } from './RootHTMLLayout';

type PageLayoutProps = IntlayerServerProviderProps &
  Omit<PageContentLayoutProps, 'className'> & {
    className?: string;
    mainClassName?: string;
    htmlProps?: HTMLProps<HTMLHtmlElement>;
    bodyProps?: HTMLProps<HTMLBodyElement>;
  };

export const PageLayout: FC<PageLayoutProps> = ({
  locale,
  children,
  className,
  mainClassName,
  mobileRollable,
  htmlProps,
  bodyProps,
  ...props
}) => (
  <IntlayerClientProvider locale={locale}>
    <RootHTMLLayout
      locale={locale}
      className={className}
      bodyProps={bodyProps}
      {...htmlProps}
    >
      {/* ThemeProvider must be inside PageContentLayout */}
      <ThemeProvider>
        {/* PageContentLayout must be inside ThemeProvider (Navbar) */}
        <PageContentLayout
          {...props}
          className={mainClassName}
          mobileRollable={mobileRollable}
        >
          {/* IntlayerMarkdownProvider must be inside ThemeProvider */}
          <IntlayerMarkdownProvider>{children}</IntlayerMarkdownProvider>
        </PageContentLayout>
      </ThemeProvider>
    </RootHTMLLayout>
  </IntlayerClientProvider>
);
