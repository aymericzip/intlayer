---
createdAt: 2025-12-07
updatedAt: 2025-12-07
title: Jak przetłumaczyć aplikację React Router v7 (File-System Routes) – przewodnik i18n 2025
description: Dowiedz się, jak dodać internacjonalizację (i18n) do swojej aplikacji React Router v7 za pomocą Intlayer z routingiem opartym na systemie plików. Postępuj zgodnie z tym kompleksowym przewodnikiem, aby uczynić swoją aplikację wielojęzyczną z routingiem uwzględniającym lokalizację.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - React Router v7
  - fs-routes
  - Trasy oparte na systemie plików
  - React
  - i18n
  - TypeScript
  - Routing lokalizacji
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7-fs-routes
  - fs-routes
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-template-fs-routes
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 7.3.4
    date: 2025-12-08
    changes: Init history
---

# Przetłumacz swoją stronę React Router v7 (File-System Routes) za pomocą Intlayer | Internacjonalizacja (i18n)

Ten przewodnik pokazuje, jak zintegrować **Intlayer** dla płynnej internacjonalizacji w projektach React Router v7 używając **routingu opartego na systemie plików** (`@react-router/fs-routes`) z routingiem uwzględniającym lokalizację, wsparciem TypeScript oraz nowoczesnymi praktykami programistycznymi.

## Table of Contents

<TOC/>

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna, otwartoźródłowa biblioteka do internacjonalizacji (i18n), zaprojektowana, aby uprościć wsparcie wielojęzyczne w nowoczesnych aplikacjach webowych.

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentów.
- **Dynamicznie lokalizować metadane**, trasy i zawartość.
- **Zapewnić wsparcie TypeScript** dzięki automatycznie generowanym typom, co poprawia autouzupełnianie i wykrywanie błędów.
- **Korzystaj z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i przełączanie lokalizacji.
- **Włącz routing uwzględniający lokalizację** za pomocą systemu routingu opartego na systemie plików w React Router v7.

---

## Przewodnik krok po kroku dotyczący konfiguracji Intlayer w aplikacji React Router v7 z trasami opartymi na systemie plików

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="How to translate your React Router v7 (File-System Routes) app using Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-react-router-v7-template-fs-routes?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

