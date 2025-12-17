---
createdAt: 2025-10-25
updatedAt: 2025-11-01
title: Jak przetłumaczyć swoją aplikację Next.js 15 – przewodnik i18n 2025
description: Dowiedz się, jak uczynić swoją stronę Next.js 15 wielojęzyczną. Postępuj zgodnie z dokumentacją, aby zinternacjonalizować (i18n) i przetłumaczyć ją.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Next.js 15
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - 15
applicationTemplate: https://github.com/aymericzip/intlayer-next-15-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Dodano wzmiankę o `x-default` w obiekcie `alternates`
  - version: 7.0.0
    date: 2025-10-25
    changes: Dodano wzmiankę o funkcji `withIntlayerSync()`
  - version: 6.2.0
    date: 2025-10-09
    changes: Dodano dokumentację dla hooka `useLocale` z opcją `onLocaleChange`
  - version: 5.6.6
    date: 2025-10-02
    changes: Dodano dokumentację dla funkcji `getLocale` w akcjach serwerowych
  - version: 5.6.2
    date: 2025-09-23
    changes: Dodano dokumentację dla obserwacji zmian słowników w Turbopack
  - version: 5.6.2
    date: 2025-09-22
    changes: Dodano dokumentację dla helpera `multipleMiddlewares`
  - version: 5.6.0
    date: 2025-07-06
    changes: Przekształcono funkcję `withIntlayer()` na funkcję opartą na promise
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Tłumaczenie Twojej strony Next.js 15 za pomocą Intlayer | Internacjonalizacja (i18n)

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna, open-source'owa biblioteka do internacjonalizacji (i18n), zaprojektowana, aby uprościć wsparcie wielojęzyczne w nowoczesnych aplikacjach webowych. Intlayer bezproblemowo integruje się z najnowszym frameworkiem **Next.js 15**, w tym z jego potężnym **App Routerem**. Jest zoptymalizowany do pracy z **Server Components** dla efektywnego renderowania i jest w pełni kompatybilny z [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentów.
- **Dynamicznie lokalizować metadane**, trasy i treści.
- **Uzyskać dostęp do tłumaczeń zarówno w komponentach po stronie klienta, jak i serwera**.
- **Zapewnić wsparcie TypeScript** dzięki automatycznie generowanym typom, co poprawia autouzupełnianie i wykrywanie błędów.
- **Korzystaj z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i przełączanie lokalizacji.

> Intlayer jest kompatybilny z Next.js 12, 13, 14 i 15. Jeśli używasz Next.js Page Router, możesz odnieść się do tego [przewodnika](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_page_router.md). Dla Next.js 12, 13, 14 z App Routerem, odnieś się do tego [przewodnika](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_14.md).

---

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji Next.js

<Tab defaultTab="video">
  <TabItem label="Wideo" value="video">

<iframe title="Najlepsze rozwiązanie i18n dla Next.js? Odkryj Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Kod" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-15-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Zobacz [Application Template](https://github.com/aymericzip/intlayer-next-15-template) na GitHub.

### Krok 1: Instalacja zależności

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

- **intlayer**

  Podstawowy pakiet, który dostarcza narzędzia do internacjonalizacji dla zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilecji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md).

