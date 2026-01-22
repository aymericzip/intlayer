import type { Overrides } from '@intlayer/core';
import type { FC, JSX, ReactNode } from 'react';
import {
  type MarkdownProviderOptions,
  useMarkdownContext,
} from './MarkdownProvider';
import { compiler, type MarkdownRendererOptions } from './processor';

/**
 * Props for rendering markdown content.
 *
 * @example
 * ```tsx
 * const props: RenderMarkdownProps = {
 *   components: {
 *     h1: ({ children }) => <h1 className="text-3xl">{children}</h1>,
 *     p: ({ children }) => <p className="text-gray-700">{children}</p>,
 *   },
 *   wrapper: ({ children }) => <article>{children}</article>,
 *   options: {
 *     forceBlock: true,
 *     preserveFrontmatter: false,
 *     tagfilter: true,
 *   },
 * };
 * ```
 */
export type RenderMarkdownProps = {
  /**
   * Component overrides for HTML tags.
   * Allows you to customize how specific HTML elements are rendered.
   * Only used if not wrapped in a MarkdownProvider.
   *
   * @example
   * ```tsx
   * components={{
   *   h1: ({ children }) => <h1 className="title">{children}</h1>,
   *   a: ({ href, children }) => <Link to={href}>{children}</Link>,
   * }}
   * ```
   */
  components?: Overrides;
  /**
   * Wrapper element or component to be used when there are multiple children.
   * Only used if not wrapped in a MarkdownProvider.
   *
   * @example
   * ```tsx
   * wrapper={({ children }) => <div className="markdown-content">{children}</div>}
   * ```
   */
  wrapper?: FC;
  /**
   * Markdown processor options.
   * Only used if not wrapped in a MarkdownProvider.
   *
   * @example
   * ```tsx
   * options={{
   *   forceBlock: true,        // Force block-level wrapper
   *   preserveFrontmatter: false, // Remove frontmatter
   *   tagfilter: true,          // Enable GitHub tag filter
   * }}
   * ```
   */
  options?: MarkdownProviderOptions;
};

/**
 * Renders markdown content to JSX with the provided components and options.
 *
 * This function does not use context from MarkdownProvider. Use `useMarkdownRenderer`
 * hook if you want to leverage provider context.
 *
 * @param content - The markdown string to render
 * @param props - Configuration options for rendering
 * @param props.components - Component overrides for HTML tags
 * @param props.wrapper - Wrapper component for multiple children
 * @param props.options - Markdown processor options
 * @returns JSX element representing the rendered markdown
 *
 * @example
 * ```tsx
 * import { renderMarkdown } from '@intlayer/react-intlayer/markdown';
 *
 * const markdown = '# Hello World\n\nThis is **bold** text.';
 * const jsx = renderMarkdown(markdown, {
 *   components: {
 *     h1: ({ children }) => <h1 className="title">{children}</h1>,
 *   },
 *   options: {
 *     forceBlock: true,
 *   },
 * });
 * ```
 */
export const renderMarkdown = (
  content: string,
  { components, wrapper, options = {} }: RenderMarkdownProps
): JSX.Element => {
  const { forceBlock, preserveFrontmatter, tagfilter } = options;

  // Map public options to internal processor options
  const internalOptions: MarkdownRendererOptions = {
    components,
    forceBlock,
    wrapper,
    forceWrapper: !!wrapper,
    preserveFrontmatter,
    tagfilter,
  };

  return compiler(content, internalOptions);
};

/**
 * Hook that returns a function to render markdown content.
 *
 * This hook considers the configuration from the `MarkdownProvider` context if available,
 * falling back to the provided props or default behavior.
 *
 * @param props - Optional configuration that will override context values
 * @param props.components - Component overrides for HTML tags (overrides context)
 * @param props.wrapper - Wrapper component (overrides context)
 * @param props.options - Markdown processor options (merged with context options)
 * @returns A function that takes markdown content and returns JSX
 *
 * @example
 * ```tsx
 * import { useMarkdownRenderer } from '@intlayer/react-intlayer/markdown';
 *
 * function MyComponent() {
 *   const renderMarkdown = useMarkdownRenderer({
 *     components: {
 *       h1: ({ children }) => <h1 className="custom">{children}</h1>,
 *     },
 *   });
 *
 *   return (
 *     <div>
 *       {renderMarkdown('# Hello\n\nThis is **markdown**')}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With MarkdownProvider context
 * function App() {
 *   return (
 *     <MarkdownProvider
 *       components={{ h1: CustomHeading }}
 *       options={{ forceBlock: true }}
 *     >
 *       <MyComponent />
 *     </MarkdownProvider>
 *   );
 * }
 * ```
 */
