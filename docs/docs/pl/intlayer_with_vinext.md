---
createdAt: 2026-11-23
updatedAt: 2026-11-23
title: "vinext i18n - Kompletny przewodnik tłumaczenia aplikacji Next.js na Vite"
description: "Skonfiguruj Intlayer z vinext, czyli API Next.js na Vite: routing według języka z proxy.ts, Server i Client Components, zlokalizowane metadane, sitemap i wdrożenie na Cloudflare Workers."
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - vinext
  - Next.js
  - Vite
  - Cloudflare Workers
  - React
slugs:
  - doc
  - environment
  - vinext
history:
  - version: 9.8.4
    date: 2026-11-23
    changes: "Historia początkowa"
author: aymericzip
---

# Przetłumacz swoją witrynę vinext za pomocą Intlayer

[vinext](https://github.com/cloudflare/vinext) implementuje API Next.js na nowo, na bazie Vite. Twój katalog `app/`, importy `next/*` i `proxy.ts` nadal działają, ale build przechodzi przez Vite zamiast Turbopack lub webpack.

Intlayer wpina się w tę konfigurację za pomocą dwóch pakietów: `next-intlayer` dla hooków, providerów i proxy, których Twoje komponenty już używają w Next.js, oraz `vite-intlayer` dla strony builda (kompilacja słowników, watch i optymalizacja bundla).

> Używasz Next.js z jego własnym toolchainem? Skorzystaj zamiast tego z [przewodnika po Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md).

- [Przewodnik po Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md)

## Spis treści

<TOC/>

## Dlaczego Intlayer, a nie inne rozwiązania?

W porównaniu z rozwiązaniami takimi jak `next-intl` czy `i18next`, Intlayer ma wbudowane optymalizacje:

<AccordionGroup>
<Accordion header="Stworzony dla API Next.js, na Vite">

Ten sam kod `next-intlayer` działa w Next.js i w vinext. Server Components rozwiązują treść na serwerze, Client Components odczytują ją przez provider, a routing według języka działa z Twojego `proxy.ts`. Przejście między tymi dwoma toolchainami nie wymaga zmian w komponentach.

</Accordion>
<Accordion header="Rozmiar bundla">

Zamiast ładować do stron ogromne pliki JSON, ładujesz tylko potrzebną treść. Wtyczka Vite zastępuje każde wywołanie `useIntlayer` wpisami, których komponent faktycznie używa, co **zmniejsza rozmiar bundla i stron nawet o 50%**.

</Accordion>
<Accordion header="Łatwość utrzymania">

Podział treści na komponenty **upraszcza utrzymanie** dużych aplikacji. Możesz zduplikować lub usunąć folder funkcjonalności bez przeglądania całej bazy kodu z treściami, a Intlayer jest **w pełni otypowany**, dzięki czemu treść pozostaje poprawna.

</Accordion>
<Accordion header="Agent AI">

Trzymanie treści obok komponentu **zmniejsza kontekst potrzebny** LLM-om. Intlayer udostępnia **CLI** do wykrywania brakujących tłumaczeń, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**, **[serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)** oraz **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)
- [Serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)
- [Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)

</Accordion>
<Accordion header="Automatyzacja">

Tłumacz w swoim pipeline CI/CD za pomocą wybranego LLM, na koszt Twojego dostawcy AI. Intlayer oferuje też **kompilator** automatyzujący wyodrębnianie treści oraz [platformę webową](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md) do **tłumaczenia w tle**.

- [Platforma webowa](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)

</Accordion>
<Accordion header="Skalowanie z osobami niebędącymi programistami">

Intlayer zapewnia **[edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) do samodzielnego hostowania** oraz **[pełny CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)** do zarządzania treściami wielojęzycznymi w **czasie rzeczywistym** z tłumaczami i copywriterami. Treści można przechowywać lokalnie i/lub zdalnie.

