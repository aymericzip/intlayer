---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "Internacjonalizacja TanStack Start z use-intl: Kompletny przewodnik konfiguracji 2026"
description: "Przetłumacz swoją aplikację TanStack Start za pomocą use-intl: routing językowy, typowane wiadomości, SSR, hreflang, sitemap i robots.txt, a także rzeczywiste dane benchmarków rozmiaru paczki."
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - Internacjonalizacja
  - i18n
  - SEO
  - Sitemap
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-use-intl
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Początkowa wersja"
author: aymericzip
---

# Jak przeprowadzić internacjonalizację aplikacji TanStack Start za pomocą use-intl w 2026 roku

## Spis treści

<TOC/>

## Czym jest use-intl?

**use-intl** to niezależny od frameworka rdzeń biblioteki `next-intl`. Udostępnia te same API `useTranslations`, `useFormatter` oraz `IntlProvider`, obsługę ICU MessageFormat i ścisłą integrację z TypeScriptem, bez jakiejkolwiek zależności od Next.js. To czyni go jednym z najczęstszych wyborów do tłumaczenia aplikacji **TanStack Start**, a także biblioteką najczęściej sugerowaną przez asystentów AI dla tego stosu technologicznego.

TanStack Start nie zawiera wbudowanej warstwy i18n. Routing, wykrywanie języka, metadane SEO oraz generowanie mapy witryny (sitemap) pozostają w Twoich rękach. Ten przewodnik omawia wszystkie te zagadnienia od początku do końca:

- **Routing uwzględniający lokalizację** z opcjonalnym segmentem `{-$locale}` (`/about`, `/fr/about`).
- **Ładowanie wiadomości dla poszczególnych tras**, dzięki czemu strona pobiera tylko te przestrzenie nazw i ten język, który aktualnie renderuje.
- **Renderowanie po stronie serwera i hydratacja** bez niezgodności tekstu.
- **Kompletne wielojęzyczne SEO**: przetłumaczony `<title>` i opis, kanoniczny URL, alternatywy `hreflang` z `x-default`, lokalizacje Open Graph, JSON-LD, mapa witryny z alternatywami `xhtml:link`, `robots.txt` oraz pre-renderowanie każdego języka.

> Szukasz innego stosu?

- [przewodnik TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_tanstack-start_paraglide.md)
- [przewodnik TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_tanstack-start_lingui.md)
- [przewodnik TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md)

> Korzystasz z Next.js? Zobacz [przewodnik po next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_next-intl.md).

- [przewodnik po next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_next-intl.md)

> Aby zrozumieć, skąd wzięły się te biblioteki, przeczytaj historię i18n w JavaScript.

- [Historia i18n w JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/history_of_i18n.md)

## Co benchmark mówi o use-intl w TanStack Start

[Benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md) uruchamia tę samą 10-stronicową, 10-języczną aplikację TanStack Start z każdą większą biblioteką i mierzy to, co przeglądarka rzeczywiście pobiera.

