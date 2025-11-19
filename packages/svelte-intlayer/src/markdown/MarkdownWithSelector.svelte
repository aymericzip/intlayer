<script lang="ts">
import type { KeyPath } from '@intlayer/types';
import ContentSelectorWrapper from '../editor/ContentSelectorWrapper.svelte';
import MarkdownRenderer from './MarkdownRenderer.svelte';

export let dictionaryKey: string;
export let keyPath: KeyPath[];
export let value: string;
</script>

<ContentSelectorWrapper {dictionaryKey} {keyPath}>
  <MarkdownRenderer {dictionaryKey} {keyPath} {value} />
</ContentSelectorWrapper>


