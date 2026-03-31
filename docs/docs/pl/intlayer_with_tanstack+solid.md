---
createdAt: 2025-03-25
updatedAt: 2026-03-25
title: i18n Tanstack Start - Jak przetłumaczyć aplikację Tanstack Start używając Solid.js w 2026 roku
description: Dowiedz się, jak dodać internacjonalizację (i18n) do swojej aplikacji Tanstack Start, korzystając z Intlayer i Solid.js. Postępuj zgodnie z tym kompleksowym przewodnikiem, aby stworzyć wielojęzyczną aplikację z routingiem uwzględniającym lokalizację (locale).
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
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.5.1
    date: 2026-03-25
    changes: "Dodano dla Tanstack Start Solid.js"
---

# Przetłumacz swoją stronę Tanstack Start + Solid.js za pomocą Intlayer | Internacjonalizacja (i18n)

## Spis treści

<TOC/>

Ten przewodnik pokazuje, jak zintegrować **Intlayer** w celu zapewnienia bezproblemowej internacjonalizacji w projektach Tanstack Start z Solid.js, z routingiem uwzględniającym lokalizację, wsparciem TypeScript oraz nowoczesnymi praktykami programistycznymi.

## Czym jest Intlayer?

**Intlayer** to innowacyjna biblioteka internacjonalizacji (i18n) o otwartym kodzie źródłowym, zaprojektowana w celu uproszczenia obsługi wielu języków w nowoczesnych aplikacjach internetowych.

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentów.
- **Dynamicznie lokalizować metadane, trasy (routes) i treść**.
- **Zapewnić wsparcie TypeScript** dzięki automatycznie generowanym typom, co poprawia autouzupełnianie i wykrywanie błędów.
- **Korzystać z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i przełączanie języka.
- **Włączyć routing uwzględniający język** dzięki systemowi routingu Tanstack Start opartemu na plikach.

---

## Przewodnik krok po kroku dotyczący konfiguracji Intlayer w aplikacji Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Wideo" value="video">
  
<iframe title="Najlepsze rozwiązanie i18n dla Tanstack Start? Odkryj Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-solid-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak umiędzynarodowić swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Zobacz [Szablon Aplikacji](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) na GitHubie.

### Krok 1: Utworzenie projektu

Najpierw utwórz nowy projekt TanStack Start, postępując zgodnie z przewodnikiem [Rozpoczęcie nowego projektu](https://tanstack.com/start/latest/docs/framework/solid/quick-start) na stronie TanStack Start.

### Krok 2: Instalacja pakietów Intlayer

Zainstaluj niezbędne pakiety za pomocą preferowanego menedżera pakietów:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  Rdzeń pakietu, który dostarcza narzędzia internacjonalizacji do zarządzania konfiguracją, tłumaczeniami, [deklaracją treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilacją oraz [poleceniami CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **solid-intlayer**
  Pakiet integrujący Intlayer z aplikacją Solid. Dostarcza dostawców kontekstu (context providers) i hooki do internacjonalizacji w Solid.

- **vite-intlayer**
  Zawiera wtyczkę Vite do integracji Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami (cookies) i obsługi przekierowań adresów URL.

### Krok 3: Konfiguracja Twojego projektu

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

### Krok 4: Integracja Intlayer w konfiguracji Vite

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
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
  ],
});
```

> Wtyczka `intlayer()` Vite jest używana do integracji Intlayer z Vite. Zapewnia ona budowanie plików deklaracji treści i monitoruje je w trybie deweloperskim. Definiuje ona zmienne środowiskowe Intlayer wewnątrz aplikacji Vite. Dodatkowo zapewnia aliasy w celu zmniejszenia narzutu wydajnościowego.

### Krok 5: Utworzenie Root Layoutu

Skonfiguruj swój layout główny (root layout), aby obsługiwał internacjonalizację, używając `useMatches` do wykrywania bieżącego języka i ustawiając atrybuty `lang` oraz `dir` w tagu `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useMatches,
} from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";
import { HydrationScript } from "solid-js/web";
import { Suspense } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir, type Locale } from "intlayer";

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

