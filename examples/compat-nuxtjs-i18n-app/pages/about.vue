<script setup lang="ts">
import { useI18n } from '#i18n';

const { t } = useI18n();

useHead({
  title: () => t('about.metaTitle'),
  meta: [{ name: 'description', content: () => t('about.metaDescription') }],
});
</script>

<template>
  <h1>{{ t('about.title') }}</h1>
  <p>{{ t('about.description') }}</p>
</template>
