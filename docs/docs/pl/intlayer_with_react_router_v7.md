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

**Pełny zasięg routera React**

Intlayer jest zoptymalizowany do doskonałej współpracy z React Router, oferując **routing uwzględniający ustawienia lokalne**, **oprogramowanie pośredniczące do wykrywania ustawień regionalnych** i wszystkie funkcje potrzebne do skalowania internacjonalizacji (i18n).

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

---

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

## Odnośniki do dokumentacji

Aby uzyskać więcej informacji na temat funkcji i zaawansowanych konfiguracji:

- [Dokumentacja Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/introduction.md)
- [Konfiguracja Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)
- [Przewodnik po zawartości Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_extention.md)
- [Dokumentacja React Router v7](https://reactrouter.com/)

---

## Często Zadawane Pytania

<FAQ>

<Question title="Jakie są różne rozwiązania dostępne do internacjonalizacji aplikacji React Router v7?">

Do internacjonalizacji aplikacji React Router v7 możesz wybierać spośród kilku podejść:

1. **Intlayer**: Nowoczesne, kompleksowe rozwiązanie oferujące deklaracje zawartości na poziomie komponentu, ścisłe bezpieczeństwo typów TypeScript, automatyczne generowanie słowników oraz wbudowane narzędzia dla edytora/AI (np. integrację z Edytorem Wizualnym i CMS). Obsługuje zarówno tryb biblioteki (SPA), jak i tryb frameworka React Router v7 (SSR, akcje i loadery).
2. **react-i18next**: Dojrzały i powszechnie używany ekosystem oparty na formacie JSON. Wymaga manualnego zarządzania przestrzeniami nazw, kluczami tłumaczeń i oddzielnymi plikami JSON, z ograniczonym automatycznym wnioskowaniem typów w porównaniu do podejścia Intlayer opartego na schematach.
3. **react-intl / FormatJS**: Skupia się na standardzie formatowania wiadomości ICU. Znakomicie radzi sobie z formatowaniem liczb, dat i zaawansowanymi regułami liczby mnogiej, ale wymaga manualnej konfiguracji pipeline'u wyodrębniania wiadomości.
4. **Własne podejście oparte na kontekście (Context API)**: Prosty React Context przechowujący bieżącą lokalizację i mapę ciągów znaków. Odpowiedni tylko dla bardzo małych projektów ze względu na brak optymalizacji bundle'a, bezpieczeństwa typów czy zaawansowanych funkcji formatowania.

</Question>

<Question title="O ile i18n zwiększa rozmiar mojego bundle'a w React Router?">

Wpływ na bundle zależy od wybranego narzędzia i strategii ładowania:

- **Dzięki Intlayer**: Do bundle'a klienta dołączany jest jedynie minimalny runtime. Twoje deklaracje zawartości są kompilowane i mogą być dzielone na poziomie stron lub komponentów - użytkownicy pobierają tylko tłumaczenia dla bieżącej lokalizacji i aktualnie odwiedzanych tras.
- **Tradycyjne biblioteki oparte na JSON**: Często ładują duże pliki JSON z tłumaczeniami na starcie, chyba że manualnie skonfigurujesz dynamiczny import i podział przestrzeni nazw na poziomie tras.
- **W trybie frameworka React Router v7**: Dane słowników mogą być przekazywane przez `loader`, co całkowicie eliminuje potrzebę dołączania nieużywanych tłumaczeń do początkowego ładunku JavaScriptu.

</Question>

<Question title="Czy mogę zmigrować z react-i18next lub react-intl bez przepisywania moich komponentów?">

Tak. Możesz przeprowadzić stopniową migrację:

1. Zainstaluj `intlayer` i `react-intlayer`.
2. Skonfiguruj `intlayer.config.ts` ze swoimi lokalizacjami.
3. Przekształcaj swoje komponenty trasa po trasie lub komponent po komponencie - Intlayer może współistnieć z `react-i18next` lub `react-intl` podczas okresu przejściowego.
4. Przekształć ciągi znaków `t('key')` na deklaracje `content.ts` i wywołania hooka `useIntlayer()`.

</Question>

<Question title="Czy mogę zachować moje istniejące pliki tłumaczeń JSON?">

Tak! Intlayer obsługuje deklaracje zawartości w plikach JSON (`.content.json`), a także w formatach TypeScript (`.content.ts`), JavaScript (`.content.mjs`) czy YAML. Jeśli masz już istniejące pliki JSON, możesz je zaadaptować do formatu słowników Intlayer, zachowując istniejącą strukturę kluczy i stopniowo dodając bezpieczeństwo typów.

</Question>

<Question title="Czy muszę przenosić moją zawartość klucz po kluczu?">

Nie. Ponieważ deklaracje zawartości Intlayer są zwykłymi obiektami JavaScript/TypeScript lub JSON, możesz przenieść całe sekcje swoich starych plików tłumaczeń jednocześnie. Możesz również zorganizować zawartość bezpośrednio w pobliżu komponentów, które z niej korzystają (deklaracja na poziomie komponentu), zamiast utrzymywać jeden gigantyczny, scentralizowany plik tłumaczeń.

</Question>

<Question title="Jakie narzędzia dla edytora i agentów AI są dostępne?">

Intlayer oferuje:

- **Edytor Wizualny**: Rozszerzenie przeglądarki i wbudowana nakładka umożliwiająca edycję tekstów bezpośrednio w działającej aplikacji z podglądem na żywo.
- **Zintegrowany CMS**: Umożliwia zespołom nietechnicznym zarządzanie treścią bez konieczności wypychania kodu czy ponownego wdrażania aplikacji.
- **Wsparcie CLI i agentów AI**: Narzędzie CLI Intlayer może audytować brakujące tłumaczenia, automatycznie wypełniać brakujące teksty przy użyciu modeli językowych i sprawdzać zgodność typów w potokach CI/CD.

</Question>

<Question title="Jak dodać segment lokalizacji do moich tras?">

W konfiguracji tras React Router v7 owiń swoje zlokalizowane trasy w parametr ścieżki `:locale`:

```tsx
// app/routes.ts
import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  route(":locale?", "./routes/layout.tsx", [
    index("./routes/home.tsx"),
    route("about", "./routes/about.tsx"),
  ]),
] satisfies RouteConfig;
```

W komponencie layoutu lub middleware odczytaj parametr `:locale`, sprawdź jego poprawność względem skonfigurowanych lokalizacji i opakuj poddrzewo w `IntlayerProvider`:

```tsx
// app/routes/layout.tsx
import { useParams, Outlet } from "react-router";
import { IntlayerProvider } from "react-intlayer";
import { configuration } from "intlayer";

export default function AppLayout() {
  const { locale } = useParams();
  const validLocale = configuration.internationalization.locales.includes(
    locale as any
  )
    ? locale
    : configuration.internationalization.defaultLocale;

  return (
    <IntlayerProvider locale={validLocale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

</Question>

<Question title="Czy muszę umieszczać lokalizację w adresie URL?">

Nie. Choć umieszczanie lokalizacji w adresie URL (np. `/pl/about`) jest zalecane ze względów SEO, możesz również zarządzać lokalizacją za pośrednictwem:

- **Ciasteczka (Cookie)**: Zapisuj preferencję językową w ciasteczku i odczytuj ją na serwerze lub kliencie.
- **Nagłówka `Accept-Language`**: Wykrywaj preferowany język przeglądarki użytkownika w swoich loaderach.
- **Pamięci lokalnej klienta (LocalStorage) lub stanu sesji**: Zarządzaj językiem w stanie po stronie klienta bez modyfikowania struktury URL (idealne dla chronionych paneli użytkownika lub intranetów).

</Question>

<Question title="Czy to działa z React Routerem w trybie frameworka, z SSR i loaderami?">

Tak! W trybie frameworka React Router v7 możesz wywoływać funkcje Intlayer wewnątrz funkcji `loader` i `action`:

```tsx
// app/routes/home.tsx
import type { Route } from "./+types/home";
import { getIntlayer } from "intlayer";
import homeContent from "./home.content";

export async function loader({ params }: Route.LoaderArgs) {
  const content = getIntlayer(homeContent, params.locale);
  return { title: content.title };
}
```

Wewnątrz komponentów React nadal możesz używać `useIntlayer()` do renderowania po stronie klienta i hydratacji.

</Question>

<Question title="Jak dodać tagi hreflang dla SEO?">

W trybie frameworka React Router wyeksportuj funkcję `meta` ze swojej trasy, aby dynamicznie wstrzykiwać linki canonical i hreflang:

```tsx
// app/routes/home.tsx
import type { Route } from "./+types/home";
import { configuration } from "intlayer";

export function meta({ params }: Route.MetaArgs) {
  const currentPath = "home"; // dynamicznie określ na podstawie bieżącej trasy
  const baseUrl = "https://twojadomena.pl";

  const hreflangLinks = configuration.internationalization.locales.map(
    (loc) => ({
      tagName: "link" as const,
      rel: "alternate",
      hrefLang: loc,
      href: `${baseUrl}/${loc}/${currentPath}`,
    })
  );

  return [
    ...hreflangLinks,
    {
      tagName: "link" as const,
      rel: "alternate",
      hrefLang: "x-default",
      href: `${baseUrl}/${configuration.internationalization.defaultLocale}/${currentPath}`,
    },
  ];
}
```

</Question>

<Question title="Jak zbudować przełącznik języka, który pozostaje na bieżącej stronie?">

Użyj hooka `useLocation` i `useNavigate` z React Router, aby podmienić segment lokalizacji w bieżącym adresie URL:

```tsx
import { useLocation, useNavigate, useParams } from "react-router";
import { Locales, configuration } from "intlayer";

export function LocaleSwitcher() {
  const location = useLocation();
  const navigate = useNavigate();
  const { locale: currentLocale } = useParams();

  const handleLocaleChange = (newLocale: Locales) => {
    // Podmień segment lokalizacji na początku ścieżki
    const segments = location.pathname.split("/").filter(Boolean);
    if (
      configuration.internationalization.locales.includes(segments[0] as any)
    ) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    navigate(`/${segments.join("/")}${location.search}${location.hash}`);
  };

  return (
    <select
      value={currentLocale}
      onChange={(e) => handleLocaleChange(e.target.value as Locales)}
    >
      {configuration.internationalization.locales.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
}
```

</Question>

<Question title="Jak automatycznie przetłumaczyć aplikację za pomocą AI?">

Narzędzie CLI Intlayer zawiera wbudowane komendy do tłumaczenia deklaracji zawartości za pomocą modeli sztucznej inteligencji:

```bash
npx intlayer trans
```

Ta komenda skanuje pliki `.content.ts`, identyfikuje brakujące tłumaczenia dla wszystkich skonfigurowanych lokalizacji i uzupełnia je automatycznie z zachowaniem kontekstu i formatowania.

</Question>

<Question title="Czy Intlayer obsługuje formy mnogie, płeć i sformatowany tekst (rich text)?">

Tak:

- **Liczba mnoga**: Użyj funkcji `t()`, aby zdefiniować warianty dla różnych wartości liczbowych lub precyzyjnych reguł gramatycznych.
- **Płeć / Warunki**: Użyj instrukcji warunkowych lub dopasowania wzorców w swoich deklaracjach zawartości TypeScript.
- **Sformatowany tekst (Rich Text / JSX)**: Wstawiaj komponenty JSX, elementy HTML lub węzły Markdown bezpośrednio do deklaracji zawartości bez konieczności stosowania skomplikowanych parserów.

</Question>

<Question title="Jak tłumacze mogą edytować treść bez dotykania kodu?">

Intlayer udostępnia hostowany lub samodzielnie hostowany CMS oraz wbudowany Edytor Wizualny. Tłumacze i menedżerowie treści mogą edytować teksty w interfejsie graficznym. Zmiany mogą być zapisywane z powrotem w repozytorium kodu za pośrednictwem commitów Git lub synchronizowane przez API Intlayer CMS bez konieczności ponownego wdrażania.

</Question>

<Question title="Czy Intlayer jest darmowy i open source?">

Tak! Rdzeń Intlayer, biblioteki integracyjne (`react-intlayer`, `next-intlayer` itp.), narzędzie CLI oraz powiązane narzędzia programistyczne są w 100% open-source pod licencją MIT.

</Question>

</FAQ>
