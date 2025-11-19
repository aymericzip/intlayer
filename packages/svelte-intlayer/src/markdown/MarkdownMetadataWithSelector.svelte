<script lang="ts">
import type { KeyPath } from '@intlayer/types';
import ContentSelectorWrapper from '../editor/ContentSelectorWrapper.svelte';
import MarkdownMetadataRenderer from './MarkdownMetadataRenderer.svelte';

export let dictionaryKey: string;
export let keyPath: KeyPath[];
export let value: string;
export let metadataKeyPath: KeyPath[];
</script>

<ContentSelectorWrapper {dictionaryKey} {keyPath}>
  <MarkdownMetadataRenderer
    {dictionaryKey}
    {keyPath}
    {value}
    {metadataKeyPath}
  />
</ContentSelectorWrapper>


