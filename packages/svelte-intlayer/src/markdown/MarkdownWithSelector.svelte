<script lang="ts">
import type { KeyPath } from '@intlayer/types/keyPath';
import ContentSelector from '../editor/ContentSelector.svelte';
import { getEditedContentSource } from '../editor/editedContentSource';
import type { ParsedMarkdown } from './compiler';
import MarkdownRenderer from './MarkdownRenderer.svelte';

export let dictionaryKey: string;
export let keyPath: KeyPath[];
export let value: string | ParsedMarkdown;

$: overrides = { ...$$restProps };
// Live preview of the source edited in the visual editor
$: editedSource = getEditedContentSource(dictionaryKey, keyPath);
</script>

<ContentSelector {dictionaryKey} {keyPath}>
  <MarkdownRenderer value={$editedSource ?? value} {overrides} />
</ContentSelector>