- **next-intlayer**

  Pakiet integrujący Intlayer z Next.js. Zapewnia dostawców kontekstu oraz hooki do internacjonalizacji w Next.js. Dodatkowo zawiera wtyczkę Next.js do integracji Intlayer z [Webpack](https://webpack.js.org/) lub [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami oraz obsługi przekierowań URL.

### Krok 2: Skonfiguruj swój projekt

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
// Konfiguracja międzynarodowa
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

> Poprzez ten plik konfiguracyjny możesz ustawić lokalizowane adresy URL, przekierowania w middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji treści, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

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
// Konfiguracja Next.js
const nextConfig = {
  /* opcje konfiguracji tutaj */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
// Konfiguracja Next.js
const nextConfig = {
  /* opcje konfiguracji tutaj */
};

module.exports = withIntlayer(nextConfig);
```

> Wtyczka Next.js `withIntlayer()` służy do integracji Intlayer z Next.js. Zapewnia budowanie plików deklaracji treści oraz monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w środowiskach [Webpack](https://webpack.js.org/) lub [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Dodatkowo dostarcza aliasy optymalizujące wydajność oraz zapewnia kompatybilność z komponentami serwerowymi.

> Funkcja `withIntlayer()` jest funkcją zwracającą promise. Pozwala przygotować słowniki intlayer przed rozpoczęciem budowania. Jeśli chcesz użyć jej z innymi wtyczkami, możesz na nią poczekać (await). Przykład:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Jeśli chcesz używać tego synchronicznie, możesz użyć funkcji `withIntlayerSync()`. Przykład:
>
> ```tsx
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

### Krok 4: Zdefiniuj dynamiczne trasy lokalizacji

Usuń wszystko z `RootLayout` i zastąp to następującym kodem:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Nadal możesz opakować children innymi providerami, takimi jak `next-themes`, `react-query`, `framer-motion` itd.
  <>{children}</>
);

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => (
  // Nadal możesz opakować children innymi providerami, takimi jak `next-themes`, `react-query`, `framer-motion` itd.
  <>{children}</>
);

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => (
  // Nadal możesz opakować children innymi providerami, takimi jak `next-themes`, `react-query`, `framer-motion` itd.
  <>{children}</>
);

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> Pozostawienie komponentu `RootLayout` pustym pozwala na ustawienie atrybutów [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) oraz [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) w tagu `<html>`.

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

> Na tym etapie napotkasz błąd: `Error: Missing <html> and <body> tags in the root layout.`. Jest to oczekiwane, ponieważ plik `/app/page.tsx` nie jest już używany i można go usunąć. Zamiast tego segment ścieżki `[locale]` aktywuje stronę `/app/[locale]/page.tsx`. W konsekwencji strony będą dostępne pod ścieżkami takimi jak `/en`, `/fr`, `/es` w Twojej przeglądarce. Aby ustawić domyślny język jako stronę główną, odnieś się do konfiguracji `middleware` w kroku 7.

Następnie zaimplementuj funkcję `generateStaticParams` w układzie aplikacji.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Linia do wstawienia

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Reszta kodu*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Linia do wstawienia

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Reszta kodu */
};

// ... Reszta kodu
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Linia do wstawienia

const LocaleLayout = async ({ children, params: { locale } }) => {
  /*... Reszta kodu */
};

module.exports = { default: LocaleLayout, generateStaticParams };
```

> `generateStaticParams` zapewnia, że Twoja aplikacja wstępnie buduje niezbędne strony dla wszystkich lokalizacji, zmniejszając obciążenie podczas działania i poprawiając doświadczenie użytkownika. Aby uzyskać więcej informacji, zapoznaj się z [dokumentacją Next.js dotyczącą generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

> Intlayer działa z `export const dynamic = 'force-static';`, aby zapewnić, że strony są wstępnie zbudowane dla wszystkich lokalizacji.

### Krok 5: Zadeklaruj swoją zawartość

Twórz i zarządzaj deklaracjami zawartości, aby przechowywać tłumaczenia:

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
// Zawartość strony z tłumaczeniami
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
        pl: "Zacznij od edycji",
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
        "es": "Comience por editar",
        "pl": "Zacznij od edycji"
      }
    },
    "pageLink": "src/app/page.tsx"
  }
}
```

