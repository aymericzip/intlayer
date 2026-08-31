---
createdAt: 2025-11-20
updatedAt: 2026-05-31
title: "SvelteKit i18n - Kompletny przewodnik po tłumaczeniu swojej aplikacji"
description: "Koniec z i18next. Przewodnik 2026 do budowania wielojęzycznej (i18n) aplikacji SvelteKit. Tłumacz z agentami AI i optymalizuj rozmiar bundle, SEO i wydajność."
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
applicationShowcase: https://intlayer-sveltekit-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizacja użycia API useIntlayer w Solid do bezpośredniego dostępu do właściwości"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Dodaj polecenie init"
  - version: 7.1.10
    date: 2025-11-20
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Przetłumacz swoją stronę SvelteKit za pomocą Intlayer | Internacjonalizacja (i18n)

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-sveltekit-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cách quốc tế hóa ứng dụng của bạn bằng Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-sveltekit-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-sveltekit-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Spis treści

<TOC/>

## Dlaczego Interlayer zamiast alternatyw?

W porównaniu do głównych rozwiązań, takich jak `svelte-i18n` czy `i18next`, Intlayer jest rozwiązaniem wyposażonym w zintegrowane optymalizacje, takie jak:

<AccordionGroup>

**Pełne pokrycie SvelteKit**

Intlayer jest zoptymalizowany do doskonałej współpracy z SvelteKit, oferując **routing wielojęzyczny**, **obsługę SSR** i wszystkie funkcje potrzebne do skalowania internacjonalizacji (i18n).

</Accordion>

**Rozmiar bundle'a**

Zamiast ładować ogromne pliki JSON na swoje strony, ładuj tylko niezbędną treść. Intlayer pomaga **zmniejszyć rozmiary bundle'a i stron nawet o 50%**.

</Accordion>

**Łatwość konserwacji**

Określanie zakresu zawartości aplikacji **ułatwia konserwację** aplikacji na dużą skalę. Możesz powielić lub usunąć pojedynczy folder funkcji bez obciążania psychicznego koniecznością przeglądania całej bazy kodu zawartości. Dodatkowo Inlayer jest **w pełni napisany**, aby zapewnić dokładność treści.

**Agent AI**

<Accordion header="Agent AI">

Wspólna lokalizacja treści **zmniejsza potrzebny kontekst** dzięki modelom dużego języka (LLM). Intlayer zawiera także zestaw narzędzi, taki jak **CLI** do sprawdzania brakujących tłumaczeń**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** i **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**, aby praca programisty (DX) była jeszcze płynniejsza dla agentów AI.

</Accordion>

**Automatyzacja**

Korzystaj z automatyzacji, aby tłumaczyć w swoim potoku CI/CD przy użyciu wybranego LLM na koszt dostawcy sztucznej inteligencji. Intlayer oferuje także **kompilator** do automatyzacji ekstrakcji treści, a także [platformę internetową] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), która pomaga **tłumaczyć w tle**.

**Wydajność**

<Accordion header="Wydajność">

Łączenie ogromnych plików JSON z komponentami może prowadzić do problemów z wydajnością i reaktywnością. Inlayer optymalizuje ładowanie treści w czasie kompilacji.

</Accordion>

**Skalowanie bez użycia dewelopera**