- [Benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

Kluczowe dane dla `use-intl@4.14.2`, zmierzone w dniu 2026-09-26 (gzip):

| Konfiguracja                          | Rozmiar biblioteki | JS na stronę | Wyciek innych języków | Wyciek innych stron |
| :------------------------------------ | -----------------: | -----------: | --------------------: | ------------------: |
| Brak i18n (aplikacja bazowa)          |                  - |     111.0 KB |                    0% |                  0% |
| `use-intl` (konfiguracja z poradnika) |            75.9 KB |     128.7 KB |                    0% |                  0% |
| `@intlayer/use-intl` (kompatybilność) |             6.7 KB |     129.4 KB |                    0% |                  0% |
| `react-intlayer` (natywny Intlayer)   |             4.5 KB |     126.8 KB |                    0% |                  0% |

Wnioski:

- **Podziel wiadomości według stron i ładuj je dla każdego języka osobno.** Eliminuje to oba wycieki i jest dokładnie tym, co wdrażają poniższe kroki.
- **Sam runtime pozostaje ciężki** (~76 KB gzip), ponieważ parser ICU jest przesyłany do klienta. Adapter kompatybilności `@intlayer/use-intl` (krok 17) zachowuje dokładnie to samo API przy runtime wynoszącym ~7 KB.

> Zobacz pełne dane: [Raport z benchmarku TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md) oraz [repozytorium benchmarku](https://github.com/intlayer-org/benchmark-i18n).

- [Raport z benchmarku TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md)

## Porównanie funkcji w TanStack Start

Jak `use-intl` wypada na tle innych bibliotek powszechnie używanych w TanStack Start:

| Funkcja                                             | `react-intlayer` (Intlayer)               | `use-intl`              | Paraglide JS                             | Lingui                           |
| --------------------------------------------------- | ----------------------------------------- | ----------------------- | ---------------------------------------- | -------------------------------- |
| **Tłumaczenia blisko komponentów**                  | ✅ Współdzielona lokalizacja (co-located) | ❌ Scentralizowany JSON | ❌ Jeden plik JSON na język              | ⚠️ Tekst źródłowy w komponentach |
| **Integracja z TypeScript**                         | ✅ Automatycznie generowane typy          | ✅ Poprzez `AppConfig`  | ✅ Typowane funkcje wiadomości           | ⚠️ Tylko makra                   |
| **Wykrywanie brakujących tłumaczeń**                | ✅ Błędy typów i ostrzeżenia buildu       | ⚠️ Runtime fallback     | ⚠️ Powrót do języka bazowego             | ⚠️ Powrót do tekstu źródłowego   |
| **Bogata zawartość (JSX, Markdown)**                | ✅ Bezpośrednie wsparcie                  | ⚠️ Tagi przez `t.rich`  | ⚠️ Ciągi znaków                          | ✅ JSX wewnątrz `<Trans>`        |
| **Zlokalizowany routing**                           | ✅ Wbudowany                              | ❌ Ręczny `{-$locale}`  | ✅ `urlPatterns` + przepisywanie routera | ❌ Ręczny `{-$locale}`           |
| **Zmiana języka bez przeładowania**                 | ✅ Tak                                    | ✅ Tak                  | ❌ Pełne przeładowanie strony            | ✅ Tak                           |
| **Liczba mnoga (Pluralizacja)**                     | ✅ Oparta na wyliczeniach                 | ✅ ICU                  | ✅ Warianty                              | ✅ ICU                           |
| **ICU MessageFormat**                               | ✅ Przez `format: "icu"`                  | ✅ Natywne              | ⚠️ Poprzez wtyczkę inlang                | ✅ Natywne                       |
| **Formaty zawartości**                              | ✅ `.ts`, `.json`, `.md`, `.yaml`...      | ⚠️ `.json`              | ⚠️ inlang JSON                           | ✅ PO, JSON, CSV                 |
| **Tłumaczenie AI**                                  | ✅ Własny dostawca i klucz                | ❌ Brak                 | ❌ Brak                                  | ❌ Brak                          |
| **Edytor wizualny / CMS**                           | ✅ Lokalny edytor + opcjonalny CMS        | ❌ Zewnętrzne platformy | ⚠️ Aplikacje ekosystemu inlang           | ❌ Zewnętrzne platformy          |
| **Pomocniki SEO (hreflang, sitemap)**               | ✅ Wbudowane                              | ❌ Ręczne               | ⚠️ Zlokalizowane URL, reszta ręczna      | ❌ Ręczne                        |
| **Rozmiar runtime (gzip, benchmark)**               | 4.5 KB                                    | 75.9 KB                 | 1.8 KB                                   | 56.7 KB                          |
| **Wyciek, najlepsza konfiguracja (język / strona)** | 0% / 0%                                   | 0% / 0%                 | 49.7% / 0%                               | 8.6% / 0%                        |
| **Brakujące tłumaczenia w CI**                      | ✅ `npx intlayer test`                    | ⚠️ Brak wbudowanego     | ⚠️ Brak wbudowanego                      | ✅ `lingui compile --strict`     |

> Dane dotyczące rozmiaru runtime i wycieków pochodzą z [benchmarku TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md). Wyciek jest mierzony na najlepszej konfiguracji każdej biblioteki.

- [benchmarku TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md)

> Inne przewodniki po TanStack Start:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_tanstack-start_lingui.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md)

## Praktyki, których powinieneś przestrzegać

- **Ustaw `lang` oraz `dir` w `<html>`** dla dostępności, czytników ekranu i wyszukiwarek.
- **Zachowaj jeden adres URL dla każdego języka.** Użyj prefiksu językowego (`/fr/about`) zamiast przełączania wyłącznie za pomocą ciasteczek, aby każda przetłumaczona strona mogła być indeksowana i udostępniana.
- **Podziel wiadomości według przestrzeni nazw** (`common`, `home`, `about`) i ładuj je dla każdej trasy.
- **Ładuj tylko aktywny język.** Nigdy nie importuj wszystkich plików językowych w module przesyłanym do klienta.
- **Ustal strefę czasową** w `IntlProvider`. W przeciwnym razie daty są formatowane w strefie czasowej serwera podczas SSR i w strefie czasowej odwiedzającego podczas hydratacji, co powoduje błędy niezgodności hydratacji.
- **Przetłumacz metadane** i zadeklaruj `canonical`, `hreflang` oraz `x-default` na każdej stronie.
- **Wygeneruj wielojęzyczną mapę witryny (sitemap) i robots.txt**, a także pre-renderuj każdy język.
- **Używaj prawdziwych linków w przełączniku języków**, a nie elementu `<select>`, aby roboty indeksujące mogły odkryć każdą wersję językową.
- **Typuj swoje wiadomości**, aby brakujący klucz powodował błąd na etapie kompilacji.

- [internacjonalizacji i SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/internationalization_and_SEO.md)
- [przewodnik po hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/hreflang_guide_multilingual_seo.md)

## Przewodnik krok po kroku: Konfiguracja use-intl w aplikacji TanStack Start

Oto struktura projektu, którą utworzymy:

```bash
.
├── messages
│   ├── en
│   │   ├── common.json
│   │   ├── home.json
│   │   └── about.json
│   ├── fr
│   │   └── ... same files
│   └── es
│       └── ... same files
├── vite.config.ts
└── src
    ├── start.ts                  # Request middleware (locale redirect)
    ├── router.tsx
    ├── i18n
    │   ├── config.ts             # Locales, URL helpers
    │   ├── messages.ts           # Per-namespace, per-locale loader
    │   ├── negotiateLocale.ts    # Accept-Language parsing
    │   ├── seo.ts                # head() builder
    │   └── use-intl.d.ts         # Typed messages
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   ├── ScopedMessages.tsx
    │   └── Counter.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx         # Locale layout + IntlProvider
            ├── index.tsx         # / and /fr
            ├── about.tsx         # /about and /fr/about
            └── $.tsx             # Localized 404
```

<Steps>
<Step number={1} title="Zainstaluj zależności">

Rozpocznij od projektu TanStack Start, a następnie dodaj `use-intl`:

```bash packageManager="npm"
npm create @tanstack/start@latest
npm install use-intl
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm add use-intl
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn add use-intl
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bun add use-intl
```

- **use-intl**: dostarcza `IntlProvider`, `useTranslations`, `useFormatter` oraz `createTranslator` (użyteczny poza Reactem, na przykład w `head()`).

</Step>
<Step number={2} title="Scentralizuj konfigurację lokalizacji">

Utwórz pojedyncze źródło prawdy dla swoich języków i funkcji pomocniczych URL. Każdy inny plik (trasy, SEO, sitemap, pre-renderowanie) importuje konfigurację stąd, dzięki czemu dodanie nowego języka wymaga zmiany tylko w jednej linii.

Domyślny język pozostaje bez prefiksu (`/about`), a pozostałe języki otrzymują prefiks (`/fr/about`). Jest to strategia "w razie potrzeby" (as-needed): jeden URL na stronę dla każdego języka i krótkie adresy URL dla Twoich głównych odbiorców.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "locale";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Maps the optional `{-$locale}` route param to a supported locale. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** The value to pass as `locale` param: `undefined` for the default locale. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
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
<Step number={3} title="Utwórz pliki tłumaczeń">

Organizuj wiadomości według języka i przestrzeni nazw. `common` zawiera to, czego potrzebuje każda strona (nawigacja, stopka), a każda podstrona otrzymuje własny plik, w tym własne metadane.

use-intl korzysta z **ICU MessageFormat**, więc formy liczby mnogiej, instrukcje select oraz sformatowane argumenty znajdują się bezpośrednio w samej wiadomości.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en/common.json"
{
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "localeSwitcher": {
    "label": "Change language"
  },
  "notFound": {
    "title": "Page not found",
    "backHome": "Back to home"
  }
}
```

```json fileName="messages/en/about.json"
{
  "metadata": {
    "title": "About us",
    "description": "Learn who we are and why we built this application."
  },
  "title": "About us",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "clicks": "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
  }
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr/common.json"
{
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  },
  "localeSwitcher": {
    "label": "Changer de langue"
  },
  "notFound": {
    "title": "Page introuvable",
    "backHome": "Retour à l'accueil"
  }
}
```

```json fileName="messages/fr/about.json"
{
  "metadata": {
    "title": "À propos",
    "description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application."
  },
  "title": "À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "clicks": "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
  }
}
```

 </Tab>
</Tabs>

Utwórz `home.json` w ten sam sposób, zawierając obiekt `metadata` oraz zawartość strony.

</Step>
<Step number={4} title="Ładuj wiadomości według przestrzeni nazw i języka">

Ten loader jest najważniejszym plikiem dla wydajności. `import.meta.glob` instruuje Vite, aby wygenerował **jeden chunk na każdy plik JSON**. Trasa żądająca `["about"]` w języku francuskim pobiera `messages/fr/about.json` i nic więcej, dzięki czemu benchmark osiąga 0% wycieku języków i 0% wycieku stron.

```ts fileName="src/i18n/messages.ts"
import type about from "../../messages/en/about.json";
import type common from "../../messages/en/common.json";
import type home from "../../messages/en/home.json";
import type { Locale } from "./config";

