---
createdAt: 2025-09-09
updatedAt: 2025-12-11
title: Jak przetłumaczyć swoją aplikację Tanstack Start – przewodnik i18n 2025
description: Dowiedz się, jak dodać internacjonalizację (i18n) do swojej aplikacji Tanstack Start za pomocą Intlayer. Postępuj zgodnie z tym kompleksowym przewodnikiem, aby uczynić swoją aplikację wielojęzyczną z routingiem uwzględniającym lokalizację.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Tanstack Start
  - React
  - i18n
  - TypeScript
  - Routing lokalizacji
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.4.0
    date: 2025-12-11
    changes: Wprowadzenie validatePrefix oraz dodanie kroku 14: Obsługa stron 404 z lokalizowanymi trasami.
  - version: 7.3.9
    date: 2025-12-05
    changes: Dodany krok 13: Pobieranie lokalizacji w akcjach serwerowych (Opcjonalnie)
  - version: 6.5.2
    date: 2025-10-03
    changes: Aktualizacja dokumentacji
  - version: 5.8.1
    date: 2025-09-09
    changes: Dodano dla Tanstack Start
---

# Przetłumacz swoją stronę Tanstack Start za pomocą Intlayer | Internacjonalizacja (i18n)

## Spis treści

<TOC/>

Ten przewodnik pokazuje, jak zintegrować **Intlayer** dla płynnej internacjonalizacji w projektach Tanstack Start z routingiem uwzględniającym lokalizację, wsparciem TypeScript oraz nowoczesnymi praktykami programistycznymi.

## Czym jest Intlayer?

**Intlayer** to innowacyjna, open-source'owa biblioteka do internacjonalizacji (i18n), zaprojektowana, aby uprościć wsparcie wielojęzyczne w nowoczesnych aplikacjach webowych.

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentów.
- **Dynamicznie lokalizować metadane**, trasy i zawartość.
- **Zapewnić wsparcie TypeScript** dzięki automatycznie generowanym typom, co poprawia autouzupełnianie i wykrywanie błędów.
- **Korzystaj z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i przełączanie lokalizacji.
- **Włącz routing uwzględniający lokalizację** za pomocą systemu routingu opartego na plikach Tanstack Start.

---

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji Tanstack Start

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="Najlepsze rozwiązanie i18n dla Tanstack Start? Odkryj Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-tanstack-start-template) na GitHub.

### Krok 1: Utwórz projekt

Rozpocznij od utworzenia nowego projektu TanStack Start, postępując zgodnie z przewodnikiem [Start new project](https://tanstack.com/start/latest/docs/framework/react/quick-start) na stronie TanStack Start.

### Krok 2: Zainstaluj pakiety Intlayer

Zainstaluj niezbędne pakiety, używając preferowanego menedżera pakietów:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

- **intlayer**

- **intlayer**

  Podstawowy pakiet, który dostarcza narzędzia do internacjonalizacji dla zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilecji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md).

- **react-intlayer**
  Pakiet integrujący Intlayer z aplikacją React. Zapewnia dostawców kontekstu oraz hooki do internacjonalizacji w React.

- **vite-intlayer**
  Zawiera wtyczkę Vite do integracji Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami oraz obsługi przekierowań URL.

### Krok 3: Konfiguracja projektu

Utwórz plik konfiguracyjny, aby skonfigurować języki swojej aplikacji:

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

> Za pomocą tego pliku konfiguracyjnego możesz ustawić lokalizowane adresy URL, przekierowania w middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji treści, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 4: Integracja Intlayer w konfiguracji Vite

Dodaj wtyczkę intlayer do swojej konfiguracji:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart(),
    viteReact(),
    intlayer(), // To add
  ],
});

export default config;
```

> Wtyczka `intlayer()` dla Vite służy do integracji Intlayer z Vite. Zapewnia budowanie plików deklaracji treści oraz monitorowanie ich w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Vite. Dodatkowo dostarcza aliasy optymalizujące wydajność.

### Krok 5: Utwórz komponenty layoutu

Skonfiguruj swój główny layout oraz layouty specyficzne dla lokalizacji:

#### Główny Layout

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes";

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

### Krok 6: Zadeklaruj swoją treść

Twórz i zarządzaj deklaracjami treści, aby przechowywać tłumaczenia:

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
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer avec TanStack Router",
      }),
    },
    title: t({
      en: "Welcome to Intlayer + TanStack Router",
      es: "Bienvenido a Intlayer + TanStack Router",
      fr: "Bienvenue à Intlayer + TanStack Router",
    }),
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Twoje deklaracje zawartości mogą być definiowane w dowolnym miejscu w Twojej aplikacji, pod warunkiem, że zostaną umieszczone w katalogu `contentDir` (domyślnie `./app`). I będą miały rozszerzenie pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Po więcej szczegółów odsyłamy do [dokumentacji deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Krok 7: Tworzenie komponentów i hooków uwzględniających lokalizację

Utwórz komponent `LocalizedLink` do nawigacji uwzględniającej lokalizację:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react.intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

// Główne narzędzie
export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

// Pomocnicze typy
type RemoveAll<
  S extends string,
  Sub extends string,
> = S extends `${infer H}${Sub}${infer T}` ? RemoveAll<`${H}${T}`, Sub> : S;

type RemoveLocaleFromString<S extends string> = CollapseDoubleSlashes<
  RemoveAll<S, typeof LOCALE_ROUTE>
>;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(locale);

  return (
    <Link
      {...props}
      params={{
        locale: localePrefix,
        ...(typeof props?.params === "object" ? props?.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
    />
  );
};
```

