import { getIntlayerMarkdownOptions } from '@intlayer/design-system';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { MarkdownProvider } from 'react-intlayer/markdown';
import { Link } from '#/components/Link';

const useIsDark = () => {
  const [isDark, setIsDark] = useState(
    typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  return isDark;
};

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const isDark = useIsDark();

  const markdownOptions = getIntlayerMarkdownOptions(isDark);

  return (
    <MarkdownProvider
      {...markdownOptions}
      components={{
        ...markdownOptions.components,
        a: (props: ComponentProps<typeof Link>) => (
          <Link color="neutral" underlined={true} {...props} />
        ),
      }}
    >
      {children}
    </MarkdownProvider>
  );
};
