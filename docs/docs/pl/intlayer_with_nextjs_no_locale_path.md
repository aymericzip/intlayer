---
createdAt: 2026-01-10
updatedAt: 2026-08-30
title: "Next.js 16 i18n - Kompletny przewodnik po tłumaczeniu swojej aplikacji"
description: "Koniec z i18next. Przewodnik 2026 do budowania wielojęzycznej (i18n) aplikacji Next.js 16. Tłumacz z agentami AI i optymalizuj rozmiar bundle, SEO i wydajność."
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
author: aymericzip
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

<AccordionGroup>

**Pełne pokrycie Next.js**

Intlayer jest zoptymalizowany do współpracy z **Server Components** w celu wydajnego renderowania i jest w pełni kompatybilny z [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). Nie blokuje renderowania statycznego i oferuje oprogramowanie pośredniczące oraz wszystkie funkcje potrzebne do skalowania internacjonalizacji (i18n).

> Intlayer jest kompatybilny z Next.js 12, 13, 14, 15 i 16. Jeśli używasz routera Next.js Pages Router, możesz zapoznać się z tym [przewodnikiem] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md).
> Routing lokalny jest przydatny ze względu na SEO, rozmiar bundle'a i wydajność. Jeśli go nie potrzebujesz, możesz zapoznać się z tym [przewodnikiem](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md).
> W przypadku Next.js 12, 13, 14 i 15 z App Router zapoznaj się z tym [przewodnikiem] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md).

</Accordion>

**Rozmiar bundle'a**

Zamiast ładować ogromne pliki JSON na swoje strony, ładuj tylko niezbędną treść. Intlayer pomaga **zmniejszyć rozmiary bundle'a i stron nawet o 50%**.

</Accordion>

**Łatwość konserwacji**

Określanie zakresu zawartości aplikacji **ułatwia konserwację** aplikacji na dużą skalę. Możesz powielić lub usunąć pojedynczy folder funkcji bez obciążania psychicznego koniecznością przeglądania całej bazy kodu zawartości. Dodatkowo Inlayer jest **w pełni napisany**, aby zapewnić dokładność treści.

**Agent AI**

<Accordion header="AI Agent">

Wspólna lokalizacja treści **zmniejsza potrzebny kontekst** dzięki modelom dużego języka (LLM). Intlayer zawiera także zestaw narzędzi, taki jak **CLI** do sprawdzania brakujących tłumaczeń**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)** i **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**, aby praca programisty (DX) była jeszcze płynniejsza dla agentów AI.

</Accordion>

**Automatyzacja**

Korzystaj z automatyzacji, aby tłumaczyć w swoim potoku CI/CD przy użyciu wybranego LLM na koszt dostawcy sztucznej inteligencji. Intlayer oferuje także **kompilator** do automatyzacji ekstrakcji treści, a także [platformę internetową] (https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md), która pomaga **tłumaczyć w tle**.

**Wydajność**

<Accordion header="Wydajność">

Łączenie ogromnych plików JSON z komponentami może prowadzić do problemów z wydajnością i reaktywnością. Inlayer optymalizuje ładowanie treści w czasie kompilacji.

</Accordion>

**Skalowanie bez użycia dewelopera**