Ten komponent ma dwa cele:

- Usunięcie niepotrzebnego prefiksu `{-$locale}` z URL.
- Wstrzyknięcie parametru locale do URL, aby zapewnić użytkownikowi bezpośrednie przekierowanie do zlokalizowanej ścieżki.

Następnie możemy stworzyć hook `useLocalizedNavigate` do nawigacji programowej:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useLocale } from "react.intlayer";
import { useNavigate } from "@tanstack/react-router";
import { LOCALE_ROUTE } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  type StripLocalePrefix<T extends string> = T extends
    | `/${typeof LOCALE_ROUTE}`
    | `/${typeof LOCALE_ROUTE}/`
    ? "/"
    : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
      ? `/${Rest}`
      : never;

  type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

  interface LocalizedNavigate {
    (to: LocalizedTo): ReturnType<typeof navigate>;
    (
      opts: { to: LocalizedTo } & Record<string, unknown>
    ): ReturnType<typeof navigate>;
  }

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    if (typeof args === "string") {
      return navigate({ to: `/${LOCALE_ROUTE}${args}`, params: { locale } });
    }

    const { to, ...rest } = args;

    const localedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({ to: localedTo, params: { locale, ...rest } as any });
  };

  return localizedNavigate;
};
```

### Krok 8: Wykorzystaj Intlayer na swoich stronach

Uzyskaj dostęp do swoich słowników treści w całej aplikacji:

#### Lokalizowana strona główna

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.meta.description, name: "description" },
      ],
    };
  },
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div>
      <div>
        {content.title}
        <LocaleSwitcher />
        <div>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div>
          <button onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: "/about" })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
```

> Aby dowiedzieć się więcej o hooku `useIntlayer`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useIntlayer.md).

### Krok 9: Utwórz komponent przełącznika języka (Locale Switcher)

Utwórz komponent, który pozwoli użytkownikom zmieniać języki:

```tsx fileName="src/components/locale-switcher.tsx"
import type { FC } from "react";

import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import { useLocale } from "react-intlayer";

import { LocalizedLink, To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
          >
            <span>
              {/* Lokalizacja - np. FR */}
              {localeEl}
            </span>
            <span>
              {/* Język w swojej własnej lokalizacji - np. Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Język w bieżącej lokalizacji - np. Francés przy ustawionej lokalizacji Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Język po angielsku - np. French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> Aby dowiedzieć się więcej o hooku `useLocale`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md).

### Krok 10: Dodaj zarządzanie atrybutami HTML (opcjonalnie)

Utwórz hook do zarządzania atrybutami lang i dir w HTML:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx"
// src/hooks/useI18nHTMLAttributes.tsx
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

Następnie użyj go w swoim komponencie root:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { useI18nHTMLAttributes } from "@/hooks/useI18nHTMLAttributes"; // importuj hook

export const Route = createFileRoute("/{-$locale}")({
  component: LayoutComponent,
});

function LayoutComponent() {
  useI18nHTMLAttributes(); // dodaj tę linię

  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

---

### Krok 11: Dodaj middleware (opcjonalnie)

Możesz również użyć `intlayerProxy`, aby dodać routing po stronie serwera do swojej aplikacji. Ten plugin automatycznie wykryje aktualny locale na podstawie URL i ustawi odpowiedni cookie locale. Jeśli nie zostanie określony żaden locale, plugin wybierze najbardziej odpowiedni locale na podstawie preferencji językowych przeglądarki użytkownika. Jeśli nie zostanie wykryty żaden locale, nastąpi przekierowanie do domyślnego locale.

> Uwaga: aby używać `intlayerProxy` w produkcji, musisz przenieść pakiet `vite-intlayer` z `devDependencies` do `dependencies`.

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Proxy powinno być umieszczone przed serwerem, jeśli używasz Nitro
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    intlayer(),
  ],
});
```

---

### Krok 12: Internacjonalizacja metadanych (opcjonalnie)

Możesz również użyć hooka `getIntlayer`, aby uzyskać dostęp do słowników treści w całej aplikacji:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
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

### Step 13: Retrieve the locale in your server actions (Optional)

You may want to access the current locale from inside your server actions or API endpoints.
You can do this using the `getLocale` helper from `intlayer`.

Here's an example using TanStack Start's server functions:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Get the cookie from the request (default: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Get the header from the request (default: 'x-intlayer-locale')
    // Fallback using Accept-Language negotiation
    getHeader: (name) => getRequestHeader(name),
  });

  // Retrieve some content using getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Krok 14: Zarządzanie stronami nie znalezionymi (opcjonalnie)

