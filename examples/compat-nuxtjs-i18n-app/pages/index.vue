<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

const count = ref(0);

useHead({
  title: () => t('home.metaTitle'),
  meta: [{ name: 'description', content: () => t('home.metaDescription') }],
});
</script>

<template>
  <h1>{{ t('home.title') }}</h1>
  <p>{{ t('home.greeting', { name: 'Ada' }) }}</p>
  <button type="button" @click="count++">
    {{ t('home.countIs', { count }, count) }}
  </button>
  <p>
    <NuxtLink :to="localePath('/about')">{{ t('home.learnMore') }}</NuxtLink>
  </p>
</template>
