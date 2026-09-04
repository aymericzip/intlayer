<script lang="ts">
  import { useIntlayer, useLocale, setupIntlayer } from "svelte-intlayer";
  import { getLocalizedUrl, getLocaleName, getPathWithoutLocale, type Locales, type LocalesValues } from "intlayer";

  export let locale: LocalesValues;

  setupIntlayer(locale);
  const content = useIntlayer("svelte-demo");
  const {
    locale: currentLocale,
    availableLocales,
    setLocale,
  } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });

  let count = 0;
</script>

<div class="demo-container">
  <h2 class="greeting">{$content.greeting}</h2>
  <p class="description">{$content.description}</p>
  <div class="counter-section">
    <p class="counter-text">{$content.counter({ count })}</p>
    <button class="btn-primary" on:click={() => count++}>
      {$content.increment}
    </button>
  </div>
  <div class="locale-switcher">
    <span class="switcher-label">Switch locale:</span>
    <div class="locale-buttons">
      {#each availableLocales as localeItem}
        <button
          class="locale-btn {localeItem === $currentLocale ? 'active' : ''}"
          on:click={() => setLocale(localeItem)}
        >
          <div class="ls-item-left">
            <span class="ls-own-name">{getLocaleName(localeItem)}</span>
            <span class="ls-current-name">{getLocaleName(localeItem, $currentLocale)}</span>
          </div>
          <span class="ls-code">{localeItem.toUpperCase()}</span>
        </button>
      {/each}
    </div>
  </div>
</div>
