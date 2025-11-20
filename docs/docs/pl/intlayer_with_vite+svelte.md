---
createdAt: 2025-04-18
updatedAt: 2025-11-19
title: Jak przetłumaczyć swoją aplikację Vite i Svelte – przewodnik i18n 2025
description: Dowiedz się, jak uczynić swoją stronę Vite i Svelte wielojęzyczną. Postępuj zgodnie z dokumentacją, aby zrealizować internacjonalizację (i18n) i tłumaczenie.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Vite
  - Svelte
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-svelte
applicationTemplate: https://github.com/aymericzip/intlayer-vite-svelte-template
history:
  - version: 5.5.11
    date: 2025-11-19
    changes: Aktualizacja dokumentacji
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Przetłumacz swoją stronę Vite i Svelte za pomocą Intlayer | Internacjonalizacja (i18n)

> Ten pakiet jest w trakcie rozwoju. Zobacz [zgłoszenie](https://github.com/aymericzip/intlayer/issues/114) po więcej informacji. Pokaż swoje zainteresowanie Intlayer dla Svelte, lajkując to zgłoszenie

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna, open-source'owa biblioteka do internacjonalizacji (i18n), zaprojektowana, aby uprościć wsparcie wielojęzyczne w nowoczesnych aplikacjach webowych.

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentu.
- **Dynamicznie lokalizować metadane**, trasy i zawartość.
- **Zapewnić wsparcie dla TypeScript** dzięki automatycznie generowanym typom, co poprawia autouzupełnianie i wykrywanie błędów.
- **Korzystać z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i przełączanie lokalizacji.

---

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji Vite i Svelte

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-vite-svelte-template) na GitHub.

### Krok 1: Zainstaluj zależności

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
```

- **intlayer**

  Główne pakiet, który dostarcza narzędzia do internacjonalizacji do zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilecji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md).

- **svelte-intlayer**
  Pakiet, który integruje Intlayer z aplikacją Svelte. Dostarcza providery kontekstu oraz hooki do internacjonalizacji w Svelte.

- **vite-intlayer**
  Zawiera plugin Vite do integracji Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami oraz obsługi przekierowań URL.

### Krok 2: Konfiguracja projektu

Utwórz plik konfiguracyjny, aby skonfigurować języki swojej aplikacji:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Twoje pozostałe lokalizacje
    ],

    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Poprzez ten plik konfiguracyjny możesz ustawić lokalizowane adresy URL, przekierowania w middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji treści, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 3: Integracja Intlayer w konfiguracji Vite

Dodaj plugin intlayer do swojej konfiguracji.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer()],
});
```

> Wtyczka `intlayer()` dla Vite służy do integracji Intlayer z Vite. Zapewnia budowanie plików deklaracji treści oraz monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Vite. Dodatkowo dostarcza aliasy optymalizujące wydajność.

### Krok 4: Zadeklaruj swoją treść

Utwórz i zarządzaj deklaracjami treści, aby przechowywać tłumaczenia:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Definicja zawartości aplikacji z tłumaczeniami
const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Definicja zawartości aplikacji z tłumaczeniami
const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola mundo"
      }
    }
  }
}
```

> Twoje deklaracje zawartości mogą być zdefiniowane w dowolnym miejscu w Twojej aplikacji, pod warunkiem, że zostaną umieszczone w katalogu `contentDir` (domyślnie `./src`). I będą miały rozszerzenie pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Aby uzyskać więcej szczegółów, zapoznaj się z [dokumentacją deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Krok 5: Wykorzystaj Intlayer w swoim kodzie

```svelte fileName="src/App.svelte"
<script>
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("app");
</script>

<div>


<!-- Renderuj zawartość jako prostą zawartość  -->
<h1>{$content.title}</h1>
<!-- Aby renderować zawartość edytowalną za pomocą edytora -->
<h1><svelte:component this={$content.title} /></h1>
<!-- Aby renderować zawartość jako ciąg znaków -->
<div aria-label={$content.title.value}></div>
```

### (Opcjonalny) Krok 6: Zmień język swojej zawartości

```svelte fileName="src/App.svelte"
<script lang="ts">
import  { getLocaleName } from 'intlayer';
import { useLocale } from 'svelte-intlayer';

// Pobierz informacje o lokalizacji i funkcję setLocale
const { locale, availableLocales, setLocale } = useLocale();

// Obsłuż zmianę lokalizacji
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  setLocale(newLocale);
};
</script>

