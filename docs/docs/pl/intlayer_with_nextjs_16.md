---
createdAt: 2024-12-06
updatedAt: 2025-12-30
title: Jak przetłumaczyć swoją aplikację Next.js 16 – przewodnik i18n 2026
description: Odkryj, jak uczynić swoją stronę Next.js 16 wielojęzyczną. Postępuj zgodnie z dokumentacją, aby zinternacjonalizować (i18n) i przetłumaczyć ją.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Dodaj polecenie init
  - version: 7.0.6
    date: 2025-11-01
    changes: Dodano wzmiankę o `x-default` w obiekcie `alternates`
  - version: 7.0.0
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Przetłumacz swoją stronę Next.js 16 za pomocą Intlayer | Internacjonalizacja (i18n)

<Tabs defaultTab="video">
  <Tab label="Wideo" value="video">
  
<iframe title="Najlepsze rozwiązanie i18n dla Next.js? Odkryj Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak zinternacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-next-16-template) na GitHubie.

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna, otwartoźródłowa biblioteka do internacjonalizacji (i18n), zaprojektowana w celu uproszczenia obsługi wielojęzyczności we współczesnych aplikacjach internetowych. Intlayer bezproblemowo integruje się z najnowszym frameworkiem **Next.js 16**, w tym z jego potężnym **App Router**. Jest zoptymalizowany do pracy z **Server Components** dla efektywnego renderowania i jest w pełni kompatybilny z [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentu.
- **Dynamicznie lokalizować metadane**, trasy i zawartość.
- **Uzyskać dostęp do tłumaczeń zarówno w komponentach po stronie klienta, jak i serwera**.
- **Zapewnić wsparcie dla TypeScript** dzięki automatycznie generowanym typom, co poprawia autouzupełnianie i wykrywanie błędów.
- **Korzystać z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i przełączanie lokalizacji.

> Intlayer jest kompatybilny z Next.js 12, 13, 14 i 16. Jeśli używasz Next.js Page Router, możesz odnieść się do tego [przewodnika](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_page_router.md).
> Routing lokalizacji jest przydatny dla SEO, rozmiaru pakietu i wydajności. Jeśli go nie potrzebujesz, możesz odnieść się do tego [przewodnika](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_no_locale_path.md).
> Dla Next.js 12, 13, 14 z App Router, odnieś się do tego [przewodnika](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_14.md).

---

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji Next.js

### Krok 1: Zainstaluj zależności

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bunx intlayer init
```

- **intlayer**

  Podstawowy pakiet, który dostarcza narzędzia do internacjonalizacji dla zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilacji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **next-intlayer**

  Pakiet integrujący Intlayer z Next.js. Dostarcza dostawców kontekstu oraz hooki do internacjonalizacji w Next.js. Dodatkowo zawiera wtyczkę Next.js do integracji Intlayer z [Webpack](https://webpack.js.org/) lub [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), a także proxy do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami oraz obsługi przekierowań URL.

### Krok 2: Skonfiguruj swój projekt

Oto ostateczna struktura, którą stworzymy:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Układ lokalizacji dla dostawcy Intlayer
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Główny układ dla stylów i globalnych dostawców
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> Jeśli nie chcesz routingu lokalizacji, intlayer może być używany jako prosty dostawca / hook. Zobacz [ten przewodnik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_no_locale_path.md) po więcej szczegółów.

Utwórz plik konfiguracyjny, aby skonfigurować języki swojej aplikacji:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Twoje pozostałe lokalizacje
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Twoje pozostałe lokalizacje
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Twoje pozostałe lokalizacje
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Dzięki temu plikowi konfiguracyjnemu możesz ustawić lokalizowane adresy URL, przekierowania proxy, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji zawartości, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 3: Zintegruj Intlayer w konfiguracji Next.js

Skonfiguruj swoje środowisko Next.js, aby korzystało z Intlayer:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* opcje konfiguracji tutaj */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* opcje konfiguracji tutaj */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* opcje konfiguracji tutaj */
};

module.exports = withIntlayer(nextConfig);
```

> Wtyczka Next.js `withIntlayer()` służy do integracji Intlayer z Next.js. Zapewnia budowanie plików deklaracji treści oraz monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w środowiskach [Webpack](https://webpack.js.org/) lub [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Dodatkowo dostarcza aliasy optymalizujące wydajność oraz zapewnia kompatybilność z komponentami serwerowymi.

> Funkcja `withIntlayer()` jest funkcją zwracającą obietnicę. Pozwala przygotować słowniki Intlayer przed rozpoczęciem budowania. Jeśli chcesz użyć jej z innymi wtyczkami, możesz na nią zaczekać (await). Przykład:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Jeśli chcesz używać tego synchronicznie, możesz użyć funkcji `withIntlayerSync()`. Przykład:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Intlayer automatycznie wykrywa, czy Twój projekt używa **webpack** czy **Turbopack** na podstawie flag wiersza poleceń `--webpack`, `--turbo` lub `--turbopack`, a także bieżącej wersji **Next.js**.
>
> Od wersji `next>=16`, jeśli używasz **Rspack**, musisz jawnie wymusić na Intlayer korzystanie z konfiguracji webpack poprzez wyłączenie Turbopack:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

### Krok 4: Zdefiniuj dynamiczne trasy lokalizacji

Usuń wszystko z `RootLayout` i zastąp to następującym kodem:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Nadal możesz opakować dzieci innymi dostawcami, takimi jak `next-themes`, `react-query`, `framer-motion` itp.
  <>{children}</>
);

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => (
  // Nadal możesz opakować dzieci innymi dostawcami, takimi jak `next-themes`, `react-query`, `framer-motion` itp.
  <>{children}</>
);

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => (
  // Nadal możesz opakować dzieci innymi dostawcami, takimi jak `next-themes`, `react-query`, `framer-motion` itp.
  <>{children}</>
);

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> Pozostawienie komponentu `RootLayout` pustym pozwala na ustawienie atrybutów [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) oraz [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) dla tagu `<html>`.

Aby zaimplementować dynamiczne routowanie, podaj ścieżkę dla lokalizacji, dodając nowy layout w katalogu `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = async ({ children, params: { locale } }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

module.exports = LocaleLayout;
```

> Segment ścieżki `[locale]` służy do określenia lokalizacji. Przykład: `/en-US/about` odnosi się do `en-US`, a `/fr/about` do `fr`.

> Na tym etapie napotkasz błąd: `Error: Missing <html> and <body> tags in the root layout.`. Jest to oczekiwane, ponieważ plik `/app/page.tsx` nie jest już używany i można go usunąć. Zamiast tego segment ścieżki `[locale]` aktywuje stronę `/app/[locale]/page.tsx`. W konsekwencji strony będą dostępne pod ścieżkami takimi jak `/en`, `/fr`, `/es` w Twojej przeglądarce. Aby ustawić domyślny język jako stronę główną, odnieś się do konfiguracji `proxy` w kroku 7.

Następnie zaimplementuj funkcję `generateStaticParams` w układzie aplikacji.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Linia do dodania

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Reszta kodu*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Linia do wstawienia

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Reszta kodu*/
};

