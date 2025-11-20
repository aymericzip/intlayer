---
createdAt: 2025-11-20
updatedAt: 2025-11-20
title: Jak przetłumaczyć swoją aplikację SvelteKit – przewodnik i18n 2025
description: Dowiedz się, jak uczynić swoją stronę SvelteKit wielojęzyczną. Postępuj zgodnie z dokumentacją, aby zinternacjonalizować (i18n) i przetłumaczyć ją za pomocą Server-Side Rendering (SSR).
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - SvelteKit
  - JavaScript
  - SSR
slugs:
  - doc
  - environment
  - sveltekit
applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
history:
  - version: 7.1.10
    date: 2025-11-20
    changes: Inicjalizacja historii
---

# Przetłumacz swoją stronę SvelteKit za pomocą Intlayer | Internacjonalizacja (i18n)

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna, open-source'owa biblioteka do internacjonalizacji (i18n), zaprojektowana, aby uprościć wsparcie wielojęzyczne w nowoczesnych aplikacjach webowych. Działa bezproblemowo z możliwościami Server-Side Rendering (SSR) w **SvelteKit**.

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentów.
- **Dynamicznie lokalizować metadane**, ścieżki i zawartość.
- **Zapewnić wsparcie TypeScript** dzięki automatycznie generowanym typom.
- **Wykorzystać SSR SvelteKit** dla SEO-przyjaznej internacjonalizacji.

---

## Przewodnik krok po kroku: konfiguracja Intlayer w aplikacji SvelteKit

Aby rozpocząć, utwórz nowy projekt SvelteKit. Oto końcowa struktura, którą stworzymy:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

### Krok 1: Instalacja zależności

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

- **intlayer**: Podstawowy pakiet i18n.
- **svelte-intlayer**: Zapewnia dostawców kontekstu i sklepy dla Svelte/SvelteKit.
- **vite-intlayer**: Wtyczka Vite do integracji deklaracji treści z procesem budowania.

### Krok 2: Konfiguracja projektu

Utwórz plik konfiguracyjny w katalogu głównym projektu:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Krok 3: Integracja Intlayer w konfiguracji Vite

Zaktualizuj swój plik `vite.config.ts`, aby uwzględnić wtyczkę Intlayer. Ta wtyczka obsługuje transpileację Twoich plików z treścią.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // kolejność ma znaczenie, Intlayer powinien być umieszczony przed SvelteKit
});
```

### Krok 4: Zadeklaruj swoją treść

Utwórz pliki deklaracji treści w dowolnym miejscu w folderze `src` (np. `src/lib/content` lub obok swoich komponentów). Pliki te definiują tłumaczoną treść dla Twojej aplikacji, używając funkcji `t()` dla każdego języka.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### Krok 5: Wykorzystaj Intlayer w swoich komponentach

### Krok 5: Wykorzystaj Intlayer w swoich komponentach

Teraz możesz użyć funkcji `useIntlayer` w dowolnym komponencie Svelte. Zwraca ona reaktywny store, który automatycznie aktualizuje się, gdy zmienia się lokalizacja. Funkcja automatycznie uwzględnia aktualną lokalizację (zarówno podczas SSR, jak i nawigacji po stronie klienta).

> **Uwaga:** `useIntlayer` zwraca store Svelte, więc musisz użyć prefiksu `---
> createdAt: 2025-11-20
> updatedAt: 2025-11-20
> title: Jak przetłumaczyć swoją aplikację SvelteKit – przewodnik i18n 2025
> description: Dowiedz się, jak uczynić swoją stronę SvelteKit wielojęzyczną. Postępuj zgodnie z dokumentacją, aby zinternacjonalizować (i18n) i przetłumaczyć ją za pomocą Server-Side Rendering (SSR).
> keywords:

- Internacjonalizacja
- Dokumentacja
- Intlayer
- SvelteKit
- JavaScript
- SSR
  slugs:
- doc
- environment
- sveltekit
  applicationTemplate: https://github.com/aymericzip/intlayer-sveltekit-template
  history:
- version: 7.1.10
  date: 2025-11-20
  changes: Inicjalizacja historii

---

# Przetłumacz swoją stronę SvelteKit za pomocą Intlayer | Internacjonalizacja (i18n)

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna, open-source'owa biblioteka do internacjonalizacji (i18n), zaprojektowana, aby uprościć wsparcie wielojęzyczne w nowoczesnych aplikacjach webowych. Działa bezproblemowo z możliwościami Server-Side Rendering (SSR) w **SvelteKit**.

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentów.
- **Dynamicznie lokalizować metadane**, ścieżki i zawartość.
- **Zapewnić wsparcie TypeScript** dzięki automatycznie generowanym typom.
- **Wykorzystać SSR SvelteKit** dla SEO-przyjaznej internacjonalizacji.