- [Edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)
- [Pełny CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## Przewodnik krok po kroku: konfiguracja Intlayer w aplikacji vinext

<Steps>
<Step number={1} title="Zainstaluj zależności">

Zacznij od działającego projektu vinext. Aby go utworzyć, uruchom `npm create vinext-app@latest`. Aby zmigrować istniejącą aplikację Next.js, uruchom `npx vinext init`.

Następnie zainstaluj Intlayer:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add vite-intlayer --dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Główny pakiet z narzędziami do internacjonalizacji: zarządzanie konfiguracją, tłumaczenie, [deklaracja treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilacja i [polecenia CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **next-intlayer**

  Udostępnia providery, hooki i proxy dla API Next.js. vinext kieruje `next/navigation`, `next/headers` i `next/server` do własnych implementacji, więc `next-intlayer` działa bez zmian.

- **vite-intlayer**

  Wtyczka Vite, która buduje Twoje deklaracje treści, obserwuje je w trybie deweloperskim i optymalizuje słowniki w bundlu produkcyjnym. Zastępuje wtyczkę Next.js `withIntlayer()`, której vinext nie uruchamia.

</Step>
<Step number={2} title="Skonfiguruj projekt">

Wybierz, czy aplikacja ma używać zlokalizowanych ścieżek URL (np. `/en/about`, `/fr/about`), czy serwować treść bez segmentu języka w ścieżce (np. `/about`, z wykrywaniem języka przez cookies, nagłówki lub parametry zapytania).

<Tabs group="routing-mode">
<Tab label="Ze ścieżką języka" value="with-locale-path">

### Architektura

Wszystkie zlokalizowane strony są zagnieżdżone pod dynamicznym segmentem `[locale]`. Jest to zalecane dla SEO i renderowania statycznego, ponieważ każdy język ma własny adres URL:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
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
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Konfiguracja

Utwórz plik `intlayer.config.ts`, aby zadeklarować obsługiwane języki:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // or `prefix-all`
  },
};

export default config;
```

</Tab>
<Tab label="Bez ścieżki języka" value="without-locale-path">

### Architektura

Trasy nie zawierają segmentu `[locale]`. Wszystkie strony znajdują się bezpośrednio w `src/app/`, a język pochodzi z cookies, nagłówków lub parametrów zapytania. To dobre rozwiązanie dla paneli i aplikacji z uwierzytelnianiem:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx                # Root layout for Intlayer provider and styling
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Konfiguracja

Ustaw `routing.mode` na `"search-params"` (np. `/about?locale=fr`) lub `"no-prefix"`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // or `no-prefix`
  },
};

export default config;
```

</Tab>
</Tabs>

> Ten plik ustawia także przekierowania proxy, nazwy cookies, lokalizację i rozszerzenie deklaracji treści, logi i nie tylko. Pełną listę znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

- [Dokumentacja konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)

</Step>
<Step number={3} title="Zintegruj Intlayer z konfiguracją Vite">

Dodaj wtyczkę `intlayer()` obok `vinext()` w `vite.config.ts`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({
      // Locale routing is handled by `src/proxy.ts` (step 7)
      proxy: { ignore: () => true },
    }),
  ],
});
```

> Wtyczka `intlayer()` buduje słowniki przed rozpoczęciem builda, obserwuje pliki treści w trybie deweloperskim i konfiguruje aliasy oraz optymalizacje używane przez `next-intlayer` w środowiskach RSC, SSR i klienckim.

> `intlayer()` zawiera też middleware routingu według języka dla serwera deweloperskiego Vite. W vinext zadanie to wykonuje już `src/proxy.ts`, w trybie deweloperskim i w środowisku produkcyjnym, więc opcja `ignore` wyłącza middleware Vite, aby nie routować każdego żądania dwa razy.

> Nie używaj `withIntlayer()` w `next.config.ts`. vinext odczytuje `next.config.ts` dla opcji takich jak `redirects`, `rewrites` i `headers`, ale nie uruchamia wtyczek webpack ani Turbopack.

Jeśli wdrażasz na Cloudflare Workers, zachowaj wtyczkę `cloudflare()` wygenerowaną przez `vinext init`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({ proxy: { ignore: () => false } }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

</Step>
<Step number={4} title="Zdefiniuj dynamiczne trasy języka">

<Tabs group="routing-mode">
<Tab label="Ze ścieżką języka" value="with-locale-path">

Usuń całą zawartość `RootLayout` i zastąp ją następującym kodem:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, like `next-themes` or `react-query`
  <>{children}</>
);

export default RootLayout;
```

