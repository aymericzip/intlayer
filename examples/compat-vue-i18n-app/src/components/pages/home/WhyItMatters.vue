<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { usePerformanceMeasure } from '../../../hooks/usePerformanceMeasure';

usePerformanceMeasure('WhyItMatters');

const { t } = useI18n();
</script>

<template>
  <section class="mb-16">
    <h2 class="mb-6 text-2xl font-bold text-foreground">
      {{ t("home.whyItMatters.title") }}
    </h2>
    <div class="grid gap-6 md:grid-cols-3">
      <div class="rounded-lg border border-border bg-card p-6">
        <h3 class="mb-2 text-lg font-semibold text-foreground">
          {{ t("home.whyItMatters.bundleSizeTitle") }}
        </h3>
        <p class="text-sm text-muted-foreground">
          {{ t("home.whyItMatters.bundleSizeDesc") }}
        </p>
      </div>
      <div class="rounded-lg border border-border bg-card p-6">
        <h3 class="mb-2 text-lg font-semibold text-foreground">
          {{ t("home.whyItMatters.renderingTitle") }}
        </h3>
        <p class="text-sm text-muted-foreground">
          {{ t("home.whyItMatters.renderingDesc") }}
        </p>
      </div>
      <div class="rounded-lg border border-border bg-card p-6">
        <h3 class="mb-2 text-lg font-semibold text-foreground">
          {{ t("home.whyItMatters.dynamicLoadingTitle") }}
        </h3>
        <p class="text-sm text-muted-foreground">
          {{ t("home.whyItMatters.dynamicLoadingDesc") }}
        </p>
      </div>
    </div>
  </section>
</template>