export const useMarkdownRenderer = ({
  components,
  wrapper,
  options = {},
}: RenderMarkdownProps = {}) => {
  const context = useMarkdownContext();

  return (content: string) => {
    if (context) {
      return context.renderMarkdown(content, { components, wrapper, options });
    }

    return renderMarkdown(content, { components, wrapper, options });
  };
};

/**
 * Props for the MarkdownRenderer component.
 *
 * @example
 * ```tsx
 * const props: MarkdownRendererProps = {
 *   children: '# Hello World\n\nThis is **bold** text.',
 *   components: {
 *     h1: ({ children }) => <h1 className="title">{children}</h1>,
 *   },
 *   wrapper: ({ children }) => <article>{children}</article>,
 *   options: {
 *     forceBlock: true,
 *   },
 * };
 * ```
 */
export type MarkdownRendererProps = RenderMarkdownProps & {
  /**
   * The markdown content to render as a string.
   *
   * @example
   * ```tsx
   * <MarkdownRenderer>
   *   {`# Title\n\nParagraph with **bold** text.`}
   * </MarkdownRenderer>
   * ```
   */
  children: string;
  /**
   * Custom render function for markdown.
   * If provided, it will overwrite context and default rendering.
   *
   * @param markdown - The markdown string to render
   * @param options - Optional rendering options
   * @returns React node representing the rendered markdown
   *
   * @example
   * ```tsx
   * <MarkdownRenderer
   *   renderMarkdown={(md, opts) => {
   *     // Custom rendering logic
   *     return <div dangerouslySetInnerHTML={{ __html: customParser(md) }} />;
   *   }}
   * >
   *   {markdownContent}
   * </MarkdownRenderer>
   * ```
   */
  renderMarkdown?: (
    markdown: string,
    options?: {
      components?: Overrides;
      wrapper?: FC;
      options?: MarkdownProviderOptions;
    }
  ) => ReactNode;
};

/**
 * React component that renders markdown content to JSX.
 *
 * This component uses the `renderMarkdown` function from the `MarkdownProvider` context
 * if available. Otherwise, it falls back to the default compiler with provided components
 * and options. You can also provide a custom `renderMarkdown` function prop to override
 * all rendering behavior.
 *
 * @example
 * ```tsx
 * import { MarkdownRenderer } from '@intlayer/react-intlayer/markdown';
 *
 * function MyComponent() {
 *   return (
 *     <MarkdownRenderer>
 *       {`# Hello World
 *
 * This is a paragraph with **bold** and *italic* text.
 *
 * - List item 1
 * - List item 2`}
 *     </MarkdownRenderer>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With custom components
 * <MarkdownRenderer
 *   components={{
 *     h1: ({ children }) => <h1 className="text-4xl font-bold">{children}</h1>,
 *     a: ({ href, children }) => (
 *       <a href={href} className="text-blue-500 hover:underline">
 *         {children}
 *       </a>
 *     ),
 *   }}
 *   options={{ forceBlock: true }}
 * >
 *   {markdownContent}
 * </MarkdownRenderer>
 * ```
 *
 * @example
 * ```tsx
 * // With MarkdownProvider context
 * function App() {
 *   return (
 *     <MarkdownProvider
 *       components={{ h1: CustomHeading }}
 *       options={{ forceBlock: true }}
 *     >
 *       <MarkdownRenderer>
 *         {markdownContent}
 *       </MarkdownRenderer>
 *     </MarkdownProvider>
 *   );
 * }
 * ```
 */
export const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children = '',
  components,
  wrapper,
  options = {},
  renderMarkdown,
}) => {
  const context = useMarkdownContext();

  if (renderMarkdown) {
    return <>{renderMarkdown(children, { components, wrapper, options })}</>;
  }

  if (context) {
    return (
      <>{context.renderMarkdown(children, { components, wrapper, options })}</>
    );
  }

  const { forceBlock, preserveFrontmatter, tagfilter } = options;

  // Map public options to internal processor options
  const internalOptions: MarkdownRendererOptions = {
    components,
    forceBlock,
    wrapper,
    forceWrapper: !!wrapper,
    preserveFrontmatter,
    tagfilter,
  };

  return <>{compiler(children, internalOptions)}</>;
};