> Pozostawienie `RootLayout` pustego pozwala layoutowi języka ustawić atrybuty [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) i [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) na znaczniku `<html>`.

Dodaj layout w katalogu `[locale]`:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Pojedynczy `IntlayerProvider` obejmuje obie połowy drzewa: przekazuje język do Server Components i montuje provider kliencki, dzięki czemu Client Components otrzymują ten sam język.

> Segment `[locale]` przechowuje język: `/en-US/about` daje `en-US`, a `/fr/about` daje `fr`. Poprzedni `src/app/page.tsx` nie jest już używany i można go usunąć. Proxy (krok 7) serwuje domyślny język w katalogu głównym.

> `generateStaticParams` sprawia, że vinext prerenderuje każdą stronę dla każdego języka. vinext wymusza też `dynamicParams`, więc nieznany język zwraca 404, gdy ustawisz `export const dynamicParams = false`.

</Tab>
<Tab label="Bez ścieżki języka" value="without-locale-path">

Nie ma katalogu `[locale]`. Skonfiguruj `src/app/layout.tsx`, aby odczytywał język z żądania i opakowywał aplikację w `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";

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
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Tab>
</Tabs>

</Step>
<Step number={5} title="Zadeklaruj swoją treść">

Utwórz deklaracje treści, aby przechowywać tłumaczenia:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        pl: "Zacznij od edycji",
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

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "pl": "Zacznij od edycji",
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar"
        }
      },
      "pageLink": "src/app/page.tsx"
    }
  }
}
```

> Deklaracje treści mogą znajdować się w dowolnym miejscu katalogu `contentDir` (domyślnie `./src`), o ile pasują do rozszerzenia deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Więcej szczegółów znajdziesz w [dokumentacji deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

- [Dokumentacja deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md)

</Step>
<Step number={6} title="Używaj treści w kodzie">

Uzyskaj dostęp do słowników z dowolnego komponentu:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` jest izomorficzny: warunek eksportu `react-server`, który vinext stosuje w swoim środowisku RSC, daje Server Components implementację serwerową, a Client Components otrzymują implementację opartą na kontekście. To samo wywołanie działa po obu stronach.

> Aby użyć treści w atrybucie typu `string`, takim jak `alt`, `title`, `href` lub `aria-label`, odczytaj jej wartość:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Dowiedz się więcej w [dokumentacji `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useIntlayer.md).

