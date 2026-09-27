---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "TanStack Start i18n z Lingui: Kompletny przewodnik konfiguracji na rok 2026"
description: "Przetłumacz swoją aplikację TanStack Start za pomocą Lingui: makra, katalogi PO, SSR, routing regionalny, hreflang, sitemap i robots.txt, a także rzeczywiste dane porównawcze rozmiaru pakietu."
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - Internacjonalizacja
  - i18n
  - SEO
  - Pliki PO
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Początkowa wersja"
author: aymericzip
---

# Jak zinternacjonalizować aplikację TanStack Start za pomocą Lingui w 2026 roku

## Spis treści

<TOC/>

## Czym jest Lingui?

**Lingui** to biblioteka i18n zbudowana wokół **makr** i **ekstrakcji komunikatów**. Tekst źródłowy piszesz bezpośrednio w komponentach (`` t`Hello` ``, `<Trans>Hello</Trans>`), polecenie `lingui extract` zbiera każdy komunikat do katalogów (domyślnie pliki PO), tłumacze je uzupełniają, a wtyczka Vite kompiluje je do kompaktowego kodu JavaScript. Komunikaty używają formatu ICU MessageFormat, więc liczba mnoga i selektory są w pełni obsługiwane.

TanStack Start nie posiada wbudowanej warstwy i18n, dlatego ten przewodnik łączy z nim Lingui od podstaw:

- **Makra kompilowane przez Babel** za pośrednictwem `@rolldown/plugin-babel` (wymagane w przypadku `@vitejs/plugin-react` v6 i Vite 8).
- **Routing regionalny** z opcjonalnym segmentem `{-$locale}` (`/about`, `/fr/about`).
- **Jeden katalog na język, ładowany na żądanie** oraz osobna instancja `I18n` na renderowanie, dzięki czemu równoległe żądania SSR nigdy nie współdzielą ustawień językowych.
- **Kompletne wielojęzyczne SEO**: przetłumaczony `<title>` i opis, kanoniczny adres URL, `hreflang` z `x-default`, Open Graph locales, JSON-LD, sitemap, `robots.txt`, pre-rendering i zlokalizowane strony 404.

> Szukasz innego stosu technologicznego? Zobacz [przewodnik TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_tanstack-start_use-intl.md), [przewodnik TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_tanstack-start_paraglide.md) lub [przewodnik TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md).

> Używasz Next.js? Zobacz [przewodnik Next.js + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_nextjs_lingui.md). Porównujesz biblioteki? Przeczytaj [Lingui kontra Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/lingui_vs_intlayer.md).

## Co benchmark mówi o Lingui w TanStack Start

[Benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md) uruchamia tę samą 10-stronicową, 10-języczną aplikację TanStack Start z każdą główną biblioteką i mierzy, co przeglądarka faktycznie pobiera.

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

Kluczowe dane dla `@lingui/core@6.6.0`, zmierzone 2026-09-26 (gzip):

| Konfiguracja                        | Rozmiar biblioteki | JS na stronę | Wyciek innego języka | Wyciek innej strony |
| :---------------------------------- | -----------------: | -----------: | -------------------: | ------------------: |
| Brak i18n (aplikacja bazowa)        |                  - |     111.0 KB |                   0% |                  0% |
| Lingui (konfiguracja z poradnika)   |            56.7 KB |     115.2 KB |                 9.3% |                  0% |
| `@intlayer/lingui` (kompatybilność) |             9.8 KB |     136.7 KB |                 9.9% |                  0% |
| `react-intlayer` (natywny Intlayer) |             4.5 KB |     126.8 KB |                   0% |                  0% |

Wnioski:

- **Ładuj jeden katalog na język, na żądanie.** Pozwala to utrzymać rozmiar stron zbliżony do aplikacji bazowej.
- **Środowisko wykonawcze (runtime) pozostaje duże** (~57 KB gzip). Adapter kompatybilności `@intlayer/lingui` (krok 16) zachowuje Twoje makra i redukuje go do ~10 KB.