Więcej niż tylko rozwiązanie i18n, Intlayer zapewnia **samodzielny [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** i **[pełny CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, który pomoże Ci zarządzać wielojęzyczną treścią w **w czasie rzeczywistym**, dzięki czemu współpraca z tłumaczami, copywriterami i innymi członkami zespołu będzie płynna. Treść może być przechowywana lokalnie i/lub zdalnie.

</Accordion>
</AccordionGroup>

---

## Przewodnik krok po kroku: konfiguracja Intlayer w aplikacji SvelteKit

Zobacz [Application Template](https://github.com/aymericzip/intlayer-sveltekit-template) na GitHub.

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

<Steps>

<Step number={1} title="Instalacja zależności">

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> flaga `--interactive` jest opcjonalna. Użyj `intlayer-cli init`, jeśli jesteś agentem AI.

> To polecenie wykryje Twoje środowisko i zainstaluje wymagane pakiety. Na przykład:

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

</Step>

<Step number={2} title="Konfiguracja projektu">

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

</Step>

<Step number={3} title="Integracja Intlayer w konfiguracji Vite">

Zaktualizuj swój plik `vite.config.ts`, aby uwzględnić wtyczkę Intlayer. Ta wtyczka obsługuje transpileację Twoich plików z treścią.

```typescript fileName="vite.config.ts"
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), sveltekit()], // kolejność ma znaczenie, Intlayer powinien być umieszczony przed SvelteKit
});
```

</Step>

<Step number={4} title="Zadeklaruj swoją treść">

Utwórz pliki deklaracji treści w dowolnym miejscu w folderze `src` (np. `src/lib/content` lub obok swoich komponentów). Pliki te definiują tłumaczoną treść dla Twojej aplikacji, używając funkcji `t()` dla każdego języka.

```ts fileName="src/features/hero/hero.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

</Step>

<Step number={5} title="Wykorzystaj Intlayer w swoich komponentach">

Teraz możesz używać funkcji `useIntlayer` w dowolnym komponencie Svelte. Zwraca ona reaktywny store, który automatycznie aktualizuje się, gdy zmieni się locale. Funkcja będzie automatycznie respektować bieżący locale (zarówno podczas SSR, jak i nawigacji po stronie klienta).

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
<h1>{@const Title = $content.title}<Title /></h1>
<!-- Aby wyrenderować zawartość jako ciąg znaków -->
<div aria-label={$content.title.value}></div>
<div aria-label={$content.title.toString()}></div>
<div aria-label={String($content.title)}></div>
```

</Step>

<Step number={6} title="Skonfiguruj routing" isOptional={true}>

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

</Step>

<Step number={7} title="Obsługa wykrywania lokalizacji po stronie serwera">

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

> `getLocaleFromStorage` sprawdzi lokalizację na podstawie nagłówka lub ciasteczka w zależności od Twojej konfiguracji. Zobacz [Konfiguracja](https://intlayer.org/doc/concept/configuration) po więcej szczegółów.

> Funkcja `localeDetector` przetworzy nagłówek `Accept-Language` i zwróci najlepsze dopasowanie.

Jeśli lokalizacja nie jest skonfigurowana, chcemy zwrócić błąd 404. Aby to ułatwić, możemy stworzyć funkcję `match`, która sprawdzi, czy lokalizacja jest poprawna:

```ts fileName="/src/params/locale.ts"import { defaultLocale, locales, type Locale } from "intlayer";
export const match = (param: Locale = defaultLocale): boolean =>
  locales.includes(param);
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
import { defaultLocale, type Locale } from "intlayer";

export const prerender = true;

// Użyj generycznego typu Load
export const load: Load = ({ params }) => {
  const locale: Locale = (params.locale as Locale) ?? defaultLocale;

  return {
    locale,
  };
};
```

```svelte fileName="src/routes/[[locale=locale]]/+layout.svelte"
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useIntlayer, setupIntlayer } from "svelte-intlayer";
	import Header from './Header.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet, data: LayoutData } = $props();

	// Inicjalizuj Intlayer z lokalizacją z trasy
  $effect(() => {
      setupIntlayer(data.locale);
  });
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
	import { useIntlayer } from "svelte-intlayer";

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

</Step>

<Step number={8} title="Linki z internacjonalizacją" isOptional={true}>

Dla SEO zaleca się poprzedzanie swoich ścieżek lokalizacją (np. `/en/about`, `/fr/about`). Ten komponent automatycznie dodaje prefiks lokalizacji do każdego linku.

```svelte fileName="src/lib/components/LocalizedLink.svelte"
<script lang="ts">
  import { getLocalizedUrl } from "intlayer";
  import { useLocale } from "svelte-intlayer";

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

</Step>

<Step number={9} title="Przełącznik języka" isOptional={true}>

Aby umożliwić użytkownikom zmianę języka, zaktualizuj URL.

```svelte fileName="src/lib/components/LanguageSwitcher.svelte"
<script lang="ts">
  import { getLocalizedUrl, getLocaleName } from 'intlayer';
  import { useLocale } from "svelte-intlayer";
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

</Step>

<Step number={10} title="Dodaj backend proxy" isOptional={true}>

Aby dodać backend proxy do swojej aplikacji SvelteKit, możesz użyć funkcji `intlayerProxy` dostarczonej przez wtyczkę `vite-intlayer`. Ta wtyczka automatycznie wykryje najlepszy locale dla użytkownika na podstawie URL, ciasteczek i preferencji językowych przeglądarki.

> Od wersji Intlayer v9, `intlayerProxy()` jest wbudowany bezpośrednio w wtyczkę `intlayer()` i domyślnie włączony za pomocą opcji `routing.enableProxy` (`true` domyślnie). Rejestrowanie go oddzielnie, jak pokazano poniżej, jest teraz opcjonalne — jest zachowywane dla zgodności wstecznej i dla konfiguracji, które wymagają kontroli kolejności wtyczek. Ustaw `routing.enableProxy: false`, aby zrezygnować. Zobacz [uwagi do wydania v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/releases/v9.md).

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    sveltekit(),
  ],],
});
```

</Step>

<Step number={11} title="Konfiguracja edytora intlayer / CMS" isOptional={true}>

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
  {@const Component = $content.component}<Component />
</div>
```

</Step>

<Step number={12} title="Wyodrębnij zawartość swoich komponentów" isOptional={true}>

Jeśli masz istniejącą bazę kodu, transformacja tysięcy plików może być czasochłonna.

Aby ułatwić ten proces, Intlayer proponuje [kompilator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) / [ekstraktor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md), aby przetransformować komponenty i wyodrębnić zawartość.

Aby go skonfigurować, możesz dodać sekcję `compiler` w pliku `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Reszta Twojej konfiguracji
  compiler: {
    /**
     * Wskazuje, czy kompilator powinien być włączony.
     */
    enabled: true,

    /**
     * Definiuje ścieżkę plików wyjściowych
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Wskazuje, czy komponenty powinny zostać zapisane po transformacji. W ten sposób kompilator można uruchomić tylko raz, aby przetransformować aplikację, a następnie go usunąć.
     */
    saveComponents: false,

    /**
     * Prefiks klucza słownika
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Polecenie wyodrębniania'>

Uruchom ekstraktor, aby przetransformować komponenty i wyodrębnić zawartość

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

 </Tab>
 <Tab value='Kompilator Babel'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Zaktualizuj `vite.config.ts`, aby dołączyć wtyczkę `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # Lub npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

 </Tab>
</Tabs>
</Step>

</Steps>

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

## Często Zadawane Pytania

<FAQ>

<Question title="Jakie są różne rozwiązania dostępne do internacjonalizacji aplikacji SvelteKit?">

- **`svelte-i18n`** oraz **`typesafe-i18n`**: katalogi oparte na store'ach, ręcznie podpinane do funkcji ładowania (`load`).
- **`Paraglide`**: kompilator komunikatów z adapterem dla SvelteKit.
- **`Intlayer`**: najbardziej zaawansowane rozwiązanie. Treści deklarowane w dowolnym miejscu bazy kodu ([obok każdego komponentu lub centralnie](https://intlayer.org/blog/per-component-vs-centralized-i18n)) i kompilowane w czasie budowy, w pełni typowane, z tłumaczeniem AI, edytorem wizualnym i systemem CMS.

Główną zaletą w SvelteKit jest deklaracja treści per komponent, pełne wsparcie dla SSR i prerenderowania w plikach `+layout.server.ts` i `hooks.server.ts` oraz integracja z systemem reaktywności Svelte. Zobacz [dlaczego Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md).

</Question>

<Question title="O ile i18n zwiększa rozmiar mojego bundle'a w SvelteKit?">

Znacznie mniej niż rozwiązania oparte na przestrzeniach nazw, ponieważ strona nigdy nie pobiera katalogu, którego nie renderuje. Kompilator czasu budowy zastępuje wywołania `useIntlayer` dokładnymi wpisami ze słownika, których używa komponent, dzięki czemu nieużywane klucze i nieużywane języki są usuwane, a [słowniki dynamiczne](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md) dzielą resztę na poszczególne języki. W porównaniu z typowymi alternatywami, Intlayer zmniejsza rozmiar bundle'a i strony nawet o 50%. Zobacz [optymalizację bundle'a](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) oraz [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md).

</Question>

<Question title="Czy mogę zmigrować z svelte-i18n lub typesafe-i18n bez przepisywania moich komponentów?">

W znacznej mierze tak. Postępuj zgodnie z [przewodnikiem migracji z svelte-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/svelte-i18n.md). Możesz także migrować stopniowo: [wtyczka synchronizacji JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) utrzymuje Twoje istniejące pliki JSON jako źródło prawdy i generuje z nich słowniki Intlayer.

</Question>

<Question title="Czy mogę zachować moje istniejące pliki tłumaczeń JSON?">

Tak. Wtyczka [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) utrzymuje Twoje pliki `/messages/{locale}/{namespace}.json` jako źródło prawdy i generuje z nich słowniki Intlayer w obu kierunkach. Wtyczka [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md) robi to samo dla katalogów gettext, a [pliki per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/per_locale_file.md) pozwalają rozdzielić zawartość według języka zamiast grupować lokalizacje w jednym pliku.

</Question>

<Question title="Czy muszę przenosić moją zawartość klucz po kluczu?">

Nie. Uruchom `npx intlayer extract`, a Intlayer odczyta Twoje komponenty, wyodrębni ciągi widoczne dla użytkownika i utworzy plik `.content` obok każdego z nich, dzięki czemu przeglądasz diff zamiast ręcznie kopiować ciągi do katalogu pojedynczo.

W przypadku w pełni zautomatyzowanego procesu [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) robi to samo w czasie budowania: skanuje kod JSX, TSX, Vue i Svelte przy każdej zmianie, generuje słowniki i utrzymuje je w synchronizacji za pośrednictwem hot module replacement, dzięki czemu nie trzeba w ogóle ręcznie utrzymywać kluczy.

Warto pamiętać o dwóch ograniczeniach przed włączeniem kompilatora. Działa on w oparciu o analizę statyczną, więc ciągi tekstowe istniejące tylko w czasie wykonywania, takie jak kody błędów API czy pola z CMS, pozostają poza jego zasięgiem. Musi on także odróżnić tekst dla użytkownika od logiki aplikacji, takiej jak `className="active"` czy kod stanu, co w dużej bazie kodu wymaga kilku adnotacji. Polecenie [extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md) unika obu tych problemów, pozostawiając Ci pełną kontrolę.

</Question>

<Question title="Jakie narzędzia dla edytora i agentów AI są dostępne?">

Pięć narzędzi, wszystkie opcjonalne:

- **[Rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)**: przejście od klucza `useIntlayer` do pliku treści, który go deklaruje, wyodrębnianie treści z komponentu oraz uruchamianie build, fill, test, push i pull z palety poleceń lub dedykowanej karty Intlayer.
- **[Serwer LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**: taka sama świadomość w dowolnym edytorze obsługującym LSP, z funkcjami przejdź do definicji (go to definition), znajdź wszystkie referencje, podglądem przetłumaczonej wartości po najechaniu kursorem, autouzupełnianiem kluczy i pól oraz ostrzeżeniem, gdy klucz nie jest nigdzie zadeklarowany. Rozpoznaje również wywołania `i18next`, `react-i18next`, `next-intl` i `use-intl`, co ułatwia migrację.
- **[Serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)**: udostępnia dokumentację i CLI Intlayer dla Cursor, VS Code, Claude Desktop, Claude Code i ChatGPT, dzięki czemu asystent odpowiada na podstawie aktualnej dokumentacji zamiast zgadywać i może samodzielnie wykonywać polecenia, takie jak `intlayer fill`.
- **[Umiejętności agenta (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**: wyspecjalizowane umiejętności, takie jak `intlayer-config`, `intlayer-cli` i `intlayer-content`, oraz po jednej dla każdego frameworka, które uczą agenta konfiguracji routingu i typów węzłów treści.
- **[Wtyczka ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md)**: reguła `no-raw-text` oznacza zakodowane na stałe ciągi tekstowe, z dodatkowymi regułami dla statycznych kluczy słownika i nieużywanej zawartości.

</Question>

<Question title="Czy Intlayer działa z renderowaniem po stronie serwera (SSR) i prerenderowaniem w SvelteKit?">

Tak. Krok 7 opisuje wykrywanie języka po stronie serwera w `hooks.server.ts`, dzięki czemu pierwsza odpowiedź HTML zawiera już właściwy zlokalizowany tekst. Strony prerenderowane generują odrębne pliki HTML dla każdej lokalizacji.

</Question>

<Question title="Jak skonfigurować zlokalizowane trasy i międzynarodowe linki?">

Kroki 6 i 8 to opisują. Segment lokalizacji `[locale]` w drzewie tras oraz funkcja `getLocalizedUrl` dla linków utrzymują nawigację w aktywnym języku, przepisując ścieżki w przezroczysty sposób.

</Question>

<Question title="Jak zbudować przełącznik języka w Svelte?">

Krok 9 przedstawia komponent. Hook `useLocale` udostępnia aktywny język, listę zadeklarowanych języków oraz funkcję zmieniającą, która zapisuje wybór i aktualizuje adres URL.

</Question>

<Question title="Jak automatycznie przetłumaczyć aplikację SvelteKit za pomocą AI?">

Uruchom `npx intlayer fill`, który uzupełnia brakujące tłumaczenia za pomocą wybranego modelu LLM, korzystając z Twojego dostawcy i klucza API. Flaga `--git-diff` ogranicza operację do treści zmienionych na bieżącej gałęzi. Zobacz [polecenie fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md) oraz [integrację CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/CI_CD.md).

</Question>

<Question title="Czy Intlayer obsługuje formy mnogie, płeć i sformatowany tekst (rich text)?">

Tak: [formy mnogie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/plurial.md), [treści zależne od płci](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/gender.md), warunki, [wstawki (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/markdown.md) oraz [formatowania](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/formatters.md) dla liczb, dat i walut.

</Question>

<Question title="Jak tłumacze mogą edytować treść bez dotykania kodu?">

Za pośrednictwem [edytora wizualnego](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md), który działa na Twojej własnej infrastrukturze i pozwala każdemu edytować tekst bezpośrednio w działającej aplikacji, lub systemu [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md), który wyodrębnia treść, dzięki czemu może być zmieniana bez konieczności ponownego wdrażania.

</Question>

<Question title="Czy Intlayer jest darmowy i open source?">

Tak, na licencji Apache 2.0, włączając zastosowania komercyjne. Hostowany CMS to opcjonalna płatna usługa, którą można również [hostować samodzielnie (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md).

</Question>

</FAQ>
