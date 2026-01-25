<script setup lang="ts">
import LocaleSwitcher from '@components/LocaleSwitcher.vue';
import RouterLink from '@components/RouterLink.vue';
import { useI18nHTMLAttributes } from '@composables/useI18nHTMLAttributes';
import { Suspense } from 'vue';
import { useEditor, useRewriteURL } from 'vue-intlayer';

// Apply HTML language attributes based on current locale
useI18nHTMLAttributes();
useEditor();
useRewriteURL();
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">Root</RouterLink>
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/tests">Test</RouterLink>
      <LocaleSwitcher />
    </nav>

    <RouterView v-slot="{ Component }">
      <Suspense fallback="Loading...">
        <component :is="Component" />
      </Suspense>
    </RouterView>
  </div>
</template>

<style>
nav {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  gap: 2rem;
  margin-top: 1rem;
}
</style>
