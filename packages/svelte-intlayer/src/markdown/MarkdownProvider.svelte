<script lang="ts">
import { setMarkdownContext } from './context';

export const renderMarkdown: (markdown: string, overrides?: any) => string = (
  markdown
) => markdown;

setMarkdownContext({ renderMarkdown });
</script>

<slot />
