<template>
  <component :is="tag" v-bind="$attrs">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  tag?: string;
}>();

const tag = computed(() => props.tag || 'div');
</script>
