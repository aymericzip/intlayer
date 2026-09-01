---
createdAt: 2025-03-25
updatedAt: 2026-08-25
title: "TanStack Start + Solid i18n - Kompletny przewodnik po tłumaczeniu swojej aplikacji"
description: "Koniec z i18next. Przewodnik 2026 do budowania wielojęzycznej (i18n) aplikacji TanStack Start + Solid. Tłumacz z agentami AI i optymalizuj rozmiar bundle, SEO i wydajność."
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - Routing językowy
slugs:
  - doc
  - environment
  - tanstack-start
  - solid
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
applicationShowcase: https://intlayer-tanstack-start-solid.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "Porównanie statycznego, dynamicznego i buforowanego dynamicznego rozwiązywania słowników metadanych w funkcjach head tras"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizacja użycia API useIntlayer w Solid do bezpośredniego dostępu do właściwości"
  - version: 8.5.1
    date: 2026-03-25
    changes: "Dodano dla Tanstack Start Solid.js"
author: aymericzip
---

# Przetłumacz swoją stronę Tanstack Start + Solid.js za pomocą Intlayer | Internacjonalizacja (i18n)

## Spis treści

<TOC/>

Ten przewodnik pokazuje, jak zintegrować **Intlayer** w celu zapewnienia bezproblemowej internacjonalizacji w projektach Tanstack Start z Solid.js, z routingiem uwzględniającym lokalizację, wsparciem TypeScript oraz nowoczesnymi praktykami programistycznymi.

## Dlaczego Interlayer zamiast alternatyw?

W porównaniu do głównych rozwiązań, takich jak „react-i18next” lub „i18next”, Intlayer jest rozwiązaniem wyposażonym w zintegrowane optymalizacje, takie jak:

<AccordionGroup>
<Accordion header="Pełne pokrycie TanStack Start">

Intlayer jest zoptymalizowany do doskonałej współpracy z TanStack Start i Solid, oferując **routing wielojęzyczny**, **mapę witryny** i wszystkie funkcje potrzebne do skalowania internacjonalizacji (i18n).

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

## Przewodnik krok po kroku dotyczący konfiguracji Intlayer w aplikacji Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Wideo" value="video">

<iframe title="Najlepsze rozwiązanie i18n dla Tanstack Start? Odkryj Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-solid-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak umiędzynarodowić swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-solid.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-solid-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Zobacz [Szablon Aplikacji](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) na GitHubie.

<Steps>

<Step number={1} title="Utworzenie projektu">

