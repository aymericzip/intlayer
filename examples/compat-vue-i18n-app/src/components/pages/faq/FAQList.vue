<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const faqIndices = [1, 2, 3, 4, 5, 6, 7, 8] as const;
const faqs = faqIndices.map((i) => ({
  q: t(`faq.list.q${i}`),
  a: t(`faq.list.a${i}`),
}));
</script>

<template>
  <div class="mx-auto max-w-3xl space-y-4">
    <details
      v-for="(f, idx) in faqs"
      :key="idx"
      class="group rounded-lg border border-border bg-card"
    >
      <summary class="cursor-pointer px-6 py-4 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors">
        {{ f.q }}
      </summary>
      <p class="px-6 pb-4 text-sm text-muted-foreground">{{ f.a }}</p>
    </details>
  </div>
</template>
