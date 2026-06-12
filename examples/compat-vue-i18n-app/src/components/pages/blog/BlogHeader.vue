<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import MockBanner from '../../MockBanner.vue';

const { t } = useI18n();
</script>

<template>
  <MockBanner />
  <h1 class="mb-2 text-3xl font-bold text-foreground">
    {{ t("blog.header.title") }}
  </h1>
  <p class="mb-10 text-muted-foreground">{{ t("blog.header.description") }}</p>
</template>
