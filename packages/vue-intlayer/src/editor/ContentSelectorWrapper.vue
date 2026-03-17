<script setup lang="ts">
import configuration from '@intlayer/config/built';
import type { NodeProps } from '@intlayer/core/interpreter';
import { defineAsyncComponent, type HTMLAttributes } from 'vue';

type Props = NodeProps & /* @vue-ignore */ Omit<HTMLAttributes, 'children'>;
const props = defineProps<Props>();

const DynamicContentSelector = defineAsyncComponent(
  () => import('./ContentSelectorWrapperInternal.vue')
);

const { editor } = configuration ?? {};
const isEnabled = editor?.enabled ?? false;

const isEditorEnabled = typeof window !== 'undefined' && isEnabled;
</script>

<template>
  <DynamicContentSelector v-if="isEditorEnabled" v-bind="props">
    <slot />
  </DynamicContentSelector>
  <slot v-else />
</template>