// ... Reszta kodu
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Linia do wstawienia

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Reszta kodu*/
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` zapewnia, że Twoja aplikacja wstępnie buduje niezbędne strony dla wszystkich lokalizacji, zmniejszając obciążenie podczas działania i poprawiając doświadczenie użytkownika. Aby uzyskać więcej informacji, zapoznaj się z [dokumentacją Next.js dotyczącą generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

> Intlayer działa z `export const dynamic = 'force-static';`, aby zapewnić, że strony są wstępnie zbudowane dla wszystkich lokalizacji.

### Krok 5: Zadeklaruj swoją zawartość

Utwórz i zarządzaj deklaracjami zawartości, aby przechowywać tłumaczenia:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Get started by editing",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Twoje deklaracje zawartości mogą być definiowane w dowolnym miejscu w aplikacji, pod warunkiem, że zostaną umieszczone w katalogu `contentDir` (domyślnie `./src`). I będą miały rozszerzenie pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Aby uzyskać więcej szczegółów, zapoznaj się z [dokumentacją deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Krok 6: Wykorzystaj zawartość w swoim kodzie

Uzyskaj dostęp do swoich słowników zawartości w całej aplikacji:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};
```

- **`IntlayerClientProvider`** służy do dostarczania lokalizacji komponentom po stronie klienta. Może być umieszczony w dowolnym komponencie nadrzędnym, w tym w layoucie. Jednak zaleca się umieszczenie go w layoucie, ponieważ Next.js współdzieli kod layoutu między stronami, co jest bardziej efektywne. Używając `IntlayerClientProvider` w layoucie, unikasz ponownej inicjalizacji dla każdej strony, poprawiając wydajność i utrzymując spójny kontekst lokalizacji w całej aplikacji.
- **`IntlayerServerProvider`** służy do dostarczania lokalizacji komponentom po stronie serwera. Nie może być ustawiony w layoucie.

  > Layout i strona nie mogą dzielić wspólnego kontekstu serwera, ponieważ system kontekstu serwera opiera się na magazynie danych na żądanie (za pomocą mechanizmu [React's cache](https://react.dev/reference/react/cache)), co powoduje, że każdy "kontekst" jest tworzony na nowo dla różnych segmentów aplikacji. Umieszczenie providera w wspólnym layoucie złamałoby tę izolację, uniemożliwiając prawidłowe propagowanie wartości kontekstu serwera do komponentów serwerowych.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Utwórz powiązaną deklarację zawartości

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Utwórz powiązaną deklarację zawartości

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Utwórz powiązaną deklarację zawartości

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx"  codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Utwórz powiązaną deklarację zawartości

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Utwórz powiązaną deklarację zawartości

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Utwórz powiązaną deklarację zawartości

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Jeśli chcesz użyć swojej zawartości w atrybucie `string`, takim jak `alt`, `title`, `href`, `aria-label` itp., musisz wywołać wartość funkcji, na przykład:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Aby dowiedzieć się więcej o hooku `useIntlayer`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useIntlayer.md).

### (Opcjonalny) Krok 7: Konfiguracja proxy do wykrywania lokalizacji

Skonfiguruj proxy, aby wykrywać preferowaną lokalizację użytkownika:

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

> `intlayerProxy` służy do wykrywania preferowanego języka użytkownika i przekierowywania go na odpowiedni adres URL, zgodnie z [konfiguracją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md). Dodatkowo umożliwia zapisywanie preferowanego języka użytkownika w ciasteczku.

> Jeśli potrzebujesz łączyć kilka proxy razem (na przykład `intlayerProxy` z uwierzytelnianiem lub niestandardowymi proxy), Intlayer udostępnia teraz pomocnika o nazwie `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### (Opcjonalny) Krok 8: Internacjonalizacja metadanych

W przypadku, gdy chcesz internacjonalizować swoje metadane, takie jak tytuł Twojej strony, możesz użyć funkcji `generateMetadata` dostarczanej przez Next.js. Wewnątrz możesz pobrać zawartość z funkcji `getIntlayer`, aby przetłumaczyć swoje metadane.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una application Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una application Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una application Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

module.exports = metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generuje obiekt zawierający wszystkie url dla każdego języka.
   *
   * Przykład:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Zwraca
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Reszta kodu
````

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generuje obiekt zawierający wszystkie url dla każdego języka.
   *
   * Przykład:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Zwraca
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Reszta kodu
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generuje obiekt zawierający wszystkie url dla każdego języka.
   *
   * Przykład:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Zwraca
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

module.exports = { generateMetadata };

// ... Reszta kodu
````

> Zauważ, że funkcja `getIntlayer` zaimportowana z `next-intlayer` zwraca Twoją zawartość opakowaną w `IntlayerNode`, co pozwala na integrację z edytorem wizualnym. Natomiast funkcja `getIntlayer` zaimportowana z `intlayer` zwraca Twoją zawartość bezpośrednio bez dodatkowych właściwości.

Alternatywnie możesz użyć funkcji `getTranslation` do zadeklarowania swoich metadanych. Jednak używanie plików deklaracji treści jest zalecane, aby zautomatyzować tłumaczenie metadanych i w pewnym momencie wyodrębnić zawartość.

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Reszta kodu
```

```javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

// ... Reszta kodu
```

```javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  const t = (content) => getTranslation(content, locale);

  return {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };
};

module.exports = { generateMetadata };

// ... Reszta kodu
```

> Dowiedz się więcej o optymalizacji metadanych [w oficjalnej dokumentacji Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Opcjonalny) Krok 9: Internacjonalizacja sitemap.xml i robots.txt

Aby zinternacjonalizować swoje pliki `sitemap.xml` i `robots.txt`, możesz użyć funkcji `getMultilingualUrls` dostarczonej przez Intlayer. Ta funkcja pozwala na generowanie wielojęzycznych adresów URL dla Twojej mapy witryny.

```tsx fileName="src/app/sitemap.ts" codeFormat="typescript"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const sitemap = () => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> Dowiedz się więcej o optymalizacji mapy witryny [w oficjalnej dokumentacji Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Dowiedz się więcej o optymalizacji pliku robots.txt [w oficjalnej dokumentacji Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Opcjonalny) Krok 10: Zmień język swojej zawartości

Aby zmienić język swojej zawartości w Next.js, zalecanym sposobem jest użycie komponentu `Link` do przekierowania użytkowników na odpowiednią zlokalizowaną stronę. Komponent `Link` umożliwia wstępne pobieranie strony, co pomaga uniknąć pełnego przeładowania strony.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Zapewni, że przycisk "wstecz" w przeglądarce przekieruje do poprzedniej strony
          >
            <span>
              {/* Lokalizacja - np. FR */}
              {localeItem}
            </span>
            <span>
              {/* Język w swojej własnej lokalizacji - np. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Język w bieżącej lokalizacji - np. Francés przy ustawionej lokalizacji Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Język po angielsku - np. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Zapewni, że przycisk "wstecz" w przeglądarce przekieruje do poprzedniej strony
          >
            <span>
              {/* Lokalizacja - np. FR */}
              {localeItem}
            </span>
            <span>
              {/* Język w swojej własnej lokalizacji - np. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Język w bieżącej lokalizacji - np. Francés przy ustawionej lokalizacji Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Język po angielsku - np. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");
const Link = require("next/link");

export const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // Zapewni, że przycisk "wstecz" w przeglądarce przekieruje do poprzedniej strony
          >
            <span>
              {/* Lokalizacja - np. FR */}
              {localeItem}
            </span>
            <span>
              {/* Język w swojej własnej lokalizacji - np. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Język w bieżącej lokalizacji - np. Francés przy ustawionej lokalizacji Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Język po angielsku - np. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Alternatywnym sposobem jest użycie funkcji `setLocale` dostarczonej przez hook `useLocale`. Ta funkcja nie pozwala na wstępne pobieranie strony. Zobacz [dokumentację hooka `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useLocale.md) po więcej szczegółów.

