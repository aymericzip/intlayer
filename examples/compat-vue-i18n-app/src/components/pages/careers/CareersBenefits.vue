<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const benefits = [
  {
    labelKey: "careers.benefits.remoteLabel",
    valueKey: "careers.benefits.remoteValue",
  },
  {
    labelKey: "careers.benefits.payLabel",
    valueKey: "careers.benefits.payValue",
  },
  {
    labelKey: "careers.benefits.ossLabel",
    valueKey: "careers.benefits.ossValue",
  },
];
</script>

<template>
  <div class="mb-12 grid gap-4 md:grid-cols-3">
    <div
      v-for="b in benefits"
      :key="b.labelKey"
      class="rounded-lg border border-border bg-card p-4 text-center"
    >
      <p class="text-sm font-semibold text-foreground">{{ t(b.labelKey) }}</p>
      <p class="text-xs text-muted-foreground">{{ t(b.valueKey) }}</p>
    </div>
  </div>
</template>
