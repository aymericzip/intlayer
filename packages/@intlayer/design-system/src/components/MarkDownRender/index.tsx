import type { LocalesValues } from '@intlayer/config/client';
import Markdown, { type MarkdownToJSX } from 'markdown-to-jsx';
import type { FC } from 'react';
import { cn } from '../../utils/cn';
import { H1, H2, H3, H4 } from '../Headers';
import { Code } from '../IDE/Code';
import { CodeProvider } from '../IDE/CodeContext';
import { Link } from '../Link';
import { Table } from '../Table';

type MarkdownRendererProps = {
  children: string;
  isDarkMode?: boolean;
  locale?: LocalesValues;
  options?: MarkdownToJSX.Options;
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
      <Markdown
        options={{
          overrides: {
            h1: (props) => <H1 isClickable={true} {...props} />,
            h2: (props) => <H2 isClickable={true} {...props} />,
            h3: (props) => <H3 isClickable={true} {...props} />,
            h4: (props) => <H4 isClickable={true} {...props} />,

            code: (props) =>
              typeof props.className === 'undefined' ? (
                <strong className="bg-card/60 rounded p-1 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur">
                  {props.children}
                </strong>
              ) : (
                <Code
                  isDarkMode={isDarkMode}
                  language={props.className?.replace('lang-', '')}
                  {...props}
                />
              ),

            blockquote: ({ className, ...props }) => (
              <blockquote
                className={cn(
                  'border-card text-neutral mt-5 flex flex-col gap-3 border-l-4 pl-5',
                  className
                )}
                {...props}
              />
            ),
            ul: ({ className, ...props }) => (
              <ul
                className={cn(
                  'mt-5 flex flex-col gap-3 pl-5 list-disc',
                  className
                )}
                {...props}
              />
            ),
            ol: ({ className, ...props }) => (
              <ol
                className={cn(
                  'mt-5 flex flex-col gap-3 pl-5 list-decimal',
                  className
                )}
                {...props}
              />
            ),
            li: ({ className, ...props }) => (
              <li className={cn('', className)} {...props} />
            ),
            img: ({ className, ...props }) => (
              <img
                {...props}
                loading="lazy"
                className={cn('max-w-full max-h-[80vh] rounded-md', className)}
                src={`${props.src}?raw=true`}
              />
            ),
            a: (props) => (
              <Link
                color="neutral"
                isExternalLink={props.href?.startsWith('http')}
                underlined={true}
                locale={locale}
                {...props}
              />
            ),
            pre: (props) => props.children,
            table: (props) => <Table {...props} />,

            th: ({ className, ...props }) => (
              <th
                className={cn(
                  'border-neutral bg-neutral/10 border-b p-4',
                  className
                )}
                {...props}
              />
            ),
            tr: ({ className, ...props }) => (
              <tr
                className={cn('hover:bg-neutral/10 hover:/10', className)}
                {...props}
              />
            ),
            td: ({ className, ...props }) => (
              <td
                className={cn('border-b border-neutral-500/50 p-4', className)}
                {...props}
              />
            ),
            hr: ({ className, ...props }) => (
              <hr
                className={cn('mt-16 mx-6 text-neutral', className)}
                {...props}
              />
            ),
            ...overrides,
          },
          ...restOptions,
        }}
      >
        {cleanMarkdown ?? ''}
      </Markdown>
    </CodeProvider>
  );
};
