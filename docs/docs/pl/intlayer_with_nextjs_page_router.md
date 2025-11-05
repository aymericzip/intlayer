---
createdAt: 2024-12-07
updatedAt: 2025-06-29
title: Jak przetłumaczyć swoją aplikację Next.js i Page Router – przewodnik i18n 2025
description: Dowiedz się, jak uczynić swoją stronę Next.js korzystającą z Page Router wielojęzyczną. Postępuj zgodnie z dokumentacją, aby zrealizować internacjonalizację (i18n) i tłumaczenie.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Page Router
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - next-with-page-router
history:
  - version: 5.6.0
    date: 2025-07-06
    changes: Przekształcenie funkcji `withIntlayer()` na funkcję opartą na promise
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Przetłumacz swoją stronę Next.js i Page Router za pomocą Intlayer | Internacjonalizacja (i18n)

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna, otwartoźródłowa biblioteka do internacjonalizacji (i18n), zaprojektowana, aby uprościć wsparcie wielojęzyczne w nowoczesnych aplikacjach webowych. Intlayer bezproblemowo integruje się z najnowszym frameworkiem **Next.js**, w tym z jego tradycyjnym **Page Router**.

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentów.
- **Dynamicznie lokalizować metadane**, trasy i zawartość.
- **Zapewnić wsparcie TypeScript** dzięki automatycznie generowanym typom, co poprawia autouzupełnianie i wykrywanie błędów.
- **Korzystać z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i przełączanie lokalizacji.

> Intlayer jest kompatybilny z Next.js 12, 13, 14 oraz 15. Jeśli używasz Next.js App Router, zapoznaj się z [przewodnikiem po App Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_14.md). Dla Next.js 15 postępuj zgodnie z tym [przewodnikiem](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md).

---

## Przewodnik krok po kroku: Konfiguracja Intlayer w aplikacji Next.js z użyciem Page Router

### Krok 1: Instalacja zależności

Zainstaluj niezbędne pakiety, używając preferowanego menedżera pakietów:

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

  Główny pakiet, który dostarcza narzędzia do internacjonalizacji dla zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilecji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md).

- **next-intlayer**

  Pakiet integrujący Intlayer z Next.js. Zapewnia dostawców kontekstu oraz hooki do internacjonalizacji w Next.js. Dodatkowo zawiera wtyczkę Next.js do integracji Intlayer z [Webpack](https://webpack.js.org/) lub [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami oraz obsługi przekierowań URL.

### Krok 2: Skonfiguruj swój projekt

Utwórz plik konfiguracyjny, aby zdefiniować języki obsługiwane przez Twoją aplikację:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Dodaj tutaj inne swoje lokalizacje
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
      // Dodaj tutaj inne swoje lokalizacje
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
      // Dodaj tutaj inne swoje lokalizacje
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Za pomocą tego pliku konfiguracyjnego możesz ustawić lokalizowane adresy URL, przekierowania w middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji zawartości, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracyjnej](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 3: Integracja Intlayer z konfiguracją Next.js

Zmodyfikuj konfigurację Next.js, aby włączyć Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Twoja istniejąca konfiguracja Next.js
};

export default withIntlayer(nextConfig);
```

> Wtyczka Next.js `withIntlayer()` służy do integracji Intlayer z Next.js. Zapewnia budowanie plików deklaracji zawartości oraz monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w środowiskach [Webpack](https://webpack.js.org/) lub [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Dodatkowo udostępnia aliasy optymalizujące wydajność oraz zapewnia kompatybilność z komponentami serwerowymi.

> Funkcja `withIntlayer()` jest funkcją zwracającą promise. Jeśli chcesz użyć jej z innymi wtyczkami, możesz ją awaitować. Przykład:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

### Krok 4: Skonfiguruj Middleware do wykrywania lokalizacji

Skonfiguruj middleware, aby automatycznie wykrywać i obsługiwać preferowaną lokalizację użytkownika:

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

> Dostosuj parametr `matcher`, aby odpowiadał trasom Twojej aplikacji. Więcej informacji znajdziesz w [dokumentacji Next.js dotyczącej konfigurowania matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

### Krok 5: Zdefiniuj dynamiczne trasy lokalizacji

Zaimplementuj dynamiczne routowanie, aby serwować zlokalizowane treści w zależności od lokalizacji użytkownika.

1.  **Utwórz strony specyficzne dla lokalizacji:**

    Zmień nazwę głównego pliku strony, aby zawierał dynamiczny segment `[locale]`.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **Zaktualizuj `_app.tsx`, aby obsługiwał lokalizację:**

    Zmodyfikuj swój plik `_app.tsx`, aby uwzględnić providery Intlayer.

    ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerClientProvider } from "next-intlayer";

    const App = FC<AppProps>({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerClientProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerClientProvider>
      );
    }

    export default MyApp;
    ```

    ```jsx fileName="src/pages/_app.mjx" codeFormat="esm"
    import { IntlayerClientProvider } from "next-intlayer";

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    export default App;
    ```

    ```jsx fileName="src/pages/_app.csx" codeFormat="commonjs"
    const { IntlayerClientProvider } = require("next-intlayer");

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    module.exports = App;
    ```

