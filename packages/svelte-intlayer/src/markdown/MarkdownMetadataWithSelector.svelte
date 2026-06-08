<script lang="ts">
import type { KeyPath } from '@intlayer/types/keyPath';
import ContentSelector from '../editor/ContentSelector.svelte';
import MarkdownMetadataRenderer from './MarkdownMetadataRenderer.svelte';

export let dictionaryKey: string;
export let keyPath: KeyPath[];
export let value: string;
export let metadataKeyPath: KeyPath[];
</script>

<ContentSelector {dictionaryKey} {keyPath}>
  <MarkdownMetadataRenderer
    {dictionaryKey}
    {keyPath}
    {value}
    {metadataKeyPath}
  />
</ContentSelector>


