<script lang="ts">
import { getMarkdownContext } from './context';

export let value: string;
export const components: any = {};

const context = getMarkdownContext();

$: htmlContent = context.renderMarkdown(value, components);
</script>

{@html htmlContent}
