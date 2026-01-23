---
createdAt: 2025-09-09
updatedAt: 2025-12-30
title: Jak przetłumaczyć swoją aplikację Tanstack Start – przewodnik i18n 2026
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
  - version: 7.5.9
    date: 2025-12-30
    changes: Dodaj polecenie init
  - version: 7.4.0
    date: 2025-12-11
    changes: Wprowadzenie validatePrefix oraz dodanie kroku 14: Obsługa stron 404 z lokalizowanymi trasami.
  - version: 7.3.9
    date: 2025-12-05
    changes: Dodany krok 13: Pobieranie lokalizacji w akcjach serwerowych (Opcjonalnie)
  - version: 7.2.3
    date: 2025-11-18
    changes: Dodaj krok 13: Adaptacja Nitro
  - version: 7.1.0
    date: 2025-11-17
    changes: Naprawienie domyślnego prefiksu poprzez dodanie funkcji getPrefix useLocalizedNavigate, LocaleSwitcher i LocalizedLink.
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
- **Korzystać z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i przełączanie lokalizacji.
- **Włączyć routing uwzględniający lokalizację** za pomocą systemu routingu opartego na plikach Tanstack Start.

---

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Wideo" value="video">
  
<iframe title="Najlepsze rozwiązanie i18n dla Tanstack Start? Odkryj Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-tanstack-start-template) na GitHub.

### Krok 1: Utwórz projekt

Rozpocznij od utworzenia nowego projektu TanStack Start, postępując zgodnie z przewodnikiem [Start new project](https://tanstack.com/start/latest/docs/framework/react/quick-start) na stronie TanStack Start.

### Krok 2: Zainstaluj pakiety Intlayer

Zainstaluj niezbędne pakiety, używając preferowanego menedżera pakietów:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  Podstawowy pakiet, który dostarcza narzędzia do internacjonalizacji dla zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/get_started.md), transpiliacji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md).

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
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> Wtyczka `intlayer()` dla Vite służy do integracji Intlayer z Vite. Zapewnia budowanie plików deklaracji treści oraz monitorowanie ich w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Vite. Dodatkowo dostarcza aliasy optymalizujące wydajność.

### Krok 5: Utwórz układ główny (Root Layout)

Skonfiguruj swój główny układ, aby wspierać internacjonalizację, używając `useMatches` do wykrywania aktualnej lokalizacji i ustawiając atrybuty `lang` i `dir` w tagu `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useMatches,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

export const Route = createRootRouteWithContext<{}>()({
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // Spróbuj znaleźć lokalizację w parametrach dowolnego aktywnego dopasowania
  // Przyjmuje to, że używasz dynamicznego segmentu "/{-$locale}" w swoim drzewie tras
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

### Krok 6: Utwórz układ lokalizacji

Utwórz układ, który obsługuje prefiks lokalizacji i wykonuje walidację.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Walidacja prefiksu lokalizacji
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
});
```

> Tutaj `{-$locale}` jest dynamicznym parametrem trasy, który zostaje zastąpiony aktualną lokalizacją. Ta notacja sprawia, że slot jest opcjonalny, co pozwala na współpracę z trybami routingu takimi jak `'prefix-no-default'` itp.

> Pamiętaj, że ten slot może powodować problemy, jeśli używasz wielu dynamicznych segmentów w tej samej trasie (np. `/{-$locale}/other-path/$anotherDynamicPath/...`).
> W trybie `'prefix-all'` możesz woleć zmienić slot na `$locale`.
> W trybach `'no-prefix'` lub `'search-params'` możesz całkowicie usunąć ten slot.

### Krok 7: Zadeklaruj swoją treść

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

> Twoje deklaracje zawartości mogą być definiowane w dowolnym miejscu w Twojej aplikacji, pod warunkiem, że zostaną umieszczone w katalogu `contentDir` (domyślnie `./app`). I będą miały rozszerzenie pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Po więcej szczegółów odsyłamy do [dokumentacji deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/get_started.md).

### Krok 8: Tworzenie komponentów i hooków uwzględniających lokalizację

Utwórz komponent `LocalizedLink` do nawigacji uwzględniającej lokalizację:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

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
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import { LOCALE_ROUTE } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}`
  | `/${typeof LOCALE_ROUTE}/`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never;

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

type LocalizedNavigate = {
  (to: LocalizedTo): ReturnType<ReturnType<typeof useNavigate>>;
  (
    opts: { to: LocalizedTo } & Record<string, unknown>
  ): ReturnType<ReturnType<typeof useNavigate>>;
};

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    const { localePrefix } = getPrefix(locale);

    if (typeof args === "string") {
      return navigate({
        to: `/${LOCALE_ROUTE}${args}`,
        params: { locale: localePrefix },
      });
    }

    const { to, ...rest } = args;

    const localizedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({
      to: localizedTo,
      params: { locale: localePrefix, ...rest } as any,
    });
  };

  return localizedNavigate;
};
```

