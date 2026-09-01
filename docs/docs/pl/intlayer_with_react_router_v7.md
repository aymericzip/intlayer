---
title: Jak umiędzynarodowić (i18n) aplikację React Router v7 za pomocą Intlayer
createdAt: 2025-02-07
updatedAt: 2026-08-30
description: Zintegruj Intlayer z React Router v7, aby stworzyć w pełni wielojęzyczną aplikację z optymalnym SEO i routingiem.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - Routing lokalizacji
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-template
applicationShowcase: https://intlayer-react-router-v7.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Aktualizacja użycia API useIntlayer w Solid do bezpośredniego dostępu do właściwości"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Dodaj polecenie init"
  - version: 7.5.6
    date: 2025-12-27
    changes: "Zaktualizuj Layout i obsłuż 404"
  - version: 6.1.5
    date: 2025-10-03
    changes: "Zaktualizowano dokumentację"
  - version: 5.8.2
    date: 2025-09-04
    changes: "Dodano dla React Router v7"
author: aymericzip
---

# Przetłumacz swoją stronę React Router v7 za pomocą Intlayer | Internacjonalizacja (i18n)

Ten przewodnik pokazuje, jak zintegrować **Intlayer** dla płynnej internacjonalizacji w projektach React Router v7 z routingiem uwzględniającym lokalizację, wsparciem TypeScript oraz nowoczesnymi praktykami programistycznymi.

Ten przewodnik skupia się na routowaniu frontend. W przypadku routowania fs-routes, zapoznaj się z przewodnikiem [Intlayer with React Router v7 File-System Routes](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_react_router_v7_fs_routes.md).

## Table of Contents

<TOC/>

## Dlaczego Interlayer zamiast alternatyw?

W porównaniu do głównych rozwiązań, takich jak „react-i18next” lub „i18next”, Intlayer jest rozwiązaniem wyposażonym w zintegrowane optymalizacje, takie jak:

<AccordionGroup>
<Accordion header="Pełny zasięg routera React">

Intlayer jest zoptymalizowany do doskonałej współpracy z React Router, oferując **routing uwzględniający ustawienia lokalne**, **oprogramowanie pośredniczące do wykrywania ustawień regionalnych** i wszystkie funkcje potrzebne do skalowania internacjonalizacji (i18n).

</Accordion>

<Accordion header="Rozmiar bundle'a">

Zamiast ładować ogromne pliki JSON na swoje strony, ładuj tylko niezbędną treść. Intlayer pomaga **zmniejszyć rozmiary bundle'a i stron nawet o 50%**.

</Accordion>

<Accordion header="Łatwość konserwacji">

Określanie zakresu zawartości aplikacji **ułatwia konserwację** aplikacji na dużą skalę. Możesz powielić lub usunąć pojedynczy folder funkcji bez obciążania psychicznego koniecznością przeglądania całej bazy kodu zawartości. Dodatkowo Inlayer jest **w pełni napisany**, aby zapewnić dokładność treści.

</Accordion>

<Accordion header="AI Agent">

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

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji React Router v7

<Steps>

<Step number={1} title="Zainstaluj zależności">

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

  Główny pakiet, który dostarcza narzędzia do internacjonalizacji, zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilecji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md).

- **react-intlayer**
  Pakiet integrujący Intlayer z aplikacją React. Zapewnia dostawców kontekstu oraz hooki do internacjonalizacji w React.

- **vite-intlayer**
  Zawiera wtyczkę Vite do integracji Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami oraz obsługi przekierowań URL.

</Step>

<Step number={2} title="Konfiguracja Twojego projektu">

</Step>

</Steps>

## Przewodnik krok po kroku dotyczący konfiguracji Intlayer w aplikacji React Router v7 z trasami opartymi na systemie plików

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="How to translate an React Router v7 app using Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-router-v7-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-react-router-v7.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-react-router-v7-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

