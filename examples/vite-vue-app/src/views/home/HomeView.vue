<script setup lang="ts">
import { ref, computed } from 'vue';
import { useIntlayer } from 'vue-intlayer';
import { compileMarkdown } from 'vue-intlayer/markdown';

// Use the useIntlayer composable to access translations
const content = useIntlayer('home');
const { syntax1, syntax2, syntax5 } = useIntlayer('home');

// Tab state for markdown demo
const activeTab = ref<'source' | 'rendered'>('rendered');

// Editable markdown source
const markdownSource = ref(`## Hello from Vue Markdown!

This is **bold** and this is *italic*.

- List item 1
- List item 2
- List item 3

\`inline code\` example

> A blockquote

[Link to intlayer](https://intlayer.org)`);

// Compile markdown when switching to rendered tab
const renderedMarkdown = computed(() => compileMarkdown(markdownSource.value));
</script>

<template>
  <div class="home-container">
    <header>
      <h1>{{content.welcome}} </h1>
      <p class="subtitle">{{content.subtitle}}</p>
    </header>

    <main>
      <!-- Markdown Demo with Tabs -->
      <section class="markdown-demo-section">
        <h3 class="demo-title">Markdown Demo (vue-intlayer/markdown)</h3>
        <p class="demo-subtitle">Edit the markdown source and switch tabs to see the rendered output</p>

        <!-- Tab Buttons -->
        <div class="tab-buttons">
          <button
            :class="['tab-btn', { active: activeTab === 'source' }]"
            @click="activeTab = 'source'"
          >
            Markdown Source
          </button>
          <button
            :class="['tab-btn', { active: activeTab === 'rendered' }]"
            @click="activeTab = 'rendered'"
          >
            Rendered Output
          </button>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
          <textarea
            v-if="activeTab === 'source'"
            v-model="markdownSource"
            class="source-editor"
            placeholder="Type your markdown here..."
          />
          <div v-else class="rendered-content">
            <component :is="renderedMarkdown" />
          </div>
        </div>
      </section>

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

.syntax {
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

.markdown-demo-section {
  text-align: left;
  margin: 0 auto 2rem;
  max-width: 600px;
}

.demo-title {
  margin-bottom: 0.25rem;
  color: #fff;
}

.demo-subtitle {
  font-size: 0.85rem;
  color: #888;
  margin: 0 0 0.5rem 0;
}

.tab-buttons {
  display: flex;
  gap: 0;
}

.tab-btn {
  padding: 0.5rem 1rem;
  background: #2a2a2a;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: normal;
  transition: background 0.2s;
}

.tab-btn:first-child {
  border-radius: 8px 0 0 0;
}

.tab-btn:last-child {
  border-radius: 0 8px 0 0;
}

.tab-btn.active {
  background: #646cff;
  font-weight: bold;
}

.tab-content {
  padding: 1rem;
  background: #1a1a1a;
  border-radius: 0 8px 8px 8px;
  min-height: 150px;
}

.source-code {
  margin: 0;
  font-family: monospace;
  white-space: pre-wrap;
  color: #98c379;
  font-size: 14px;
}

.source-editor {
  width: 100%;
  min-height: 200px;
  background: transparent;
  border: none;
  outline: none;
  resize: vertical;
  font-family: monospace;
  color: #98c379;
  font-size: 14px;
  line-height: 1.5;
}

.rendered-content {
  color: #fff;
}
</style>
