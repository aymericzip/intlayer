<script setup>
import { useI18nHTMLAttributes } from '@composables/useI18nHTMLAttributes';

// Apply HTML language attributes based on current locale
useI18nHTMLAttributes();
</script>

<template>
  <RouterView />
</template>
