---
createdAt: 2025-09-09
updatedAt: 2026-08-25
title: "TanStack Start i18n - Kompletny przewodnik po tłumaczeniu swojej aplikacji"
description: "Koniec z i18next. Przewodnik 2026 do budowania wielojęzycznej (i18n) aplikacji TanStack Start. Tłumacz z agentami AI i optymalizuj rozmiar bundle, SEO i wydajność."
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
applicationShowcase: https://intlayer-tanstack-start-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "Porównanie statycznego, dynamicznego i buforowanego dynamicznego rozwiązywania słowników metadanych w funkcjach head tras"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizacja użycia API useIntlayer w Solid do bezpośredniego dostępu do właściwości"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Dodaj polecenie init"
  - version: 7.4.0
    date: 2025-12-11
    changes: "Wprowadzenie validatePrefix oraz dodanie kroku 14: Obsługa stron 404 z lokalizowanymi trasami."
  - version: 7.3.9
    date: 2025-12-05
    changes: "Dodany krok 13: Pobieranie lokalizacji w akcjach serwerowych (Opcjonalnie)"
  - version: 7.2.3
    date: 2025-11-18
    changes: "Dodaj krok 13: Adaptacja Nitro"
  - version: 7.1.0
    date: 2025-11-17
    changes: "Naprawienie domyślnego prefiksu poprzez dodanie funkcji getPrefix useLocalizedNavigate, LocaleSwitcher i LocalizedLink."
  - version: 6.5.2
    date: 2025-10-03
    changes: "Aktualizacja dokumentacji"
  - version: 5.8.1
    date: 2025-09-09
    changes: "Dodano dla Tanstack Start"
author: aymericzip
---

# Przetłumacz swoją stronę Tanstack Start za pomocą Intlayer | Internacjonalizacja (i18n)

## Spis treści

<TOC/>

Ten przewodnik pokazuje, jak zintegrować **Intlayer** dla płynnej internacjonalizacji w projektach Tanstack Start z routingiem uwzględniającym lokalizację, wsparciem TypeScript oraz nowoczesnymi praktykami programistycznymi.

## Dlaczego Interlayer zamiast alternatyw?

W porównaniu do głównych rozwiązań, takich jak „react-i18next”, „use-intl” lub „paraglide”, Intlayer jest rozwiązaniem wyposażonym w zintegrowane optymalizacje, takie jak:

<AccordionGroup>

**Pełne pokrycie TanStack Start**

Intlayer jest w pełni zoptymalizowany pod kątem TanStack Start, zapewniając **wielojęzyczny routing**, **zarządzanie plikami cookie**, **generowanie mapy witryny**, **dynamiczne ładowanie treści** i wszystkie funkcje potrzebne do skalowania wysiłków związanych z internacjonalizacją (i18n).

</Accordion>

**Rozmiar bundle'a**

Zamiast ładować ogromne pliki JSON na swoje strony, ładuj tylko niezbędną treść. Intlayer pomaga **zmniejszyć rozmiary bundle'a i stron nawet o 50%**.

</Accordion>

**Łatwość konserwacji**

Określanie zakresu zawartości aplikacji **ułatwia konserwację** aplikacji na dużą skalę. Możesz powielić lub usunąć pojedynczy folder funkcji bez obciążania psychicznego koniecznością przeglądania całej bazy kodu zawartości. Dodatkowo Inlayer jest **w pełni napisany**, aby zapewnić dokładność treści.

**Agent AI**

<Accordion header="Agent AI">

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

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Wideo" value="video">

<iframe title="Najlepsze rozwiązanie i18n dla Tanstack Start? Odkryj Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kod" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-tanstack-start-template) na GitHub.

<Steps>

<Step number={1} title="Utwórz projekt">

Rozpocznij od utworzenia nowego projektu TanStack Start, postępując zgodnie z przewodnikiem [Start new project](https://tanstack.com/start/latest/docs/framework/react/quick-start) na stronie TanStack Start.

</Step>

<Step number={2} title="Zainstaluj pakiety Intlayer">

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
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Podstawowy pakiet, który dostarcza narzędzia do internacjonalizacji dla zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpiliacji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **react-intlayer**
  Pakiet integrujący Intlayer z aplikacją React. Zapewnia dostawców kontekstu oraz hooki do internacjonalizacji w React.

- **vite-intlayer**
  Zawiera wtyczkę Vite do integracji Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami oraz obsługi przekierowań URL.

</Step>

<Step number={3} title="Konfiguracja projektu">

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

</Step>

<Step number={4} title="Integracja Intlayer w konfiguracji Vite">

Dodaj wtyczkę intlayer do swojej konfiguracji:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config = defineConfig({
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
    viteReact(),
  ],
});

