<script setup lang="ts">
import { useSeoMeta } from 'nuxt/app';
import { useIntlayer, useLocale } from 'vue-intlayer';
import { getIntlayer } from 'intlayer';

// Use the useIntlayer composable to access translations
const content = useIntlayer('home');

const { locale } = useLocale();
const meta = getIntlayer('home-meta', locale.value);
useSeoMeta(meta);
</script>

<template>
  <div class="home-container">
    <header>
      <LocaleSwitcher />
      <h1><content.welcome /></h1>
      <p class="subtitle"><content.subtitle /></p>
    </header>

    <main>
      <section class="description">
        <p><content.description /></p>
      </section>

      <section class="features">
        <h2><content.features.title /></h2>
        <ul>
          <li><content.features.list.item1 /></li>
          <li><content.features.list.item2 /></li>
          <li><content.features.list.item3 /></li>
        </ul>
      </section>
    </main>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
}

header {
  text-align: center;
  margin-bottom: 3rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.25rem;
  color: #7e7e7e;
}

.description {
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.features {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2.5rem;
}

.features h2 {
  margin-bottom: 1rem;
}

.features ul {
  margin: auto;
  padding-left: 1.5rem;
  text-align: left;
}

.features li {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}
</style>
