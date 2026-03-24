import { getIntlayerMarkdownOptions } from '@intlayer/design-system';
import type { FC, PropsWithChildren } from 'react';
import { MarkdownProvider } from 'react-intlayer/markdown';
import { Link } from '#/components/Link';
import { useTheme } from './ThemeProvider';

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const markdownOptions = getIntlayerMarkdownOptions(isDark);

  return (
    <MarkdownProvider
      {...markdownOptions}
      components={{
        ...markdownOptions.components,
        a: (props) => (
          <Link
            href=""
            label=""
            underlined={true}
            {...(props as any)}
            color="neutral"
          />
        ),
      }}
    >
      {children}
    </MarkdownProvider>
  );
};
