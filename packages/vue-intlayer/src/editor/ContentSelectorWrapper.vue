<script setup lang="ts">
import type { NodeProps } from '@intlayer/core/interpreter';
import { isSameKeyPath } from '@intlayer/core/utils';
import { defineIntlayerElements, MessageKey } from '@intlayer/editor';
import { NodeType } from '@intlayer/types/nodeType';
import { computed, type HTMLAttributes, inject, onMounted } from 'vue';
import { useEditorEnabled } from './editorEnabled';
import { useFocusDictionary } from './focusDictionary';
import {
  getEditorStateManager,
  INTLAYER_EDITOR_MANAGER_SYMBOL,
} from './installIntlayerEditor';

type Props = NodeProps & /* @vue-ignore */ Omit<HTMLAttributes, 'children'>;
const props = defineProps<Props>();

const manager =
  inject<ReturnType<typeof getEditorStateManager>>(
    INTLAYER_EDITOR_MANAGER_SYMBOL
  ) ?? getEditorStateManager();

const focusDictionary = useFocusDictionary();
const editorEnabled = useEditorEnabled();

onMounted(() => defineIntlayerElements());

const filteredKeyPath = computed(() =>
  props.keyPath.filter((key) => key.type !== NodeType.Translation)
);

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

const handlePress = () => {
  focusDictionary?.setFocusedContent({
    dictionaryKey: props.dictionaryKey,
    keyPath: filteredKeyPath.value,
  });
};

const handleHover = () => {
  manager?.messenger.send(
    `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
    { dictionaryKey: props.dictionaryKey, keyPath: filteredKeyPath.value }
  );
};

const handleUnhover = () => {
  manager?.messenger.send(
    `${MessageKey.INTLAYER_HOVERED_CONTENT_CHANGED}/post`,
    null
  );
};
</script>

<template>
  <intlayer-content-selector
    v-if="editorEnabled?.enabled.value"
    :is-selecting="isSelected || undefined"
    @intlayer:press="handlePress"
    @intlayer:hover="handleHover"
    @intlayer:unhover="handleUnhover"
  >
    <slot />
  </intlayer-content-selector>
  <slot v-else />
</template>