See [Application Template](https://github.com/aymericzip/intlayer-react-router-v7-template) on GitHub.

Utwórz plik konfiguracyjny, aby skonfigurować języki swojej aplikacji:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> Za pomocą tego pliku konfiguracyjnego możesz ustawić lokalizowane adresy URL, przekierowania w middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji zawartości, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracyjnej](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

<Steps>

<Step number={3} title="Integracja Intlayer w konfiguracji Vite">

Dodaj wtyczkę intlayer do swojej konfiguracji:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [reactRouter(), intlayer()],
});
```

> Wtyczka Vite `intlayer()` służy do integracji Intlayer z Vite. Zapewnia budowanie plików deklaracji zawartości i monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Vite. Dodatkowo dostarcza aliasy w celu optymalizacji wydajności.

</Step>

<Step number={4} title="Konfiguracja tras React Router v7">

Skonfiguruj routing z trasami uwzględniającymi lokalizację:

```typescript fileName="app/routes.ts"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  route("/:lang?", "routes/page.tsx"), // Lokalizowana strona główna
  route("/:lang?/about", "routes/about/page.tsx"), // Lokalizowana strona o nas
] satisfies RouteConfig;
```

</Step>

<Step number={5} title="Tworzenie komponentów layoutu">

Skonfiguruj swój główny layout oraz layouty specyficzne dla lokalizacji:

#### Główny Layout

```tsx fileName="app/root.tsx"
import { getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import {
  data,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import type { Route } from "./+types/root";

// ... Unchanged App, links and ErrorBoundary code

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);

  if (!locale) {
    throw data("Language not supported", { status: 404 });
  }

  return { locale };
}

export function Layout({
  children,
}: { children: React.ReactNode } & Route.ComponentProps) {
  const data = useLoaderData<typeof loader>();
  const { locale } = data ?? {};

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>

<Step number={6} title="Zadeklaruj swoją zawartość">

Utwórz i zarządzaj deklaracjami zawartości, aby przechowywać tłumaczenia:

```tsx fileName="app/routes/[lang]/page.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      pl: "Twórz wielojęzyczne aplikacje z łatwością, korzystając z React Router v7 i Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      en: "Learn About Us",
      pl: "Dowiedz się o nas",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
    homeLink: t({
      en: "Home",
      pl: "Strona główna",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

> Twoje deklaracje treści mogą być zdefiniowane w dowolnym miejscu w aplikacji, pod warunkiem, że zostaną umieszczone w katalogu `contentDir` (domyślnie `./app`). I muszą odpowiadać rozszerzeniu pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Po więcej szczegółów odsyłamy do [dokumentacji deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

</Step>

<Step number={7} title="Tworzenie komponentów uwzględniających lokalizację">

Utwórz komponent `LocalizedLink` do nawigacji uwzględniającej lokalizację:

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

// Funkcja lokalizująca ścieżkę na podstawie podanego locale
export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to; // Zwraca link zewnętrzny bez zmian
    }

    return getLocalizedUrl(to, locale); // Zwraca lokalizowany URL
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to; // Zwraca link zewnętrzny bez zmian
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale), // Lokalizuje pathname
  };
};

// Komponent linku lokalizowanego
export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

W przypadku, gdy chcesz nawigować do lokalizowanych tras, możesz użyć hooka `useLocalizedNavigate`:

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "react-intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

</Step>

<Step number={8} title="Wykorzystaj Intlayer na swoich stronach">

Uzyskaj dostęp do swoich słowników treści w całej aplikacji:

#### Lokalizowana strona główna

```tsx fileName="app/routes/[lang]/page.tsx"
import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "~/components/localized-link";

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

> Aby dowiedzieć się więcej o hooku `useIntlayer`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useIntlayer.md).

> Jeśli Twoja aplikacja już istnieje, możesz użyć [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) w połączeniu z [poleceniem extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md), aby przekonwertować tysiące komponentów w jedną sekundę.

</Step>

<Step number={9} title="Utwórz komponent przełącznika języka">