3.  **Skonfiguruj `getStaticPaths` i `getStaticProps`:**

    W pliku `[locale]/index.tsx` zdefiniuj ścieżki i propsy, aby obsłużyć różne lokalizacje.

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { type Locales, getConfiguration } from "intlayer";

const HomePage: FC = () => <div>{/* Twoja zawartość tutaj */}</div>;

export const getStaticPaths: GetStaticPaths = () => {
  const { internationalization } = getConfiguration();
  const { locales } = internationalization;

  const paths = locales.map((locale) => ({
    params: { locale },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const locale = params?.locale as string;

  return {
    props: {
      locale,
    },
  };
};

export default HomePage;
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { getConfiguration } from "intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage = () => <div>{/* Twoja zawartość tutaj */}</div>;

export const getStaticPaths = () => {
  const { internationalization } = getConfiguration();
  const { locales } = internationalization;

  const paths = locales.map((locale) => ({
    params: { locale },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = ({ params }) => {
  const locale = params?.locale;

  return {
    props: {
      locale,
    },
  };
};
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { getConfiguration } = require("intlayer");
const { ComponentExample } = require("@components/ComponentExample");

const HomePage = () => <div>{/* Twoja zawartość tutaj */}</div>;

const getStaticPaths = async () => {
  const { internationalization } = getConfiguration();
  const { locales } = internationalization;

  const paths = locales.map((locale) => ({
    params: { locale },
  }));

  return { paths, fallback: false };
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  return {
    props: {
      locale,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};
```

> `getStaticPaths` i `getStaticProps` zapewniają, że Twoja aplikacja w Next.js Page Router wstępnie buduje niezbędne strony dla wszystkich lokalizacji. Takie podejście zmniejsza obciążenie podczas działania aplikacji i prowadzi do lepszego doświadczenia użytkownika. Aby uzyskać więcej informacji, zapoznaj się z dokumentacją Next.js dotyczącą [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) oraz [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

### Krok 6: Zadeklaruj swoją zawartość

Utwórz i zarządzaj deklaracjami zawartości, aby przechowywać tłumaczenia.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Get started by editing this page.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// homeContent to deklaracja zawartości strony głównej
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// homeContent to deklaracja zawartości strony głównej
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing this page.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = homeContent;
```

```json fileName="src/pages/[locale]/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home",
  "content": {
      "nodeType": "translation",
      "translation": {
        "pl": "Zacznij od edycji tej strony.",
        "en": "Get started by editing this page.",
        "fr": "Commencez par éditer cette page.",
        "es": "Comience por editar esta página."
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "pl": "src/app/page.tsx",
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

Aby uzyskać więcej informacji na temat deklarowania zawartości, zapoznaj się z [przewodnikiem po deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Krok 7: Wykorzystaj zawartość w swoim kodzie

Uzyskaj dostęp do swoich słowników zawartości w całej aplikacji, aby wyświetlać przetłumaczoną zawartość.

```tsx {2,6} fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage: FC = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* Dodatkowe komponenty */}
    </div>
  );
};

// ... Reszta kodu, w tym getStaticPaths i getStaticProps

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* Dodatkowe komponenty */}
    </div>
  );
};

// ... Reszta kodu, w tym getStaticPaths i getStaticProps

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");
const { ComponentExample } = require("@components/ComponentExample");

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* Dodatkowe komponenty */}
    </div>
  );
};

