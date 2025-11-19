<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from 'svelte-intlayer';

// Get locale information and setLocale function
const { locale, availableLocales, setLocale } = useLocale();

// Handle locale change
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  console.log('changeLocale', newLocale);
  setLocale(newLocale);
};
</script>

<div class="locale-switcher">
  <select value={$locale} on:change={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>

<style>
  .locale-switcher {
    display: inline-block;
  }

  select {
    padding: 0.5em 1em;
    border: 1px solid #646cff;
    border-radius: 8px;
    background-color: #1a1a1a;
    color: rgba(255, 255, 255, 0.87);
    font-family: inherit;
    font-size: 1em;
    cursor: pointer;
    transition: border-color 0.25s;
  }

  select:hover {
    border-color: #747bff;
  }

  select:focus {
    outline: 4px auto -webkit-focus-ring-color;
  }
</style>

