<script lang="ts">
import { locale, locales } from 'svelte-i18n';

const localeNames: Record<string, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
};

const changeLocale = (event: Event) => {
  locale.set((event.target as HTMLSelectElement).value);
};
</script>

<div class="locale-switcher">
  <select value={$locale} onchange={changeLocale}>
    {#each $locales as localeCode}
      <option value={localeCode}>{localeNames[localeCode] ?? localeCode}</option>
    {/each}
  </select>
</div>

<style>
  select {
    padding: 0.5em 1em;
    border: 1px solid #646cff;
    border-radius: 8px;
    background-color: #1a1a1a;
    color: rgba(255, 255, 255, 0.87);
    font-family: inherit;
    font-size: 1em;
    cursor: pointer;
  }
</style>
