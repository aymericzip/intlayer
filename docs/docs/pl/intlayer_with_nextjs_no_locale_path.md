---
createdAt: 2026-01-10
updatedAt: 2026-05-31
title: Next.js i18n - Kompletny przewodnik po tłumaczeniu Next.js 16 app (no locale prefix)
description: Najlepsze rozwiązanie dla rozmiaru bundle, SEO, wydajności & utrzymania. Uczyń swój Next.js 16 stronę internetową wielojęzycznym w 2026, tłumaczenie LLM, Agent Skills & MCP.
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
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizacja użycia API useIntlayer w Solid do bezpośredniego dostępu do właściwości"
  - version: 8.0.0
    date: 2026-01-10
    changes: "Pierwsze wydanie"
---

# Przetłumacz swoją stronę Next.js 16 (bez [locale] w ścieżce) za pomocą Intlayer | Internationalization (i18n)

<Tabs defaultTab="video">
  <Tab label="Wideo" value="video">
  
<iframe title="Najlepsze rozwiązanie i18n dla Next.js? Odkryj Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) na GitHubie.

## Spis treści

<TOC/>

## Dlaczego Interlayer zamiast alternatyw?

W porównaniu do głównych rozwiązań, takich jak `next-intl` czy `i18next`, Intlayer jest rozwiązaniem wyposażonym w zintegrowane optymalizacje, takie jak:

**Pełne pokrycie Next.js**

Intlayer jest zoptymalizowany do współpracy z **Server Components** w celu wydajnego renderowania i jest w pełni kompatybilny z [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). Nie blokuje renderowania statycznego i oferuje oprogramowanie pośredniczące oraz wszystkie funkcje potrzebne do skalowania internacjonalizacji (i18n).

> Intlayer jest kompatybilny z Next.js 12, 13, 14, 15 i 16. Jeśli używasz routera Next.js Pages Router, możesz zapoznać się z tym [przewodnikiem] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md).
> Routing lokalny jest przydatny ze względu na SEO, rozmiar bundle'a i wydajność. Jeśli go nie potrzebujesz, możesz zapoznać się z tym [przewodnikiem](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md).
> W przypadku Next.js 12, 13, 14 i 15 z App Router zapoznaj się z tym [przewodnikiem] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md).

**Rozmiar bundle'a**

Zamiast ładować ogromne pliki JSON na swoje strony, ładuj tylko niezbędną treść. Intlayer pomaga **zmniejszyć rozmiary bundle'a i stron nawet o 50%**.

**Łatwość konserwacji**

Określanie zakresu zawartości aplikacji **ułatwia konserwację** aplikacji na dużą skalę. Możesz powielić lub usunąć pojedynczy folder funkcji bez obciążania psychicznego koniecznością przeglądania całej bazy kodu zawartości. Dodatkowo Inlayer jest **w pełni napisany**, aby zapewnić dokładność treści.

**Agent AI**

Wspólna lokalizacja treści **zmniejsza potrzebny kontekst** dzięki modelom dużego języka (LLM). Intlayer zawiera także zestaw narzędzi, taki jak **CLI** do sprawdzania brakujących tłumaczeń**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** i **[umiejętności agenta](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, aby praca programisty (DX) była jeszcze płynniejsza dla agentów AI.

**Automatyzacja**

Korzystaj z automatyzacji, aby tłumaczyć w swoim potoku CI/CD przy użyciu wybranego LLM na koszt dostawcy sztucznej inteligencji. Intlayer oferuje także **kompilator** do automatyzacji ekstrakcji treści, a także [platformę internetową] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), która pomaga **tłumaczyć w tle**.

**Wydajność**

Łączenie ogromnych plików JSON z komponentami może prowadzić do problemów z wydajnością i reaktywnością. Inlayer optymalizuje ładowanie treści w czasie kompilacji.

**Skalowanie bez użycia dewelopera**

