<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePerformanceMeasure } from '../../../hooks/usePerformanceMeasure';

usePerformanceMeasure('WhatWeMeasure');

const { t } = useI18n();

const metrics = computed(() => [
  {
    metric: t('about.whatWeMeasure.bundleSizeImpact'),
    desc: t('about.whatWeMeasure.bundleSizeImpactDesc'),
  },
  {
    metric: t('about.whatWeMeasure.renderingOverhead'),
    desc: t('about.whatWeMeasure.renderingOverheadDesc'),
  },
  {
    metric: t('about.whatWeMeasure.hydrationCost'),
    desc: t('about.whatWeMeasure.hydrationCostDesc'),
  },
  {
    metric: t('about.whatWeMeasure.lazyLoading'),
    desc: t('about.whatWeMeasure.lazyLoadingDesc'),
  },
  {
    metric: t('about.whatWeMeasure.localeSwitch'),
    desc: t('about.whatWeMeasure.localeSwitchDesc'),
  },
]);
</script>

<template>
  <section class="mt-12 mx-auto max-w-3xl">
    <h2 class="mb-4 text-2xl font-bold text-foreground">
      {{ t("about.whatWeMeasure.title") }}
    </h2>
    <ul class="space-y-4">
      <li v-for="m in metrics" :key="m.metric" class="rounded-md border border-border p-4">
        <span class="block text-sm font-bold text-primary">
          {{ m.metric }}
        </span>
        <span class="block mt-1 text-sm text-muted-foreground">
          {{ m.desc }}
        </span>
      </li>
    </ul>
  </section>
</template>
