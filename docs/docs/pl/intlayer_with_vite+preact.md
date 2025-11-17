---
createdAt: 2025-04-18
updatedAt: 2025-10-28
title: Jak przetłumaczyć swoją aplikację Vite i Preact – przewodnik i18n 2025
description: Dowiedz się, jak uczynić swoją stronę Vite i Preact wielojęzyczną. Postępuj zgodnie z dokumentacją, aby zinternacjonalizować (i18n) i przetłumaczyć ją.
keywords:
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Vite
  - Preact
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-preact
applicationTemplate: https://github.com/aymericzip/intlayer-vite-preact-template
history:
  - version: 7.0.0
    date: 2025-10-28
    changes: Aktualizacja komponentu LocaleRouter do użycia nowej konfiguracji tras
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Przetłumacz swoją stronę Vite i Preact za pomocą Intlayer | Internacjonalizacja (i18n)

> Ten pakiet jest w trakcie rozwoju. Zobacz [zgłoszenie](https://github.com/aymericzip/intlayer/issues/118) po więcej informacji. Pokaż swoje zainteresowanie Intlayer dla Preact, lajkując to zgłoszenie

## Spis treści

<TOC/>

## Czym jest Intlayer?

**Intlayer** to innowacyjna, open-source'owa biblioteka do internacjonalizacji (i18n), zaprojektowana, aby uprościć wsparcie wielojęzyczne w nowoczesnych aplikacjach webowych.

Dzięki Intlayer możesz:

- **Łatwo zarządzać tłumaczeniami** za pomocą deklaratywnych słowników na poziomie komponentu.
- **Dynamicznie lokalizować metadane**, trasy i treści.
- **Zapewnić wsparcie dla TypeScript** dzięki automatycznie generowanym typom, co poprawia autouzupełnianie i wykrywanie błędów.
- **Korzystać z zaawansowanych funkcji**, takich jak dynamiczne wykrywanie i przełączanie lokalizacji.

---

## Przewodnik krok po kroku, jak skonfigurować Intlayer w aplikacji Vite i Preact

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-preact-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Jak internacjonalizować swoją aplikację za pomocą Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Zobacz [Szablon aplikacji](https://github.com/aymericzip/intlayer-vite-preact-template) na GitHub.

### Krok 1: Instalacja zależności

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
```

- **intlayer**

  Główne pakiet, który dostarcza narzędzia do internacjonalizacji do zarządzania konfiguracją, tłumaczeń, [deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md), transpilecji oraz [poleceń CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md).

- **preact-intlayer**
  Pakiet integrujący Intlayer z aplikacją Preact. Zapewnia providery kontekstu oraz hooki do internacjonalizacji w Preact.

- **vite-intlayer**
  Zawiera wtyczkę Vite do integracji Intlayer z [bundlerem Vite](https://vite.dev/guide/why.html#why-bundle-for-production), a także middleware do wykrywania preferowanego języka użytkownika, zarządzania ciasteczkami oraz obsługi przekierowań URL.

### Krok 2: Konfiguracja Twojego projektu

Utwórz plik konfiguracyjny, aby skonfigurować języki swojej aplikacji:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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
  routing: {
    mode: "prefix-no-default", // Domyślnie: prefiksuj wszystkie lokalizacje oprócz domyślnej lokalizacji
    storage: ["cookie", "header"], // Domyślnie: przechowuj lokalizację w ciasteczku i wykrywaj z nagłówka
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
  routing: {
    mode: "prefix-no-default", // Domyślnie: prefiksuj wszystkie lokalizacje oprócz domyślnej lokalizacji
    storage: ["cookie", "header"], // Domyślnie: przechowuj lokalizację w ciasteczku i wykrywaj z nagłówka
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
  routing: {
    mode: "prefix-no-default", // Domyślnie: prefiksuj wszystkie lokalizacje oprócz domyślnej lokalizacji
    storage: ["cookie", "header"], // Domyślnie: przechowuj lokalizację w ciasteczku i wykrywaj z nagłówka
  },
};

module.exports = config;
```

> Dzięki temu plikowi konfiguracyjnemu możesz ustawić lokalizowane adresy URL, tryby routingu, opcje przechowywania, nazwy ciasteczek, lokalizację i rozszerzenie deklaracji zawartości, wyłączyć logi Intlayer w konsoli i wiele więcej. Pełną listę dostępnych parametrów znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

### Krok 3: Zintegruj Intlayer w swojej konfiguracji Vite

Dodaj wtyczkę intlayer do swojej konfiguracji.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayer()],
});
```

> Wtyczka Vite `intlayer()` służy do integracji Intlayer z Vite. Zapewnia budowanie plików deklaracji treści oraz monitoruje je w trybie deweloperskim. Definiuje zmienne środowiskowe Intlayer w aplikacji Vite. Dodatkowo dostarcza aliasy optymalizujące wydajność.

### Krok 4: Zadeklaruj swoją treść

Utwórz i zarządzaj deklaracjami treści, aby przechowywać tłumaczenia:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ComponentChildren>({
      en: (
        <>
          Edytuj <code>src/app.tsx</code> i zapisz, aby przetestować HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/app.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/app.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";
// import { h } from 'preact'; // Potrzebne, jeśli używasz JSX bezpośrednio w .mjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edytuj src/app.jsx i zapisz, aby przetestować HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edytuj src/app.jsx i zapisz, aby przetestować HMR",
    }),

    readTheDocs: t({
      en: "Kliknij na loga Vite i Preact, aby dowiedzieć się więcej",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // Potrzebne, jeśli używasz JSX bezpośrednio w .cjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      pl: "licznik to ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
      pl: "Edytuj src/app.tsx i zapisz, aby przetestować HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
      pl: "Kliknij na loga Vite i Preact, aby dowiedzieć się więcej",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite",
        "pl": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact",
        "pl": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact",
        "pl": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "pl": "licznik to "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR",
        "pl": "Edytuj src/app.tsx i zapisz, aby przetestować HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información",
        "pl": "Kliknij na loga Vite i Preact, aby dowiedzieć się więcej"
      }
    }
  }
}
```