> Twoje deklaracje zawartości mogą być zdefiniowane w dowolnym miejscu w Twojej aplikacji, pod warunkiem, że zostaną umieszczone w katalogu `contentDir` (domyślnie `./src`). I będą miały rozszerzenie pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Po więcej szczegółów odsyłamy do [dokumentacji deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

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

- **`IntlayerClientProvider`** służy do dostarczania lokalizacji komponentom po stronie klienta. Może być umieszczony w dowolnym komponencie nadrzędnym, w tym w layoucie. Jednak zaleca się umieszczenie go w layoucie, ponieważ Next.js współdzieli kod layoutu pomiędzy stronami, co jest bardziej efektywne. Używając `IntlayerClientProvider` w layoucie, unikasz ponownej inicjalizacji dla każdej strony, poprawiając wydajność i utrzymując spójny kontekst lokalizacji w całej aplikacji.
- **`IntlayerServerProvider`** służy do dostarczania lokalizacji komponentom po stronie serwera. Nie można go ustawić w layoucie.

  > Layout i strona nie mogą współdzielić wspólnego kontekstu serwera, ponieważ system kontekstu serwera opiera się na magazynie danych na żądanie (za pomocą mechanizmu [React's cache](https://react.dev/reference/react/cache)), co powoduje, że każdy "kontekst" jest tworzony na nowo dla różnych segmentów aplikacji. Umieszczenie providera w wspólnym layoucie złamałoby tę izolację, uniemożliwiając prawidłowe propagowanie wartości kontekstu serwera do komponentów serwerowych.

> Layout i strona nie mogą współdzielić wspólnego kontekstu serwera, ponieważ system kontekstu serwera opiera się na magazynie danych na żądanie (za pomocą mechanizmu [React's cache](https://react.dev/reference/react/cache)), co powoduje, że każdy "kontekst" jest tworzony na nowo dla różnych segmentów aplikacji. Umieszczenie providera w współdzielonym layoucie złamałoby tę izolację, uniemożliwiając prawidłowe propagowanie wartości kontekstu serwera do komponentów serwerowych.

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

> Jeśli chcesz użyć swojej zawartości w atrybucie typu `string`, takim jak `alt`, `title`, `href`, `aria-label` itp., musisz wywołać wartość funkcji, na przykład:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Aby dowiedzieć się więcej o hooku `useIntlayer`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useIntlayer.md).

### (Opcjonalny) Krok 7: Konfiguracja Middleware do wykrywania lokalizacji

Skonfiguruj middleware do wykrywania preferowanej lokalizacji użytkownika:

```typescript fileName="src/middleware.ts" codeFormat="typescript"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const { intlayerMiddleware } = require("next-intlayer/middleware");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerMiddleware, config };
```

> `intlayerMiddleware` służy do wykrywania preferowanego języka użytkownika i przekierowywania go na odpowiedni adres URL, zgodnie z [konfiguracją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md). Dodatkowo umożliwia zapisanie preferowanego języka użytkownika w ciasteczku.

> Jeśli potrzebujesz połączyć kilka middleware'ów razem (na przykład `intlayerMiddleware` z uwierzytelnianiem lub niestandardowymi middleware'ami), Intlayer udostępnia teraz pomocnika o nazwie `multipleMiddlewares`.

```ts
import {
  multipleMiddlewares,
  intlayerMiddleware,
} from "next-intlayer/middleware";
import { customMiddleware } from "@utils/customMiddleware";

export const middleware = multipleMiddlewares([
  intlayerMiddleware,
  customMiddleware,
]);
```

### (Opcjonalny) Krok 8: Internacjonalizacja twoich metadanych

W przypadku, gdy chcesz internacjonalizować swoje metadane, takie jak tytuł strony, możesz użyć funkcji `generateMetadata` dostarczonej przez Next.js. W jej wnętrzu możesz pobrać zawartość z funkcji `getIntlayer`, aby przetłumaczyć swoje metadane.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      pl: "Utwórz aplikację Next",
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      pl: "Wygenerowano za pomocą create next app",
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
      es: "Crear una aplicación Next.js",
      pl: "Utwórz aplikację Next",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
      pl: "Wygenerowano przez create next app",
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
      es: "Crear una aplicación Next.js",
      pl: "Utwórz aplikację Next",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
      pl: "Wygenerowano przez create next app",
    }),
  },
};

module.exports = metadataContent;
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
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
          "es": "Logo Preact",
          "pl": "Logo Preact"
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
        "pl": "Wygenerowano przez create next app"
      },
    },
  },
};
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
   * Generuje obiekt zawierający wszystkie adresy URL dla każdego języka.
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
   * Generuje obiekt zawierający wszystkie adresy URL dla każdej lokalizacji.
   *
   * Przykład:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Zwraca
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  *   es: '/es/about'
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
   * Generuje obiekt zawierający wszystkie adresy URL dla każdej lokalizacji.
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

> Zauważ, że funkcja `getIntlayer` importowana z `next-intlayer` zwraca Twoją zawartość opakowaną w `IntlayerNode`, co umożliwia integrację z edytorem wizualnym. Natomiast funkcja `getIntlayer` importowana z `intlayer` zwraca Twoją zawartość bezpośrednio, bez dodatkowych właściwości.

Alternatywnie możesz użyć funkcji `getTranslation` do deklarowania swoich metadanych. Jednak zaleca się używanie plików deklaracji zawartości, aby zautomatyzować tłumaczenie metadanych i w pewnym momencie wyodrębnić zawartość.

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

### (Opcjonalny) Krok 9: Internacjonalizacja plików sitemap.xml i robots.txt

Aby zinternacjonalizować swoje pliki `sitemap.xml` i `robots.txt`, możesz użyć funkcji `getMultilingualUrls` dostarczonej przez Intlayer. Funkcja ta pozwala na generowanie wielojęzycznych URL-i dla Twojej mapy witryny.

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

