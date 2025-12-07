<script setup lang="ts">
import { useIntlayer } from 'vue-intlayer';

// useHead is auto-imported in Nuxt, but you can import it explicitly if needed
// import { useHead } from '#imports';

const content = useIntlayer('about-page');

useHead({
  title: content.metaTitle.raw, // Use .raw for primitive string access
  meta: [
    {
      name: 'description',
      content: content.metaDescription.raw, // Use .raw for primitive string access
    },
  ],
});
</script>
  
<template>
  <h1><content.title /></h1>
</template>