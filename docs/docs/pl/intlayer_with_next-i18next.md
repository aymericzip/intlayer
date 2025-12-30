---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Jak przetłumaczyć swoją aplikację Next.js 15 używając next-i18next – przewodnik i18n 2025
description: Praktyczny, gotowy do produkcji przewodnik po internacjonalizacji aplikacji Next.js 15 App Router z użyciem i18next/next-i18next oraz jej rozszerzeniu za pomocą Intlayer.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Next.js 15
  - next-i18next
  - i18next
  - JavaScript
  - React
slugs:
  - doc
  - next-i18next
applicationTemplate: https://github.com/aymericzip/intlayer-next-i18next-template
---

# Tłumaczenie strony Next.js 15 z użyciem next-i18next i Intlayer | Internacjonalizacja (i18n)

### Dla kogo jest ten przewodnik

- **Junior**: Postępuj dokładnie według kroków i kopiuj bloki kodu. Otrzymasz działającą wielojęzyczną aplikację.
- **Mid-level**: Używaj list kontrolnych i wskazówek najlepszych praktyk, aby unikać typowych pułapek.
- **Senior**: Przejrzyj ogólną strukturę, sekcje SEO i automatyzacji; znajdziesz tam rozsądne domyślne ustawienia i punkty rozszerzeń.

### Co zbudujesz

- Projekt App Router z lokalizowanymi trasami (np. `/`, `/fr/...`)
- Konfiguracja i18n z lokalizacjami, domyślną lokalizacją, wsparciem RTL
- Inicjalizacja i18n po stronie serwera oraz provider po stronie klienta
- Tłumaczenia z przestrzeniami nazw ładowane na żądanie
- SEO z `hreflang`, lokalizowaną mapą strony (`sitemap`), `robots`
- Middleware do routingu lokalizacji
- Integracja Intlayer do automatyzacji procesów tłumaczeniowych (testy, uzupełnianie AI, synchronizacja JSON)

> Uwaga: next-i18next jest zbudowany na bazie i18next. Ten przewodnik korzysta z prymitywów i18next kompatybilnych z next-i18next w App Router, jednocześnie utrzymując architekturę prostą i gotową do produkcji.
> Dla szerszego porównania zobacz [next-i18next vs next-i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/next-i18next_vs_next-i18next_vs_intlayer.md).

---

## 1) Struktura projektu

Zainstaluj zależności next-i18next -

```bash packageManager="npm"
npm install next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="bun"
bun add next-i18next i18next react-i18next i18next-resources-to-backend
```

Zacznij od przejrzystej struktury. Zachowaj podział wiadomości według lokalizacji i przestrzeni nazw.

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

Lista kontrolna (mid/senior):

- Zachowaj jeden plik JSON na przestrzeń nazw na lokalizację
- Nie centralizuj nadmiernie wiadomości; używaj małych przestrzeni nazw ograniczonych do strony/funkcji
- Unikaj importowania wszystkich lokalizacji naraz; ładuj tylko to, czego potrzebujesz

---

## 2) Instalacja zależności

```bash
bash
pnpm add i18next react-i18next i18next-resources-to-backend
```

Jeśli planujesz używać API next-i18next lub integracji konfiguracji, dodaj również:

```bash
pnpm add next-i18next
```

---

## 3) Podstawowa konfiguracja i18n

Zdefiniuj lokalizacje, domyślną lokalizację, RTL oraz pomocnicze funkcje do lokalizowanych ścieżek/URL-i.

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

Uwaga seniora: Jeśli używasz `next-i18next.config.js`, utrzymuj go zgodnego z `i18n.config.ts`, aby uniknąć rozbieżności.

---

## 4) Inicjalizacja i18n po stronie serwera

Zainicjuj i18next na serwerze z dynamicznym backendem, który importuje tylko wymagane pliki JSON dla danej lokalizacji/przestrzeni nazw.

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// Ładuj zasoby JSON z src/locales/<locale>/<namespace>.json
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

Uwaga środkowa: Utrzymuj listę przestrzeni nazw krótką na stronę, aby ograniczyć rozmiar ładunku. Unikaj globalnych pakietów „catch-all”.

---

## 5) Provider klienta dla komponentów React

Opakuj komponenty klienta w providera, który odzwierciedla konfigurację serwera i ładuje tylko żądane przestrzenie nazw.

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: pakiet }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

Junior tip: Nie musisz przekazywać wszystkich komunikatów do klienta. Zacznij tylko od przestrzeni nazw strony.

---

## 6) Lokalizowany układ i trasy

Ustaw język i kierunek oraz wstępnie wygeneruj trasy dla każdego locale, aby sprzyjać statycznemu renderowaniu.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 7) Przykładowa strona z użyciem po stronie serwera i klienta

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// Wymuś statyczne renderowanie strony
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

Tłumaczenia (po jednym pliku JSON na przestrzeń nazw w `src/locales/...`):

