---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Jak przetłumaczyć swoją aplikację Create React App – przewodnik i18n 2025
description: Dowiedz się, jak uczynić swoją stronę Create React App (CRA) wielojęzyczną. Postępuj zgodnie z dokumentacją, aby zrealizować internacjonalizację (i18n) i tłumaczenie.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Create React App
  - CRA
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - create-react-app
applicationTemplate: https://github.com/aymericzip/intlayer-react-cra-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Przetłumacz swoją stronę Create React App za pomocą Intlayer | Internacjonalizacja (i18n)

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-react-cra-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-react-cra-template) na GitHub.

## Czym jest Intlayer?

**Intlayer** to innowacyjna, open-source’owa biblioteka do internacjonalizacji (i18n), zaprojektowana, aby uprościć wsparcie wielojęzyczne w nowoczesnych aplikacjach webowych.

Dzięki Intlayer możesz:

- **Łatwe zarządzanie tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentów.
- **Dynamiczna lokalizacja metadanych**, tras i treści.
- **Zapewnienie wsparcia dla TypeScript** dzięki automatycznie generowanym typom, co poprawia autouzupełnianie i wykrywanie błędów.
- **Korzystanie z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i zmiana lokalizacji.

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji React

### Krok 1: Instalacja zależności

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npm install intlayer react-intlayer react-scripts-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer react-scripts-intlayer
bunx intlayer init
```

- **intlayer**

- **intlayer**

  Główny pakiet, który dostarcza narzędzia do internacjonalizacji do zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilecji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md).

- **react-intlayer**

  Pakiet integrujący Intlayer z aplikacją React. Zapewnia dostawców kontekstu oraz hooki do internacjonalizacji w React.

- **react-scripts-intlayer**

  Zawiera polecenia `react-scripts-intlayer` oraz wtyczki do integracji Intlayer z aplikacją opartą na Create React App. Te wtyczki bazują na [craco](https://craco.js.org/) i zawierają dodatkową konfigurację dla bundlera [Webpack](https://webpack.js.org/).

### Krok 2: Konfiguracja Twojego projektu

Utwórz plik konfiguracyjny, aby skonfigurować języki swojej aplikacji:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Twoje inne lokalizacje
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Twoje inne lokalizacje
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Twoje inne lokalizacje
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Za pomocą tego pliku konfiguracyjnego możesz ustawić lokalizowane adresy URL, przekierowania w middleware, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji zawartości, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracyjnej](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 3: Zintegruj Intlayer w swojej konfiguracji CRA

Zmień swoje skrypty, aby używać react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> Skrypty `react-scripts-intlayer` bazują na [CRACO](https://craco.js.org/). Możesz również zaimplementować własną konfigurację opartą na wtyczce intlayer craco. [Zobacz przykład tutaj](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Krok 4: Zadeklaruj swoją zawartość

Utwórz i zarządzaj deklaracjami zawartości, aby przechowywać tłumaczenia:

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to reload
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edytuj <code>src/App.tsx</code> i zapisz, aby przeładować
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Get started by editing",
      fr: "Commencez par éditer",
      es: "Comience por editar",
      pl: "Rozpocznij od edycji", // komentarz po polsku
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
        pl: "Poznaj React", // komentarz po polsku
      }),
    },
  },
};

module.exports = appContent;
```