Aby zmienić język swojej zawartości w Next.js, zalecanym sposobem jest użycie komponentu `Link`, aby przekierować użytkowników do odpowiedniej, zlokalizowanej strony. Komponent `Link` umożliwia prefetching strony, co pomaga uniknąć pełnego przeładowania strony.

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
              {/* Locale - np. FR */}
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
              {/* Locale - np. FR */}
              {localeItem}
            </span>
            <span>
              {/* Język w jego własnym Locale - np. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Język w bieżącym Locale - np. Francés przy ustawionym Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Język w języku angielskim - np. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Alternatywnym sposobem jest użycie funkcji `setLocale` dostarczonej przez hook `useLocale`. Ta funkcja nie pozwala na prefetching strony. Zobacz dokumentację [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useLocale.md) po więcej szczegółów.

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

> Odnośniki do dokumentacji:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/pl/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute`](https://developer.mozilla.org/pl/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute`](https://developer.mozilla.org/pl/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Opcjonalny) Krok 11: Tworzenie komponentu Link z lokalizacją

Aby zapewnić, że nawigacja w Twojej aplikacji respektuje bieżącą lokalizację, możesz stworzyć niestandardowy komponent `Link`. Ten komponent automatycznie dodaje prefiks z aktualnym językiem do wewnętrznych adresów URL. Na przykład, gdy użytkownik mówiący po francusku kliknie na link do strony "About", zostanie przekierowany na `/fr/about` zamiast na `/about`.

To zachowanie jest przydatne z kilku powodów:

- **SEO i doświadczenie użytkownika**: Lokalizowane adresy URL pomagają wyszukiwarkom poprawnie indeksować strony specyficzne dla języka oraz dostarczają użytkownikom treści w ich preferowanym języku.
- **Spójność**: Korzystając z lokalizowanego linku w całej aplikacji, gwarantujesz, że nawigacja pozostaje w obrębie bieżącej lokalizacji, zapobiegając niespodziewanym zmianom języka.
- **Utrzymanie**: Centralizacja logiki lokalizacji w jednym komponencie upraszcza zarządzanie adresami URL, co sprawia, że baza kodu jest łatwiejsza do utrzymania i rozbudowy wraz z rozwojem aplikacji.

Poniżej znajduje się implementacja lokalizowanego komponentu `Link` w TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Funkcja pomocnicza do sprawdzania, czy dany URL jest zewnętrzny.
 * Jeśli URL zaczyna się od http:// lub https://, jest uznawany za zewnętrzny.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Niestandardowy komponent Link, który dostosowuje atrybut href w zależności od bieżącej lokalizacji.
 * Dla linków wewnętrznych używa `getLocalizedUrl`, aby poprzedzić URL lokalizacją (np. /fr/about).
 * Zapewnia to, że nawigacja pozostaje w tym samym kontekście lokalizacji.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Jeśli link jest wewnętrzny i podano prawidłowy href, pobierz zlokalizowany URL.
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
 * Funkcja pomocnicza do sprawdzania, czy podany URL jest zewnętrzny.
 * Jeśli URL zaczyna się od http:// lub https://, jest uznawany za zewnętrzny.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Niestandardowy komponent Link, który dostosowuje atrybut href w zależności od bieżącej lokalizacji.
 * Dla linków wewnętrznych używa `getLocalizedUrl`, aby dodać prefiks z lokalizacją (np. /fr/about).
 * Zapewnia to, że nawigacja pozostaje w kontekście tej samej lokalizacji.
 */
export const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Jeśli link jest wewnętrzny i podano prawidłowy href, pobierz zlokalizowany URL.
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
 * Funkcja pomocnicza do sprawdzania, czy dany URL jest zewnętrzny.
 * Jeśli URL zaczyna się od http:// lub https://, jest uznawany za zewnętrzny.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Niestandardowy komponent Link, który dostosowuje atrybut href w oparciu o bieżący język.
 * Dla linków wewnętrznych używa `getLocalizedUrl`, aby poprzedzić URL prefiksem języka (np. /fr/about).
 * Zapewnia to, że nawigacja pozostaje w tym samym kontekście językowym.
 */
const Link = ({ href, children, ...props }) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Jeśli link jest wewnętrzny i podano prawidłowy href, pobierz zlokalizowany URL.
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
  Funkcja pomocnicza `checkIsExternalLink` określa, czy URL jest zewnętrzny. Linki zewnętrzne pozostają niezmienione, ponieważ nie wymagają lokalizacji.

- **Pobieranie bieżącej lokalizacji**:
  Hook `useLocale` dostarcza aktualną lokalizację (np. `fr` dla języka francuskiego).

- **Lokalizacja URL**:
  Dla linków wewnętrznych (czyli nie zewnętrznych) używana jest funkcja `getLocalizedUrl`, która automatycznie dodaje przedrostek z bieżącą lokalizacją do URL. Oznacza to, że jeśli użytkownik korzysta z wersji francuskiej, podanie `/about` jako `href` zostanie przekształcone na `/fr/about`.

- **Zwracanie linku**:
  Komponent zwraca element `<a>` z zlokalizowanym URL, zapewniając spójność nawigacji z lokalizacją.

Integrując ten komponent `Link` w całej aplikacji, utrzymujesz spójne i świadome językowo doświadczenie użytkownika, jednocześnie korzystając z poprawy SEO i użyteczności.

### (Opcjonalnie) Krok 12: Pobierz aktualny locale w Server Actions

Jeśli potrzebujesz aktywnego locale wewnątrz Server Action (np. do lokalizacji e-maili lub uruchamiania logiki zależnej od locale), wywołaj `getLocale` z `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Wykonaj coś z locale
};
```

> Funkcja `getLocale` stosuje kaskadową strategię, aby określić locale użytkownika:
>
> 1. Najpierw sprawdza nagłówki żądania pod kątem wartości lokalizacji, która mogła zostać ustawiona przez middleware
> 2. Jeśli w nagłówkach nie zostanie znaleziona lokalizacja, szuka jej w ciasteczkach
> 3. Jeśli nie zostaną znalezione ciasteczka, próbuje wykryć preferowany język użytkownika na podstawie ustawień przeglądarki
> 4. W ostateczności używa domyślnej lokalizacji skonfigurowanej w aplikacji
>
> Zapewnia to wybór najbardziej odpowiedniej lokalizacji na podstawie dostępnego kontekstu.

### (Opcjonalny) Krok 13: Optymalizacja rozmiaru pakietu

Podczas korzystania z `next-intlayer`, słowniki są domyślnie dołączane do bundla dla każdej strony. Aby zoptymalizować rozmiar bundla, Intlayer udostępnia opcjonalny plugin SWC, który inteligentnie zastępuje wywołania `useIntlayer` za pomocą makr. Zapewnia to, że słowniki są dołączane tylko do bundli stron, które faktycznie ich używają.

Aby włączyć tę optymalizację, zainstaluj pakiet `@intlayer/swc`. Po instalacji `next-intlayer` automatycznie wykryje i użyje tego pluginu:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

> Uwaga: Ta optymalizacja jest dostępna tylko dla Next.js w wersji 13 i wyższych.

> Uwaga: Ten pakiet nie jest instalowany domyślnie, ponieważ wtyczki SWC są nadal eksperymentalne w Next.js. Może się to zmienić w przyszłości.

> Uwaga: Jeśli ustawisz opcję jako `importMode: 'dynamic'` lub `importMode: 'live'`, będzie to polegać na Suspense, więc będziesz musiał owinąć wywołania `useIntlayer` w granicę `Suspense`. Oznacza to, że nie będziesz mógł używać `useIntlayer` bezpośrednio na najwyższym poziomie komponentu Strony / Układu.

### Monitorowanie zmian słowników w Turbopack

Podczas korzystania z Turbopack jako serwera deweloperskiego za pomocą polecenia `next dev --turbopack`, zmiany w słownikach nie będą domyślnie automatycznie wykrywane.

To ograniczenie występuje, ponieważ Turbopack nie może uruchamiać wtyczek webpack równolegle, aby monitorować zmiany w Twoich plikach z zawartością. Aby to obejść, musisz użyć polecenia `intlayer watch`, aby jednocześnie uruchomić serwer deweloperski oraz obserwatora budowy Intlayer.

```json5 fileName="package.json"
{
  // ... Twoje istniejące konfiguracje package.json
  "scripts": {
    // ... Twoje istniejące konfiguracje skryptów
    "dev": "intlayer watch --with 'next dev --turbopack'",
  },
}
```

### Konfiguracja TypeScript

Intlayer używa rozszerzenia modułów (module augmentation), aby wykorzystać zalety TypeScript i wzmocnić Twoją bazę kodu.

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

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić swoje doświadczenie w pracy z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd w linii** przetłumaczonej zawartości.
- **Szybkie akcje** umożliwiające łatwe tworzenie i aktualizowanie tłumaczeń.

Aby uzyskać więcej informacji na temat korzystania z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer dla VS Code](https://intlayer.org/doc/vs-code-extension).

### Idź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyodrębnić swoją zawartość, korzystając z [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

```

```