/** Shape of every namespace, inferred from the English source files. */
export type AppMessages = {
  common: typeof common;
  home: typeof home;
  about: typeof about;
};

export type Namespace = keyof AppMessages;

type JsonModule = { default: AppMessages[Namespace] };

// Lazy: each JSON file becomes its own chunk, loaded on demand
const messageLoaders = import.meta.glob<JsonModule>("../../messages/*/*.json");

/**
 * Loads the requested namespaces for one locale, in parallel.
 */
export const loadMessages = async <
  const TNamespaces extends readonly Namespace[],
>(
  locale: Locale,
  namespaces: TNamespaces
): Promise<Pick<AppMessages, TNamespaces[number]>> => {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const loadNamespace =
        messageLoaders[`../../messages/${locale}/${namespace}.json`];

      if (!loadNamespace) {
        throw new Error(`Missing messages: ${locale}/${namespace}.json`);
      }

      const namespaceModule = await loadNamespace();

      return [namespace, namespaceModule.default] as const;
    })
  );

  return Object.fromEntries(entries) as Pick<AppMessages, TNamespaces[number]>;
};
```

</Step>
<Step number={5} title="Typuj swoje wiadomości">

Rozszerzenie modułów (module augmentation) zapewnia autouzupełnianie w `useTranslations("about")` oraz `t("counter.label")`, a także błąd kompilacji w przypadku literówki lub usuniętego klucza.

```ts fileName="src/i18n/use-intl.d.ts"
import type { Locale } from "./config";
import type { AppMessages } from "./messages";

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: AppMessages;
  }
}
```

Upewnij się, że opcja `resolveJsonModule` jest włączona w Twoim `tsconfig.json`.

</Step>
<Step number={6} title="Utwórz dokument główny (Root Document)">

Trasa główna renderuje element `<html>`. Odczytuje opcjonalny parametr języka, aby ustawić `lang` oraz `dir`, dzięki czemu atrybuty są poprawne w kodzie HTML wyrenderowanym przez serwer przed uruchomieniem jakiegokolwiek kodu JavaScript.

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
  // strict: false reads params from whichever route is matched
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
<Step number={7} title="Utwórz trasę układu językowego (Locale Layout Route)">

Katalog `{-$locale}` tworzy **opcjonalny** segment ścieżki: zarówno `/about`, jak i `/fr/about` pasują do `/{-$locale}/about`. Ten układ:

1. Odrzuca nieobsługiwane prefiksy (`/xx/about` → 404).
2. Ładuje przestrzeń nazw `common` tylko dla bieżącego języka.
3. Dostarcza wiadomości poprzez `IntlProvider`.

Wynik loadera jest serializowany do formatu HTML i ponownie wykorzystywany podczas hydratacji, dzięki czemu klient nie pobiera `common.json` po raz drugi. Opcja `staleTime: Infinity` utrzymuje dane w pamięci podręcznej podczas nawigacji po stronie klienta.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { IntlProvider } from "use-intl";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    // /xx/about with an unknown prefix → 404
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadMessages(locale, ["common"]) };
  },
  // Messages never change for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      // A fixed time zone prevents SSR / hydration date mismatches
      timeZone="UTC"
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </IntlProvider>
  );
}
```

