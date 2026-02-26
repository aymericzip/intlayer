---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Przekształć istniejącą aplikację Next.js w aplikację wielojęzyczną w 2026
description: Dowiedz się, jak uczynić swoją istniejącą aplikację Next.js wielojęzyczną za pomocą Kompilatora Intlayer. Postępuj zgodnie z dokumentacją, aby umiędzynarodowić (i18n) i przetłumaczyć swoją aplikację przy użyciu AI.
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
  - srodowisko
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

Jeśli kiedykolwiek próbowałeś dodać wiele języków do aplikacji, która była budowana tylko dla jednego języka, to znasz ten ból. To nie jest tylko „trudne” — to żmudne. Musisz przejrzeć każdy plik, znaleźć każdy ciąg tekstowy i przenieść je do oddzielnych plików słownikowych.

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

  Główny pakiet dostarczający narzędzia do umiędzynarodowienia, takie jak zarządzanie konfiguracją, tłumaczenia, [deklaracja treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilacja oraz [komendy CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **next-intlayer**

  Pakiet integrujący Intlayer z frameworkiem Next.js. Dostarcza context providery oraz hooki dla Next.js. Ponadto zawiera wtyczkę Next.js pozwalającą połączyć Intlayer z [Webpackiem](https://webpack.js.org/) lub [Turbopackiem](https://nextjs.org/docs/app/api-reference/turbopack), a także middleware do wykrywania języka, zarządzania cookies i obsługi przekierowań URL.

### Krok 2: Konfiguracja projektu

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
     * Określa, czy kompilator powinien być włączony.
     */
    enabled: true,

    /**
     * Katalog wyjściowy dla zoptymalizowanych słowników.
     */
    outputDir: "compiler",

    /**
     * Prefiks klucza słownika
     */
    dictionaryKeyPrefix: "", // Usuń prefiks bazowy

    /**
     * Określa, czy komponenty powinny zostać zapisane po transformacji.
     * W ten sposób kompilator można uruchomić tylko raz, aby przekształcić aplikację, a następnie można go usunąć.
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

### Krok 3: Integracja Intlayer z konfiguracją Next.js

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

### Krok 4: Konfiguracja Babel

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

### Krok 5: Wykrywanie języka na stronach

Wyczyść zawartość swojego `RootLayout` i zastąp ją poniższym przykładem:

```tsx fileName="src/app/layout.tsx"
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

### Krok 6: Kompilacja komponentów

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

- **`IntlayerClientProvider`** służy do dostarczania języka dzięcom po stronie klienta (Client Side).
- **`IntlayerServerProvider`** służy do dostarczania języka dzięcom po stronie serwera (Server Side).

### (Opcjonalnie) Krok 7: Uzupełnij brakujące tłumaczenia

Intlayer udostępnia narzędzie CLI, które pomaga uzupełnić brakujące tłumaczenia. Możesz użyć polecenia `intlayer`, aby przetestować i uzupełnić brakujące tłumaczenia ze swojego kodu.

```bash
npx intlayer test         # Przetestuj, czy brakuje tłumaczeń
```

```bash
npx intlayer fill         # Uzupełnij brakujące tłumaczenia
```

> Więcej szczegółów znajdziesz w [dokumentacji CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/ci.md)

### (Opcjonalnie) Krok 8: Konfiguracja Proxy do wykrywania języka

Skonfiguruj proxy w celu automatycznego wykrywania preferowanego języka użytkownika:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` służy do wykrywania preferowanego języka użytkownika i przekierowywania go na odpowiedni adres URL, zgodnie z ustawieniami w [pliku konfiguracyjnym](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md). Dodatkowo umożliwia zapisanie preferowanego języka w ciasteczku (cookie).

### (Opcjonalnie) Krok 8: Zmiana języka treści

Aby zmienić język treści w Next.js, zalecanym sposobem jest użycie komponentu `Link` w celu przekierowania użytkowników na odpowiednią zlokalizowaną stronę. Komponent `Link` umożliwia prefetching stron, co pomaga uniknąć pełnego odświeżenia witryny.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
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

### (Opcjonalnie) Krok 10: Optymalizacja rozmiaru bundle'a

Podczas korzystania z `next-intlayer` słowniki są domyślnie dołączane do bundle'a dla każdej strony. Aby zoptymalizować rozmiar bundle'a, Intlayer udostępnia opcjonalną wtyczkę SWC, która inteligentnie zastępuje wywołania `useIntlayer` za pomocą makr. Zapewnia to, że słowniki są dołączane tylko do bundle'i stron, które faktycznie z nich korzystają.

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
