<script setup lang="ts">
import LocaleSwitcher from '@components/LocaleSwitcher.vue';
import RouterLink from '@components/RouterLink.vue';
import { useI18nHTMLAttributes } from '@composables/useI18nHTMLAttributes';
import { Suspense } from 'vue';
import { useEditor } from 'vue-intlayer';

// Apply HTML language attributes based on current locale
useI18nHTMLAttributes();
useEditor();
</script>

<template>
    <Suspense fallback="Loading..."  >
      <div>
        <nav>
          <RouterLink to="/">Root</RouterLink>
          <RouterLink to="/home">Home</RouterLink>
          <RouterLink to="/test">Test</RouterLink>
          <LocaleSwitcher />
        </nav>
        <RouterView />
     </div>
   </Suspense>
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