export default config;
```

> Wtyczka `intlayer()` dla Vite służy do integracji Intlayer z Vite. Zapewnia budowanie plików deklaracji treści oraz monitorowanie ich w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Vite. Dodatkowo dostarcza aliasy optymalizujące wydajność.

</Step>

<Step number={5} title="Utwórz układ główny">

Skonfiguruj swój główny układ, aby wspierać internacjonalizację, używając `useParams` do wykrywania aktualnej lokalizacji i ustawiając atrybuty `lang` i `dir` w tagu `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  getRouteApi,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext<{}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

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

</Step>

<Step number={6} title="Utwórz układ lokalizacji">

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

</Step>

<Step number={7} title="Zadeklaruj swoją treść">

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

> Twoje deklaracje zawartości mogą być definiowane w dowolnym miejscu w Twojej aplikacji, pod warunkiem, że zostaną umieszczone w katalogu `contentDir` (domyślnie `./app`). I będą miały rozszerzenie pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Po więcej szczegółów odsyłamy do [dokumentacji deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

</Step>

<Step number={8} title="Tworzenie komponentów i hooków uwzględniających lokalizację">

Utwórz komponent `LocalizedLink` do nawigacji uwzględniającej lokalizację:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type To = StripLocalePrefix<LinkComponentProps["to"]>;

export type StripLocalePrefix<T extends string | undefined> = T extends
  `/${typeof LOCALE_ROUTE}/` | `/${typeof LOCALE_ROUTE}`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : T;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

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
import type { StripLocalePrefix } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type NavigateFn = ReturnType<typeof useNavigate>;
type BaseNavigateOptions = Parameters<NavigateFn>[0];

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

export type LocalizedNavigateOptions = Omit<
  BaseNavigateOptions,
  "to" | "params"
> & {
  to: LocalizedTo;
  params?: Omit<NonNullable<BaseNavigateOptions["params"]>, "locale">;
};

type LocalizedNavigate = (
  options: LocalizedNavigateOptions
) => ReturnType<NavigateFn>;

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

</Step>

<Step number={9} title="Wykorzystaj Intlayer na swoich stronach">

> Domyślnie używaj **`useIntlayer`**: to zalecany sposób odczytu treści wewnątrz komponentów, a kompilator rozwiązuje go do renderowanej lokalizacji. Po `getIntlayer` / `getIntlayerAsync` sięgaj tylko poza drzewem React: w `head` tras, loaderach i funkcjach serwerowych.

Uzyskaj dostęp do swoich słowników treści w całej aplikacji:

#### Strona główna zlokalizowana

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
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

> Jeśli chcesz użyć zawartości w atrybucie `string`, takim jak `alt`, `title`, `href`, `aria-label` itd., możesz użyć wartości funkcji, na przykład:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Aby dowiedzieć się więcej o hook'u `useIntlayer`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useIntlayer.md).

</Step>

<Step number={9} title="Utwórz komponent przełącznika języków">

Utwórz komponent umożliwiający użytkownikom zmianę języka:

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
              {/* Locale - np. FR */}
              {localeEl}
            </span>
            <span>
              {/* Język w jego własnym locale - np. Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Język w bieżącym locale - np. Francés przy bieżącym locale ustawionym na Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Język w angielskim - np. French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> Aby dowiedzieć się więcej o hook'u `useLocale`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md).

</Step>

<Step number={10} title="Zarządzanie atrybutami HTML">

Jak pokazano w kroku 5, możesz zarządzać atrybutami `lang` i `dir` tagu `html` za pomocą `useParams` w komponencie głównym. Zapewnia to, że prawidłowe atrybuty są ustawione na serwerze i kliencie.

```tsx fileName="src/routes/__root.tsx"
const localeRoute = getRouteApi("/{-$locale}");

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

</Step>

<Step number={11} title="Dodaj middleware">

Możesz także użyć `intlayerProxy` do dodania routingu po stronie serwera do aplikacji. Plugin ten automatycznie wykryje bieżący język na podstawie URL i ustawi odpowiedni plik cookie języka. Jeśli nie zostanie określony żaden język, plugin określi najbardziej odpowiedni język na podstawie preferencji języka przeglądarki użytkownika. Jeśli nie zostanie wykryty żaden język, nastąpi przekierowanie do języka domyślnego.

> Uwaga: aby użyć `intlayerProxy` w środowisku produkcyjnym, musisz przenieść pakiet `vite-intlayer` z `devDependencies` do `dependencies`.

> Od Intlayer v9, `intlayerProxy()` jest bezpośrednio dołączony do pluginu `intlayer()` i domyślnie włączony za pośrednictwem opcji `routing.enableProxy` (`true` domyślnie). Rejestrowanie go osobno, jak pokazano poniżej, jest teraz opcjonalne: jest zachowywane dla kompatybilności wstecznej i dla ustawień, które muszą kontrolować kolejność pluginów. Ustaw `routing.enableProxy: false`, aby zrezygnować. Zapoznaj się z [notatkami do wydania v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/releases/v9.md).

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
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
    viteReact(),
  ],
});
```

---

</Step>

<Step number={12} title="Internationalizuj swoje metadane">

<Tabs>

<Tab label="Rozdzielczość statyczna" value="static">

`getIntlayer` rozwiązuje się synchronicznie względem **scalonego** słownika, tego zawierającego każdy zadeklarowany język. `head` pozostaje synchroniczny i nic nie jest oczekiwane, ale cały wielojęzyczny słownik jest pobierany do fragmentu trasy wysyłanego do przeglądarki.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
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
    const path = "/"; // Ścieżka dla tej trasy

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Link kanoniczny: wskazuje na bieżącą stronę zlokalizowaną
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: powiadomi Google o wszystkich zlokalizowanych wersjach
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: dla użytkowników w niedopasowanych językach
        // Zdefiniuj domyślny fallback locale (zwykle Twój język podstawowy)
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

Najlepsze dla małych słowników metadanych, kilku locale'i lub podczas prototypowania.

</Tab>

<Tab label="Rozdzielczość dynamiczna" value="dynamic">

`getIntlayerAsync` (dostępne od **v9.4**) zachowuje się jak `getIntlayer`, ale plugin budowania wskazuje go na fragment dla konkretnego locale'a w `.intlayer/dynamic_dictionaries/` zamiast scalonego słownika. Strona zatem wysyła tylko locale, który renderuje. Ponieważ fragment jest ładowany na żądanie, `head` staje się `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
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
    const path = "/"; // Ścieżka dla tej trasy

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // Link kanoniczny: wskazuje na bieżącą stronę zlokalizowaną
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: powiadomi Google o wszystkich zlokalizowanych wersjach
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: dla użytkowników w niedopasowanych językach
        // Zdefiniuj domyślny fallback locale (zwykle Twój język podstawowy)
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

> Jeśli `head` odczytuje kilka słowników, rozwiąż je za pomocą `Promise.all`: oczekiwanie każdego `getIntlayerAsync` w oddzielnej linii łańcuchuje żądania zamiast uruchamiać je równolegle.

Kompromis: import dynamiczny jest rozwiązywany podczas uruchamiania `head`, na krytycznej ścieżce renderowania dokumentu. Na zimnej trasie opóźnia to head o kilka milisekund i może nieco pogorszyć **LCP**.

</Tab>

<Tab label="Rozdzielczość dynamiczna buforowana" value="cached">

Rozwiąż słownik w `loader` trasy i przeczytaj go z powrotem z `loaderData` w `head`. Loadery dopasowanych tras działają równolegle, a `staleTime: Infinity` mówi TanStack Router, że wynik nigdy się nie starzeje, więc fragment dla konkretnego locale'a jest rozwiązywany raz i podawany z cache'a routera później, pozostawiając `head` synchroniczny.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Rozwiązywany równolegle z innymi dopasowanymi trasami, poza krytyczną ścieżką head
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // Słownik nigdy się nie zmienia dla danego locale: rozwiąż fragment raz
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Ścieżka dla tej trasy

    return {
      links: [
        // Link kanoniczny: wskazuje na bieżącą stronę zlokalizowaną
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: powiadomi Google o wszystkich zlokalizowanych wersjach
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: dla użytkowników w niedopasowanych językach
        // Zdefiniuj domyślny fallback locale (zwykle Twój język podstawowy)
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

> `head` może być wywoływany przed osadzeniem loadera, więc `loaderData` jest wpisywana jako możliwie `undefined`. Zachowaj opcjonalne łańcuchowanie lub zwróć tytuł fallback.

Zachowujesz fragment dla konkretnego locale'a bez płacenia jego kosztu na krytycznej ścieżce head. Cena to doświadczenie deweloperskie: zawartość musi być jawnie przekazywana z loadera do `head` poprzez `loaderData`.

</Tab>

</Tabs>

### Którą rozdzielczość powinienem wybrać?

|                          | Rozdzielczość statyczna    | Rozdzielczość dynamiczna                   | Rozdzielczość dynamiczna z cache'em    |
| ------------------------ | -------------------------- | ------------------------------------------ | -------------------------------------- |
| API                      | `getIntlayer`              | `getIntlayerAsync` (v9.4+)                 | `getIntlayerAsync` w `loader` (v9.4+)  |
| Sygnatura `head`         | synchroniczna              | `async`                                    | synchroniczna, czyta `loaderData`      |
| Ustawienia regionalne    | każdy zadeklarowany locale | tylko żądany locale                        | tylko żądany locale                    |
| Nawigacja na kliencie    | nic do rozwiązania         | ponownie wznawiane przy każdym dopasowaniu | obsługiwane z cache'u routera          |
| Doświadczenie dewelopera | najprostsze                | jedno `await`                              | zawartość przesłana przez `loaderData` |

---

</Step>

<Step number={13} title="Pobierz locale w swoich server actions">

Możesz chcieć uzyskać dostęp do bieżącego locale'a z wnętrza twoich server actions lub API endpoints.
Możesz to zrobić używając helpera `getLocale` z `intlayer`.

Oto przykład używający server functions TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Pobierz cookie z żądania (domyślnie: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Pobierz nagłówek z żądania (domyślnie: 'x-intlayer-locale')
    // Fallback używający negocjacji Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Pobierz zawartość używając getIntlayerAsync()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

</Step>

<Step number={14} title="Zarządzaj stronami not found">

Gdy użytkownik odwiedzi nieistniejącą stronę, możesz wyświetlić niestandardową stronę not found, a prefiks locale'a może wpłynąć na sposób, w jaki strona not found jest wyzwalana.

#### Lokalizowana strona główna

> Jeśli chcesz użyć swojej zawartości w atrybucie `string`, takim jak `alt`, `title`, `href`, `aria-label`, itp., możesz użyć wartości funkcji, na przykład:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Aby dowiedzieć się więcej o hooku `useIntlayer`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useIntlayer.md).

</Step>

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

</Step>

<Step number={11} title="Zarządzanie atrybutami HTML">

return (
<html dir={getHTMLTextDir(locale)} lang={locale}>
{/* ... _/}
</html>
);
} {/_ ... */}
</html>
);
}

