<script lang="ts">
import type { KeyPath } from '@intlayer/types/keyPath';
import ContentSelector from '../editor/ContentSelector.svelte';
import { getEditedContentSource } from '../editor/editedContentSource';
import HTMLRenderer from './HTMLRenderer.svelte';

export let dictionaryKey: string;
export let keyPath: KeyPath[];
export let value: string;
export let components: any = {};

// Live preview of the source edited in the visual editor
$: editedSource = getEditedContentSource(dictionaryKey, keyPath);
</script>

<ContentSelector {dictionaryKey} {keyPath}>
  <HTMLRenderer value={$editedSource ?? value} {components} />
</ContentSelector>
