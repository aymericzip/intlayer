<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const CareersHeader = defineAsyncComponent(
  () => import('../components/pages/careers/CareersHeader.vue')
);
const CareersBenefits = defineAsyncComponent(
  () => import('../components/pages/careers/CareersBenefits.vue')
);
const OpenPositions = defineAsyncComponent(
  () => import('../components/pages/careers/OpenPositions.vue')
);
</script>

<template>
  <div class="container py-16">
    <Suspense>
      <CareersHeader />
      <template #fallback>
        <div class="h-48 animate-pulse bg-muted/20" />
      </template>
    </Suspense>

    <Suspense>
      <CareersBenefits />
      <template #fallback>
        <div class="h-32 animate-pulse bg-muted/20" />
      </template>
    </Suspense>

    <Suspense>
      <OpenPositions />
      <template #fallback>
        <div class="h-150 animate-pulse bg-muted/20" />
      </template>
    </Suspense>
  </div>
</template>
