<script lang="ts">
import type { HTMLComponents } from '../html/types';
import { compileMarkdown } from './compiler';
import { setMarkdownContext } from './context';

export const components: HTMLComponents<'permissive', {}> | undefined =
  undefined;
export const wrapper: string | import('svelte').ComponentType | undefined = undefined;
export const forceBlock: boolean | undefined = undefined;
export const forceInline: boolean | undefined = undefined;
export const preserveFrontmatter: boolean | undefined = undefined;
export const tagfilter: boolean | undefined = undefined;

let customRenderMarkdown:
  | ((
      markdown: string,
      options?: any,
      components?: HTMLComponents<'permissive', {}>,
      wrapper?: string | import('svelte').ComponentType
    ) => string | Promise<string>)
  | undefined;
export { customRenderMarkdown as renderMarkdown };

$: baseOptions = {
  components,
  wrapper,
  forceBlock,
  forceInline,
  preserveFrontmatter,
  tagfilter,
};

const internalRenderMarkdown = (
  markdown: string,
  options?: {
    forceBlock?: boolean;
    forceInline?: boolean;
    preserveFrontmatter?: boolean;
    tagfilter?: boolean;
  },
  componentsOverride?: HTMLComponents<'permissive', {}>,
  wrapperOverride?: string | import('svelte').ComponentType
) => {
  if (typeof customRenderMarkdown === 'function') {
    return customRenderMarkdown(
      markdown,
      options,
      componentsOverride,
      wrapperOverride
    );
  }

  const mergedOptions = {
    forceBlock: options?.forceBlock ?? baseOptions.forceBlock,
    forceInline: options?.forceInline ?? baseOptions.forceInline,
    preserveFrontmatter:
      options?.preserveFrontmatter ?? baseOptions.preserveFrontmatter,
    tagfilter: options?.tagfilter ?? baseOptions.tagfilter,
    wrapper: (wrapperOverride || baseOptions.wrapper) as string,
    forceWrapper: !!(wrapperOverride || baseOptions.wrapper),
    components: {
      ...baseOptions.components,
      ...(componentsOverride ?? {}),
    },
  };

  return compileMarkdown(markdown, mergedOptions) as string;
};

setMarkdownContext({
  components,
  renderMarkdown: internalRenderMarkdown,
});
</script>

<slot />
