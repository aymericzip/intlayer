<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const ContactHeader = defineAsyncComponent(
  () => import("../components/pages/contact/ContactHeader.vue")
);
const ContactForm = defineAsyncComponent(
  () => import("../components/pages/contact/ContactForm.vue")
);
</script>

<template>
  <div class="container py-16">
    <div class="mx-auto max-w-2xl">
      <Suspense>
        <ContactHeader />
        <template #fallback>
          <div class="h-48 animate-pulse bg-muted/20" />
        </template>
      </Suspense>

      <Suspense>
        <ContactForm />
        <template #fallback>
          <div class="h-96 animate-pulse bg-muted/20" />
        </template>
      </Suspense>
    </div>
  </div>
</template>
