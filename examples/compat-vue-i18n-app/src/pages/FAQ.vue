<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const FAQHeader = defineAsyncComponent(() => import("../components/pages/faq/FAQHeader.vue"));
const FAQList = defineAsyncComponent(() => import("../components/pages/faq/FAQList.vue"));
</script>

<template>
  <div class="container py-16">
    <Suspense>
      <FAQHeader />
      <template #fallback>
        <div class="h-48 animate-pulse bg-muted/20" />
      </template>
    </Suspense>

    <Suspense>
      <FAQList />
      <template #fallback>
        <div class="h-96 animate-pulse bg-muted/20" />
      </template>
    </Suspense>
  </div>
</template>