> Twoje deklaracje treści mogą być zdefiniowane w dowolnym miejscu w aplikacji, pod warunkiem, że zostaną umieszczone w katalogu `contentDir` (domyślnie `./src`). I muszą odpowiadać rozszerzeniu pliku deklaracji treści (domyślnie `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Aby uzyskać więcej szczegółów, odnieś się do [dokumentacji deklaracji treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md).

> Jeśli Twój plik treści zawiera kod TSX, może być konieczne zaimportowanie `import { h } from "preact";` lub upewnienie się, że pragma JSX jest poprawnie ustawiona dla Preact.

### Krok 5: Wykorzystaj Intlayer w swoim kodzie

Uzyskaj dostęp do swoich słowników treści w całej aplikacji:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // Zakładamy, że masz plik preact.svg
import viteLogo from "/vite.svg";
import "./app.css"; // Zakładamy, że Twój plik CSS nazywa się app.css
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.jsx" codeFormat="esm"
import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.cjsx" codeFormat="commonjs"
const { useState } = require("preact/hooks");
const preactLogo = require("./assets/preact.svg");
const viteLogo = require("/vite.svg");
require("./app.css");
const { IntlayerProvider, useIntlayer } = require("preact-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

> Jeśli chcesz użyć swojej zawartości w atrybucie typu `string`, takim jak `alt`, `title`, `href`, `aria-label` itp., musisz wywołać wartość funkcji, na przykład:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Uwaga: W Preact `className` jest zazwyczaj zapisywane jako `class`.

> Aby dowiedzieć się więcej o hooku `useIntlayer`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useIntlayer.md) (API jest podobne dla `preact-intlayer`).

### (Opcjonalny) Krok 6: Zmień język swojej zawartości

Aby zmienić język swojej zawartości, możesz użyć funkcji `setLocale` dostarczonej przez hook `useLocale`. Funkcja ta pozwala ustawić lokalizację aplikacji i odpowiednio zaktualizować zawartość.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Zmień język na angielski
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Zmień język na angielski
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Zmień język na angielski
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> Aby dowiedzieć się więcej o hooku `useLocale`, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md) (API jest podobne dla `preact-intlayer`).

### (Opcjonalny) Krok 7: Dodaj lokalizowane routingi do swojej aplikacji

Celem tego kroku jest utworzenie unikalnych ścieżek dla każdego języka. Jest to przydatne dla SEO oraz przyjaznych dla SEO adresów URL.
Przykład:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Domyślnie trasy nie mają prefiksu dla domyślnej lokalizacji (`routing.mode: "prefix-no-default"`). Jeśli chcesz dodać prefiks dla domyślnej lokalizacji, możesz ustawić opcję `routing.mode`na`"prefix-all"` w swojej konfiguracji. Więcej informacji znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

Aby dodać lokalizowane routowanie do swojej aplikacji, możesz utworzyć komponent `LocaleRouter`, który otacza trasy aplikacji i obsługuje routowanie oparte na lokalizacji. Oto przykład z użyciem [preact-iso](https://github.com/preactjs/preact-iso):

Najpierw zainstaluj `preact-iso`:

```bash packageManager="npm"
npm install preact-iso
```

```bash packageManager="pnpm"
pnpm add preact-iso
```

```bash packageManager="yarn"
yarn add preact-iso
```

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { configuration, getPathWithoutLocale, type Locale } from "intlayer";
// Importy typów komponentów z preact
import type { ComponentChildren, FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";

const { internationalization, routing } = configuration;
const { locales, defaultLocale } = internationalization;

// Komponent do nawigacji, który wykonuje przekierowanie na wskazaną ścieżkę
const Navigate: FunctionalComponent<{ to: string; replace?: boolean }> = ({
  to,
  replace,
}) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Komponent obsługujący lokalizację i opakowujący dzieci w odpowiedni kontekst lokalizacji.
 * Zarządza wykrywaniem i walidacją lokalizacji na podstawie URL.
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locale;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Określa bieżącą lokalizację, domyślnie ustawiając lokalizację domyślną, jeśli nie jest podana
  const currentLocale = locale ?? defaultLocale;

  // Usuwa prefiks lokalizacji z ścieżki, aby skonstruować ścieżkę bazową
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Bieżąca ścieżka URL
  );

  /**
   * Jeśli routing.mode to 'prefix-all', domyślna lokalizacja powinna zawsze mieć prefiks.
   */
  if (routing.mode === "prefix-all") {
    // Waliduj locale
    if (!locale || !locales.includes(locale)) {
      // Przekieruj do domyślnego locale z zaktualizowaną ścieżką
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Zamień bieżący wpis w historii na nowy
        />
      );
    }

    // Owiń dzieci w IntlayerProvider i ustaw bieżące locale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Gdy routing.mode nie jest 'prefix-all', domyślne locale nie jest poprzedzone prefiksem.
     * Upewnij się, że bieżące locale jest ważne i nie jest domyślnym locale.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Wyklucz domyślny język
        )
        .includes(currentLocale) // Sprawdź, czy bieżący język znajduje się na liście ważnych języków
    ) {
      // Przekieruj na ścieżkę bez prefiksu języka
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Otocz dzieci komponentem IntlayerProvider i ustaw bieżący język
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1] as Locale;

  const isLocaleRoute = locales
    .filter(
      (locale) => routing.mode === "prefix-all" || locale !== defaultLocale
    )
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={routing.mode !== "prefix-all" ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Komponent routera, który ustawia trasy specyficzne dla lokalizacji.
 * Używa preact-iso do zarządzania nawigacją i renderowania komponentów zlokalizowanych.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
// Importowanie niezbędnych zależności i funkcji
import { configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { h } from "preact"; // Wymagane dla JSX

// Destrukturyzacja konfiguracji z Intlayer
const { internationalization, routing } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
/**
 * Komponent obsługujący lokalizację i opakowujący dzieci w odpowiedni kontekst lokalizacji.
 * Zarządza wykrywaniem i walidacją lokalizacji na podstawie URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Określ bieżącą lokalizację, domyślnie używając lokalizacji domyślnej, jeśli nie została podana
  const currentLocale = locale ?? defaultLocale;

  // Usuń prefiks lokalizacji ze ścieżki, aby utworzyć ścieżkę bazową
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Bieżąca ścieżka URL
  );

  /**
   * Jeśli routing.mode to 'prefix-all', domyślna lokalizacja powinna zawsze mieć prefiks.
   */
  if (routing.mode === "prefix-all") {
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

    // Owiń dzieci w IntlayerProvider i ustaw bieżącą lokalizację
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Gdy routing.mode nie jest 'prefix-all', domyślna lokalizacja nie jest poprzedzona prefiksem.
     * Upewnij się, że bieżąca lokalizacja jest poprawna i nie jest domyślną lokalizacją.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Wyklucz domyślny język
        )
        .includes(currentLocale) // Sprawdź, czy bieżący język znajduje się na liście ważnych języków
    ) {
      // Przekieruj na ścieżkę bez prefiksu językowego
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Opakuj dzieci w IntlayerProvider i ustaw bieżący język
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter(
      (locale) => routing.mode === "prefix-all" || locale !== defaultLocale
    )
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={routing.mode !== "prefix-all" ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Komponent routera, który ustawia trasy specyficzne dla lokalizacji.
 * Używa preact-iso do zarządzania nawigacją i renderowania komponentów zlokalizowanych.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
// Importowanie niezbędnych zależności i funkcji
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, useLocation } = require("preact-iso");
const { useEffect } = require("preact/hooks");
const { h } = require("preact"); // Wymagane dla JSX

// Destrukturyzacja konfiguracji z Intlayer
const { internationalization, routing } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Komponent obsługujący lokalizację i opakowujący dzieci w odpowiedni kontekst lokalizacji.
 * Zarządza wykrywaniem i walidacją lokalizacji na podstawie URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Określ bieżący język, domyślnie używając języka domyślnego, jeśli nie jest podany
  const currentLocale = locale ?? defaultLocale;

  // Usuń prefiks języka z ścieżki, aby utworzyć ścieżkę bazową
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Bieżąca ścieżka URL
  );

  /**
   * Jeśli routing.mode to 'prefix-all', domyślny język powinien zawsze mieć prefiks.
   */
  if (routing.mode === "prefix-all") {
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

    // Otocz dzieci IntlayerProvider i ustaw bieżący locale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Gdy routing.mode nie jest 'prefix-all', domyślny locale nie jest poprzedzony prefiksem.
     * Upewnij się, że bieżący locale jest ważny i nie jest domyślnym locale.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Wyklucz domyślny locale
        )
        .includes(currentLocale) // Sprawdź, czy bieżący locale jest na liście ważnych locale
    ) {
      // Przekieruj do ścieżki bez prefiksu lokalizacji
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Otocz dzieci komponentem IntlayerProvider i ustaw aktualną lokalizację
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter(
      (locale) => routing.mode === "prefix-all" || locale !== defaultLocale
    )
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={routing.mode !== "prefix-all" ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Komponent routera, który ustawia trasy specyficzne dla lokalizacji.
 * Używa preact-iso do zarządzania nawigacją i renderowania komponentów zlokalizowanych.
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

Następnie możesz użyć komponentu `LocaleRouter` w swojej aplikacji:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
// ... Twój komponent AppContent (zdefiniowany w Kroku 5)

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";
// ... Twój komponent AppContent (zdefiniowany w Kroku 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");
// ... Twój komponent AppContent (zdefiniowany w Kroku 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

Równolegle możesz również użyć `intlayerProxy`, aby dodać routing po stronie serwera do swojej aplikacji. Ten plugin automatycznie wykryje bieżący język na podstawie URL i ustawi odpowiedni cookie językowy. Jeśli nie zostanie określony żaden język, plugin wybierze najbardziej odpowiedni język na podstawie preferencji językowych przeglądarki użytkownika. Jeśli nie zostanie wykryty żaden język, nastąpi przekierowanie do domyślnego języka.

> Uwaga: aby używać `intlayerProxy` w środowisku produkcyjnym, musisz przenieść pakiet `vite-intlayer` z `devDependencies` do `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayer(), intlayerProxy()],
});
```

### (Opcjonalnie) Krok 8: Zmień URL, gdy zmienia się lokalizacja

Aby zmienić URL, gdy zmienia się lokalizacja, możesz użyć właściwości `onLocaleChange` dostarczonej przez hook `useLocale`. Równolegle możesz użyć `useLocation` i `route` z `preact-iso`, aby zaktualizować ścieżkę URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const location = useLocation();
  plugins: [preact(), intlayer(), intlayerProxy()],
});
```

