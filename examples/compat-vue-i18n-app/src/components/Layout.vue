<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import Footer from './Footer.vue';
import Header from './Header.vue';

const route = useRoute();
const { locale } = useI18n();
const renderStart = ref(0);

onBeforeMount(() => {
  renderStart.value =
    typeof performance !== 'undefined' ? performance.now() : 0;
});

watch(
  () => route.params.locale,
  (newLocale) => {
    if (newLocale) {
      document.documentElement.lang = newLocale as string;
      locale.value = newLocale as any;
    }
  },
  { immediate: true }
);
</script>

<template>
  <Header />
  <router-view />
  <Footer />
</template>