Więcej niż tylko rozwiązanie i18n, Intlayer zapewnia **samodzielny [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** i **[pełny CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, który pomoże Ci zarządzać wielojęzyczną treścią w **w czasie rzeczywistym**, dzięki czemu współpraca z tłumaczami, copywriterami i innymi członkami zespołu będzie płynna. Treść może być przechowywana lokalnie i/lub zdalnie.

---

## Krok po kroku: konfiguracja Intlayer w aplikacji Next.js

<Steps>

<Step number={1} title="Zainstaluj zależności">

Zainstaluj niezbędne pakiety używając npm:

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
bun x intlayer init
```

- **intlayer**

  Pakiet rdzeniowy, który dostarcza narzędzia do internacjonalizacji do zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilacji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **next-intlayer**

Pakiet integrujący Intlayer z Next.js. Zapewnia context providers i hooki do internacjonalizacji w Next.js. Dodatkowo zawiera plugin Next.js do integracji Intlayer z [Webpack](https://webpack.js.org/) lub [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), a także proxy do wykrywania preferowanej lokalizacji użytkownika, zarządzania cookie i obsługi przekierowań URL.

</Step>

<Step number={2} title="Skonfiguruj swój projekt">

Oto końcowa struktura, którą utworzymy:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── clientComponentExample
│   │   │   ├── client-component-example.content.ts
│   │   │   └── ClientComponentExample.tsx
│   │   ├── localeSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   └── serverComponentExample
│   │       ├── server-component-example.content.ts
│   │       └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> Jeśli nie chcesz routingu lokalizacji, intlayer może być użyty jako prosty provider / hook. Zobacz [ten przewodnik](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_no_locale_path.md), aby uzyskać więcej informacji.

Create a config file to configure the languages of your application:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Twoje pozostałe locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // lub `no-prefix` - Przydatne do wykrywania w middleware
  },
};

export default config;
```

> Poprzez ten plik konfiguracyjny możesz ustawić lokalizowane adresy URL, przekierowania proxy, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji treści, wyłączyć logi Intlayer w konsoli i inne. Aby uzyskać pełną listę dostępnych parametrów, zapoznaj się z [dokumentacją konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Step>

<Step number={3} title="Integracja Intlayer z konfiguracją Next.js">

Skonfiguruj swoje środowisko Next.js, aby używało Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* opcje konfiguracji tutaj */
};

export default withIntlayer(nextConfig);
```

> Wtyczka Next.js `withIntlayer()` służy do integracji Intlayer z Next.js. Zapewnia budowanie plików deklaracji treści i monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w środowiskach [Webpack](https://webpack.js.org/) lub [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Dodatkowo udostępnia aliasy w celu optymalizacji wydajności i zapewnia kompatybilność z komponentami po stronie serwera.

> Funkcja `withIntlayer()` jest funkcją zwracającą Promise. Pozwala przygotować słowniki Intlayer przed rozpoczęciem procesu build. Jeśli chcesz użyć jej razem z innymi wtyczkami, możesz użyć `await`. Przykład:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Jeśli chcesz użyć go synchronicznie, możesz skorzystać z funkcji `withIntlayerSync()`. Przykład:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Intlayer automatycznie wykrywa, czy Twój projekt używa **webpack** czy **Turbopack**, na podstawie flag wiersza poleceń `--webpack`, `--turbo` lub `--turbopack`, oraz Twojej obecnej wersji **Next.js**.
>
> Ponieważ `next>=16`, jeśli używasz **Rspack**, musisz wyraźnie wymusić użycie konfiguracji webpack przez Intlayer, wyłączając Turbopack:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="Zdefiniuj dynamiczne trasy lokalizacji">

Usuń całą zawartość `RootLayout` i zastąp ją następującym kodem:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
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

</Step>

<Step number={5} title="Zadeklaruj swoje treści">

Utwórz i zarządzaj deklaracjami treści, aby przechowywać tłumaczenia:

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      pl: "Tytuł mojego projektu",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      pl: "Poznaj naszą innowacyjną platformę zaprojektowaną, aby usprawnić przepływ pracy i zwiększyć produktywność.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      pl: ["innowacja", "produktywność", "przepływ pracy", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      pl: ["innowacja", "produktywność", "przepływ pracy", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
} as Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "pl": "Tytuł mojego projektu",
        "en": "My Project Title",
        "fr": "Le Titre de mon Projet",
        "es": "El Título de mi Proyecto"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "pl": "Odkryj naszą innowacyjną platformę zaprojektowaną, aby usprawnić twój workflow i zwiększyć produktywność.",
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "fr": "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad."
      }
    },
    "keywords": {
      "nodeType": "translation",
      "translation": {
        "pl": ["innowacja", "produktywność", "przepływ pracy", "SaaS"],
        "en": ["innovation", "productivity", "workflow", "SaaS"],
        "fr": ["innovation", "productivité", "flux de travail", "SaaS"],
        "es": ["innovación", "productividad", "flujo de trabajo", "SaaS"]
      }
    }
  }
}
```

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

```json fileName="src/app/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
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
```

> Twoje deklaracje zawartości mogą być zdefiniowane w dowolnym miejscu aplikacji, pod warunkiem że zostaną umieszczone w katalogu `contentDir` (domyślnie `./src`) i mają odpowiednie rozszerzenie pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Po więcej informacji odwołaj się do [dokumentacji pliku deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

</Step>

<Step number={6} title="Wykorzystanie zawartości w kodzie">

Uzyskaj dostęp do swoich słowników zawartości w całej aplikacji:

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { NextPage } from "next";
import { getLocale } from "next-intlayer/server";
import { headers, cookies } from "next/headers";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** służy do dostarczania locale komponentom po stronie klienta. Można go umieścić w dowolnym komponencie nadrzędnym, w tym w layout. Jednak zaleca się umieszczenie go w layout, ponieważ Next.js współdzieli kod layoutu między stronami, co jest bardziej wydajne. Używając `IntlayerClientProvider` w layout, unikasz ponownej inicjalizacji dla każdej strony, poprawiając wydajność i utrzymując spójny kontekst lokalizacji w całej aplikacji.
- **`IntlayerServerProvider`** jest używany do dostarczania locale dzieciom po stronie serwera. Nie można go umieścić w layoucie.

  > Layout i page nie mogą współdzielić wspólnego kontekstu serwera, ponieważ system kontekstu serwera opiera się na magazynie danych dla każdego żądania (poprzez mechanizm [React's cache](https://react.dev/reference/react/cache)), powodując, że każdy "kontekst" jest tworzony na nowo dla różnych segmentów aplikacji. Umieszczenie providera we wspólnym layoucie złamałoby tę izolację, uniemożliwiając poprawne propagowanie wartości kontekstu serwera do twoich komponentów serwerowych.

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Utwórz deklarację powiązanej treści

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Utwórz deklarację powiązanej zawartości

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Jeśli chcesz użyć swojej zawartości w atrybucie typu `string`, takim jak `alt`, `title`, `href`, `aria-label` itp., musisz wywołać wartość funkcji, na przykład:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Aby dowiedzieć się więcej o hooku `useIntlayer`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useIntlayer.md).

</Step>

<Step number={7} title="Skonfiguruj proxy do wykrywania preferowanej lokalizacji użytkownika" isOptional={true}>

Skonfiguruj proxy, aby wykrywało preferowaną lokalizację użytkownika:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` jest używany do wykrywania preferowanego języka użytkownika i przekierowywania go na odpowiedni URL, zgodnie z [konfiguracją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md). Dodatkowo umożliwia zapisanie preferowanego języka użytkownika w ciasteczku.

> Jeśli potrzebujesz łączyć kilka proxy razem (na przykład `intlayerProxy` z uwierzytelnianiem lub niestandardowymi proxy), Intlayer udostępnia teraz helper o nazwie `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="Zmień język swojej zawartości" isOptional={true}>

Aby zmienić język treści w Next.js, zalecanym sposobem jest użycie komponentu `Link` do przekierowania użytkowników na odpowiednio zlokalizowaną stronę. Komponent `Link` umożliwia prefetching, co pomaga uniknąć pełnego przeładowania strony.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
              {/* Skrót lokalizacji, np. FR */}
              {localeItem}
            </span>
            <span>
              {/* Nazwa języka w jego własnym locale, np. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Nazwa języka w bieżącym locale, np. "Francés" jeśli bieżące locale to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Język w wersji angielskiej, np. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Alternatywnym sposobem jest użycie funkcji `setLocale` dostarczonej przez hook `useLocale`. Ta funkcja nie pozwala na prefetching strony. Zobacz dokumentację hooka [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useLocale.md) po więcej szczegółów.

> Odnośniki w dokumentacji:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` atrybut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` atrybut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` atrybut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` atrybut](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={9} title="Pobierz bieżący locale w Server Actions" isOptional={true}>

Jeśli potrzebujesz aktywnego locale wewnątrz Server Action (np. do lokalizowania e-maili lub uruchamiania logiki zależnej od locale), wywołaj `getLocale` z `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Zrób coś z locale
};
```

> Funkcja `getLocale` stosuje strategię kaskadową, aby określić locale użytkownika:
>
> 1. Najpierw sprawdza nagłówki żądania w poszukiwaniu wartości locale, która mogła zostać ustawiona przez proxy
> 2. Jeśli w nagłówkach nie znaleziono locale, szuka wartości locale przechowywanej w cookies
> 3. Jeśli nie znaleziono cookie, próbuje wykryć preferowany język użytkownika na podstawie ustawień przeglądarki
> 4. W ostateczności używa domyślnego locale skonfigurowanego w aplikacji
>
> Zapewnia to wybór najbardziej odpowiedniej lokalizacji w oparciu na dostępnym kontekście.

</Step>

<Step number={10} title="Optymalizacja rozmiaru bundla" isOptional={true}>

Podczas używania `next-intlayer`, słowniki są domyślnie dołączane do bundla dla każdej strony. Aby zoptymalizować rozmiar bundla, Intlayer udostępnia opcjonalny plugin SWC, który inteligentnie zastępuje wywołania `useIntlayer` za pomocą makr. Dzięki temu słowniki są dołączane tylko do bundli stron, które faktycznie ich używają.

Aby włączyć tę optymalizację, zainstaluj pakiet `@intlayer/swc`. Po zainstalowaniu `next-intlayer` automatycznie wykryje i użyje pluginu:

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

> Uwaga: Ten pakiet nie jest instalowany domyślnie, ponieważ wtyczki SWC są w Next.js wciąż eksperymentalne. Może to ulec zmianie w przyszłości.

> Uwaga: Jeśli ustawisz opcję na `importMode: 'dynamic'` lub `importMode: 'fetch'` (in the `dictionary` configuration), będzie to polegać na Suspense, więc będziesz musiał otoczyć wywołania `useIntlayer` granicą `Suspense`. To oznacza, że nie będziesz mógł używać `useIntlayer` bezpośrednio na najwyższym poziomie komponentu Page lub Layout.
> </Step>

</Steps>

### Monitorowanie zmian słowników w Turbopack

Jeśli używasz Turbopack jako serwera deweloperskiego z poleceniem `next dev`, zmiany w słownikach nie będą domyślnie wykrywane automatycznie.

To ograniczenie wynika z faktu, że Turbopack nie może uruchamiać wtyczek webpack równolegle w celu monitorowania zmian w plikach z treścią. Aby to obejść, musisz użyć polecenia `intlayer watch`, aby uruchomić jednocześnie serwer deweloperski i obserwator budowania Intlayer.

```json5 fileName="package.json"
{
  // ... Twoje istniejące konfiguracje package.json
  "scripts": {
    // ... Twoje istniejące konfiguracje skryptów
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Jeśli używasz next-intlayer@<=6.x.x, musisz zachować flagę `--turbopack`, aby aplikacja Next.js 16 działała poprawnie z Turbopack. Zalecamy użycie next-intlayer@>=7.x.x, aby uniknąć tego ograniczenia.

### Konfiguracja TypeScript

Intlayer używa module augmentation, aby skorzystać z zalet TypeScript i wzmocnić swoją codebase.

![Autouzupełnianie](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Błąd tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Upewnij się, że Twoja konfiguracja TypeScript zawiera autogenerowane typy.

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Dołącz auto-generowane typy
  ],
}
```

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwoli to uniknąć ich zatwierdzania do Twojego repozytorium Git.

Aby to zrobić, możesz dodać następujące wpisy do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby ulepszyć doświadczenie programistyczne z Intlayer, możesz zainstalować oficjalne rozszerzenie **Intlayer VS Code Extension**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie udostępnia:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy inline** przetłumaczonej zawartości.
- **Szybkie akcje** umożliwiające łatwe tworzenie i aktualizowanie tłumaczeń.

Aby uzyskać więcej informacji o korzystaniu z rozszerzenia, zapoznaj się z dokumentacją [Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

### Dalsze kroki

Aby pójść dalej, możesz wdrożyć [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub zewnętrznie przechowywać swoją zawartość za pomocą [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).
