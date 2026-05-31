import { getIntlayerMarkdownOptions } from '@intlayer/design-system/mark-down-render';
import { useTheme } from 'next-themes';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { MarkdownProvider } from 'react-intlayer/markdown';
import { Link } from '~/components/Link/Link';

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
        a: ({ href, ...props }: ComponentProps<'a'>) => (
          <Link
            // @ts-expect-error
            color="neutral"
            underlined={true}
            {...props}
            to={href!}
            prefetch="viewport"
          />
        ),
      }}
    >
      {children}
    </MarkdownProvider>
  );
};