---

## Przewodnik krok po kroku: konfiguracja Intlayer w aplikacji SvelteKit

Aby rozpocząć, utwórz nowy projekt SvelteKit. Oto końcowa struktura, którą stworzymy:

```bash
.
├── intlayer.config.ts
├── package.json
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── getLocale.ts
│   │   ├── LocaleSwitcher.svelte
│   │   └── LocalizedLink.svelte
│   ├── params
│   │   └── locale.ts
│   └── routes
│       ├── [[locale=locale]]
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── +page.svelte
│       │   ├── +page.ts
│       │   ├── about
│       │   │   ├── +page.svelte
│       │   │   ├── +page.ts
│       │   │   └── page.content.ts
│       │   ├── Counter.content.ts
│       │   ├── Counter.svelte
│       │   ├── Header.content.ts
│       │   ├── Header.svelte
│       │   ├── home.content.ts
│       │   └── layout.content.ts
│       ├── +layout.svelte
│       └── layout.css
├── static
│   ├── favicon.svg
│   └── robots.txt
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

### Krok 1: Instalacja zależności

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

- **intlayer**: Podstawowy pakiet i18n.
- **svelte-intlayer**: Zapewnia dostawców kontekstu i sklepy dla Svelte/SvelteKit.
- **vite-intlayer**: Wtyczka Vite do integracji deklaracji treści z procesem budowania.

### Krok 2: Konfiguracja projektu

Utwórz plik konfiguracyjny w katalogu głównym projektu:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Krok 3: Integracja Intlayer w konfiguracji Vite

Zaktualizuj swój plik `vite.config.ts`, aby uwzględnić wtyczkę Intlayer. Ta wtyczka obsługuje transpileację Twoich plików z treścią.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // kolejność ma znaczenie, Intlayer powinien być umieszczony przed SvelteKit
});
```

### Krok 4: Zadeklaruj swoją treść

Utwórz pliki deklaracji treści w dowolnym miejscu w folderze `src` (np. `src/lib/content` lub obok swoich komponentów). Pliki te definiują tłumaczoną treść dla Twojej aplikacji, używając funkcji `t()` dla każdego języka.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const heroContent = {
  key: "hero-section",
  content: {
    title: t({
      en: "Welcome to SvelteKit",
      fr: "Bienvenue sur SvelteKit",
      es: "Bienvenido a SvelteKit",
    }),
  },
} satisfies Dictionary;

export default heroContent;
```

### Krok 5: Wykorzystaj Intlayer w swoich komponentach

, aby uzyskać dostęp do jego reaktywnej wartości (np. `$content.title`).

```svelte fileName="src/lib/components/Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  // "hero-section" odpowiada kluczowi zdefiniowanemu w Kroku 4
  const content = useIntlayer("hero-section");
</script>

<!-- Renderuj treść jako prostą zawartość -->
<h1>{$content.title}</h1>
<!-- Aby renderować treść edytowalną za pomocą edytora -->
<h1><svelte:component this={$content.title} /></h1>
<!-- Aby wyrenderować zawartość jako ciąg znaków -->
<div aria-label={$content.title.value}></div>
```

### (Opcjonalny) Krok 6: Skonfiguruj routing

Poniższe kroki pokazują, jak skonfigurować routing oparty na lokalizacji w SvelteKit. Pozwala to na dodanie prefiksu lokalizacji do adresów URL (np. `/en/about`, `/fr/about`) dla lepszego SEO i doświadczenia użytkownika.

```bash
.
└─── src
    ├── app.d.ts                  # Definiuje typ lokalizacji
    ├── hooks.server.ts           # Zarządza routingiem lokalizacji
    ├── lib
    │   └── getLocale.ts          # Sprawdza lokalizację z nagłówka, ciasteczek
    ├── params
    │   └── locale.ts             # Definiuje parametr lokalizacji
    └── routes
        ├── [[locale=locale]]     # Opakowuje w grupę tras, aby ustawić lokalizację
        │   ├── +layout.svelte    # Lokalny layout dla trasy
        │   ├── +layout.ts
        │   ├── +page.svelte
        │   ├── +page.ts
        │   └── about
        │       ├── +page.svelte
        │       └── +page.ts
        └── +layout.svelte         # Główny layout dla fontów i stylów globalnych
