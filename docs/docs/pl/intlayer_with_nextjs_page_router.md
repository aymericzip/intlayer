---
createdAt: 2024-12-07
updatedAt: 2026-08-30
title: "Next.js Page Router i18n - Kompletny przewodnik po tłumaczeniu swojej aplikacji"
description: "Koniec z i18next. Przewodnik 2026 do budowania wielojęzycznej (i18n) aplikacji Next.js Page Router. Tłumacz z agentami AI i optymalizuj rozmiar bundle, SEO i wydajność."
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
applicationTemplate: https://github.com/aymericzip/intlayer-next-14-template
applicationShowcase: https://intlayer-next-14-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizacja użycia API useIntlayer w Solid do bezpośredniego dostępu do właściwości"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Dodaj polecenie init"
  - version: 5.6.0
    date: 2025-07-06
    changes: "Przekształcenie funkcji `withIntlayer()` na funkcję opartą na promise"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Przetłumacz swoją stronę Next.js i Page Router za pomocą Intlayer | Internacjonalizacja (i18n)

<Tabs defaultTab="code">
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-14-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-next-14-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-next-14-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Spis treści

<TOC/>

## Dlaczego Interlayer zamiast alternatyw?

W porównaniu do głównych rozwiązań, takich jak `next-intl` czy `i18next`, Intlayer jest rozwiązaniem wyposażonym w zintegrowane optymalizacje, takie jak:

<AccordionGroup>

<Accordion header="Pełne pokrycie Next.js">

Intlayer jest zoptymalizowany do współpracy z **Server Components** w celu wydajnego renderowania i jest w pełni kompatybilny z [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). Nie blokuje renderowania statycznego i oferuje oprogramowanie pośredniczące oraz wszystkie funkcje potrzebne do skalowania internacjonalizacji (i18n).

> Intlayer jest kompatybilny z Next.js 12, 13, 14, 15 i 16. Jeśli używasz routera Next.js Pages Router, możesz zapoznać się z tym [przewodnikiem] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md).
> Routing lokalny jest przydatny ze względu na SEO, rozmiar bundle'a i wydajność. Jeśli go nie potrzebujesz, możesz zapoznać się z tym [przewodnikiem](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md).
> W przypadku Next.js 12, 13, 14 i 15 z App Router zapoznaj się z tym [przewodnikiem] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md).

</Accordion>

<Accordion header="Rozmiar bundle'a">

Zamiast ładować ogromne pliki JSON na swoje strony, ładuj tylko niezbędną treść. Intlayer pomaga **zmniejszyć rozmiary bundle'a i stron nawet o 50%**.

</Accordion>

<Accordion header="Łatwość konserwacji">

Określanie zakresu zawartości aplikacji **ułatwia konserwację** aplikacji na dużą skalę. Możesz powielić lub usunąć pojedynczy folder funkcji bez obciążania psychicznego koniecznością przeglądania całej bazy kodu zawartości. Dodatkowo Inlayer jest **w pełni napisany**, aby zapewnić dokładność treści.

</Accordion>

<Accordion header="Agent AI">

Wspólna lokalizacja treści **zmniejsza potrzebny kontekst** dzięki modelom dużego języka (LLM). Intlayer zawiera także zestaw narzędzi, taki jak **CLI** do sprawdzania brakujących tłumaczeń**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** i **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**, aby praca programisty (DX) była jeszcze płynniejsza dla agentów AI.

</Accordion>

<Accordion header="Automatyzacja">

Korzystaj z automatyzacji, aby tłumaczyć w swoim potoku CI/CD przy użyciu wybranego LLM na koszt dostawcy sztucznej inteligencji. Intlayer oferuje także **kompilator** do automatyzacji ekstrakcji treści, a także [platformę internetową] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), która pomaga **tłumaczyć w tle**.

</Accordion>

<Accordion header="Wydajność">

Łączenie ogromnych plików JSON z komponentami może prowadzić do problemów z wydajnością i reaktywnością. Inlayer optymalizuje ładowanie treści w czasie kompilacji.

</Accordion>

<Accordion header="Skalowanie bez użycia dewelopera">