export const Route = createFileRoute("/{-$locale}/")({
component: RouteComponent,
head: async ({ params }) => {
const { locale = defaultLocale } = params;
const path = "/"; // The path for this route

    const metaContent = await getIntlayerAsync("app", locale);

````

> Jeśli `head` czyta kilka słowników, rozwiąż je przez `Promise.all`; oczekiwanie na każde `getIntlayerAsync` w osobnej linii łańcuchuje żądania zamiast wykonywać je równolegle.

Kompromis: dynamiczny import jest rozwiązywany w trakcie działania `head`, na ścieżce krytycznej renderowania dokumentu. Na „zimnej” trasie opóźnia to `head` o kilka milisekund i może nieznacznie pogorszyć **LCP**.

</Tab>

<Tab label="Buforowane rozwiązywanie dynamiczne" value="cached">

Rozwiąż słownik w `loaderze` trasy i odczytaj go z `loaderData` w `head`. Loadery dopasowanych tras działają równolegle, a `staleTime: Infinity` informuje TanStack Router, że wynik nigdy się nie dezaktualizuje, fragment per-lokalizacja jest więc rozwiązywany raz, a potem serwowany z cache routera, pozostawiając `head` synchronicznym.

```tsx fileName="src/routes/{-$locale}/index.tsx"
      return getCookie(name, cookieString);
    },
    // Pobierz nagłówek z żądania (domyślnie: 'x-intlayer-locale')
    // Rezerwowe rozwiązanie przy użyciu negocjacji Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Pobierz treść za pomocą getIntlayer()
  const content = getIntlayer("app", locale);

````

---

</Step>

<Step number={15} title="Zarządzanie stronami &quot;nie znaleziono&quot;">

Gdy użytkownik odwiedza nieistniejącą stronę, możesz wyświetlić niestandardową stronę "nie znaleziono", a prefiks lokalizacji może wpływać na sposób wyzwalania strony "nie znaleziono".

#### Zrozumienie obsługi 404 w TanStack Router z prefiksami lokalizacji

W TanStack Router obsługa stron 404 z zlokalizowanymi trasami wymaga podejścia wielowarstwowego:

1. **Dedykowana trasa 404**: Konkretna trasa do wyświetlenia interfejsu 404
2. **Walidacja na poziomie trasy**: Weryfikuje prefiksy lokalizacji i przekierowuje nieprawidłowe do 404
3. **Trasa catch-all**: Przechwytuje wszystkie niedopasowane ścieżki w segmencie lokalizacji

```tsx fileName="src/routes/{-$locale}/404.tsx"

```

```tsx fileName="src/routes/{-$locale}/route.tsx"

```

```tsx fileName="src/routes/{-$locale}/$.tsx"

```

</Step>

<Step number={17} title="Wyodrębnij zawartość swoich komponentów" isOptional={true}>

Jeśli masz istniejącą bazę kodu, transformacja tysięcy plików może być czasochłonna.

Aby ułatwić ten proces, Intlayer proponuje [kompilator](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) / [ekstraktor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md), aby przetransformować komponenty i wyodrębnić zawartość.

Aby go skonfigurować, możesz dodać sekcję `compiler` w pliku `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

    /**
     * Definiuje ścieżkę plików wyjściowych
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

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

```

```bash packageManager="pnpm"

```

```bash packageManager="yarn"

```

```bash packageManager="bun"

 </Tab>
</Tabs>

bun x intlayer extract
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
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

---

bun run build # Or bun run dev
import { localeFlatMap } from "intlayer";
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
    // ... pozostałe wtyczki
    tanstackStart({
      // ... pozostała konfiguracja
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

Następnie utwórz trasę `src/routes/sitemap[.]xml.ts`, która wykorzystuje funkcję `generateSitemap`:

````typescript fileName="src/routes/sitemap[.]xml.ts"

---

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
{
  // ... twoje istniejące konfiguracje
  include: [
    // ... twoje istniejące includy
    ".intlayer/**/*.ts", // Dołącz auto-generowane typy
  ],
}

### Konfiguracja Git

Zaleca się ignorować pliki generowane przez Intlayer. Pozwala to uniknąć zatwierdzania ich w repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
````

---

## Rozszerzenie VS Code

Aby ulepszyć doświadczenie programistyczne dzięki Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie zapewnia:

- **Autouzupełnianie** dla kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy inline** przetłumaczonej zawartości.
- **Szybkie akcje** do łatwego tworzenia i aktualizacji tłumaczeń.

Aby uzyskać więcej szczegółów na temat korzystania z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

## Idź dalej

Aby pójść dalej, możesz wdrożyć [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub externalizować swoją zawartość przy użyciu [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

---

## Referencje Dokumentacji

- [Dokumentacja Intlayer](https://intlayer.org)
- [Dokumentacja Tanstack Start](https://reactrouter.com/)
- [hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useIntlayer.md)
- [hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md)
- [Deklaracja Zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md)
- [Konfiguracja](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)

## Często Zadawane Pytania

<FAQ>

<Question title="Jakie są różne rozwiązania dostępne do internacjonalizacji aplikacji TanStack Start?">

TanStack Start nie posiada własnej warstwy i18n, więc wybór sprowadza się do bibliotek:

- **`i18next` / `react-i18next`** oraz **`react-intl`**: popularne biblioteki oparte na przestrzeniach nazw JSON ładowanych w runtime.
- **`Intlayer`**: najbardziej zaawansowane rozwiązanie. Treści deklarowane w dowolnym miejscu bazy kodu ([obok każdego komponentu lub centralnie](https://intlayer.org/blog/per-component-vs-centralized-i18n)) i kompilowane w czasie budowy, w pełni typowane, z tłumaczeniem AI, edytorem wizualnym i systemem CMS.

Główną zaletą w TanStack Start jest ścisła integracja z SSR i prerenderowaniem, brak konieczności przesyłania niepotrzebnych słowników na klienta oraz autouzupełnianie TypeScript. Zobacz [dlaczego Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md).

</Question>

<Question title="O ile i18n zwiększa rozmiar mojego bundle'a w TanStack Start?">

Znacznie mniej niż rozwiązania oparte na przestrzeniach nazw, ponieważ strona nigdy nie pobiera katalogu, którego nie renderuje. Kompilator czasu budowy zastępuje wywołania `useIntlayer` dokładnymi wpisami ze słownika, których używa komponent, dzięki czemu nieużywane klucze i nieużywane języki są usuwane, a [słowniki dynamiczne](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md) dzielą resztę na poszczególne języki. W porównaniu z typowymi alternatywami, Intlayer zmniejsza rozmiar bundle'a i strony nawet o 50%. Zobacz [optymalizację bundle'a](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) oraz [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md).

</Question>

<Question title="Czy mogę zmigrować z react-i18next lub react-intl bez przepisywania moich komponentów?">

Tak, i są dwie drogi. Możesz migrować treść stopniowo za pomocą [przewodnika migracji z react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_react-i18next_to_intlayer.md). Możesz także zachować obecne API: [adaptery kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md) udostępniają dokładnie to samo API co `react-i18next` i `react-intl`, ale zasilane słownikami Intlayer.

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

<Question title="Czy Intlayer obsługuje renderowanie po stronie serwera (SSR) i prerenderowanie w TanStack Start?">

Tak. Treść jest rozwiązywana podczas SSR, a przewodnik opisuje konfigurację prerenderowania, która generuje jeden statyczny dokument HTML na każdy język.

</Question>

<Question title="Jak dodać tagi hreflang i zlokalizowaną mapę witryny?">

Użyj wbudowanej funkcji `generateSitemap` w trasie `src/routes/sitemap[.]xml.ts`. Emituje ona tagi alternatywne `xhtml:link` dla każdego zadeklarowanego języka oraz wpis `x-default`, informując wyszukiwarki o wersjach językowych.

</Question>

<Question title="Czy muszę umieszczać lokalizację w adresie URL?">

Nie. Opcja `routing.mode` kontroluje schemat adresów URL: `"prefix-no-default"` (domyślnie: `/about` i `/pl/about`), `"prefix-all"`, `"no-prefix"` oraz `"search-params"`. Opcja `routing.domains` pozwala przypisać każdy język do własnej domeny. Zobacz [dokumentację konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Question>

<Question title="Jak zbudować przełącznik języka, który pozostaje na bieżącej trasie?">

Użyj hooka `useLocale` wraz ze zlokalizowanym komponentem linku opisanym w kroku 9. `useLocale` udostępnia aktywny język, dostępne lokalizacje oraz funkcję zmiany języka z zachowaniem bieżącej ścieżki.

</Question>

<Question title="Jak obsługiwać strony 404 na zlokalizowanych trasach?">

Krok 14 to opisuje. Funkcja `validatePrefix` sprawdza, czy segment języka w adresie URL jest zadeklarowanym językiem, dzięki czemu `/xx/about` zwraca prawdziwy błąd 404 zamiast renderowania duplikatu strony.

</Question>

<Question title="Jak automatycznie przetłumaczyć aplikację TanStack Start za pomocą AI?">

Uruchom `npx intlayer fill`. Narzędzie CLI znajduje brakujące tłumaczenia i uzupełnia je za pomocą wybranego modelu LLM, korzystając z Twojego dostawcy i klucza API. Flaga `--git-diff` ogranicza operację do treści zmienionych na bieżącej gałęzi. Zobacz [polecenie fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md) oraz [integrację CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/CI_CD.md).

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