> Twoje deklaracje zawartości mogą być definiowane w dowolnym miejscu w Twojej aplikacji, pod warunkiem, że zostaną umieszczone w katalogu `contentDir` (domyślnie `./src`). I będą miały rozszerzenie pliku deklaracji zawartości (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Aby uzyskać więcej szczegółów, zapoznaj się z [dokumentacją deklaracji zawartości](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

> Jeśli Twój plik zawartości zawiera kod TSX, powinieneś rozważyć import `import React from "react";` w swoim pliku zawartości.

### Krok 5: Wykorzystaj Intlayer w swoim kodzie

Uzyskaj dostęp do swoich słowników zawartości w całej aplikacji:

```tsx {4,7} fileName="src/App.tsx"  codeFormat="typescript"
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {3,6} fileName="src/App.mjx" codeFormat="esm"
import "./App.css";
import logo from "./logo.svg";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

```jsx {3,6} fileName="src/App.csx" codeFormat="commonjs"
require("./App.css");
const logo = require("./logo.svg");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

> Uwaga: Jeśli chcesz użyć swojej zawartości w atrybucie typu `string`, takim jak `alt`, `title`, `href`, `aria-label` itp., musisz wywołać wartość funkcji, na przykład:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Aby dowiedzieć się więcej o hooku `useIntlayer`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useIntlayer.md).

### (Opcjonalny) Krok 6: Zmień język swojej zawartości

Aby zmienić język swojej zawartości, możesz użyć funkcji `setLocale` dostarczonej przez hook `useLocale`. Funkcja ta pozwala ustawić lokalizację aplikacji i odpowiednio zaktualizować zawartość.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Change Language to English
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Zmień język na angielski
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Zmień język na angielski
    </button>
  );
};
```

> Aby dowiedzieć się więcej o hooku `useLocale`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md).

### (Opcjonalny) Krok 7: Dodaj lokalizowane routingi do swojej aplikacji

Celem tego kroku jest utworzenie unikalnych ścieżek dla każdego języka. Jest to przydatne dla SEO oraz przyjaznych dla SEO adresów URL.
Przykład:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Domyślnie trasy nie mają prefiksu dla domyślnej lokalizacji. Jeśli chcesz dodać prefiks dla domyślnej lokalizacji, możesz ustawić opcję `middleware.prefixDefault` na `true` w swojej konfiguracji. Więcej informacji znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

Aby dodać lokalizowane routingi do swojej aplikacji, możesz utworzyć komponent `LocaleRouter`, który opakuje trasy Twojej aplikacji i obsłuży routing oparty na lokalizacji. Oto przykład użycia [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Importowanie niezbędnych zależności i funkcji
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // Funkcje narzędziowe i typy z 'intlayer'
// Funkcje narzędziowe i typy z 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Typy React dla komponentów funkcyjnych i propsów
import { IntlayerProvider } from "react-intlayer"; // Provider dla kontekstu internacjonalizacji
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Komponenty routera do zarządzania nawigacją

// Destrukturyzacja konfiguracji z Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Komponent obsługujący lokalizację i opakowujący dzieci w odpowiedni kontekst lokalizacji.
 * Zarządza wykrywaniem i walidacją lokalizacji na podstawie URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Pobierz aktualną ścieżkę URL

  // Określ bieżącą lokalizację, domyślnie używając domyślnej, jeśli nie jest podana
  const currentLocale = locale ?? defaultLocale;

  // Usuń prefiks lokalizacji ze ścieżki, aby utworzyć bazową ścieżkę
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Aktualna ścieżka URL
  );

  /**
   * Jeśli middleware.prefixDefault jest prawdziwe, domyślna lokalizacja powinna zawsze mieć prefiks.
   */
  if (middleware.prefixDefault) {
    // Waliduj lokalizację
    if (!locale || !locales.includes(locale)) {
      // Przekieruj do domyślnej lokalizacji z zaktualizowaną ścieżką
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Zamień bieżący wpis w historii na nowy
        />
      );
    }

    // Opakuj dzieci w IntlayerProvider i ustaw bieżącą lokalizację
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Gdy middleware.prefixDefault jest false, domyślna lokalizacja nie jest poprzedzona prefiksem.
     * Upewnij się, że bieżąca lokalizacja jest prawidłowa i nie jest domyślną lokalizacją.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Wyklucz domyślną lokalizację
        )
        .includes(currentLocale) // Sprawdź, czy bieżąca lokalizacja znajduje się na liście ważnych lokalizacji
    ) {
      // Przekieruj do ścieżki bez prefiksu lokalizacji
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Opakuj dzieci w IntlayerProvider i ustaw bieżącą lokalizację
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Komponent routera, który ustawia trasy specyficzne dla lokalizacji.
 * Używa React Router do zarządzania nawigacją i renderowania zlokalizowanych komponentów.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Wzorzec ścieżki do przechwycenia lokalizacji (np. /en/, /fr/) i dopasowania wszystkich kolejnych ścieżek
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Opakowuje dzieci zarządzaniem lokalizacją
          />
        ))}

      {
        // Jeśli prefiksowanie domyślnej lokalizacji jest wyłączone, renderuj dzieci bezpośrednio na ścieżce głównej
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Opakowuje dzieci zarządzaniem lokalizacją
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Importowanie niezbędnych zależności i funkcji
import { configuration, getPathWithoutLocale } from "intlayer"; // Funkcje narzędziowe i typy z 'intlayer'
// Funkcje narzędziowe i typy z 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Provider kontekstu internacjonalizacji
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Komponenty routera do zarządzania nawigacją

// Destrukturyzacja konfiguracji z Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Komponent obsługujący lokalizację i opakowujący dzieci w odpowiedni kontekst lokalizacji.
 
 * Zarządza wykrywaniem i walidacją lokalizacji na podstawie URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Pobierz aktualną ścieżkę URL

  // Określ bieżącą lokalizację, domyślnie ustawiając na defaultLocale, jeśli nie podano
  const currentLocale = locale ?? defaultLocale;

  // Usuń prefiks lokalizacji ze ścieżki, aby utworzyć ścieżkę bazową
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Aktualna ścieżka URL
  );

  /**
   * Jeśli middleware.prefixDefault jest true, domyślna lokalizacja powinna zawsze mieć prefiks.
   */
  if (middleware.prefixDefault) {
    // Waliduj lokalizację
    if (!locale || !locales.includes(locale)) {
      // Przekieruj do domyślnej lokalizacji z zaktualizowaną ścieżką
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Zamień bieżący wpis w historii na nowy
        />
      );
    }

    // Opakuj dzieci w IntlayerProvider i ustaw bieżącą lokalizację
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Gdy middleware.prefixDefault jest false, domyślna lokalizacja nie jest poprzedzona prefiksem.
     * Upewnij się, że bieżąca lokalizacja jest poprawna i nie jest domyślną lokalizacją.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Wyklucz domyślną lokalizację
        )
        .includes(currentLocale) // Sprawdź, czy bieżąca lokalizacja znajduje się na liście ważnych lokalizacji
    ) {
      // Przekieruj do ścieżki bez prefiksu lokalizacji
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Opakuj dzieci w IntlayerProvider i ustaw bieżącą lokalizację
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Komponent routera, który ustawia trasy specyficzne dla lokalizacji.
 * Używa React Router do zarządzania nawigacją i renderowania zlokalizowanych komponentów.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Wzorzec trasy do przechwytywania lokalizacji (np. /en/, /fr/) i dopasowywania wszystkich kolejnych ścieżek
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Otacza dzieci zarządzaniem lokalizacją
          />
        ))}

      {
        // Jeśli prefiksowanie domyślnej lokalizacji jest wyłączone, renderuj dzieci bezpośrednio na ścieżce głównej
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Otacza dzieci zarządzaniem lokalizacją
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Importowanie niezbędnych zależności i funkcji
const { configuration, getPathWithoutLocale } = require("intlayer"); // Funkcje narzędziowe i typy z 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Provider kontekstu internacjonalizacji
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Komponenty routera do zarządzania nawigacją

// Destrukturyzacja konfiguracji z Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Komponent obsługujący lokalizację i opakowujący dzieci w odpowiedni kontekst lokalizacji.
 * Zarządza wykrywaniem i walidacją lokalizacji na podstawie URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Pobierz aktualną ścieżkę URL

  // Określ bieżący język, domyślnie ustawiając na domyślny, jeśli nie podano
  const currentLocale = locale ?? defaultLocale;

  // Usuń prefiks języka ze ścieżki, aby utworzyć bazową ścieżkę
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Aktualna ścieżka URL
  );

  /**
   * Jeśli middleware.prefixDefault jest prawdziwe, domyślny język powinien być zawsze poprzedzony prefiksem.
   */
  if (middleware.prefixDefault) {
    // Waliduj język
    if (!locale || !locales.includes(locale)) {
      // Przekieruj do domyślnego języka z zaktualizowaną ścieżką
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Zamień bieżący wpis w historii na nowy
        />
      );
    }

    // Opakuj dzieci w IntlayerProvider i ustaw bieżącą lokalizację
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Gdy middleware.prefixDefault jest false, domyślna lokalizacja nie jest prefiksem.
     * Upewnij się, że bieżąca lokalizacja jest poprawna i nie jest domyślną lokalizacją.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Wyklucz domyślną lokalizację
        )
        .includes(currentLocale) // Sprawdź, czy bieżąca lokalizacja jest na liście poprawnych lokalizacji
    ) {
      // Przekieruj do ścieżki bez prefiksu języka
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Opakuj dzieci w IntlayerProvider i ustaw bieżący język
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Komponent routera, który ustawia trasy specyficzne dla języka.
 * Używa React Router do zarządzania nawigacją i renderowania zlokalizowanych komponentów.
 */
const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Wzorzec trasy do przechwycenia języka (np. /en/, /fr/) i dopasowania wszystkich kolejnych ścieżek
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Otacza dzieci zarządzaniem lokalizacją
          />
        ))}

      {
        // Jeśli prefiksowanie domyślnej lokalizacji jest wyłączone, renderuj dzieci bezpośrednio na ścieżce głównej
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Otacza dzieci zarządzaniem lokalizacją
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Następnie możesz użyć komponentu `LocaleRouter` w swojej aplikacji:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... Twój komponent AppContent

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.mjx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... Twój komponent AppContent

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.cjx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... Twój komponent AppContent

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

### (Opcjonalny) Krok 8: Zmiana URL po zmianie lokalizacji

Aby zmienić URL podczas zmiany lokalizacji, możesz użyć właściwości `onLocaleChange` dostarczonej przez hook `useLocale`. Równolegle możesz użyć hooków `useLocation` i `useNavigate` z `react-router-dom`, aby zaktualizować ścieżkę URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // Pobierz aktualną ścieżkę URL. Przykład: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Konstrukcja URL z zaktualizowaną lokalizacją
      // Przykład: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Aktualizacja ścieżki URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
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
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // Pobierz aktualną ścieżkę URL. Przykład: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Utwórz URL z zaktualizowanym locale
      // Przykład: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Zaktualizuj ścieżkę URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
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
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // Pobierz aktualną ścieżkę URL. Przykład: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Utwórz URL z zaktualizowaną lokalizacją
      // Przykład: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Zaktualizuj ścieżkę URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
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
          </a>
        ))}
      </div>
    </div>
  );
};
```

