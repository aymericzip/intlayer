<script lang="ts">
import { getHTMLContext } from './context';
import type { HTMLComponents } from './types';

export let value: string;
export const components: HTMLComponents<'permissive', {}> | undefined =
  undefined;

const context = getHTMLContext();

$: htmlContent = context.renderHTML(value, {
  components,
});
</script>

{@html htmlContent}
