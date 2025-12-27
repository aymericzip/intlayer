---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: Jak przetłumaczyć swoją aplikację Next.js 15 za pomocą next-intl – przewodnik i18n 2025
description: Dowiedz się, jak uczynić swoją stronę Next.js 15 App Router wielojęzyczną. Postępuj zgodnie z dokumentacją, aby zrealizować internacjonalizację (i18n) i tłumaczenie.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Next.js 15
  - next-intl
  - JavaScript
  - React
slugs:
  - doc
  - next-intl
applicationTemplate: https://github.com/aymericzip/intlayer-next-intl-template
---

# Tłumaczenie Twojej aplikacji Next.js 15 za pomocą next-intl i Intlayer | Internacjonalizacja (i18n)

Ten przewodnik przeprowadzi Cię przez najlepsze praktyki next-intl w aplikacji Next.js 15 (App Router) oraz pokaże, jak nałożyć Intlayer, aby uzyskać solidne zarządzanie tłumaczeniami i automatyzację.

Zobacz porównanie w [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/next-i18next_vs_next-intl_vs_intlayer.md).

- Dla juniorów: postępuj krok po kroku, aby uzyskać działającą aplikację wielojęzyczną.
- Dla programistów średniego szczebla: zwróć uwagę na optymalizację payloadu oraz rozdzielenie serwera i klienta.
- Dla seniorów: zwróć uwagę na generowanie statyczne, middleware, integrację SEO oraz haki automatyzacji.

Co omówimy:

- Konfiguracja i struktura plików
- Optymalizacja ładowania wiadomości
- Użycie komponentów klienta i serwera
- Metadane, sitemap, robots dla SEO
- Middleware do routingu lokalizacji
- Dodanie Intlayer na wierzch (CLI i automatyzacja)

## Skonfiguruj swoją aplikację za pomocą next-intl

Zainstaluj zależności next-intl -

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

```bash
.
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src
    ├── i18n.ts
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           └── page.tsx
    └── components
        ├── ClientComponentExample.tsx
        └── ServerComponent.tsx
```

#### Konfiguracja i ładowanie zawartości

Ładuj tylko te przestrzenie nazw, których potrzebują Twoje trasy, i wczesne waliduj lokalizacje. Utrzymuj komponenty serwera synchroniczne, gdy to możliwe, i przesyłaj do klienta tylko wymagane wiadomości.

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // Załaduj tylko przestrzenie nazw potrzebne dla twojego layoutu/stron
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Ustaw aktywny język żądania dla tego renderowania po stronie serwera (RSC)
  unstable_setRequestLocale(locale);

  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  // Wiadomości są ładowane po stronie serwera. Przekaż do klienta tylko to, co jest potrzebne.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Tłumaczenia/formatowanie wyłącznie po stronie serwera
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### Użycie w komponencie klienckim

Weźmy przykład komponentu klienckiego renderującego licznik.

**Tłumaczenia (struktura powtórzona; załaduj je do wiadomości next-intl według własnego uznania)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Komponent kliencki**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Bezpośredni zakres do zagnieżdżonego obiektu
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> Nie zapomnij dodać komunikatu "about" w wiadomościach klienta na stronie
> (dołącz tylko przestrzenie nazw, których faktycznie potrzebuje twój klient).

### Użycie w komponencie serwerowym

Ten komponent UI jest komponentem serwerowym i może być renderowany pod komponentem klienckim (strona → klient → serwer). Zachowaj synchroniczność, przekazując wcześniej obliczone ciągi znaków.

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

Uwagi:

- Oblicz `formattedCount` po stronie serwera (np. `const initialFormattedCount = format.number(0)`).
- Unikaj przekazywania funkcji lub obiektów niepodlegających serializacji do komponentów serwerowych.

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... Reszta kodu strony
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### Middleware do routingu lokalizacji

Dodaj middleware do obsługi wykrywania i routingu lokalizacji:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // Pomijaj API, wewnętrzne elementy Next i zasoby statyczne
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### Najlepsze praktyki

- **Ustaw html `lang` i `dir`**: W `src/app/[locale]/layout.tsx` oblicz `dir` za pomocą `getLocaleDirection(locale)` i ustaw `<html lang={locale} dir={dir}>`.
- **Podziel wiadomości według przestrzeni nazw**: Organizuj JSON według lokalizacji i przestrzeni nazw (np. `common.json`, `about.json`).
- **Minimalizuj payload klienta**: Na stronach wysyłaj do `NextIntlClientProvider` tylko wymagane namespace (np. `pick(messages, ['common', 'about'])`).
- **Preferuj strony statyczne**: Eksportuj `export const dynamic = 'force-static'` i generuj statyczne parametry dla wszystkich `locales`.
- **Synchroniczne komponenty serwera**: Przekazuj wcześniej obliczone łańcuchy znaków (przetłumaczone etykiety, sformatowane liczby) zamiast wywołań asynchronicznych lub funkcji nieserializowalnych.

## Implementacja Intlayer na bazie next-intl

Zainstaluj zależności intlayer:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
```

Utwórz plik konfiguracyjny intlayer:

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    // Zachowaj strukturę folderów per namespace w synchronizacji z Intlayer
    syncJSON({
      format: "icu",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Dodaj skrypty do `package.json`:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

Notatki:

- `intlayer fill`: używa Twojego dostawcy AI do uzupełniania brakujących tłumaczeń na podstawie skonfigurowanych lokalizacji.
- `intlayer test`: sprawdza brakujące/nieprawidłowe tłumaczenia (używaj tego w CI).

Możesz konfigurować argumenty i dostawców; zobacz [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md).