### Krok 9: Wykorzystaj Intlayer na swoich stronach

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

### Krok 10: Utwórz komponent przełącznika języka (Locale Switcher)

Utwórz komponent, który pozwoli użytkownikom zmieniać języki:

```tsx fileName="src/components/locale-switcher.tsx"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

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
            to={pathWithoutLocale as To}
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

### Krok 11: Zarządzanie atrybutami HTML

Jak pokazano w Kroku 5, możesz zarządzać atrybutami `lang` i `dir` tagu `html` za pomocą `useMatches` w swoim komponencie głównym. Zapewnia to, że poprawne atrybuty są ustawione zarówno na serwerze, jak i kliencie.

```tsx fileName="src/routes/__root.tsx"
function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // Spróbuj znaleźć lokalizację w parametrach dowolnego aktywnego dopasowania
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

### Krok 12: Dodaj middleware (Opcjonalnie)

Możesz również użyć `intlayerProxy`, aby dodać routing po stronie serwera do swojej aplikacji. Ten plugin automatycznie wykryje aktualną lokalizację na podstawie URL i ustawi odpowiednie ciasteczko lokalizacji. Jeśli nie zostanie określona żadna lokalizacja, plugin wybierze najbardziej odpowiednią na podstawie preferencji językowych przeglądarki użytkownika. Jeśli nie zostanie wykryta żadna lokalizacja, nastąpi przekierowanie do domyślnej.

> Uwaga: aby używać `intlayerProxy` w produkcji, musisz przenieść pakiet `vite-intlayer` z `devDependencies` do `dependencies`.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Proxy powinno być umieszczone przed serwerem, jeśli używasz Nitro
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});
```

---

### Krok 13: Internacjonalizacja metadanych (Opcjonalnie)

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

### Krok 14: Pobieranie lokalizacji w akcjach serwerowych (Opcjonalnie)

Możesz chcieć uzyskać dostęp do aktualnej lokalizacji wewnątrz swoich akcji serwerowych lub punktów końcowych API.
Możesz to zrobić za pomocą pomocnika `getLocale` z `intlayer`.

Oto przykład użycia funkcji serwerowych TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Pobierz ciasteczko z żądania (domyślnie: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Pobierz nagłówek z żądania (domyślnie: 'x-intlayer-locale')
    // Rezerwowe rozwiązanie przy użyciu negocjacji Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Pobierz treść za pomocą getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Krok 15: Zarządzanie stronami "nie znaleziono" (Opcjonalnie)

Gdy użytkownik odwiedza nieistniejącą stronę, możesz wyświetlić niestandardową stronę "nie znaleziono", a prefiks lokalizacji może wpływać na sposób wyzwalania strony "nie znaleziono".

#### Zrozumienie obsługi 404 w TanStack Router z prefiksami lokalizacji

W TanStack Router obsługa stron 404 z zlokalizowanymi trasami wymaga podejścia wielowarstwowego:

1. **Dedykowana trasa 404**: Konkretna trasa do wyświetlenia interfejsu 404
2. **Walidacja na poziomie trasy**: Weryfikuje prefiksy lokalizacji i przekierowuje nieprawidłowe do 404
3. **Trasa catch-all**: Przechwytuje wszystkie niedopasowane ścieżki w segmencie lokalizacji

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
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad uruchamia się przed renderowaniem trasy (zarówno na serwerze, jak i kliencie)
  // To idealne miejsce do walidacji prefiksu lokalizacji
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix sprawdza, czy lokalizacja jest prawidłowa zgodnie z konfiguracją intlayer
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Nieprawidłowy prefiks lokalizacji - przekieruj do strony 404 z prawidłowym prefiksem lokalizacji
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent jest wywoływane, gdy trasa potomna nie istnieje
  // np. /en/nieistniejaca-strona wyzwala to w układzie /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// Trasa $ (splat/catch-all) pasuje do każdej ścieżki, która nie pasuje do innych tras
// np. /en/jakas/gleboko/zagniezdzona/niewazna/sciezka
// To zapewnia, że WSZYSTKIE niedopasowane ścieżki w lokalizacji wyświetlają stronę 404
// Bez tego niedopasowane głębokie ścieżki mogą wyświetlać pustą stronę lub błąd
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

---

### Krok 16: Konfiguracja TypeScript (Opcjonalnie)

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
- [Deklaracja treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/get_started.md)
- [Konfiguracja](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)
