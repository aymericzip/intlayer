<script lang="ts">
  import svelteLogo from './assets/svelte.svg';
  import viteLogo from '/vite.svg';
  import Counter from './lib/Counter.svelte';
  import { useIntlayer, intlayerStore } from 'svelte-intlayer';

  // Use the locale store via getLocale()
  const locale = intlayerStore.getLocale();

  // Reactive content updates whenever locale changes
  $: content = useIntlayer('app', $locale);

  // Locale switcher functions
  const changeToEnglish = () => intlayerStore.setLocale('en');
  const changeToFrench = () => intlayerStore.setLocale('fr');
  const changeToSpanish = () => intlayerStore.setLocale('es');
</script>

<main>
  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt={$content?.viteLogoAlt} />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt={$content?.svelteLogoAlt} />
    </a>
  </div>

  <h1>{$content?.title}</h1>

  <div class="card">
    <Counter />
  </div>

  <div class="locale-switcher">
    <button on:click={changeToEnglish}>English</button>
    <button on:click={changeToFrench}>Français</button>
    <button on:click={changeToSpanish}>Español</button>
  </div>

  <p>Current locale: {$locale}</p>
  <p>{$content?.checkOut}</p>
  <p class="read-the-docs">{$content?.readTheDocs}</p>
</main>

<style>
  .logo { height: 6em; padding: 1.5em; will-change: filter; transition: filter 300ms; }
  .logo:hover { filter: drop-shadow(0 0 2em #646cffaa); }
  .logo.svelte:hover { filter: drop-shadow(0 0 2em #ff3e00aa); }
  .read-the-docs { color: #888; }
  .locale-switcher { margin-top: 1rem; display: flex; gap: 0.5rem; }
  .locale-switcher button {
    padding: 0.5rem 1rem; border: none; background: #646cff;
    color: white; border-radius: 4px; cursor: pointer; transition: background 200ms;
  }
  .locale-switcher button:hover { background: #4a4ee3; }
</style>
