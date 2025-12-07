<script setup lang="ts">
import Links from '~/components/Links.vue';
import LocaleSwitcher from '~/components/LocaleSwitcher.vue';
</script>

<template>
  <div>
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <slot />
    </main>

    <Links href="/">Home</Links>
    <Links href="/about">About</Links>
  </div>
</template>