> Odwołania do dokumentacji:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` atrybut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` atrybut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` atrybut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` atrybut](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Opcjonalny) Krok 9: Zmiana atrybutów języka i kierunku w tagu HTML

Gdy Twoja aplikacja obsługuje wiele języków, kluczowe jest, aby zaktualizować atrybuty `lang` i `dir` w tagu `<html>`, tak aby odpowiadały bieżącej lokalizacji. Zapewnia to:

- **Dostępność**: Czytniki ekranu i technologie wspomagające polegają na poprawnym atrybucie `lang`, aby prawidłowo wymawiać i interpretować zawartość.
- **Renderowanie tekstu**: Atrybut `dir` (kierunek) zapewnia, że tekst jest wyświetlany w odpowiedniej kolejności (np. od lewej do prawej dla języka angielskiego, od prawej do lewej dla arabskiego lub hebrajskiego), co jest kluczowe dla czytelności.
- **SEO**: Wyszukiwarki używają atrybutu `lang`, aby określić język strony, co pomaga w dostarczaniu odpowiednio zlokalizowanych treści w wynikach wyszukiwania.

Poprzez dynamiczną aktualizację tych atrybutów przy zmianie lokalizacji, zapewniasz spójne i dostępne doświadczenie dla użytkowników we wszystkich obsługiwanych językach.

