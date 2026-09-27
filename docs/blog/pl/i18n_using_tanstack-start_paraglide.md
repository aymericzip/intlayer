---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "TanStack Start i18n z Paraglide JS: Przewodnik konfiguracji na 2026 rok"
description: "Przetłumacz swoją aplikację TanStack Start za pomocą Paraglide JS: strategia URL, przepisywanie routera, middleware SSR, hreflang, sitemap i robots.txt, a także rzeczywiste dane z benchmarku."
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - Internacjonalizacja
  - i18n
  - SEO
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-paraglide
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Początkowa wersja"
author: aymericzip
---

# Jak zinternacjonalizować aplikację TanStack Start za pomocą Paraglide JS w 2026 roku

## Spis treści

<TOC/>

## Czym jest Paraglide JS?

**Paraglide JS** (tworzony przez inlang) to biblioteka i18n **oparta na kompilatorze**. Zamiast dostarczać środowisko wykonawcze (runtime), które wyszukuje klucze w obiekcie JSON, kompiluje każdy komunikat do typowanej funkcji JavaScript (`m.about_title()`). Nieużywane komunikaty mogą zostać usunięte przez bundler (tree-shaking), a literówka w kluczu powoduje błąd kompilacji.

Paraglide to podejście do i18n stosowane w oficjalnych przykładach TanStack Router, które integruje się z TanStack Start za pośrednictwem trzech elementów:

- **wtyczki Vite**, która kompiluje komunikaty oraz runtime do `src/paraglide`;
- **middleware serwerowego**, które rozpoznaje język (locale) dla każdego żądania;
- **przepisywania routera (router rewrite)**, które mapuje zlokalizowane adresy URL (`/fr/about`) na drzewo tras (`/about`), dzięki czemu nie potrzebujesz segmentu `$locale`.

Ten przewodnik konfiguruje wszystkie trzy elementy, a następnie omawia kwestie, które Paraglide pozostawia do samodzielnej implementacji: `lang` i `dir`, przełącznik języków, przetłumaczone metadane, `canonical`, `hreflang` z `x-default`, Open Graph, JSON-LD, sitemap, `robots.txt`, pre-rendering oraz zlokalizowane strony 404.

> Szukasz innego stosu technologicznego?

- [przewodnik TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_tanstack-start_use-intl.md)
- [przewodnik TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_tanstack-start_lingui.md)
- [przewodnik TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md)

> Porównujesz dwa podejścia oparte na kompilatorze? Przeczytaj [czy Intlayer jest lżejszy od Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/is_intlayer_lighter_than_paraglide.md).

- [czy Intlayer jest lżejszy od Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/is_intlayer_lighter_than_paraglide.md)

> Aby zrozumieć, skąd wzięły się te biblioteki, przeczytaj historię i18n w JavaScript.

- [Historia i18n w JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/history_of_i18n.md)

## Co benchmark mówi o Paraglide w TanStack Start

[Benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md) uruchamia tę samą 10-stronicową, 10-języczną aplikację TanStack Start z każdą główną biblioteką i mierzy, co przeglądarka faktycznie pobiera.

