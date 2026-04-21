import { Container } from '@components/Container';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { cn } from '@utils/cn';
import type { ComponentProps, ComponentPropsWithoutRef, FC } from 'react';
import { memo } from 'react';
import {
  type MarkdownRenderer as MarkdownRendererIntlayer,
  renderMarkdown,
} from 'react-intlayer';
import type { BundledLanguage } from 'shiki/bundle/web';
import { H1, H2, H3, H4, H5, H6 } from '../Headers';
import { Code } from '../IDE/Code';
import { CodeProvider } from '../IDE/CodeContext';
import { Link } from '../Link';
import { Tab } from '../Tab';
import { TabProvider } from '../Tab/TabContext';
import { SmartTable } from '../Table';

// Extracted, stable component renderers
const H1Renderer = (props: ComponentProps<'h1'>) => (
  <H1 isClickable className="text-text" {...props} />
);
const H2Renderer = (props: ComponentProps<'h2'>) => (
  <H2 isClickable className="mt-16 text-text" {...props} />
);
const H3Renderer = (props: ComponentProps<'h3'>) => (
  <H3 isClickable className="mt-5 text-text" {...props} />
);
const H4Renderer = (props: ComponentProps<'h4'>) => (
  <H4 isClickable className="mt-3 text-text" {...props} />
);
const H5Renderer = (props: ComponentProps<'h5'>) => (
  <H5 isClickable className="mt-3 text-text" {...props} />
);
const H6Renderer = (props: ComponentProps<'h6'>) => (
  <H6 isClickable className="mt-3 text-text" {...props} />
);
const StrongRenderer = (props: ComponentProps<'strong'>) => (
  <strong className="text-text" {...props} />
);

const MemoizedCodeBlock = memo(
  ({
    className,
    children,
    isDarkMode,
    ...rest
  }: ComponentProps<'code'> & { isDarkMode?: boolean }) => {
    const content = String(children ?? '').replace(/\n$/, '');
    const isBlock = !!className;

    if (!isBlock) {
      const decodedContent = content.replace(
        /&(?:amp;)?#(\d+);/g,
        (_, code: string) => String.fromCharCode(parseInt(code, 10))
      );
      return (
        <code className="rounded-md border border-neutral/30 bg-card/60 box-decoration-clone px-1.5 py-0.5 font-mono text-sm">
          {decodedContent}
        </code>
      );
    }

    const language = (className?.replace(/lang(?:uage)?-/, '') ||
      'plaintext') as BundledLanguage;

    return (
      <Code {...rest} language={language} showHeader isDarkMode={isDarkMode}>
        {content}
      </Code>
    );
  },
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className &&
    prevProps.isDarkMode === nextProps.isDarkMode
);

const createCodeRenderer = (isDarkMode?: boolean) => {
  return function CodeWrapper(props: ComponentProps<'code'>) {
    return <MemoizedCodeBlock {...props} isDarkMode={isDarkMode} />;
  };
};

const BlockquoteRenderer = ({
  className,
  ...props
}: ComponentProps<'blockquote'>) => (
  <blockquote
    className={cn(
      'mt-5 gap-3 border-card border-l-4 pl-5 text-neutral [&_strong]:text-neutral',
      className
    )}
    {...props}
  />
);

const UlRenderer = ({ className, ...props }: ComponentProps<'ul'>) => (
  <ul
    className={cn(
      'mt-5 flex list-disc flex-col gap-3 pl-5 marker:text-neutral/80',
      className
    )}
    {...props}
  />
);

const OlRenderer = ({ className, ...props }: ComponentProps<'ol'>) => (
  <ol
    className={cn(
      'mt-5 flex list-decimal flex-col gap-3 pl-5 marker:text-neutral/80',
      className
    )}
    {...props}
  />
);

const ImgRenderer = ({
  className,
  alt,
  src,
  ...props
}: ComponentProps<'img'>) => (
  <img
    {...props}
    alt={alt ?? ''}
    loading="lazy"
    className={cn('max-h-[80vh] max-w-full rounded-md', className)}
    src={
      src?.includes('github.com')
        ? src
            ?.replace('github.com', 'raw.githubusercontent.com')
            .replace('/blob/', '/') // GitHub raw URLs do not use /blob/
        : src
    }
  />
);

