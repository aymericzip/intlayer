---
createdAt: 2024-03-07
updatedAt: 2026-05-06
title: Astro + React i18n - Jak przetłumaczyć aplikację Astro + React w 2026 roku
description: Dowiedz się, jak dodać międzynarodowość (i18n) do swojej witryny Astro + React za pomocą Intlayer. Postępuj zgodnie z tym przewodnikiem, aby uczynić swoją witrynę wielojęzyczną.
keywords:
  - międzynarodowość
  - dokumentacja
  - Intlayer
  - Astro
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - react
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizacja użycia API useIntlayer w Solid do bezpośredniego dostępu do właściwości"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Dodano polecenie init"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Aktualizacja integracji z Astro, konfiguracji i użytkowania"
---

# Przetłumacz swoją witrynę Astro + React za pomocą Intlayer | Międzynarodowość (i18n)

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak umiędzynarodowić aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

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

## Przewodnik krok po kroku po konfiguracji Intlayer w Astro + React

Sprawdź [szablon aplikacji](https://github.com/aymericzip/intlayer-astro-template) na GitHubie.

### Krok 1: Zainstaluj zależności

Zainstaluj niezbędne pakiety za pomocą preferowanego menedżera pakietów:

```bash packageManager="npm"
npm install intlayer astro-intlayer react react-dom react-intlayer @astrojs/react

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer react react-dom react-intlayer @astrojs/react

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer react react-dom react-intlayer @astrojs/react

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer react react-dom react-intlayer @astrojs/react

bun x intlayer init
```

- **intlayer**
  Główny pakiet zapewniający narzędzia i18n do zarządzania konfiguracją, tłumaczeniami, [deklaracją treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilacją i [poleceniami CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **astro-intlayer**
  Wtyczka integracyjna Astro służąca do połączenia Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production); zawiera również oprogramowanie pośredniczące (middleware) do wykrywania preferowanego języka użytkownika, zarządzania plikami cookie i obsługi przekierowań URL.

- **react**, **react-dom**
  Podstawowe pakiety React używane do renderowania komponentów React w przeglądarce.

- **react-intlayer**
  Pakiet do integracji Intlayer z aplikacjami React. Zapewnia `IntlayerProvider` oraz hooki `useIntlayer` i `useLocale` dla międzynarodowości w React.

- **@astrojs/react**
  Oficjalna integracja Astro pozwalająca na używanie islandów komponentów React.

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

Dodaj wtyczkę `intlayer` do konfiguracji Astro oraz integrację React.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), react()],
});
```

> Wtyczka integracyjna `intlayer()` służy do integracji Intlayer z Astro. Zapewnia ona generowanie plików deklaracji treści i monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Astro i udostępnia aliasy w celu optymalizacji wydajności.

> Integracja `react()` pozwala na używanie islandów komponentów React poprzez `client:only="react"`.

### Krok 4: Zadeklaruj swoją treść

Twórz i zarządzaj swoimi deklaracjami treści, aby przechowywać tłumaczenia:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

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

Możesz konsumować słowniki bezpośrednio w swoich plikach `.astro`, używając podstawowych pomocników wyeksportowanych z `intlayer`. Powinieneś również dodać metadane SEO (takie jak linki hreflang i kanoniczne) na każdej stronie oraz wprowadzić island React dla interaktywnej treści po stronie klienta.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getHTMLTextDir,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";
import { ReactIsland } from "../../components/react/ReactIsland";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
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
    <!-- Island React renderuje całą interaktywną treść, w tym przełącznik języków -->
    <ReactIsland locale={locale} client:only="react" />
  </body>
</html>
```