Więcej niż tylko rozwiązanie i18n, Intlayer zapewnia **samodzielny [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** i **[pełny CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)**, który pomoże Ci zarządzać wielojęzyczną treścią w **w czasie rzeczywistym**, dzięki czemu współpraca z tłumaczami, copywriterami i innymi członkami zespołu będzie płynna. Treść może być przechowywana lokalnie i/lub zdalnie.

</Accordion>
</AccordionGroup>

---

## Krok po kroku: konfiguracja Intlayer w aplikacji Next.js

<Steps>

<Step number={1} title="Zainstaluj zależności">

Zainstaluj niezbędne pakiety używając npm:

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

const nextConfig: NextConfig = {/* opcje konfiguracji tutaj */};

export default withIntlayer(nextConfig);
```

> Wtyczka Next.js `withIntlayer()` służy do integracji Intlayer z Next.js. Zapewnia budowanie plików deklaracji treści i monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w środowiskach [Webpack](https://webpack.js.org/) lub [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Dodatkowo udostępnia aliasy w celu optymalizacji wydajności i zapewnia kompatybilność z komponentami po stronie serwera.

> Funkcja `withIntlayer()` jest funkcją asynchroniczną. Umożliwia przygotowanie słowników intlayer przed rozpoczęciem kompilacji. Jeśli chcesz użyć jej z innymi pluginami, możesz ją oczekiwać. Przykład:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Jeśli chcesz użyć jej synchronicznie, możesz użyć funkcji `withIntlayerSync()`. Przykład:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

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

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {5} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";
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
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

> Pojedynczy `IntlayerProvider` obejmuje obie połowy drzewa: inicjalizuje kontekst serwera o zasięgu żądania odczytywany przez hook'i serwera i montuje dostawcę klienta, aby komponenty klienta otrzymywały tę samą lokalizację.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
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

 </Tab>
</Tabs>

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

> Twoje deklaracje zawartości mogą być zdefiniowane w dowolnym miejscu aplikacji, pod warunkiem że zostaną umieszczone w katalogu `contentDir` (domyślnie `./src`) i mają odpowiednie rozszerzenie pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Po więcej informacji odwołaj się do [dokumentacji pliku deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

</Step>

<Step number={6} title="Wykorzystanie zawartości w kodzie">

Uzyskaj dostęp do swoich słowników zawartości w całej aplikacji:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { useIntlayer } from "next-intlayer";
import { NextPage } from "next";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

- **`IntlayerProvider`** jest montowany raz, w głównym layoutcie. Dostarcza locale zarówno do komponentów serwerowych, jak i klienckich, dzięki czemu strony nie muszą się już opakowywać.
- Bez segmentu ścieżki `[locale]` locale zawsze pochodzi z żądania — nagłówek `x-intlayer-locale` ustawiony przez proxy Intlayer, następnie ciasteczko locale — które hooki serwerowe czytają samodzielnie, gdy provider nie został uruchomiony.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

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

</Tab>
</Tabs>

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

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

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

> `next-intlayer` to izomorficzna ścieżka importu: warunek eksportu `react-server` zapewnia komponentom serwera implementację ambient-locale, podczas gdy komponenty klienta otrzymują implementację opartą na kontekście. To samo wywołanie działa po obu stronach.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

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

 </Tab>
</Tabs>

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

> Od Intlayer v9, to oprogramowanie pośredniczące respektuje opcję `routing.enableProxy` (`true` domyślnie). Ustaw `routing.enableProxy: false` w konfiguracji, aby przekształcić go w pass-through bez usuwania tego pliku. Zobacz [notatki wydania v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/releases/v9.md).

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

## Często Zadawane Pytania

<FAQ>

<Question title="Jakie są różne rozwiązania dostępne do internacjonalizacji aplikacji Next.js?">

Pole `i18n` w `next.config.js` nie ma zastosowania do App Routera, dlatego warstwa lokalizacji jest zawsze wyborem biblioteki:

- **`next-intl`**, **`next-i18next` / `i18next`** oraz **`react-intl`**: katalogi JSON lub ICU ładowane per przestrzeń nazw (namespace).
- **`Lingui`**: rozwiązanie oparte na ekstrakcji, z komunikatami ICU kompilowanymi w czasie budowania.
- **`Intlayer`**: najbardziej zaawansowane rozwiązanie. Treść deklarowana w dowolnym miejscu w bazie kodu ([obok każdego komponentu lub scentralizowana](https://intlayer.org/pl/blog/per-component-vs-centralized-i18n)) i kompilowana per-komponent, w pełni typowana, z wbudowanym tłumaczeniem AI, edytorem wizualnym i systemem CMS.

Ten przewodnik dotyczy konfiguracji bez lokalizacji w ścieżce URL. Zobacz [dlaczego Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md) oraz [benchmark i18n Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md).

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

<Question title="Dlaczego miałbym serwować aplikację bez lokalizacji w adresie URL?">

Ponieważ lokalizacja nie zawsze jest częścią tożsamości strony. Uwierzytelniony pulpit nawigacyjny (dashboard), wewnętrzne narzędzie lub aplikacja za ekranem logowania nie mają powodu, aby ujawniać `/pl/` w każdym adresie URL: język jest preferencją użytkownika, a nie odrębnym dokumentem. Rezygnacja z prefiksu pozwala również zachować jedną spójną strukturę tras, linków i analityki.

</Question>

<Question title="Jakie są konsekwencje SEO braku lokalizacji w adresie URL?">

Są one realne, dlatego należy podjąć tę decyzję świadomie. Bez unikalnego adresu URL dla każdego języka wyszukiwarki nie mają osobnej strony do zaindeksowania dla poszczególnych wersji, `hreflang` nie ma na co wskazywać, a robot widzi tylko język serwowany przez domyślne wykrywanie. Jest to zupełnie w porządku dla treści dostępnych po zalogowaniu, które i tak nie są indeksowane, ale nie sprawdzi się na publicznej stronie marketingowej czy w dokumentacji. Jeśli organiczny ruch z wyszukiwarek per język ma znaczenie, użyj konfiguracji z prefiksami opisanej w [przewodniku po Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md).

</Question>

<Question title="Jaka jest różnica między trybami no-prefix i search-params?">

Tryb `"no-prefix"` całkowicie usuwa lokalizację z adresu URL i ustala ją na podstawie ciasteczka, nagłówka lub domeny, więc wszystkie języki dzielą ten sam adres. Tryb `"search-params"` umieszcza ją w parametrze zapytania jako `/dashboard?locale=pl`, co daje każdemu językowi unikalny adres URL, który można udostępniać i dodawać do zakładek, bez modyfikowania drzewa tras. Wybierz `"search-params"`, jeśli zależy Ci na możliwości udostępniania linków w określonym języku.

</Question>

<Question title="W jaki sposób wykrywana jest wtedy lokalizacja?">

Ze źródeł zdefiniowanych w `routing.storage`, domyślnie najpierw z ciasteczka, a następnie z nagłówka `Accept-Language`, z powrotem do domyślnej lokalizacji. Krok 7 dodaje proxy, które to stosuje. Język wybrany bezpośrednio przez użytkownika zostaje zapisany, dzięki czemu jest zapamiętywany przy kolejnych wizytach. Zobacz [dokumentację konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Question>

<Question title="Czy zamiast tego mogę przypisać każdy język do jego własnej domeny?">

Tak, i jest to opcja warta rozważenia, jeśli rezygnujesz z prefiksu ze względów estetycznych, ale nadal zależy Ci na SEO. Opcja `routing.domains` mapuje lokalizację na nazwę hosta, dzięki czemu domena identyfikuje język, do ścieżki nie jest dodawany żaden prefiks, a każdy język otrzymuje indeksowalny adres URL, na który może wskazywać `hreflang`.

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
