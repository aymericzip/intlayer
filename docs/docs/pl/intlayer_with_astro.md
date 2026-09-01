---
createdAt: 2024-03-07
updatedAt: 2026-05-31
title: "Astro i18n - Kompletny przewodnik po tłumaczeniu swojej aplikacji"
description: "Koniec z i18next. Przewodnik 2026 do budowania wielojęzycznej (i18n) aplikacji Astro. Tłumacz z agentami AI i optymalizuj rozmiar bundle, SEO i wydajność."
keywords:
  - międzynarodowość
  - dokumentacja
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
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
author: aymericzip
---

# Przetłumacz swoją witrynę Astro za pomocą Intlayer | Międzynarodowość (i18n)

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

## Dlaczego Interlayer zamiast alternatyw?

W porównaniu do głównych rozwiązań, takich jak „astro-i18n” czy „i18next”, Intlayer jest rozwiązaniem wyposażonym w zintegrowane optymalizacje, takie jak:

<AccordionGroup>
<Accordion header="Pełny zasięg Astro">

Intlayer jest zoptymalizowany do doskonałej współpracy z Astro, oferując **wielojęzyczny routing**, **mapę witryny** i wszystkie funkcje potrzebne do skalowania internacjonalizacji (i18n).

</Accordion>

<Accordion header="Rozmiar bundle'a">

Zamiast ładować ogromne pliki JSON na swoje strony, ładuj tylko niezbędną treść. Intlayer pomaga **zmniejszyć rozmiary bundle'a i stron nawet o 50%**.

</Accordion>

<Accordion header="Łatwość konserwacji">

Określanie zakresu zawartości aplikacji **ułatwia konserwację** aplikacji na dużą skalę. Możesz powielić lub usunąć pojedynczy folder funkcji bez obciążania psychicznego koniecznością przeglądania całej bazy kodu zawartości. Dodatkowo Inlayer jest **w pełni napisany**, aby zapewnić dokładność treści.

</Accordion>

<Accordion header="AI Agent">

Wspólna lokalizacja treści **zmniejsza potrzebny kontekst** dzięki modelom dużego języka (LLM). Intlayer zawiera także zestaw narzędzi, taki jak **CLI** do sprawdzania brakujących tłumaczeń**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** i **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**, aby praca programisty (DX) była jeszcze płynniejsza dla agentów AI.

</Accordion>

<Accordion header="Automatyzacja">

Korzystaj z automatyzacji, aby tłumaczyć w swoim potoku CI/CD przy użyciu wybranego LLM na koszt dostawcy sztucznej inteligencji. Intlayer oferuje także **kompilator** do automatyzacji ekstrakcji treści, a także [platformę internetową] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), która pomaga **tłumaczyć w tle**.

</Accordion>

<Accordion header="Wydajność">

Łączenie ogromnych plików JSON z komponentami może prowadzić do problemów z wydajnością i reaktywnością. Inlayer optymalizuje ładowanie treści w czasie kompilacji.

</Accordion>

<Accordion header="Skalowanie bez użycia dewelopera">

