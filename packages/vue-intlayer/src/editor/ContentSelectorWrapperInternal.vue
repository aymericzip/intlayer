<script setup lang="ts">
import type { NodeProps } from '@intlayer/core/interpreter';
import { isSameKeyPath } from '@intlayer/core/utils';
import { MessageKey } from '@intlayer/types/messageKey';
import { NodeType } from '@intlayer/types/nodeType';
import { computed, type HTMLAttributes, inject, onMounted, ref } from 'vue';
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
const isInIframe = ref(false);
onMounted(() => {
  isInIframe.value = window.self !== window.top;
});

onMounted(() => {
  import('@intlayer/editor').then(({ defineIntlayerElements }) => {
    defineIntlayerElements();
  });
});

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
    v-if="isInIframe"
    :is-selecting="isSelected || undefined"
    @intlayer:press="handlePress"
    @intlayer:hover="handleHover"
    @intlayer:unhover="handleUnhover"
  >
    <slot />
  </intlayer-content-selector>
  <slot v-else />
</template>
