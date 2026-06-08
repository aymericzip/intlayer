<script setup lang="ts">
import { useIntlayer } from 'vue-intlayer';

// useHead is auto-imported in Nuxt, but you can import it explicitly if needed
// import { useHead } from '#imports';

const content = useIntlayer('home-page');

useHead({
  title: content.metaTitle.raw,
  meta: [
    {
      name: 'description',
      content: content.metaDescription.raw,
    },
  ],
});
</script>

<template>
  <h1><content.title /></h1>
</template>
