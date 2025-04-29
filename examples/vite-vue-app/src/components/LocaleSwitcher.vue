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
import { Locales, getLocaleName } from 'intlayer';
import { useLocale } from 'vue-intlayer';

// Get locale information and setLocale function
const { locale, availableLocales, setLocale } = useLocale();

// Track the selected locale with a ref
const selectedLocale = ref(locale.value);

// Update the locale when the selection changes
const changeLocale = () => {
  setLocale(selectedLocale.value);
};

// Keep the selectedLocale in sync with the global locale
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);
</script>

<style scoped>
.locale-switcher {
  margin: 1rem 0;
}
select {
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 1rem;
}
</style>