See [Application Template](https://github.com/aymericzip/intlayer-react-router-v7-template-fs-routes) on GitHub.

### Krok 1: Zainstaluj zależności

Zainstaluj niezbędne pakiety, używając preferowanego menedżera pakietów:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npm install @react-router/fs-routes --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm add @react-router/fs-routes --save-dev
```

- **intlayer**

  Główny pakiet, który dostarcza narzędzia do internacjonalizacji, zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilecji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md).

- **react-intlayer**
  Pakiet integrujący Intlayer z aplikacją React. Zapewnia dostawców kontekstu oraz hooki do internacjonalizacji w React.

- **vite-intlayer**
  Zawiera wtyczkę Vite do integracji Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami oraz obsługi przekierowań URL.

- **@react-router/fs-routes**
  Pakiet, który umożliwia routing oparty na systemie plików dla React Router v7.

### Krok 2: Konfiguracja Twojego projektu

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="How to translate your React Router v7 (File-System Routes) app using Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-react-router-v7-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

See [Application Template](https://github.com/aymericzip/intlayer-react-router-v7-template) on GitHub.

Utwórz plik konfiguracyjny, aby skonfigurować języki swojej aplikacji:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// Konfiguracja międzynarodowa
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // Domyślny język
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // Obsługiwane języki
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Konfiguracja międzynarodowa
const config = {
  internationalization: {
    defaultLocale: Locales.ENGLISH, // Domyślny język
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH], // Obsługiwane języki
  },
};

module.exports = config;
```

> Za pomocą tego pliku konfiguracyjnego możesz ustawić lokalizowane adresy URL, przekierowania w middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji zawartości, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracyjnej](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 3: Integracja Intlayer w konfiguracji Vite

Dodaj wtyczkę intlayer do swojej konfiguracji:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer()],
});
```

> Wtyczka Vite `intlayer()` służy do integracji Intlayer z Vite. Zapewnia budowanie plików deklaracji zawartości i monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Vite. Dodatkowo dostarcza aliasy w celu optymalizacji wydajności.

### Krok 4: Konfiguracja tras opartych na systemie plików React Router v7

Skonfiguruj routing, aby używać tras opartych na systemie plików z `flatRoutes`:

```typescript fileName="app/routes.ts"
import type { RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";
import { configuration } from "intlayer";

const routes: RouteConfig = flatRoutes({
  // Ignoruj pliki deklaracji treści, aby nie były traktowane jako trasy
  ignoredRouteFiles: configuration.content.fileExtensions.map(
    (fileExtension) => `**/*${fileExtension}`
  ),
});

export default routes;
```

> Funkcja `flatRoutes` z `@react-router/fs-routes` umożliwia routing oparty na systemie plików, gdzie struktura plików w katalogu `routes/` określa trasy Twojej aplikacji. Opcja `ignoredRouteFiles` zapewnia, że pliki deklaracji treści Intlayer (`.content.ts`, itp.) nie są traktowane jako pliki tras.

### Krok 5: Utwórz pliki tras z konwencjami systemu plików

Przy routingu opartym na systemie plików używasz płaskiej konwencji nazewnictwa, gdzie kropki (`.`) reprezentują segmenty ścieżki, a nawiasy `()` oznaczają opcjonalne segmenty.

Utwórz następujące pliki w katalogu `app/routes/`:

#### Struktura plików

```bash
app/routes/
├── ($locale)._layout.tsx        # Opakowanie layoutu dla tras lokalizacji
├── ($locale)._index.tsx         # Strona główna (/:locale?)
├── ($locale)._index.content.ts  # Zawartość strony głównej
├── ($locale).about.tsx          # Strona O nas (/:locale?/about)
└── ($locale).about.content.ts   # Zawartość strony O nas
```

Konwencje nazewnictwa:

- `($locale)` - Opcjonalny dynamiczny segment dla parametru lokalizacji
- `_layout` - Trasa layoutu, która opakowuje trasy potomne
- `_index` - Trasa indeksowa (renderuje się na ścieżce nadrzędnej)
- `.` (kropka) - Oddziela segmenty ścieżki (np. `($locale).about` → `/:locale?/about`)

#### Komponent Layoutu

```tsx fileName="app/routes/($locale)._layout.tsx"
import { IntlayerProvider } from "react-intlayer";
import { Outlet } from "react-router";

import { useI18nHTMLAttributes } from "~/hooks/useI18nHTMLAttributes";

import type { Route } from "./+types/($locale)._layout";

export default function RootLayout({ params }: Route.ComponentProps) {
  useI18nHTMLAttributes();

  const { locale } = params;

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
```

#### Strona indeksowa

```tsx fileName="app/routes/($locale)._index.tsx"
import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "~/components/localized-link";

import type { Route } from "./+types/($locale)._index";

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

#### Strona O nas

```tsx fileName="app/routes/($locale).about.tsx"
import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "~/components/localized-link";

import type { Route } from "./+types/($locale).about";

export default function AboutPage() {
  const { title, content, homeLink } = useIntlayer("about");

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
      <nav>
        <LocalizedLink to="/">{homeLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

### Krok 6: Zadeklaruj swoją zawartość

Utwórz i zarządzaj deklaracjami zawartości, aby przechowywać tłumaczenia. Umieść pliki zawartości obok plików tras:

```tsx fileName="app/routes/($locale)._index.content.ts"
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
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

```tsx fileName="app/routes/($locale).about.content.ts"
import { t, type Dictionary } from "intlayer";

const aboutContent = {
  key: "about",
  content: {
    title: t({
      en: "About Us",
      es: "Sobre Nosotros",
      fr: "À propos de nous",
    }),
    content: t({
      en: "This is the about page content.",
      es: "Este es el contenido de la página de información.",
      fr: "Ceci est le contenu de la page à propos.",
    }),
    homeLink: t({
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default aboutContent;
```

> Twoje deklaracje treści mogą być zdefiniowane w dowolnym miejscu w aplikacji, pod warunkiem, że zostaną umieszczone w katalogu `contentDir` (domyślnie `./app`). I muszą odpowiadać rozszerzeniu pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Po więcej szczegółów odsyłamy do [dokumentacji deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

### Krok 7: Tworzenie komponentów uwzględniających lokalizację

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

### Krok 8: Utwórz komponent przełącznika języka

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
import { useIntlayer, useLocale } from "react-intlayer";
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
            reloadDocument // Przeładuj stronę, aby zastosować nową lokalizację
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

### Krok 10: Dodaj zarządzanie atrybutami HTML (opcjonalnie)

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

### Krok 10: Dodaj middleware (opcjonalnie)

Możesz również użyć `intlayerProxy`, aby dodać routing po stronie serwera do swojej aplikacji. Ten plugin automatycznie wykryje aktualny locale na podstawie URL i ustawi odpowiedni cookie locale. Jeśli locale nie jest określone, plugin wybierze najbardziej odpowiedni locale na podstawie preferencji językowych przeglądarki użytkownika. Jeśli nie zostanie wykryty żaden locale, nastąpi przekierowanie do domyślnego locale.

> Zauważ, że aby używać `intlayerProxy` w produkcji, musisz przenieść pakiet `vite-intlayer` z `devDependencies` do `dependencies`.

```typescript {3,7} fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), intlayer(), intlayerProxy()],
});
```

---

## Konfiguracja TypeScript

Intlayer wykorzystuje rozszerzanie modułów (module augmentation), aby korzystać z zalet TypeScript i wzmocnić Twoją bazę kodu.

Upewnij się, że Twoja konfiguracja TypeScript zawiera automatycznie generowane typy:

```json5 fileName="tsconfig.json"
{
  // ... twoje istniejące konfiguracje
  include: [
    // ... twoje istniejące dołączenia
    ".intlayer/**/*.ts", // Uwzględnij automatycznie generowane typy
  ],
}
```

---

## Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

---

## Rozszerzenie VS Code

Aby poprawić doświadczenie programistyczne z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy w linii** przetłumaczonej zawartości.
- **Szybkie akcje** umożliwiające łatwe tworzenie i aktualizację tłumaczeń.

Aby uzyskać więcej informacji na temat korzystania z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

---

## Idź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyodrębnić swoją zawartość, korzystając z [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).

---

## Odnośniki do dokumentacji

- [Dokumentacja Intlayer](https://intlayer.org)
- [Dokumentacja React Router v7](https://reactrouter.com/)
- [Dokumentacja React Router fs-routes](https://reactrouter.com/how-to/file-route-conventions)
- [useIntlayer hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md)
- [Deklaracja treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md)
- [Konfiguracja](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)

Ten kompleksowy przewodnik zawiera wszystko, co potrzebne do integracji Intlayer z React Router v7 używając routingu opartego na systemie plików, aby uzyskać w pełni zinternacjonalizowaną aplikację z trasowaniem uwzględniającym lokalizację oraz wsparciem dla TypeScript.
