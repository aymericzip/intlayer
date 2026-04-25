---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Svelte i18n - Jak przetłumaczyć aplikację Astro + Svelte w 2026 roku
description: Dowiedz się, jak dodać międzynarodowość (i18n) do swojej witryny Astro + Svelte za pomocą Intlayer. Postępuj zgodnie z tym przewodnikiem, aby uczynić swoją witrynę wielojęzyczną.
keywords:
  - międzynarodowość
  - dokumentacja
  - Intlayer
  - Astro
  - Svelte
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - svelte
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Początkowa dokumentacja dla Astro + Svelte"
---

# Przetłumacz swoją witrynę Astro + Svelte za pomocą Intlayer | Międzynarodowość (i18n)

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna biblioteka międzynarodowości (i18n) o otwartym kodzie źródłowym, zaprojektowana w celu uproszczenia obsługi wielojęzyczności w nowoczesnych aplikacjach internetowych.

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami**: Korzystając z deklaratywnych słowników na poziomie komponentów.
- **Dynamicznie lokalizować metadane, trasy i treści**.
- **Zapewnić obsługę TypeScript**: Dzięki automatycznie generowanym typom dla lepszego autouzupełniania i wykrywania błędów.
- **Korzystać z zaawansowanych funkcji**: Takich jak dynamiczne wykrywanie języka i przełączanie języków.

---

## Przewodnik krok po kroku po konfiguracji Intlayer w Astro + Svelte

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak umiędzynarodowić aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Sprawdź [szablon aplikacji](https://github.com/aymericzip/intlayer-astro-template) na GitHubie.

### Krok 1: Zainstaluj zależności

Zainstaluj niezbędne pakiety za pomocą preferowanego menedżera pakietów:

```bash packageManager="npm"
npm install intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer svelte svelte-intlayer @astrojs/svelte

bun x intlayer init
```

- **intlayer**
  Główny pakiet zapewniający narzędzia i18n do zarządzania konfiguracją, tłumaczeniami, [deklaracją treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilacją i [poleceniami CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **astro-intlayer**
  Wtyczka integracyjna Astro służąca do połączenia Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production); zawiera również oprogramowanie pośredniczące (middleware) do wykrywania preferowanego języka użytkownika, zarządzania plikami cookie i obsługi przekierowań URL.

- **svelte**
  Podstawowe pakiety Svelte.

- **svelte-intlayer**
  Pakiet do integracji Intlayer z aplikacjami Svelte. Zapewnia `setupIntlayer` oraz store'y `useIntlayer` i `useLocale` dla międzynarodowości w Svelte.

- **@astrojs/svelte**
  Oficjalna integracja Astro pozwalająca na używanie islandów komponentów Svelte.

### Krok 2: Skonfiguruj swój projekt

Utwórz plik konfiguracyjny, aby zdefiniować języki swojej aplikacji:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.POLISH,
      // Twoje inne języki
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Za pośrednictwem tego pliku konfiguracyjnego możesz ustawić zlokalizowane adresy URL, przekierowania oprogramowania pośredniczącego, nazwy plików cookie, lokalizację i rozszerzenia deklaracji treści, wyłączyć dzienniki Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 3: Zintegruj Intlayer ze swoją konfiguracją Astro

Dodaj wtyczkę `intlayer` do konfiguracji Astro oraz integrację Svelte.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), svelte()],
});
```

> Wtyczka integracyjna `intlayer()` służy do integracji Intlayer z Astro. Zapewnia ona generowanie plików deklaracji treści i monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Astro i udostępnia aliasy w celu optymalizacji wydajności.

> Integracja `svelte()` pozwala na używanie islandów komponentów Svelte poprzez `client:only="svelte"`.

### Krok 4: Zadeklaruj swoją treść

Twórz i zarządzaj swoimi deklaracjami treści, aby przechowywać tłumaczenia:

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      pl: "Witaj świecie",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Deklaracje treści mogą być definiowane w dowolnym miejscu aplikacji, pod warunkiem, że są zawarte w `contentDir` (domyślnie `./src`) i pasują do rozszerzenia pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Więcej informacji znajdziesz w [dokumentacji deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Krok 5: Korzystanie z treści w Astro

Możesz konsumować słowniki bezpośrednio w swoich plikach `.astro`, używając podstawowych pomocników wyeksportowanych z `intlayer`. Powinieneś również dodać metadane SEO (takie jak linki hreflang i kanoniczne) na każdej stronie oraz wprowadzić island Svelte dla interaktywnej treści po stronie klienta.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";
import SvelteIsland from "../../components/svelte/SvelteIsland.svelte";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Link kanoniczny: Informuje wyszukiwarki o głównej wersji tej strony -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Informuje Google o wszystkich zlokalizowanych wersjach -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <!-- x-default: Opcja rezerwowa, gdy język nie pasuje do języka użytkownika -->
    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <!-- Island Svelte renderuje całą interaktywną treść, w tym przełącznik języków -->
    <SvelteIsland locale={locale} client:only="svelte" />
  </body>
</html>
```

> **Uwaga na temat konfiguracji routingu:**
> Używana przez Ciebie struktura katalogów zależy od ustawienia `middleware.routing` w `intlayer.config.ts`:
>
> - **`prefix-no-default` (domyślnie):** Zachowuje domyślny język w katalogu głównym (bez prefiksu) i dodaje prefiksy do pozostałych. Użyj `[...locale]`, aby obsłużyć wszystkie przypadki.
> - **`prefix-all`:** Wszystkie adresy URL otrzymują prefiks języka. Możesz użyć standardowego `[locale]`, jeśli nie musisz traktować katalogu głównego oddzielnie.
> - **`search-param` lub `no-prefix`:** Katalogi językowe nie są wymagane. Język jest zarządzany za pomocą parametrów zapytania lub plików cookie.