#### Implementacja hooka

Utwórz niestandardowy hook do zarządzania atrybutami HTML. Hook nasłuchuje zmian lokalizacji i odpowiednio aktualizuje atrybuty:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aktualizuje atrybuty `lang` i `dir` elementu HTML <html> na podstawie bieżącej lokalizacji.
 * - `lang`: Informuje przeglądarki i wyszukiwarki o języku strony.
 * - `dir`: Zapewnia poprawny kierunek czytania (np. 'ltr' dla angielskiego, 'rtl' dla arabskiego).
 *
 * Ta dynamiczna aktualizacja jest niezbędna dla prawidłowego renderowania tekstu, dostępności i SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aktualizuje atrybut języka na bieżącą lokalizację.
    document.documentElement.lang = locale;

    // Ustawia kierunek tekstu na podstawie bieżącej lokalizacji.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aktualizuje atrybuty `lang` i `dir` elementu HTML <html> na podstawie bieżącej lokalizacji.
 * - `lang`: Informuje przeglądarki i wyszukiwarki o języku strony.
 * - `dir`: Zapewnia prawidłowy kierunek czytania (np. 'ltr' dla angielskiego, 'rtl' dla arabskiego).
 *
 * Ta dynamiczna aktualizacja jest niezbędna dla prawidłowego renderowania tekstu, dostępności i SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aktualizuje atrybut języka na aktualny locale.
    document.documentElement.lang = locale;

    // Ustawia kierunek tekstu na podstawie aktualnego locale.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Aktualizuje atrybuty `lang` i `dir` elementu HTML <html> na podstawie aktualnego locale.
 * - `lang`: Informuje przeglądarki i wyszukiwarki o języku strony.
 * - `dir`: Zapewnia prawidłowy kierunek czytania (np. 'ltr' dla angielskiego, 'rtl' dla arabskiego).
 *
 * Ta dynamiczna aktualizacja jest niezbędna dla poprawnego renderowania tekstu, dostępności oraz SEO.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aktualizuj atrybut języka na bieżący locale.
    document.documentElement.lang = locale;

    // Ustaw kierunek tekstu na podstawie bieżącego locale.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Użycie Hooka w Twojej Aplikacji

