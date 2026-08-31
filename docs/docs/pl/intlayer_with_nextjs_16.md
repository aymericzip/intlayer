---
createdAt: 2024-12-06
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
applicationTemplate: https://github.com/aymericzip/intlayer-next-16-template
applicationShowcase: https://intlayer-next-16-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizacja użycia API useIntlayer w Solid do bezpośredniego dostępu do właściwości"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Dodaj polecenie init"
  - version: 7.0.6
    date: 2025-11-01
    changes: "Dodano wzmiankę o `x-default` w obiekcie `alternates`"
  - version: 7.0.0
    date: 2025-06-29
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Przetłumacz swoją stronę Next.js 16 za pomocą Intlayer | Internacjonalizacja (i18n)

<Tabs defaultTab="video">
  <Tab label="Wideo" value="video">

<iframe title="Najlepsze rozwiązanie i18n dla Next.js? Odkryj Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak zinternacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-next-16-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-next-16-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-next-16-template) na GitHubie.

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

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji Next.js

<Steps>

<Step number={1} title="Zainstaluj zależności">

Zainstaluj niezbędne pakiety za pomocą npm:

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

  Podstawowy pakiet, który dostarcza narzędzia do internacjonalizacji dla zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilacji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **next-intlayer**

  Pakiet integrujący Intlayer z Next.js. Dostarcza dostawców kontekstu oraz hooki do internacjonalizacji w Next.js. Dodatkowo zawiera wtyczkę Next.js do integracji Intlayer z [Webpack](https://webpack.js.org/) lub [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), a także proxy do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami oraz obsługi przekierowań URL.

</Step>

<Step number={2} title="Skonfiguruj swój projekt">

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

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Dzięki temu plikowi konfiguracyjnemu możesz ustawić lokalizowane adresy URL, przekierowania proxy, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji zawartości, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Step>

<Step number={3} title="Zintegruj Intlayer w konfiguracji Next.js">

Skonfiguruj swoje środowisko Next.js, aby korzystało z Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* opcje konfiguracji tutaj */};

export default withIntlayer(nextConfig);
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

</Step>

<Step number={4} title="Zdefiniuj dynamiczne trasy lokalizacji">

Usuń wszystko z `RootLayout` i zastąp to następującym kodem:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Nadal możesz opakować dzieci innymi dostawcami, takimi jak `next-themes`, `react-query`, `framer-motion` itp.
  <>{children}</>
);

export default RootLayout;
```

> Pozostawienie komponentu `RootLayout` pustym pozwala na ustawienie atrybutów [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) oraz [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) dla tagu `<html>`.

Aby zaimplementować dynamiczne routowanie, podaj ścieżkę dla lokalizacji, dodając nowy layout w katalogu `[locale]`:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Pojedynczy `IntlayerProvider` obejmuje obie połowy drzewa: inicjuje kontekst serwera o zakresie żądania czytany przez server hooks i montuje client provider, aby komponenty klienta otrzymały to samo locale.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { type NextLayoutIntlayer, IntlayerClientProvider } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

 </Tab>
</Tabs>

> Segment ścieżki `[locale]` służy do określenia lokalizacji. Przykład: `/en-US/about` odnosi się do `en-US`, a `/fr/about` do `fr`.

> Na tym etapie napotkasz błąd: `Error: Missing <html> and <body> tags in the root layout.`. Jest to oczekiwane, ponieważ plik `/app/page.tsx` nie jest już używany i można go usunąć. Zamiast tego segment ścieżki `[locale]` aktywuje stronę `/app/[locale]/page.tsx`. W konsekwencji strony będą dostępne pod ścieżkami takimi jak `/en`, `/fr`, `/es` w Twojej przeglądarce. Aby ustawić domyślny język jako stronę główną, odnieś się do konfiguracji `proxy` w kroku 7.

Następnie zaimplementuj funkcję `generateStaticParams` w układzie aplikacji.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
export { generateStaticParams } from "next-intlayer"; // Linia do dodania

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  /*... Reszta kodu*/
};

export default LocaleLayout;
```

