<script lang="ts">
import type { HTMLComponents } from '../html/types';
import { getMarkdownContext } from './context';

export let value: string;
export const components: HTMLComponents<'permissive', {}> | undefined =
  undefined;
export const wrapper: any = undefined;
export const forceBlock: boolean | undefined = undefined;
export const forceInline: boolean | undefined = undefined;
export const preserveFrontmatter: boolean | undefined = undefined;
export const tagfilter: boolean | undefined = undefined;

const context = getMarkdownContext();

$: htmlContent = context.renderMarkdown(value, {
  components,
  wrapper,
  forceBlock,
  forceInline,
  preserveFrontmatter,
  tagfilter,
});
</script>

{@html htmlContent}
