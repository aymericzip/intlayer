<script lang="ts">
import { compileMarkdown } from './compiler';
import { setMarkdownContext } from './context';

export const renderMarkdown: (markdown: string, overrides?: any) => string = (
  markdown,
  overrides
) => compileMarkdown(markdown, overrides) as string;

setMarkdownContext({ renderMarkdown });
</script>

<slot />
