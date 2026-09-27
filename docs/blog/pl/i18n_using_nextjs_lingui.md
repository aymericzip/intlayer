---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "Next.js 16 i18n z Lingui: Przewodnik konfiguracji App Router"
description: "Skonfiguruj Lingui w Next.js 16 App Router: Server Components, makra SWC, routing proxy, generateMetadata, hreflang, sitemap i robots.txt, z danymi z benchmarków."
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - Internacjonalizacja
  - i18n
  - SEO
  - Blog
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Wersja początkowa"
author: aymericzip
---

# Jak przeprowadzić internacjonalizację aplikacji Next.js za pomocą Lingui w 2026 roku

## Spis treści

<TOC/>

## Czym jest Lingui?

**Lingui** to biblioteka i18n zbudowana wokół **makr** oraz **ekstrakcji komunikatów**. Tekst źródłowy piszesz bezpośrednio w komponentach (`` t`Hello` ``, `<Trans>Hello</Trans>`), polecenie `lingui extract` zbiera wszystkie komunikaty do katalogów (domyślnie plików PO), a loader kompiluje je do zwartego kodu JavaScript. Komunikaty korzystają z formatu ICU MessageFormat, a Lingui wspiera **React Server Components** w App Routerze.

Ten przewodnik przedstawia konfigurację Lingui w projekcie **Next.js 16 App Router** z:

- **Makrami kompilowanymi przez SWC**, dzięki czemu Turbopack zachowuje swoją szybkość.
- **Komponentami serwerowymi i klienckimi** współdzielącymi to samo API `Trans` oraz `useLingui`.
- **Routingiem według locale** przez `proxy.ts`: `/about` dla domyślnego języka, `/fr/about` dla pozostałych oraz wykrywaniem języka przy pierwszej wizycie.
- **Statycznym renderowaniem** każdego języka za pomocą `generateStaticParams`.
- **Kompletnym wielojęzycznym SEO**: przetłumaczonym `generateMetadata`, canonical, `hreflang` z `x-default`, Open Graph locales, JSON-LD, `sitemap.ts`, `robots.ts` oraz zlokalizowanymi stronami 404.

> Szukasz innej biblioteki?

- [przewodnik po next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_next-intl.md)
- [przewodnik po next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_next-i18next.md)
- [przewodnik Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md)

> Używasz TanStack Start?

- [przewodnik TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_tanstack-start_lingui.md)

> Porównujesz biblioteki?

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/lingui_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/next-i18next_vs_next-intl_vs_intlayer.md)

> Aby zrozumieć, skąd wzięły się te biblioteki, przeczytaj historię i18n w JavaScript.

- [Historia i18n w JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/history_of_i18n.md)

## Co benchmark mówi o Lingui w Next.js

[Benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md) uruchamia tę samą 10-stronicową, 10-języczną aplikację Next.js z każdą główną biblioteką i mierzy, co przeglądarka faktycznie pobiera.

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

Główne liczby dla `@lingui/core@6.6.0` w Next.js 16, zmierzone w dniu 2026-09-26 (gzip):

| Konfiguracja                        | Rozmiar biblioteki | JS na stronę | Wyciek innych języków | Wyciek innych stron |
| :---------------------------------- | -----------------: | -----------: | --------------------: | ------------------: |
| Brak i18n (aplikacja bazowa)        |                  - |     141.0 KB |                    0% |                  0% |
| Lingui, jeden katalog na locale     |            72.1 KB |     145.4 KB |                  2.8% |               89.9% |
| `@intlayer/lingui` (kompatybilność) |            10.7 KB |     221.6 KB |                   50% |                 90% |
| `next-intlayer` (natywny Intlayer)  |             4.9 KB |     141.5 KB |                    0% |                  0% |

Wnioski:

- **Pojedynczy katalog na locale wciąż powoduje wyciek komunikatów z innych stron** do providera klienta. Trzymaj jak najwięcej tekstu w Server Components, które przesyłają wyrenderowany HTML, a nie katalogi.
- **Środowisko uruchomieniowe Lingui waży ~72 KB gzip.** Adapter kompatybilności `@intlayer/lingui` zmniejsza runtime do ~11 KB, ale w tym benchmarku konfiguracja kompatybilności Next.js nadal przesyła całe katalogi do strony. Natywne API `next-intlayer` to konfiguracja, która zachowuje rozmiar aplikacji bazowej.

