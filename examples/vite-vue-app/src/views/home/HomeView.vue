<script setup>
import { useIntlayer } from 'vue-intlayer';
import LocaleSwitcher from '@components/LocaleSwitcher.vue';

// Use the useIntlayer composable to access translations
const content = useIntlayer('home');
</script>

<template>
  <div class="home-container">
    <header>
      <LocaleSwitcher />
      <h1>{{ content.welcome }}</h1>
      <p class="subtitle">{{ content.subtitle }}</p>
    </header>

    <main>
      <section class="description">
        <p>{{ content.description }}</p>
      </section>

      <section class="features">
        <h2>{{ content.features.title }}</h2>
        <ul>
          <li>{{ content.features.list.item1 }}</li>
          <li>{{ content.features.list.item2 }}</li>
          <li>{{ content.features.list.item3 }}</li>
        </ul>
      </section>

      <section class="cta">
        <button>{{ content.ctaButton }}</button>
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
  color: #2c3e50;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.25rem;
  color: #546e7a;
}

.description {
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.features {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2.5rem;
}

.features h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.features ul {
  padding-left: 1.5rem;
}

.features li {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.cta {
  text-align: center;
  margin-top: 3rem;
}

.cta button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cta button:hover {
  background-color: #3aa876;
}
</style>