### Krok 6: Utworzenie komponentu Svelte Island

Utwórz komponent island, który opakowuje Twoją aplikację Svelte. Musisz wywołać `setupIntlayer` z językiem wykrytym przez serwer przed uzyskaniem dostępu do store'ów.

```svelte fileName="src/components/svelte/SvelteIsland.svelte"
<script lang="ts">
  import { useIntlayer, useLocale, setupIntlayer } from "svelte-intlayer";
  import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

  export let locale: LocalesValues;

  setupIntlayer(locale);

  const content = useIntlayer("app");
  const { locale: currentLocale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });
</script>

<div>
  <h1>{$content.title}</h1>
  <!-- Przełącznik języków renderowany bezpośrednio wewnątrz island -->
  <div class="locale-switcher">
    <span class="switcher-label">Zmień język:</span>
    <div class="locale-buttons">
      {#each availableLocales as localeItem}
        <button
          class="locale-btn {localeItem === $currentLocale ? 'active' : ''}"
          disabled={localeItem === $currentLocale}
          on:click={() => setLocale(localeItem)}
        >
          <span class="ls-own-name">{getLocaleName(localeItem)}</span>
          <span class="ls-current-name">{getLocaleName(localeItem, $currentLocale)}</span>
          <span class="ls-code">{localeItem.toUpperCase()}</span>
        </button>
      {/each}
    </div>
  </div>
</div>
```

> Prop `locale` jest przekazywany ze strony Astro (wykrywanie po stronie serwera) i służy do zainicjowania `setupIntlayer`, ustawiając początkowy język dla wszystkich store'ów w komponencie.

### Krok 7: Dodanie przełącznika języków

Funkcjonalność przełączania języków jest zintegrowana bezpośrednio z island Svelte (patrz krok 6 powyżej). Wykorzystuje store `useLocale` z `svelte-intlayer` i przechodzi do zlokalizowanego adresu URL, gdy użytkownik wybierze nowy język:

```svelte fileName="src/components/svelte/SvelteIsland.svelte"
<script lang="ts">
  import { useLocale } from "svelte-intlayer";
  import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

  // Przejmij tę samą logikę locale/setupIntlayer z kroku 6...

  const {
    locale: currentLocale,
    availableLocales,
    setLocale,
  } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      // Przekieruj do zlokalizowanego adresu URL przy zmianie języka
      window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
    },
  });
</script>

<div class="locale-switcher">
  <span class="switcher-label">Zmień język:</span>
  <div class="locale-buttons">
    {#each availableLocales as localeItem}
      <button
        class="locale-btn {localeItem === $currentLocale ? 'active' : ''}"
        disabled={localeItem === $currentLocale}
        on:click={() => setLocale(localeItem)}
      >
        <span class="ls-own-name">{getLocaleName(localeItem)}</span>
        <span class="ls-current-name">{getLocaleName(localeItem, $currentLocale)}</span>
        <span class="ls-code">{localeItem.toUpperCase()}</span>
      </button>
    {/each}
  </div>
</div>
```

> **Uwaga na temat trwałości:**
> Użycie `onLocaleChange` do przekierowania przez `window.location.href` zapewnia, że nowy adres URL z prefiksem językowym zostanie odwiedzony. Pozwala to oprogramowaniu pośredniczącemu Intlayer ustawić plik cookie języka i zapamiętać preferencje użytkownika przy przyszłych wizytach.

### Krok 8: Sitemap i Robots.txt

Intlayer oferuje narzędzia do dynamicznego generowania zlokalizowanej mapy witryny oraz pliku robots.txt.

#### Sitemap

Utwórz plik `src/pages/sitemap.xml.ts`, aby wygenerować mapę witryny obejmującą wszystkie Twoje zlokalizowane trasy.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

Utwórz plik `src/pages/robots.txt.ts`, aby kontrolować indeksowanie przez wyszukiwarki.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### Konfiguracja TypeScript

Intlayer wykorzystuje rozszerzenie modułów (module augmentation), aby skorzystać z TypeScript, czyniąc bazę kodu bardziej solidną.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation Error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Upewnij się, że Twoja konfiguracja TypeScript zawiera automatycznie generowane typy.

```json5 fileName="tsconfig.json"
{
  // ... Twoja istniejąca konfiguracja TypeScript
  "include": [
    // ... Twoja istniejąca konfiguracja TypeScript
    ".intlayer/**/*.ts", // Uwzględnij automatycznie generowane typy
  ],
}
```

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Zapobiega to ich przesyłaniu do repozytorium Git.

Aby to zrobić, dodaj następujące instrukcje do pliku `.gitignore`:

```bash
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić wrażenia z programowania z Intlayer, możesz zainstalować **oficjalne rozszerzenie Intlayer dla VS Code**.

[Instalacja z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd inline** przetłumaczonej treści.
- **Szybkie akcje** do łatwego tworzenia i aktualizowania tłumaczeń.

Więcej informacji na temat korzystania z rozszerzenia znajdziesz w [dokumentacji rozszerzenia VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Pogłębiaj swoją wiedzę

Jeśli chcesz dowiedzieć się więcej, możesz również wdrożyć [Edytor Wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub użyć [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md), aby wyeksternalizować swoją treść.