> Możesz również ustawić funkcję w opcji `onLocaleChange`, aby wywołać niestandardową funkcję, gdy zmieni się lokalizacja.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Reszta kodu

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>Zmień na francuski</button>
);
```

> Referencje dokumentacji:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getHTMLTextDir.md)
> - [atrybut `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [atrybut `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [atrybut `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [atrybut `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Opcjonalny) Krok 11: Tworzenie zlokalizowanego komponentu Link

Aby upewnić się, że nawigacja w Twojej aplikacji szanuje bieżącą lokalizację, możesz stworzyć niestandardowy komponent `Link`. Ten komponent automatycznie poprzedza wewnętrzne adresy URL bieżącym językiem. Na przykład, gdy użytkownik francuskojęzyczny kliknie w link do strony "O nas", zostanie przekierowany do `/fr/about` zamiast do `/about`.

To zachowanie jest przydatne z kilku powodów:

- **SEO i doświadczenie użytkownika**: Zlokalizowane adresy URL pomagają wyszukiwarkom poprawnie indeksować strony specyficzne dla danego języka i dostarczają użytkownikom treści w ich preferowanym języku.
- **Spójność**: Korzystając ze zlokalizowanego linku w całej aplikacji, gwarantujesz, że nawigacja pozostaje w obrębie bieżącej lokalizacji, zapobiegając nieoczekiwanym zmianom języka.
- **Utrzymywalność**: Centralizacja logiki lokalizacji w jednym komponencie upraszcza zarządzanie adresami URL, czyniąc Twoją bazę kodu łatwiejszą w utrzymaniu i rozbudowie w miarę rozwoju aplikacji.

Poniżej znajduje się implementacja zlokalizowanego komponentu `Link` w TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Funkcja pomocnicza sprawdzająca, czy dany adres URL jest zewnętrzny.
 * Jeśli adres URL zaczyna się od http:// lub https://, jest uważany za zewnętrzny.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Niestandardowy komponent Link, który dostosowuje atrybut href w oparciu o bieżącą lokalizację.
 * Dla linków wewnętrznych używa `getLocalizedUrl`, aby poprzedzić adres URL lokalizacją (np. /fr/about).
 * Zapewnia to, że nawigacja pozostaje w tym samym kontekście lokalizacji.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Jeśli link jest wewnętrzny i podano prawidłowy href, pobierz zlokalizowany adres URL.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink from "next/link";
import { useLocale } from "next-intlayer";

/**
 * Funkcja pomocnicza sprawdzająca, czy dany adres URL jest zewnętrzny.
 * Jeśli adres URL zaczyna się od http:// lub https://, jest uważany za zewnętrzny.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Niestandardowy komponent Link, który dostosowuje atrybut href w oparciu o bieżącą lokalizację.
 * Dla linków wewnętrznych używa `getLocalizedUrl`, aby poprzedzić adres URL lokalizacją (np. /fr/about).
 * Zapewnia to, że nawigacja pozostaje w tym samym kontekście lokalizacji.
 */
export const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Jeśli link jest wewnętrzny i podano prawidłowy href, pobierz zlokalizowany adres URL.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
"use client";

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");

/**
 * Funkcja pomocnicza sprawdzająca, czy dany adres URL jest zewnętrzny.
 * Jeśli adres URL zaczyna się od http:// lub https://, jest uważany za zewnętrzny.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Niestandardowy komponent Link, który dostosowuje atrybut href w oparciu o bieżącą lokalizację.
 * Dla linków wewnętrznych używa `getLocalizedUrl`, aby poprzedzić adres URL lokalizacją (np. /fr/about).
 * Zapewnia to, że nawigacja pozostaje w tym samym kontekście lokalizacji.
 */
const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Jeśli link jest wewnętrzny i podano prawidłowy href, pobierz zlokalizowany adres URL.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

#### Jak to działa

- **Wykrywanie linków zewnętrznych**:  
  Funkcja pomocnicza `checkIsExternalLink` określa, czy adres URL jest zewnętrzny. Linki zewnętrzne pozostają niezmienione, ponieważ nie wymagają lokalizacji.

- **Pobieranie bieżącej lokalizacji**:  
  Hook `useLocale` dostarcza bieżącą lokalizację (np. `fr` dla francuskiego).

- **Lokalizowanie adresu URL**:  
  Dla linków wewnętrznych (tj. niezewnętrznych), używa się `getLocalizedUrl`, aby automatycznie poprzedzić adres URL bieżącą lokalizacją. Oznacza to, że jeśli Twój użytkownik jest we francuskiej wersji językowej, przekazanie `/about` jako `href` zmieni je na `/fr/about`.

- **Zwracanie linku**:  
  Komponent zwraca element `<a>` ze zlokalizowanym adresem URL, zapewniając spójność nawigacji z lokalizacją.

Dzięki zintegrowaniu tego komponentu `Link` w całej aplikacji zachowujesz spójne i świadome językowo doświadczenie użytkownika, jednocześnie korzystając z lepszego SEO i użyteczności.

### (Opcjonalny) Krok 12: Pobierz bieżącą lokalizację w Server Actions

Jeśli potrzebujesz aktywnej lokalizacji wewnątrz Server Action (np. do lokalizacji e-maili lub uruchomienia logiki zależnej od języka), wywołaj `getLocale` z `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Zrób coś z lokalizacją
};
```

> Funkcja `getLocale` stosuje strategię kaskadową, aby określić lokalizację użytkownika:
>
> 1. Najpierw sprawdza nagłówki żądania pod kątem wartości lokalizacji, która mogła zostać ustawiona przez proxy.
> 2. Jeśli nie znaleziono lokalizacji w nagłówkach, szuka lokalizacji zapisanej w ciasteczkach.
> 3. Jeśli nie znaleziono ciasteczka, próbuje wykryć preferowany język użytkownika z ustawień przeglądarki.
> 4. W ostateczności powraca do skonfigurowanej domyślnej lokalizacji aplikacji.
>
> Zapewnia to wybranie najbardziej odpowiedniej lokalizacji na podstawie dostępnego kontekstu.

### (Opcjonalny) Krok 13: Zoptymalizuj rozmiar pakietu

Podczas korzystania z `next-intlayer`, słowniki są domyślnie dołączane do pakietu dla każdej strony. Aby zoptymalizować rozmiar pakietu, Intlayer dostarcza opcjonalną wtyczkę SWC, która inteligentnie zastępuje wywołania `useIntlayer` za pomocą makr. Gwarantuje to, że słowniki są dołączane tylko do pakietów stron, które faktycznie ich używają.

Aby włączyć tę optymalizację, zainstaluj pakiet `@intlayer/swc`. Po zainstalowaniu, `next-intlayer` automatycznie wykryje i użyje wtyczki:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
bunx intlayer init
```

> Uwaga: Ta optymalizacja jest dostępna tylko dla Next.js 13 i nowszych.

> Uwaga: Ten pakiet nie jest instalowany domyślnie, ponieważ wtyczki SWC są nadal eksperymentalne w Next.js. Może się to zmienić w przyszłości.

> Uwaga: Jeśli ustawisz opcję `importMode: 'dynamic'` lub `importMode: 'live'` (w konfiguracji `dictionary`), będzie ona polegać na Suspense, więc będziesz musiał opakować wywołania `useIntlayer` w granicę `Suspense`. Oznacza to, że nie będziesz mógł używać `useIntlayer` bezpośrednio na najwyższym poziomie komponentu Page / Layout.

### Obserwuj zmiany słowników w Turbopack

Podczas korzystania z Turbopack jako serwera deweloperskiego za pomocą polecenia `next dev`, zmiany w słownikach nie będą automatycznie wykrywane domyślnie.

To ograniczenie występuje, ponieważ Turbopack nie może uruchamiać wtyczek webpack równolegle, aby monitorować zmiany w plikach zawartości. Aby to obejść, będziesz musiał użyć polecenia `intlayer watch`, aby uruchomić jednocześnie serwer deweloperski i obserwatora budowania Intlayer.

```json5 fileName="package.json"
{
  // ... Twoje istniejące konfiguracje package.json
  "scripts": {
    // ... Twoje istniejące konfiguracje skryptów
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Jeśli używasz next-intlayer@<=6.x.x, musisz zachować flagę `--turbopack`, aby aplikacja Next.js 16 działała poprawnie z Turbopack. Zalecamy używanie next-intlayer@>=7.x.x, aby uniknąć tego ograniczenia.

### Skonfiguruj TypeScript

Intlayer wykorzystuje augmentację modułów, aby czerpać korzyści z TypeScript i wzmacniać Twoją bazę kodu.

![Autouzupełnianie](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Błąd tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Upewnij się, że Twoja konfiguracja TypeScript zawiera automatycznie generowane typy.

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Uwzględnij automatycznie generowane typy
  ],
}
```

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania w repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić wrażenia z programowania z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd wierszowy** przetłumaczonej zawartości.
- **Szybkie akcje** do łatwego tworzenia i aktualizowania tłumaczeń.

Aby uzyskać więcej informacji na temat korzystania z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Idź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyeksportować swoją zawartość za pomocą [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).