> `generateStaticParams` zapewnia, że Twoja aplikacja wstępnie buduje niezbędne strony dla wszystkich lokalizacji, zmniejszając obciążenie podczas działania i poprawiając doświadczenie użytkownika. Aby uzyskać więcej informacji, zapoznaj się z [dokumentacją Next.js dotyczącą generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

> Intlayer działa z `export const dynamic = 'force-static';`, aby zapewnić, że strony są wstępnie zbudowane dla wszystkich lokalizacji.

</Step>

<Step number={5} title="Zadeklaruj swoją zawartość">

Utwórz i zarządzaj deklaracjami zawartości, aby przechowywać tłumaczenia:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> Twoje deklaracje zawartości mogą być definiowane w dowolnym miejscu w aplikacji, pod warunkiem, że zostaną umieszczone w katalogu `contentDir` (domyślnie `./src`). I będą miały rozszerzenie pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Aby uzyskać więcej szczegółów, zapoznaj się z [dokumentacją deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

</Step>

<Step number={6} title="Wykorzystaj zawartość w swoim kodzie">

Uzyskaj dostęp do swoich słowników zawartości w całej aplikacji:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

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

- **`IntlayerProvider`** jest montowany raz, w układzie locale. Dostarcza locale zarówno komponentom serwerowym, jak i klienckim, więc strony nie owijają się już same w sobie.
- Hooki serwerowe rozwiązują locale w następującej kolejności: locale przekazany w miejscu wywołania, następnie kontekst serwera zainicjalizowany przez provider, następnie locale przeniesiony w żądaniu (nagłówek `x-intlayer-locale` ustawiony przez proxy Intlayer, następnie ciasteczko locale). Ten ostatni krok to to, co zapewnia, że zawartość pozostaje poprawna podczas nawigacji po stronie klienta, która ponownie renderuje tylko segment strony, gdzie układ — i wraz z nim provider — nie jest ponownie uruchamiany.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer } from "next-intlayer";
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

      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** służy do dostarczania lokalizacji komponentom po stronie klienta. Może być umieszczony w dowolnym komponencie nadrzędnym, w tym w layoucie. Jednak zaleca się umieszczenie go w layoucie, ponieważ Next.js współdzieli kod layoutu między stronami, co jest bardziej efektywne. Używając `IntlayerClientProvider` w layoucie, unikasz ponownej inicjalizacji dla każdej strony, poprawiając wydajność i utrzymując spójny kontekst lokalizacji w całej aplikacji.
- **`IntlayerServerProvider`** służy do dostarczania lokalizacji komponentom po stronie serwera. Nie może być ustawiony w layoucie.

  > Layout i strona nie mogą dzielić wspólnego kontekstu serwera, ponieważ system kontekstu serwera opiera się na magazynie danych na żądanie (za pomocą mechanizmu [React's cache](https://react.dev/reference/react/cache)), co powoduje, że każdy "kontekst" jest tworzony na nowo dla różnych segmentów aplikacji. Umieszczenie providera w wspólnym layoucie złamałoby tę izolację, uniemożliwiając prawidłowe propagowanie wartości kontekstu serwera do komponentów serwerowych.

 </Tab>
</Tabs>

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

> `next-intlayer` to izomorficzna ścieżka importu: warunek eksportu `react-server` zapewnia komponentom serwerowym implementację ambient-locale, podczas gdy komponenty klienckie otrzymują implementację opartą na kontekście. To samo wywołanie działa po obu stronach.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

 </Tab>
</Tabs>

> Jeśli chcesz użyć swojej zawartości w atrybucie `string`, takim jak `alt`, `title`, `href`, `aria-label` itp., musisz wywołać wartość funkcji, na przykład:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Aby dowiedzieć się więcej o hooku `useIntlayer`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useIntlayer.md).

> Jeśli Twoja aplikacja już istnieje, możesz użyć [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) w połączeniu z [poleceniem extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md), aby przekonwertować tysiące komponentów w jedną sekundę.

</Step>

<Step number={7} title="Konfiguracja proxy do wykrywania lokalizacji" isOptional={true}>

Skonfiguruj proxy, aby wykrywać preferowaną lokalizację użytkownika:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` służy do wykrywania preferowanego języka użytkownika i przekierowywania go na odpowiedni adres URL, zgodnie z [konfiguracją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md). Dodatkowo umożliwia zapisywanie preferowanego języka użytkownika w ciasteczku.

> Od wersji Intlayer v9, to middleware respektuje opcję `routing.enableProxy` (`true` domyślnie). Ustaw `routing.enableProxy: false` w swojej konfiguracji, aby przekształcić go w pass-through bez usuwania tego pliku. Zapoznaj się z [notatkami wydania v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/releases/v9.md).

> Jeśli potrzebujesz łączyć kilka proxy razem (na przykład `intlayerProxy` z uwierzytelnianiem lub niestandardowymi proxy), Intlayer udostępnia teraz pomocnika o nazwie `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="Internacjonalizacja metadanych" isOptional={true}>

W przypadku, gdy chcesz internacjonalizować swoje metadane, takie jak tytuł Twojej strony, możesz użyć funkcji `generateMetadata` dostarczanej przez Next.js. Wewnątrz możesz pobrać zawartość z funkcji `getIntlayer`, aby przetłumaczyć swoje metadane.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> Zauważ, że funkcja `getIntlayer` zaimportowana z `next-intlayer` zwraca Twoją zawartość opakowaną w `IntlayerNode`, co pozwala na integrację z edytorem wizualnym. Natomiast funkcja `getIntlayer` zaimportowana z `intlayer` zwraca Twoją zawartość bezpośrednio bez dodatkowych właściwości.

> Dowiedz się więcej o optymalizacji metadanych [w oficjalnej dokumentacji Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

</Step>

<Step number={9} title="Internacjonalizacja sitemap.xml i robots.txt" isOptional={true}>

Aby zinternacjonalizować swoje pliki `sitemap.xml` i `robots.txt`, możesz użyć funkcji `getMultilingualUrls` dostarczonej przez Intlayer. Ta funkcja pozwala na generowanie wielojęzycznych adresów URL dla Twojej mapy witryny.

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

> Dowiedz się więcej o optymalizacji mapy witryny [w oficjalnej dokumentacji Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Dowiedz się więcej o optymalizacji pliku robots.txt [w oficjalnej dokumentacji Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

</Step>

<Step number={10} title="Zmień język swojej zawartości" isOptional={true}>

Aby zmienić język swojej zawartości w Next.js, zalecanym sposobem jest użycie komponentu `Link` do przekierowania użytkowników na odpowiednią zlokalizowaną stronę. Komponent `Link` umożliwia wstępne pobieranie strony, co pomaga uniknąć pełnego przeładowania strony.

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

import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Reszta kodu

const { setLocale } = useLocale();

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

</Step>

<Step number={11} title="Tworzenie zlokalizowanego komponentu Link" isOptional={true}>

Aby upewnić się, że nawigacja w Twojej aplikacji szanuje bieżącą lokalizację, możesz stworzyć niestandardowy komponent `Link`. Ten komponent automatycznie poprzedza wewnętrzne adresy URL bieżącym językiem. Na przykład, gdy użytkownik francuskojęzyczny kliknie w link do strony "O nas", zostanie przekierowany do `/fr/about` zamiast do `/about`.

To zachowanie jest przydatne z kilku powodów:

- **SEO i doświadczenie użytkownika**: Zlokalizowane adresy URL pomagają wyszukiwarkom poprawnie indeksować strony specyficzne dla danego języka i dostarczają użytkownikom treści w ich preferowanym języku.
- **Spójność**: Korzystając ze zlokalizowanego linku w całej aplikacji, gwarantujesz, że nawigacja pozostaje w obrębie bieżącej lokalizacji, zapobiegając nieoczekiwanym zmianom języka.
- **Utrzymywalność**: Centralizacja logiki lokalizacji w jednym komponencie upraszcza zarządzanie adresami URL, czyniąc Twoją bazę kodu łatwiejszą w utrzymaniu i rozbudowie w miarę rozwoju aplikacji.

Poniżej znajduje się implementacja zlokalizowanego komponentu `Link` w TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
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

</Step>

<Step number={12} title="Pobierz bieżącą lokalizację w Server Actions" isOptional={true}>

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

</Step>

<Step number={13} title="Zoptymalizuj rozmiar bundle'a" isOptional={true}>

Podczas korzystania z `next-intlayer`, słowniki są domyślnie dołączane do pakietu dla każdej strony. Aby zoptymalizować rozmiar bundle'a, Intlayer dostarcza opcjonalną wtyczkę SWC, która inteligentnie zastępuje wywołania `useIntlayer` za pomocą makr. Gwarantuje to, że słowniki są dołączane tylko do pakietów stron, które faktycznie ich używają.

Aby włączyć tę optymalizację, zainstaluj pakiet `@intlayer/swc`. Po zainstalowaniu, `next-intlayer` automatycznie wykryje i użyje wtyczki:

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

> Uwaga: Ten pakiet nie jest instalowany domyślnie, ponieważ wtyczki SWC są nadal eksperymentalne w Next.js. Może się to zmienić w przyszłości.

> Uwaga: Jeśli ustawisz opcję `importMode: 'dynamic'` lub `importMode: 'fetch'` (w konfiguracji `dictionary`), będzie ona polegać na Suspense, więc będziesz musiał opakować wywołania `useIntlayer` w granicę `Suspense`. Oznacza to, że nie będziesz mógł używać `useIntlayer` bezpośrednio na najwyższym poziomie komponentu Page / Layout.
> </Step>

</Step>

<Step number={14} title="Wyodrębnij zawartość swoich komponentów" isOptional={true}>

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
 <Tab value='Polecenie wyodrębniania'>

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
 <Tab value='Kompilator Babel'>

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

## Często Zadawane Pytania

<FAQ>

<Question title="Jakie są różne rozwiązania dostępne do internacjonalizacji aplikacji Next.js?">

Next.js nie posiada wbudowanej warstwy komunikatów, odkąd pole `i18n` w `next.config.js` przestało mieć zastosowanie w App Routerze. Dlatego wybór warstwy lokalizacji zawsze opiera się na bibliotece:

- **`next-intl`**, **`i18next` / `next-i18next`** oraz **`react-intl`**: tradycyjne rozwiązania oparte na katalogach komunikatów JSON lub ICU ładowanych według przestrzeni nazw (namespaces).
- **`Lingui`**: rozwiązanie oparte na ekstrakcji, z komunikatami ICU kompilowanymi w czasie budowy.
- **`Intlayer`**: najbardziej zaawansowane rozwiązanie. Zawartość deklarowana w dowolnym miejscu bazy kodu ([obok każdego komponentu lub centralnie](https://intlayer.org/blog/per-component-vs-centralized-i18n)), kompilowana w czasie budowy do słowników per komponent, w pełni typowana, z wbudowanym tłumaczeniem AI, edytorem wizualnym i CMS-em.

Praktyczna różnica polega na tym, co trafia do przeglądarki. Biblioteki oparte na namespace'ach wysyłają całe katalogi JSON na stronę, podczas gdy Intlayer dostarcza tylko treść, z której korzystają renderowane komponenty, co zmniejsza rozmiar bundle'a i strony nawet o 50%. Zobacz [dlaczego Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md) oraz [benchmark i18n dla Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md).

</Question>

<Question title="Ile i18n dodaje do rozmiaru bundle'a Next.js?">

Znacznie mniej niż konfiguracja oparta na namespace'ach, ponieważ strona nigdy nie pobiera katalogu, którego nie renderuje. Komponenty serwerowe (Server Components) rozwiązują swoją zawartość bezpośrednio na serwerze, a kompilator w czasie budowy zastępuje wywołania `useIntlayer` dokładnymi wpisami ze słownika, których używa dany komponent. Dzięki temu nieużywane klucze i nieużywane języki są usuwane, a [dynamiczne słowniki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md) dzielą resztę per lokalizacja. W porównaniu ze standardowymi rozwiązaniami Intlayer zmniejsza rozmiar bundle'a i strony nawet o 50%. Zobacz [optymalizację bundle'a](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) oraz [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md).

</Question>

<Question title="Czy mogę przeprowadzić migrację z next-intl, next-i18next lub i18next bez przepisywania komponentów?">

Tak, i istnieją dwie ścieżki. Możesz migrować zawartość stopniowo za pomocą [przewodnika migracji z next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-intl_to_intlayer.md) lub [przewodnika migracji z i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md). Możesz także zachować obecne API w całości: [adaptery zgodności (compat adapters)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md) udostępniają dokładnie to samo API co `next-intl`, `react-i18next` i `react-intl`, ale obsługiwane przez słowniki Intlayer, dzięki czemu zmieniają się tylko importy, a kod komponentów pozostaje bez zmian.

</Question>

<Question title="Czy mogę zachować moje istniejące pliki tłumaczeń JSON?">

Tak. [Wtyczka synchronizacji JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) utrzymuje Twoje pliki `/messages/{locale}/{namespace}.json` jako źródło prawdy i generuje z nich słowniki Intlayer w obu kierunkach. [Wtyczka synchronizacji PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md) robi to samo dla katalogów gettext, a [pliki według lokalizacji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/per_locale_file.md) pozwalają rozdzielić treść według języka zamiast grupować wszystkie lokalizacje w jednym pliku.

</Question>

<Question title="Czy muszę przenosić moją treść klucz po kluczu?">

Nie. Uruchom `npx intlayer extract`, a Intlayer odczyta Twoje komponenty, wyodrębni ciągi tekstowe widoczne dla użytkownika i utworzy plik `.content` obok każdego z nich, dzięki czemu przeglądasz diff zamiast ręcznie kopiować ciągi do katalogu. Krok 14 tego przewodnika opisuje ten proces szczegółowo.

W przypadku w pełni zautomatyzowanego procesu [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) robi to samo w czasie kompilacji: skanuje kod JSX, TSX, Vue i Svelte przy każdej zmianie, generuje słowniki i utrzymuje je w synchronizacji przez HMR (Hot Module Replacement), eliminując konieczność ręcznego zarządzania kluczami.

Przed włączeniem kompilatora warto znać dwa ograniczenia. Działa on poprzez analizę statyczną, więc ciągi tekstowe istniejące wyłącznie w czasie wykonywania (np. kody błędów z API lub pola CMS) pozostają poza zasięgiem. Wymaga również kilku adnotacji w dużej bazie kodu, aby odróżnić tekst dla użytkownika od logiki aplikacji (takiej jak `className="active"` czy kod statusu). [Polecenie extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md) unika obu tych ograniczeń, pozostawiając Ci pełną kontrolę.

</Question>

<Question title="Jakie narzędzia dla edytorów i agentów AI są dostępne?">

Pięć narzędzi, wszystkie opcjonalne:

- **[Rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)**: przejście od klucza `useIntlayer` do pliku deklaracji zawartości, ekstrakcja zawartości z komponentu oraz uruchamianie poleceń build, fill, test, push i pull z palety poleceń lub dedykowanej karty Intlayer.
- **[Serwer LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**: te same możliwości w dowolnym edytorzu obsługującym protokół LSP, w tym przejście do definicji, wyszukiwanie referencji, podgląd przetłumaczonych wartości po najechaniu kursorem, autouzupełnianie kluczy i pól oraz ostrzeżenia o niezadeklarowanych kluczach. Rozpoznaje również wywołania `i18next`, `react-i18next`, `next-intl` i `use-intl`, ułatwiając migrację.
- **[Serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)**: udostępnia dokumentację i CLI Intlayer dla Cursor, VS Code, Claude Desktop, Claude Code i ChatGPT, dzięki czemu asystenci odpowiadają na podstawie aktualnej dokumentacji i mogą bezpośrednio uruchamiać polecenia takie jak `intlayer fill`.
- **[Umiejętności agentów (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**: wyspecjalizowane umiejętności, takie jak `intlayer-config`, `intlayer-cli` i `intlayer-content`, oraz dedykowane dla każdego frameworka, które uczą agenta konfiguracji routingu i typów węzłów treści.
- **[Wtyczka ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md)**: reguła `no-raw-text` wykrywa zahardkodowane ciągi tekstowe, z dodatkowymi regułami dla statycznych kluczy słowników i nieużywanej zawartości.

</Question>

<Question title="Czy Intlayer współpracuje z App Routerem Next.js i React Server Components?">

Tak. Pakiet `next-intlayer` został stworzony specjalnie dla App Routera: zawartość jest rozwiązywana na serwerze wewnątrz Server Components, dzięki czemu żaden słownik nie jest wysyłany do klienta dla tekstu renderowanego po stronie serwera. Komponenty klienckie korzystają z tego samego hooka `useIntlayer` za pośrednictwem dostawcy kontekstu (provider). Intlayer nie blokuje statycznego renderowania i jest w pełni kompatybilny z Turbopack.

</Question>

<Question title="Które wersje Next.js są obsługiwane przez Intlayer?">

Intlayer obsługuje Next.js 12, 13, 14, 15 oraz 16. Ten przewodnik dotyczy Next.js 16. W przypadku starszych wersji zapoznaj się z [przewodnikiem po Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_15.md), [przewodnikiem po Next.js 14](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_14.md) lub [przewodnikiem po Pages Routerze](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_page_router.md).

</Question>

<Question title="Czy muszę umieszczać lokalizację w adresie URL, np. /fr/about?">

Nie. Schemat adresów URL jest opcją konfiguracyjną, a nie ograniczeniem. Opcja `routing.mode` przyjmuje:

- `"prefix-no-default"` (domyślnie): `/about` dla domyślnego języka, `/fr/about` dla pozostałych.
- `"prefix-all"`: każda lokalizacja ma prefiks, np. `/en/about` i `/fr/about`.
- `"no-prefix"`: brak prefiksu lokalizacji w ścieżce; język jest rozwiązywany z ciasteczek, nagłówków lub domeny.
- `"search-params"`: `/about?locale=fr`.

Możesz także przypisać każdą lokalizację do osobnej domeny za pomocą `routing.domains`. Zobacz [referencję konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md) oraz [przewodnik bez prefiksu w ścieżce](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_no_locale_path.md).

</Question>

<Question title="Jak dodać tagi hreflang i zlokalizowane metadane dla SEO?">

Użyj funkcji `generateMetadata` w Next.js wraz z funkcją `getMultilingualUrls` z pakietu Intlayer. Tworzy ona mapę `alternates.languages` dla każdej zadeklarowanej lokalizacji, włącznie z wpisem `x-default`, dzięki czemu wyszukiwarki serwują właściwą wersję językową. Ten sam helper lokalizuje pliki `sitemap.ts` i `robots.ts`. Kroki 8 i 9 tego przewodnika przedstawiają pełny kod implementacji.

</Question>

<Question title="Jak automatycznie przetłumaczyć aplikację Next.js za pomocą AI?">

Uruchom `npx intlayer fill`. CLI wykrywa brakujące tłumaczenia w Twoich plikach zawartości i uzupełnia je przy użyciu wybranego modelu LLM, korzystając z Twojego własnego dostawcy i klucza API, dzięki czemu płacisz dostawcy bezpośrednio, a dane nie przechodzą przez podmioty trzecie. Zobacz [polecenie fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md) oraz [integrację CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/CI_CD.md).

</Question>

<Question title="Czy Intlayer obsługuje formy mnogie, płeć, warunki i sformatowany tekst?">

Tak. Deklaracje zawartości obsługują [formy mnogie (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/plurial.md), [treści zależne od płci](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/gender.md), warunki, [wstawki (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/insertion.md) dla interpolowanych wartości oraz [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/markdown.md) dla formatowanego tekstu, takiego jak strony prawne czy wpisy na blogu. Liczby, daty i waluty są obsługiwane przez [formatery](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/formatters.md).

</Question>

<Question title="Jak tłumacze i osoby nietechniczne mogą edytować treść?">

Dostępne są dwie opcje, obie opcjonalne. [Edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) działa na Twojej własnej infrastrukturze i pozwala każdemu kliknąć tekst na działającej stronie, aby edytować go w miejscu. [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md) umożliwia externalizację treści, dzięki czemu można ją aktualizować bez ponownego wdrażania aplikacji, a funkcja [live sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/live.md) odzwierciedla zmiany w czasie rzeczywistym.

</Question>

<Question title="Jak wychwycić brakujące tłumaczenia przed wdrożeniem na produkcję?">

Uruchom `npx intlayer test` w procesie CI. Zwraca on błąd budowy, jeśli w zadeklarowanej lokalizacji brakuje treści, co uniemożliwia trafienie nieprzetłumaczonego tekstu na produkcję. [Rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md) wyświetla te same błędy bezpośrednio podczas pisania kodu, a [wtyczka ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md) i jej reguła `no-raw-text` wyłapują zahardkodowane teksty. Zobacz [testowanie zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/testing.md).

</Question>

<Question title="Czy Intlayer jest darmowy i open source?">

Tak. Intlayer jest projektem open source na licencji Apache 2.0. Cała biblioteka, CLI, edytor wizualny i kompilator są darmowe, także do projektów komercyjnych. Hostowany CMS jest opcjonalną płatną usługą, którą można również [hostować samodzielnie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md).

</Question>

</FAQ>