Więcej niż tylko rozwiązanie i18n, Intlayer zapewnia **samodzielny [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** i **[pełny CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, który pomoże Ci zarządzać wielojęzyczną treścią w **w czasie rzeczywistym**, dzięki czemu współpraca z tłumaczami, copywriterami i innymi członkami zespołu będzie płynna. Treść może być przechowywana lokalnie i/lub zdalnie.

</Accordion>
</AccordionGroup>

---

## Przewodnik krok po kroku po konfiguracji Intlayer w Astro

Sprawdź [szablon aplikacji](https://github.com/aymericzip/intlayer-astro-template) na GitHubie.

<Steps>

<Step number={1} title="Zainstaluj zależności">

Zainstaluj niezbędne pakiety za pomocą preferowanego menedżera pakietów:

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

> flaga `--interactive` jest opcjonalna. Użyj `intlayer-cli init` jeśli jesteś agentem AI.

> To polecenie wykryje twoje środowisko i zainstaluje wymagane pakiety. Na przykład:

```bash packageManager="npm"
npm install intlayer astro-intlayer
```

```bash packageManager="npm"
npm install intlayer astro-intlayer
# opcjonalnie: jeśli chcesz dodać obsługę islandów React
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# opcjonalnie: jeśli chcesz dodać obsługę islandów React
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# opcjonalnie: jeśli chcesz dodać obsługę islandów React
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Główny pakiet zapewniający narzędzia i18n do zarządzania konfiguracją, tłumaczeniami, [deklaracją treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilacją i [poleceniami CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **astro-intlayer**
  Wtyczka integracyjna Astro służąca do połączenia Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production); zawiera również oprogramowanie pośredniczące (middleware) do wykrywania preferowanego języka użytkownika, zarządzania plikami cookie i obsługi przekierowań URL.

</Step>

<Step number={2} title="Skonfiguruj swój projekt">

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

</Step>

<Step number={3} title="Zintegruj Intlayer ze swoją konfiguracją Astro">

Dodaj wtyczkę `intlayer` do konfiguracji Astro.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Wtyczka integracyjna `intlayer()` służy do integracji Intlayer z Astro. Zapewnia ona generowanie plików deklaracji treści i monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Astro i udostępnia aliasy w celu optymalizacji wydajności.

</Step>

<Step number={4} title="Zadeklaruj swoją treść">

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

> Deklaracje treści mogą być definiowane w dowolnym miejscu aplikacji, pod warunkiem, że są zawarte w `contentDir` (domyślnie `./src`) i pasują do rozszerzenia pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Więcej informacji znajdziesz w [dokumentacji deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

</Step>

<Step number={5} title="Korzystanie z treści w Astro">

Możesz konsumować słowniki bezpośrednio w swoich plikach `.astro`, używając podstawowych pomocników wyeksportowanych z `intlayer`.

```astro fileName="src/pages/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  defaultLocale,
  localeMap,
  getHTMLTextDir,
  type LocalesValues,
} from "intlayer";
import LocaleSwitcher from "../components/LocaleSwitcher.astro";

// Get the current locale from the URL (e.g. /es/about -> 'es')
const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;

// Get the content for the 'app' dictionary
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Canonical link: Tells search engines which is the primary version of this page -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Tell Google about all localized versions -->
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

    <!-- x-default: Fallback for users in unmatched languages -->
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
    <header>
      <LocaleSwitcher />
    </header>
    <main>
      <h1>{title}</h1>
    </main>
  </body>
</html>
```

</Step>

<Step number={6} title="Zlokalizowany routing">

Twórz dynamiczne segmenty tras (np. `src/pages/[locale]/index.astro`), aby serwować zlokalizowane strony:

```astro fileName="src/pages/[locale]/index.astro"
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

> **Uwaga dotycząca konfiguracji routingu:**
> Struktura katalogów, którą używasz, zależy od ustawienia `middleware.routing` w pliku `intlayer.config.ts`:
>
> - **`prefix-no-default` (domyślnie):** Przechowuje domyślny język w katalogu głównym (bez prefiksu) i dodaje prefiksy do pozostałych. Użyj `[...locale]`, aby uwzględnić wszystkie przypadki.
> - **`prefix-all`:** Wszystkie adresy URL mają prefiks języka. Możesz użyć standardowego `[locale]`, jeśli nie musisz obsługiwać katalogu głównego osobno.
> - **`search-param` lub `no-prefix`:** Folder z językiem nie jest potrzebny. Język jest obsługiwany za pośrednictwem parametrów wyszukiwania lub ciasteczek.

</Step>

<Step number={7} title="Dodaj przełącznik języka">

Integracja z Astro dodaje oprogramowanie pośredniczące Vite, które pomaga w routingu uwzględniającym język i definiowaniu środowiska podczas programowania. Możesz również użyć własnej logiki lub narzędzi `intlayer`, takich jak `getLocalizedUrl`, aby tworzyć linki między językami.

```astro fileName="src/components/LocaleSwitcher.astro"
---
import {
  locales,
  getLocaleName,
  getLocalizedUrl,
  getLocaleFromPath,
  getPathWithoutLocale,
  type LocalesValues,
} from "intlayer";

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const pathWithoutLocale = getPathWithoutLocale(Astro.url.pathname);
---

<nav>
  {
    locales.map((localeItem) => (
      <a
        href={getLocalizedUrl(pathWithoutLocale, localeItem)}
        data-locale={localeItem}
        aria-current={localeItem === locale ? "page" : undefined}
      >
        {getLocaleName(localeItem)}
      </a>
    ))
  }
</nav>

<script>
  import { setLocaleInStorageClient, getLocalizedUrl, type LocalesValues } from "intlayer";

  const localeLinks = document.querySelectorAll("[data-locale]");

  localeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const locale = link.getAttribute("data-locale") as LocalesValues;

      // Zaktualizuj ciasteczko ustawień lokalizacji
      setLocaleInStorageClient(locale);
    });
  });
</script>

<style>
  nav {
    display: flex;
    gap: 1rem;
  }
  a[aria-current="page"] {
    font-weight: bold;
    text-decoration: underline;
  }
</style>
```

> **Uwaga na temat trwałości:**
> Użycie `setLocaleInStorageClient` w skrypcie po stronie klienta zapewnia, że preferencja językowa użytkownika jest zapisywana w pliku cookie. Pozwala to middleware'owi Intlayer zapamiętać wybór i automatycznie przekierować użytkownika do preferowanego języka przy kolejnych wizytach.

</Step>

<Step number={8} title="Sitemap i Robots.txt">

Intlayer udostępnia narzędzia do dynamicznego generowania zlokalizowanych map witryny (sitemaps) i plików robots.txt.

#### Mapa witryny

Intlayer zawiera wbudowany generator mapy witryny, który ułatwia tworzenie mapy witryny dla aplikacji. Obsługuje zlokalizowane trasy i dodaje niezbędne metadane dla wyszukiwarek.

> Mapa witryny generowana przez Intlayer obsługuje przestrzeń nazw `xhtml:link` (Hreflang XML Extensions). W przeciwieństwie do domyślnych generatorów map witryny, które wymieniają tylko surowe adresy URL, Intlayer automatycznie tworzy wymagane dwukierunkowe linki między wszystkimi wersjami językowych strony (np. `/about`, `/about?lang=fr` i `/about?lang=es`). Zapewnia to, że wyszukiwarki prawidłowo indeksują i serwują odpowiednią wersję językową właściwej grupie odbiorców.

Utwórz `src/pages/sitemap.xml.ts`, aby wygenerować mapę witryny zawierającą wszystkie zlokalizowane trasy.

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

Utwórz `src/pages/robots.txt.ts` aby kontrolować crawlowanie wyszukiwarek.

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

</Step>

<Step number={9} title="Kontynuuj używanie swojej ulubionej frameworku">

Kontynuuj używanie swojej ulubionej frameworku do budowania aplikacji.

- Intlayer + React: [Intlayer with React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_astro_react.md)
- Intlayer + Vue: [Intlayer with Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_astro_vue.md)
- Intlayer + Svelte: [Intlayer with Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_astro_svelte.md)
- Intlayer + Solid: [Intlayer with Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_astro_solid.md)
- Intlayer + Preact: [Intlayer with Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_astro_preact.md)
- Intlayer + Lit: [Intlayer with Lit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_astro_lit.md)
- Intlayer + Vanilla JS: [Intlayer with Vanilla JS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_astro_vanilla.md)
  </Step>

<Step number={15} title="Wyodrębnij treść swoich komponentów" isOptional={true}>

Jeśli posiadasz istniejącą bazę kodu, transformacja tysięcy plików może być czasochłonna.

Aby ułatwić ten proces, Intlayer proponuje [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md) do transformacji komponentów i wyodrębnienia treści.

Aby to skonfigurować, możesz dodać sekcję `compiler` w pliku `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Reszta konfiguracji
  compiler: {
    /**
     * Wskazuje, czy compiler powinien być włączony.
     */
    enabled: true,

    /**
     * Definiuje ścieżkę plików wyjściowych
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Wskazuje, czy komponenty powinny być zapisane po transformacji.
     *
     * - Jeśli `true`, compiler przepisze plik komponentu na dysku. Transformacja będzie trwała, a compiler pominąć transformację w następnym procesie. W ten sposób compiler może transformować aplikację, a następnie można go usunąć.
     *
     * - Jeśli `false`, compiler wstrzyknie wywołanie funkcji `useIntlayer()` do kodu w outputzie budowania, i zachowa intaktną bazę kodu. Transformacja będzie wykonana tylko w pamięci.
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
 <Tab value='Polecenie Extract'>

Uruchom extractor, aby transformować komponenty i wyodrębnić treść

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
 <Tab value='Babel compiler'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Zaktualizuj `vite.config.ts` aby dodać plugin `intlayerCompiler`:

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
pnpm run build # Lub pnpm run dev
```

```bash packageManager="yarn"
yarn build # Lub yarn dev
```

```bash packageManager="bun"
bun run build # Lub bun run dev
```

 </Tab>
</Tabs>

</Step>

</Steps>

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

## Często Zadawane Pytania

<FAQ>

<Question title="Jakie są różne rozwiązania dostępne do internacjonalizacji witryny Astro?">

Astro posiada opcję `i18n` na poziomie routingu, która obsługuje prefiksy i przekierowania, ale nie zarządza samą treścią, więc nadal potrzebna jest warstwa wiadomości:

- **Wbudowane `i18n` w Astro** z ręcznie tworzonymi słownikami JSON lub TypeScript: brak zależności, ale brak typowania, reguł liczby mnogiej i narzędzi.
- **`i18next`** lub **`vue-i18n` / `svelte-i18n`** wewnątrz wysp (islands): osobna biblioteka dla każdego frameworka wyspy, każda z własnym katalogiem.
- **`Intlayer`**: jedna warstwa treści współdzielona przez strony Astro i każdy framework wyspy, kompilowana w czasie budowania, w pełni typowana, z tłumaczeniem AI, edytorem wizualnym i systemem CMS.

Zaletą w Astro jest to, że ten sam słownik obsługuje stronę `.astro` oraz wyspę React, Vue, Svelte, Solid, Preact lub Lit, zamiast osobnej biblioteki i18n na każde środowisko wyspy. Zobacz [dlaczego Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md).

</Question>

<Question title="O ile i18n zwiększa rozmiar mojego bundle'a w Astro?">

Znacznie mniej niż rozwiązania oparte na przestrzeniach nazw, ponieważ strona nigdy nie pobiera katalogu, którego nie renderuje. Strony Astro są renderowane w czasie budowania, więc dostarczają przetłumaczony HTML bez żadnego słownika; tylko wyspy go otrzymują. Kompilator czasu budowy rozwiązuje odwołania do treści do dokładnych wpisów używanych przez komponent, a [słowniki dynamiczne](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md) dzielą resztę na poszczególne języki. W porównaniu z typowymi alternatywami, Intlayer zmniejsza rozmiar bundle'a i strony nawet o 50%. Zobacz [optymalizację bundle'a](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) oraz [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md).

</Question>

<Question title="Czy mogę zmigrować z i18next lub ręcznie pisanego słownika bez przepisywania moich komponentów?">

W znacznej mierze tak. Postępuj zgodnie z [przewodnikiem migracji z i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md), aby przenieść treść. Możesz także migrować stopniowo: [wtyczka synchronizacji JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) utrzymuje Twoje istniejące katalogi JSON jako źródło prawdy i generuje z nich słowniki Intlayer, dzięki czemu obie warstwy pozostają zsynchronizowane podczas przenoszenia komponentów pojedynczo.

</Question>

<Question title="Czy mogę zachować moje istniejące pliki tłumaczeń JSON?">

Tak. [Wtyczka synchronizacji JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) utrzymuje Twoje pliki `/messages/{locale}/{namespace}.json` jako źródło prawdy i generuje słowniki Intlayer w obu kierunkach. [Wtyczka synchronizacji PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md) robi to samo dla katalogów gettext, a [pliki per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/per_locale_file.md) pozwalają rozdzielić treść według języka zamiast grupować lokalizacje w jednym pliku.

</Question>

<Question title="Czy muszę przenosić moją zawartość klucz po kluczu?">

Nie. Uruchom `npx intlayer extract`, a Intlayer odczyta Twoje komponenty, wyodrębni ciągi widoczne dla użytkownika i utworzy plik `.content` obok każdego z nich, dzięki czemu przeglądasz diff zamiast ręcznie kopiować ciągi do katalogu pojedynczo. Krok 15 tego przewodnika to opisuje.

W przypadku w pełni zautomatyzowanego procesu [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) robi to samo w czasie budowania: skanuje kod źródłowy JSX, TSX, Vue i Svelte przy każdej zmianie, generuje słowniki i utrzymuje je zsynchronizowane przez HMR, dzięki czemu nie trzeba ręcznie zarządzać kluczami.

Warto znać dwa ograniczenia przed włączeniem kompilatora. Działa on przez analizę statyczną, więc ciągi istniejące tylko w czasie wykonywania, takie jak kody błędów API czy pola z CMS, pozostają poza zasięgiem. Ponadto musi odróżniać tekst użytkownika od logiki aplikacji (np. `className="active"` czy kod statusu), co wymaga pewnych adnotacji w dużych bazach kodu. Polecenie [extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md) unika obu tych problemów, pozostawiając Ci pełną kontrolę.

</Question>

<Question title="Jakie narzędzia dla edytora i agentów AI są dostępne?">

Pięć narzędzi, wszystkie opcjonalne:

- **[Rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)**: przejście od klucza `useIntlayer` do pliku treści, który go deklaruje, wyodrębnianie treści z komponentu oraz uruchamianie build, fill, test, push i pull z palety poleceń lub dedykowanej karty Intlayer.
- **[Serwer LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**: taka sama świadomość w dowolnym edytorze obsługującym LSP, z funkcjami przejdź do definicji (go to definition), znajdź wszystkie referencje, podglądem przetłumaczonej wartości po najechaniu kursorem, autouzupełnianiem kluczy i pól oraz ostrzeżeniem, gdy klucz nie jest nigdzie zadeklarowany. Rozpoznaje również wywołania `i18next`, `react-i18next`, `next-intl` i `use-intl`, co ułatwia migrację.
- **[Serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)**: udostępnia dokumentację i CLI Intlayer dla Cursor, VS Code, Claude Desktop, Claude Code i ChatGPT, dzięki czemu asystent odpowiada na podstawie aktualnej dokumentacji zamiast zgadywać i może samodzielnie wykonywać polecenia, takie jak `intlayer fill`.
- **[Umiejętności agenta (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**: wyspecjalizowane umiejętności, takie jak `intlayer-config`, `intlayer-cli` i `intlayer-content`, oraz po jednej dla każdego frameworka, które uczą agenta konfiguracji routingu i typów węzłów treści.
- **[Wtyczka ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md)**: reguła `no-raw-text` oznacza zakodowane na stałe ciągi tekstowe, z dodatkowymi regułami dla statycznych kluczy słownika i nieużywanej zawartości.

</Question>

<Question title="Czy Intlayer działa wewnątrz wysp (islands) Astro?">

Tak. Pakiet `astro-intlayer` obsługuje stronę `.astro`, a każdy framework wyspy ma własne powiązanie, dzięki czemu wyspa otrzymuje aktywny język ze strony zamiast rozwiązywać go ponownie. Dostępne są dedykowane przewodniki dla [Astro + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_astro_react.md), [Astro + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_astro_vue.md) oraz [Astro + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_astro_svelte.md), a także dla innych środowisk.

</Question>

<Question title="Czy przetłumaczona treść jest dostarczana jako statyczny HTML?">

Tak. Astro domyślnie renderuje strony w czasie budowy, a Intlayer rozwiązuje treść podczas tego renderowania, więc zlokalizowane strony są czystym statycznym HTML-em. Tylko wyspy, które muszą przełączać język w czasie wykonywania, otrzymują słownik i tylko dla języka, który renderują.

</Question>

<Question title="Jak skonfigurować zlokalizowany routing i przełącznik języka?">

Krok 6 i krok 7 tego przewodnika to opisują. `routing.mode` kontroluje, czy domyślny język ma prefiks (`"prefix-no-default"`), czy każdy język go posiada (`"prefix-all"`), czy też język znajduje się poza ścieżką (`"no-prefix"` lub `"search-params"`). Funkcja `getLocalizedUrl` przekształca bieżącą ścieżkę na język docelowy, dzięki czemu przełącznik zatrzymuje czytelnika na tej samej stronie.

</Question>

<Question title="Jak wygenerować zlokalizowaną mapę witryny (sitemap) i tagi hreflang?">

Krok 8 obejmuje `sitemap.xml` i `robots.txt`. Funkcja `getMultilingualUrls` tworzy alternatywy dla każdego zadeklarowanego języka, w tym `x-default`, którego wyszukiwarki używają do serwowania właściwej wersji językowej strony.

</Question>

<Question title="Jak automatycznie przetłumaczyć witrynę Astro za pomocą AI?">

Uruchom `npx intlayer fill`. Uzupełnia brakujące tłumaczenia za pomocą wybranego modelu LLM, korzystając z Twojego dostawcy i klucza API, a flaga `--git-diff` ogranicza działanie do treści zmienionych na bieżącej gałęzi. Zobacz [polecenie fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md) oraz [integrację CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/CI_CD.md).

</Question>

<Question title="Czy Intlayer obsługuje formy mnogie, płeć i treści Markdown?">

Tak: [formy mnogie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/plurial.md), [treści zależne od płci](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/gender.md), warunki, [wstawki (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/insertion.md) oraz [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/markdown.md), co jest bardzo wygodne w Astro dla dłuższych tekstów. [Formatowania](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/formatters.md) obsługują liczby, daty i waluty.

</Question>

<Question title="Jak tłumacze mogą edytować treść bez dotykania kodu?">

Za pośrednictwem [edytora wizualnego](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md), który działa na Twojej własnej infrastrukturze i pozwala każdemu edytować tekst bezpośrednio w działającej aplikacji, lub systemu [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md), który wyodrębnia treść, dzięki czemu może być zmieniana bez konieczności ponownego wdrażania.

</Question>

<Question title="Czy Intlayer jest darmowy i open source?">

Tak, na licencji Apache 2.0, włączając zastosowania komercyjne. Hostowany CMS to opcjonalna płatna usługa, którą można również [hostować samodzielnie (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md).

</Question>

</FAQ>