```

### Krok 7: Obsługa wykrywania lokalizacji po stronie serwera (Hooks)

W SvelteKit serwer musi znać lokalizację użytkownika, aby wyrenderować odpowiednią zawartość podczas SSR. Używamy `hooks.server.ts` do wykrywania lokalizacji z URL lub ciasteczek.

Utwórz lub zmodyfikuj plik `src/hooks.server.ts`:

```typescript fileName="src/hooks.server.ts"
import type { Handle } from "@sveltejs/kit";
import { getLocalizedUrl } from "intlayer";
import { getLocale } from "$lib/getLocale";

export const handle: Handle = async ({ event, resolve }) => {
  const detectedLocale = getLocale(event);

  // Sprawdź, czy bieżąca ścieżka już zaczyna się od lokalizacji (np. /fr, /en)
  const pathname = event.url.pathname;
  const targetPathname = getLocalizedUrl(pathname, detectedLocale);

  // Jeśli w URL nie ma lokalizacji (np. użytkownik odwiedza "/"), przekieruj go
  if (targetPathname !== pathname) {
    return new Response(undefined, {
      headers: { Location: targetPathname },
      status: 307, // Tymczasowe przekierowanie
    });
  }

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", detectedLocale),
  });
};
```

Następnie utwórz pomocnika do pobierania lokalizacji użytkownika z eventu żądania:

```typescript fileName="src/lib/getLocale.ts"
import {
  configuration,
  getLocaleFromStorage,
  localeDetector,
  type Locale,
} from "intlayer";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * Pobierz lokalizację użytkownika z eventu żądania.
 * Ta funkcja jest używana w hooku `handle` w `src/hooks.server.ts`.
 *
 * Najpierw próbuje pobrać lokalizację z magazynu Intlayer (ciasteczka lub niestandardowe nagłówki).
 * Jeśli lokalizacja nie zostanie znaleziona, następuje odwołanie do negocjacji "Accept-Language" przeglądarki.
 *
 * @param event - Event żądania z SvelteKit
 * @returns Lokalizacja użytkownika
 */
export const getLocale = (event: RequestEvent): Locale => {
  const defaultLocale = configuration?.internationalization?.defaultLocale;

  // Próba pobrania lokalizacji z magazynu Intlayer (ciasteczka lub nagłówki)
  const storedLocale = getLocaleFromStorage({
    // Dostęp do ciasteczek SvelteKit
    getCookie: (name: string) => event.cookies.get(name) ?? null,
    // Dostęp do nagłówków SvelteKit
    getHeader: (name: string) => event.request.headers.get(name) ?? null,
  });

  if (storedLocale) {
    return storedLocale;
  }

  // Powrót do negocjacji "Accept-Language" przeglądarki
  const negotiatorHeaders: Record<string, string> = {};

  // Konwersja obiektu Headers SvelteKit na zwykły Record<string, string>
  event.request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // Sprawdzenie lokalizacji z nagłówka `Accept-Language`
  const userFallbackLocale = localeDetector(negotiatorHeaders);

  if (userFallbackLocale) {
    return userFallbackLocale;
  }

  // Zwróć domyślną lokalizację, jeśli nie znaleziono dopasowania
  return defaultLocale;
};
```

> `getLocaleFromStorage` sprawdzi lokalizację na podstawie nagłówka lub ciasteczka w zależności od Twojej konfiguracji. Zobacz [Konfiguracja](https://intlayer.org/doc/configuration) po więcej szczegółów.

> Funkcja `localeDetector` przetworzy nagłówek `Accept-Language` i zwróci najlepsze dopasowanie.

Jeśli lokalizacja nie jest skonfigurowana, chcemy zwrócić błąd 404. Aby to ułatwić, możemy stworzyć funkcję `match`, która sprawdzi, czy lokalizacja jest poprawna:

```ts fileName="/src/params/locale.ts"
import { configuration, type Locale } from "intlayer";

export const match = (
  param: Locale = configuration.internationalization.defaultLocale
): boolean => {
  return configuration.internationalization.locales.includes(param);
};
```

> **Uwaga:** Upewnij się, że Twój plik `src/app.d.ts` zawiera definicję lokalizacji:
>
> ```typescript
> declare global {
>   namespace App {
>     interface Locals {
>       locale: import("intlayer").Locale;
>     }
>   }
> }
> ```

Dla pliku `+layout.svelte` możemy usunąć wszystko, aby zachować tylko statyczną zawartość, niezwiązaną z i18n:

```svelte fileName="src/+layout.svelte"
<script lang="ts">
	 import './layout.css';

    let { children } = $props();
</script>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
    /*  */
	}
</style>
```

Następnie utwórz nową stronę i layout w grupie `[[locale=locale]]`:

```ts fileName="src/routes/[[locale=locale]]/+layout.ts"
import type { Load } from "@sveltejs/kit";
import { configuration, type Locale } from "intlayer";

export const prerender = true;