- [Benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

Kluczowe dane dla `@inlang/paraglide-js@2.15.1`, zmierzone 2026-09-26 (gzip):

| Konfiguracja                 | Rozmiar biblioteki | JS na stronę | Wyciek innych języków | Wyciek innych stron | Czas ładowania strony |
| :--------------------------- | -----------------: | -----------: | --------------------: | ------------------: | --------------------: |
| Brak i18n (aplikacja bazowa) |                  - |     111.0 KB |                    0% |                  0% |               15.7 ms |
| Paraglide JS                 |             1.8 KB |     125.1 KB |                 49.7% |                  0% |               22.1 ms |
| `react-intlayer`             |             4.5 KB |     126.8 KB |                    0% |                  0% |               14.8 ms |
| `use-intl`                   |            75.9 KB |     128.7 KB |                    0% |                  0% |               17.4 ms |
| Lingui                       |            56.7 KB |     120.2 KB |                  8.6% |                  0% |               21.9 ms |

Główne wnioski:

- **Środowisko wykonawcze (runtime) jest miniaturowe, a strony nie przeciekają.** Runtime jest generowany pod Twoją konfigurację, a komunikaty są importowane dokładnie tam, gdzie są używane.
- **Występuje wyciek języków.** Każda funkcja komunikatu zawiera wszystkie wersje językowe, więc około połowa przetłumaczonych ciągów znaków przesyłanych na stronę dotyczy języków, których użytkownik nie używa. Im więcej języków dodasz, tym większy staje się ten udział.
- **Czas ładowania strony jest najwolniejszy w grupie**, częściowo dlatego, że język jest ustalany przez strategie przy każdym wywołaniu, zamiast być odczytywany z kontekstu React.

> Zobacz pełne dane: [raport benchmarku TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md) oraz [repozytorium benchmarku](https://github.com/intlayer-org/benchmark-i18n).

- [raport benchmarku TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md)

## Porównanie funkcji w TanStack Start

Jak Paraglide JS wypada na tle innych bibliotek powszechnie używanych w TanStack Start:

| Funkcja                                             | `react-intlayer` (Intlayer)          | `use-intl`              | Paraglide JS                         | Lingui                           |
| --------------------------------------------------- | ------------------------------------ | ----------------------- | ------------------------------------ | -------------------------------- |
| **Tłumaczenia blisko komponentów**                  | ✅ Współdzielona lokalizacja         | ❌ Scentralizowany JSON | ❌ Jeden plik JSON na język          | ⚠️ Tekst źródłowy w komponentach |
| **Integracja z TypeScript**                         | ✅ Automatycznie generowane typy     | ✅ Poprzez `AppConfig`  | ✅ Typowane funkcje komunikatów      | ⚠️ Tylko makra                   |
| **Wykrywanie brakujących tłumaczeń**                | ✅ Błędy typów i ostrzeżenia budowy  | ⚠️ Zapasowy fallback    | ⚠️ Powrót do języka bazowego         | ⚠️ Powrót do tekstu źródłowego   |
| **Bogata treść (JSX, Markdown)**                    | ✅ Bezpośrednie wsparcie             | ⚠️ Tagi przez `t.rich`  | ⚠️ Ciągi znaków                      | ✅ JSX wewnątrz `<Trans>`        |
| **Routing zlokalizowany**                           | ✅ Wbudowany                         | ❌ Ręczny `{-$locale}`  | ✅ `urlPatterns` + rewrite routera   | ❌ Ręczny `{-$locale}`           |
| **Zmiana języka bez przeładowania**                 | ✅ Tak                               | ✅ Tak                  | ❌ Pełne przeładowanie strony        | ✅ Tak                           |
| **Liczba mnoga (Pluralizacja)**                     | ✅ Oparta na wyliczeniach            | ✅ ICU                  | ✅ Warianty                          | ✅ ICU                           |
| **ICU MessageFormat**                               | ✅ Poprzez `format: "icu"`           | ✅ Natywnie             | ⚠️ Poprzez wtyczkę inlang            | ✅ Natywnie                      |
| **Formaty treści**                                  | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`              | ⚠️ inlang JSON                       | ✅ PO, JSON, CSV                 |
| **Tłumaczenie AI**                                  | ✅ Własny dostawca i klucz           | ❌ Brak                 | ❌ Brak                              | ❌ Brak                          |
| **Edytor wizualny / CMS**                           | ✅ Lokalny edytor + opcjonalny CMS   | ❌ Zewnętrzne platformy | ⚠️ Aplikacje ekosystemu inlang       | ❌ Zewnętrzne platformy          |
| **Pomocnicy SEO (hreflang, sitemap)**               | ✅ Wbudowani                         | ❌ Ręcznie              | ⚠️ Zlokalizowane URL, reszta ręcznie | ❌ Ręcznie                       |
| **Rozmiar runtime (gzip, benchmark)**               | 4.5 KB                               | 75.9 KB                 | 1.8 KB                               | 56.7 KB                          |
| **Wyciek, najlepsza konfiguracja (język / strona)** | 0% / 0%                              | 0% / 0%                 | 49.7% / 0%                           | 8.6% / 0%                        |
| **Brakujące tłumaczenia w CI**                      | ✅ `npx intlayer test`               | ⚠️ Brak wbudowanego     | ⚠️ Brak wbudowanego                  | ✅ `lingui compile --strict`     |

> Wartości rozmiaru runtime i wycieków pochodzą z [benchmarku TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md). Wyciek jest mierzony w najlepszej konfiguracji dla każdej biblioteki.

- [benchmarku TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md)

> Inne przewodniki po TanStack Start:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_tanstack-start_lingui.md)
- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_tanstack-start_use-intl.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md)

## Dobre praktyki, których warto przestrzegać

- **Ustaw `lang` i `dir` w tagu `<html>`** na podstawie ustalonego języka, bezpośrednio po stronie serwera.
- **Utrzymuj jeden adres URL na język** ze strategią prefiksów (`/fr/about`), aby każda wersja językowa mogła być indeksowana.
- **Umieść `url` na pierwszym miejscu w strategii wyboru języka**, dzięki czemu adres URL jest źródłem prawdy, a roboty indeksujące otrzymują dokładnie tę stronę, o którą prosiły.
- **Używaj płaskich, opisowych kluczy komunikatów** (`about_title`), które przejrzyście mapują się na nazwy funkcji.
- **Zatwierdzaj w repozytorium pliki `messages/*.json`, a nie wygenerowany folder `src/paraglide`**, aby uniknąć konfliktów scalania w wygenerowanym kodzie.
- **Tłumacz metadane** i deklaruj `canonical`, `hreflang` oraz `x-default` na każdej stronie.
- **Generuj wielojęzyczną mapę witryny (sitemap) i plik robots.txt**, a także pre-renderuj każdy język.
- **Używaj rzeczywistych linków w przełączniku języków**, aby roboty indeksujące mogły odkryć wszystkie wersje językowe.

- [internacjonalizacji i SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/internationalization_and_SEO.md)
- [przewodnik po hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/hreflang_guide_multilingual_seo.md)

## Przewodnik krok po kroku po konfiguracji Paraglide JS w aplikacji TanStack Start

Oto struktura projektu, którą utworzymy:

```bash
.
├── project.inlang
│   └── settings.json          # Języki i format komunikatów
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # Wygenerowane, ignorowane przez git
    ├── server.ts              # Middleware Paraglide
    ├── router.tsx             # Przepisywanie URL (rewrite)
    ├── i18n
    │   ├── config.ts          # URL witryny, pomocniki
    │   └── seo.ts             # Generator head()
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # / oraz /fr
        ├── about.tsx          # /about oraz /fr/about
        ├── $.tsx              # Zlokalizowana strona 404
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

Zwróć uwagę, że nie ma folderu `$locale`: funkcja rewrite routera usuwa prefiks przed dopasowaniem trasy.

<Steps>
<Step number={1} title="Zainstaluj zależności">

Rozpocznij od projektu TanStack Start, a następnie zainicjalizuj Paraglide. Polecenie init tworzy plik `project.inlang/settings.json`, pierwszy plik `messages/en.json` oraz instaluje pakiet.

```bash packageManager="npm"
npm create @tanstack/start@latest
npx @inlang/paraglide-js@latest init
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm dlx @inlang/paraglide-js@latest init
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn dlx @inlang/paraglide-js@latest init
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bunx @inlang/paraglide-js@latest init
```

- **@inlang/paraglide-js**: kompilator i jego wtyczka Vite. Nie ma potrzeby instalowania pakietu runtime: kod wykonawczy jest generowany bezpośrednio w Twoim projekcie.

</Step>
<Step number={2} title="Skonfiguruj języki (Locales)">

`project.inlang/settings.json` stanowi jedyne źródło prawdy o dostępnych językach. Wtyczka formatu komunikatów odczytuje jeden plik JSON dla każdego języka.

```json fileName="project.inlang/settings.json"
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "fr", "es"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{locale}.json"
  }
}
```

</Step>
<Step number={3} title="Skonfiguruj wtyczkę Vite i strategię URL">

Wtyczka kompiluje komunikaty przy każdej zmianie. W przypadku TanStack Start istotne są trzy opcje:

- **`strategy`**: uporządkowana lista miejsc, z których odczytywany jest język. Umieszczenie `url` na pierwszym miejscu sprawia, że adres URL jest źródłem prawdy. Wartości `cookie` oraz `preferredLanguage` są używane przez middleware serwera, gdy adres URL nie determinuje języka.
- **`urlPatterns`**: określa sposób mapowania języka na adres URL. Języki inne niż domyślny są wymienione jako pierwsze, ponieważ wygrywa pierwszy pasujący wzorzec. Tutaj język domyślny pozostaje bez prefiksu (`/about`), a pozostałe języki otrzymują prefiks (`/fr/about`).
- **`outputStructure: "message-modules"`**: jeden moduł na komunikat, co pozwala bundlerowi na usunięcie komunikatów, których dana strona nie importuje.

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["fr", "/fr/:path(.*)?"],
            ["es", "/es/:path(.*)?"],
            // Domyślny język na końcu: dopasowuje wszystkie pozostałe adresy URL
            ["en", "/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
```

Dodaj wygenerowany folder do `.gitignore`. Jest on przebudowywany podczas `dev` i `build`:

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="Utwórz pliki tłumaczeń">

Każdy klucz staje się funkcją wyeksportowaną z `src/paraglide/messages`. Płaskie klucze w formacie snake_case zapewniają najbardziej czytelne nazwy funkcji. Zmienne korzystają z symboli zastępczych `{name}`.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Home",
  "nav_about": "About",
  "locale_switcher_label": "Change language",
  "home_meta_title": "Welcome",
  "home_meta_description": "A multilingual TanStack Start application.",
  "home_title": "Hello {name}!",
  "about_meta_title": "About us",
  "about_meta_description": "Learn who we are and why we built this application.",
  "about_title": "About us",
  "not_found_title": "Page not found",
  "not_found_back_home": "Back to home"
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Accueil",
  "nav_about": "À propos",
  "locale_switcher_label": "Changer de langue",
  "home_meta_title": "Bienvenue",
  "home_meta_description": "Une application TanStack Start multilingue.",
  "home_title": "Bonjour {name} !",
  "about_meta_title": "À propos",
  "about_meta_description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application.",
  "about_title": "À propos",
  "not_found_title": "Page introuvable",
  "not_found_back_home": "Retour à l'accueil"
}
```

 </Tab>
</Tabs>

Formy liczby mnogiej używają składni wariantów formatu komunikatów inlang:

```json fileName="messages/en.json"
{
  "cart_items": [
    {
      "declarations": ["input count", "local countPlural = count: plural"],
      "selectors": ["countPlural"],
      "match": {
        "countPlural=one": "{count} item",
        "countPlural=other": "{count} items"
      }
    }
  ]
}
```

</Step>
<Step number={5} title="Dodaj middleware serwerowe">

Middleware ustala język dla każdego żądania zgodnie z Twoją strategią i udostępnia go dla `getLocale()` podczas całego renderowania po stronie serwera za pośrednictwem zakresu `AsyncLocalStorage`. Dzięki temu jednoczesne żądania w różnych językach są w pełni bezpieczne.

W TanStack Start opakuj domyślny punkt wejścia serwera:

```ts fileName="src/server.ts"
import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

export default {
  fetch(request: Request): Promise<Response> {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
};
```

</Step>
<Step number={6} title="Przepisz zlokalizowane adresy URL w routerze">

Opcja `rewrite` w TanStack Router przekształca adresy URL na granicy działania routera:

- **input**: `/fr/about` jest przekształcane na `/about` przed dopasowaniem trasy, dzięki czemu pojedyncza trasa `about.tsx` obsługuje każdy język;
- **output**: każdy wygenerowany `href` (linki, przekierowania, nawigacja) jest lokalizowany dla aktywnego języka, więc `<Link to="/about">` renderuje `/fr/about` na stronie francuskojęzycznej.

```tsx fileName="src/router.tsx"
import { createRouter } from "@tanstack/react-router";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

> Ponieważ linki są automatycznie lokalizowane przez regułę rewrite, nie potrzebujesz własnego komponentu `LocalizedLink`: używaj standardowego `Link` z TanStack Router.

</Step>
<Step number={7} title="Utwórz dokument główny (Root Document)">

Funkcja `getLocale()` zwraca język ustalony przez middleware na serwerze oraz język z adresu URL w przeglądarce, dzięki czemu atrybuty `lang` i `dir` są identyczne w kodzie HTML z serwera i po hydratacji.

```ts fileName="src/i18n/config.ts"
import { baseLocale, type Locale, localizeUrl } from "@/paraglide/runtime";

/** Publiczne źródło (origin), używane dla canonical URL, hreflang i sitemapy. */
export const siteUrl = "https://example.com";

/** Open Graph oczekuje kodów w formacie `language_TERRITORY`. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `getAbsoluteUrl("/about", "fr")` → `https://example.com/fr/about` */
export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  localizeUrl(new URL(path, siteUrl), { locale }).href;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;

export { baseLocale };
```

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { NotFound } from "@/components/NotFound";
import { getTextDirection } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">{m.nav_home()}</Link>
          <Link to="/about">{m.nav_about()}</Link>
        </nav>
        <LocaleSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

</Step>
<Step number={8} title="Wykorzystaj tłumaczenia na swoich stronach">

Komunikaty to zwykłe funkcje: zaimportuj `m`, wywołaj funkcję i przekaż zmienne jako obiekt. Wszystko jest w pełni typowane, łącznie ze zmiennymi.

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
  head: () =>
    buildLocalizedHead({
      path: "/",
      locale: getLocale(),
      title: m.home_meta_title(),
      description: m.home_meta_description(),
    }),
  component: HomePage,
});

function HomePage() {
  return <h1>{m.home_title({ name: "TanStack" })}</h1>;
}
```

```tsx fileName="src/routes/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/about")({
  head: () =>
    buildLocalizedHead({
      path: "/about",
      locale: getLocale(),
      title: m.about_meta_title(),
      description: m.about_meta_description(),
    }),
  component: AboutPage,
});

function AboutPage() {
  return <h1>{m.about_title()}</h1>;
}
```

> Funkcja komunikatu przyjmuje również jawnie określony język: `m.about_title({}, { locale: "fr" })`. Jest to przydatne w kodzie serwerowym renderującym treść w języku innym niż język bieżącego żądania, np. przy wysyłce wiadomości e-mail.

</Step>
<Step number={9} title="Zmień język treści" isOptional={true}>

Renderuj przełącznik jako **linki** z `localizeHref`, aby roboty indeksujące odkryły każdy język. Funkcja `setLocale` zapisuje wybór w pliku cookie i przeładowuje stronę w nowym języku: pełne przeładowanie jest oczekiwanym zachowaniem w Paraglide, ponieważ funkcje komunikatów odczytują język przy każdym wywołaniu, zamiast subskrybować stan React.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/react-router";
import { getLocaleName } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import {
  getLocale,
  type Locale,
  locales,
  localizeHref,
  setLocale,
} from "@/paraglide/runtime";

export const LocaleSwitcher = () => {
  // Ścieżka routera, wstępnie odlokalizowana przez rewrite: "/about"
  const { pathname } = useLocation();
  const activeLocale = getLocale();

  const handleClick = (event: React.MouseEvent, locale: Locale) => {
    event.preventDefault();
    setLocale(locale); // Zapisuje cookie i przeładowuje stronę pod zlokalizowanym adresem URL
  };

  return (
    <nav aria-label={m.locale_switcher_label()}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={localizeHref(pathname, { locale })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={(event) => handleClick(event, locale)}
            >
              {getLocaleName(locale)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={10} title="Umiędzynarodowij swoje metadane" isOptional={true}>

Każda wersja językowa może pozycjonować się niezależnie, pod warunkiem że każda strona udostępnia:

- **przetłumaczony** tag `<title>` oraz opis `description`;
- **kanoniczny adres URL (canonical)** wskazujący na samą siebie;
- **odpowiednik `hreflang` dla każdego języka**, plus **`x-default`**;
- tagi **Open Graph** `og:locale`, `og:locale:alternate` i `og:url`;
- dane strukturalne **JSON-LD** z polem `inLanguage`.

Funkcja `localizeUrl` z Paraglide buduje alternatywne adresy URL na podstawie konfiguracji `urlPatterns`, dzięki czemu nigdy nie rozbiegną się one z rzeczywistym routingiem:

```ts fileName="src/i18n/seo.ts"
import { baseLocale, type Locale, locales } from "@/paraglide/runtime";
import { getAbsoluteUrl, openGraphLocales } from "./config";

type LocalizedHeadOptions = {
  /** Ścieżka bez prefiksu językowego, np. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, baseLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

</Step>
<Step number={11} title="Umiędzynarodowij mapę witryny (Sitemap)" isOptional={true}>

Wielojęzyczna mapa witryny zawiera każdy adres URL dla każdego języka, a każdy wpis deklaruje wszystkie swoje alternatywne wersje za pomocą `xhtml:link`:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { getAbsoluteUrl } from "@/i18n/config";
import { baseLocale, locales } from "@/paraglide/runtime";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, baseLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={12} title="Umiędzynarodowij plik robots.txt" isOptional={true}>

Trasy prywatne istnieją w każdym języku, więc reguły `Disallow` muszą obejmować każdą zlokalizowaną ścieżkę. Usuń plik `public/robots.txt`, jeśli został wygenerowany przez szablon startowy, a następnie serwuj go bezpośrednio z trasy:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/i18n/config";
import { locales, localizeHref } from "@/paraglide/runtime";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizeHref(path, { locale })}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={13} title="Włącz pre-rendering dla wszystkich języków" isOptional={true}>

Wskaż zlokalizowaną ścieżkę każdej strony, aby TanStack Start wygenerował statycznie wszystkie wersje językowe. Funkcja `localizeHref` to wygenerowany kod bez zależności od przeglądarki, więc można go uruchomić w `vite.config.ts`, ale plik istnieje dopiero po pierwszej kompilacji. Ręczne wypisanie ścieżek, jak poniżej, zapobiega problemom z kolejnością budowania:

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const prefixedLocales = ["fr", "es"]; // Domyślny język "en" pozostaje bez prefiksu
const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) => [
  path,
  ...prefixedLocales.map((locale) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`
  ),
]);

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      // ... te same opcje co w kroku 3
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages.map((path) => ({
          path,
          prerender: { enabled: true },
        })),
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

Ponieważ przełącznik renderuje rzeczywiste linki, opcja `crawlLinks: true` pozwala dodatkowo odkryć podstrony, które mogły zostać pominięte na liście.

</Step>
<Step number={14} title="Obsłuż zlokalizowane strony 404" isOptional={true}>

Dzięki regule rewrite adres `/fr/does-not-exist` jest dopasowywany jako `/does-not-exist`, a funkcja `getLocale()` wciąż zwraca `fr`, więc główny komponent `notFoundComponent` z kroku 7 renderuje się w języku francuskim. Trasa typu catch-all gwarantuje, że głębokie ścieżki również zostaną prawidłowo obsłużone. Oznacz stronę jako `noindex`: React 19 automatycznie przenosi tag `<meta>` do sekcji `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>{m.not_found_title()}</h1>
    <Link to="/">{m.not_found_back_home()}</Link>
  </div>
);
```

```tsx fileName="src/routes/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={15} title="Uzyskaj dostęp do języka w funkcjach serwerowych" isOptional={true}>

Funkcje serwerowe (Server Functions) działają wewnątrz zasięgu middleware Paraglide, więc `getLocale()` działa również w nich:

```ts fileName="src/server/sendWelcomeEmail.ts"
import { createServerFn } from "@tanstack/react-start";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    const locale = getLocale();
    const subject = m.home_meta_title({}, { locale });

    // await mailer.send({ to: email, subject, locale });
    return { email, subject, locale };
  });
```

</Step>
<Step number={16} title="Porównanie z Intlayer" isOptional={true}>

Nie istnieje bezpośredni adapter przejściowy z Paraglide do Intlayer, ponieważ obie biblioteki opierają się na podobnej koncepcji: kompilacja treści w czasie budowania i dostarczanie minimalnego kodu runtime. Różnice tkwią w tym, co trafia do przeglądarki oraz jak organizowana jest treść:

- **Języki (Locales)**: Intlayer ładuje [słowniki dynamiczne](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md) dla wybranego języka (0% wycieku języków w benchmarku), podczas gdy każda funkcja komunikatu Paraglide zawiera wszystkie wersje językowe (49.7%).
- **Organizacja treści**: treść może znajdować się w plikach `.content.ts` bezpośrednio obok komponentów lub w plikach scentralizowanych. Zobacz [i18n per-komponent vs scentralizowany](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/per-component_vs_centralized_i18n.md).
- **Przełączanie języka**: treść jest odczytywana z kontekstu React, więc zmiana języka ponownie renderuje komponenty bez przeładowywania strony.
- **Wygenerowany kod**: nic nie jest generowane wewnątrz folderu `src`, więc nie ma potrzeby ponownego generowania plików przed commitem.

Jeśli migrujesz z innej biblioteki niż Paraglide, [adaptery kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md) zachowują API `use-intl`, `next-intl`, `react-i18next`, `react-intl` lub Lingui, podmieniając jedynie silnik wykonawczy.

- [adaptery kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md)

Zobacz artykuł [czy Intlayer jest lżejszy od Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/is_intlayer_lighter_than_paraglide.md) oraz [przewodnik Intlayer dla TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md).

- [czy Intlayer jest lżejszy od Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/is_intlayer_lighter_than_paraglide.md)
- [przewodnik Intlayer dla TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md)

</Step>
<Step number={17} title="Zautomatyzuj swoje tłumaczenia za pomocą Intlayer" isOptional={true}>

Paraglide renderuje tłumaczenia, ale nie pomaga w ich **tworzeniu**. Intlayer jest **darmowy** i **open source**, a jego narzędzia pomagają nawet w projektach opartych na Paraglide:

- **Tłumacz za pomocą AI** używając własnego klucza API i dostawcy. Zobacz [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/autoFill.md) oraz [narzędzie CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).
- **Zachowaj pliki JSON** jako źródło prawdy dzięki [wtyczce sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md).
- **Testuj brakujące tłumaczenia** w procesach CI. Zobacz [testowanie tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/testing.md).
- **Skanuj wdrożoną stronę** pod kątem brakujących tagów `hreflang`, nieprawidłowych linków kanonicznych i wycieków językowych za pomocą [polecenia scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/scan.md).

</Step>
</Steps>

## Często zadawane pytania (FAQ)

<FAQ>

<Question title="Czy Paraglide JS to dobry wybór dla TanStack Start?">

To solidny wybór: jest wykorzystywany w oficjalnych przykładach TanStack Router, ma najmniejszy rozmiar runtime w [benchmarku](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md) (~1.8 KB gzip), a komunikaty są w pełni typowane. Kompromisem jest to, że każda funkcja komunikatu zawiera wszystkie języki, co powoduje wyciek około połowy przetłumaczonych ciągów znaków do użytkowników innych języków, a także fakt, że zmiana języka przeładowuje stronę.

- [benchmarku](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md)

</Question>
<Question title="Czy potrzebuję segmentu trasy $locale przy użyciu Paraglide?">

Nie. Reguła `rewrite` w routerze usuwa prefiks językowy przed dopasowaniem trasy i dodaje go z powrotem do generowanych linków, dzięki czemu pojedynczy plik `about.tsx` obsługuje trasy `/about`, `/fr/about` oraz `/es/about`.

</Question>
<Question title="Dlaczego zmiana języka przeładowuje stronę?">

Funkcje komunikatów odczytują język w momencie ich wywołania i nie są podpięte do stanu React. Dlatego `setLocale` domyślnie przeładowuje stronę, aby każdy komunikat wyrenderował się ponownie w nowym języku. Możesz przekazać opcję `{ reload: false }`, ale wtedy musisz samodzielnie zadbać o ponowne wyrenderowanie drzewa komponentów.

</Question>
<Question title="Czy powinienem zatwierdzać w gicie wygenerowany folder src/paraglide?">

Lepiej tego nie robić. Folder jest generowany ponownie przy każdym uruchomieniu `dev` i `build`, a zatwierdzanie go powoduje konflikty scalania w wygenerowanych plikach. Zamiast tego dodawaj do repozytorium pliki `messages/*.json` oraz `project.inlang/settings.json`.

</Question>
<Question title="Jak dodać tagi hreflang z Paraglide?">

Użyj `localizeUrl`, aby zbudować jeden bezwzględny adres URL na język wewnątrz funkcji `head()` trasy, a także dodaj `x-default` wskazujący na język bazowy. Krok 10 zawiera gotową funkcję pomocniczą, a krok 11 dodaje te same wersje alternatywne do mapy witryny (sitemap).

</Question>
<Question title="Czy Paraglide usuwa nieużywane tłumaczenia (tree-shaking)?">

Nieużywane **komunikaty** są usuwane przy włączonej opcji `outputStructure: "message-modules"`, dzięki czemu zawartość innych podstron nie przecieka. Nieużywane **języki** nie są jednak usuwane: każda funkcja komunikatu zawiera wszystkie tłumaczenia, dlatego benchmark wykazuje 49.7% wycieku języków.

</Question>
<Question title="Czy mogę zmigrować projekt z Paraglide do Intlayer?">

Tak. Obie biblioteki bazują na kompilatorze, więc model koncepcyjny jest bardzo podobny. Możesz zachować istniejące pliki JSON za pomocą [wtyczki sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md), a następnie podmieniać wywołania `m.key()` na `useIntlayer`, strona po stronie. Zobacz [przewodnik Intlayer dla TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md).

- [wtyczki sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md)
- [przewodnik Intlayer dla TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md)

</Question>

</FAQ>