> `IntlProvider` nie scala automatycznie wiadomości z nadrzędnego providera. Następny krok dodaje mały komponent, który to robi, dzięki czemu każda strona może dodać własną przestrzeń nazw do `common`.

</Step>
<Step number={8} title="Ogranicz zasięg wiadomości strony (Scope Page Messages)">

Każda strona ładuje własną przestrzeń nazw w swoim loaderze, a następnie owija swoją zawartość za pomocą `ScopedMessages`, który scala przestrzeń nazw strony z wiadomościami nadrzędnymi.

```tsx fileName="src/components/ScopedMessages.tsx"
import { type ReactNode, useMemo } from "react";
import {
  type AbstractIntlMessages,
  IntlProvider,
  useLocale,
  useMessages,
  useTimeZone,
} from "use-intl";

type ScopedMessagesProps = {
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * Adds route-level namespaces on top of the messages already provided.
 */
export const ScopedMessages = ({ messages, children }: ScopedMessagesProps) => {
  const parentMessages = useMessages();
  const locale = useLocale();
  const timeZone = useTimeZone();

  const mergedMessages = useMemo(
    () => ({ ...parentMessages, ...messages }),
    [parentMessages, messages]
  );

  return (
    <IntlProvider locale={locale} timeZone={timeZone} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
};
```