- [Dokumentacja `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useIntlayer.md)

> Jeśli aplikacja już istnieje, [kompilator Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) i [polecenie extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md) przekształcają tysiące komponentów w sekundę.

- [Kompilator Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md)
- [Polecenie extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md)

</Step>
<Step number={7} title="Skonfiguruj proxy do wykrywania języka">

vinext uruchamia `proxy.ts` (i `middleware.ts`) tak jak Next.js 16, w trybie deweloperskim i produkcyjnym, także na Cloudflare Workers. Wyeksportuj proxy Intlayer:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` wykrywa preferowany język użytkownika, przekierowuje na odpowiedni adres URL zgodnie z [konfiguracją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md) i zapisuje język w cookie. Przekazuje też język do `getLocale()` i hooków serwerowych, więc zachowaj go także w architekturze bez ścieżki języka.

- [Konfiguracja](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)

> Aby połączyć kilka proxy w łańcuch (na przykład `intlayerProxy` z uwierzytelnianiem), użyj `multipleProxies`:

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>
<Step number={8} title="Internacjonalizacja metadanych" isOptional={true}>

vinext obsługuje API Metadata. Użyj `generateMetadata` z `getIntlayer`, aby przetłumaczyć metadane stron:

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      pl: "Moja aplikacja vinext",
      en: "My vinext app",
      fr: "Mon application vinext",
      es: "Mi aplicación vinext",
    }),
    description: t({
      pl: "Aplikacja Next.js działająca na Vite",
      en: "A Next.js app running on Vite",
      fr: "Une application Next.js qui tourne sur Vite",
      es: "Una aplicación Next.js que funciona con Vite",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
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

// ... Rest of the code
````

> Funkcja `getIntlayer` zaimportowana z `intlayer` zwraca surowe wartości, gotowe do obiektu metadanych. Ta z `next-intlayer` opakowuje je na potrzeby edytora wizualnego.

</Step>
<Step number={9} title="Internacjonalizacja sitemap.xml i robots.txt" isOptional={true}>

`sitemap.ts` i `robots.ts` działają tak jak w Next.js. Użyj `getMultilingualUrls`, aby wypisać każdy zlokalizowany adres URL:

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
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
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

</Step>
<Step number={10} title="Zmień język treści" isOptional={true}>

Użyj `next/link`, aby przejść do zlokalizowanej strony. vinext zachowuje nawigację po stronie klienta i prefetching, więc przełączenie następuje bez pełnego przeładowania:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
            replace // The browser "back" button returns to the previous page
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Odniesienia do dokumentacji:
>
> - [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useLocale.md)
> - [Funkcja `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocaleName.md)
> - [Funkcja `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedUrl.md)
> - [Funkcja `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="Utwórz komponent zlokalizowanego linku" isOptional={true}>

Własny komponent `Link` dodaje do wewnętrznych adresów URL prefiks bieżącego języka, więc francuski użytkownik klikający `/about` trafia na `/fr/about`:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Checks whether a URL is external (starts with http:// or https://).
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Link that localizes internal URLs with the current locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

</Step>
<Step number={12} title="Pobierz bieżący język w Server Actions" isOptional={true}>

Wywołaj `getLocale` z `next-intlayer/server` wewnątrz Server Action:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> `getLocale` odczytuje język ustawiony przez proxy w nagłówkach żądania, następnie cookie języka, potem nagłówek `Accept-Language` przeglądarki, a na końcu wraca do języka domyślnego.

</Step>
<Step number={13} title="Wdróż na Cloudflare Workers" isOptional={true}>

Intlayer kompiluje słowniki do bundla podczas builda, więc w czasie działania nic nie czyta systemu plików, a aplikacja działa w workerd bez zmian. Zbuduj i wdroż za pomocą CLI vinext:

```bash packageManager="npm"
npx @vinext/cloudflare deploy
```

```bash packageManager="pnpm"
pnpm dlx @vinext/cloudflare deploy
```

```bash packageManager="yarn"
yarn dlx @vinext/cloudflare deploy
```

```bash packageManager="bun"
bunx @vinext/cloudflare deploy
```

> Aby wdrożyć gdzie indziej (Vercel, Netlify, AWS, Node.js), dodaj wtyczkę Vite [Nitro](https://v3.nitro.build/) obok `vinext()` albo ustaw `output: "standalone"` w `next.config.ts`. Konfiguracja Intlayer się nie zmienia.

</Step>
<Step number={14} title="Wyodrębnij treść z komponentów" isOptional={true}>

W istniejącej bazie kodu Intlayer udostępnia [kompilator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) i [ekstraktor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md), które przenoszą zahardkodowane ciągi do deklaracji treści.

- [Kompilator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md)
- [Ekstraktor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md)

Włącz kompilator w `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * If `true`, the compiler rewrites the component files on disk.
     * If `false`, the transformation stays in the build output only.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

Uruchom ekstraktor, aby przekształcić komponenty i wyodrębnić treść:

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
 <Tab value='Vite compiler'>

Wtyczka Vite `intlayer()` zawiera kompilator. Po ustawieniu `compiler.enabled` uruchom serwer deweloperski lub build jak zwykle:

```bash packageManager="npm"
npm run build # Or npm run dev
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

### Skonfiguruj TypeScript

Intlayer używa module augmentation, aby otypować klucze i wartości treści.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

Dołącz wygenerowane typy do konfiguracji TypeScript:

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Konfiguracja Git

Zignoruj pliki generowane przez Intlayer:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### Rozszerzenie VS Code

Zainstaluj oficjalne **[rozszerzenie Intlayer dla VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)**, aby uzyskać autouzupełnianie kluczy, błędy brakujących tłumaczeń, podglądy w linii i szybkie akcje. Zobacz [dokumentację rozszerzenia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md).

- [Dokumentacja rozszerzenia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)

### Dalsze kroki

Dodaj [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wynieś treść na zewnątrz za pomocą [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

- [Edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)

## Najczęściej zadawane pytania

<FAQ>

<Question title="Czym jest vinext?">

vinext to open source'owa wtyczka Vite, utrzymywana przez Cloudflare, która implementuje na nowo publiczne API Next.js: App Router i Pages Router, React Server Components, Server Actions, `proxy.ts`, route handlery i moduły `next/*`. Twój kod Next.js działa na Vite i można go wdrażać natywnie na Cloudflare Workers lub na inne platformy przez Nitro.

</Question>
<Question title="Co się zmienia w porównaniu z konfiguracją Next.js?">

Tylko integracja z buildem. W Next.js `withIntlayer()` opakowuje `next.config.ts`. W vinext zamiast tego wtyczka `intlayer()` z `vite-intlayer` trafia do `vite.config.ts`. Providery, hooki, `proxy.ts`, metadane i kod sitemap pozostają identyczne, więc w kwestiach, których ta strona nie obejmuje, możesz korzystać z [przewodnika po Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md).

- [Przewodnik po Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md)

</Question>
<Question title="Czy potrzebuję konfiguracji i18n Next.js lub wtyczki SWC?">

Nie. Pole `i18n` w `next.config.ts` obejmuje w vinext tylko prefiksy języka Pages Routera, a Intlayer wykonuje własny routing przez `proxy.ts`. Wtyczka `@intlayer/swc` również nie jest potrzebna: wtyczka Vite już zastępuje wywołania `useIntlayer`, więc każda strona dostarcza tylko używane słowniki. Zobacz [optymalizację bundla](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md).

- [Optymalizacja bundla](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md)

</Question>
<Question title="Czy potrzebuję `intlayer watch` w trybie deweloperskim?">

Nie. Wtyczka Vite `intlayer()` uruchamia watcher treści razem z `vite dev`, a edycja treści odświeża na gorąco tylko komponenty czytające zmieniony słownik.

</Question>
<Question title="Czy mogę przejść z `next-intl` lub `i18next` bez przepisywania komponentów?">

Tak. Skorzystaj z [przewodnika migracji z next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-intl_to_intlayer.md) lub [przewodnika migracji z i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md), albo zachowaj obecne API dzięki [adapterom zgodności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md), które udostępniają API `next-intl`, `react-i18next` i `react-intl` oparte na słownikach Intlayer.

- [Przewodnik migracji z next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-intl_to_intlayer.md)
- [Przewodnik migracji z i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md)
- [Adaptery zgodności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md)

</Question>
<Question title="Czy muszę umieszczać język w adresie URL, np. /fr/about?">

Nie. `routing.mode` przyjmuje:

- `"prefix-no-default"` (domyślnie): `/about` dla języka domyślnego, `/fr/about` dla pozostałych.
- `"prefix-all"`: każdy język ma prefiks, `/en/about` i `/fr/about`.
- `"no-prefix"`: brak języka w ścieżce, ustalany z cookie lub nagłówka.
- `"search-params"`: `/about?locale=fr`.

Zobacz [dokumentację konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md) i architekturę bez ścieżki języka w kroku 2.

- [Dokumentacja konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)

</Question>
<Question title="Jak automatycznie przetłumaczyć aplikację za pomocą AI?">

Uruchom `npx intlayer fill`. CLI wykrywa brakujące tłumaczenia i uzupełnia je za pomocą wybranego LLM, z użyciem Twojego dostawcy i klucza API. Zobacz [polecenie fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md) i [integrację CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/CI_CD.md).

- [Polecenie fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md)
- [Integracja CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/CI_CD.md)

</Question>
<Question title="Jak wychwycić brakujące tłumaczenia przed wydaniem?">

Uruchom `npx intlayer test` w CI. Build kończy się błędem, gdy w zadeklarowanym języku brakuje treści. [Rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md) pokazuje te same błędy podczas pisania, a [wtyczka ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md) wskazuje zahardkodowane ciągi.

- [Rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)
- [Wtyczka ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md)

</Question>
<Question title="Czy Intlayer jest darmowy i open source?">

Tak. Intlayer jest open source na licencji Apache 2.0, a biblioteka, CLI, edytor wizualny i kompilator są darmowe, także do zastosowań komercyjnych. Hostowany CMS to opcjonalna płatna usługa, którą można też [hostować samodzielnie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md).

- [Samodzielne hostowanie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md)

</Question>

</FAQ>
