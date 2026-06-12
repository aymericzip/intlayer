<script lang="ts">
import type { KeyPath } from '@intlayer/types/keyPath';
import ContentSelector from '../editor/ContentSelector.svelte';
import type { ParsedMarkdown } from './compiler';
import MarkdownRenderer from './MarkdownRenderer.svelte';

export let dictionaryKey: string;
export let keyPath: KeyPath[];
export let value: string | ParsedMarkdown;

$: overrides = { ...$$restProps };
</script>

<ContentSelector {dictionaryKey} {keyPath}>
  <MarkdownRenderer {value} {overrides} />
</ContentSelector>


