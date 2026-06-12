<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const openings = [
  {
    titleKey: "frontendTitle",
    descKey: "frontendDesc",
    deptKey: "engineering",
    locationKey: "remote",
    typeKey: "fullTime",
  },
  {
    titleKey: "backendTitle",
    descKey: "backendDesc",
    deptKey: "engineering",
    locationKey: "remote",
    typeKey: "fullTime",
  },
  {
    titleKey: "writerTitle",
    descKey: "writerDesc",
    deptKey: "documentation",
    locationKey: "remote",
    typeKey: "partTime",
  },
  {
    titleKey: "devrelTitle",
    descKey: "devrelDesc",
    deptKey: "community",
    locationKey: "sfRemote",
    typeKey: "fullTime",
  },
  {
    titleKey: "qaTitle",
    descKey: "qaDesc",
    deptKey: "engineering",
    locationKey: "remote",
    typeKey: "fullTime",
  },
] as const;
</script>

<template>
  <h2 class="mb-6 text-2xl font-bold text-foreground">
    {{ t("careers.openPositions.title") }}
  </h2>
  <div class="space-y-4">
    <div
      v-for="(o, i) in openings"
      :key="`${o.titleKey}-${o.locationKey}-${i}`"
      class="flex flex-col gap-3 rounded-lg border border-border bg-card p-6 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <h3 class="text-base font-semibold text-foreground">
          {{ t(`careers.openPositions.${o.titleKey}`) }}
        </h3>
        <p class="text-sm text-muted-foreground">
          {{ t(`careers.openPositions.${o.descKey}`) }}
        </p>
        <div class="mt-2 flex gap-2">
          <span
            class="rounded bg-accent px-2 py-0.5 text-xs text-accent-foreground"
          >
            {{ t(`careers.openPositions.${o.deptKey}`) }}
          </span>
          <span
            class="rounded bg-accent px-2 py-0.5 text-xs text-accent-foreground"
          >
            {{ t(`careers.openPositions.${o.locationKey}`) }}
          </span>
          <span
            class="rounded bg-accent px-2 py-0.5 text-xs text-accent-foreground"
          >
            {{ t(`careers.openPositions.${o.typeKey}`) }}
          </span>
        </div>
      </div>
      <button
        type="button"
        class="shrink-0 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        {{ t("careers.openPositions.applyNow") }}
      </button>
    </div>
  </div>
</template>
