<script lang="ts">
import { getMarkdownContext } from './context';

export let value: string;

const { renderMarkdown } = getMarkdownContext();

$: htmlContent = renderMarkdown(value);
</script>

{@html htmlContent}
