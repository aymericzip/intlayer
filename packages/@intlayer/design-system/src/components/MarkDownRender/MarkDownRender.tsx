import type { LocalesValues } from '@intlayer/types';
import { cn } from '@utils/cn';
import type { ComponentProps, ComponentPropsWithoutRef, FC } from 'react';
import {
  type MarkdownRenderer as MarkdownRendererIntlayer,
  type RenderMarkdownProps,
  renderMarkdown,
} from 'react-intlayer';
import type { BundledLanguage } from 'shiki/bundle/web';
import { H1, H2, H3, H4, H5, H6 } from '../Headers';
import type { CodeCompAttributes } from '../IDE/Code';
import { Code } from '../IDE/Code';
import { CodeProvider } from '../IDE/CodeContext';
import { Link } from '../Link';
import { Tab } from '../Tab';
import { TabProvider } from '../Tab/TabContext';
import { Table } from '../Table';

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

export const getIntlayerMarkdownOptions: (
  isDarkMode: boolean
) => RenderMarkdownProps = (isDarkMode) => ({
  components: {
    h1: (props: ComponentProps<typeof H1>) => (
      <H1 isClickable={true} {...props} />
    ),
    h2: (props: ComponentProps<typeof H2>) => (
      <H2 isClickable={true} className="mt-16" {...props} />
    ),
    h3: (props: ComponentProps<typeof H3>) => (
      <H3 isClickable={true} className="mt-5" {...props} />
    ),
    h4: (props: ComponentProps<typeof H4>) => (
      <H4 isClickable={true} className="mt-3" {...props} />
    ),
    h5: (props: ComponentProps<typeof H5>) => (
      <H5 isClickable={true} className="mt-3" {...props} />
    ),
    h6: (props: ComponentProps<typeof H6>) => (
      <H6 isClickable={true} className="mt-3" {...props} />
    ),

    code: (
      props: Omit<ComponentPropsWithoutRef<'code'>, 'children'> &
        Partial<CodeCompAttributes> & { children: string }
    ) =>
      !props.className ? (
        <strong className="rounded bg-card/60 box-decoration-clone px-1 py-0.5">
          {props.children}
        </strong>
      ) : (
        <Code
          {...props}
          isDarkMode={isDarkMode}
          language={
            (props.className?.replace('lang-', '') ||
              'plaintext') as BundledLanguage
          }
          fileName={props.fileName}
          showHeader={Boolean(
            props.fileName ||
              props.packageManager ||
              props.codeFormat ||
              props.contentDeclarationFormat
          )}
        />
      ),

    blockquote: ({
      className,
      ...props
    }: ComponentPropsWithoutRef<'blockquote'>) => (
      <blockquote
        className={cn(
          'mt-5 gap-3 border-card border-l-4 pl-5 text-neutral',
          className
        )}
        {...props}
      />
    ),
    ul: ({ className, ...props }: ComponentPropsWithoutRef<'ul'>) => (
      <ul
        className={cn('mt-5 flex list-disc flex-col gap-3 pl-5', className)}
        {...props}
      />
    ),
    ol: ({ className, ...props }: ComponentPropsWithoutRef<'ol'>) => (
      <ol
        className={cn('mt-5 flex list-decimal flex-col gap-3 pl-5', className)}
        {...props}
      />
    ),
    img: ({ className, ...props }: ComponentPropsWithoutRef<'img'>) => (
      <img
        {...props}
        alt={props.alt ?? ''}
        loading="lazy"
        className={cn('max-h-[80vh] max-w-full rounded-md', className)}
        src={`${props.src}?raw=true`}
      />
    ),
    a: (props: ComponentProps<typeof Link>) => (
      <Link
        color="neutral"
        isExternalLink={props.href?.startsWith('http')}
        underlined={true}
        // locale={locale}
        {...props}
      />
    ),
    pre: (props: ComponentPropsWithoutRef<'pre'>) => props.children,

    table: (props: ComponentProps<typeof Table>) => (
      <Table isRollable={true} {...props} />
    ),
    th: ({ className, ...props }: ComponentPropsWithoutRef<'th'>) => (
      <th
        className={cn('border-neutral border-b bg-neutral/10 p-4', className)}
        {...props}
      />
    ),
    tr: ({ className, ...props }: ComponentPropsWithoutRef<'tr'>) => (
      <tr
        className={cn('hover:/10 hover:bg-neutral/10', className)}
        {...props}
      />
    ),
    td: ({ className, ...props }: ComponentPropsWithoutRef<'td'>) => (
      <td
        className={cn('border-neutral-500/50 border-b p-4', className)}
        {...props}
      />
    ),
    hr: ({ className, ...props }: ComponentPropsWithoutRef<'hr'>) => (
      <hr className={cn('mx-6 mt-16 text-neutral', className)} {...props} />
    ),
    // Support <Tabs> as container and <Tab> as item in markdown
    Tabs: (props: ComponentProps<typeof Tab>) => (
      <Tab
        {...props}
        headerClassName="sticky top-36 z-10 bg-background/70 backdrop-blur"
      />
    ),
    Tab: Tab.Item,
    Columns: ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => (
      <div className={cn('flex gap-4 max-md:flex-col', className)} {...props} />
    ),
    Column: ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => (
      <div className={cn('flex-1', className)} {...props} />
    ),
  },
});

/**
 * MarkdownRenderer Component
 *
 * A comprehensive markdown renderer that transforms markdown text into rich,
 * interactive HTML with custom styling and Intlayer integration. Supports
 * code syntax highlighting, responsive tables, internationalized links,
 * and automatic frontmatter stripping.
 *
 * @component
 */
export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children,
  isDarkMode,
  locale,
  forceBlock,
  preserveFrontmatter,
  tagfilter,
  components: componentsProp,
  wrapper,
}) => {
  const markdownOptions = getIntlayerMarkdownOptions(isDarkMode ?? false);

  const markdownContent = renderMarkdown(children, {
    components: {
      ...markdownOptions.components,
      // Pass dynamic props to components
      code: (
        props: Omit<ComponentPropsWithoutRef<'code'>, 'children'> &
          Partial<CodeCompAttributes> & { children: string }
      ) =>
        !props.className ? (
          <strong className="rounded bg-card/60 box-decoration-clone px-1 py-0.5">
            {props.children}
          </strong>
        ) : (
          <Code
            {...props}
            isDarkMode={isDarkMode}
            language={
              (props.className?.replace('lang-', '') ||
                'plaintext') as BundledLanguage
            }
            fileName={props.fileName}
            showHeader={Boolean(
              props.fileName ||
                props.packageManager ||
                props.codeFormat ||
                props.contentDeclarationFormat
            )}
          />
        ),
      a: (props: ComponentProps<typeof Link>) => (
        <Link
          color="neutral"
          isExternalLink={props.href?.startsWith('http')}
          underlined={true}
          locale={locale}
          {...props}
        />
      ),
      ...componentsProp,
    },
    wrapper: wrapper ?? markdownOptions.wrapper,
    forceBlock: forceBlock ?? markdownOptions.forceBlock,
    preserveFrontmatter:
      preserveFrontmatter ?? markdownOptions.preserveFrontmatter,
    tagfilter: tagfilter ?? markdownOptions.tagfilter,
  });

  return (
    <CodeProvider>
      <TabProvider>{markdownContent}</TabProvider>
    </CodeProvider>
  );
};