Najpierw utwórz nowy projekt TanStack Start, postępując zgodnie z przewodnikiem [Rozpoczęcie nowego projektu](https://tanstack.com/start/latest/docs/framework/solid/quick-start) na stronie TanStack Start.

</Step>

<Step number={2} title="Instalacja pakietów Intlayer">

Zainstaluj niezbędne pakiety za pomocą preferowanego menedżera pakietów:

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
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Rdzeń pakietu, który dostarcza narzędzia internacjonalizacji do zarządzania konfiguracją, tłumaczeniami, [deklaracją treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilacją oraz [poleceniami CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **solid-intlayer**
  Pakiet integrujący Intlayer z aplikacją Solid. Dostarcza dostawców kontekstu (context providers) i hooki do internacjonalizacji w Solid.

- **vite-intlayer**
  Zawiera wtyczkę Vite do integracji Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami (cookies) i obsługi przekierowań adresów URL.

</Step>

<Step number={3} title="Konfiguracja Twojego projektu">

Utwórz plik konfiguracyjny, aby ustawić języki Twojej aplikacji:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> Za pomocą tego pliku konfiguracyjnego możesz skonfigurować zlokalizowane adresy URL, przekierowania middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji treści, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Step>

<Step number={4} title="Integracja Intlayer w konfiguracji Vite">

Dodaj wtyczkę intlayer do swojej konfiguracji:

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

> Wtyczka `intlayer()` Vite jest używana do integracji Intlayer z Vite. Zapewnia ona budowanie plików deklaracji treści i monitoruje je w trybie deweloperskim. Definiuje ona zmienne środowiskowe Intlayer wewnątrz aplikacji Vite. Dodatkowo zapewnia aliasy w celu zmniejszenia narzutu wydajnościowego.

</Step>

<Step number={5} title="Utworzenie Root Layoutu">

Skonfiguruj swój layout główny (root layout), aby obsługiwał internacjonalizację, używając `useParams` do wykrywania bieżącego języka i ustawiając atrybuty `lang` oraz `dir` w tagu `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  getRouteApi,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { Suspense, type ParentComponent } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir } from "intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>
          <Suspense>{props.children}</Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
};
```

</Step>

<Step number={6} title="Utworzenie Layoutu Językowego">

Utwórz layout, który obsługuje prefiks językowy i wykonuje walidację. Ten layout zapewni, że przetwarzane będą tylko prawidłowe języki.

> Ten krok jest opcjonalny, jeśli nie potrzebujesz walidacji prefiksu języka na poziomie trasy.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Walidacja prefiksu języka
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
        replace: true,
      });
    }
  },
  component: Outlet,
});
```

> Tutaj `{-$locale}` jest dynamicznym parametrem trasy, który jest zastępowany przez aktualny język. Ta notacja sprawia, że slot jest opcjonalny, co pozwala na współpracę z trybami routingu takimi jak `'prefix-no-default'` itp.

> Bądź świadomy, że ten slot może powodować problemy, jeśli używasz wielu dynamicznych segmentów w tej samej trasie (np.: `/{-$locale}/other-path/$anotherDynamicPath/...`).
> Dla trybu `'prefix-all'` możesz preferować zamianę slotu na `$locale`.
> Dla trybu `'no-prefix'` lub `'search-params'` możesz całkowicie usunąć ten slot.

</Step>

<Step number={7} title="Zadeklaruj swoją treść">

Twórz i zarządzaj swoimi deklaracjami treści, aby przechowywać tłumaczenia:

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Twoje deklaracje treści mogą być definiowane w dowolnym miejscu w aplikacji, pod warunkiem, że znajdują się w katalogu `contentDir` (domyślnie `./app`) i pasują do rozszerzenia pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Więcej szczegółów znajdziesz w [dokumentacji deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

</Step>

<Step number={8} title="Wykorzystaj komponenty i hooki uwzględniające lokalizację">

Utwórz komponent `LocalizedLink` do nawigacji uwzględniającej język:

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkProps } from "@tanstack/solid-router";
import { getPrefix } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { JSX } from "solid-js";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps["to"]>;

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

export type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale()).localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to ?? ""}` as LinkProps["to"]}
    />
  );
};
```

Ten komponent służy dwóm celom:

- Usuwaniu niepotrzebnego prefiksu `{-$locale}` z adresu URL.
- Wstrzykiwaniu parametru lokalizacji do adresu URL, aby upewnić się, że użytkownik zostanie bezpośrednio przekierowany na zlokalizowaną trasę.

Następnie możemy utworzyć hook `useLocalizedNavigate` do nawigacji programowej:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/solid-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: string) => {
    const localizedTo = getLocalizedUrl(to, locale());
    return navigate({ to: localizedTo });
  };

  return localizedNavigate;
};
```

</Step>

<Step number={9} title="Użyj Intlayer na swoich stronach">

> Domyślnie używaj **`useIntlayer`**: to zalecany sposób odczytu treści wewnątrz komponentów, a kompilator rozwiązuje go do renderowanej lokalizacji. Po `getIntlayer` / `getIntlayerAsync` sięgaj tylko poza drzewem Solid: w `head` tras, loaderach i funkcjach serwerowych.

Zyskaj dostęp do słowników treści w całej aplikacji:

