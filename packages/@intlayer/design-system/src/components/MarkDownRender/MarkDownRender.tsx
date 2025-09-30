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
import { MarkdownProcessor, type MarkdownProcessorOptions } from './processor';

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

/**
 * MarkdownRenderer Component
 *
 * A comprehensive markdown renderer that transforms markdown text into rich,
 * interactive HTML with custom styling and Intlayer integration. Supports
 * code syntax highlighting, responsive tables, internationalized links,
 * and automatic frontmatter stripping.
 *
 * @component
 * @example
 * Basic usage:
 * ```tsx
 * const markdownContent = `
 * # Hello World
 * This is **bold** and *italic* text.
 * `;
 *
 * <MarkdownRenderer>{markdownContent}</MarkdownRenderer>
 * ```
 *
 * @example
 * With dark mode:
 * ```tsx
 * const codeExample = `
 * # API Documentation
 * \`\`\`javascript
 * const response = await fetch('/api/data');
 * const data = await response.json();
 * \`\`\`
 * `;
 *
 * <MarkdownRenderer isDarkMode={true}>
 *   {codeExample}
 * </MarkdownRenderer>
 * ```
 *
 * @example
 * With internationalized links:
 * ```tsx
 * const content = `
 * Visit our [documentation](/docs) for more information.
 * External link: [Google](https://google.com)
 * `;
 *
 * <MarkdownRenderer locale="fr">
 *   {content}
 * </MarkdownRenderer>
 * ```
 *
 * @example
 * With custom overrides:
 * ```tsx
 * const customOptions = {
 *   overrides: {
 *     h1: ({ children }) => (
 *       <h1 className="custom-title">{children}</h1>
 *     ),
 *   },
 * };
 *
 * <MarkdownRenderer options={customOptions}>
 *   {markdownContent}
 * </MarkdownRenderer>
 * ```
 *
 * @example
 * With frontmatter (automatically stripped):
 * ```tsx
 * const blogPost = `
 * ---
 * title: "My Blog Post"
 * date: "2023-12-01"
 * author: "John Doe"
 * ---
 * # My Blog Post
 * This content will be rendered without the frontmatter.
 * `;
 *
 * <MarkdownRenderer>{blogPost}</MarkdownRenderer>
 * ```
 *
 * Features:
 * - Automatic frontmatter detection and removal
 * - Syntax-highlighted code blocks with theme support
 * - Clickable headers with anchor links
 * - Internationalized link handling with locale awareness
 * - Responsive tables with hover effects
 * - Custom blockquote, list, and image styling
 * - External link detection and security attributes
 * - Inline code with distinctive styling
 * - Lazy-loaded images with GitHub raw URL support
 * - Horizontal rules with custom styling
 *
 * Supported Markdown Elements:
 * - Headers (h1-h4) with click-to-anchor functionality
 * - Code blocks with language-specific syntax highlighting
 * - Inline code with background styling
 * - Blockquotes with custom border and padding
 * - Ordered and unordered lists with custom spacing
 * - Links (internal and external) with security attributes
 * - Images with lazy loading and responsive sizing
 * - Tables with hover effects and proper styling
 * - Horizontal rules with custom appearance
 * - All standard markdown formatting (bold, italic, etc.)
 *
 * Code Block Support:
 * - Language detection from code fence info
 * - Syntax highlighting through Code component
 * - Dark/light mode theme switching
 * - Line numbers and copy functionality (via Code component)
 * - Support for popular languages (JS, TS, Python, etc.)
 *
 * Link Handling:
 * - Automatic external link detection (starts with 'http')
 * - Security attributes for external links (rel="noopener noreferrer")
 * - Locale-aware internal link routing
 * - Custom Link component integration
 * - Underlined styling for better visibility
 *
 * Image Processing:
 * - Automatic lazy loading for performance
 * - GitHub raw URL transformation for repository images
 * - Responsive sizing with max-width constraints
 * - Rounded corners for visual appeal
 *
 * Accessibility:
 * - Semantic HTML structure with proper heading hierarchy
 * - ARIA attributes through component integration
 * - Screen reader friendly link descriptions
 * - Keyboard navigation support
 * - High contrast styling options
 *
 * Performance:
 * - Lazy loading for images
 * - Efficient re-rendering with React memo patterns
 * - Code syntax highlighting with minimal bundle impact
 * - Optimized markdown parsing with markdown-to-jsx
 *
 * @param props - Component props
 * @param props.children - Raw markdown content to render
 * @param props.isDarkMode - Enable dark mode styling for code blocks
 * @param props.locale - Current locale for link internationalization
 * @param props.options - Additional markdown-to-jsx options
 * @param props.options.overrides - Custom component overrides for markdown elements
 *
 * @returns Rendered markdown content with custom styling and functionality
 */
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
            disableParsingRawHTML: true,
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
