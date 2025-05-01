<template>
  <div class="locale-switcher">
    <select v-model="selectedLocale" @change="changeLocale">
      <option v-for="loc in availableLocales" :key="loc" :value="loc">
        {{ getLocaleName(loc) }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Locales, getLocaleName, getLocalizedUrl } from 'intlayer';
import { useLocale } from 'vue-intlayer';

// Get Vue Router
const router = useRouter();

// Get locale information and setLocale function
const { locale, availableLocales, setLocale } = useLocale({
  onLocaleChange: (newLocale) => {
    // Get current route and create a localized URL
    const currentPath = router.currentRoute.value.fullPath;
    const localizedPath = getLocalizedUrl(currentPath, newLocale);

    // Navigate to the localized route without reloading the page
    router.push(localizedPath);
  },
});

// Track the selected locale with a ref
const selectedLocale = ref(locale.value);

// Update the locale when the selection changes
const changeLocale = () => setLocale(selectedLocale.value);

// Keep the selectedLocale in sync with the global locale
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>
