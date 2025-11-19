<script lang="ts">
  import type { KeyPath, LocalesValues } from '@intlayer/types';
  import { getMarkdownContext } from './context';

  export let dictionaryKey: string;
  export let keyPath: KeyPath[];
  export let locale: LocalesValues | undefined = undefined;
  export let value: string;

  const { renderMarkdown } = getMarkdownContext();

  $: htmlContent = renderMarkdown(value);
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html htmlContent}