Gdy użytkownik odwiedza nieistniejącą stronę, możesz wyświetlić niestandardową stronę "nie znaleziono", a prefiks locale może wpływać na sposób wyzwalania strony "nie znaleziono".

#### Zrozumienie obsługi 404 w TanStack Router z prefiksami locale

W TanStack Router obsługa stron 404 z zlokalizowanymi trasami wymaga podejścia wielowarstwowego:

1. **Dedykowana trasa 404**: Konkretna trasa do wyświetlenia interfejsu 404
2. **Walidacja na poziomie trasy**: Weryfikuje prefiksy locale i przekierowuje nieprawidłowe do 404
3. **Trasa catch-all**: Przechwytuje wszystkie niedopasowane ścieżki w segmencie locale

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// To tworzy dedykowaną trasę /[locale]/404
// Jest używana zarówno jako bezpośrednia trasa, jak i importowana jako komponent w innych plikach
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Eksportowane osobno, aby można było ponownie użyć w notFoundComponent i trasach catch-all
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";
import { IntlayerProvider, useLocale } from "react-intlayer";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad uruchamia się przed renderowaniem trasy (zarówno na serwerze, jak i kliencie)
  // To idealne miejsce do walidacji prefiksu locale
  beforeLoad: ({ params }) => {
    // Pobierz locale z parametrów trasy (nie z nagłówków serwera, ponieważ beforeLoad działa zarówno na kliencie, jak i serwerze)
    const localeParam = params.locale;

    // validatePrefix sprawdza, czy locale jest prawidłowe zgodnie z konfiguracją intlayer
    // Zwraca: { isValid: boolean, localePrefix: string }
    // - isValid: true, jeśli prefiks pasuje do skonfigurowanego locale (lub jest pusty, gdy prefiks jest opcjonalny)
    // - localePrefix: zwalidowany prefiks lub domyślny prefiks locale do przekierowań
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (isValid) {
      // Locale jest prawidłowe, pozwól trasie renderować się normalnie
      return;
    }

    // Nieprawidłowy prefiks locale (np. /xyz/about, gdzie "xyz" nie jest prawidłowym locale)
    // Przekieruj do strony 404 z prawidłowym prefiksem locale
    // To zapewnia, że strona 404 jest nadal prawidłowo zlokalizowana
    throw redirect({
      to: "/{-$locale}/404",
      params: { locale: localePrefix },
    });
  },
  component: RouteComponent,
  // notFoundComponent jest wywoływane, gdy trasa potomna nie istnieje
  // np. /en/nieistniejaca-strona wyzwala to w układzie /en
  notFoundComponent: NotFoundLayout,
});

function RouteComponent() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    // Owiń cały segment locale w IntlayerProvider
    // Powraca do defaultLocale, gdy parametr locale jest undefined (tryb opcjonalnego prefiksu)
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}

// NotFoundLayout owija komponent 404 w IntlayerProvider
// To zapewnia, że tłumaczenia nadal działają na stronie 404
function NotFoundLayout() {
  const { defaultLocale } = useLocale();
  const { locale } = Route.useParams();

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <NotFoundComponent />
      {/* Dołącz LocaleSwitcher, aby użytkownicy mogli zmieniać język nawet na 404 */}
      <LocaleSwitcher />
    </IntlayerProvider>
  );
}
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// Trasa $ (splat/catch-all) pasuje do każdej ścieżki, która nie pasuje do innych tras
// np. /en/jakas/gleboko/zagniezdzona/niewazna/sciezka
// To zapewnia, że WSZYSTKIE niedopasowane ścieżki w locale wyświetlają stronę 404
// Bez tego niedopasowane głębokie ścieżki mogą wyświetlać pustą stronę lub błąd
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

---

### Krok 15: Konfiguracja TypeScript (opcjonalnie)

Intlayer używa rozszerzenia modułów (module augmentation), aby wykorzystać zalety TypeScript i wzmocnić Twoją bazę kodu.

Upewnij się, że Twoja konfiguracja TypeScript zawiera automatycznie generowane typy:

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje
  include: [
    // ... Twoje istniejące include
    ".intlayer/**/*.ts", // Dołącz automatycznie generowane typy
  ],
}
```

---

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

---

## Rozszerzenie VS Code

Aby poprawić swoje doświadczenie deweloperskie z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd w linii** przetłumaczonej zawartości.
- **Szybkie akcje** umożliwiające łatwe tworzenie i aktualizowanie tłumaczeń.

Aby uzyskać więcej informacji na temat korzystania z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Idź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyodrębnić swoją zawartość, korzystając z [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

---

## Odnośniki do dokumentacji

- [Dokumentacja Intlayer](https://intlayer.org)
- [Dokumentacja Tanstack Start](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md)
- [Deklaracja treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md)
- [Konfiguracja](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)

Ten kompleksowy przewodnik zawiera wszystko, co potrzebne do integracji Intlayer z Tanstack Start, aby uzyskać w pełni zinternacjonalizowaną aplikację z obsługą trasowania uwzględniającego lokalizację oraz wsparciem dla TypeScript.
