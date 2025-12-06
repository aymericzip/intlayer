<script setup lang="ts">
import type { NodeProps } from '@intlayer/core';
import type { HTMLAttributes } from 'vue';
import ContentSelectorWrapper from './ContentSelectorWrapper.vue';
import EditedContentRenderer from './EditedContentRenderer.vue';

/**
 * Combine your NodeProps (which include dictionaryKey & keyPath)
 * with any other div‐like attributes (omitting Vue's `children`).
 */
type Props = NodeProps & /* @vue-ignore */ Omit<HTMLAttributes, 'children'>;
const props = defineProps<Props>();
const { keyPath, children, dictionaryKey } = props;
</script>

<template>
  <ContentSelectorWrapper
    :dictionaryKey="dictionaryKey"
    :keyPath="keyPath"
    :children="children"
  >
    <EditedContentRenderer
      :dictionaryKey="dictionaryKey"
      :keyPath="keyPath"
      :children="children"
    >
      <slot />
    </EditedContentRenderer>
  </ContentSelectorWrapper>
</template>
