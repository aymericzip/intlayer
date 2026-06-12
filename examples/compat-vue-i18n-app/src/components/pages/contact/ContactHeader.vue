<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import MockBanner from '../../MockBanner.vue';

const { t } = useI18n();
</script>

<template>
  <MockBanner />
  <h1 class="mb-2 text-3xl font-bold text-foreground">
    {{ t("contact.header.title") }}
  </h1>
  <p class="mb-8 text-muted-foreground">
    {{ t("contact.header.description") }}
    <a href="mailto:contact@intlayer.org" class="text-primary hover:underline">
      {{ t("shared.contactEmail") }}
    </a>.
  </p>
</template>
