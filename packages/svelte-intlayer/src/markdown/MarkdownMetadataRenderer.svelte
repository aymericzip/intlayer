<script lang="ts">
  import type { KeyPath, LocalesValues, ContentNode } from '@intlayer/types';
  import { getMarkdownMetadata, getContentNodeByKeyPath } from '@intlayer/core';
  import { useLocale } from '../client/useLocale';

  export let dictionaryKey: string;
  export let keyPath: KeyPath[];
  export let locale: LocalesValues | undefined = undefined;
  export let value: string;
  export let metadataKeyPath: KeyPath[];

  const { locale: contextLocale } = useLocale();

  $: metadata = getMarkdownMetadata(value);
  $: currentLocale = locale ?? $contextLocale;
  $: metadataEl = getContentNodeByKeyPath(
    metadata as ContentNode,
    metadataKeyPath,
    currentLocale
  );
</script>

{metadataEl}