### (Opcjonalny) Krok 8: Zmiana URL po zmianie lokalizacji

Aby zmienić URL po zmianie lokalizacji, możesz użyć właściwości `onLocaleChange` dostarczonej przez hook `useLocale`. Równolegle możesz użyć `useLocation` oraz `route` z `preact-iso`, aby zaktualizować ścieżkę URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url; // preact-iso dostarcza pełny URL
      // Budowanie URL z zaktualizowanym locale
      // Przykład: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // Aktualizacja ścieżki URL
      route(pathWithLocale, true); // true oznacza replace
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // Nawigacja programowa po ustawieniu lokalizacji będzie obsługiwana przez onLocaleChange
            }}
            key={localeItem}
          >
            <span>
              {/* Lokalizacja - np. FR */}
              {localeItem}
            </span>
            <span>
              {/* Język w swojej własnej lokalizacji - np. Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Język w bieżącej lokalizacji - np. Francés przy ustawionej lokalizacji Locales.SPANISH */}
              {getLocaleName(localeItem, locale)}
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

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { useLocation, route } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import { h } from "preact"; // Dla JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { useLocation, route } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { h } = require("preact"); // Do JSX

const LocaleSwitcher = () => {
  const location = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const currentFullPath = location.url;
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

module.exports = LocaleSwitcher;
```

> Odniesienia do dokumentacji:
>
> > - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md) (API jest podobne dla `preact-intlayer`) > - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocaleName.md) > - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedUrl.md) > - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getHTMLTextDir.md) > - atrybut [`hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr) > - atrybut [`lang`](https://developer.mozilla.org/pl/docs/Web/HTML/Global_attributes/lang) > - atrybut [`dir`](https://developer.mozilla.org/pl/docs/Web/HTML/Global_attributes/dir) > - atrybut [`aria-current`](https://developer.mozilla.org/pl/docs/Web/Accessibility/ARIA/Attributes/aria-current) > - [API Popover](https://developer.mozilla.org/pl/docs/Web/API/Popover_API)la.org/en-US/docs/Web/HTML/Global_attributes/dir)> - [`aria-current` atrybut](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

Poniżej znajduje się zaktualizowany **Krok 9** z dodatkowymi wyjaśnieniami i dopracowanymi przykładami kodu:

---

### (Opcjonalny) Krok 9: Zmiana atrybutów języka i kierunku w elemencie HTML

Gdy Twoja aplikacja obsługuje wiele języków, kluczowe jest zaktualizowanie atrybutów `lang` i `dir` w tagu `<html>`, aby odpowiadały bieżącej lokalizacji. Zapewnia to:

- **Dostępność**: Czytniki ekranu i technologie wspomagające polegają na poprawnym atrybucie `lang`, aby prawidłowo wymawiać i interpretować zawartość.
- **Renderowanie tekstu**: Atrybut `dir` (kierunek) zapewnia, że tekst jest wyświetlany w odpowiedniej kolejności (np. od lewej do prawej dla angielskiego, od prawej do lewej dla arabskiego lub hebrajskiego), co jest niezbędne dla czytelności.
- **SEO**: Wyszukiwarki używają atrybutu `lang` do określenia języka Twojej strony, co pomaga w wyświetlaniu odpowiednio zlokalizowanych treści w wynikach wyszukiwania.

Poprzez dynamiczną aktualizację tych atrybutów podczas zmiany lokalizacji, zapewniasz spójne i dostępne doświadczenie dla użytkowników we wszystkich obsługiwanych językach.

#### Implementacja hooka

Utwórz niestandardowy hook do zarządzania atrybutami HTML. Hook nasłuchuje zmian lokalizacji i odpowiednio aktualizuje atrybuty:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aktualizuje atrybuty `lang` i `dir` elementu <html> na podstawie bieżącej lokalizacji.
 * - `lang`: Informuje przeglądarki i wyszukiwarki o języku strony.
 * - `dir`: Zapewnia prawidłowy kierunek czytania (np. 'ltr' dla angielskiego, 'rtl' dla arabskiego).
 *
 * Ta dynamiczna aktualizacja jest niezbędna dla prawidłowego renderowania tekstu, dostępności i SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aktualizuje atrybut języka na bieżący locale.
    document.documentElement.lang = locale;

    // Ustawia kierunek tekstu na podstawie bieżącego locale.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aktualizuje atrybuty `lang` i `dir` elementu HTML <html> na podstawie bieżącej lokalizacji.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.cjsx" codeFormat="commonjs"
const { useEffect } = require("preact/hooks");
const { useLocale } = require("preact-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Aktualizuje atrybuty `lang` i `dir` elementu HTML <html> na podstawie bieżącej lokalizacji.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Użycie Hooka w Twojej Aplikacji

Zintegruj hook w swoim głównym komponencie, aby atrybuty HTML były aktualizowane za każdym razem, gdy zmienia się lokalizacja:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer już zaimportowany, jeśli AppContent tego potrzebuje
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Definicja AppContent z Kroku 5

const AppWithHooks: FunctionalComponent = () => {
  // Zastosuj hook do aktualizacji atrybutów lang i dir znacznika <html> na podstawie lokalizacji.
  useI18nHTMLAttributes();

  // Zakładając, że AppContent jest Twoim głównym komponentem wyświetlającym zawartość z Kroku 5
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { IntlayerProvider } from "preact-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Definicja AppContent z Kroku 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { IntlayerProvider } = require("preact-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./app.css");
// Definicja AppContent z Kroku 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

module.exports = App;
```

Wprowadzając te zmiany, Twoja aplikacja:

- Zapewni, że atrybut **language** (`lang`) poprawnie odzwierciedla aktualną lokalizację, co jest ważne dla SEO i zachowania przeglądarki.
- Dostosuje **kierunek tekstu** (`dir`) zgodnie z lokalizacją, poprawiając czytelność i użyteczność dla języków o różnych kierunkach czytania.
- Zapewnij bardziej **dostępne** doświadczenie, ponieważ technologie wspomagające polegają na tych atrybutach, aby działać optymalnie.

### (Opcjonalny) Krok 10: Tworzenie Lokalizowanego Komponentu Linku

Aby zapewnić, że nawigacja w Twojej aplikacji respektuje bieżącą lokalizację, możesz stworzyć niestandardowy komponent `Link`. Ten komponent automatycznie dodaje prefiks z aktualnym językiem do wewnętrznych adresów URL.

To zachowanie jest przydatne z kilku powodów:

- **SEO i doświadczenie użytkownika**: Lokalizowane adresy URL pomagają wyszukiwarkom poprawnie indeksować strony specyficzne dla języka oraz dostarczają użytkownikom treści w preferowanym przez nich języku.
- **Spójność**: Używając lokalizowanego linku w całej aplikacji, zapewniasz, że nawigacja pozostaje w obrębie bieżącej lokalizacji, zapobiegając nieoczekiwanym zmianom języka.
- **Utrzymanie**: Centralizacja logiki lokalizacji w jednym komponencie upraszcza zarządzanie URL-ami.

Dla Preact z `preact-iso` standardowo używa się tagów `<a>` do nawigacji, a routing obsługuje `preact-iso`. Jeśli potrzebujesz programatycznej nawigacji po kliknięciu (np. aby wykonać akcje przed nawigacją), możesz użyć funkcji `route` z `useLocation`. Oto jak możesz stworzyć niestandardowy komponent anchor, który lokalizuje URL-e:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // Zakładając, że useLocation i route mogą pochodzić z preact-iso przez preact-intlayer, jeśli są reeksportowane, lub importować bezpośrednio
// Jeśli nie jest ponownie eksportowane, importuj bezpośrednio: import { useLocation, route } from "preact-iso";
import type { JSX } from "preact"; // Dla HTMLAttributes
import { forwardRef } from "preact/compat"; // Dla przekazywania referencji

export interface LocalizedLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean; // Opcjonalne: do zastąpienia stanu historii
}

/**
 * Funkcja pomocnicza do sprawdzania, czy podany URL jest zewnętrzny.
 * Jeśli URL zaczyna się od http:// lub https://, jest uznawany za zewnętrzny.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Niestandardowy komponent Link, który dostosowuje atrybut href na podstawie bieżącej lokalizacji.
 * Dla linków wewnętrznych używa `getLocalizedUrl`, aby poprzedzić URL lokalizacją (np. /fr/about).
 * Zapewnia to, że nawigacja pozostaje w tym samym kontekście lokalizacji.
 * Używa standardowego tagu <a>, ale może wywołać nawigację po stronie klienta za pomocą `route` z preact-iso.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation(); // z preact-iso
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href && // Upewnij się, że href jest zdefiniowany
        event.button === 0 && // Kliknięcie lewym przyciskiem myszy
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey && // Standardowe sprawdzenie modyfikatorów
        !props.target // Nie otwieraj w nowej karcie/oknie
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          // Nawiguj tylko, jeśli URL jest inny
          route(hrefI18n, replace); // Użyj route z preact-iso
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { useLocation, route } from "preact-iso"; // Import z preact-iso
import { forwardRef } from "preact/compat";
import { h } from "preact"; // Do JSX

export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

export const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
```

```jsx fileName="src/components/LocalizedLink.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { useLocation, route } = require("preact-iso"); // Import z preact-iso
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // Do JSX

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation();
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey &&
        !props.target
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          route(hrefI18n, replace);
        }
      }
    };

    return (
      <a href={hrefI18n} ref={ref} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);

module.exports = { LocalizedLink, checkIsExternalLink };
```

#### Jak to działa

- **Wykrywanie linków zewnętrznych**:  
  Funkcja pomocnicza `checkIsExternalLink` określa, czy URL jest zewnętrzny. Linki zewnętrzne pozostają niezmienione.
- **Pobieranie bieżącej lokalizacji**:  
  Hook `useLocale` dostarcza bieżącą lokalizację.
- **Lokalizacja URL**:  
  Dla linków wewnętrznych `getLocalizedUrl` dodaje prefiks z bieżącą lokalizacją.
- **Nawigacja po stronie klienta**:
  Funkcja `handleClick` sprawdza, czy jest to link wewnętrzny oraz czy standardowa nawigacja powinna zostać zablokowana. Jeśli tak, używa funkcji `route` z `preact-iso` (uzyskanej przez `useLocation` lub bezpośrednio zaimportowanej) do wykonania nawigacji po stronie klienta. Zapewnia to zachowanie podobne do SPA bez pełnego przeładowania strony.
- **Zwracanie linku**:  
  Komponent zwraca element `<a>` z zlokalizowanym URL-em oraz niestandardowym obsługiwaczem kliknięć.

### Konfiguracja TypeScript

Intlayer wykorzystuje rozszerzenia modułów, aby korzystać z zalet TypeScript i wzmocnić Twoją bazę kodu.

![Autouzupełnianie](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Błąd tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Upewnij się, że Twoja konfiguracja TypeScript zawiera automatycznie generowane typy.

```json5 fileName="tsconfig.json"
{
  // ... Twoje istniejące konfiguracje TypeScript
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Zalecane dla Preact 10+
    // ...
  },
  "include": [
    // ... Twoje istniejące konfiguracje TypeScript
    ".intlayer/**/*.ts", // Uwzględnij automatycznie generowane typy
  ],
}
```

> Upewnij się, że Twój plik `tsconfig.json` jest skonfigurowany pod Preact, szczególnie opcje `jsx` i `jsxImportSource` lub `jsxFactory`/`jsxFragmentFactory` dla starszych wersji Preact, jeśli nie korzystasz z domyślnych ustawień `preset-vite`.

### Konfiguracja Git

Zaleca się ignorowanie plików generowanych przez Intlayer. Pozwala to uniknąć ich zatwierdzania do repozytorium Git.

Aby to zrobić, możesz dodać następujące instrukcje do pliku `.gitignore`:

```plaintext
# Ignoruj pliki generowane przez Intlayer
.intlayer
```

### Rozszerzenie VS Code

Aby poprawić swoje doświadczenie deweloperskie z Intlayer, możesz zainstalować oficjalne **rozszerzenie Intlayer dla VS Code**.

[Zainstaluj z Marketplace VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

To rozszerzenie oferuje:

- **Autouzupełnianie** kluczy tłumaczeń.
- **Wykrywanie błędów w czasie rzeczywistym** dla brakujących tłumaczeń.
- **Podgląd w linii** przetłumaczonej zawartości.
- **Szybkie akcje** umożliwiające łatwe tworzenie i aktualizowanie tłumaczeń.

Aby uzyskać więcej informacji o korzystaniu z rozszerzenia, zapoznaj się z [dokumentacją rozszerzenia Intlayer dla VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Idź dalej

Aby pójść dalej, możesz zaimplementować [edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md) lub wyeksportować swoją zawartość, korzystając z [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md).
