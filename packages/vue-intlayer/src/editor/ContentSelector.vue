<script setup lang="ts">
import type { NodeProps } from '@intlayer/core/interpreter';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { HTMLAttributes } from 'vue';

type Props = NodeProps & /* @vue-ignore */ Omit<HTMLAttributes, 'children'>;
const props = defineProps<Props>();
</script>

<template>
  <intlayer-content-selector-wrapper
    v-if="isEnabled"
    :key-path="JSON.stringify(props.keyPath)"
    :dictionary-key="props.dictionaryKey"
  >
    <slot />
  </intlayer-content-selector-wrapper>
  <slot v-else />
</template>
