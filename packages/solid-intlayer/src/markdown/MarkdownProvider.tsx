import {
  type Component,
  createContext,
  type ParentProps,
  useContext,
  type ValidComponent,
} from 'solid-js';
import type { HTMLComponents } from '../html/types';
import { getContextProvider } from '../solidCompat';
import type { SolidElement } from '../solidTypes';
import { compileMarkdown, type ParsedMarkdown } from './compiler';

export type MarkdownProviderOptions = {
  /** Forces the compiler to always output content with a block-level wrapper. */
  forceBlock?: boolean;
  /** Whether to preserve frontmatter in the markdown content. */
  preserveFrontmatter?: boolean;
  /** Whether to use the GitHub Tag Filter. */
  tagfilter?: boolean;
};

type RenderMarkdownOptions = MarkdownProviderOptions & {
  components?: HTMLComponents<'permissive', {}>;
  wrapper?: ValidComponent;
};

type MarkdownProviderValue = {
  components?: HTMLComponents<'permissive', {}>;
  renderMarkdown: (
    content: string | ParsedMarkdown,
    options?: MarkdownProviderOptions,
    components?: HTMLComponents<'permissive', {}>,
    wrapper?: ValidComponent
  ) => SolidElement | Promise<SolidElement>;
};

/**
 * `null` outside a provider. An explicit default keeps `useContext` from
 * throwing on Solid 2, where default-less contexts require a provider.
 */
export const MarkdownContext = createContext<MarkdownProviderValue | null>(
  null
);

const MarkdownContextProvider = getContextProvider(MarkdownContext);

export type MarkdownProviderProps = ParentProps<{
  components?: HTMLComponents<'permissive', {}>;
  wrapper?: ValidComponent;
  forceBlock?: boolean;
  preserveFrontmatter?: boolean;
  tagfilter?: boolean;
  renderMarkdown?: (
    content: string | ParsedMarkdown,
    options?: MarkdownProviderOptions,
    components?: HTMLComponents<'permissive', {}>,
    wrapper?: ValidComponent
  ) => SolidElement | Promise<SolidElement>;
}>;

export const MarkdownProvider: Component<MarkdownProviderProps> = (props) => {
  const defaultRenderMarkdown = (
    content: string | ParsedMarkdown,
    options?: MarkdownProviderOptions,
    componentsOverride?: HTMLComponents<'permissive', {}>,
    wrapperOverride?: ValidComponent
  ): Promise<SolidElement> => {
    if (props.renderMarkdown) {
      return props.renderMarkdown(
        content,
        options,
        componentsOverride,
        wrapperOverride
      ) as Promise<SolidElement>;
    }

    const mergedOptions: RenderMarkdownOptions = {
      forceBlock: options?.forceBlock ?? props.forceBlock,
      preserveFrontmatter:
        options?.preserveFrontmatter ?? props.preserveFrontmatter,
      tagfilter: options?.tagfilter ?? props.tagfilter,
      wrapper: wrapperOverride || props.wrapper,
      components: {
        ...props.components,
        ...(componentsOverride ?? {}),
      },
    };

    return compileMarkdown(content, mergedOptions as any);
  };

  return (
    <MarkdownContextProvider
      value={{
        components: props.components,
        renderMarkdown: defaultRenderMarkdown,
      }}
    >
      {props.children}
    </MarkdownContextProvider>
  );
};

export const useMarkdown = () => {
  const context = useContext(MarkdownContext);

  if (!context) {
    throw new Error(
      'useMarkdown must be used within a MarkdownProvider. To fix this error, wrap your component with <MarkdownProvider>.'
    );
  }

  return context;
};
