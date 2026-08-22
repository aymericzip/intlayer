import type { FC } from 'react';
import { IntlayerMarkdownProvider } from '~/providers/IntlayerMarkdownProvider';
import { ThemeProvider } from '~/providers/ThemeProvider';
import {
  PageContentLayout,
  type PageContentLayoutProps,
} from './PageContentLayout';

type PageLayoutProps = Omit<PageContentLayoutProps, 'className'> & {
  className?: string;
  mainClassName?: string;
};

export const PageLayout: FC<PageLayoutProps> = ({
  children,
  className,
  mainClassName,
  mobileRollable,
  ...props
}) => (
  <ThemeProvider>
    <PageContentLayout
      {...props}
      className={mainClassName}
      mobileRollable={mobileRollable}
    >
      <IntlayerMarkdownProvider>{children}</IntlayerMarkdownProvider>
    </PageContentLayout>
  </ThemeProvider>
);
