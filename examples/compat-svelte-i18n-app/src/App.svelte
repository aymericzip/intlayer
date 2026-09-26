<script lang="ts">
import { _, date, json, number } from 'svelte-i18n';
import svelteLogo from './assets/svelte.svg';
import Counter from './lib/Counter.svelte';
import LocaleSwitcher from './lib/LocaleSwitcher.svelte';

const now = new Date();
</script>

<main>
  <div class="locale-switcher-container">
    <LocaleSwitcher />
  </div>

  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noopener">
      <img src="/vite.svg" class="logo" alt={$_('common.viteLogoLabel')} />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noopener">
      <img src={svelteLogo} class="logo svelte" alt={$_('common.svelteLogoLabel')} />
    </a>
  </div>

  <h1>{$_('home.title')}</h1>
  <p>{$_('home.greeting', { values: { name: 'Ada' } })}</p>

  <div class="card">
    <Counter />
  </div>

  <ul class="features">
    {#each $json('home.features') as string[] as feature}
      <li>{feature}</li>
    {/each}
  </ul>

  <p>{$_('home.today', { values: { date: now } })}</p>
  <p>{$date(now, { format: 'long' })} · {$number(1234.5, { style: 'currency', currency: 'EUR' })}</p>

  <p class="read-the-docs">{$_('common.readTheDocs')}</p>
</main>

<style>
  main {
    position: relative;
  }
  .locale-switcher-container {
    position: absolute;
    top: 0;
    right: 0;
  }
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .features {
    list-style: none;
    padding: 0;
  }
  .read-the-docs {
    color: #888;
  }
</style>
