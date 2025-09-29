import type { LocalesValues } from '@intlayer/config/client';
import type { ComponentProps, ComponentPropsWithoutRef, FC } from 'react';
import type { BundledLanguage } from 'shiki';
import { cn } from '../../utils/cn';
import { H1, H2, H3, H4, H5, H6 } from '../Headers';
import type { CodeCompAttributes } from '../IDE/Code';
import { Code } from '../IDE/Code';
import { CodeProvider } from '../IDE/CodeContext';
import { Link } from '../Link';
import { Tab } from '../Tab';
import { TabProvider } from '../Tab/TabContext';
import { Table } from '../Table';
import { MarkdownProcessor, type MarkdownProcessorOptions } from './processer';

type MarkdownRendererProps = {
  children: string;
  isDarkMode?: boolean;
  locale?: LocalesValues;
  options?: MarkdownProcessorOptions;
};

/**
 * Removes frontmatter from markdown content
 * Frontmatter is the YAML metadata block at the beginning of markdown files
 * delimited by --- at the start and end
 */
const stripFrontmatter = (markdown: string): string => {
  const lines = markdown.split(/\r?\n/);

  // Check if the very first non-empty line is the metadata start delimiter
  const firstNonEmptyLine = lines.find((line) => line.trim() !== '');

  if (!firstNonEmptyLine || firstNonEmptyLine.trim() !== '---') {
    // No frontmatter, return original content
    return markdown;
  }

  let inMetadataBlock = false;
  let endOfMetadataIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const trimmedLine = lines[i].trim();

    // Toggle metadata block on encountering the delimiter
    if (trimmedLine === '---') {
      if (!inMetadataBlock) {
        // Begin metadata block
        inMetadataBlock = true;
        continue;
      } else {
        // End of metadata block
        endOfMetadataIndex = i;
        break;
      }
    }
  }

  if (endOfMetadataIndex > -1) {
    // Return content after the frontmatter
    return lines.slice(endOfMetadataIndex + 1).join('\n');
  }

  // If we couldn't find the end delimiter, return original content
  return markdown;
};

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children,
  isDarkMode,
  locale,
  options,
}) => {
  const { overrides, ...restOptions } = options ?? {};

  // Strip frontmatter from the markdown content before rendering
  const cleanMarkdown = stripFrontmatter(children);

  return (
    <CodeProvider>
      <TabProvider>
        <MarkdownProcessor
          options={{
            overrides: {
              h1: (props: ComponentProps<typeof H1>) => (
                <H1 isClickable={true} {...props} />
              ),
              h2: (props: ComponentProps<typeof H2>) => (
                <H2 isClickable={true} {...props} />
              ),
              h3: (props: ComponentProps<typeof H3>) => (
                <H3 isClickable={true} {...props} />
              ),
              h4: (props: ComponentProps<typeof H4>) => (
                <H4 isClickable={true} {...props} />
              ),
              h5: (props: ComponentProps<typeof H5>) => (
                <H5 isClickable={true} {...props} />
              ),
              h6: (props: ComponentProps<typeof H6>) => (
                <H6 isClickable={true} {...props} />
              ),

              code: (
                props: Omit<ComponentPropsWithoutRef<'code'>, 'children'> &
                  Partial<CodeCompAttributes> & { children: string }
              ) =>
                !props.className ? (
                  <strong className="bg-card/60 rounded p-1 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur">
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
                    showHeader={Boolean(props.fileName)}
                  />
                ),

              blockquote: ({
                className,
                ...props
              }: ComponentPropsWithoutRef<'blockquote'>) => (
                <blockquote
                  className={cn(
                    'border-card text-neutral mt-5 flex flex-col gap-3 border-l-4 pl-5',
                    className
                  )}
                  {...props}
                />
              ),
              ul: ({ className, ...props }: ComponentPropsWithoutRef<'ul'>) => (
                <ul
                  className={cn(
                    'mt-5 flex flex-col gap-3 pl-5 list-disc',
                    className
                  )}
                  {...props}
                />
              ),
              ol: ({ className, ...props }: ComponentPropsWithoutRef<'ol'>) => (
                <ol
                  className={cn(
                    'mt-5 flex flex-col gap-3 pl-5 list-decimal',
                    className
                  )}
                  {...props}
                />
              ),
              img: ({
                className,
                ...props
              }: ComponentPropsWithoutRef<'img'>) => (
                <img
                  {...props}
                  loading="lazy"
                  className={cn(
                    'max-w-full max-h-[80vh] rounded-md',
                    className
                  )}
                  src={`${props.src}?raw=true`}
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
              pre: (props: ComponentPropsWithoutRef<'pre'>) => props.children,

              table: (props: ComponentProps<typeof Table>) => (
                <Table {...props} />
              ),
              th: ({ className, ...props }: ComponentPropsWithoutRef<'th'>) => (
                <th
                  className={cn(
                    'border-neutral bg-neutral/10 border-b p-4',
                    className
                  )}
                  {...props}
                />
              ),
              tr: ({ className, ...props }: ComponentPropsWithoutRef<'tr'>) => (
                <tr
                  className={cn('hover:bg-neutral/10 hover:/10', className)}
                  {...props}
                />
              ),
              td: ({ className, ...props }: ComponentPropsWithoutRef<'td'>) => (
                <td
                  className={cn(
                    'border-b border-neutral-500/50 p-4',
                    className
                  )}
                  {...props}
                />
              ),
              hr: ({ className, ...props }: ComponentPropsWithoutRef<'hr'>) => (
                <hr
                  className={cn('mt-16 mx-6 text-neutral', className)}
                  {...props}
                />
              ),
              // Support both <Tab> and <Tabs> in markdown
              Tabs: (props: ComponentProps<typeof Tab>) => <Tab {...props} />,
              Tab: (props: ComponentProps<typeof Tab>) => <Tab {...props} />,
              TabItem: (props: ComponentProps<typeof Tab.Item>) => (
                <Tab.Item {...props} />
              ),
              Columns: ({
                className,
                ...props
              }: ComponentPropsWithoutRef<'div'>) => (
                <div
                  className={cn('flex max-md:flex-col gap-4', className)}
                  {...props}
                />
              ),
              Column: ({
                className,
                ...props
              }: ComponentPropsWithoutRef<'div'>) => (
                <div className={cn('flex-1', className)} {...props} />
              ),
              ...overrides,
            },
            ...restOptions,
          }}
        >
          {cleanMarkdown ?? ''}
        </MarkdownProcessor>
      </TabProvider>
    </CodeProvider>
  );
};
