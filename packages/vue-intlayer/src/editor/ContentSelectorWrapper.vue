<template>
  <ContentSelector
    v-if="editorEnabled?.enabled.value"
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
const focusDictionary = useFocusDictionary();
const editorEnabled = useEditorEnabled();

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
</script>
