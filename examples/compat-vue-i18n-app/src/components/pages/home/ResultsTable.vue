<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePerformanceMeasure } from '../../../hooks/usePerformanceMeasure';

usePerformanceMeasure('ResultsTable');

const { t } = useI18n();

const results = computed(() => [
  {
    lib: 'react-i18next',
    size: '42.3 kB',
    time: '0.12ms',
    lazy: t('home.resultsTable.yes'),
  },
  {
    lib: 'react-intl',
    size: '38.1 kB',
    time: '0.15ms',
    lazy: t('home.resultsTable.manual'),
  },
  {
    lib: 'lingui',
    size: '12.8 kB',
    time: '0.08ms',
    lazy: t('home.resultsTable.yes'),
  },
  {
    lib: 'typesafe-i18n',
    size: '5.2 kB',
    time: '0.05ms',
    lazy: t('home.resultsTable.builtIn'),
  },
]);
</script>

<template>
  <section>
    <h2 class="mb-6 text-2xl font-bold text-foreground">
      {{ t("home.resultsTable.title") }}
    </h2>
    <div class="overflow-x-auto rounded-lg border border-border">
      <table class="w-full text-sm">
        <thead class="bg-muted">
          <tr>
            <th class="px-4 py-3 text-left font-medium text-muted-foreground">
              {{ t("home.resultsTable.library") }}
            </th>
            <th class="px-4 py-3 text-left font-medium text-muted-foreground">
              {{ t("home.resultsTable.bundleSize") }}
            </th>
            <th class="px-4 py-3 text-left font-medium text-muted-foreground">
              {{ t("home.resultsTable.lookupTime") }}
            </th>
            <th class="px-4 py-3 text-left font-medium text-muted-foreground">
              {{ t("home.resultsTable.lazyLoading") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in results" :key="r.lib" class="border-t border-border">
            <td class="px-4 py-3 font-medium text-foreground">
              {{ r.lib }}
            </td>
            <td class="px-4 py-3 text-muted-foreground">{{ r.size }}</td>
            <td class="px-4 py-3 text-muted-foreground">{{ r.time }}</td>
            <td class="px-4 py-3 text-muted-foreground">{{ r.lazy }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