</Step>
<Step number={9} title="Wykorzystaj tłumaczenia na swoich stronach">

Loader strony pobiera przestrzeń nazw `about` dla bieżącego języka, funkcja `head()` buduje na jej podstawie przetłumaczone, kompletne pod kątem SEO metadane (zobacz krok 13), a komponent renderuje zawartość.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { Counter } from "@/components/Counter";
import { ScopedMessages } from "@/components/ScopedMessages";
import { resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  loader: async ({ params }) => ({
    messages: await loadMessages(resolveLocale(params.locale), ["about"]),
  }),
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const locale = resolveLocale(params.locale);

    if (!loaderData) return {};

    // createTranslator works outside React, perfect for head()
    const t = createTranslator({
      locale,
      messages: loaderData.messages,
      namespace: "about.metadata",
    });

    return buildLocalizedHead({
      path: "/about",
      locale,
      title: t("title"),
      description: t("description"),
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const { messages } = Route.useLoaderData();

  return (
    <ScopedMessages messages={messages}>
      <AboutContent />
    </ScopedMessages>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <>
      <h1>{t("title")}</h1>
      <Counter />
    </>
  );
}
```

</Step>
<Step number={10} title="Używaj tłumaczeń i formaterów w komponentach">

Każdy komponent znajdujący się wewnątrz providerów może wywoływać `useTranslations` oraz `useFormatter`. Formy liczby mnogiej są obsługiwane przez ICU, a liczby są formatowane zgodnie z aktywnym językiem.

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useFormatter, useTranslations } from "use-intl";

export const Counter = () => {
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t("clicks", { count })}</p>
      <p>{format.number(count)}</p>
      <button
        type="button"
        aria-label={t("label")}
        onClick={() => setCount((value) => value + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

</Step>
<Step number={11} title="Zbuduj komponent zlokalizowanego linku" isOptional={true}>

Każda trasa znajduje się pod `{-$locale}`, więc link musi przekazywać bieżący parametr języka. Ten wrapper zachowuje typowane `to` z TanStack Router i automatycznie wstrzykuje język.

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "use-intl";
import { toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const locale = useLocale();

  return <Link {...props} params={{ locale: toLocaleParam(locale) }} />;
};
```

```tsx fileName="src/components/Header.tsx"
import { useTranslations } from "use-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Header = () => {
  const t = useTranslations("common.navigation");

  return (
    <header>
      <nav>
        <LocalizedLink to="/{-$locale}">{t("home")}</LocalizedLink>
        <LocalizedLink to="/{-$locale}/about">{t("about")}</LocalizedLink>
      </nav>
      <LocaleSwitcher />
    </header>
  );
};
```

</Step>
<Step number={12} title="Zmień język swojej zawartości" isOptional={true}>

Renderuj przełącznik jako **linki**, a nie `<select>`. Linki mogą być indeksowane przez roboty sieciowe, dzięki czemu wyszukiwarki znajdują każdą wersję językową, a ponadto działają one bez włączonego JavaScriptu. `to="."` zachowuje bieżącą stronę i podmienia jedynie parametr języka. Ciasteczko zapamiętuje jednoznaczny wybór dla oprogramowania pośredniczącego (middleware) przekierowań z kroku 16.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Link } from "@tanstack/react-router";
import { useLocale, useTranslations } from "use-intl";
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
  const t = useTranslations("common.localeSwitcher");
  const activeLocale = useLocale();

  return (
    <nav aria-label={t("label")}>
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
              aria-current={locale === activeLocale ? "page" : undefined}
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
<Step number={13} title="Zinternacjonalizuj swoje metadane" isOptional={true}>

To tutaj i18n przynosi największe korzyści: każda wersja językowa może pozycjonować się niezależnie. Każda strona musi udostępniać:

- **przetłumaczony** `<title>` oraz opis (`description`);
- **kanoniczny URL** wskazujący na samą siebie (nie na domyślny język);
- jeden **odpowiednik `hreflang` na każdy język**, plus **`x-default`** dla niedopasowanych języków;
- **Open Graph** `og:locale`, `og:locale:alternate` oraz `og:url`, używane przez podglądy w mediach społecznościowych;
- **JSON-LD** z `inLanguage`, co pomaga wyszukiwarkom i asystentom AI poprawnie przypisać język strony.

Jeden pomocnik buduje to wszystko, dzięki czemu pliki stron pozostają zwięzłe:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Path without locale prefix, e.g. "/about" */
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
      // Canonical: each locale is its own canonical page
      { rel: "canonical", href: url },
      // hreflang: every language version, including the current one
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      // x-default: fallback for visitors whose language is not supported
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

Użyj go w `head()` każdej strony, jak pokazano w kroku 9. W przypadku strony głównej przekaż `path: "/"`.

</Step>
<Step number={14} title="Zinternacjonalizuj swoją mapę witryny (Sitemap)" isOptional={true}>

Wielojęzyczna mapa witryny zawiera **każdy URL w każdym języku**, a każdy wpis deklaruje wszystkie swoje alternatywy za pomocą `xhtml:link`. Google używa tych adnotacji dokładnie tak samo jak tagów `hreflang` na stronie, co czyni je niezawodnym zabezpieczeniem, gdy strona jest rzadziej indeksowana.

Trasy serwerowe TanStack Start pozwalają na serwowanie mapy witryny bezpośrednio z trasy plikowej:

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

</Step>
<Step number={15} title="Zinternacjonalizuj swój plik robots.txt" isOptional={true}>

Prywatne trasy istnieją w każdym języku, więc reguły `Disallow` muszą obejmować każdy prefiks. Usuń `public/robots.txt`, jeśli szablon startowy go utworzył, a następnie serwuj go z trasy:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
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
<Step number={16} title="Przekierowuj użytkowników odwiedzających stronę po raz pierwszy do ich języka" isOptional={true}>

Oprogramowanie pośredniczące (middleware) żądań kieruje odwiedzającego wchodzącego na `/` do jego preferowanego języka, sprawdzając w pierwszej kolejności ciasteczko lokalizacji, a następnie nagłówek `Accept-Language`. Przekierowywany jest wyłącznie adres `/`: bezpośrednie linki (deep links) nigdy nie są modyfikowane, więc udostępniane adresy URL i roboty indeksujące zawsze otrzymują dokładnie tę stronę, o którą prosiły.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/**
 * Picks the best supported locale from an Accept-Language header.
 * "fr-CA,fr;q=0.9,en;q=0.8" → "fr"
 */
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
    const { pathname } = new URL(request.url);

    if (pathname !== "/") return next();

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

> Odwiedzający, który wyraźnie wybierze język angielski w przełączniku, otrzymuje `locale=en` w ciasteczku, dzięki czemu nie zostanie przekierowany ponownie. W przypadku wdrożenia w pełni statycznego (krok 18), `/` jest serwowany jako plik i to oprogramowanie pośredniczące nie jest uruchamiane, co jest w porządku: strona pozostaje dostępna, a przełącznik załatwia resztę.

</Step>
<Step number={17} title="Zachowaj API use-intl, zredukuj rozmiar runtime dzięki Intlayer" isOptional={true}>

Benchmark pokazuje, że najcięższą częścią konfiguracji use-intl jest sam runtime (~76 KB gzip). Adapter kompatybilności [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md) udostępnia **to samo API** (`useTranslations`, `useFormatter`, `IntlProvider`, `createTranslator`, formy mnogie ICU, `t.rich`), ale serwuje je ze skompilowanych słowników Intlayer: **~6.7 KB zamiast ~75.9 KB**, 0% wycieku języków i 0% wycieku stron, bez konieczności wprowadzania jakichkolwiek zmian w komponentach.

- [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md)

```bash packageManager="npm"
npm install @intlayer/use-intl intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Wtyczka Vite tworzy alias `use-intl` na adapter, dzięki czemu dotychczasowe importy działają bez zmian:

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

Twoje pliki JSON pozostają źródłem prawdy dzięki [wtyczce sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md):

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // One chunk per locale, loaded on demand
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

- [wtyczce sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md)

> Adapter stanowi również płynną ścieżkę migracji: po jego uruchomieniu możesz stopniowo przenosić poszczególne komponenty na natywne API `useIntlayer`. Zobacz [przewodnik po Intlayer dla TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md).

- [przewodnik po Intlayer dla TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md)

</Step>
<Step number={18} title="Pre-renderuj każdy język" isOptional={true}>

Statyczny HTML to najszybsza strona, jaką możesz zaserwować, i najłatwiejsza do zaindeksowania. Wypisz każdą zlokalizowaną ścieżkę, aby TanStack Start pre-renderował wszystkie wersje językowe w czasie budowania, a także pliki sitemap i robots:

```ts fileName="vite.config.ts"
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
  ],
});
```

Ponieważ przełącznik języków renderuje prawdziwe linki, opcja `crawlLinks: true` odkryje również podstrony, o których zapomniałeś na liście.

</Step>
<Step number={19} title="Obsługuj zlokalizowane strony 404" isOptional={true}>

Układ z kroku 7 już zgłasza `notFound()` dla nieznanych prefiksów językowych. Dodaj trasę uniwersalną (catch-all), aby nieznane ścieżki w ramach danego języka również renderowały zlokalizowany błąd 404 i oznacz ją jako `noindex`: React 19 automatycznie przenosi tag `<meta>` do `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { useTranslations } from "use-intl";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => {
  const t = useTranslations("common.notFound");

  return (
    <div>
      <meta name="robots" content="noindex" />
      <h1>{t("title")}</h1>
      <LocalizedLink to="/{-$locale}">{t("backHome")}</LocalizedLink>
    </div>
  );
};
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