type Params = {
  locale: Locale;
};

function RootComponent() {
  const matches = useMatches();

  // Spróbuj znaleźć język w parametrach jakiegokolwiek aktywnego dopasowania
  // Zakłada to, że używasz dynamicznego segmentu "/{-$locale}" w swoim drzewie tras
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        <IntlayerProvider locale={locale}>
          <Suspense>
            <Outlet />
            <TanStackRouterDevtools />
          </Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

### Krok 6: Utworzenie Layoutu Językowego (opcjonalnie)

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

### Krok 7: Zadeklaruj swoją treść

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

> Twoje deklaracje treści mogą być definiowane w dowolnym miejscu w aplikacji, pod warunkiem, że znajdują się w katalogu `contentDir` (domyślnie `./app`) i pasują do rozszerzenia pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Więcej szczegółów znajdziesz w [dokumentacji deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Krok 8: Wykorzystaj komponenty i hooki uwzględniające lokalizację

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

### Krok 9: Użyj Intlayer na swoich stronach

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
      <h1>{content().heroTitle}</h1>
      <p>{content().heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content().navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content().navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> W Solidzie, `useIntlayer` zwraca funkcję **accessor** (np.: `content()`). Musisz wywołać tę funkcję, aby uzyskać dostęp do reaktywnej treści.
>
> Aby dowiedzieć się więcej o hooku `useIntlayer`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/solid-intlayer/useIntlayer.md).

### Krok 10: Utworzenie komponentu Locale Switcher

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

### Krok 11: Zarządzanie atrybutami HTML

Jak pokazano w Kroku 5, możesz zarządzać atrybutami `lang` oraz `dir` tagu `html` za pomocą `useMatches` w swoim głównym komponencie (root component). Dzięki temu prawidłowe atrybuty zostaną ustawione zarówno na serwerze, jak i na kliencie.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const matches = useMatches();

  // Spróbuj znaleźć język w parametrach jakiegokolwiek aktywnego dopasowania
  const locale =
    (
      matches().find((match) => match.routeId === "/{-$locale}/")
        ?.params as Params
    )?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

### Krok 12: Dodaj Middleware (opcjonalnie)

Możesz również użyć `intlayerProxy`, aby dodać routing po stronie serwera do swojej aplikacji. Ten plugin automatycznie wykryje aktualny język na podstawie adresu URL i ustawi odpowiednie ciasteczko (cookie) języka. Jeśli nie określono języka, plugin określi najbardziej odpowiedni na podstawie preferencji językowych przeglądarki użytkownika. Jeśli nie zostanie wykryty żaden język, nastąpi przekierowanie do domyślnego języka.

> Zauważ, że aby korzystać z `intlayerProxy` w środowisku produkcyjnym, musisz przenieść pakiet `vite-intlayer` z `devDependencies` do `dependencies`.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Proxy powinno być umieszczone przed serwerem, jeśli używasz Nitro
    nitro(),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solid(),
  ],
});
```

---

### Krok 13: Umiędzynarowienie metadanych (opcjonalnie)

Możesz również użyć funkcji `getIntlayer`, aby uzyskać dostęp do swoich słowników treści wewnątrz loadera `head` w celu uzyskania metadanych uwzględniających lokalizację:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("page-metadata", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.description, name: "description" },
      ],
    };
  },
});
```

---

### Krok 14: Pobieranie języka w akcjach serwera (opcjonalnie)

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

---

### Krok 15: Zarządzanie stronami "nie znaleziono" (404) (opcjonalnie)

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

### (Opcjonalnie) Krok 16: Wyodrębnij treść ze swoich komponentów

Jeśli masz istniejącą bazę kodu, transformacja tysięcy plików może być czasochłonna.

Aby ułatwić ten proces, Intlayer proponuje [kompilator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) / [ekstraktor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md) do transformacji komponentów i wyodrębnienia treści.

Aby go skonfigurować, możesz dodać sekcję `compiler` w pliku `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

module.exports = config;
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
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(),
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

---

### Krok 17: Skonfiguruj TypeScript (opcjonalnie)

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

---

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