```json fileName="src/locales/pl/about.json"
{
  "title": "O nas",
  "description": "Opis strony O nas",
  "counter": {
    "label": "Licznik",
    "increment": "Zwiększ"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

Komponent klienta (ładuje tylko wymaganą przestrzeń nazw):

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

> Upewnij się, że strona/provider zawiera tylko potrzebne przestrzenie nazw (np. `about`).
> Jeśli używasz React < 19, zapamiętuj (memoizuj) ciężkie formatery, takie jak `Intl.NumberFormat`.

Synchronous server component embedded under a client boundary:

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

---

## 8) SEO: Metadane, Hreflang, Sitemap, Robots

Tłumaczenie treści jest sposobem na zwiększenie zasięgu. Dokładnie skonfiguruj wielojęzyczne SEO.

Najlepsze praktyki:

- Ustaw `lang` i `dir` w elemencie root
- Dodaj `alternates.languages` dla każdego locale (+ `x-default`)
- Wymień przetłumaczone URL-e w `sitemap.xml` i używaj `hreflang`
- Wyklucz zlokalizowane prywatne obszary (np. `/fr/admin`) w `robots.txt`

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // Importuj odpowiedni pakiet JSON z src/locales
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>O nas</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );

  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

---

## 9) Middleware do routingu lokalizacji

Wykrywa lokalizację i przekierowuje do zlokalizowanej ścieżki, jeśli jej brakuje.

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // wyklucz pliki z rozszerzeniami

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname === "/" + locale || pathname.startsWith("/" + locale + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Dopasuj wszystkie ścieżki z wyjątkiem tych zaczynających się od tych oraz plików z rozszerzeniem
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

---

## 10) Wydajność i najlepsze praktyki DX

- **Ustaw atrybuty html `lang` i `dir`**: Zrobione w `src/app/[locale]/layout.tsx`.
- **Podziel wiadomości według namespace**: Utrzymuj małe pakiety (`common.json`, `about.json` itd.).
- **Minimalizuj obciążenie klienta**: Na stronach przekazuj tylko wymagane namespace do providera.
- **Preferuj strony statyczne**: Używaj `export const dynamic = 'force-static'` oraz `generateStaticParams` dla każdego locale.
- **Synchronizuj komponenty serwerowe**: Przekazuj wcześniej obliczone ciągi/formatowanie zamiast wywołań asynchronicznych w czasie renderowania.
- **Memoizuj ciężkie operacje**: Szczególnie w kodzie klienta dla starszych wersji React.
- **Cache i nagłówki**: Preferuj statyczne lub `revalidate` zamiast renderowania dynamicznego, gdy to możliwe.

---

## 11) Testowanie i CI

- Dodaj testy jednostkowe dla komponentów używających `t`, aby upewnić się, że klucze istnieją.
- Zweryfikuj, czy każda przestrzeń nazw ma te same klucze we wszystkich lokalizacjach.
- Wyświetl brakujące klucze podczas CI przed wdrożeniem.

Intlayer zautomatyzuje większość z tych zadań (patrz następna sekcja).

---

## 12) Dodaj Intlayer na górę (automatyzacja)

Intlayer pomaga utrzymać synchronizację tłumaczeń JSON, testować brakujące klucze oraz uzupełniać je za pomocą AI, gdy jest to potrzebne.

Zainstaluj zależności intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { locales, defaultLocale } from "@/i18n";
import { syncJSON } from "@intlayer/sync-json";

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
    }),
  ],
};

export default config;
```

Dodaj skrypty do pakietu:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Typowe przepływy:

- `pnpm i18n:test` w CI, aby przerwać budowanie przy brakujących kluczach
- `pnpm i18n:fill` lokalnie, aby zaproponować tłumaczenia AI dla nowo dodanych kluczy

> Możesz podać argumenty CLI; zobacz [dokumentację Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md).

---

## 13) Rozwiązywanie problemów

- **Nie znaleziono kluczy**: Upewnij się, że strona/dostawca wymienia poprawne przestrzenie nazw, a plik JSON istnieje pod ścieżką `src/locales/<locale>/<namespace>.json`.
- **Nieprawidłowy język/krótkie pojawienie się angielskiego**: Sprawdź ponownie wykrywanie lokalizacji w `middleware.ts` oraz wartość `lng` w dostawcy.
- **Problemy z układem RTL**: Zweryfikuj, czy `dir` jest wyprowadzany z `isRtl(locale)` oraz czy Twój CSS obsługuje `[dir="rtl"]`.
- **Brak alternatyw SEO**: Potwierdź, że `alternates.languages` zawiera wszystkie lokalizacje oraz `x-default`.
- **Zbyt duże paczki**: Dalsze dzielenie przestrzeni nazw i unikanie importowania całych drzew `locales` po stronie klienta.

---

## 14) Co dalej

- Dodaj więcej lokalizacji i przestrzeni nazw w miarę rozwoju funkcji
- Lokalizuj strony błędów, e-maile oraz treści generowane przez API
- Rozszerz workflow Intlayer, aby automatycznie otwierać PR-y dla aktualizacji tłumaczeń

Jeśli wolisz gotowy starter, wypróbuj szablon: `https://github.com/aymericzip/intlayer-next-i18next-template`.
