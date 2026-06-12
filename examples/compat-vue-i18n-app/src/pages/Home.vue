<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const Hero = defineAsyncComponent(
  () => import('../components/pages/home/Hero.vue')
);
const WhyItMatters = defineAsyncComponent(
  () => import('../components/pages/home/WhyItMatters.vue')
);
const UnderstandingImpact = defineAsyncComponent(
  () => import('../components/pages/home/UnderstandingImpact.vue')
);
const ResultsTable = defineAsyncComponent(
  () => import('../components/pages/home/ResultsTable.vue')
);
</script>

<template>
  <div class="container py-16">
    <Suspense>
      <Hero />
      <template #fallback>
        <div class="h-96 animate-pulse bg-muted/20" />
      </template>
    </Suspense>

    <Suspense>
      <WhyItMatters />
      <template #fallback>
        <div class="h-64 animate-pulse bg-muted/20" />
      </template>
    </Suspense>

    <Suspense>
      <UnderstandingImpact />
      <template #fallback>
        <div class="h-96 animate-pulse bg-muted/20" />
      </template>
    </Suspense>

    <Suspense>
      <ResultsTable />
      <template #fallback>
        <div class="h-64 animate-pulse bg-muted/20" />
      </template>
    </Suspense>
  </div>
</template>