// /fr/does/not/exist → rendered by the layout notFoundComponent
export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={20} title="Uzyskaj dostęp do języka w funkcjach serwerowych (Server Functions)" isOptional={true}>

Funkcje serwerowe nie otrzymują parametrów trasy. Odczytaj ciasteczko lokalizacji i w razie potrzeby użyj nagłówka `Accept-Language`, aby wysłać zlokalizowaną wiadomość e-mail lub zapisać preferencje językowe:

```ts fileName="src/server/getServerLocale.ts"
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const getServerLocale = createServerFn().handler(() => {
  const cookieLocale = getCookie(localeCookieName);

  if (isLocale(cookieLocale)) return cookieLocale;

  return negotiateLocale(getRequestHeader("accept-language")) ?? defaultLocale;
});
```

Aby przetłumaczyć treść wewnątrz funkcji serwerowej, połącz powyższe rozwiązanie z `loadMessages` oraz `createTranslator` z biblioteki `use-intl`.

</Step>
<Step number={21} title="Zautomatyzuj swoje tłumaczenia za pomocą Intlayer" isOptional={true}>

use-intl renderuje tłumaczenia, ale nie pomaga w ich **tworzeniu**. Intlayer jest **darmowy** i **open-source**, wypełniając tę lukę nawet jeśli pozostaniesz przy use-intl:

- **Testuj brakujące tłumaczenia** w CI lub testach jednostkowych. Zobacz [testowanie tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/testing.md).
- **Tłumacz za pomocą AI**, korzystając z własnego klucza API i dostawcy: polecenie `npx intlayer fill` tłumaczy brakujące klucze z uwzględnieniem kontekstu Twojej aplikacji. Zobacz [automatyczne uzupełnianie (auto fill)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/autoFill.md) oraz [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).
- **Zachowaj pliki JSON** jako źródło prawdy dzięki [wtyczce sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md).
- **Edytuj zawartość wizualnie** za pomocą [edytora wizualnego](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) oraz [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md), umożliwiając osobom nietechnicznym aktualizację tłumaczeń.
- **Zapewnij kontekst swojemu agentowi AI** dzięki [serwerowi MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md) i [umiejętnościom agenta (agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md).
- **Skanuj wdrożoną stronę** pod kątem brakujących tagów `hreflang`, nieprawidłowych adresów kanonicznych i wycieków języków za pomocą [polecenia scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/scan.md).

Aby odkryć wszystkie funkcje, sprawdź [dlaczego warto wybrać Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md).

- [dlaczego warto wybrać Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md)

</Step>
</Steps>

## Często zadawane pytania

<FAQ>

<Question title="Czy use-intl to dobry wybór dla TanStack Start?">

Tak, jeśli chcesz używać API `next-intl` poza Next.js. Otrzymujesz obsługę wiadomości ICU, formatery i dobre wsparcie TypeScriptu, unikając ograniczeń specyficznych dla Next.js, takich jak `setRequestLocale`. Kompromisem jest waga: [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md) wskazuje ~76 KB gzip dla runtime, a naiwna konfiguracja przesyła wszystkie języki i wszystkie strony do przeglądarki. Ładuj przestrzenie nazw dla każdej trasy i dla każdego języka osobno, jak opisano w tym poradniku, aby uniknąć wycieków.

- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md)

