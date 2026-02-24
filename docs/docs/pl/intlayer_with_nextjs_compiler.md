---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Przekształć istniejącą aplikację Next.js w aplikację wielojęzyczną (przewodnik i18n 2026)
description: Dowiedz się, jak uczynić swoją istniejącą aplikację Next.js wielojęzyczną za pomocą Kompilatora Intlayer. Postępuj zgodnie z dokumentacją, aby umiędzynarodowić (i18n) i przetłumaczyć swoją aplikację przy użyciu AI.
keywords:
  - Umiędzynarodowienie
  - Tłumaczenie
  - Dokumentacja
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Kompilator
  - AI
slugs:
  - doc
  - konfiguracja
  - nextjs
  - kompilator
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Pierwsze wydanie
---

# Jak sprawić, by istniejąca aplikacja Next.js stała się wielojęzyczna (i18n) (przewodnik i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Wideo" value="video">
  
<iframe title="Najlepsze rozwiązanie i18n dla Next.js? Odkryj Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak umiędzynarodowić aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Zobacz [Szablon Aplikacji](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) na GitHubie.

## Spis treści

<TOC/>

## Dlaczego umiędzynarodowienie istniejącej aplikacji jest trudne?

Jeśli kiedykolwiek próbowałeś dodać wiele języków do aplikacji, która była budowana tylko dla jednego języka, to znasz ten ból. To nie jest tylko "trudne" - to żmudne. Musisz przejrzeć każdy plik, znaleźć każdy ciąg tekstowy i przenieść je do oddzielnych plików słownikowych.

Potem nadchodzi ryzykowna część: zastąpienie całego tego tekstu wywołaniami do kodu (hookami) bez psucia układu czy logiki. To ten rodzaj pracy, który wstrzymuje rozwój nowych funkcji na tygodnie i wydaje się być niekończącym się refaktoringiem.

## Czym jest Kompilator Intlayer?

**Kompilator Intlayer** został stworzony po to, by pominąć tę ręczną, żmudną pracę. Zamiast zmuszać Cię do ręcznego wyciągania ciągów znaków (stringów), kompilator robi to za Ciebie. Skanuje Twój kod, znajduje tekst i wykorzystuje AI do generowania słowników w tle.
Następnie modyfikuje Twój kod podczas kompilacji (build), automatycznie wstrzykując potrzebne wywołania i18n. Zasadniczo nadal piszesz aplikację tak, jakby była w jednym języku, a kompilator zajmuje się wielojęzyczną transformacją bez Twojego udziału.

> Dokumentacja kompilatora: https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md

### Ograniczenia

Ponieważ kompilator wykonuje analizę i transformację kodu (wstawianie hooków i generowanie słowników) w **czasie kompilacji**, może on **spowolnić proces budowania (build process)** Twojej aplikacji.

Aby ograniczyć ten wpływ podczas programowania (development), możesz ustawić kompilator, by działał w trybie [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md) lub całkowicie go wyłączyć, gdy nie jest potrzebny.

---

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji Next.js

### Krok 1: Instalacja zależności