Zintegruj hook w swoim głównym komponencie, aby atrybuty HTML były aktualizowane za każdym razem, gdy zmienia się locale:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Zastosuj hook do aktualizacji atrybutów lang i dir tagu <html> na podstawie lokalizacji.
  useI18nHTMLAttributes();

  // ... Reszta twojego komponentu
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.msx" codeFormat="esm"
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent = () => {
  // Zastosuj hook, aby zaktualizować atrybuty lang i dir tagu <html> na podstawie lokalizacji.
  useI18nHTMLAttributes();

  // ... Reszta twojego komponentu
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.csx" codeFormat="commonjs"
const { FC } = require("react");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./App.css");

const AppContent = () => {
  // Zastosuj hook, aby zaktualizować atrybuty lang i dir tagu <html> na podstawie lokalizacji.
  useI18nHTMLAttributes();

  // ... Reszta twojego komponentu
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;

module.exports = App;
```

Wprowadzając te zmiany, Twoja aplikacja:

- Zapewni, że atrybut **language** (`lang`) poprawnie odzwierciedla bieżącą lokalizację, co jest ważne dla SEO i zachowania przeglądarki.
- Dostosuje **kierunek tekstu** (`dir`) zgodnie z lokalizacją, poprawiając czytelność i użyteczność dla języków o różnych kierunkach czytania.
- Zapewni bardziej **dostępne** doświadczenie, ponieważ technologie wspomagające polegają na tych atrybutach, aby działać optymalnie.

### Konfiguracja TypeScript

Intlayer używa rozszerzenia modułów (module augmentation), aby wykorzystać zalety TypeScript i wzmocnić Twoją bazę kodu.

![Autouzupełnianie](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Błąd tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Upewnij się, że Twoja konfiguracja TypeScript zawiera automatycznie generowane typy.

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Dołącz automatycznie generowane typy
  ],
}
```

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext fileName=".gitignore"
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić swoje doświadczenie deweloperskie z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podglądy w linii** przetłumaczonej zawartości.
- **Szybkie akcje** umożliwiające łatwe tworzenie i aktualizowanie tłumaczeń.

Aby uzyskać więcej informacji na temat korzystania z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer dla VS Code](https://intlayer.org/doc/vs-code-extension).

### Idź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyeksportować swoją zawartość, korzystając z [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).