> Zobacz pełne dane: [raport benchmarku TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md) oraz [repozytorium benchmarku](https://github.com/intlayer-org/benchmark-i18n).

## Porównanie funkcji w TanStack Start

Jak Lingui wypada w porównaniu z innymi bibliotekami powszechnie używanymi w TanStack Start:

| Funkcja                                        | `react-intlayer` (Intlayer)               | `use-intl`              | Paraglide JS                        | Lingui                           |
| ---------------------------------------------- | ----------------------------------------- | ----------------------- | ----------------------------------- | -------------------------------- |
| **Tłumaczenia blisko komponentów**             | ✅ Współdzielona lokalizacja (co-located) | ❌ Scentralizowany JSON | ❌ Jeden plik JSON na język         | ⚠️ Tekst źródłowy w komponentach |
| **Integracja z TypeScript**                    | ✅ Automatycznie generowane typy          | ✅ Przez `AppConfig`    | ✅ Typowane funkcje komunikatów     | ⚠️ Tylko makra                   |
| **Wykrywanie brakujących tłumaczeń**           | ✅ Błędy typów i ostrzeżenia kompilacji   | ⚠️ Fallback w runtime   | ⚠️ Powrót do języka bazowego        | ⚠️ Powrót do tekstu źródłowego   |
| **Bogata zawartość (JSX, Markdown)**           | ✅ Bezpośrednie wsparcie                  | ⚠️ Tagi przez `t.rich`  | ⚠️ Ciągi znaków                     | ✅ JSX wewnątrz `<Trans>`        |
| **Zlokalizowany routing**                      | ✅ Wbudowany                              | ❌ Ręczny `{-$locale}`  | ✅ `urlPatterns` + rewrite routera  | ❌ Ręczny `{-$locale}`           |
| **Zmiana języka bez przeładowania**            | ✅ Tak                                    | ✅ Tak                  | ❌ Pełne przeładowanie strony       | ✅ Tak                           |
| **Liczba mnoga (pluralizacja)**                | ✅ Oparta na wyliczeniach                 | ✅ ICU                  | ✅ Warianty                         | ✅ ICU                           |
| **ICU MessageFormat**                          | ✅ Przez `format: "icu"`                  | ✅ Natywny              | ⚠️ Przez wtyczkę inlang             | ✅ Natywny                       |
| **Formaty zawartości**                         | ✅ `.ts`, `.json`, `.md`, `.yaml`...      | ⚠️ `.json`              | ⚠️ inlang JSON                      | ✅ PO, JSON, CSV                 |
| **Tłumaczenie AI**                             | ✅ Własny dostawca i klucz                | ❌ Nie                  | ❌ Nie                              | ❌ Nie                           |
| **Wizualny edytor / CMS**                      | ✅ Lokalny edytor + opcjonalny CMS        | ❌ Zewnętrzne platformy | ⚠️ Aplikacje ekosystemu inlang      | ❌ Zewnętrzne platformy          |
| **Narzędzia SEO (hreflang, sitemap)**          | ✅ Wbudowane                              | ❌ Ręczne               | ⚠️ Zlokalizowane URL, reszta ręczna | ❌ Ręczne                        |
| **Rozmiar runtime (gzip, benchmark)**          | 4.5 KB                                    | 75.9 KB                 | 1.8 KB                              | 56.7 KB                          |
| **Wyciek, optymalna konfig. (język / strona)** | 0% / 0%                                   | 0% / 0%                 | 49.7% / 0%                          | 8.6% / 0%                        |
| **Brakujące tłumaczenia w CI**                 | ✅ `npx intlayer test`                    | ⚠️ Brak wbudowanego     | ⚠️ Brak wbudowanego                 | ✅ `lingui compile --strict`     |

> Dane dotyczące rozmiaru runtime i wycieków pochodzą z [benchmarku TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md). Wyciek jest mierzony na optymalnej konfiguracji dla każdej biblioteki.

> Inne przewodniki po TanStack Start: [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_tanstack-start_use-intl.md), [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_tanstack-start_paraglide.md) oraz [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md).

## Praktyki, które warto stosować

- **Ustawiaj `lang` i `dir` w `<html>`** na podstawie języka trasy, aby były prawidłowe w generowanym przez serwer kodzie HTML.
- **Utrzymuj jeden adres URL na język** z prefiksem, aby każda wersja językowa mogła być indeksowana.
- **Twórz jedną instancję `I18n` na język**, nigdy nie modyfikuj instancji globalnej podczas SSR: dwa jednoczesne żądania mogłyby nadpisać nawzajem swoje ustawienia językowe.
- **Ładuj tylko aktywny katalog**, nigdy nie importuj wszystkich katalogów w kodzie klienta.
- **Wybierz jeden styl makr** (`useLingui` + `t` w komponentach, `msg` dla deskryptorów ładowanych leniwie) i trzymaj się go konsekwentnie. Mieszanie `t`, `i18n._`, `i18n.t` oraz `<Trans>` utrudnia czytanie kodu ludziom oraz asystentom AI.
- **Uruchamiaj `lingui extract` w CI**, aby żaden nowy komunikat nie trafił na produkcję bez tłumaczenia.
- **Tłumacz metadane** i deklaruj `canonical`, `hreflang` oraz `x-default` na każdej stronie.
- **Generuj wielojęzyczną mapę witryny (sitemap) i robots.txt** oraz renderuj wstępnie (pre-render) każdy język.
- **Używaj prawdziwych linków dla przełącznika języków**, aby roboty indeksujące mogły odkryć każdą wersję językową.

> Zobacz nasz przewodnik na temat [internacjonalizacji i SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/internationalization_and_SEO.md) oraz [przewodnik po hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/hreflang_guide_multilingual_seo.md).

## Przewodnik krok po kroku po konfiguracji Lingui w aplikacji TanStack Start

Oto struktura projektu, którą utworzymy:

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # Generowane przez `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # Middleware żądań (przekierowanie językowe)
    ├── i18n
    │   ├── config.ts           # Języki, pomocniki URL
    │   ├── lingui.ts           # Ładowarka katalogów, instancje I18n
    │   ├── negotiateLocale.ts  # Parsowanie Accept-Language
    │   └── seo.ts              # Generator head()
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   └── NotFound.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx       # Układ językowy + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # Zlokalizowana strona 404
```

<Steps>
<Step number={1} title="Instalacja zależności">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

- **@lingui/core** / **@lingui/react**: środowisko uruchomieniowe (runtime), `I18nProvider` oraz makra (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/cli**: narzędzie `lingui extract` do zbierania komunikatów do katalogów.
- **@lingui/vite-plugin**: kompiluje katalogi `.po` podczas importu, dzięki czemu `lingui compile` nie jest potrzebne.
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel**: przekształcają makra w czasie budowania.

</Step>
<Step number={2} title="Scentralizuj konfigurację językową">

Domyślny język pozostaje bez prefiksu (`/about`), a pozostałe języki otrzymują prefiks (`/fr/about`).

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Publiczny adres pochodzenia, używany dla kanonicznych adresów URL, hreflang i mapy witryny. */
export const siteUrl = "https://example.com";

/** Plik cookie przechowujący język jawnie wybrany przez odwiedzającego. */
export const localeCookieName = "locale";

/** Open Graph oczekuje kodów w formacie `language_TERRITORY`. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Mapuje opcjonalny parametr trasy `{-$locale}` na obsługiwany język. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** Wartość przekazywana jako parametr `locale`: `undefined` dla domyślnego języka. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, domyślny język bez prefiksu. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Skonfiguruj Lingui">

Konfiguracja Lingui korzysta z tej samej listy języków, dzięki czemu katalogi, router i mapa witryny są zawsze w pełni spójne.

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/i18n/config";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
});
```

Dodaj skrypty ekstrakcji:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

Skrypt `i18n:check` kończy się błędem w środowisku CI, jeśli komponent zawiera komunikat, który nie został wyekstrahowany i zatwierdzony w repozytorium.

</Step>
<Step number={4} title="Skonfiguruj Vite">

W `@vitejs/plugin-react` v6 Babel nie jest już wbudowany. `@rolldown/plugin-babel` uruchamia wtyczkę makr Lingui, a `linguiTransformerBabelPreset` przetwarza tylko pliki importujące makro, co pozwala zachować dużą szybkość budowania.

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={5} title="Ładowanie katalogów według języka">

Literał szablonowy w `import()` pozwala Vite wygenerować **jeden fragment (chunk) na katalog**, a wtyczka Lingui kompiluje do niego plik `.po`. Odwiedzający z Francji pobiera wyłącznie katalog francuski.

Skompilowane komunikaty są czystymi danymi, więc mogą być zwracane przez loader trasy, serializowane do kodu HTML i ponownie używane podczas hydratacji.

```ts fileName="src/i18n/lingui.ts"
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import type { Locale } from "./config";

/**
 * Ładuje skompilowany katalog jednego języka (jeden chunk na język).
 */
export const loadCatalog = async (locale: Locale): Promise<Messages> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return messages;
};

/**
 * Tworzy odizolowaną instancję I18n: bezpieczną dla współbieżnych żądań SSR.
 */
export const createI18n = (locale: Locale, messages: Messages): I18n =>
  setupI18n({ locale, messages: { [locale]: messages } });

/**
 * Ładuje katalog i zwraca gotową do użycia instancję dla loaderów i
 * funkcji serwerowych.
 */
export const loadI18n = async (locale: Locale): Promise<I18n> =>
  createI18n(locale, await loadCatalog(locale));
```

Aby TypeScript akceptował importowanie plików `.po`, zadeklaruj moduł jednorazowo:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="Utwórz dokument główny (Root Document)">

Główna trasa odczytuje opcjonalny parametr języka, aby ustawić `lang` i `dir` w renderowanym po stronie serwera znaczniku `<html>`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

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
```

</Step>
<Step number={7} title="Utwórz trasę układu językowego (Locale Layout)">

Katalog `{-$locale}` tworzy opcjonalny segment ścieżki: zarówno `/about`, jak i `/fr/about` pasują do `/{-$locale}/about`. Układ odrzuca nieznane prefiksy, ładuje katalog bieżącego języka i dostarcza dedykowaną instancję `I18n`.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { I18nProvider } from "@lingui/react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { createI18n, loadCatalog } from "@/i18n/lingui";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadCatalog(locale) };
  },
  // Katalog nigdy się nie zmienia dla danego języka
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  // Jedna instancja na język, nigdy niewspółdzielona między żądaniami
  const i18n = useMemo(() => createI18n(locale, messages), [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <Header />
      <main>
        <Outlet />
      </main>
    </I18nProvider>
  );
}
```

</Step>
<Step number={8} title="Wykorzystaj tłumaczenia na swoich stronach">

Pisz tekst źródłowy bezpośrednio w komponencie. Makra przekształcają go w identyfikatory komunikatów podczas budowania, a `lingui extract` automatycznie go pobiera.

- `<Trans>` dla zawartości JSX, w tym elementów zagnieżdżonych;
- `useLingui().t` dla ciągów znaków (atrybuty, właściwości props);
- `<Plural>` dla obsługi form liczby mnogiej w formacie ICU.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { msg } from "@lingui/core/macro";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resolveLocale } from "@/i18n/config";
import { loadI18n } from "@/i18n/lingui";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  // Przetłumacz metadane w loaderze: head() pozostaje synchroniczny
  loader: async ({ params }) => {
    const i18n = await loadI18n(resolveLocale(params.locale));

    return {
      metadata: {
        title: i18n._(msg`About us`),
        description: i18n._(
          msg`Learn who we are and why we built this application.`
        ),
      },
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) =>
    loaderData
      ? buildLocalizedHead({
          path: "/about",
          locale: resolveLocale(params.locale),
          ...loaderData.metadata,
        })
      : {},
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </>
  );
}
```

> Dynamiczny `import()` katalogu jest buforowany przez system modułów, więc wywołanie `loadI18n` w kilku loaderach nie powoduje podwójnego pobierania katalogu.

</Step>
<Step number={9} title="Ekstrakcja i tłumaczenie komunikatów">

Uruchom proces ekstrakcji. Lingui zapisze każdy komunikat do katalogu odpowiedniego języka:

```bash
npm run i18n:extract
```

Następnie przetłumacz pole `msgstr` każdego wpisu:

<Tabs group="locale">
 <Tab value='fr' label='Francuski'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "Increment"
msgstr "Incrémenter"

msgid "Counter"
msgstr "Compteur"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Hiszpański'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "Increment"
msgstr "Incrementar"

msgid "Counter"
msgstr "Contador"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> Domyślnie identyfikatory komunikatów są hashami tekstu źródłowego: zmiana tekstu w języku angielskim tworzy nowy komunikat. Używaj jawnych identyfikatorów (`<Trans id="about.title">About us</Trans>`) dla tekstów, które często ulegają zmianie.

</Step>
<Step number={10} title="Budowa komponentu zlokalizowanego linku (LocalizedLink)" isOptional={true}>

Każda trasa znajduje się pod `{-$locale}`, dlatego linki muszą przenosić parametr bieżącego języka.

```tsx fileName="src/components/LocalizedLink.tsx"
import { useLingui } from "@lingui/react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { type Locale, toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return (
    <Link
      {...props}
      params={{ locale: toLocaleParam(i18n.locale as Locale) }}
    />
  );
};
```

</Step>
<Step number={11} title="Zmiana języka wyświetlanej zawartości" isOptional={true}>

Wyrenderuj przełącznik jako **linki**, aby roboty indeksujące mogły znaleźć każdą wersję językową. `to="."` zachowuje bieżącą stronę i podmienia parametr języka. Loader układu językowego pobiera następnie nowy katalog.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLingui } from "@lingui/react/macro";
import { Link } from "@tanstack/react-router";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  // Wersja makro zwraca również instancję i18n
  const { i18n, t } = useLingui();

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === i18n.locale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={12} title="Internacjonalizacja metadanych" isOptional={true}>

Każda wersja językowa może pozycjonować się niezależnie, pod warunkiem że każda strona udostępnia przetłumaczony `<title>` i opis, odwołujący się do samej siebie adres kanoniczny, jeden tag `hreflang` na każdy język oraz `x-default`, Open Graph locales i JSON-LD z polem `inLanguage`. Metadane są tłumaczone w loaderze (krok 8), a ten pomocnik buduje całą resztę:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

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
        href: getAbsoluteUrl(path, defaultLocale),
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
<Step number={13} title="Internacjonalizacja sitemap i robots.txt" isOptional={true}>

Mapa witryny (sitemap) zawiera każdy adres URL w każdym języku, a każdy wpis deklaruje wszystkie swoje warianty alternatywne za pomocą `xhtml:link`. Plik `robots.txt` blokuje prywatne ścieżki we wszystkich językach i wskazuje na mapę witryny. Usuń plik `public/robots.txt`, jeśli szablon go utworzył.

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

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
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
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

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string =>
  [
    "User-agent: *",
    "Allow: /",
    ...privatePaths.flatMap((path) =>
      locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
    ),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

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
<Step number={14} title="Wstępne renderowanie (pre-render) każdego języka" isOptional={true}>

Wypisz wszystkie zlokalizowane ścieżki, aby TanStack Start renderował wstępnie wszystkie wersje językowe w czasie budowania:

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={15} title="Przekierowywanie nowych użytkowników i obsługa stron 404" isOptional={true}>

Middleware żądań przekierowuje użytkownika wchodzącego na stronę główną `/` do preferowanego języka (najpierw plik cookie, następnie `Accept-Language`). Bezpośrednie linki (deep links) nigdy nie są przekierowywane, dzięki czemu roboty indeksujące i udostępniane adresy URL zawsze otrzymują dokładnie tę stronę, o którą poproszono.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/** "fr-CA,fr;q=0.9,en;q=0.8" → "fr" */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    if (new URL(request.url).pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

W przypadku stron 404 trasa typu catch-all renderuje zlokalizowany `notFoundComponent` układu. Oznacz go jako `noindex`: React 19 automatycznie przenosi znacznik `<meta>` do `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink to="/{-$locale}">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={16} title="Zachowaj swoje makra, zmniejsz rozmiar runtime dzięki Intlayer" isOptional={true}>

