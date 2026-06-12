<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { isLocale } from '../i18n/config';

const { t } = useI18n();
const route = useRoute();

const homePath = computed(() => {
  const first = route.path.split('/').filter(Boolean)[0];
  const loc = first && isLocale(first) ? first : 'en';
  return `/${loc}`;
});
</script>

<template>
  <div class="flex min-h-[60vh] items-center justify-center bg-muted/30">
    <div class="text-center">
      <h1 class="mb-4 text-4xl font-bold">{{ t("notFound.title") }}</h1>
      <p class="mb-4 text-xl text-muted-foreground">{{ t("notFound.description") }}</p>
      <router-link
        :to="homePath"
        class="text-primary underline hover:text-primary/90"
      >
        {{ t("notFound.returnHome") }}
      </router-link>
    </div>
  </div>
</template>
