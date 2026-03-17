<script lang="ts">
import type { NodeProps } from '@intlayer/core/interpreter';
import { isSameKeyPath } from '@intlayer/core/utils';
import { defineIntlayerElements, MessageKey } from '@intlayer/editor';
import { NodeType } from '@intlayer/types/nodeType';
import { onMount } from 'svelte';
import { getEditorStateManager } from './communicator';
import { useEditorEnabled } from './editorEnabled';
import { useFocusDictionary } from './focusDictionary';
import { useEditor } from './useEditor';

export let dictionaryKey: NodeProps['dictionaryKey'];
export let keyPath: NodeProps['keyPath'];

const manager = getEditorStateManager();
const { focusedContent, setFocusedContent } = useFocusDictionary();
const { enabled } = useEditorEnabled();

useEditor();

onMount(() => defineIntlayerElements());

$: filteredKeyPath = keyPath.filter((key) => key.type !== NodeType.Translation);

$: isSelected =
  $focusedContent?.dictionaryKey === dictionaryKey &&
  ($focusedContent?.keyPath?.length ?? 0) > 0 &&
  isSameKeyPath($focusedContent?.keyPath ?? [], filteredKeyPath);

const handlePress = () => {
  setFocusedContent({ dictionaryKey, keyPath: filteredKeyPath });
};

const handleHover = () => {
  manager.messenger.send(
    `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
    { dictionaryKey, keyPath: filteredKeyPath }
  );
};

const handleUnhover = () => {
  manager.messenger.send(
    `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
    null
  );
};
</script>

{#if $enabled}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <intlayer-content-selector
    is-selecting={isSelected || undefined}
    on:intlayer:press={handlePress}
    on:intlayer:hover={handleHover}
    on:intlayer:unhover={handleUnhover}
  >
    <slot />
  </intlayer-content-selector>
{:else}
  <slot />
{/if}
