<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'

  //  Import the custom useLocale hook
  import { useLocale } from './hooks/useLocale'

  //  Destructure locale (store) and setLocale (function)
  const { locale, setLocale } = useLocale()
</script>

<main>
  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <!-- Locale Switcher Buttons -->


  <div class="locale-switcher">
    <button on:click={() => setLocale('en')}>English</button>
    <button on:click={() => setLocale('fr')}>Français</button>
    <button on:click={() => setLocale('es')}>Español</button>
  </div>

  <!-- Display current locale -->


  <p>Current locale: {$locale}</p>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, 
    the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<style>
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

  /* Styling for locale switcher buttons */


  .locale-switcher {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
  }

  .locale-switcher button {
    padding: 0.5rem 1rem;
    border: none;
    background: #646cff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: background 200ms;
  }

  .locale-switcher button:hover {
    background: #4a4ee3;
  }
</style>
