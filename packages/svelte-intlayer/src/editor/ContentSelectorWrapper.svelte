<script lang="ts">
import type { NodeProps } from '@intlayer/core/interpreter';
import { isSameKeyPath } from '@intlayer/core/utils';
import { NodeType } from '@intlayer/types/nodeType';
import { MessageKey } from '@intlayer/types/messageKey';
import { onMount } from 'svelte';
import { getEditorStateManager } from './communicator';
import { useFocusDictionary } from './focusDictionary';
import { useEditor } from './useEditor';

export let dictionaryKey: NodeProps['dictionaryKey'];
export let keyPath: NodeProps['keyPath'];

const { focusedContent, setFocusedContent } = useFocusDictionary();

useEditor();

let isInIframe = false;
onMount(() => {
  isInIframe = window.self !== window.top;
  if (isInIframe) {
    
    import('@intlayer/editor').then(({ defineIntlayerElements }) => {
      defineIntlayerElements();
    });
  }
});

$: filteredKeyPath = keyPath.filter((key) => key.type !== NodeType.Translation);

$: isSelected =
  $focusedContent?.dictionaryKey === dictionaryKey &&
  ($focusedContent?.keyPath?.length ?? 0) > 0 &&
  isSameKeyPath($focusedContent?.keyPath ?? [], filteredKeyPath);

const handlePress = () => {
  setFocusedContent({ dictionaryKey, keyPath: filteredKeyPath });
};

const handleHover = () => {
  getEditorStateManager()?.messenger.send(
    `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
    { dictionaryKey, keyPath: filteredKeyPath }
  );
};

const handleUnhover = () => {
  getEditorStateManager()?.messenger.send(
    `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
    null
  );
};
</script>

{#if isInIframe}
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
