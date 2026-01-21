<script lang="ts">
import type { KeyPath } from '@intlayer/types';
import ContentSelectorWrapper from '../editor/ContentSelectorWrapper.svelte';
import MarkdownRenderer from './MarkdownRenderer.svelte';

export let dictionaryKey: string;
export let keyPath: KeyPath[];
export let value: string;

$: overrides = { ...$$restProps };
</script>

<ContentSelectorWrapper {dictionaryKey} {keyPath}>
  <MarkdownRenderer {value} {overrides} />
</ContentSelectorWrapper>