// Użyj generycznego typu Load
export const load: Load = ({ params }) => {
  const locale: Locale =
    (params.locale as Locale) ??
    configuration.internationalization.defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from 'svelte-intlayer';
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// Inicjalizuj Intlayer z lokalizacją z trasy
	setupIntlayer(data.locale);

	// Użyj słownika zawartości layoutu
	const layoutContent = useIntlayer('layout');
</script>

<Header />

<main>
	{@render children()}
</main>

<footer>
	<p>
		{$layoutContent.footer.prefix.value}{' '}
		<a href="https://svelte.dev/docs/kit">{$layoutContent.footer.linkLabel.value}</a>{' '}
		{$layoutContent.footer.suffix.value}
	</p>
</footer>

<style>
  /*  */
</style>
```

```ts fileName="src/routes/[[locale=locale]]/+page.ts"
export const prerender = true;
```

```svelte fileName="src/routes/[[locale=locale]]/+page.svelte"
<script lang="ts">
	import { useIntlayer } from 'svelte-intlayer';

	// Użyj słownika treści strony głównej
	const homeContent = useIntlayer('home');
</script>

<svelte:head>
	<title>{$homeContent.title.value}</title>
</svelte:head>

<section>
	<h1>
		{$homeContent.title}
	</h1>
</section>

<style>
  /*  */
</style>
```

### (Opcjonalny) Krok 8: Linki z internacjonalizacją

Dla SEO zaleca się poprzedzanie swoich ścieżek lokalizacją (np. `/en/about`, `/fr/about`). Ten komponent automatycznie dodaje prefiks lokalizacji do każdego linku.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from 'svelte-intlayer';

  let { href = "" } = $props();
  const { locale } = useLocale();

  // Pomocnik do dodawania prefiksu lokalizacji do URL
  $: localizedHref = getLocalizedUrl(href, $locale);
</script>

<a href={localizedHref}>
  <slot />
</a>
```

Jeśli używasz `goto` z SvelteKit, możesz zastosować tę samą logikę z `getLocalizedUrl`, aby nawigować do zlokalizowanego URL:

```typescript
import { goto } from "$app/navigation";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "svelte-intlayer";

const { locale } = useLocale();
const localizedPath = getLocalizedUrl("/about", $locale);
goto(localizedPath); // Nawiguje do /en/about lub /fr/about w zależności od lokalizacji
```

### (Opcjonalny) Krok 9: Przełącznik języka

Aby umożliwić użytkownikom zmianę języka, zaktualizuj URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from 'svelte-intlayer';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  const { locale, setLocale, availableLocales } = useLocale({
    onLocaleChange: (newLocale) => {
      const localizedPath = getLocalizedUrl($page.url.pathname, newLocale);
      goto(localizedPath);
    },
  });
</script>

<ul class="locale-list">
  {#each availableLocales as localeEl}
    <li>
      <a
        href={getLocalizedUrl($page.url.pathname, localeEl)}
        onclick={(e) => {
          e.preventDefault();
          setLocale(localeEl); // Ustawi locale w store i wywoła onLocaleChange
        }}
        class:active={$locale === localeEl}
      >
        {getLocaleName(localeEl)}
      </a>
    </li>
  {/each}
</ul>

<style>
  /* */
</style>
```

### (Opcjonalny) Krok 10: Dodaj backend proxy

Aby dodać backend proxy do swojej aplikacji SvelteKit, możesz użyć funkcji `intlayerProxy` dostarczonej przez wtyczkę `vite-intlayer`. Ta wtyczka automatycznie wykryje najlepszy locale dla użytkownika na podstawie URL, ciasteczek i preferencji językowych przeglądarki.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [intlayer(), intlayerProxy(), sveltekit()],
});
```

### (Opcjonalny) Krok 11: Konfiguracja edytora intlayer / CMS

Aby skonfigurować edytor intlayer, należy postępować zgodnie z [dokumentacją edytora intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md).

Aby skonfigurować CMS intlayer, należy postępować zgodnie z [dokumentacją CMS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

Aby móc wizualizować selektor edytora intlayer, musisz użyć składni komponentu w swojej zawartości intlayer.

```svelte fileName="Component.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  const content = useIntlayer("component");
</script>

<div>

  <!-- Renderuj zawartość jako prostą zawartość -->
  <h1>{$content.title}</h1>

  <!-- Renderuj zawartość jako komponent (wymagane przez edytor) -->
  <svelte:component this={$content.component} />
</div>
```

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer.

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

---

### Idź dalej

- **Edytor wizualny**: Zintegruj [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md), aby edytować tłumaczenia bezpośrednio z interfejsu użytkownika.
- **CMS**: Zewnętrz zarządzanie treścią, korzystając z [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).
