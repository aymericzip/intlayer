---
createdAt: 2026-01-10
updatedAt: 2026-08-30
title: "Next.js i18n - Kompletny przewodnik po tłumaczeniu swojej aplikacji"
description: "Koniec z i18next. Przewodnik 2026 do budowania wielojęzycznej (i18n) aplikacji Next.js. Tłumacz z agentami AI i optymalizuj rozmiar bundle, SEO i wydajność."
keywords:
  - Umiędzynarodowienie
  - Dokumentacja
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Kompilator
  - AI
slugs:
  - doc
  - environment
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizacja użycia API useIntlayer w Solid do bezpośredniego dostępu do właściwości"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Pierwsze wydanie"
author: aymericzip
---

# Jak sprawić, by istniejąca aplikacja Next.js stała się wielojęzyczna (i18n) (przewodnik i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Wideo" value="video">

<iframe title="Najlepsze rozwiązanie i18n dla Next.js? Odkryj Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
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

Jeśli kiedykolwiek próbowałeś dodać wiele języków do aplikacji, która była budowana tylko dla jednego języka, to znasz ten ból. To nie jest tylko „trudne”, to żmudne. Musisz przejrzeć każdy plik, znaleźć każdy ciąg tekstowy i przenieść je do oddzielnych plików słownikowych.

Potem nadchodzi ryzykowna część: zastąpienie całego tego tekstu wywołaniami do kodu (hookami) bez psucia układu czy logiki. To ten rodzaj pracy, który wstrzymuje rozwój nowych funkcji na tygodnie i wydaje się być niekończącym się refaktoringiem.

## Czym jest Kompilator Intlayer?

**Kompilator Intlayer** został stworzony po to, by pominąć tę ręczną pracę. Zamiast zmuszać Cię do ręcznego wyciągania ciągów znaków, kompilator robi to za Ciebie. Skanuje Twój kod, znajduje tekst i wykorzystuje AI do generowania słowników w tle.
Następnie modyfikuje Twój kod podczas kompilacji (build), automatycznie wstrzykując potrzebne wywołania i18n. Zasadniczo nadal piszesz aplikację tak, jakby była w jednym języku, a kompilator zajmuje się wielojęzyczną transformacją natywnie.

> Dokumentacja kompilatora: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md)

### Ograniczenia

Ponieważ kompilator wykonuje analizę i transformację kodu (wstawianie hooków i generowanie słowników) w **czasie kompilacji**, może on **spowolnić proces budowania** Twojej aplikacji.

Aby ograniczyć ten wpływ podczas programowania (development), możesz ustawić kompilator w trybie [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md) lub całkowicie go wyłączyć, gdy nie jest potrzebny.

---

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji Next.js

<Steps>

<Step number={1} title="Instalacja zależności">

Zainstaluj potrzebne pakiety za pomocą npm:

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

> flaga `--interactive` jest opcjonalna. Użyj `intlayer-cli init`, jeśli jesteś agentem AI.

> To polecenie wykryje Twoje środowisko i zainstaluje wymagane pakiety. Na przykład:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
```

- **intlayer**

  Główny pakiet dostarczający narzędzia do umiędzynarodowienia, takie jak zarządzanie konfiguracją, tłumaczenia, [deklaracja treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilacja oraz [komendy CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **next-intlayer**

  Pakiet integrujący Intlayer z frameworkiem Next.js. Dostarcza context providery oraz hooki dla Next.js. Ponadto zawiera wtyczkę Next.js pozwalającą połączyć Intlayer z [Webpackiem](https://webpack.js.org/) lub [Turbopackiem](https://nextjs.org/docs/app/api-reference/turbopack), a także middleware do wykrywania języka, zarządzania cookies i obsługi przekierowań URL.

</Step>

<Step number={2} title="Konfiguracja projektu">

Utwórz plik konfiguracyjny, by zdefiniować dostępne języki aplikacji:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.POLISH],
    defaultLocale: Locales.POLISH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    /**
     * Wskazuje, czy kompilator powinien być włączony.
     */
    enabled: true,

    /**
     * Katalog wyjściowy dla zoptymalizowanych słowników.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Wstaw tylko zawartość do wygenerowanego pliku, bez klucza.
     */
    noMetadata: false,

    /**
     * Prefiks klucza słownika
     */
    dictionaryKeyPrefix: "", // Remove base prefix

    /**
     * Wskazuje, czy komponenty powinny być zapisywane po transformacji.
     * W ten sposób kompilator można uruchomić tylko raz, aby przetransformować aplikację, a następnie go usunąć.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Ta aplikacja to prosty przykład aplikacji mapowej",
  },
};

export default config;
```

