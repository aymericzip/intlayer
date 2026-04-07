import type { LocalesValues } from 'intlayer';
import { ThemeProvider } from '#/providers/ThemeProvider';
import type { FC, HTMLProps } from 'react';
import type { IntlayerProviderProps } from 'react-intlayer';
import { IntlayerProvider } from 'react-intlayer';
import { IntlayerMarkdownProvider } from '#/providers/IntlayerMarkdownProvider';
import {
  PageContentLayout,
  type PageContentLayoutProps,
} from './PageContentLayout';
import { RootHTMLLayout } from './RootHTMLLayout';

type PageLayoutProps = IntlayerProviderProps &
  Omit<PageContentLayoutProps, 'className'> & {
    className?: string;
    mainClassName?: string;
    htmlProps?: HTMLProps<HTMLHtmlElement>;
    bodyProps?: HTMLProps<HTMLBodyElement>;
    locale: LocalesValues;
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
  <IntlayerProvider locale={locale}>
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
  </IntlayerProvider>
);
