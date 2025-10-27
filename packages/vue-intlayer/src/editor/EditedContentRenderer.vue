<template>
  <!-- Just render the text/HTML -->
  <renderedContent />
</template>

<script setup lang="ts">
import { getContent } from '@intlayer/core';
import type { ContentNode, KeyPath, Locale } from '@intlayer/types';
import { computed, useSlots } from 'vue';
import { useEditedContentRenderer } from './useEditedContentRenderer';

type Props = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  locale?: Locale;
};

const props = defineProps<Props>();
const slots = useSlots();

/**
 * <slot> replaces React "children".
 * If no slot content is provided, fall back to an empty string.
 */
const fallback = computed(() => {
  const vnodes = slots.default?.() ?? [];
  return vnodes
    .map((v) => (typeof v.children === 'string' ? v.children : ''))
    .join('');
});

const rawContent = useEditedContentRenderer(
  props.dictionaryKey,
  props.keyPath,
  fallback
);

/**
 * Object → getContent → string, same as the React version.
 */
const renderedContent = computed(() => {
  if (typeof rawContent.value === 'object' && rawContent.value !== null) {
    const transformed = getContent(
      rawContent.value as ContentNode,
      props,
      props.locale
    );

    if (typeof transformed !== 'string') {
      console.error(
        `Incorrect edited content format. Content type: ${typeof transformed}. Expected string. Value ${JSON.stringify(
          transformed
        )}`
      );
      return fallback.value;
    }
    return transformed;
  }

  return rawContent.value as string;
});
</script>
