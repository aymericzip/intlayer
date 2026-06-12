<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { usePerformanceMeasure } from "../../../hooks/usePerformanceMeasure";

usePerformanceMeasure("AboutHeader");

const { t } = useI18n();
</script>

<template>
  <h1 class="mb-4 text-3xl font-bold text-foreground">
    {{ t("about.header.title") }}
  </h1>
  <p class="mb-8 max-w-3xl text-muted-foreground">
    {{ t("about.header.description") }}
  </p>
</template>
