<script setup>
import { useIntlayer } from 'vue-intlayer';
import HelloWorld from '@components/helloWorld/HelloWorld.vue';

const { viteLogo, vueLogo, title } = useIntlayer('root');
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" :alt="viteLogo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../../assets/vue.svg" class="logo vue" :alt="vueLogo" />
    </a>
  </div>
  <HelloWorld :msg="title" />
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
