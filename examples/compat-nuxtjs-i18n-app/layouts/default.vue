<script setup lang="ts">
import LocaleSwitcher from '~/components/LocaleSwitcher.vue';

const head = useLocaleHead({ seo: true });

useHead(() => ({
  htmlAttrs: head.value.htmlAttrs,
  link: head.value.link,
  meta: head.value.meta,
}));
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <nav class="links">
      <NuxtLinkLocale to="/">{{ $t('common.home') }}</NuxtLinkLocale>
      <NuxtLinkLocale to="/about">{{ $t('common.about') }}</NuxtLinkLocale>
    </nav>
  </div>
</template>

<style scoped>
.links {
  display: flex;
  gap: 1rem;
}
</style>
