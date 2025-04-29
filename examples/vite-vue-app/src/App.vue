<script setup>
import { useIntlayer } from 'vue-intlayer';
import HelloWorld from './components/HelloWorld.vue';
import LocaleSwitcher from './components/LocaleSwitcher.vue';
import { useI18nHTMLAttributes } from './composables/useI18nHTMLAttributes';
import { useLocale } from 'vue-intlayer';
import { ref, watch } from 'vue';

const { locale, availableLocales, setLocale } = useLocale();

// Use the useIntlayer composable to access translations
const content = useIntlayer('app');

// Apply HTML language attributes based on current locale
useI18nHTMLAttributes();
</script>

<template>
  <div>
    <LocaleSwitcher />
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" :alt="content.viteLogo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" :alt="content.vueLogo" />
    </a>
  </div>
  <HelloWorld :msg="content.title" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
