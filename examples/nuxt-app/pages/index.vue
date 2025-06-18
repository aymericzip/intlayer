<script setup lang="ts">
import { useSeoMeta } from 'nuxt/app';
import { getIntlayer } from 'intlayer';
import { useIntlayer, useLocale } from 'vue-intlayer';
import HelloWorld from '~/components/helloWorld/HelloWorld.vue';
import LocaleSwitcher from '~/components/LocaleSwitcher.vue';

const { nuxtLogo, intlayerLogo, title } = useIntlayer('root');

const { locale } = useLocale();
const meta = getIntlayer('root-meta', locale.value);
useSeoMeta(meta);
</script>

<template>
  <div>
    <a href="https://nuxt.com" target="_blank">
      <img :src="`/nuxt.svg`" class="logo" :alt="nuxtLogo.value" />
    </a>
    <a href="https://intlayer.org/" target="_blank">
      <img
        :src="`/intlayer.svg`"
        class="logo intlayer"
        :alt="intlayerLogo.value"
      />
    </a>
  </div>
  <HelloWorld :msg="title.value" />
  <LocaleSwitcher />
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
