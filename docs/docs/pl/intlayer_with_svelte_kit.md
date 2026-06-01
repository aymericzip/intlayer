---
createdAt: 2025-11-20
updatedAt: 2026-05-31
title: SvelteKit i18n - Kompletny przewodnik po tłumaczeniu SvelteKit
description: Najlepsze rozwiązanie dla rozmiaru bundle, SEO, wydajności & utrzymania. Uczyń swój SvelteKit stronę internetową wielojęzycznym w 2026, tłumaczenie LLM, Agent Skills & MCP.
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

**Pełne pokrycie SvelteKit**

Intlayer jest zoptymalizowany do doskonałej współpracy z SvelteKit, oferując **routing wielojęzyczny**, **obsługę SSR** i wszystkie funkcje potrzebne do skalowania internacjonalizacji (i18n).

**Rozmiar bundle'a**

Zamiast ładować ogromne pliki JSON na swoje strony, ładuj tylko niezbędną treść. Intlayer pomaga **zmniejszyć rozmiary bundle'a i stron nawet o 50%**.

**Łatwość konserwacji**

Określanie zakresu zawartości aplikacji **ułatwia konserwację** aplikacji na dużą skalę. Możesz powielić lub usunąć pojedynczy folder funkcji bez obciążania psychicznego koniecznością przeglądania całej bazy kodu zawartości. Dodatkowo Inlayer jest **w pełni napisany**, aby zapewnić dokładność treści.

**Agent AI**

Wspólna lokalizacja treści **zmniejsza potrzebny kontekst** dzięki modelom dużego języka (LLM). Intlayer zawiera także zestaw narzędzi, taki jak **CLI** do sprawdzania brakujących tłumaczeń**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** i **[umiejętności agenta](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, aby praca programisty (DX) była jeszcze płynniejsza dla agentów AI.

**Automatyzacja**

Korzystaj z automatyzacji, aby tłumaczyć w swoim potoku CI/CD przy użyciu wybranego LLM na koszt dostawcy sztucznej inteligencji. Intlayer oferuje także **kompilator** do automatyzacji ekstrakcji treści, a także [platformę internetową] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), która pomaga **tłumaczyć w tle**.

**Wydajność**

Łączenie ogromnych plików JSON z komponentami może prowadzić do problemów z wydajnością i reaktywnością. Inlayer optymalizuje ładowanie treści w czasie kompilacji.

**Skalowanie bez użycia dewelopera**

Więcej niż tylko rozwiązanie i18n, Intlayer zapewnia **samodzielny [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** i **[pełny CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, który pomoże Ci zarządzać wielojęzyczną treścią w **w czasie rzeczywistym**, dzięki czemu współpraca z tłumaczami, copywriterami i innymi członkami zespołu będzie płynna. Treść może być przechowywana lokalnie i/lub zdalnie.

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

<Steps>

<Step number={1} title="Instalacja zależności">

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bun x intlayer init
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

</Step>

<Step number={5} title="Wykorzystaj Intlayer w swoich komponentach">

Teraz możesz użyć funkcji `useIntlayer` w dowolnym komponencie Svelte. Zwraca ona reaktywny store, który automatycznie aktualizuje się, gdy zmienia się lokalizacja. Funkcja automatycznie uwzględnia aktualną lokalizację (zarówno podczas SSR, jak i nawigacji po stronie klienta).

> **Uwaga:** `useIntlayer` zwraca store Svelte, więc musisz użyć prefiksu `---
> createdAt: 2025-11-20
> updatedAt: 2026-05-31
> title: Jak przetłumaczyć swoją aplikację SvelteKit – przewodnik i18n 2026
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

</Step>

</Steps>

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

<Steps>

<Step number={1} title="Instalacja zależności">

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npm install intlayer svelte-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer svelte-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer svelte-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer svelte-intlayer
bun add vite-intlayer --save-dev
bun x intlayer init
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

> `getLocaleFromStorage` sprawdzi lokalizację na podstawie nagłówka lub ciasteczka w zależności od Twojej konfiguracji. Zobacz [Konfiguracja](https://intlayer.org/doc/configuration) po więcej szczegółów.

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

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    intlayerProxy(), // should be placed first
    intlayer(),
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

Zaktualizuj `vite.config.ts`, aby dołączyć wtyczkę `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Dodaje wtyczkę kompilatora
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