> **Uwaga**: Upewnij się, że Twój `OPEN_AI_API_KEY` jest ustawiony w zmiennych środowiskowych.

> Za pomocą tego pliku konfiguracyjnego możesz ustawić zlokalizowane adresy URL, przekierowania proxy, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji treści, wyłączyć logi konsoli Intlayer i wiele więcej. Pełną listę parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Step>

<Step number={3} title="Integracja Intlayer z konfiguracją Next.js">

Skonfiguruj swoje ustawienia Next.js, aby używać Intlayer:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* opcjonalna dodatkowa konfiguracja Next.js tutaj */
};

export default withIntlayer(nextConfig);
```

> Plugin `withIntlayer()` służy do integracji Intlayer z Next.js. Zapewnia budowanie plików słowników i monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w środowiskach [Webpack](https://webpack.js.org/) lub [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Ponadto dostarcza aliasy w celu optymalizacji wydajności i zapewnia pełną współpracę z Server Components.

</Step>

<Step number={4} title="Konfiguracja Babel">

Kompilator Intlayer wymaga Babel do wyodrębniania i optymalizacji treści. Zaktualizuj swój plik `babel.config.js` (lub `babel.config.json`), aby zawierał wtyczki Intlayer:

```typescript fileName="babel.config.js"
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

</Step>

<Step number={5} title="Wykrywanie języka na stronach">

Wyczyść zawartość swojego `RootLayout` i zastąp ją poniższym przykładem:

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
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
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Step>

<Step number={6} title="Kompilacja komponentów">

Z włączonym kompilatorem absolutnie **nie masz wymogu** ręcznego deklarowania słowników treści (takich jak pliki `.content.ts`).

Zamiast tego po prostu wpisujesz treść jako standardowe ciągi znaków (hardcoded) bezpośrednio w kodzie. Intlayer przeskanuje kod źródłowy, wygeneruje tłumaczenia przy użyciu skonfigurowanego dostawcy AI i po cichu zastąpi te ciągi zlokalizowaną treścią podczas kroku kompilacji. Wszystko to jest w pełni zautomatyzowane.

Wystarczy pisać komponenty z zakodowanymi na sztywno ciągami znaków w domyślnym języku. Kompilator zajmie się resztą.

Przykład tego, jak może wyglądać Twoja strona:

<Tabs>
<Tab value="Code">

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
<Tab value="Output">

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

</Tab>
</Tabs>

<Tabs>
<Tab label='Intlayer >=9.4' value='>=9.4'>

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

- **`IntlayerProvider`** jest montowany raz, w root layout. Dostarcza locale zarówno komponentom serwerowym, jak i klienckim, więc strony nie zawijają się już same w sobie.
- Bez segmentu ścieżki `[locale]` locale zawsze pochodzi z żądania — nagłówka `x-intlayer-locale` ustawionego przez proxy Intlayer, a następnie pliku cookie locale — które hooki serwerowe czytają samodzielnie, gdy provider nie został uruchomiony.

</Tab>
<Tab label='Intlayer <9.4' value='<9.4'>

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

