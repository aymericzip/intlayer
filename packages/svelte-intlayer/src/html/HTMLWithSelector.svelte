<script lang="ts">
import type { KeyPath } from '@intlayer/types/keyPath';
import ContentSelector from '../editor/ContentSelector.svelte';
import HTMLRenderer from './HTMLRenderer.svelte';

export let dictionaryKey: string;
export let keyPath: KeyPath[];
export let value: string;
export let components: any = {};
</script>

<ContentSelector {dictionaryKey} {keyPath}>
  <HTMLRenderer {value} {components} />
</ContentSelector>
