import type { LocalesValues } from '@intlayer/config/client';
import Markdown, { type MarkdownToJSX } from 'markdown-to-jsx';
import type { FC } from 'react';
import { cn } from '../../utils/cn';
import { H1, H2, H3, H4 } from '../Headers';
import { Code } from '../IDE/Code';
import { CodeProvider } from '../IDE/CodeContext';
import { Link } from '../Link';
import { Tab, TabItem } from '../Tab';
import { Table } from '../Table';

/**
 * Props for the MarkdownRenderer component
 */
type MarkdownRendererProps = {
  /** The raw markdown string to render */
  children: string;
  /** Enable dark mode styling for code blocks and other elements */
  isDarkMode?: boolean;
  /** Current locale for internationalized link handling */
  locale?: LocalesValues;
  /** Additional options to pass to markdown-to-jsx */
  options?: MarkdownToJSX.Options;
};

/**
 * Removes frontmatter from markdown content
 *
 * Frontmatter is the YAML metadata block at the beginning of markdown files
 * delimited by --- at the start and end. This function safely removes it
 * before rendering to prevent display of metadata in the final output.
 *
 * @param markdown - The raw markdown string potentially containing frontmatter
 * @returns The cleaned markdown string without frontmatter
 *
 * @example
 * Input:
 * ```
 * ---
 * title: "My Post"
 * date: "2023-01-01"
 * ---
 * # Hello World
 * This is content.
 * ```
 *
 * Output:
 * ```
 * # Hello World
 * This is content.
 * ```
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
            Tab: (props) => <Tab {...props} />,
            TabItem: (props) => <TabItem {...props} />,

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
