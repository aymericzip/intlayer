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
    h1: (props) => <H1 isClickable={true} {...props} />,
    h2: (props) => <H2 isClickable={true} className="mt-16" {...props} />,
    h3: (props) => <H3 isClickable={true} className="mt-5" {...props} />,
    h4: (props) => <H4 isClickable={true} className="mt-3" {...props} />,
    h5: (props) => <H5 isClickable={true} className="mt-3" {...props} />,
    h6: (props) => <H6 isClickable={true} className="mt-3" {...props} />,

    code: ({ className, children, ...rest }: ComponentProps<'code'>) => {
      // Ensure children is a string (Markdown renderer might pass ReactNodes)
      const content = String(children ?? '').replace(/\n$/, '');

      // Determine if it is inline code or a code block
      // Code blocks usually have a className like 'language-ts'
      const isBlock = !!className;

      if (!isBlock) {
        return (
          <strong className="rounded bg-card/60 box-decoration-clone px-1 py-0.5 font-mono text-sm">
            {content}
          </strong>
        );
      }

      // Extract language from className (e.g., "language-typescript" -> "typescript")
      const language = (className?.replace(/lang(?:uage)?-/, '') ||
        'plaintext') as BundledLanguage;

      return (
        <Code
          {...rest}
          language={language}
          fileName={rest.title} // Markdown title attributes often map here
          showHeader={true}
          isDarkMode={isDarkMode} // Ensure this variable is available in scope
        >
          {content}
        </Code>
      );
    },

    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          'mt-5 gap-3 border-card border-l-4 pl-5 text-neutral',
          className
        )}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={cn('mt-5 flex list-disc flex-col gap-3 pl-5', className)}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn('mt-5 flex list-decimal flex-col gap-3 pl-5', className)}
        {...props}
      />
    ),
    img: ({ className, ...props }) => (
      <img
        {...props}
        alt={props.alt ?? ''}
        loading="lazy"
        className={cn('max-h-[80vh] max-w-full rounded-md', className)}
        src={`${props.src}?raw=true`}
      />
    ),
    a: (props) => (
      // @ts-expect-error - label is not required in LinkProps
      <Link
        isExternalLink={props.href?.startsWith('http')}
        underlined={true}
        // locale={locale}
        {...props}
        color="neutral"
      />
    ),
    pre: (props) => props.children,

    table: (props: ComponentProps<typeof Table>) => (
      <Table isRollable={true} {...props} />
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn('border-neutral border-b bg-neutral/10 p-4', className)}
        {...props}
      />
    ),
    tr: ({ className, ...props }) => (
      <tr
        className={cn('hover:/10 hover:bg-neutral/10', className)}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn('border-neutral-500/50 border-b p-4', className)}
        {...props}
      />
    ),
    hr: ({ className, ...props }) => (
      <hr className={cn('mx-6 mt-16 text-neutral', className)} {...props} />
    ),
    Tabs: (props: ComponentProps<typeof Tab>) => (
      <Tab
        {...props}
        className="rounded-xl border border-card"
        headerClassName="sticky rounded-xl top-36 z-10 bg-background/70 backdrop-blur"
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
      code: ({ className, children, ...rest }: ComponentProps<'code'>) => {
        // Ensure children is a string (Markdown renderer might pass ReactNodes)
        const content = String(children ?? '').replace(/\n$/, '');

        // Determine if it is inline code or a code block
        // Code blocks usually have a className like 'language-ts'
        const isBlock = !!className;

        if (!isBlock) {
          return (
            <strong className="rounded bg-card/60 box-decoration-clone px-1 py-0.5 font-mono text-sm">
              {content}
            </strong>
          );
        }

        // Extract language from className (e.g., "language-typescript" -> "typescript")
        const language = (className?.replace(/lang(?:uage)?-/, '') ||
          'plaintext') as BundledLanguage;

        return (
          <Code
            {...rest}
            language={language}
            fileName={rest.title} // Markdown title attributes often map here
            showHeader={true}
            isDarkMode={isDarkMode} // Ensure this variable is available in scope
          >
            {content}
          </Code>
        );
      },

      a: (props) => (
        // @ts-expect-error - label is not required in LinkProps
        <Link
          isExternalLink={props.href?.startsWith('http')}
          underlined={true}
          locale={locale}
          {...props}
          color="neutral"
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
