<script setup lang="ts">
import { isSameKeyPath, type NodeProps } from '@intlayer/core';
import { MessageKey } from '@intlayer/editor';
import { NodeType } from '@intlayer/types';
import { computed, type HTMLAttributes } from 'vue';
import ContentSelector from '../UI/ContentSelector.vue';
import { useCommunicator } from './communicator';
import { useEditorEnabled } from './editorEnabled';
import { useFocusDictionary } from './focusDictionary';
import { useEditor } from './useEditor';

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

const filteredKeyPath = computed(() =>
  props.keyPath.filter((key) => key.type !== NodeType.Translation)
);

// compute whether this node is the current focus
const isSelected = computed(
  () =>
    focusDictionary?.focusedContent.value?.dictionaryKey ===
      props.dictionaryKey &&
    (focusDictionary?.focusedContent.value.keyPath?.length ?? 0) > 0 &&
    isSameKeyPath(
      focusDictionary?.focusedContent.value.keyPath ?? [],
      filteredKeyPath.value
    )
);

// when the selector is clicked, update focus
const handleSelect = () => {
  focusDictionary?.setFocusedContent({
    dictionaryKey: props.dictionaryKey,
    keyPath: filteredKeyPath.value,
  });
};

const handleHover = () => {
  communicator?.postMessage({
    type: `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
    data: {
      dictionaryKey: props.dictionaryKey,
      keyPath: filteredKeyPath.value,
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
