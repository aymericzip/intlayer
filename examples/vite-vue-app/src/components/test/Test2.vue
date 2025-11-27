<script setup lang="ts">
defineProps<{
  title: string;
  color?: string;
}>();
</script>

<template>
  <div>
    <h1 :style="{ color: color }">{{ title }}</h1>
    <h1>Hello World 2 (should be extracted)</h1>
    <p>This is a test 2 (should be extracted)</p>
  </div>
</template>

