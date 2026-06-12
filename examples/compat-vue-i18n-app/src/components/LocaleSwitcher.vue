<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { getLocaleName, locales } from "../i18n/config";
import { computed } from "vue";

const route = useRoute();
const router = useRouter();

const currentLocale = computed(() => (route.params.locale as string) || "en");

const handleLocaleChange = (newLocale: string) => {
  const newPath = route.path.replace(/^\/[^/]+/, `/${newLocale}`);
  router.push({ path: newPath, query: route.query, hash: route.hash });
};
</script>

<template>
  <div class="flex items-center gap-2">
    <select
      :value="currentLocale"
      @change="(e) => handleLocaleChange((e.target as HTMLSelectElement).value)"
      class="h-8 rounded-md border border-border bg-card px-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
    >
      <option v-for="localeItem in locales" :key="localeItem" :value="localeItem">
        {{ getLocaleName(localeItem) }}
      </option>
    </select>
  </div>
</template>
