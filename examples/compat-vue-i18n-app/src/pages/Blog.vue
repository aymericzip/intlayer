<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const BlogHeader = defineAsyncComponent(() => import("../components/pages/blog/BlogHeader.vue"));
const BlogList = defineAsyncComponent(() => import("../components/pages/blog/BlogList.vue"));
</script>

<template>
  <div class="container py-16">
    <Suspense>
      <BlogHeader />
      <template #fallback>
        <div class="h-48 animate-pulse bg-muted/20" />
      </template>
    </Suspense>

    <Suspense>
      <BlogList />
      <template #fallback>
        <div class="h-96 animate-pulse bg-muted/20" />
      </template>
    </Suspense>
  </div>
</template>
