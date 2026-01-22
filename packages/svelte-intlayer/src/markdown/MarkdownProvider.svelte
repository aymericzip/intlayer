<script lang="ts">
import { compileMarkdown } from './compiler';
import { setMarkdownContext } from './context';

export const components: any = undefined;
export const wrapper: any = undefined;
export const forceBlock: boolean | undefined = undefined;
export const forceInline: boolean | undefined = undefined;
export const preserveFrontmatter: boolean | undefined = undefined;
export const tagfilter: boolean | undefined = undefined;

let customRenderMarkdown:
  | ((markdown: string, overrides?: any) => string)
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

const internalRenderMarkdown = (markdown: string, overrides?: any) => {
  if (typeof customRenderMarkdown === 'function') {
    return customRenderMarkdown(markdown, overrides);
  }

  const isOptionsObject =
    overrides &&
    typeof overrides === 'object' &&
    ('components' in overrides ||
      'wrapper' in overrides ||
      'forceBlock' in overrides ||
      'forceInline' in overrides ||
      'preserveFrontmatter' in overrides ||
      'tagfilter' in overrides);

  const {
    components: overrideComponents,
    wrapper: localWrapper,
    forceBlock: localForceBlock,
    forceInline: localForceInline,
    preserveFrontmatter: localPreserveFrontmatter,
    tagfilter: localTagfilter,
    ...componentsFromRest
  } = isOptionsObject ? overrides : { components: overrides };

  const actualComponents = overrideComponents || componentsFromRest;

  const mergedOptions = {
    forceBlock: localForceBlock ?? baseOptions.forceBlock,
    forceInline: localForceInline ?? baseOptions.forceInline,
    preserveFrontmatter:
      localPreserveFrontmatter ?? baseOptions.preserveFrontmatter,
    tagfilter: localTagfilter ?? baseOptions.tagfilter,
    wrapper: localWrapper || baseOptions.wrapper,
    components: {
      ...baseOptions.components,
      ...actualComponents,
    },
  };

  return compileMarkdown(markdown, mergedOptions) as string;
};

setMarkdownContext({ renderMarkdown: internalRenderMarkdown });
</script>

<slot />