#### Zlokalizowana Strona Główna

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "@/components/LocalizedLink";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("index-page");

  return (
    <main>
      <h1>{content.heroTitle}</h1>
      <p>{content.heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content.navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content.navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> In Solid, `useIntlayer` returns reactive content (e.g., `content`). You can access its properties directly.
>
> Aby dowiedzieć się więcej o hooku `useIntlayer`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/solid-intlayer/useIntlayer.md).

</Step>

<Step number={10} title="Utworzenie komponentu Locale Switcher">

Utwórz komponent pozwalający użytkownikom na zmianę języka:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/solid-router";
import { getLocaleName, getPathWithoutLocale, getPrefix } from "intlayer";
import { For } from "solid-js";
import { useIntlayer, useLocale } from "solid-intlayer";
import { LocalizedLink, type To } from "./LocalizedLink";

export const LocaleSwitcher = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <LocalizedLink
            aria-current={localeEl === locale() ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale() as To}
          >
            {getLocaleName(localeEl)}
          </LocalizedLink>
        )}
      </For>
    </div>
  );
};

export default LocaleSwitcher;
```

> W plikach Solid, `locale` z `useLocale` to **signal accessor**. Użyj `locale()` (z nawiasami), aby reaktywnie odczytać jego aktualną wartość.
>
> Aby dowiedzieć się więcej o hooku `useLocale`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/solid-intlayer/useLocale.md).

</Step>

<Step number={11} title="Zarządzanie atrybutami HTML">

Jak pokazano w Kroku 5, możesz zarządzać atrybutami `lang` oraz `dir` tagu `html` za pomocą `useParams` w swoim głównym komponencie (root component). Dzięki temu prawidłowe atrybuty zostaną ustawione zarówno na serwerze, jak i na kliencie.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const params = localeRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

</Step>

<Step number={12} title="Dodaj Middleware">

Możesz również użyć `intlayerProxy`, aby dodać routing po stronie serwera do swojej aplikacji. Ten plugin automatycznie wykryje aktualny język na podstawie adresu URL i ustawi odpowiednie ciasteczko (cookie) języka. Jeśli nie określono języka, plugin określi najbardziej odpowiedni na podstawie preferencji językowych przeglądarki użytkownika. Jeśli nie zostanie wykryty żaden język, nastąpi przekierowanie do domyślnego języka.

> Zauważ, że aby korzystać z `intlayerProxy` w środowisku produkcyjnym, musisz przenieść pakiet `vite-intlayer` z `devDependencies` do `dependencies`.

> Od wersji Intlayer v9, `intlayerProxy()` jest zawarty bezpośrednio w pluginie `intlayer()` i domyślnie włączony za pomocą opcji `routing.enableProxy` (`true` domyślnie). Rejestrowanie go osobno, jak pokazano poniżej, jest teraz opcjonalne: jest utrzymywane dla wstecznej kompatybilności i dla konfiguracji, które muszą kontrolować kolejność pluginów. Ustaw `routing.enableProxy: false` aby zrezygnować. Przejdź do [notatek wydania v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/releases/v9.md).

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solid(),
  ],
});
```

</Step>

<Step number={13} title="Umiędzynarowienie metadanych">

<Tabs>

<Tab label="Rozwiązywanie statyczne" value="static">

`getIntlayer` rozwiązuje się synchronicznie względem **scalonego** słownika, czyli tego, który zawiera wszystkie zadeklarowane lokalizacje. `head` pozostaje synchroniczny i niczego nie oczekuje, ale cały wielojęzyczny słownik trafia do fragmentu trasy wysyłanego do przeglądarki.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

Najlepsze dla małych słowników metadanych, kilku lokalizacji lub na etapie prototypowania.

</Tab>

<Tab label="Rozwiązywanie dynamiczne" value="dynamic">

