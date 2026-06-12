<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const TeamHeader = defineAsyncComponent(() => import("../components/pages/team/TeamHeader.vue"));
const TeamGrid = defineAsyncComponent(() => import("../components/pages/team/TeamGrid.vue"));
</script>

<template>
  <div class="container py-16">
    <Suspense>
      <TeamHeader />
      <template #fallback>
        <div class="h-48 animate-pulse bg-muted/20" />
      </template>
    </Suspense>

    <Suspense>
      <TeamGrid />
      <template #fallback>
        <div class="h-96 animate-pulse bg-muted/20" />
      </template>
    </Suspense>
  </div>
</template>