// ... Reszta kodu, w tym getStaticPaths i getStaticProps
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // Upewnij się, że masz odpowiadającą deklarację zawartości

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // Upewnij się, że masz odpowiadającą deklarację zawartości

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // Upewnij się, że masz odpowiadającą deklarację zawartości

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Podczas używania tłumaczeń w atrybutach typu `string` (np. `alt`, `title`, `href`, `aria-label`), wywołuj

> wartość funkcji w następujący sposób:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Aby dowiedzieć się więcej o hooku `useIntlayer`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useIntlayer.md).

### (Opcjonalnie) Krok 8: Internacjonalizacja metadanych

Jeśli chcesz internacjonalizować swoje metadane, takie jak tytuł strony, możesz użyć funkcji `getStaticProps` dostarczonej przez Next.js Page Router. W jej wnętrzu możesz pobrać zawartość za pomocą funkcji `getIntlayer`, aby przetłumaczyć swoje metadane.

```typescript fileName="src/pages/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { type Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
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

```javascript fileName="src/pages/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Wygenerowano przez create next app", // opis przetłumaczony na polski
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

export default metadataContent;
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/pages/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
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

```json fileName="src/pages/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "pl": "Logo Preact",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "pl": "Wygenerowano przez create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app"
      }
    }
  }
}
```

````tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";
import type { FC } from "react";

interface HomePageProps {
  locale: string;
  metadata: {
    title: string;
    description: string;
  };
  multilingualUrls: Record<string, string>;
}

const HomePage: FC<HomePageProps> = ({
  metadata,
  multilingualUrls,
  locale,
}) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Generowanie tagów hreflang dla SEO */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Zawartość strony */}
      <main>{/* Twoja zawartość strony tutaj */}</main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  params,
}) => {
  const locale = params?.locale as string;

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
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... Reszta kodu, w tym getStaticPaths
````

````jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Generowanie tagów hreflang dla SEO */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Zawartość strony */}
      <main>{/* Twoja zawartość strony tutaj */}</main>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

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
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... Reszta kodu, w tym getStaticPaths
````

````jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");
const { useIntlayer } = require("next-intlayer");
const Head = require("next/head");

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Generowanie tagów hreflang dla SEO */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Zawartość strony */}
      <main>{/* Twoja zawartość strony tutaj */}</main>
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

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
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... Reszta kodu, w tym getStaticPaths
````

> Należy zauważyć, że funkcja `getIntlayer` importowana z `next-intlayer` zwraca Twoją zawartość opakowaną w `IntlayerNode`, co umożliwia integrację z edytorem wizualnym. Natomiast funkcja `getIntlayer` importowana z `intlayer` zwraca zawartość bezpośrednio, bez dodatkowych właściwości.

Alternatywnie możesz użyć funkcji `getTranslation` do deklaracji swoich metadanych. Jednak zaleca się korzystanie z plików deklaracji zawartości, aby zautomatyzować tłumaczenie metadanych i w pewnym momencie wyodrębnić zawartość.

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";
import type { FC } from "react";

interface HomePageProps {
  locale: string;
  metadata: {
    title: string;
    description: string;
  };
  multilingualUrls: Record<string, string>;
}