`getIntlayerAsync` (dostępny od **v9.4**) zachowuje się jak `getIntlayer`, ale wtyczka build wskazuje mu fragment per-lokalizacja w `.intlayer/dynamic_dictionaries/` zamiast scalonego słownika. Strona wysyła więc tylko tę lokalizację, którą renderuje. Ponieważ ten fragment ładowany jest na żądanie, `head` staje się `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

> Jeśli `head` czyta kilka słowników, rozwiąż je przez `Promise.all`; oczekiwanie na każde `getIntlayerAsync` w osobnej linii łańcuchuje żądania zamiast wykonywać je równolegle.

Kompromis: dynamiczny import jest rozwiązywany w trakcie działania `head`, na ścieżce krytycznej renderowania dokumentu. Na „zimnej” trasie opóźnia to `head` o kilka milisekund i może nieznacznie pogorszyć **LCP**.

</Tab>

<Tab label="Buforowane rozwiązywanie dynamiczne" value="cached">

Rozwiąż słownik w `loaderze` trasy i odczytaj go z `loaderData` w `head`. Loadery dopasowanych tras działają równolegle, a `staleTime: Infinity` informuje TanStack Router, że wynik nigdy się nie dezaktualizuje, fragment per-lokalizacja jest więc rozwiązywany raz, a potem serwowany z cache routera, pozostawiając `head` synchronicznym.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Resolved in parallel with the other matched routes, off the head critical path
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // The dictionary never changes for a given locale: resolve the chunk once
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // The path for this route

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: loaderData?.metaContent.title },
        {
          name: "description",
          content: loaderData?.metaContent.meta.description,
        },
      ],
    };
  },
});
```

> `head` może zostać wywołany zanim loader się rozwiąże, dlatego `loaderData` ma typ potencjalnie `undefined`. Zachowaj opcjonalne łańcuchowanie lub zwróć tytuł zapasowy.

Zachowujesz fragment per-lokalizacja, nie płacąc jego kosztu na ścieżce krytycznej `head`. Ceną jest DX: treść trzeba jawnie przekazać z loadera do `head` przez `loaderData`.

</Tab>

</Tabs>

### Które rozwiązywanie wybrać?

|                              | Rozwiązywanie statyczne | Rozwiązywanie dynamiczne                    | Buforowane rozwiązywanie dynamiczne     |
| ---------------------------- | ----------------------- | ------------------------------------------- | --------------------------------------- |
| API                          | `getIntlayer`           | `getIntlayerAsync` (v9.4+)                  | `getIntlayerAsync` w `loaderze` (v9.4+) |
| Sygnatura `head`             | synchroniczna           | `async`                                     | synchroniczna, czyta `loaderData`       |
| Wysyłane lokalizacje         | wszystkie zadeklarowane | tylko żądana lokalizacja                    | tylko żądana lokalizacja                |
| Nawigacje po stronie klienta | nic do rozwiązania      | wykonywane ponownie przy każdym dopasowaniu | serwowane z cache routera               |
| DX                           | najprostsze             | jeden `await`                               | treść przekazywana przez `loaderData`   |

</Step>

<Step number={14} title="Pobieranie języka w akcjach serwera">

Możesz chcieć uzyskać dostęp do bieżącego języka wewnątrz akcji serwera (server actions) lub punktów końcowych API.
Możesz to zrobić, używając pomocnika `getLocale` z `intlayer`.