Adapter kompatybilności [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/lingui.md) pozwala zachować kod źródłowy bez zmian: makra kompilują się dokładnie tak jak wcześniej, a wygenerowane wywołania `i18n._()`, `useLingui()` i `<Trans>` są obsługiwane przez skompilowane słowniki Intlayer. W benchmarku rozmiar runtime spada z **~56.7 KB do ~9.8 KB** gzip.

```bash packageManager="npm"
npm install @intlayer/lingui intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/lingui intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/lingui intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/lingui intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Dodaj wtyczkę po transformacji makr, aby tworzyła aliasy `@lingui/core` i `@lingui/react` wskazujące na adapter:

```ts fileName="vite.config.ts"
import { lingui as linguiIntlayer } from "@intlayer/lingui/plugin";
import { linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
    linguiIntlayer(),
  ],
});
```

Katalogi są synchronizowane za pomocą [wtyczki sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) (katalogi JSON) lub [wtyczki sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md) (katalogi PO). Zobacz pełną konfigurację w [przewodniku kompatybilności z Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/lingui.md) oraz bezpośrednie porównanie w artykule [Lingui kontra @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/lingui_vs_intlayer-lingui.md).

</Step>
<Step number={17} title="Zautomatyzuj swoje tłumaczenia za pomocą Intlayer" isOptional={true}>

Lingui ekstrahuje komunikaty, ale ręczne uzupełnianie dziesiątek katalogów zajmuje najwięcej czasu. Intlayer jest **darmowy** i **open source**, a jego narzędzia doskonale współpracują z Lingui:

- **Tłumacz za pomocą AI** przy użyciu własnego klucza API i dostawcy. Zobacz [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/autoFill.md) oraz [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).
- **Zachowaj pliki PO** jako pojedyncze źródło prawdy dzięki [wtyczce sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md).
- **Testuj brakujące tłumaczenia** w środowisku CI. Zobacz [testowanie tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/testing.md).
- **Przeprowadzaj audyt wdrożonej witryny** pod kątem brakujących tagów `hreflang`, błędnych adresów kanonicznych i wycieków językowych za pomocą [polecenia scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/scan.md).

</Step>
</Steps>

## Często zadawane pytania

<FAQ>

<Question title="Czy Lingui działa z TanStack Start?">

Tak. Lingui nie posiada dedykowanej integracji z TanStack Start, ale jego wtyczka Vite oraz wtyczka makr Babel działają bez problemu. Dwie kluczowe kwestie to uruchamianie makr przez `@rolldown/plugin-babel` (Vite 8 i `@vitejs/plugin-react` v6 nie zawierają już Babela) oraz tworzenie osobnej instancji `I18n` na każdy język zamiast aktywowania globalnej instancji podczas SSR.

</Question>
<Question title="Dlaczego nie używać globalnego obiektu i18n z @lingui/core?">

Na serwerze jeden proces obsługuje wiele żądań jednocześnie. Wywołanie `i18n.activate("fr")` na współdzielonym obiekcie zmieniłoby język dla żądania renderowanego równolegle w języku angielskim. `setupI18n` tworzy odizolowaną instancję dla każdego języka, co jest w pełni bezpieczne.

</Question>
<Question title="Czy muszę uruchamiać lingui compile?">

Nie. Wtyczka `@lingui/vite-plugin` kompiluje katalogi `.po` w momencie ich importowania. Wystarczy uruchamiać `lingui extract`, aby zbierać nowe komunikaty.

</Question>
<Question title="Jak przetłumaczyć tytuł strony i opis meta za pomocą Lingui?">

Zadeklaruj je za pomocą makra `msg`, a następnie przetłumacz w loaderze trasy za pomocą ``i18n._(msg`...`)``. Loader zwraca czyste ciągi znaków, dzięki czemu funkcja `head()` pozostaje synchroniczna, a wartości są serializowane na potrzeby hydratacji. Kroki 8 i 12 pokazują pełną konfigurację.

</Question>
<Question title="Jak duży jest pakiet Lingui w aplikacji TanStack Start?">

[Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md) wskazuje ~56.7 KB gzip dla środowiska uruchomieniowego (runtime). Przy ładowaniu jednego katalogu na język na żądanie strony ważą ~115 KB w porównaniu do 111 KB bez i18n. Statyczne zaimportowanie wszystkich katalogów zwiększa ten rozmiar do ~152 KB.

</Question>
<Question title="Czy mogę zachować makra Lingui i zmigrować się do Intlayer?">

Tak. Adapter [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/lingui.md) pozwala zachować makra i podmienia środowisko uruchomieniowe. Następnie możesz stopniowo migrować komponenty do `useIntlayer`. Zobacz [adaptery kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md).

</Question>

</FAQ>