const HomePage: FC<HomePageProps> = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Generuj tagi hreflang dla SEO */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={url}
          />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Zawartość strony */}
      <main>
        {/* Tutaj umieść zawartość swojej strony */}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  params
}) => {
  const locale = params?.locale as string;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  const metadata = {
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

  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... Reszta kodu, w tym getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Generuj tagi hreflang dla SEO */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Zawartość strony */}
      <main>{/* Tutaj zawartość Twojej strony */}</main>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale;
  const t = (content) => getTranslation(content, locale);

  const metadata = {
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

  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... Reszta kodu, w tym getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");
const { useIntlayer } = require("next-intlayer");
const Head = require("next/head");

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Generuj tagi hreflang dla SEO */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Zawartość strony */}
      <main>{/* Tutaj zawartość Twojej strony */}</main>
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;
  const t = (content) => getTranslation(content, locale);

  const metadata = {
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

  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... Reszta kodu, w tym getStaticPaths
```

> Dowiedz się więcej o optymalizacji metadanych [w oficjalnej dokumentacji Next.js](https://nextjs.org/docs/pages/building-your-application/optimizing/metadata).

### (Opcjonalny) Krok 9: Zmień język swojej zawartości

Aby zmienić język swojej zawartości w Next.js, zalecanym sposobem jest użycie komponentu `Link`, aby przekierować użytkowników na odpowiednią zlokalizowaną stronę. Komponent `Link` umożliwia prefetching strony, co pomaga uniknąć pełnego przeładowania strony.

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat="typescript"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();
  const { setLocaleCookie } = useLocaleCookie();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
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

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="esm"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import Link from "next/link";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();
  const { setLocaleCookie } = useLocaleCookie();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* Lokalizacja - np. FR */}
              {localeItem}
            </span>
            <span>
              {/* Język w jego własnym lokalnym ustawieniu - np. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Język w bieżącym lokalnym ustawieniu - np. Francés przy ustawionym Locales.SPANISH */}
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

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="commonjs"
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocalePageRouter } = require("next-intlayer");
const Link = require("next/link");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();
  const { setLocaleCookie } = useLocaleCookie();

  return (
    <select>
      {availableLocales.map((localeItem) => (
        <option value={localeItem} key={localeItem}>
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocaleCookie(localeItem)}
          >
            <span>
              {/* Lokalizacja - np. FR */}
              {localeItem}
            </span>
            <span>
              {/* Język w jego własnej lokalizacji - np. Français */}
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
        </option>
      ))}
    </select>
  );
};
```

> Alternatywnym sposobem jest użycie funkcji `setLocale` dostarczonej przez hook `useLocale`. Ta funkcja nie pozwoli na prefetching strony i spowoduje przeładowanie strony.

> W tym przypadku, bez przekierowania za pomocą `router.push`, tylko Twój kod po stronie serwera zmieni lokalizację zawartości.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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

> API `useLocalePageRouter` jest takie samo jak `useLocale`. Aby dowiedzieć się więcej o hooku `useLocale`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useLocale.md).

> Odnośniki do dokumentacji:
>
> - [hook `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocaleName.md)
> - [hook `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedUrl.md)
> - [hook `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getHTMLTextDir.md)
> - atrybut [`hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`atrybut lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`atrybut dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`atrybut aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Opcjonalny) Krok 10: Tworzenie lokalizowanego komponentu Link

Aby zapewnić, że nawigacja w Twojej aplikacji respektuje aktualną lokalizację, możesz stworzyć niestandardowy komponent `Link`. Ten komponent automatycznie dodaje prefiks z aktualnym językiem do wewnętrznych adresów URL. Na przykład, gdy użytkownik mówiący po francusku kliknie link do strony "About", zostanie przekierowany na `/fr/about` zamiast na `/about`.

To zachowanie jest przydatne z kilku powodów:

- **SEO i doświadczenie użytkownika**: Lokalizowane adresy URL pomagają wyszukiwarkom poprawnie indeksować strony specyficzne dla języka oraz dostarczają użytkownikom treści w ich preferowanym języku.
- **Spójność**: Korzystając z lokalizowanego linku w całej aplikacji, zapewniasz, że nawigacja pozostaje w obrębie bieżącej lokalizacji, zapobiegając nieoczekiwanym zmianom języka.
- **Łatwość utrzymania**: Centralizacja logiki lokalizacji w jednym komponencie upraszcza zarządzanie adresami URL, co sprawia, że baza kodu jest łatwiejsza do utrzymania i rozbudowy wraz z rozwojem aplikacji.

Poniżej znajduje się implementacja lokalizowanego komponentu `Link` w TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * Funkcja pomocnicza do sprawdzania, czy podany URL jest zewnętrzny.
 * Jeśli URL zaczyna się od http:// lub https://, jest uznawany za zewnętrzny.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Niestandardowy komponent Link, który dostosowuje atrybut href na podstawie aktualnej lokalizacji.
 * Dla linków wewnętrznych używa `getLocalizedUrl`, aby dodać prefiks z lokalizacją (np. /fr/about).
 * Zapewnia to, że nawigacja pozostaje w kontekście tej samej lokalizacji.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Jeśli link jest wewnętrzny i podano prawidłowy href, pobierz lokalizowany URL.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
'use client';

import { getLocalizedUrl } from 'intlayer';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { useLocale } from 'next-intlayer';
import { forwardRef, PropsWithChildren, type ForwardedRef } from 'react';

/**
 * Funkcja pomocnicza do sprawdzania, czy podany URL jest zewnętrzny.
 * Jeśli URL zaczyna się od http:// lub https://, jest uznawany za zewnętrzny.
 */
export const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');

/**
 * Niestandardowy komponent Link, który dostosowuje atrybut href na podstawie aktualnej lokalizacji.
 * Dla linków wewnętrznych używa `getLocalizedUrl`, aby dodać prefiks z lokalizacją (np. /fr/about).
 * Zapewnia to, że nawigacja pozostaje w kontekście tej samej lokalizacji.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Jeśli link jest wewnętrzny i podano poprawny href, pobierz zlokalizowany URL.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
'use client';

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");
const { forwardRef } = require("react");

/**
 * Funkcja pomocnicza do sprawdzania, czy podany URL jest zewnętrzny.
 * Jeśli URL zaczyna się od http:// lub https://, jest uznawany za zewnętrzny.
 */
const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');


const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Jeśli link jest wewnętrzny i podano prawidłowy href, pobierz zlokalizowany URL.
  const hrefI18n: NextLinkProps['href'] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

#### Jak to działa

- **Wykrywanie linków zewnętrznych**:  
  Funkcja pomocnicza `checkIsExternalLink` określa, czy URL jest zewnętrzny. Linki zewnętrzne pozostają niezmienione, ponieważ nie wymagają lokalizacji.

- **Pobieranie aktualnej lokalizacji**:
- **Lokalizacja URL**:  
  Dla linków wewnętrznych (czyli niezewnętrznych) używana jest funkcja `getLocalizedUrl`, która automatycznie dodaje prefiks z aktualnym locale do URL. Oznacza to, że jeśli użytkownik korzysta z wersji francuskiej, przekazanie `/about` jako `href` zostanie przekształcone na `/fr/about`.

- **Zwracanie linku**:  
  Komponent zwraca element `<a>` z zlokalizowanym URL, zapewniając spójność nawigacji zgodnie z ustawionym locale.

Integrując ten komponent `Link` w całej aplikacji, utrzymujesz spójne i świadome językowo doświadczenie użytkownika, jednocześnie korzystając z lepszego SEO i użyteczności.

### (Opcjonalny) Krok 11: Optymalizacja rozmiaru paczki

Podczas korzystania z `next-intlayer`, słowniki są domyślnie dołączane do bundla na każdej stronie. Aby zoptymalizować rozmiar bundla, Intlayer udostępnia opcjonalny plugin SWC, który inteligentnie zastępuje wywołania `useIntlayer` za pomocą makr. Zapewnia to, że słowniki są dołączane tylko do bundli stron, które faktycznie ich używają.

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

> Uwaga: Ta optymalizacja jest dostępna tylko dla Next.js 13 i nowszych wersji.

> Uwaga: Ten pakiet nie jest instalowany domyślnie, ponieważ wtyczki SWC są nadal eksperymentalne w Next.js. Może się to zmienić w przyszłości.

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
    ".intlayer/**/*.ts", // Dołącz automatycznie generowane typy
  ],
}
```

### Konfiguracja Git

Aby utrzymać porządek w repozytorium i uniknąć zatwierdzania generowanych plików, zaleca się ignorowanie plików tworzonych przez Intlayer.

Dodaj następujące linie do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić doświadczenie programistyczne z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy w linii** przetłumaczonej zawartości.
- **Szybkie akcje** umożliwiające łatwe tworzenie i aktualizowanie tłumaczeń.

Aby uzyskać więcej informacji na temat korzystania z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

## Dodatkowe zasoby

- **Dokumentacja Intlayer:** [Repozytorium GitHub](https://github.com/aymericzip/intlayer)
- **Przewodnik po słowniku:** [Słownik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md)
- **Dokumentacja konfiguracji:** [Przewodnik konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)

Postępując zgodnie z tym przewodnikiem, możesz skutecznie zintegrować Intlayer z aplikacją Next.js korzystającą z Page Router, co umożliwi solidne i skalowalne wsparcie internacjonalizacji dla Twoich projektów internetowych.

### Idź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub zewnętrznie zarządzać swoją zawartością, korzystając z [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).
