<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { usePerformanceMeasure } from '../../../hooks/usePerformanceMeasure';

usePerformanceMeasure('UnderstandingImpact');

const { t } = useI18n();
</script>

<template>
  <section class="mb-16 mx-auto max-w-3xl space-y-6">
    <h2 class="text-2xl font-bold text-foreground">
      {{ t("home.understandingImpact.title") }}
    </h2>

    <div class="rounded-lg border border-border bg-card p-6">
      <h3 class="mb-2 text-lg font-semibold text-foreground">
        {{ t("home.understandingImpact.singleJsonTitle") }}
      </h3>
      <p class="text-sm text-muted-foreground">
        {{ t("home.understandingImpact.singleJsonIntro") }}
      </p>
      <ul class="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
        <li>
          {{ t("home.understandingImpact.singleJsonBullet1") }}
        </li>
        <li>
          {{ t("home.understandingImpact.singleJsonBullet2") }}
        </li>
        <li>
          {{ t("home.understandingImpact.singleJsonBullet3") }}
        </li>
      </ul>
    </div>

    <div class="rounded-lg border border-border bg-card p-6">
      <h3 class="mb-2 text-lg font-semibold text-foreground">
        {{ t("home.understandingImpact.tradeOffsTitle") }}
      </h3>
      <p class="text-sm text-muted-foreground">
        {{ t("home.understandingImpact.tradeOffsIntro") }}
      </p>
      <ul class="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
        <li>
          <strong class="text-foreground">
            {{ t("home.understandingImpact.waterfallLabel") }}
          </strong>
          {{ t("home.understandingImpact.waterfallDesc") }}
        </li>
        <li>
          <strong class="text-foreground">
            {{ t("home.understandingImpact.foucLabel") }}
          </strong>
          {{ t("home.understandingImpact.foucDesc") }}
        </li>
        <li>
          <strong class="text-foreground">
            {{ t("home.understandingImpact.cacheLabel") }}
          </strong>
          {{ t("home.understandingImpact.cacheDesc") }}
        </li>
      </ul>
    </div>

    <div class="rounded-lg border border-border bg-card p-6">
      <h3 class="mb-2 text-lg font-semibold text-foreground">
        {{ t("home.understandingImpact.measuresTitle") }}
      </h3>
      <p class="text-sm text-muted-foreground">
        {{ t("home.understandingImpact.measuresDesc") }}
      </p>
    </div>
  </section>
</template>
