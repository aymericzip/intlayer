<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const ProductsHeader = defineAsyncComponent(
  () => import('../components/pages/products/ProductsHeader.vue')
);
const ProductsGrid = defineAsyncComponent(
  () => import('../components/pages/products/ProductsGrid.vue')
);
</script>

<template>
  <div class="container py-16">
    <Suspense>
      <ProductsHeader />
      <template #fallback>
        <div class="h-48 animate-pulse bg-muted/20" />
      </template>
    </Suspense>

    <Suspense>
      <ProductsGrid />
      <template #fallback>
        <div class="h-96 animate-pulse bg-muted/20" />
      </template>
    </Suspense>
  </div>
</template>
