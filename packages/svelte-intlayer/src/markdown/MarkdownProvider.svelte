<script lang="ts">
  import { setMarkdownContext } from './context';

  export let renderMarkdown: (markdown: string) => string = (markdown) => markdown;

  setMarkdownContext({ renderMarkdown });
</script>

<slot />