- **`IntlayerClientProvider`** służy do dostarczania języka dzięcom po stronie klienta (Client Side).
- **`IntlayerServerProvider`** służy do dostarczania języka dzięcom po stronie serwera (Server Side).

  > Layout and page cannot share a common server context because the server context system is based on a per-request data store (via [React's cache](https://react.dev/reference/react/cache) mechanism), causing each "context" to be re-created for different segments of the application. Placing the provider in a shared layout would break this isolation, preventing the correct propagation of the server context values to your server components.

</Tab>

</Tabs>

</Step>

<Step number={7} title="Uzupełnij brakujące tłumaczenia" isOptional={true}>

Intlayer udostępnia narzędzie CLI, które pomaga uzupełnić brakujące tłumaczenia. Możesz użyć polecenia `intlayer`, aby przetestować i uzupełnić brakujące tłumaczenia ze swojego kodu.

```bash packageManager="npm"
npx intlayer test         # Przetestuj, czy brakuje tłumaczeń
```

```bash packageManager="yarn"
yarn intlayer test         # Przetestuj, czy brakuje tłumaczeń
```

```bash packageManager="pnpm"
pnpm intlayer test         # Przetestuj, czy brakuje tłumaczeń
```

```bash packageManager="bun"
bun x intlayer test         # Przetestuj, czy brakuje tłumaczeń
```

```bash packageManager="npm"
npx intlayer fill         # Uzupełnij brakujące tłumaczenia
```

```bash packageManager="yarn"
yarn intlayer fill         # Uzupełnij brakujące tłumaczenia
```

```bash packageManager="pnpm"
pnpm intlayer fill         # Uzupełnij brakujące tłumaczenia
```

```bash packageManager="bun"
bun x intlayer fill         # Uzupełnij brakujące tłumaczenia
```

> Więcej szczegółów znajdziesz w [dokumentacji CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/ci.md)

</Step>

<Step number={8} title="Konfiguracja Proxy do wykrywania języka" isOptional={true}>

Skonfiguruj proxy w celu automatycznego wykrywania preferowanego języka użytkownika:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` służy do wykrywania preferowanego języka użytkownika i przekierowywania go na odpowiedni adres URL, zgodnie z ustawieniami w [pliku konfiguracyjnym](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md). Dodatkowo umożliwia zapisanie preferowanego języka w ciasteczku (cookie).

> Od wersji Intlayer v9, to middleware respektuje opcję `routing.enableProxy` (`true` domyślnie). Ustaw `routing.enableProxy: false` w swojej konfiguracji, aby przekształcić go w pass-through bez usuwania tego pliku. Zobacz [notatki wydania v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/releases/v9.md).

</Step>

<Step number={9} title="Zmiana języka treści" isOptional={true}>

Aby zmienić język treści w Next.js, zalecanym sposobem jest użycie komponentu `Link` w celu przekierowania użytkowników na odpowiednią zlokalizowaną stronę. Komponent `Link` umożliwia prefetching stron, co pomaga uniknąć pełnego odświeżenia witryny.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

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
              {/* Język w swoim własnym Locale - np. Polski */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Język w bieżącym Locale - np. Francés, jeśli bieżące locale to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Język po angielsku - np. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Alternatywnym sposobem jest użycie funkcji `setLocale` dostarczanej przez hook `useLocale`. Ta funkcja nie pozwala na prefetching strony. Więcej szczegółów znajdziesz w [dokumentacji hooka `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useLocale.md).

</Step>

<Step number={10} title="Optymalizacja rozmiaru bundle'a" isOptional={true}>

Podczas korzystania z `next-intlayer` słowniki są domyślnie dołączane do bundle'a dla każdej strony. Aby zoptymalizować rozmiar bundle'a, Intlayer udostępnia opcjonalną wtyczkę SWC, która inteligentnie zastępuje wywołania `useIntlayer` za pomocą makr. Zapewnia to, że słowniki są dołączane tylko do bundle'i stron, które faktycznie z nich korzystają.

Plugin `@intlayer/babel` już integruje optymalizację bundlingu (zobacz `babel.config.js`). Jednak plugin `@intlayer/swc` jest bardziej wydajny. Jeśli usuniesz plugin `@intlayer/babel`, możesz użyć pluginu `@intlayer/swc`.

Aby włączyć tę optymalizację, zainstaluj pakiet `@intlayer/swc`. Po zainstalowaniu `next-intlayer` automatycznie wykryje i użyje wtyczki:

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

> Uwaga: Ta optymalizacja jest dostępna tylko dla Next.js 13 i nowszych.

> Uwaga: Ten pakiet nie jest instalowany domyślnie, ponieważ wtyczki SWC w Next.js są wciąż eksperymentalne. Może to ulec zmianie w przyszłości.

> Uwaga: Jeśli ustawisz opcję `importMode: 'dynamic'` lub `importMode: 'fetch'` (w konfiguracji słownika), będzie ona polegać na Suspense, więc będziesz musiał owinąć wywołania `useIntlayer` w granicę `Suspense`. Oznacza to, że nie będziesz mógł używać `useIntlayer` bezpośrednio na najwyższym poziomie komponentu Strony / Layoutu.

</Step>

<Step number={11} title="Wyodrębnij zawartość swoich komponentów" isOptional={true}>

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
<Tab value='Extract command'>

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
<Tab value='Babel compiler'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Wyodrębnij zawartość z komponentów do słowników
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
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
</Step>

</Steps>

### Konfiguracja TypeScript

Intlayer używa rozszerzania modułów (module augmentation), aby czerpać korzyści z TypeScript i uczynić Twoją bazę kodu bardziej solidną.

![Autouzupełnianie](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Błąd tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Upewnij się, że Twoja konfiguracja TypeScript zawiera automatycznie generowane typy.

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Uwzględnij autogenerowane typy
  ],
}
```

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich commitowania do repozytorium Git.

Aby to zrobić, dodaj poniższe instrukje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby usprawnić proces tworzenia aplikacji z Intlayer, możesz zainstalować **oficjalne rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd inline** przetłumaczonej treści.
- **Szybkie akcje** do łatwego tworzenia i aktualizowania tłumaczeń.

Więcej szczegółów na temat korzystania z rozszerzenia znajdziesz w [dokumentacji rozszerzenia Intlayer dla VS Code](https://intlayer.org/doc/vs-code-extension).

### Idź dalej

Aby pójść o krok dalej, możesz wdrożyć [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyeksportować swoją treść za pomocą [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

## Często Zadawane Pytania

<FAQ>

<Question title="Jakie są różne rozwiązania dostępne do internacjonalizacji aplikacji Next.js?">

Pole `i18n` w `next.config.js` nie ma zastosowania do App Routera, dlatego warstwa lokalizacji jest zawsze wyborem biblioteki:

- **`next-intl`**, **`next-i18next` / `i18next`** oraz **`react-intl`**: katalogi JSON lub ICU ładowane per przestrzeń nazw (namespace), z kluczami pisanymi ręcznie w każdym miejscu wywołania.
- **`Lingui`**: rozwiązanie oparte na ekstrakcji, z komunikatami ICU kompilowanymi w czasie budowania.
- **`Intlayer`**: treść kompilowana z Twoich komponentów w czasie budowania, w pełni typowana, ze zintegrowanym tłumaczeniem AI, edytorem wizualnym i systemem CMS.

Ten przewodnik korzysta z konfiguracji kompilatora, w której piszesz zwykłe ciągi tekstowe w swoich komponentach, a słowniki są generowane automatycznie. Zobacz [dlaczego Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md) oraz [benchmark i18n Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md).

</Question>

<Question title="O ile i18n zwiększa rozmiar mojego bundle'a w Next.js?">

Znacznie mniej niż konfiguracja oparta na przestrzeniach nazw, ponieważ strona nigdy nie pobiera katalogu, którego nie renderuje. Komponenty serwerowe (Server Components) rozwiązują swoją zawartość na serwerze, a kompilator czasu budowania zastępuje wywołania `useIntlayer` dokładnymi wpisami słownika, z których korzysta komponent. Dzięki temu nieużywane klucze i nieużywane języki są usuwane, a [dynamiczne słowniki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md) dzielą resztę per lokalizacja. W porównaniu ze standardowymi alternatywami, Intlayer redukuje rozmiar bundle'a i strony nawet o 50%. Zobacz [optymalizacja bundle'a](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) oraz [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md).

</Question>

<Question title="Czy mogę zmigrować z next-intl, next-i18next lub i18next bez przepisywania moich komponentów?">

Tak, i istnieją dwie ścieżki. Możesz migrować zawartość stopniowo, korzystając z [przewodnika migracji z next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-intl_to_intlayer.md) lub [przewodnika migracji z i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md). Możesz także całkowicie zachować swoje obecne API: [adaptery kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md) udostępniają dokładnie to samo API co `next-intl`, `react-i18next` i `react-intl`, ale obsługiwane przez słowniki Intlayer, dzięki czemu zmieniają się tylko importy, a kod komponentów pozostaje bez zmian.

</Question>

<Question title="Czy mogę zachować moje istniejące pliki tłumaczeń JSON?">

Tak. Wtyczka [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) zachowuje Twoje pliki `/messages/{locale}/{namespace}.json` jako źródło prawdy i generuje z nich słowniki Intlayer w obu kierunkach. Wtyczka [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md) robi to samo dla katalogów gettext, a [pliki per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/per_locale_file.md) pozwalają rozdzielić zawartość według języka zamiast grupować lokalizacje w jednym pliku.

</Question>

<Question title="Czy muszę przenosić moją zawartość klucz po kluczu?">

Nie, i to jest właśnie to, co konfiguruje ten przewodnik. Piszesz komponenty ze zwykłymi ciągami znaków w domyślnej lokalizacji, a [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) skanuje kod źródłowy przy każdym budowaniu, wyodrębnia tekst widoczny dla użytkownika i generuje słowniki, więc nie ma potrzeby ręcznego tworzenia ani utrzymywania kluczy.

Warto pamiętać o dwóch ograniczeniach. Kompilator działa w oparciu o analizę statyczną, więc ciągi tekstowe istniejące tylko w czasie wykonywania, takie jak kody błędów API czy pola z CMS, pozostają poza jego zasięgiem i nadal wymagają zadeklarowanego słownika. Musi on również odróżnić tekst dla użytkownika od logiki aplikacji, takiej jak `className="active"` czy kod stanu, co w dużej bazie kodu wymaga kilku adnotacji.

Jeśli wolisz zachować kontrolę, polecenie `npx intlayer extract` wykonuje taką samą ekstrakcję jednorazowo na wybranych plikach i tworzy plik `.content` obok każdego komponentu do wglądu. Zobacz [polecenie extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md).

</Question>

<Question title="Jakie narzędzia dla edytora i agentów AI są dostępne?">

Pięć narzędzi, wszystkie opcjonalne:

- **[Rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)**: przejście od klucza `useIntlayer` do pliku treści, który go deklaruje, wyodrębnianie treści z komponentu oraz uruchamianie build, fill, test, push i pull z palety poleceń lub dedykowanej karty Intlayer.
- **[Serwer LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**: taka sama świadomość w dowolnym edytorze obsługującym LSP, z funkcjami przejdź do definicji (go to definition), znajdź wszystkie referencje, podglądem przetłumaczonej wartości po najechaniu kursorem, autouzupełnianiem kluczy i pól oraz ostrzeżeniem, gdy klucz nie jest nigdzie zadeklarowany. Rozpoznaje również wywołania `i18next`, `react-i18next`, `next-intl` i `use-intl`, co ułatwia migrację.
- **[Serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)**: udostępnia dokumentację i CLI Intlayer dla Cursor, VS Code, Claude Desktop, Claude Code i ChatGPT, dzięki czemu asystent odpowiada na podstawie aktualnej dokumentacji zamiast zgadywać i może samodzielnie wykonywać polecenia, takie jak `intlayer fill`.
- **[Umiejętności agenta (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**: wyspecjalizowane umiejętności, takie jak `intlayer-config`, `intlayer-cli` i `intlayer-content`, oraz po jednej dla każdego frameworka, które uczą agenta konfiguracji routingu i typów węzłów treści.
- **[Wtyczka ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md)**: reguła `no-raw-text` oznacza zakodowane na stałe ciągi tekstowe, z dodatkowymi regułami dla statycznych kluczy słownika i nieużywanej zawartości.

</Question>

<Question title="Czy powinienem używać kompilatora, czy deklarować zawartość samodzielnie?">

Użyj kompilatora, jeśli chcesz dodać i18n do istniejącej bazy kodu przy minimalnym nakładzie pracy: Twoje komponenty pozostają bez zmian, a słowniki tworzą się same. Deklaruj treść samodzielnie, jak opisano w [standardowym przewodniku po Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md), gdy potrzebujesz bezpośredniej kontroli nad kluczami, strukturą i ponownym wykorzystaniem. Obie metody mogą współistnieć w ramach tej samej warstwy słowników.

</Question>

<Question title="Dlaczego muszę konfigurować Babel?">

Wyjaśnia to krok 4. Kompilator odczytuje Twoje komponenty poprzez transformację Babel, więc Next.js potrzebuje pliku `babel.config.js`, aby uruchomić krok ekstrakcji. Polecenie `npx intlayer init --interactive` tworzy go automatycznie, gdy wybierzesz konfigurację kompilatora.

</Question>

<Question title="Co dzieje się z ciągami znaków, których kompilator nie widzi?">

Pozostają nieprzetłumaczone, ponieważ kompilator działa w oparciu o analizę statyczną. Wszystko, co jest generowane w czasie wykonywania, na przykład komunikat o błędzie z API, pole CMS czy ciąg tworzony przez konkatenację, musi być zadeklarowane w pliku zawartości w standardowy sposób. Uruchom `npx intlayer test`, aby sprawdzić, czego brakuje.

</Question>

<Question title="Jak uzupełnić brakujące tłumaczenia?">

Obejmuje to krok 7. Polecenie `npx intlayer fill` wysyła wyodrębnioną treść do wybranego modelu LLM, korzystając z Twojego dostawcy i klucza API, a flaga `--git-diff` ogranicza operację do zmian na bieżącej gałęzi. Zobacz [polecenie fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md) oraz [integrację CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/CI_CD.md).

</Question>

<Question title="W jaki sposób wykrywana jest lokalizacja?">

Krok 5 odczytuje ją na stronach, a krok 8 dodaje proxy, które określa lokalizację na podstawie adresu URL, ciasteczka lub nagłówka `Accept-Language`. Opcja `routing.mode` decyduje, czy lokalizacja w ogóle pojawia się w ścieżce. Zobacz [dokumentację konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Question>

<Question title="Czy Intlayer obsługuje formy mnogie, płeć i sformatowany tekst (rich text)?">

Tak: [formy mnogie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/plurial.md), [treści zależne od płci](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/gender.md), warunki, [wstawki (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/markdown.md) oraz [formatowania](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/formatters.md) dla liczb, dat i walut.

</Question>

<Question title="Jak tłumacze mogą edytować treść bez dotykania kodu?">

Za pośrednictwem [edytora wizualnego](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md), który działa na Twojej własnej infrastrukturze i pozwala każdemu edytować tekst bezpośrednio w działającej aplikacji, lub systemu [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md), który uzewnętrznia treść, dzięki czemu może być zmieniana bez konieczności ponownego wdrażania aplikacji.

</Question>

<Question title="Czy Intlayer jest darmowy i open source?">

Tak, na licencji Apache 2.0, włączając zastosowania komercyjne. Hostowany CMS to opcjonalna płatna usługa, którą można również [hostować samodzielnie (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md).

</Question>

</FAQ>