> Jeśli chcesz użyć swojej treści w atrybucie `string`, takim jak `alt`, `title`, `href`, `aria-label` itp., możesz użyć wartości funkcji, np.:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> **Uwaga na temat konfiguracji routingu:**
> Używana przez Ciebie struktura katalogów zależy od ustawienia `middleware.routing` w `intlayer.config.ts`:
>
> - **`prefix-no-default` (domyślnie):** Zachowuje domyślny język w katalogu głównym (bez prefiksu) i dodaje prefiksy do pozostałych. Użyj `[...locale]`, aby obsłużyć wszystkie przypadki.
> - **`prefix-all`:** Wszystkie adresy URL otrzymują prefiks języka. Możesz użyć standardowego `[locale]`, jeśli nie musisz traktować katalogu głównego oddzielnie.
> - **`search-param` o `no-prefix`:** Katalogi językowe nie są wymagane. Język jest zarządzany za pomocą parametrów zapytania lub plików cookie.

### Krok 6: Utworzenie komponentu React Island

Utwórz komponent island, który opakowuje Twoją aplikację React i otrzymuje język wykryty przez serwer:

```tsx fileName="src/components/react/ReactIsland.tsx"
/** @jsxImportSource react */
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { type LocalesValues } from "intlayer";
import { LocaleSwitcher } from "./LocaleSwitcher";

function App() {
  const { title } = useIntlayer("app");

  return (
    <div>
      <h1>{title}</h1>
      <LocaleSwitcher />
    </div>
  );
}

export function ReactIsland({ locale }: { locale: LocalesValues }) {
  return (
    <IntlayerProvider locale={locale}>
      <App />
    </IntlayerProvider>
  );
}
```

> Prop `locale` jest przekazywany ze strony Astro (wykrywanie po stronie serwera) do `IntlayerProvider`, służąc jako początkowy język dla wszystkich hooków React wewnątrz drzewa.

### Krok 7: Dodanie przełącznika języków

Utwórz komponent React `LocaleSwitcher`, który odczytuje dostępne języki i przechodzi do zlokalizowanego adresu URL, gdy użytkownik wybierze nowy język:

```tsx fileName="src/components/react/LocaleSwitcher.tsx"
/** @jsxImportSource react */
import { useLocale } from "react-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

export function LocaleSwitcher() {
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      // Przekieruj do zlokalizowanego adresu URL przy zmianie języka
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  return (
    <div className="locale-switcher">
      <span className="switcher-label">Zmień język:</span>
      <div className="locale-buttons">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            onClick={() => setLocale(localeItem)}
            className={`locale-btn ${localeItem === locale ? "active" : ""}`}
            disabled={localeItem === locale}
          >
            <span className="ls-own-name">{getLocaleName(localeItem)}</span>
            <span className="ls-current-name">
              {getLocaleName(localeItem, locale)}
            </span>
            <span class="ls-code">{localeItem.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

> **Uwaga na temat trwałości:**
> Użycie `onLocaleChange` do przekierowania przez `window.location.href` zapewnia, że nowy adres URL z prefiksem językowym zostanie odwiedzony. Pozwala to oprogramowaniu pośredniczącemu Intlayer ustawić plik cookie języka i zapamiętać preferencje użytkownika przy przyszłych wizytach.

> `LocaleSwitcher` musi być renderowany wewnątrz `IntlayerProvider` - użyj go w swoim komponencie island (jak pokazano w kroku 6).

### Krok 8: Sitemap i Robots.txt

Intlayer oferuje narzędzia do dynamicznego generowania zlokalizowanej mapy witryny oraz pliku robots.txt.

#### Sitemap

Intlayer comes with a built-in sitemap generator to help you create a sitemap for your application easily. It handles localized routes and adds the necessary metadata for search engines.

> The Intlayer generated sitemap supports the `xhtml:link` namespace (Hreflang XML Extensions). Unlike the default sitemap generators that only list raw URLs, Intlayer automatically creates the required bidirectional links between all language versions of a page (e.g., `/about`, `/about?lang=fr`, and `/about?lang=es`). This ensures search engines correctly index and serve the right language version to the right audience.

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

### (Opcjonalnie) Krok 17 : Wyodrębnij zawartość swoich komponentów

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

---

### Pogłębiaj swoją wiedzę

Jeśli chcesz dowiedzieć się więcej, możesz również wdrożyć [Edytor Wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub użyć [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md), aby wyeksternalizować swoją treść.