<div>
  <select value={$locale} on:change={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

### (Opcjonalny) Krok 7: Renderowanie Markdown

Intlayer obsługuje renderowanie zawartości Markdown bezpośrednio w Twojej aplikacji Svelte. Domyślnie Markdown jest traktowany jako zwykły tekst. Aby przekształcić Markdown w bogaty HTML, możesz zintegrować `@humanspeak/svelte-markdown` lub inny parser markdown.

> Aby zobaczyć, jak deklarować zawartość markdown za pomocą pakietu `intlayer`, zobacz [dokumentację markdown](https://github.com/aymericzip/intlayer/tree/main/docs/pl/dictionary/markdown.md).

```svelte fileName="src/App.svelte"
<script>
  import { setIntlayerMarkdown } from "svelte-intlayer";

  setIntlayerMarkdown((markdown) =>
   // renderuj zawartość markdown jako ciąg znaków
   return markdown;
  );
</script>

<h1>{$content.markdownContent}</h1>
```

> Możesz również uzyskać dostęp do danych front-matter swojego markdowna, używając właściwości `content.markdownContent.metadata.xxx`.

### (Opcjonalny) Krok 8: Konfiguracja edytora / CMS intlayer

Aby skonfigurować edytor intlayer, musisz postępować zgodnie z [dokumentacją edytora intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md).

Aby skonfigurować CMS intlayer, musisz postępować zgodnie z [dokumentacją CMS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

Równolegle, w swojej aplikacji Svelte, musisz dodać następującą linię w layoucie lub na poziomie root aplikacji:

```svelte fileName="src/layout.svelte"
import { useIntlayerEditor } from "svelte-intlayer";

useIntlayerEditor();
```

### (Opcjonalny) Krok 7: Dodaj lokalizowane routingi do swojej aplikacji

Aby obsłużyć lokalizowane routingi w swojej aplikacji Svelte, możesz użyć `svelte-spa-router` wraz z `localeFlatMap` z Intlayer do generowania tras dla każdej lokalizacji.

Najpierw zainstaluj `svelte-spa-router`:

```bash packageManager="npm"
npm install svelte-spa-router
```

```bash packageManager="pnpm"
pnpm add svelte-spa-router
```

```bash packageManager="yarn"
yarn add svelte-spa-router
```

```bash packageManager="bun"
bun add svelte-spa-router
```

Następnie utwórz plik `Router.svelte`, aby zdefiniować swoje trasy:

```svelte fileName="src/Router.svelte"
<script lang="ts">
import { localeFlatMap } from "intlayer";
import Router from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import App from "./App.svelte";

const routes = Object.fromEntries(
    localeFlatMap(({locale, urlPrefix}) => [
    [
        urlPrefix || '/',
        wrap({
            component: App as any,
            props: {
                locale,
            },
        }),
    ],
    ])
);
</script>

<Router {routes} />
```

Zaktualizuj swój plik `main.ts`, aby zamontować komponent `Router` zamiast `App`:

```typescript fileName="src/main.ts"
import { mount } from "svelte";
import Router from "./Router.svelte";

const app = mount(Router, {
  target: document.getElementById("app")!,
});

export default app;
```

Na koniec zaktualizuj swój plik `App.svelte`, aby otrzymywał właściwość `locale` i używał jej z `useIntlayer`:

```svelte fileName="src/App.svelte"
<script lang="ts">
import type { Locale } from 'intlayer';
import { useIntlayer } from 'svelte-intlayer';
import Counter from './lib/Counter.svelte';
import LocaleSwitcher from './lib/LocaleSwitcher.svelte';

export let locale: Locale;

$: content = useIntlayer('app', locale);
</script>

<main>
  <div class="locale-switcher-container">
    <LocaleSwitcher currentLocale={locale} />
  </div>

  <!-- ... reszta twojej aplikacji ... -->
</main>
```

#### Konfiguracja routingu po stronie serwera (opcjonalnie)

Równolegle możesz również użyć `intlayerProxy`, aby dodać routing po stronie serwera do swojej aplikacji. Ten plugin automatycznie wykryje aktualny język na podstawie URL i ustawi odpowiedni cookie językowy. Jeśli nie zostanie określony żaden język, plugin wybierze najbardziej odpowiedni język na podstawie preferencji językowych przeglądarki użytkownika. Jeśli nie zostanie wykryty żaden język, nastąpi przekierowanie do domyślnego języka.

> Uwaga: aby używać `intlayerProxy` w środowisku produkcyjnym, musisz przenieść pakiet `vite-intlayer` z `devDependencies` do `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const { svelte } = require("@sveltejs/vite-plugin-svelte");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
  plugins: [svelte(), intlayer(), intlayerProxy()],
});
```

### (Opcjonalny) Krok 8: Zmiana URL po zmianie lokalizacji

Aby umożliwić użytkownikom zmianę języka i odpowiednią aktualizację URL, możesz stworzyć komponent `LocaleSwitcher`. Komponent ten będzie korzystał z `getLocalizedUrl` z pakietu `intlayer` oraz `push` z `svelte-spa-router`.

```svelte fileName="src/lib/LocaleSwitcher.svelte"
<script lang="ts">
import { getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";
import { push } from "svelte-spa-router";

export let currentLocale: string | undefined = undefined;

// Pobierz informacje o lokalizacji
const { locale, availableLocales } = useLocale();

// Obsługa zmiany lokalizacji
const changeLocale = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newLocale = target.value;
  const currentUrl = window.location.pathname;
  const url = getLocalizedUrl( currentUrl, newLocale);
  push(url);
};
</script>

<div class="locale-switcher">
  <select value={currentLocale ?? $locale} onchange={changeLocale}>
    {#each availableLocales ?? [] as loc}
      <option value={loc}>
        {getLocaleName(loc)}
      </option>
    {/each}
  </select>
</div>
```

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić swoje doświadczenie w pracy z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy w linii** przetłumaczonej zawartości.
- **Szybkie akcje** umożliwiające łatwe tworzenie i aktualizowanie tłumaczeń.

Aby uzyskać więcej informacji na temat korzystania z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer dla VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Idź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyeksportować swoją zawartość, korzystając z [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).
