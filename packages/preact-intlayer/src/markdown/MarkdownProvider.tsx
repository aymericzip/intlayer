import {
  type ComponentChildren,
  createContext,
  type FunctionComponent,
} from 'preact';
import { useContext } from 'preact/hooks';
import type { HTMLComponents } from '../html/types';
import { compileMarkdown } from './compiler';

type PropsWithChildren<P = {}> = P & { children?: ComponentChildren };

/**
 * Refined options for the MarkdownProvider.
 */
export type MarkdownProviderOptions = {
  /**
   * Forces the compiler to always output content with a block-level wrapper.
   */
  forceBlock?: boolean;
  /**
   * Forces the compiler to always output content with an inline wrapper.
   */
  forceInline?: boolean;
  /**
   * Whether to preserve frontmatter in the markdown content.
   */
  preserveFrontmatter?: boolean;
  /**
   * Whether to use the GitHub Tag Filter.
   */
  tagfilter?: boolean;
};

type RenderMarkdownOptions = MarkdownProviderOptions & {
  components?: HTMLComponents<'permissive', {}>;
  wrapper?: any;
};

type MarkdownContextValue = {
  renderMarkdown: (
    markdown: string,
    overrides?: HTMLComponents<'permissive', {}> | RenderMarkdownOptions
  ) => ComponentChildren;
};

type MarkdownProviderProps = PropsWithChildren<
  MarkdownProviderOptions & {
    /**
     * Component overrides for HTML tags.
     */
    components?: HTMLComponents<'permissive', {}>;
    /**
     * Wrapper element or component to be used when there are multiple children.
     */
    wrapper?: any;
    /**
     * Custom render function for markdown.
     * If provided, it will overwrite all rules and default rendering.
     */
    renderMarkdown?: (
      markdown: string,
      overrides?: HTMLComponents<'permissive', {}> | RenderMarkdownOptions
    ) => ComponentChildren;
  }
>;

const MarkdownContext = createContext<MarkdownContextValue | undefined>(
  undefined
);

export const useMarkdownContext = () => useContext(MarkdownContext);

export const MarkdownProvider: FunctionComponent<MarkdownProviderProps> = ({
  children,
  components,
  wrapper,
  forceBlock,
  forceInline,
  preserveFrontmatter,
  tagfilter,
  renderMarkdown,
}) => {
  // Map public options to internal processor options
  const internalOptions: any = {
    components,
    forceBlock,
    forceInline,
    wrapper,
    forceWrapper: !!wrapper,
    preserveFrontmatter,
    tagfilter,
  };

  const finalRenderMarkdown = renderMarkdown
    ? (
        markdown: string,
        componentsOverride?:
          | HTMLComponents<'permissive', {}>
          | RenderMarkdownOptions
      ) => (
        <MarkdownContext.Provider value={undefined}>
          {renderMarkdown(markdown, componentsOverride)}
        </MarkdownContext.Provider>
      )
    : (
        markdown: string,
        componentsOverride?:
          | HTMLComponents<'permissive', {}>
          | RenderMarkdownOptions
      ) => {
        const {
          components: overrideComponents,
          wrapper: localWrapper,
          forceBlock: localForceBlock,
          forceInline: localForceInline,
          preserveFrontmatter: localPreserveFrontmatter,
          tagfilter: localTagfilter,
          ...componentsFromRest
        } = componentsOverride as RenderMarkdownOptions;

        const localComponents = (overrideComponents ||
          componentsFromRest) as HTMLComponents<'permissive', {}>;

        return compileMarkdown(markdown, {
          ...internalOptions,
          forceBlock: localForceBlock ?? internalOptions.forceBlock,
          forceInline: localForceInline ?? internalOptions.forceInline,
          preserveFrontmatter:
            localPreserveFrontmatter ?? internalOptions.preserveFrontmatter,
          tagfilter: localTagfilter ?? internalOptions.tagfilter,
          wrapper: localWrapper || wrapper || internalOptions.wrapper,
          forceWrapper: !!(localWrapper || wrapper),
          components: {
            ...internalOptions.components,
            ...localComponents,
          },
        }) as ComponentChildren;
      };

  return (
    <MarkdownContext.Provider value={{ renderMarkdown: finalRenderMarkdown }}>
      {children}
    </MarkdownContext.Provider>
  );
};
