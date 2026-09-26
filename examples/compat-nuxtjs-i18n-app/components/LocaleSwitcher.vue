<script setup lang="ts">
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <nav class="locale-switcher">
    <NuxtLink
      v-for="localeObject in locales"
      :key="localeObject.code"
      :to="switchLocalePath(localeObject.code)"
      class="locale-link"
      :class="{ 'active-locale': localeObject.code === locale }"
    >
      {{ localeObject.name }}
    </NuxtLink>
  </nav>
</template>

<style scoped>
.locale-switcher {
  display: flex;
  gap: 1rem;
}

.locale-link {
  text-decoration: none;
  color: inherit;
}

.active-locale {
  font-weight: bold;
  text-decoration: underline;
}
</style>
