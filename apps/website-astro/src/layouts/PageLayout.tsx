import { ViewTransitions } from 'astro:transitions';
import { defaultLocale, type LocalesValues } from 'intlayer';
import type { FC, HTMLProps } from 'react';
import { IntlayerProvider } from 'react-intlayer';
import { IntlayerMarkdownProvider } from '@/providers/IntlayerMarkdownProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import {
  PageContentLayout,
  type PageContentLayoutProps,
} from './PageContentLayout';
import { RootHTMLLayout } from './RootHTMLLayout';

type PageLayoutProps = {
  locale?: LocalesValues;
  children?: React.ReactNode;
  className?: string;
  mainClassName?: string;
  mobileRollable?: boolean;
  footer?: React.ReactNode;
  htmlProps?: HTMLProps<HTMLHtmlElement>;
  bodyProps?: HTMLProps<HTMLBodyElement>;
} & Omit<PageContentLayoutProps, 'className'>;

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
  <IntlayerProvider locale={locale}>
    <RootHTMLLayout
      locale={locale ?? defaultLocale}
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
          <ViewTransitions />
          {/* IntlayerMarkdownProvider must be inside ThemeProvider */}
          <IntlayerMarkdownProvider>{children}</IntlayerMarkdownProvider>
        </PageContentLayout>
      </ThemeProvider>
    </RootHTMLLayout>
  </IntlayerProvider>
);
