import {
  MarkdownRenderer,
  type ParsedMarkdown,
} from '@intlayer/design-system/mark-down-render';
import { useTheme } from 'next-themes';
import type { ComponentProps, FC } from 'react';
import { lazy, Suspense } from 'react';
import { useLocale } from 'react-intlayer';
import type { FrameworkKey } from '~/components/I18nBenchmark';
import { Link } from '~/components/Link/Link';
import { TableOfContents } from '~/components/TableOfContents';
import { ClickToOpenIframe } from './ClickToOpenIframe';
import { SectionScroller } from './SectionScroller';

const I18nBenchmark = lazy(() =>
  import('~/components/I18nBenchmark').then((mod) => ({
    default: mod.I18nBenchmark,
  }))
);

type DocumentationRenderProps = {
  children: string | ParsedMarkdown;
  /** Array of heading levels to display in TOC (e.g., [2, 3, 4] for h2, h3, h4) */
  tocLevels?: number[];
  /** Maximum depth of nested headings to show in TOC */
  tocMaxDepth?: number;
};

export const DocumentationRender: FC<DocumentationRenderProps> = ({
  children,
  tocLevels = [2, 3],
  tocMaxDepth = 3,
}) => {
  const { locale } = useLocale();
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === 'dark';

  return (
    <div className="m-auto flex max-w-3xl flex-col gap-8 p-10 text-text/90 max-md:px-0">
      <MarkdownRenderer
        isDarkMode={isDarkMode}
        locale={locale}
        components={{
          a: (props) => (
            <Link
              underlined={true}
              locale={locale}
              {...props}
              to={props.href ?? ''}
            />
          ),
          Toc: (props: ComponentProps<typeof TableOfContents>) => (
            <TableOfContents
              {...props}
              levels={props.levels ?? tocLevels}
              maxDepth={props.maxDepth ?? tocMaxDepth}
            />
          ),
          I18nBenchmark: (props: { framework?: FrameworkKey }) => (
            <Suspense fallback={null}>
              <I18nBenchmark initialFramework={props.framework} />
            </Suspense>
          ),
          ClickToOpenIframe,
        }}
        wrapper={(props) => (
          <>
            <SectionScroller />
            <div className="flex flex-col gap-8 py-10" {...props} />
          </>
        )}
      >
        {children}
      </MarkdownRenderer>
    </div>
  );
};
