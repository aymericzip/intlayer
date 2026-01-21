<script lang="ts">
import { getMarkdownContext } from './context';

export let value: string;
export const overrides: any = {};

const context = getMarkdownContext();

$: htmlContent = context.renderMarkdown(value, overrides);
</script>

{@html htmlContent}

