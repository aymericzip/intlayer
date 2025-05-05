<script setup lang="ts">
import { useI18nHTMLAttributes } from '@composables/useI18nHTMLAttributes';
import LocaleSwitcher from '@components/LocaleSwitcher.vue';
import RouterLink from '@components/RouterLink.vue';

// Apply HTML language attributes based on current locale
useI18nHTMLAttributes();
</script>

<template>
  <nav>
    <RouterLink to="/">Root</RouterLink>
    <RouterLink to="/home">Home</RouterLink>
    <LocaleSwitcher />
  </nav>
  <RouterView />
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
