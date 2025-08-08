<template>
  <ContentSelector
    v-if="editorEnabled?.enabled.value"
    @press="handleSelect"
    :isSelecting="isSelected"
    @hover="handleHover"
    @unhover="handleUnhover"
  >
    <slot />
  </ContentSelector>
  <slot v-else />
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { isSameKeyPath, type NodeProps } from '@intlayer/core';
import ContentSelector from '../UI/ContentSelector.vue';
import { useEditorEnabled } from './editorEnabled';
import { useFocusDictionary } from './focusDictionary';
import { useEditor } from './useEditor';
import { MessageKey } from '@intlayer/editor';
import { useCommunicator } from './communicator';

/**
 * Combine your NodeProps (which include dictionaryKey & keyPath)
 * with any other div‐like attributes (omitting Vue's `children`).
 */
type Props = NodeProps & /* @vue-ignore */ Omit<HTMLAttributes, 'children'>;
const props = defineProps<Props>();

// pull in the editor state & focus API
const focusDictionary = useFocusDictionary();
const editorEnabled = useEditorEnabled();
const communicator = useCommunicator();

useEditor();

// compute whether this node is the current focus
const isSelected = computed(
  () =>
    focusDictionary?.focusedContent.value?.dictionaryKey ===
      props.dictionaryKey &&
    (focusDictionary?.focusedContent.value.keyPath?.length ?? 0) > 0 &&
    isSameKeyPath(
      focusDictionary?.focusedContent.value.keyPath ?? [],
      props.keyPath
    )
);

// when the selector is clicked, update focus
const handleSelect = () => {
  focusDictionary?.setFocusedContent({
    dictionaryKey: props.dictionaryKey,
    keyPath: props.keyPath,
  });
};

const handleHover = () => {
  communicator?.postMessage({
    type: `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
    data: {
      dictionaryKey: props.dictionaryKey,
      keyPath: props.keyPath,
    },
  });
};

const handleUnhover = () => {
  communicator?.postMessage({
    type: `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
    data: null,
  });
};
</script>
