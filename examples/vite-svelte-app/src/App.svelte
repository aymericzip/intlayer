<script lang="ts">
import { useIntlayer } from 'svelte-intlayer';
import viteLogo from '/vite.svg';
import svelteLogo from './assets/svelte.svg';
import Counter from './lib/Counter.svelte';
import LocaleSwitcher from './lib/LocaleSwitcher.svelte';

const content = useIntlayer('app');
</script>

<main>
  <div class="locale-switcher-container">
    <LocaleSwitcher />
  </div>
  
  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt={$content.viteLogo} />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt={$content.svelteLogo} />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    {$content.checkOut[0]} <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, {$content.checkOut[1]}
  </p>

  <p class="read-the-docs">
    {$content.readTheDocs}
  </p>
</main>

<style>
  .locale-switcher-container {
    position: absolute;
    top: 1em;
    right: 1em;
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
  .read-the-docs {
    color: #888;
  }
</style>