Zainstaluj potrzebne pakiety za pomocą npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  Główny pakiet, który dostarcza narzędzia do umiędzynarodowienia takie jak zarządzanie konfiguracją, tłumaczenia, [deklarację treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilację, a także [komendy CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **next-intlayer**

  Pakiet integrujący Intlayer z frameworkiem Next.js. Dostarcza dla niego context providery oraz hooki. Ponadto zawiera wtyczkę Next.js pozwalającą połączyć Intlayer z [Webpackiem](https://webpack.js.org/) albo innowacyjnym [Turbopackiem](https://nextjs.org/docs/app/api-reference/turbopack), dodatkowo proxy ułatwiające wykrycie języka, zarządzające cookies czy przekierowaniami URL.

### Krok 2: Konfiguracja Twojego projektu

Utwórz plik konfiguracyjny, by zdefiniować dostępne języki aplikacji:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Można ustawić na 'build-only' dla zyskania prędkości w dev mode
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // wyłączony prefix typu comp-
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Ta aplikacja to aplikacja do wyświetlania map",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Można ustawić na 'build-only' dla zyskania prędkości w dev mode
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // wyłączony prefix typu comp-
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Ta aplikacja to aplikacja do wyświetlania map",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Można ustawić na 'build-only' dla zyskania prędkości w dev mode
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // wyłączony prefix typu comp-
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Ta aplikacja to aplikacja do wyświetlania map",
  },
};

module.exports = config;
```

> **Uwaga**: Upewnij się, że Twój `OPEN_AI_API_KEY` istnieje w zmiennych środowiskowych.

> Za pomocą tego pliku konfiguracyjnego możesz ustalić takie ustawienia jak m.in.: zlokalizowane adresy URL, przekierowania z proxy, nazwy ciasteczek (cookies), ścieżkę generowania typów i treści deklarowanych, wyłączyć logi konsoli Intlayer. Kompletną dokumentację odnajdziesz w: [Dokumentacja konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 3: Integracja Intlayer z ustawieniami Next.js

Dopasuj konfigi dla Twojego Next.js tak by zawierały i ładowały logikę Intlayer:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* dodaj swoje polecenia configu tutaj */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* dodaj swoje polecenia configu tutaj */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* dodaj swoje polecenia configu tutaj */
};

module.exports = withIntlayer(nextConfig);
```

> Plugin `withIntlayer()` to serce podłączenia dla Twojego frameworka Next. Wymusza tworzenie plików środowiska (środowiska [Webpack](https://webpack.js.org/) i [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)), aliasy do optymalizacji serwera lub komponentu w Next.

### Konfiguracja Babel

Kompilator Intlayer wymaga Babel do wyodrębniania i optymalizacji treści. Zaktualizuj swój plik `babel.config.js` (lub `babel.config.json`), aby zawierał wtyczki Intlayer:

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

### Krok 4: Skonfigurowanie Routingu Komponentów

Usuń wszystko z w pliku root layout (RootLayout) `layout.tsx` a następnie podmień na to kodowanie:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};
```

### Krok 5: Utworzenie treści - automatycznie zadeklarowane

Z Włączonym kompilatorem, Ty absolutnie **nie masz wymogu** robić tego ręcznie. Bazy (np. w postaci plików i stałych `.content.ts`, plików `.json`) same się zbudują!.

Zamiast dodawania każdego klucza do specjalnych słowników, z narzędziem `Intlayer`, ty po prostu umieszczasz standardowy bazowy tekst do własnego kodu. A sam proces silnika użyje wprowadzonych podłączeń AI. I dostarczy dla CI/CD pliki lokalizowane.

### Krok 6: Wykorzystaj treść w swoim kodzie

Po prostu napisz swoje komponenty z zakodowanymi na sztywno ciągami znaków w domyślnym języku. Kompilator zajmie się resztą.

Przykład tego, jak może wyglądać Twoja strona:

<Tabs>
  <Tab value="Code" label="Kod">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>Zacznij od edytowania</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
  <Tab value="Output" label="Wynik">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditing: "Get started by editing",
      },
      fr: {
        getStartedByEditing: "Commencez par éditer",
      },
      pl: {
        getStartedByEditing: "Zacznij od edytowania",
      },
    }
  }
}
```

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
</Tabs>

- Polecenie i biblioteka kontextu: **`IntlayerClientProvider`** są wymogiem by renderować poprawnie pliki i treść.
- Podobnie z Serverem (dla Next App Directory) jest zastosowany odpowiedni tag kontextowy **`IntlayerServerProvider`**.

### (Opcjonalnie) Krok 7: Uzupełnij brakujące tłumaczenia

Intlayer udostępnia narzędzie CLI, które pomaga uzupełnić brakujące tłumaczenia. Możesz użyć polecenia `intlayer`, aby przetestować i uzupełnić brakujące tłumaczenia ze swojego kodu.

```bash
npx intlayer test         # Przetestuj, czy brakuje tłumaczeń
```

```bash
npx intlayer fill         # Uzupełnij brakujące tłumaczenia
```

### (Opcjonalnie) Krok 8: Prosty i bardzo mądry Route Proxy do wykrywania preferencji

Włącz middleware, dla bardzo szybkiej nawigacji klienta z językiem i regionem!

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> Rozwiązanie z pliku zdefiniowane nazwane `intlayerProxy`, daje wykrycie języka naturalnego by przenieść przeglądarce preferencje by odpowiednio przeroutować (redirect URL) na pożądany parametr w standardzie, po czym ustali lub sprawdzi w tym czasie w razie wykrycia plików - po stronie sesyjnej w plikach z preferencji ciasta jako "Ciasteczko - Cookie Locale". Tzw [Konfiguracja Route System NextJS z Intlayer i Proxy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md) dla odniesienia specyfiki pliku.

### (Opcjonalnie) Krok 9: Widget do Zmiany Języka Lokalnego (Switcher)

Jeśli twój cel w rozwiązaniach Next.js (aplikacji opartych) polega na umożliwieniu odpalenia w interfejsie przełączania. Polegaj jako zalecane podejście przez wgranie bibliotek lub opcjonalnego linku ze strefy pod router (`Next Link`) celem podania mu prawidłowego Locale do strony odpowiedniej zamiast pisać nową stronę i odświeżeniu witryny bez tzn Prefetch.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Lokalizacja - np. PL */}
              {localeItem}
            </span>
            <span>
              {/* Język wybrany np. Polski */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Pokaz w wybranym języku na buttonie - np. dla EN pokaże English */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lub w English pokazany - np. Polish dla PL czy English dla EN */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Lokalizacja - np. PL */}
              {localeItem}
            </span>
            <span>
              {/* Język wybrany np. Polski */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Pokaz w wybranym języku na buttonie - np. dla EN pokaże English */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lub w English pokazany - np. Polish dla PL czy English dla EN */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Lokalizacja - np. PL */}
              {localeItem}
            </span>
            <span>
              {/* Język wybrany np. Polski */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Pokaz w wybranym języku na buttonie - np. dla EN pokaże English */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Lub w English pokazany - np. Polish dla PL czy English dla EN */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Dodasz jeszcze prostszą wariację przez alternatywy czyli dynamiczą funkcje hook - `useLocale` korzystając z parametru `setLocale` funkcja zamiast preloading w Next. Bardziej konkretne informacje oraz detale w odniesieniu co do działania (lub jak go ulepszyć / wklejać do projektów i frameworków) poczytaj tutaj [Hook - `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useLocale.md).

### (Opcjonalnie) Krok 10: Kontekst / odczyt Locale na serwerze (np: Server Action, wysłanie E-Mail)

Przy procesie przysłania, zapisu poczty elektronicznej lub innej operacji Server Side Action gdzie zależałoby wykrycie, jaka i kiedy jest aktywowana funkcja na serwerach do odpowiedniego pobrania "jaki aktualnie jest język". Właśnie dlatego używamy polecenia - `getLocale` od obiektu z eksportu serwerowego dla Node / React jako - `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Akcja w tle.
};
```

> `getLocale` sprawdza priorytety logicznie na Next Framework. Od góry i z wielkim precyzyjnym sposobem wykryje:
>
> 1. Na samym początku weryfikowany zostaje parametr z przekazywanych z serwera Next, albo to z routerów i proxy headera.
> 2. Póżniej po cookie dla sesji - Jeśli z serwara Next był parametr i jest wpisane co w "cache" cookie w pamięci, jest zaaplikowane!
> 3. Na wypadek jeżeli parametry z cookie również stracono czy by użytkownik nic a nic nigdy wcześniej tego nie edytował lub wyczyścił cookie szukany jest z nagłówków wysyłkowych z żądania w OS.
> 4. Nie udało się? Fallback i wybiera zadeklarowany i narzucony domyślny Default Locale dla reszty i niech się martwi ten kod że było co domyślnie :D.

### (Opcjonalnie) Krok 11: Ograniczenia oraz wydajności! Odciąż i pomniejsz swoje zasoby na stronie. - Optymalizacja Build. Z pluginem "SWC" pod Next Framework.

Narzędzie jakim używasz - "Next-Intlayer", bazuje dla poprawy doświadczeń programisty poprzez pakowanie - wysyłania (tzn: Import) na strony pełnych słowników bez Twojego ręcznego wyboru pliku w pakiecie Nexta. Odciąża ale przy rozroście dużej sieci aplikacji do ogromnych słowników dla każdego "z pliku i lokalizacji" do setki pakietowych danych spowalnia pobieranie skryptowych JS. Reagując natywnie w Next Framework Intlayer udostępnia - specjalistyczne makra (czyli taki re-build procesowy w "Turbo Webpack dla Next"), wygeneruje od początku plik a w zasadzie zmodyfikuje i ograniczy import plików Intlayera podczas "Compile/Vercel/Next" czasu do absolutnego minimum optymalnego pod twój kod w miejscu `useIntlayer` dzięki używanemu `@intlayer/swc`. Tego plugina - można nazwać dopalaczem kodu pod maską!

Plugin Intlayer zaaplikujesz (instalując z poziomy konsoli dev z `-save-dev` bo jest używane tylko jako DEV na paczkach z Node) odpowiednio:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Ważna notacja - ze względów wsparcia SWC i nowszych zmian on Next. Ten sposób na odchudzenie jest wspierany na nowszych standardach! Dla i od środowiska z generacji - **Next.js (plus nowszych niżeli) => 13\*. Odpal plugin po zainstalowaniu od nowa swój re-build na next / Vercel i on zacznie w tym pracować automatycznie i inteligentnie odzyskując dziesiątki/setki kb na przesyłach pliku .js.**

> Ważna notacja nr. 2: System od frameworków NextJS zakłada eksperymentalną flagę dlatego ten sposób pozostaje jeszcze przy testach u Next.

> Uwaga: - w tym używając konfiguracji wywołania poprzez system jak np ustawień poboru "importMode" (zamiast pobrania wszystkich i ograniczenia a pobrania asynchronicznego). Z Next Framework trzeba przy nim zadbać samemu do renderowanego drzewa, np jeśli chcesz "Fetch lub Async mode do wstawień stringa po stronie aplikacji React i serwera" czyli używając Hooka czy komponentu co będzie wymuszał `importMode`, by używało tego wewnątrz struktury Tagów wywołań w `<Suspense>`. Gdyż Next.js domyślnie zgłosi i zastopuje to z Error z wiadomością o bloku! Utrzymuj kod w standardowych rejonach po testach na zewnątrz Suspense do Next / React!

### Caching danych z systemu po procesach Next'a dla szybszych Buildów (Funkcja Turbopack / z Next Dev watcher)

W nowym frameworku systemu Vercel'a i dla Next API zmieniony i przepisany Webpack Compiler o nowej nazwie `Turbopack` przyśpieszy bardzo ładowanie Twojego projektu "Live Code w dev time" na next dev! Niestety pomimo tej zmiany sam z siebie - jak z innymi podobnymi kompilatorami Nextowymi bez pluginu on nie wykonuje procesu tak by prze-ładować modyfikowane asynchronicznie procesy (np. Twoje lokalne zmieniane w tle `.content.ts`) a wiec Next nie przerenderinguje nowości na localhost! Możesz bardzo sprawnie wstrzymać frustracje bez klikania reload browser instalując "Intlayer file watch system (Dla plugin Turbopack)" pod alias polecenia package json z npm "npm run dev". Ustal do swojej bazy od scripts `package.json` uruchomieniowy polecenie dodające flagę `-with`!

```json5 fileName="package.json"
{
  "scripts": {
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> **W przypadku systemów starych środowisk paczek. Zostało obostrzeżenie by wymuszać to** . Jeśli Twój projekt działa i instalowany jest Intlayer starszej kompilacji i nie wyżej niż np. starsze API jak `next-intlayer@<=6.x.x` (Przed 7.x) to wymóg Turbopack'a wymusza wklepanie dodatkowe argumentu pod watch. O tzw standardową systemowo flage `next dev --turbopack`. Zaleca się jednak aby wyeliminować ten błąd i upgradować paczki a ból i zapamiętywanie zostanie eliminacją na pluginach z najnowszej wersji Next i Intlayera `@>=7.X.X` co wymusza to z automatu od strzała!

### Twoja asysty Code - z TypeScript Types System

Dla bardzo wielkiej sprawności i ułatwienia kodowania i sprawdzania, by developer z systemem Intlayer robiąc projekt pod VSCode był czujny, wydajny przy pisaniu używając React / Typescript z integracją z systemem Next! W zaledwie minutę Intlayer zaaplikuje nowo gen-eryczne powiązane Typy od polecenia np (Code-AutoComplete = Typ "Module/Global Type Augmentation" System na Types TS). System ten chroni Cię w czasie pisania (Live Editor lint!) jeśli próbujesz dodać wartość która jest wymyślona a jej nie zapowiedziałeś dla tego językowego kodu albo zgubisz jakąś deklarację na nowym czy innym połączonym języku! Zobacz różnice u góry:

![Prawidłowe zachowanie ułatwiające edycje np dla VS Code "Autocomplete pop-ups".](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Spersonalizowane błędy kompilacji w edycji plików VS code (Live TypeScript Lint Check).](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Aby podłączyć i wyeliminować uciekiniera podczas pracy - Twojego inteligentnego asystenta kompilatora Next JS (TSC - Typescript Config!) Ustal odpowiedni punkt dostępu w `tsconfig.json` jak widzisz pod folder systemowy od folderu "cache outputu kompilatora" i zapisz pod tag w array w sekcji `.intlayer` by VSC oraz TS mógł zaczytać po poprawnym buildzie Types.

Zatem do Twojego pliku config: w `tsconfig.json` w sekcji z tablicami:

```json5 fileName="tsconfig.json"
{
  // ... reszta
  "include": [
    // ... reszta Twoich standardowych zapisów na kompilatory np '.next'
    ".intlayer/**/*.ts", // Wymagany alias by Intlayer współpracował jako "Auto-Complete na hook" u Ciebie z IDE (VSC itd).
  ],
}
```

### Ochrona zdalna Repo dla wersji plików - `.gitignore` i Next Git Commit rules.

System - w procesach produkcyjnych oraz dev środowisk budowy na Next JS framework (Node System) działa on asynchronicznie i wyrzuca bardzo dynamiczny od pliku pod systemy tzw cache'owany kontent w Node output folder: Nazwany do korzeni root: `.intlayer`! Od pierwszych zasad przy pracach jest standard dla CI/CD uchronienie folderów jak np `node_modules` w przypadku push request branch na gita. I dla Intlayera jako że też on wyrzuca system Cache files musisz i tak czy tak wyrzucić folder (dodając deklaracje uchronie przed konfliktami Commit dla remote na serwer, czyli git z mergem dla developer repo jak GitHuba np w branch team!) dla zachowania i pewności co do płynnych Build System np z Wdrożeniami (Pipeline Auto jak np Netlify dla branch czy Vercel cloud dla "git PR"). Bo może system nie podmienić dla środowiska Cloud czy innego deva cache lub spowodować merge konfliktu!.

Miej na to baczenie dopisując go pod ścieżkę do standardu Twojego ukrytego pliku Git (a konkretnie `gitignore`) to zignoruje upload generowanego "Intlayer-App Node system Output" z folderka .intlayer :

```plaintext fileName=".gitignore"
# Ignorowany z repozytorium zdalnego Git aby środowisko lokalne - Vercela na produkcji odzyskiwało zawsze po Node z kompilatora wykończeniowe i wypracowane słowniki najnowszego commita!
.intlayer
```

### Wzmocnij swój Workflow: Instalacja Pakietu dedykowanego asystenta Editor Extenstion np. w (VS Code Marketplace Plug).

Rozwijasz duże rzeczy używając np aplikacji Microsoft VS Code / Innych "VSCodium" for "Node / UI Web Devu"? Jeśli tak zainstaluj genialnego partnera Intlayera. Moduł do pobrania -> "**Intlayer VS Code Extension"**! I to absolutnie wolny i oficjalny i uaktualniany plugin w App store!

Bada i wspiera Cię w każdym kroku edycji!:

[Strona oficjalna Microsoft (Aplikacja VSCode z "Store" / Plugins Market Extensions / Pobieralnia)](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Pomaga przy każdym elemencie! Na przykład dodaje on:

- **Wyświetla pop-up (Pop up Tooltips Preview po przytrzymaniu Code / Mouse)**. Nie wchodź między folderami - myszka na `getLocale` albo zmiennej uaktywni Ci jak w lustrzanym widoku poglądu co zwraca string do interfejsu klienta jako output.
- **Ostrzeżenia kompilatora Next/Intlayer do kodu Linelint Editor UI "Visual" Error Red-line.**. Błędy (czyli zapomniana po wierszu czy edytorze string variable wartość) błyszczą pod oczami na czerwoną barwą a kompilator Next ci zawiadamia - że string w obcym słowniku zapomniano lub ucięto!
- **Auto "Click & Create/Add Edit UI" / Przyspieszone wstawki Code i Słowniki (Hot Keys)** dla Twojego Intlayer System Dictionary Content File - z wierszy VSC wyklika i zaimportuje do pliku! Oszczędzi błędu dla "Złego key name" i tysięcy przeklików folder / tworzenie kluczy - pliku content i pliku Componentu Next!. Do VSC plugin do odczytania / instalacji i ustawienia jak to używać polecam podłączyć zapoznać [Tutorial "Jak ustawić z Visual Studio Code od A do Z". Dokumentacja Ext.](https://intlayer.org/doc/vs-code-extension).

### Dalsze ulepszenia Workflow - Dodaj CMS pod Node (I to bez zmiany frameworka od Next Apps!)

Twoim celem było "i18n i multi-language". Twój proces Intlayer z integracją "Node Next Framework App" po instalacji, edycji i nauki poszedł o jedną milę z przodu w drodze w środowiskach do "Scale and Manage App Content i Słownik"!
Gdzie jesteś - co teraz? Jeżeli edytujesz pliki dla wielkiej grupy developerskiej (lub np agencji bez koderów jak Marketing / Tłumacz / Copywriting) zamiast kazać im tworzyć Code i pobierać Gity użyj oprogramowania w modelu platform "Next App do Server Cloud API - tzw i18n headless CMS lub na frontend React tzw In line Tool Editor Intlayer." Co dostarczy Panel zarządzania i zmian bez zmian kodu i buildów dev.
Skorzystaj i dowiedz się co dają dwie dodatkowe modyfikacje użyteczne dla team-collaborations:
Dowiedz się wiecej jak na Vercel "NextJS Visual On Site Editor UI - Wewnątrz własnego komponentu/strony React z edycją Front End Editor (Visual Editor CMS): Przeglądaj tutorial po kroku. [Wdrożenie Next App dla React UI Visual Editor. Instrukcja.](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md).

Nie chcesz pakietów w kodzie? Ustaw serwery i z API - tzw Remote Server Database Storage na Content CDN Network - [Wdrożenie oraz pełnia mocy "Headless" System CMS Panel na External Backend / Serwer Intlayer! Przewodnik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).