Utwórz komponent, który pozwoli użytkownikom zmieniać języki:

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  Locales,
} from "intlayer";
import { setLocaleInStorage, useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocale(localeItem)}
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* Lokalizacja - np. FR */}
              {localeItem}
            </span>
            <span>
              {/* Język w jego własnej lokalizacji - np. Français */}
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
        </li>
      ))}
    </ol>
  );
};
```

> Aby dowiedzieć się więcej o hooku `useLocale`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md).

</Step>

<Step number={10} title="Dodaj zarządzanie atrybutami HTML">

Utwórz hook do zarządzania atrybutami lang i dir w HTML:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx"
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

```tsx fileName="app/routes/layout.tsx"
import { Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // importuj hook

export default function RootLayout() {
  useI18nHTMLAttributes(); // wywołaj hook

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

</Step>

<Step number={11} title="Dodaj middleware">

Możesz również użyć `intlayerProxy` do dodania routingu po stronie serwera do aplikacji. Ta wtyczka automatycznie wykryje bieżące locale na podstawie adresu URL i ustawi odpowiedni plik cookie locale. Jeśli locale nie zostanie określone, wtyczka określi najbardziej odpowiednie locale na podstawie preferencji języka przeglądarki użytkownika. Jeśli locale nie zostanie wykryte, nastąpi przekierowanie do domyślnego locale.

> Pamiętaj, że aby użyć `intlayerProxy` w produkcji, musisz przenieść pakiet `vite-intlayer` z `devDependencies` do `dependencies`.

> Od wersji Intlayer v9, `intlayerProxy()` jest dołączony bezpośrednio do wtyczki `intlayer()` i domyślnie włączony przez opcję `routing.enableProxy` (`true` domyślnie). Rejestrowanie go oddzielnie, jak pokazano poniżej, jest teraz opcjonalne - jest zachowane dla kompatybilności wstecznej i dla konfiguracji, które muszą kontrolować kolejność wtyczek. Ustaw `routing.enableProxy: false`, aby zrezygnować. Patrz [notatki wydania v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/releases/v9.md).

```typescript {3,7} fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>

<Step number={12} title="Wyodrębnij zawartość swoich komponentów" isOptional={true}>

If you have an existing codebase, transforming thousands of files can be time-consuming.

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

Zaktualizuj `vite.config.ts`, aby dołączyć wtyczkę `intlayerCompiler`:

```ts fileName="vite.config.ts"
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
bun run build # Or bun run dev
```

 </Tab>
</Tabs>

</Step>

</Steps>

## Configure TypeScript

Intlayer uses module augmentation to get benefits of TypeScript and make your codebase stronger.

Ensure your TypeScript configuration includes the autogenerated types:

```json5 fileName="tsconfig.json"
{
  // ... your existing configurations
  include: [
    // ... your existing includes
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

---

## Git Configuration

It is recommended to ignore the files generated by Intlayer. This allows you to avoid committing them to your Git repository.

To do this, you can add the following instructions to your `.gitignore` file:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

---

## VS Code Extension

To improve your development experience with Intlayer, you can install the official **Intlayer VS Code Extension**.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

This extension provides:

- **Autocompletion** for translation keys.
- **Real-time error detection** for missing translations.
- **Inline previews** of translated content.
- **Quick actions** to easily create and update translations.

For more details on how to use the extension, refer to the [Intlayer VS Code Extension documentation](https://intlayer.org/doc/vs-code-extension).

---

## Idź dalej

Aby pójść dalej, możesz wdrożyć [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyeksternalizować swoje treści za pomocą [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

---

## Odnośniki do dokumentacji

- [Dokumentacja Intlayer](https://intlayer.org)
- [Dokumentacja React Router v7](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md)
- [Deklaracja zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md)
- [Konfiguracja](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)

Ten kompleksowy przewodnik zawiera wszystko, czego potrzebujesz, aby zintegrować Intlayer z React Router v7 w celu uzyskania w pełni umiędzynarodowionej aplikacji z routingiem uwzględniającym lokalizację i obsługą TypeScript.

## Często Zadawane Pytania

<FAQ>

<Question title="Czym różnią się rozwiązania i18n dla React Router v7?">

React Router v7 nie dostarcza warstwy komunikatów, więc łączy się go z biblioteką i18n:

- **`react-i18next` / `i18next`**: przestrzenie nazw JSON ładowane w czasie wykonywania, z osobnym detektorem lokalizacji podłączanym do routera.
- **`react-intl`** i **`Lingui`**: komunikaty ICU z krokiem ekstrakcji.
- **`Intlayer`**: zawartość deklarowana w dowolnym miejscu w bazie kodu ([obok każdego komponentu lub centralnie](https://intlayer.org/blog/per-component-vs-centralized-i18n)), kompilowana w czasie budowania, w pełni typowana, z pomocnikami routingu uwzględniającymi lokalizację, tłumaczeniem AI, edytorem wizualnym i CMS.

Zobacz [dlaczego Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md) oraz [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md).

</Question>

<Question title="Ile i18n dodaje do rozmiaru bundle React Router?">

Znacznie mniej niż konfiguracja oparta na przestrzeniach nazw, ponieważ strona nigdy nie pobiera katalogu, którego nie renderuje. Narzut renderowany po stronie serwera rozwiązuje zawartość na serwerze, a kompilator w czasie budowania zastępuje wywołania `useIntlayer` dokładnymi wpisami słownika, których używa komponent, dzięki czemu nieużywane klucze i nieużywane języki są usuwane, a [dynamiczne słowniki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md) dzielą resztę według lokalizacji. W porównaniu ze zwykłymi alternatywami Intlayer zmniejsza rozmiar bundle i stron nawet o 50%. Zobacz [optymalizację bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) oraz [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md).

</Question>

<Question title="Czy mogę migrować z `react-i18next` lub `react-intl` bez przepisywania komponentów?">

Tak, istnieją dwie ścieżki. Możesz migrować zawartość stopniowo za pomocą [przewodnika migracji z react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_react-i18next_to_intlayer.md) lub [przewodnika migracji z i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md). Albo możesz w pełni zachować obecne API: [adaptery kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md) udostępniają dokładnie to samo API co `react-i18next`, `react-intl` i `i18next`, ale obsługiwane przez słowniki Intlayer, więc zmieniają się tylko importy, a kod komponentów pozostaje bez zmian.

</Question>

<Question title="Czy mogę zachować istniejące pliki tłumaczeń JSON?">

Tak. [Wtyczka sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) utrzymuje pliki `/messages/{locale}/{namespace}.json` jako źródło prawdy i generuje z nich słowniki Intlayer w obu kierunkach. [Wtyczka sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-po.md) robi to samo dla katalogów gettext, a [pliki dla poszczególnych lokalizacji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/per_locale_file.md) pozwalają dzielić zawartość według języków zamiast grupować wszystkie lokalizacje w jednym pliku.

</Question>

<Question title="Czy muszę przenosić zawartość klucz po kluczu?">

Nie. Uruchom `npx intlayer extract`, a Intlayer odczyta Twoje komponenty, wyciągnie ciągi widoczne dla użytkownika i zapisze plik `.content` obok każdego z nich, dzięki czemu przeglądasz diff zamiast kopiować ciągi do katalogu pojedynczo. Krok 12 tego przewodnika opisuje to szczegółowo.

W przypadku w pełni zautomatyzowanego potoku [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md) robi to samo w czasie budowania: skanuje źródła JSX, TSX, Vue i Svelte przy każdej zmianie, generuje słowniki i utrzymuje je w synchronizacji za pośrednictwem HMR, więc nie ma żadnych kluczy do ręcznego utrzymywania.

Warto znać dwa ograniczenia przed włączeniem kompilatora. Działa on na zasadzie analizy statycznej, więc ciągi istniejące tylko w czasie wykonywania, takie jak kody błędów API czy pola CMS, pozostają poza zasięgiem. Ponadto musi odróżniać tekst widoczny dla użytkownika od logiki aplikacji, takiej jak `className="active"` czy kod statusu, co wymaga kilku adnotacji w dużej bazie kodu. [Polecenie extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md) unika obu tych problemów.

</Question>

<Question title="Jakie narzędzia dla edytora i agentów AI są dostępne?">

Pięć narzędzi, wszystkie opcjonalne:

- **[Rozszerzenie VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)**: przejdź od klucza `useIntlayer` do pliku zawartości, który go deklaruje, wyodrębnij zawartość z komponentu i uruchamiaj build, fill, test, push i pull z palety poleceń lub dedykowanej karty Intlayer.
- **[Serwer LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/lsp.md)**: te same możliwości w dowolnym edytorze obsługującym LSP: przejście do definicji, znajdowanie referencji, podgląd po najechaniu kursorem, autouzupełnianie kluczy i pól oraz ostrzeżenia, gdy klucz nie jest zadeklarowany. Rozpoznaje również wywołania `i18next`, `react-i18next`, `next-intl` i `use-intl`.
- **[Serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)**: udostępnia dokumentację i CLI Intlayer dla Cursor, VS Code, Claude Desktop, Claude Code i ChatGPT.
- **[Umiejętności agentów](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/agent_skills.md)**: ukierunkowane umiejętności, takie jak `intlayer-config`, `intlayer-cli` i `intlayer-content`, plus jedna na framework.
- **[Wtyczka ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md)**: `no-raw-text` oznacza zakodowane na stałe ciągi znaków.

</Question>

<Question title="Jak dodać segment lokalizacji do moich tras?">

Zadeklaruj segment `:locale` w drzewie tras i pozwól Intlayer go rozpoznać. `validatePrefix` informuje, czy segment jest zadeklarowaną lokalizacją, dzięki czemu nieznany prefiks zwraca 404 zamiast renderować zduplikowaną stronę, a `getLocalizedUrl` przepisuje dowolną ścieżkę na język docelowy. Jeśli używasz tras opartych na systemie plików, postępuj zgodnie z [wariantem tras z systemem plików](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_react_router_v7_fs_routes.md) tego przewodnika.

</Question>

<Question title="Czy muszę umieszczać lokalizację w adresie URL?">

Nie. `routing.mode` akceptuje `"prefix-no-default"` (domyślnie), `"prefix-all"`, `"no-prefix"` oraz `"search-params"`, a `routing.domains` mapuje lokalizację na jej własną domenę. Lokalizacja jest zachowywana w pliku cookie w każdym przypadku. Zobacz [referencję konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

</Question>

<Question title="Czy działa z React Router w trybie frameworka, z SSR i loaderami?">

Tak. Zawartość jest rozwiązywana podczas renderowania po stronie serwera, a aktywna lokalizacja jest dostępna w loaderach i akcjach, dzięki czemu dane serwera mogą być lokalizowane w tym samym przebiegu co strona. Nawigacja po stronie klienta zachowuje lokalizację bez pełnego przeładowania.

</Question>

<Question title="Jak dodać tagi hreflang dla SEO?">

Zbuduj mapę alternatyw za pomocą `getMultilingualUrls` i wyeksportuj ją z `meta` lub `links` swojej trasy, w tym wpis `x-default`. Ten sam pomocnik zasila zlokalizowany `sitemap.xml`.

</Question>

<Question title="Jak zbudować przełącznik języków, który pozostaje na bieżącej stronie?">

Użyj `useLocale` dla aktywnej i dostępnych lokalizacji oraz `getLocalizedUrl`, aby przetłumaczyć bieżącą ścieżkę na lokalizację docelową. Użytkownik pozostaje na tej samej trasie zamiast powracać do strony głównej, co zapobiega również utracie pozycji przewijania i parametrów zapytania.

</Question>

<Question title="Jak automatycznie przetłumaczyć aplikację za pomocą AI?">

Uruchom `npx intlayer fill`, który uzupełnia brakujące tłumaczenia za pomocą wybranego LLM przy użyciu własnego dostawcy i klucza API. Zobacz [polecenie fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md) oraz [integrację CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/CI_CD.md).

</Question>

<Question title="Czy Intlayer obsługuje liczby mnogie, płeć i sformatowany tekst?">

Tak: [formy liczby mnogiej](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/plurial.md), [treści oparte na płci](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/gender.md), warunki, [wstawki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/markdown.md) oraz [formatery](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/formatters.md) dla liczb, dat i walut.

</Question>

<Question title="Jak tłumacze mogą edytować treść bez dotykania kodu?">

Za pośrednictwem hostowanego we własnym zakresie [edytora wizualnego](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md), który eksternalizuje treść, dzięki czemu może się zmieniać bez wdrożenia.

</Question>

<Question title="Czy Intlayer jest darmowy i open source?">

Tak, na licencji Apache 2.0, w tym do użytku komercyjnego. Hostowany CMS to opcjonalna płatna usługa, którą można również [hostować samodzielnie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md).

</Question>

</FAQ>
