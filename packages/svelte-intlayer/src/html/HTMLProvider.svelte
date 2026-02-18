<script lang="ts">
import { getHTML } from '@intlayer/core/interpreter';
import { setHTMLContext } from './context';
import type { HTMLComponents } from './types';

export const components: HTMLComponents<'permissive', {}> = {};

let customRenderHTML: ((html: string, overrides?: any) => string) | undefined;
export { customRenderHTML as renderHTML };

const internalRenderHTML = (html: string, overrides?: any) => {
  if (typeof customRenderHTML === 'function') {
    return customRenderHTML(html, overrides);
  }

  const isOptionsObject =
    overrides && typeof overrides === 'object' && 'components' in overrides;

  const { components: overrideComponents, ...componentsFromRest } =
    isOptionsObject ? overrides : { components: overrides };

  const actualComponents = overrideComponents || componentsFromRest;

  const mergedComponents = {
    ...components,
    ...actualComponents,
  };

  return getHTML(html, mergedComponents as any) as string;
};

setHTMLContext({ renderHTML: internalRenderHTML });
</script>

<slot />