const createLinkRenderer = (locale?: LocalesValues) => {
  return (props: ComponentProps<'a'>) => (
    <Link
      isExternalLink={props.href?.startsWith('http')}
      underlined
      locale={locale}
      label=""
      color="text"
      {...(props as any)}
    />
  );
};

const PreRenderer = (props: ComponentProps<'pre'>) => <>{props.children}</>;
const TableRenderer = (props: ComponentProps<typeof SmartTable>) => (
  <SmartTable isRollable displayModal {...props} />
);
const ThRenderer = ({ className, ...props }: ComponentProps<'th'>) => (
  <th
    className={cn('border-neutral border-b bg-neutral/10 p-4', className)}
    {...props}
  />
);
const TrRenderer = ({ className, ...props }: ComponentProps<'tr'>) => (
  <tr className={cn('hover:/10 hover:bg-neutral/10', className)} {...props} />
);
const TdRenderer = ({ className, ...props }: ComponentProps<'td'>) => (
  <td
    className={cn('border-neutral-500/50 border-b p-4', className)}
    {...props}
  />
);
const HrRenderer = ({ className, ...props }: ComponentProps<'hr'>) => (
  <hr className={cn('mx-6 mt-16 text-neutral', className)} {...props} />
);

const TabsRenderer = (props: ComponentProps<typeof Tab>) => (
  <Tab
    {...props}
    className="rounded-xl border border-card"
    headerClassName="sticky rounded-xl top-24 z-5 bg-background/70 backdrop-blur overflow-x-auto"
  />
);
const ColumnsRenderer = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div className={cn('flex gap-4 max-md:flex-col', className)} {...props} />
);
const ColumnRenderer = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div className={cn('flex-1', className)} {...props} />
);

const Iframe = (props: ComponentProps<'iframe'>) => (
  <Container
    padding="sm"
    roundedSize="2xl"
    color="neutral"
    className="overflow-hidden"
  >
    <iframe {...props} />
  </Container>
);

// Static configuration object for static renderers
const staticMarkdownComponents = {
  h1: H1Renderer,
  h2: H2Renderer,
  h3: H3Renderer,
  h4: H4Renderer,
  h5: H5Renderer,
  h6: H6Renderer,
  strong: StrongRenderer,
  blockquote: BlockquoteRenderer,
  ul: UlRenderer,
  ol: OlRenderer,
  img: ImgRenderer,
  pre: PreRenderer,
  table: TableRenderer,
  th: ThRenderer,
  tr: TrRenderer,
  td: TdRenderer,
  hr: HrRenderer,
  Tabs: TabsRenderer,
  Tab: Tab.Item,
  Columns: ColumnsRenderer,
  Column: ColumnRenderer,
  iframe: Iframe,
};

// Factory function to create components with dynamic props
const createMarkdownComponents = (
  isDarkMode?: boolean,
  locale?: LocalesValues
) => ({
  ...staticMarkdownComponents,
  code: createCodeRenderer(isDarkMode),
  a: createLinkRenderer(locale),
});

// Export static renderers for backward compatibility
export const baseMarkdownComponents = staticMarkdownComponents;

type MarkdownRendererProps = {
  children: string;
  isDarkMode?: boolean;
  locale?: LocalesValues;
  forceBlock?: boolean;
  preserveFrontmatter?: boolean;
  tagfilter?: boolean;
  components?: ComponentProps<typeof MarkdownRendererIntlayer>['components'];
  wrapper?: ComponentProps<typeof MarkdownRendererIntlayer>['wrapper'];
};

export const getIntlayerMarkdownOptions = (_isDarkMode?: boolean) => ({
  components: baseMarkdownComponents,
});

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children,
  isDarkMode = false,
  locale,
  forceBlock,
  preserveFrontmatter,
  tagfilter,
  components: componentsProp,
  wrapper,
}) => {
  const markdownComponents = createMarkdownComponents(isDarkMode, locale);

  const markdownContent = renderMarkdown(children, {
    components: {
      ...markdownComponents,
      ...componentsProp,
    },
    wrapper,
    forceBlock,
    preserveFrontmatter,
    tagfilter,
  });

  return (
    <CodeProvider>
      <TabProvider>{markdownContent}</TabProvider>
    </CodeProvider>
  );
};
