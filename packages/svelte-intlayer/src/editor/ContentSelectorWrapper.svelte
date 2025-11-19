<script lang="ts">
import { isSameKeyPath, type NodeProps } from '@intlayer/core';
import { MessageKey } from '@intlayer/editor';
import { NodeType } from '@intlayer/types';
import { get } from 'svelte/store';
import ContentSelector from './ContentSelector.svelte';
import { useCommunicator } from './communicator';
import { useEditorEnabled } from './editorEnabled';
import { useFocusDictionary } from './focusDictionary';
import { useEditor } from './useEditor';

export let dictionaryKey: NodeProps['dictionaryKey'];
export let keyPath: NodeProps['keyPath'];

const { focusedContent, setFocusedContent } = useFocusDictionary();
const editorEnabled = useEditorEnabled();
const communicatorStore = useCommunicator();
const { enabled } = editorEnabled;

useEditor();

$: filteredKeyPath = keyPath.filter((key) => key.type !== NodeType.Translation);

$: isSelected =
  $focusedContent?.dictionaryKey === dictionaryKey &&
  ($focusedContent?.keyPath?.length ?? 0) > 0 &&
  isSameKeyPath($focusedContent?.keyPath ?? [], filteredKeyPath);

const handleSelect = () => {
  setFocusedContent({
    dictionaryKey,
    keyPath: filteredKeyPath,
  });
};

const handleHover = () => {
  const { postMessage, senderId } = get(communicatorStore);
  postMessage({
    type: `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
    data: {
      dictionaryKey,
      keyPath: filteredKeyPath,
    },
    senderId,
  });
};

const handleUnhover = () => {
  const { postMessage, senderId } = get(communicatorStore);
  postMessage({
    type: `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
    data: null,
    senderId,
  });
};
</script>

{#if $enabled}
  <ContentSelector
    onPress={handleSelect}
    isSelecting={isSelected}
    onHover={handleHover}
    onUnhover={handleUnhover}
  >
    <slot />
  </ContentSelector>
{:else}
  <slot />
{/if}