Oto przykład użycia funkcji serwerowych TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Pobierz ciasteczko z żądania (domyślnie: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Pobierz nagłówek z żądania (domyślnie: 'x-intlayer-locale')
    // Fallback przy użyciu negocjacji Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Pobierz jakąś treść za pomocą getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

</Step>

<Step number={15} title="Zarządzanie stronami &quot;nie znaleziono&quot; (404)" isOptional={true}>

Gdy użytkownik odwiedzi nieistniejącą stronę, możesz wyświetlić niestandardową stronę 404, a prefiks językowy może wpływać na sposób wyzwalania strony 404.

#### Zrozumienie obsługi 404 w TanStack Router z prefiksami językowymi

W TanStack Router obsługa stron 404 ze zlokalizowanymi trasami wymaga podejścia wielowarstwowego:

1. **Dedykowana trasa 404**: Specyficzna trasa do wyświetlania interfejsu 404
2. **Walidacja na poziomie trasy**: Sprawdza prefiksy języka i przekierowuje nieprawidłowe na stronę 404
3. **Trasa catch-all**: Przechwytuje wszystkie niepasujące ścieżki wewnątrz segmentu językowego

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// To tworzy dedykowaną trasę /[locale]/404
// Jest używana zarówno jako bezpośrednia trasa, jak i importowana jako komponent w innych plikach
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Wyeksportowane oddzielnie, aby można było użyć ponownie w notFoundComponent i trasach catch-all
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad działa przed wyrenderowaniem trasy (zarówno serwer, jak i klient)
  // To idealne miejsce na walidację prefiksu języka
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix sprawdza, czy język jest prawidłowy zgodnie z Twoją konfiguracją intlayer
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Nieprawidłowy prefiks języka - przekieruj na stronę 404 z prawidłowym prefiksem
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent jest wywoływany, gdy trasa podrzędna nie istnieje
  // np.: /en/non-existent-page wyzwala to wewnątrz układu /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// Trasa $ (splat/catch-all) pasuje do każdej ścieżki, która nie pasuje do innych tras
// np.: /en/some/deeply/nested/invalid/path
// Zapewnia to, że WSZYSTKIE niepasujące ścieżki wewnątrz języka pokażą stronę 404
// Bez tego głębokie niepasujące ścieżki mogłyby pokazać pustą stronę lub błąd
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

</Step>

<Step number={16} title="Wyodrębnij treść ze swoich komponentów" isOptional={true}>

Jeśli masz istniejącą bazę kodu, transformacja tysięcy plików może być czasochłonna.

Aby ułatwić ten proces, Intlayer proponuje [kompilator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) / [ekstraktor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md) do transformacji komponentów i wyodrębnienia treści.

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
     * Wskazuje, czy komponenty powinny zostać zapisane po transformacji.
     *
     * - Jeśli `true`, kompilator nadpisze plik komponentu na dysku. W ten sposób transformacja będzie trwała, a kompilator pominie transformację przy następnym procesie. W ten sposób kompilator może przetransformować aplikację, a następnie można go usunąć.
     *
     * - Jeśli `false`, kompilator wstrzyknie wywołanie funkcji `useIntlayer()` do kodu tylko w danych wyjściowych buildu, zachowując bazową bazę kodu nienaruszoną. Transformacja zostanie wykonana tylko w pamięci.
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
 <Tab value='Polecenie extract'>

Uruchom ekstraktor, aby przetransformować swoje komponenty i wyodrębnić treść

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

Zaktualizuj swoje `vite.config.ts`, aby dołączyć wtyczkę `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
```

```bash packageManager="npm"
npm run build # Lub npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Lub pnpm run dev
```

```bash packageManager="yarn"
yarn build # Lub yarn dev
```

```bash packageManager="bun"
bun run build # Lub bun run dev
```

 </Tab>
</Tabs>

</Step>

<Step number={16} title="Wstępne renderowanie i generowanie mapy witryny">

Intlayer posiada wbudowany generator mapy witryny, który ułatwia tworzenie mapy witryny dla aplikacji. Obsługuje zlokalizowane trasy i dodaje niezbędne metadane dla wyszukiwarek.

> Mapa witryny generowana przez Intlayer obsługuje przestrzeń nazw `xhtml:link` (rozszerzenia Hreflang XML). W przeciwieństwie do domyślnych generatorów map witryn, które wymieniają tylko surowe adresy URL, Intlayer automatycznie tworzy wymagane dwukierunkowe linki między wszystkimi wersjami językowymi strony (np. `/about`, `/about?lang=fr` i `/about?lang=es`). Zapewnia to, że wyszukiwarki prawidłowo indeksują i serwują właściwą wersję językową dla właściwej grupy odbiorców.

Aby go użyć, musisz najpierw skonfigurować `vite.config.ts`, aby włączyć pre-rendering dla zlokalizowanych tras i wyłączyć domyślne generowanie sitemapy TanStack Start.

```typescript fileName="vite.config.ts"
import { localeMap, localeFlatMap } from "intlayer";
// ... inne importy

export const pathList = ["", "/about", "/404"];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig({
  plugins: [
    // ... inne pluginy
    tanstackStart({
      // ... inna konfiguracja
      sitemap: {
        enabled: false,
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        concurrency: 10,
      },
      pages: localizedPages,
    }),
  ],
});
```

Następnie utwórz trasę `src/routes/sitemap[.]xml.ts`, która używa funkcji `generateSitemap`:

```typescript fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/solid-router";
import { generateSitemap } from "intlayer";

const SITE_URL = "http://localhost:3000";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(
          [
            { path: "/", changefreq: "daily", priority: 1.0 },
            { path: "/about", changefreq: "monthly", priority: 0.8 },
          ],
          { siteUrl: SITE_URL }
        );

        return new Response(sitemap, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
```

</Step>

<Step number={17} title="Skonfiguruj TypeScript">

Intlayer używa rozszerzania modułów (module augmentation), aby czerpać korzyści z TypeScript i wzmocnić Twoją bazę kodu.

Upewnij się, że Twoja konfiguracja TypeScript zawiera automatycznie generowane typy:

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące ustawienia
  include: [
    // ... Twoje istniejące inkluzje
    ".intlayer/**/*.ts", // Uwzględnij automatycznie generowane typy
  ],
}
```

</Step>

</Steps>

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć zakomitowania ich do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

---

## Rozszerzenie VS Code

Aby poprawić swoje doświadczenia deweloperskie z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd wewnątrz linii (inline previews)** przetłumaczonej treści.
- **Szybkie akcje** do łatwego tworzenia i aktualizowania tłumaczeń.

Więcej szczegółów na temat korzystania z rozszerzenia znajdziesz w [dokumentacji rozszerzenia Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Idąc dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyeksportować swoją treść za pomocą [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

---

## Odniesienia do dokumentacji

- [Dokumentacja Intlayer](https://intlayer.org)
- [Dokumentacja Tanstack Start](https://tanstack.com/start/latest)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/solid-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/solid-intlayer/useLocale.md)
- [Deklaracja Treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md)
- [Konfiguracja](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)

## Często Zadawane Pytania

<FAQ>

<Question title="Jakie są różne rozwiązania dostępne do internacjonalizacji aplikacji TanStack Start i Solid?">

TanStack Start nie dostarcza własnej warstwy i18n, a ekosystem Solid ma ograniczone opcje:

- **`@solid-primitives/i18n`**: płaski słownik bez wsparcia dla SSR TanStack Start i bez typowania.
- **`Intlayer`**: najbardziej zaawansowane rozwiązanie. Treści deklarowane w dowolnym miejscu bazy kodu ([obok każdego komponentu lub centralnie](https://intlayer.org/blog/per-component-vs-centralized-i18n)) i kompilowane w czasie budowy, w pełni typowane, z tłumaczeniem AI, edytorem wizualnym i systemem CMS.

W TanStack Start i Solid Intlayer łączy SSR, prerenderowanie i sygnały Solid w spójną całość. Zobacz [dlaczego Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md).

</Question>

<Question title="O ile i18n zwiększa rozmiar mojego bundle'a w TanStack Start?">

Znacznie mniej niż rozwiązania oparte na przestrzeniach nazw, ponieważ strona nigdy nie pobiera katalogu, którego nie renderuje. Kompilator czasu budowy zastępuje wywołania `useIntlayer` dokładnymi wpisami ze słownika, których używa komponent, dzięki czemu nieużywane klucze i nieużywane języki są usuwane, a [słowniki dynamiczne](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md) dzielą resztę na poszczególne języki. W porównaniu z typowymi alternatywami, Intlayer zmniejsza rozmiar bundle'a i strony nawet o 50%. Zobacz [optymalizację bundle'a](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) oraz [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md).

</Question>

<Question title="Czy mogę zmigrować z @solid-primitives/i18n lub i18next bez przepisywania moich komponentów?">

W znacznej mierze tak. Postępuj zgodnie z [przewodnikiem migracji z i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md). Możesz także migrować stopniowo: [wtyczka synchronizacji JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) utrzymuje Twoje istniejące pliki JSON jako źródło prawdy i generuje z nich słowniki Intlayer.

</Question>

<Question title="Czy mogę zachować moje istniejące pliki tłumaczeń JSON?">

Tak. Wtyczka [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) utrzymuje Twoje pliki `/messages/{locale}/{namespace}.json` jako źródło prawdy i generuje z nich słowniki Intlayer w obu kierunkach. Wtyczka [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md) robi to samo dla katalogów gettext, a [pliki per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/per_locale_file.md) pozwalają rozdzielić zawartość według języka zamiast grupować lokalizacje w jednym pliku.

</Question>

<Question title="Czy muszę przenosić moją zawartość klucz po kluczu?">

Nie. Uruchom `npx intlayer extract`, a Intlayer odczyta Twoje komponenty, wyodrębni ciągi widoczne dla użytkownika i utworzy plik `.content` obok każdego z nich, dzięki czemu przeglądasz diff zamiast ręcznie kopiować ciągi do katalogu pojedynczo.

W przypadku w pełni zautomatyzowanego procesu [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) robi to samo w czasie budowania: skanuje kod JSX, TSX, Vue i Svelte przy każdej zmianie, generuje słowniki i utrzymuje je w synchronizacji za pośrednictwem hot module replacement, dzięki czemu nie trzeba w ogóle ręcznie utrzymywać kluczy.

Warto pamiętać o dwóch ograniczeniach przed włączeniem kompilatora. Działa on w oparciu o analizę statyczną, więc ciągi tekstowe istniejące tylko w czasie wykonywania, takie jak kody błędów API czy pola z CMS, pozostają poza jego zasięgiem. Musi on także odróżnić tekst dla użytkownika od logiki aplikacji, takiej jak `className="active"` czy kod stanu, co w dużej bazie kodu wymaga kilku adnotacji. Polecenie [extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md) unika obu tych problemów, pozostawiając Ci pełną kontrolę.

</Question>

<Question title="Jakie narzędzia dla edytora i agentów AI są dostępne?">

Pięć narzędzi, wszystkie opcjonalne:

- **[Rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)**: przejście od klucza `useIntlayer` do pliku treści, który go deklaruje, wyodrębnianie treści z komponentu oraz uruchamianie build, fill, test, push i pull z palety poleceń lub dedykowanej karty Intlayer.
- **[Serwer LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**: taka sama świadomość w dowolnym edytorze obsługującym LSP, z funkcjami przejdź do definicji (go to definition), znajdź wszystkie referencje, podglądem przetłumaczonej wartości po najechaniu kursorem, autouzupełnianiem kluczy i pól oraz ostrzeżeniem, gdy klucz nie jest nigdzie zadeklarowany. Rozpoznaje również wywołania `i18next`, `react-i18next`, `next-intl` i `use-intl`, co ułatwia migrację.
- **[Serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)**: udostępnia dokumentację i CLI Intlayer dla Cursor, VS Code, Claude Desktop, Claude Code i ChatGPT, dzięki czemu asystent odpowiada na podstawie aktualnej dokumentacji zamiast zgadywać i może samodzielnie wykonywać polecenia, takie jak `intlayer fill`.
- **[Umiejętności agenta (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**: wyspecjalizowane umiejętności, takie jak `intlayer-config`, `intlayer-cli` i `intlayer-content`, oraz po jednej dla każdego frameworka, które uczą agenta konfiguracji routingu i typów węzłów treści.
- **[Wtyczka ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md)**: reguła `no-raw-text` oznacza zakodowane na stałe ciągi tekstowe, z dodatkowymi regułami dla statycznych kluczy słownika i nieużywanej zawartości.

</Question>

<Question title="Czy Intlayer obsługuje renderowanie po stronie serwera (SSR) i prerenderowanie?">

Tak. Treść jest rozwiązywana podczas SSR, a krok 16 opisuje konfigurację prerenderowania, która generuje statyczny dokument na każdy język.

</Question>

<Question title="Czy zmiana lokalizacji powoduje ponowne wyrenderowanie całej aplikacji?">

Nie. Treść jest obsługiwana przez sygnały Solid, więc przełączenie języka aktualizuje tylko węzły DOM, które czytają zmienione wartości, bez przebudowywania drzewa komponentów.

</Question>

<Question title="Jak dodać tagi hreflang i zlokalizowaną mapę witryny?">

Użyj wbudowanej funkcji `generateSitemap` w trasie `src/routes/sitemap[.]xml.ts`. Emituje ona przestrzeń nazw `xhtml:link` dla każdego zadeklarowanego języka, co pozwala wyszukiwarkom poprawnie indeksować zlokalizowane strony.

</Question>

<Question title="Jak obsługiwać strony 404 na zlokalizowanych trasach?">

Krok 14 to opisuje. Funkcja `validatePrefix` sprawdza, czy segment języka w adresie URL jest zadeklarowanym językiem, zapobiegając renderowaniu błędnych stron.

</Question>

<Question title="Czy muszę umieszczać lokalizację w adresie URL?">

Nie. Opcja `routing.mode` przyjmuje `"prefix-no-default"` (domyślnie), `"prefix-all"`, `"no-prefix"` oraz `"search-params"`, a opcja `routing.domains` pozwala przypisać każdy język do własnej domeny. Zobacz [dokumentację konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Question>

<Question title="Jak zbudować przełącznik języka, który pozostaje na bieżącej trasie?">

Krok 9 przedstawia komponent. Hook `useLocale` udostępnia aktywny język, dostępne języki oraz setter, który zapisuje zmianę i aktualizuje trasę za pomocą `getLocalizedUrl`.

</Question>

<Question title="Jak automatycznie przetłumaczyć aplikację za pomocą AI?">

Uruchom `npx intlayer fill`. Narzędzie CLI wykrywa brakujące tłumaczenia i uzupełnia je za pomocą wybranego modelu LLM, korzystając z Twojego dostawcy i klucza API. Flaga `--git-diff` ogranicza operację do treści zmienionych na bieżącej gałęzi. Zobacz [polecenie fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md) oraz [integrację CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/CI_CD.md).

</Question>

<Question title="Czy Intlayer obsługuje formy mnogie, płeć i sformatowany tekst (rich text)?">

Tak: [formy mnogie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/plurial.md), [treści zależne od płci](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/gender.md), warunki, [wstawki (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/markdown.md) oraz [formatowania](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/formatters.md) dla liczb, dat i walut.

</Question>

<Question title="Jak tłumacze mogą edytować treść bez dotykania kodu?">

Za pośrednictwem [edytora wizualnego](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md), który działa na Twojej własnej infrastrukturze i pozwala każdemu edytować tekst bezpośrednio w działającej aplikacji, lub systemu [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md), który wyodrębnia treść, dzięki czemu może być zmieniana bez konieczności ponownego wdrażania.

</Question>

<Question title="Czy Intlayer jest darmowy i open source?">

Tak, na licencji Apache 2.0, włączając zastosowania komercyjne. Hostowany CMS to opcjonalna płatna usługa, którą można również [hostować samodzielnie (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md).

</Question>

</FAQ>