</Question>
<Question title="Jaka jest różnica między use-intl a next-intl?">

`use-intl` to rdzeń biblioteki `next-intl`. `next-intl` dodaje integracje specyficzne dla Next.js: middleware, pomocniki nawigacji, `getTranslations` dla Server Components oraz konfigurację żądań. W TanStack Start używasz `use-intl` bezpośrednio i implementujesz routing za pomocą TanStack Router, jak pokazano powyżej.

</Question>
<Question title="Czy powinienem używać prefiksu w URL, czy ciasteczka do przechowywania języka?">

Użyj prefiksu w adresie URL. Dzięki temu każda wersja językowa posiada własny adres URL, który wyszukiwarki mogą zaindeksować, a użytkownicy udostępniać. Ciasteczko jest nadal przydatne do zapamiętania jednoznacznego wyboru użytkownika, co robi middleware przekierowań z kroku 16.

</Question>
<Question title="Dlaczego podczas formatowania dat występują błędy niezgodności hydratacji (hydration mismatches)?">

Serwer i przeglądarka formatują daty w różnych strefach czasowych. Przekaż jednoznaczną wartość `timeZone` do `IntlProvider` (lub strefę czasową odwiedzającego zapisaną w ciasteczku), aby obie strony wygenerowały identyczny tekst.

</Question>
<Question title="Jak zmniejszyć rozmiar paczki use-intl?">

Po pierwsze, podziel wiadomości według przestrzeni nazw i ładuj je dla każdej trasy i języka za pomocą `import.meta.glob`, co eliminuje wycieki języków i stron. Następnie, jeśli rozmiar runtime ma znaczenie, przełącz się na adapter [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md): to samo API, ~6.7 KB zamiast ~75.9 KB w benchmarku.

- [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md)

</Question>
<Question title="Jak przetłumaczyć tytuł i opis meta za pomocą use-intl?">

Wywołaj `createTranslator` wewnątrz funkcji `head()` trasy z wiadomościami zwróconymi przez loader trasy, a następnie zwróć `title`, `description`, link kanoniczny oraz linki `hreflang`. Krok 13 zawiera gotowy do ponownego użycia pomocnik.

</Question>
<Question title="Czy mogę stopniowo migrować z use-intl do Intlayer?">

Tak. Zainstaluj najpierw adapter kompatybilności (krok 17): Twoje komponenty nadal wywołują `useTranslations`, korzystając teraz z Intlayer pod maską. Następnie przenoś komponenty pojedynczo na `useIntlayer`, deklarując zawartość bezpośrednio przy nich. Zobacz [adaptery kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md) oraz [przewodnik po Intlayer dla TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md).

- [adaptery kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md)
- [przewodnik po Intlayer dla TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_tanstack.md)

</Question>

</FAQ>