Więcej niż tylko rozwiązanie i18n, Intlayer zapewnia **samodzielny [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** i **[pełny CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, który pomoże Ci zarządzać wielojęzyczną treścią w **w czasie rzeczywistym**, dzięki czemu współpraca z tłumaczami, copywriterami i innymi członkami zespołu będzie płynna. Treść może być przechowywana lokalnie i/lub zdalnie.

</Accordion>

</AccordionGroup>
---

## Przewodnik krok po kroku: Konfiguracja Intlayer w aplikacji Next.js z użyciem Page Router

<Steps>

<Step number={1} title="Instalacja zależności">

Zainstaluj niezbędne pakiety, używając preferowanego menedżera pakietów:

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
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  Główny pakiet, który dostarcza narzędzia do internacjonalizacji dla zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilecji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **next-intlayer**

  Pakiet integrujący Intlayer z Next.js. Zapewnia dostawców kontekstu oraz hooki do internacjonalizacji w Next.js. Dodatkowo zawiera wtyczkę Next.js do integracji Intlayer z [Webpack](https://webpack.js.org/) lub [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami oraz obsługi przekierowań URL.

</Step>

<Step number={2} title="Skonfiguruj swój projekt">

Utwórz plik konfiguracyjny, aby zdefiniować języki obsługiwane przez Twoją aplikację:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Za pomocą tego pliku konfiguracyjnego możesz ustawić lokalizowane adresy URL, przekierowania w middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji zawartości, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracyjnej](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Step>

<Step number={3} title="Integracja Intlayer z konfiguracją Next.js">

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

</Step>

<Step number={4} title="Skonfiguruj Middleware do wykrywania lokalizacji">

Skonfiguruj middleware, aby automatycznie wykrywać i obsługiwać preferowaną lokalizację użytkownika:

```typescript fileName="src/middleware.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> Dostosuj parametr `matcher`, aby odpowiadał trasom Twojej aplikacji. Więcej informacji znajdziesz w [dokumentacji Next.js dotyczącej konfigurowania matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

</Step>

<Step number={5} title="Zdefiniuj dynamiczne trasy lokalizacji">

Zaimplementuj dynamiczne routowanie, aby serwować zlokalizowane treści w zależności od lokalizacji użytkownika.

1.  **Utwórz strony specyficzne dla lokalizacji:**

    Zmień nazwę głównego pliku strony, aby zawierał dynamiczny segment `[locale]`.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **Zaktualizuj `_app.tsx`, aby obsługiwał lokalizację:**

    Zmodyfikuj swój plik `_app.tsx`, aby uwzględnić providery Intlayer.

    ```tsx fileName="src/pages/_app.tsx" codeFormat=["typescript", 'esm', 'cjs']
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerProvider } from "next-intlayer";

    const App = FC<AppProps>({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerProvider>
      );
    }

    export default MyApp;
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

</Step>

<Step number={6} title="Zadeklaruj swoją zawartość">

Utwórz i zarządzaj deklaracjami zawartości, aby przechowywać tłumaczenia.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

</Step>

<Step number={7} title="Wykorzystaj zawartość w swoim kodzie">

Uzyskaj dostęp do swoich słowników zawartości w całej aplikacji, aby wyświetlać przetłumaczoną zawartość.

```tsx {2,6} fileName="src/pages/[locale]/index.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/components/ComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

> Podczas używania tłumaczeń w atrybutach typu `string` (np. `alt`, `title`, `href`, `aria-label`), wywołuj

> wartość funkcji w następujący sposób:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Aby dowiedzieć się więcej o hooku `useIntlayer`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useIntlayer.md).

</Step>

<Step number={8} title="Internacjonalizacja metadanych" isOptional={true}>

Jeśli chcesz internacjonalizować swoje metadane, takie jak tytuł strony, możesz użyć funkcji `getStaticProps` dostarczonej przez Next.js Page Router. W jej wnętrzu możesz pobrać zawartość za pomocą funkcji `getIntlayer`, aby przetłumaczyć swoje metadane.

```typescript fileName="src/pages/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

````tsx fileName="src/pages/[locale]/index.tsx" codeFormat={["typescript", "esm"]}
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

> Należy zauważyć, że funkcja `getIntlayer` importowana z `next-intlayer` zwraca Twoją zawartość opakowaną w `IntlayerNode`, co umożliwia integrację z edytorem wizualnym. Natomiast funkcja `getIntlayer` importowana z `intlayer` zwraca zawartość bezpośrednio, bez dodatkowych właściwości.

> Dowiedz się więcej o optymalizacji metadanych [w oficjalnej dokumentacji Next.js](https://nextjs.org/docs/pages/building-your-application/optimizing/metadata).

</Step>

<Step number={9} title="Zmień język swojej zawartości" isOptional={true}>

Aby zmienić język swojej zawartości w Next.js, zalecanym sposobem jest użycie komponentu `Link`, aby przekierować użytkowników na odpowiednią zlokalizowaną stronę. Komponent `Link` umożliwia prefetching strony, co pomaga uniknąć pełnego przeładowania strony.

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
            onClick={() => setLocale(localeItem)}
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

> Alternatywnym sposobem jest użycie funkcji `setLocale` dostarczonej przez hook `useLocale`. Ta funkcja nie pozwoli na prefetching strony i spowoduje przeładowanie strony.

> W tym przypadku, bez przekierowania za pomocą `router.push`, tylko Twój kod po stronie serwera zmieni lokalizację zawartości.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Reszta kodu

const { setLocale } = useLocale();

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

</Step>

<Step number={10} title="Tworzenie lokalizowanego komponentu Link" isOptional={true}>

Aby zapewnić, że nawigacja w Twojej aplikacji respektuje aktualną lokalizację, możesz stworzyć niestandardowy komponent `Link`. Ten komponent automatycznie dodaje prefiks z aktualnym językiem do wewnętrznych adresów URL. Na przykład, gdy użytkownik mówiący po francusku kliknie link do strony "About", zostanie przekierowany na `/fr/about` zamiast na `/about`.

To zachowanie jest przydatne z kilku powodów:

- **SEO i doświadczenie użytkownika**: Lokalizowane adresy URL pomagają wyszukiwarkom poprawnie indeksować strony specyficzne dla języka oraz dostarczają użytkownikom treści w ich preferowanym języku.
- **Spójność**: Korzystając z lokalizowanego linku w całej aplikacji, zapewniasz, że nawigacja pozostaje w obrębie bieżącej lokalizacji, zapobiegając nieoczekiwanym zmianom języka.
- **Łatwość utrzymania**: Centralizacja logiki lokalizacji w jednym komponencie upraszcza zarządzanie adresami URL, co sprawia, że baza kodu jest łatwiejsza do utrzymania i rozbudowy wraz z rozwojem aplikacji.

Poniżej znajduje się implementacja lokalizowanego komponentu `Link` w TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
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

#### Jak to działa

- **Wykrywanie linków zewnętrznych**:  
  Funkcja pomocnicza `checkIsExternalLink` określa, czy URL jest zewnętrzny. Linki zewnętrzne pozostają niezmienione, ponieważ nie wymagają lokalizacji.

- **Pobieranie aktualnej lokalizacji**:
- **Lokalizacja URL**:  
  Dla linków wewnętrznych (czyli niezewnętrznych) używana jest funkcja `getLocalizedUrl`, która automatycznie dodaje prefiks z aktualnym locale do URL. Oznacza to, że jeśli użytkownik korzysta z wersji francuskiej, przekazanie `/about` jako `href` zostanie przekształcone na `/fr/about`.

- **Zwracanie linku**:  
  Komponent zwraca element `<a>` z zlokalizowanym URL, zapewniając spójność nawigacji zgodnie z ustawionym locale.

Integrując ten komponent `Link` w całej aplikacji, utrzymujesz spójne i świadome językowo doświadczenie użytkownika, jednocześnie korzystając z lepszego SEO i użyteczności.

</Step>

<Step number={11} title="Optymalizacja rozmiaru paczki" isOptional={true}>

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

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Uwaga: Ta optymalizacja jest dostępna tylko dla Next.js 13 i nowszych wersji.

> Uwaga: Ten pakiet nie jest instalowany domyślnie, ponieważ wtyczki SWC są nadal eksperymentalne w Next.js. Może się to zmienić w przyszłości.
> </Step>

</Steps>

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

## Często Zadawane Pytania

<FAQ>

<Question title="Jakie są różne rozwiązania dostępne do internacjonalizacji aplikacji Next.js Pages Router?">

Pages Router nadal obsługuje wbudowane pole `i18n` w `next.config.js`, ale zarządza ono wyłącznie routingiem i wykrywaniem lokalizacji, nigdy samymi tłumaczeniami, więc i tak wybierasz warstwę zawartości:

- **`next-i18next` / `i18next`** oraz **`next-intl`**: przestrzenie nazw JSON ładowane per strona, tradycyjne połączenie z Pages Routerem.
- **`react-intl`** oraz **`Lingui`**: komunikaty ICU z osobnym krokiem ekstrakcji.
- **`Intlayer`**: najbardziej zaawansowane rozwiązanie. Treść deklarowana w dowolnym miejscu w bazie kodu ([obok każdego komponentu lub scentralizowana](https://intlayer.org/pl/blog/per-component-vs-centralized-i18n)) i kompilowana per-komponent, w pełni typowana, z wbudowanym tłumaczeniem AI, edytorem wizualnym i systemem CMS.

Zobacz [dlaczego Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md) oraz [benchmark i18n Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md).

</Question>

<Question title="O ile i18n zwiększa rozmiar mojego bundle'a w Next.js?">

Znacznie mniej niż konfiguracja oparta na przestrzeniach nazw, ponieważ strona nigdy nie pobiera katalogu, którego nie renderuje. Zawartość jest rozwiązywana podczas `getStaticProps` i `getServerSideProps`, a nie wysyłana w postaci całych katalogów, a kompilator czasu budowania zastępuje wywołania `useIntlayer` dokładnymi wpisami słownika, z których korzysta komponent. Dzięki temu nieużywane klucze i nieużywane języki są usuwane, a [dynamiczne słowniki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md) dzielą resztę per lokalizacja. W porównaniu ze standardowymi alternatywami, Intlayer redukuje rozmiar bundle'a i strony nawet o 50%. Zobacz [optymalizacja bundle'a](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) oraz [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md).

</Question>

<Question title="Czy mogę zmigrować z next-intl, next-i18next lub i18next bez przepisywania moich komponentów?">

Tak, i istnieją dwie ścieżki. Możesz migrować zawartość stopniowo, korzystając z [przewodnika migracji z next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-intl_to_intlayer.md) lub [przewodnika migracji z i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md). Możesz także całkowicie zachować swoje obecne API: [adaptery kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md) udostępniają dokładnie to samo API co `next-intl`, `react-i18next` i `react-intl`, ale obsługiwane przez słowniki Intlayer, dzięki czemu zmieniają się tylko importy, a kod komponentów pozostaje bez zmian.

</Question>

<Question title="Czy mogę zachować moje istniejące pliki tłumaczeń JSON?">

Tak. Wtyczka [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) zachowuje Twoje pliki `/messages/{locale}/{namespace}.json` jako źródło prawdy i generuje z nich słowniki Intlayer w obu kierunkach. Wtyczka [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md) robi to samo dla katalogów gettext, a [pliki per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/per_locale_file.md) pozwalają rozdzielić zawartość według języka zamiast grupować lokalizacje w jednym pliku.

</Question>

<Question title="Czy muszę przenosić moją zawartość klucz po kluczu?">

Nie. Uruchom `npx intlayer extract`, a Intlayer odczyta Twoje komponenty, wyodrębni ciągi widoczne dla użytkownika i utworzy plik `.content` obok każdego z nich, dzięki czemu przeglądasz diff zamiast ręcznie kopiować ciągi do katalogu pojedynczo.

W przypadku w pełni zautomatyzowanego procesu [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) robi to samo w czasie budowania: skanuje kod JSX, TSX, Vue i Svelte przy każdej zmianie, generuje słowniki i utrzymuje je w synchronizacji za pośrednictwem hot module replacement, dzięki czemu nie trzeba w ogóle ręcznie utrzymywać kluczy.

Warto pamiętać o dwóch ograniczeniach przed włączeniem kompilatora. Działa on w oparciu o analizę statyczną, więc ciągi tekstowe istniejące tylko w czasie wykonywania, takie jak kody błędów API czy pola z CMS, pozostają poza jego zasięgiem. Musi on także odróżnić tekst dla użytkownika od logiki aplikacji, takiej jak `className="active"` czy kody stanu, co w dużej bazie kodu wymaga kilku adnotacji. Polecenie [extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md) unika obu tych problemów, pozostawiając Ci pełną kontrolę.

</Question>

<Question title="Jakie narzędzia dla edytora i agentów AI są dostępne?">

Pięć narzędzi, wszystkie opcjonalne:

- **[Rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)**: przejście od klucza `useIntlayer` do pliku treści, który go deklaruje, wyodrębnianie treści z komponentu oraz uruchamianie build, fill, test, push i pull z palety poleceń lub dedykowanej karty Intlayer.
- **[Serwer LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**: taka sama świadomość w dowolnym edytorze obsługującym LSP, z funkcjami przejdź do definicji (go to definition), znajdź wszystkie referencje, podglądem przetłumaczonej wartości po najechaniu kursorem, autouzupełnianiem kluczy i pól oraz ostrzeżeniem, gdy klucz nie jest nigdzie zadeklarowany. Rozpoznaje również wywołania `i18next`, `react-i18next`, `next-intl` i `use-intl`, co ułatwia migrację.
- **[Serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)**: udostępnia dokumentację i CLI Intlayer dla Cursor, VS Code, Claude Desktop, Claude Code i ChatGPT, dzięki czemu asystent odpowiada na podstawie aktualnej dokumentacji zamiast zgadywać i może samodzielnie wykonywać polecenia, takie jak `intlayer fill`.
- **[Umiejętności agenta (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**: wyspecjalizowane umiejętności, takie jak `intlayer-config`, `intlayer-cli` i `intlayer-content`, oraz po jednej dla każdego frameworka, które uczą agenta konfiguracji routingu i typów węzłów treści.
- **[Wtyczka ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md)**: reguła `no-raw-text` oznacza zakodowane na stałe ciągi tekstowe, z dodatkowymi regułami dla statycznych kluczy słownika i nieużywanej zawartości.

</Question>

<Question title="Czy powinienem pozostać przy Pages Routerze, czy przejść na App Router?">

Nic tutaj nie zmusza do migracji. Intlayer obsługuje oba rozwiązania, a deklaracje zawartości są identyczne, więc migracja routera w przyszłości nie oznacza przepisywania i18n. Jeśli już planujesz przeprowadzkę, zapoznaj się z [przewodnikiem po Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md) i zyskaj renderowanie Server Components, które całkowicie usuwa słowniki z klienta.

</Question>

<Question title="Czy wbudowana opcja i18n w Next.js nadal działa z Pages Routerem?">

Tak, i to jest główna różnica w stosunku do App Routera, gdzie nie ma ona zastosowania. Zapewnia prefiksy lokalizacji i wykrywanie `Accept-Language`, ale nie dostarcza żadnej warstwy komunikatów, rozwiązując routing i pozostawiając tłumaczenia bibliotece. Możesz ją zachować lub pozwolić Intlayerowi zarządzać również routingiem poprzez `routing.mode` i middleware w kroku 4.

</Question>

<Question title="Jak dodać tagi hreflang i zlokalizowane metadane dla SEO?">

Krok 8 to obejmuje. Zbuduj alternatywne adresy URL za pomocą `getMultilingualUrls`, w tym wpis `x-default`, i wyemituj je z `next/head` na każdej stronie, aby wyszukiwarki serwowały odpowiednią wersję językową.

</Question>

<Question title="Jak zbudować zlokalizowany komponent Link?">

Pokazuje to krok 10. Komponent opakowuje `Link` z Next.js i przekazuje href przez `getLocalizedUrl`, dzięki czemu wewnętrzny link zapisany jako `/about` staje się `/pl/about` dla polskiego użytkownika bez konieczności powtarzania lokalizacji przy każdym wywołaniu.

</Question>

<Question title="Jak automatycznie przetłumaczyć aplikację za pomocą AI?">

Uruchom `npx intlayer fill`. Uzupełnia brakujące tłumaczenia za pomocą wybranego modelu LLM, korzystając z Twojego własnego dostawcy i klucza API, a flaga `--git-diff` ogranicza działanie do treści zmienionych na gałęzi. Zobacz [polecenie fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md) oraz [integrację CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/CI_CD.md).

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
