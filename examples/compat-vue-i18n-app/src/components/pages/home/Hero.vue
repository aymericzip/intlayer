<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { usePerformanceMeasure } from "../../../hooks/usePerformanceMeasure";

usePerformanceMeasure("Hero");

const { t } = useI18n();
</script>

<template>
  <section class="mb-16 text-center">
    <h1 class="mb-4 text-4xl font-bold tracking-tight text-foreground">
      {{ t("home.hero.title") }}
    </h1>
    <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
      {{ t("home.hero.description") }}
    </p>
    <div class="mt-8 flex justify-center gap-4">
      <button
        type="button"
        class="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
      >
        {{ t("home.hero.viewResults") }}
      </button>
      <button
        type="button"
        class="rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
      >
        {{ t("home.hero.methodology") }}
      </button>
    </div>
  </section>
</template>
