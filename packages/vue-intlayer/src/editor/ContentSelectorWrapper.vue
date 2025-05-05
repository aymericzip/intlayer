<template>
  <ContentSelector
    v-if="enabled"
    @press="handleSelect"
    :isSelecting="isSelected"
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

/**
 * Combine your NodeProps (which include dictionaryKey & keyPath)
 * with any other div‐like attributes (omitting Vue's `children`).
 */
type Props = NodeProps & /* @vue-ignore */ Omit<HTMLAttributes, 'children'>;
const props = defineProps<Props>();

// pull in the editor state & focus API
const { focusedContent, setFocusedContent } = useFocusDictionary();
const { enabled } = useEditorEnabled();
useEditor();

// compute whether this node is the current focus
const isSelected = computed(
  () =>
    focusedContent.value?.dictionaryKey === props.dictionaryKey &&
    (focusedContent.value.keyPath?.length ?? 0) > 0 &&
    isSameKeyPath(focusedContent.value.keyPath ?? [], props.keyPath)
);

// when the selector is clicked, update focus
const handleSelect = () => {
  setFocusedContent({
    dictionaryKey: props.dictionaryKey,
    keyPath: props.keyPath,
  });
};
</script>