> Zobacz pełne dane: [raport z benchmarku Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md) oraz [repozytorium benchmarku](https://github.com/intlayer-org/benchmark-i18n).

## Porównanie funkcji w Next.js

Jak Lingui wypada w porównaniu z `next-intl` i Intlayer pod względem funkcji, których zwykle wymaga projekt Next.js App Router:

| Funkcja                                 | `next-intlayer` (Intlayer)                             | Lingui                                                            | `next-intl`                               |
| --------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------- | ----------------------------------------- |
| **Tłumaczenia blisko komponentów**      | ✅ Treści kolokowane z każdym komponentem              | ⚠️ Tekst źródłowy w komponentach, katalogi scentralizowane        | ❌ Scentralizowany JSON                   |
| **Integracja z TypeScript**             | ✅ Automatycznie generowane ścisłe typy                | ⚠️ Makra typowane, katalogi komunikatów nie                       | ✅ Dobre, przez rozszerzenie `AppConfig`  |
| **Wykrywanie brakujących tłumaczeń**    | ✅ Błędy TypeScript i ostrzeżenia podczas budowy       | ⚠️ Runtime fallback do tekstu źródłowego                          | ⚠️ Runtime fallback                       |
| **Treści sformatowane (JSX, Markdown)** | ✅ Bezpośrednie wsparcie                               | ✅ JSX wewnątrz `<Trans>`, brak Markdown                          | ⚠️ Tagi przez `t.rich`, brak Markdown     |
| **Tłumaczenie AI**                      | ✅ Własny dostawca i klucz API, z kontekstem aplikacji | ❌ Brak                                                           | ❌ Brak                                   |
| **Edytor wizualny / CMS**               | ✅ Lokalny edytor wizualny + opcjonalny CMS            | ❌ Przez platformy zewnętrzne                                     | ❌ Przez platformy zewnętrzne             |
| **Zlokalizowany routing**               | ✅ Wbudowany                                           | ❌ Wymaga napisania własnego `proxy.ts`                           | ✅ Wbudowany segment `[locale]`           |
| **Liczba mnoga (Pluralizacja)**         | ✅ Oparta na wyliczeniach                              | ✅ ICU, makro `<Plural>`                                          | ✅ ICU                                    |
| **Formaty treści**                      | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml`       | ✅ PO, JSON, CSV                                                  | ✅ `.json`, `.js`, `.ts`                  |
| **ICU MessageFormat**                   | ✅ Przez `format: "icu"`                               | ✅ Natywnie                                                       | ✅ Natywnie                               |
| **Pomocnicy SEO (hreflang, sitemap)**   | ✅ Pomocnicy dla metadata, sitemap i robots.txt        | ❌ Ręcznie                                                        | ✅ Dobre                                  |
| **Server Components**                   | ✅ Bezpośredni dostęp w każdym Server Component        | ⚠️ `setI18n` w każdym układzie i na każdej stronie                | ⚠️ `await getTranslations()` na komponent |
| **Tree-shaking per komponent**          | ✅ W czasie budowy (Babel / SWC)                       | ⚠️ Jeden katalog na locale, ekstraktor per strona eksperymentalny | ⚠️ Ręcznie, z `pick()` na trasę           |
| **Rozmiar runtime (gzip, benchmark)**   | 4.9 KB                                                 | 72.1 KB                                                           | 14.7 KB                                   |
| **Brakujące tłumaczenia w CI**          | ✅ `npx intlayer test`                                 | ✅ `lingui compile --strict`                                      | ⚠️ Brak wbudowanego rozwiązania           |
| **Ekosystem / społeczność**             | ⚠️ Mniejsza, szybko rosnąca                            | ✅ Dojrzały                                                       | ✅ Duży                                   |

> Rozmiary runtime pochodzą z [benchmarku Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md). Szczegółowe omówienie znajdziesz w artykule [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/lingui_vs_intlayer.md).

> Inne poradniki dla Next.js:

- [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_next-intl.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_next-i18next.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md)

## Praktyki, których powinieneś przestrzegać

- **Ustaw `lang` i `dir` w tagu `<html>`** w układzie `[locale]`.
- **Preferuj Server Components** dla tekstu: renderują HTML na serwerze i nie wymagają przesyłania katalogu do klienta.
- **Wywołuj `initLingui(locale)` w każdym układzie i na każdej stronie.** Układy nie renderują się ponownie podczas nawigacji, więc strona nie może polegać na tym, że jej układ ustawił locale.
- **Utrzymuj jeden adres URL na locale** i wstępnie renderuj każdy język za pomocą `generateStaticParams`.
- **Tłumacz swoje metadane** w `generateMetadata`, uwzględniając `canonical`, `hreflang` oraz `x-default`.
- **Generuj wielojęzyczną mapę witryny i robots.txt** zgodnie z konwencjami `sitemap.ts` i `robots.ts`.
- **Używaj rzeczywistych linków w przełączniku języków**, aby roboty indeksujące mogły odkryć każdą wersję językową.
- **Uruchamiaj `lingui extract` w CI**, aby żaden nowy komunikat nie trafił do wdrożenia bez tłumaczenia.

- [internacjonalizacji i SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/internationalization_and_SEO.md)
- [przewodnik po hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/hreflang_guide_multilingual_seo.md)
- [porównanie wielojęzycznego SEO w Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/nextjs-multilingual-seo-comparison.md)

## Przewodnik krok po kroku po konfiguracji Lingui w aplikacji Next.js

Oto struktura projektu, którą utworzymy:

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # Routing i wykrywanie locale
    ├── locales
    │   ├── en
    │   │   └── messages.po         # Generowane przez `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # Języki, pomocnicy URL
    │   ├── appRouterI18n.ts        # Katalogi i instancje tylko dla serwera
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # Kreator generateMetadata
    ├── components
    │   ├── LinguiClientProvider.tsx
    │   ├── LocaleSwitcher.tsx
    │   └── LocalizedLink.tsx
    └── app
        ├── sitemap.ts
        ├── robots.ts
        └── [locale]
            ├── layout.tsx
            ├── page.tsx
            ├── not-found.tsx
            ├── [...rest]
            │   └── page.tsx        # Zlokalizowana strona 404 dla nieznanych ścieżek
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="Zainstaluj zależności">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

- **@lingui/core** / **@lingui/react**: runtime, `I18nProvider`, `setI18n` dla Server Components oraz makra (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/swc-plugin**: kompiluje makra wewnątrz potoku SWC w Next.js.
- **@lingui/loader**: kompiluje katalogi `.po` podczas importu, dzięki czemu `lingui compile` nie jest wymagane.
- **@lingui/cli**: `lingui extract` do zbierania komunikatów do katalogów.

> `@lingui/swc-plugin` to wtyczka WebAssembly powiązana z wersją SWC używaną przez Next.js. Jeśli budowanie zakończy się niepowodzeniem po aktualizacji Next.js, zaktualizuj wtyczkę do wersji wymienionej jako kompatybilna w jej pliku README.

</Step>
<Step number={2} title="Scentralizuj konfigurację locale">

Pojedynczy plik definiuje języki i pomocników URL. Routing, metadane, sitemap oraz Lingui odczytują dane z tego pliku.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const resolveLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : defaultLocale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

/** `/fr/about` → `/about` */
export const stripLocale = (pathname: string): string => {
  const [, firstSegment, ...rest] = pathname.split("/");

  return isLocale(firstSegment) ? `/${rest.join("/")}` : pathname;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Skonfiguruj Lingui i Next.js">

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

Wtyczka SWC kompiluje makra, a loader kompiluje pliki `.po`, zarówno dla Turbopacka (domyślnego w Next.js 16), jak i webpacka:

```ts fileName="next.config.ts"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  turbopack: {
    rules: {
      "*.po": { loaders: ["@lingui/loader"], as: "*.js" },
    },
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.po$/, use: "@lingui/loader" });

    return config;
  },
};

export default nextConfig;
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

</Step>
<Step number={4} title="Załaduj katalogi i utwórz instancje serwera">

Server Components nie posiadają kontekstu React, dlatego Lingui dostarcza funkcję `setI18n` do rejestracji instancji dla bieżącego renderowania. Ten moduł ładuje każdy katalog **jeden raz na proces serwera** i tworzy jedną instancję `I18n` na locale. Jest oznaczony jako `server-only`: katalogi innych języków nigdy nie trafiają do pakietu klienta.

```ts fileName="src/i18n/appRouterI18n.ts"
import "server-only";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { type Locale, locales } from "./config";

const loadCatalog = async (locale: Locale): Promise<[Locale, Messages]> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return [locale, messages];
};

const catalogs = Object.fromEntries(
  await Promise.all(locales.map(loadCatalog))
) as Record<Locale, Messages>;

const i18nInstances = Object.fromEntries(
  locales.map((locale) => [
    locale,
    setupI18n({ locale, messages: { [locale]: catalogs[locale] } }),
  ])
) as Record<Locale, I18n>;

export const getMessages = (locale: Locale): Messages => catalogs[locale];

export const getI18nInstance = (locale: Locale): I18n => i18nInstances[locale];
```

```ts fileName="src/i18n/initLingui.ts"
import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "./appRouterI18n";
import type { Locale } from "./config";

/**
 * Registers the instance for the current Server Component render.
 * Call it in every layout and page.
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

Aby TypeScript akceptował import plików `.po`, zadeklaruj moduł jeden raz:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="Utwórz Client Provider">

Client Components odczytują tłumaczenia z kontekstu React. Provider otrzymuje katalog aktywnego języka z układu serwerowego i tworzy własną instancję jednorazowo.

```tsx fileName="src/components/LinguiClientProvider.tsx"
"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useState } from "react";

type LinguiClientProviderProps = {
  children: ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

export const LinguiClientProvider = ({
  children,
  initialLocale,
  initialMessages,
}: LinguiClientProviderProps) => {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    })
  );

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
```

</Step>
<Step number={6} title="Zdefiniuj dynamiczne trasy locale">

Segment `[locale]` zawiera układ główny (root layout). `generateStaticParams` wstępnie renderuje każdy język podczas budowania, a `dynamicParams = false` zwraca błąd 404 dla każdego innego prefiksu.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// Unknown prefixes (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // Resolves relative canonical and Open Graph URLs
  metadataBase: new URL(siteUrl),
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  initLingui(locale);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <body>
        <LinguiClientProvider
          initialLocale={locale}
          initialMessages={getMessages(locale)}
        >
          <header>
            <LocaleSwitcher />
          </header>
          <main>{children}</main>
        </LinguiClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Provider klienta otrzymuje cały katalog aktywnego języka. To jest to, co benchmark mierzy jako "wyciek innych stron" (other-page leak). Pozostawianie tekstu w Server Components ogranicza to, czego klient rzeczywiście potrzebuje. W przypadku dużych aplikacji eksperymentalny ekstraktor Lingui per strona (`experimental.extractor` w `lingui.config.ts`) dzieli katalogi według punktów wejścia.

</Step>
<Step number={7} title="Wykorzystaj tłumaczenia w Server Components">

Server Components używają tych samych makr co Client Components. Funkcja `initLingui` musi zostać uruchomiona również na stronie, ponieważ układ nie jest renderowany ponownie podczas nawigacji między jego stronami.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { Trans, useLingui } from "@lingui/react/macro";
import { Counter } from "@/components/Counter";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const AboutPage = async ({ params }: PageProps<"/[locale]/about">) => {
  const { locale } = await params;

  initLingui(resolveLocale(locale));

  return <AboutContent />;
};

const AboutContent = () => {
  const { t } = useLingui();

  return (
    <section aria-label={t`About section`}>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Trans>
          We build <strong>fast</strong>, multilingual applications.
        </Trans>
      </p>
      <Counter />
    </section>
  );
};

export default AboutPage;
```

</Step>
<Step number={8} title="Wykorzystaj tłumaczenia w Client Components">

Client Components korzystają z tych samych importów. Makra odczytują instancję z `LinguiClientProvider`.

```tsx fileName="src/components/Counter.tsx"
"use client";

import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { useState } from "react";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <p>{i18n.number(count)}</p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

</Step>
<Step number={9} title="Wyodrębnij i przetłumacz swoje komunikaty">

Uruchom ekstrakcję. Lingui zapisze każdy komunikat znaleziony w katalogu `src` do katalogu każdego języka:

```bash
npm run i18n:extract
```

Następnie przetłumacz pole `msgstr` każdego wpisu:

<Tabs group="locale">
 <Tab value='fr' label='Francuski'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Nous créons des applications <0>rapides</0> et multilingues."

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Hiszpański'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Creamos aplicaciones <0>rápidas</0> y multilingües."

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> Symbole zastępcze `<0>` zachowują elementy JSX wewnątrz `<Trans>`, dzięki czemu tłumacze mogą zmieniać ich kolejność bez ingerencji w znaczniki.

</Step>
<Step number={10} title="Skonfiguruj Proxy dla routingu locale" isOptional={true}>

W Next.js 16 zmieniono nazwę pliku `middleware.ts` na `proxy.ts`. Proxy wdraża strategię prefiksów "w razie potrzeby" (as-needed):

- `/fr/about` jest serwowane bez zmian;
- `/en/about` przekierowuje do `/about`, dzięki czemu domyślny język posiada pojedynczy adres URL;
- `/about` jest przepisywane wewnętrznie (rewrite) na `/en/about`, bez zmiany widocznego adresu URL;
- pierwsza wizyta na `/` przekierowuje do preferowanego języka (najpierw plik cookie, następnie `Accept-Language`).

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

```ts fileName="src/proxy.ts"
import { type NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localizePath,
  stripLocale,
} from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const url = request.nextUrl.clone();

  if (isLocale(firstSegment)) {
    // /en/about → /about: one URL for the default locale
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // First visit on "/": send the visitor to their language
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      url.pathname = localizePath("/", preferredLocale);

      return NextResponse.redirect(url, 307);
    }
  }

  // /about → served by /en/about, URL unchanged
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // Skip API routes, Next.js internals and files (sitemap.xml, robots.txt...)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="Zmień język swoich treści" isOptional={true}>

`usePathname` zwraca adres URL widziany przez przeglądarkę (`/about` lub `/fr/about`). Usuń locale ze ścieżki, a następnie zbuduj link dla każdego języka. Przełącznik renderuje rzeczywiste linki, dzięki czemu roboty indeksujące mogą dotrzeć do każdej wersji językowej, a plik cookie zapamiętuje wyraźny wybór użytkownika.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  localizePath,
  stripLocale,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const { i18n, t } = useLingui();
  const basePath = stripLocale(usePathname());

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={localizePath(basePath, locale)}
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
<Step number={12} title="Zbuduj zlokalizowany komponent Link" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Path without locale prefix, e.g. "/about" */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

Działa to również w Server Components, ponieważ komponent jest renderowany wewnątrz `LinguiClientProvider`:

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="Internacjonalizuj swoje metadane" isOptional={true}>

Każda wersja językowa może pozycjonować się niezależnie, pod warunkiem, że każda strona udostępnia:

- **przetłumaczony** `title` oraz `description`;
- **kanoniczny** URL (`canonical`) wskazujący na samą siebie;
- po jednym **odpowiedniku `hreflang` na locale**, plus **`x-default`**;
- **Open Graph** `locale`, `alternateLocale` oraz `url`;
- **JSON-LD** z polem `inLanguage`.

Funkcja `generateMetadata` działa poza drzewem React, dlatego używa instancji serwerowej bezpośrednio z makrem `msg`:

```ts fileName="src/i18n/metadata.ts"
import type { Metadata } from "next";
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedMetadataOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedMetadata = ({
  path,
  locale,
  title,
  description,
}: LocalizedMetadataOptions): Metadata => {
  const url = getAbsoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale,
            getAbsoluteUrl(path, alternateLocale),
          ])
        ),
        "x-default": getAbsoluteUrl(path, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale]),
    },
  };
};
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { msg } from "@lingui/core/macro";
import type { Metadata } from "next";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const locale = resolveLocale((await params).locale);
  const i18n = getI18nInstance(locale);

  return buildLocalizedMetadata({
    path: "/about",
    locale,
    title: i18n._(msg`About us`),
    description: i18n._(
      msg`Learn who we are and why we built this application.`
    ),
  });
};

// ... komponent strony z kroku 7
```

JSON-LD jest renderowany bezpośrednio przez samą stronę. Pliki stron mogą eksportować tylko pola Next.js, dlatego zachowaj komponent w osobnym pliku:

```tsx fileName="src/components/WebPageJsonLd.tsx"
import { getAbsoluteUrl, type Locale } from "@/i18n/config";

type WebPageJsonLdProps = {
  path: string;
  locale: Locale;
  title: string;
};

export const WebPageJsonLd = ({ path, locale, title }: WebPageJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: getAbsoluteUrl(path, locale),
        inLanguage: locale,
      }),
    }}
  />
);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
// W AboutContent
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="Internacjonalizuj swoją mapę witryny" isOptional={true}>

Konwencja `sitemap.ts` obsługuje `alternates.languages`, co Next.js renderuje jako odpowiedniki `xhtml:link`. Wymień każdy adres URL dla każdego języka:

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const getAlternateLanguages = (path: string) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, getAbsoluteUrl(path, locale)])
  ),
  "x-default": getAbsoluteUrl(path, defaultLocale),
});

const sitemap = (): MetadataRoute.Sitemap =>
  sitemapPages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: getAbsoluteUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: getAlternateLanguages(path) },
    }))
  );

export default sitemap;
```

</Step>
<Step number={15} title="Internacjonalizuj swój plik robots.txt" isOptional={true}>

Prywatne trasy istnieją w każdym języku, więc reguła `disallow` musi obejmować każdą zlokalizowaną ścieżkę:

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // /dashboard, /fr/dashboard, /es/dashboard...
    disallow: privatePaths.flatMap((path) =>
      locales.map((locale) => localizePath(path, locale))
    ),
  },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={16} title="Obsłuż zlokalizowane strony 404" isOptional={true}>

Plik `not-found.tsx` renderuje się wewnątrz układu `[locale]`, dzięki czemu ma dostęp do providera klienta. Trasa catch-all przekierowuje do niego nieznane ścieżki w ramach danego locale. Next.js automatycznie dodaje nagłówek `noindex` do odpowiedzi 404.

```tsx fileName="src/app/[locale]/not-found.tsx"
"use client";

import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "@/components/LocalizedLink";

const NotFound = () => (
  <div>
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink href="/">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);

export default NotFound;
```

```tsx fileName="src/app/[locale]/[...rest]/page.tsx"
import { notFound } from "next/navigation";

// /fr/does/not/exist → zlokalizowany not-found.tsx
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="Uzyskaj dostęp do locale w Server Actions" isOptional={true}>

Server Actions nie otrzymują parametrów trasy. Najbardziej niezawodnym podejściem jest przesłanie locale wraz z formularzem ze strony, która je zna:

```tsx fileName="src/app/[locale]/contact/page.tsx"
import { Trans } from "@lingui/react/macro";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const ContactPage = async ({ params }: PageProps<"/[locale]/contact">) => {
  const locale = resolveLocale((await params).locale);

  initLingui(locale);

  return (
    <form action={sendContactMessage}>
      <input type="hidden" name="locale" value={locale} />
      <textarea name="message" />
      <button type="submit">
        <Trans>Send</Trans>
      </button>
    </form>
  );
};

export default ContactPage;
```

```ts fileName="src/app/actions/sendContactMessage.ts"
"use server";

import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";

export const sendContactMessage = async (formData: FormData) => {
  const locale = resolveLocale(formData.get("locale")?.toString());
  const i18n = getI18nInstance(locale);

  const subject = i18n._(msg`Thanks for your message`);

  // await mailer.send({ subject, locale, ... });
  console.log(`[${locale}] ${subject}`);
};
```

</Step>
<Step number={18} title="Zachowaj swoje makra, zredukuj runtime dzięki Intlayer" isOptional={true}>

Adapter kompatybilności [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/lingui.md) pozwala zachować kod źródłowy bez zmian: makra kompilują się jak wcześniej, a wynikowe wywołania `i18n._()`, `useLingui()` oraz `<Trans>` są obsługiwane przez słowniki Intlayer. W benchmarku Next.js rozmiar runtime spada z **~72.1 KB do ~10.7 KB** gzip.

W Next.js adapter konfiguruje się, tworząc aliasy `@lingui/core` i `@lingui/react` na `@intlayer/lingui` w `next.config.ts` (dla webpacka i Turbopacka) oraz owijając konfigurację za pomocą `withIntlayer` z `next-intlayer/server`. Zachowaj `@lingui/swc-plugin`, aby makra były najpierw kompilowane. Pełna konfiguracja znajduje się w [przewodniku po kompatybilności z Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/lingui.md).

Jak pokazuje tabela benchmarku, adapter zmniejsza rozmiar środowiska uruchomieniowego, ale w Next.js nie eliminuje jeszcze przesyłania całego katalogu do każdej strony. Najlepiej sprawdza się jako pomost migracyjny: po jego uruchomieniu możesz stopniowo przenosić komponenty do natywnego API `useIntlayer`, które przesyła tylko te treści, które renderuje dany komponent. Zobacz [przewodnik Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md), [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/lingui_vs_intlayer-lingui.md) oraz wszystkie [adaptery kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md).

</Step>
<Step number={19} title="Zautomatyzuj swoje tłumaczenia za pomocą Intlayer" isOptional={true}>

Lingui wyodrębnia komunikaty, ale ręczne wypełnianie dziesiątek katalogów zajmuje najwięcej czasu. Intlayer jest **darmowy** i **open source**, a jego narzędzia współpracują z Lingui:

- **Tłumacz za pomocą AI**, korzystając z własnego klucza API i dostawcy. Zobacz [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/autoFill.md) oraz [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).
- **Zachowaj pliki PO** jako źródło prawdy dzięki [wtyczce sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md).
- **Testuj brakujące tłumaczenia** w procesach CI. Zobacz [testowanie tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/testing.md).
- **Audytuj wdrożoną stronę** pod kątem brakujących tagów `hreflang`, błędnych adresów kanonicznych i wycieków językowych za pomocą [polecenia scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/scan.md).

</Step>
</Steps>

## Często zadawane pytania

<FAQ>

<Question title="Czy Lingui obsługuje Next.js App Router i Server Components?">

Tak. `@lingui/react` obsługuje React Server Components. Server Components rejestrują instancję za pomocą `setI18n` z `@lingui/react/server`, Client Components odczytują ją z `I18nProvider`, a oba typy komponentów używają tych samych makr `Trans` i `useLingui`.

</Question>
<Question title="Dlaczego muszę wywoływać initLingui na każdej stronie i w każdym układzie?">

Server Components nie posiadają kontekstu React, dlatego instancja jest rejestrowana na czas pojedynczego renderowania. Układy (layouts) są zachowywane podczas nawigacji i nie renderują się ponownie, więc strona nie może polegać na tym, że jej układ ustawił locale. Wywołanie `initLingui(locale)` na początku każdego układu i każdej strony zapewnia ich niezależność.

</Question>
<Question title="Czy w Next.js należy używać wtyczki SWC czy Babela?">

Używaj `@lingui/swc-plugin`. Zachowuje to potok SWC oraz Turbopack. Dodanie konfiguracji Babel wyłącza SWC w Next.js i spowalnia proces budowania. Jedynym wymogiem jest utrzymanie wersji wtyczki kompatybilnej z wersją SWC Twojego wydania Next.js.

</Question>
<Question title="Jak przetłumaczyć generateMetadata za pomocą Lingui?">

Pobierz instancję serwera za pomocą `getI18nInstance(locale)` i przetłumacz deskryptory zadeklarowane za pomocą makra `msg`: ``i18n._(msg`About us`)``. Zwróć `alternates.canonical`, `alternates.languages` z `x-default` oraz `openGraph.locale`. Krok 13 zawiera pomocniczą funkcję wielokrotnego użytku.

</Question>
<Question title="Jak duży jest Lingui w pakiecie Next.js?">

[Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md) wskazuje około 72 KB gzip dla środowiska uruchomieniowego. Przy jednym katalogu na locale strony ważą ~145 KB w porównaniu do 141 KB bez i18n, lecz każda strona nadal otrzymuje komunikaty z innych stron za pośrednictwem providera klienta.

</Question>
<Question title="Lingui, next-intl czy next-i18next: co wybrać dla Next.js?">

Lingui jest idealny dla zespołów, które preferują pisanie tekstu źródłowego w komponentach i pracę z plikami PO oraz tłumaczami. next-intl sprawdza się w zespołach wolących katalogi JSON i API `t("key")` ściśle zintegrowane z Next.js. next-i18next oferuje bogaty ekosystem wtyczek i18next. Zobacz [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/next-i18next_vs_next-intl_vs_intlayer.md) oraz [benchmark Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md).

</Question>
<Question title="Czy mogę zmigrować z Lingui do Intlayer bez przepisywania komponentów?">

Tak. Adapter [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/lingui.md) pozwala zachować makra i podmienić środowisko uruchomieniowe, po czym można stopniowo przenosić komponenty do `useIntlayer`. Zobacz [adaptery kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md).

</Question>

</FAQ>
