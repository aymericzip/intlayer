---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Übersetzen Sie Ihre Create React App (CRA)-Website (i18n)
description: Entdecken Sie, wie Sie Ihre Create React App (CRA)-Website mehrsprachig gestalten können. Befolgen Sie die Dokumentation, um sie zu internationalisieren (i18n) und zu übersetzen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Create React App
  - CRA
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - create-react-app
---

# Erste Schritte mit der Internationalisierung (i18n) mit Intlayer und React Create App

Siehe [i18n-react-create-app](https://github.com/aymericzip/intlayer-react-cra-template) für eine vollständige Demonstration.

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die Unterstützung mehrerer Sprachen in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamischer Lokalisierungserkennung und -umschaltung.

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer React-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete mit npm:

```bash packageManager="npm"
npm install intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
```

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) bereitstellt.

- **react-intlayer**

  Das Paket, das Intlayer in React-Anwendungen integriert. Es bietet Kontextanbieter und Hooks für die Internationalisierung in React.

- **react-scripts-intlayer**

  Beinhaltet die `react-scripts-intlayer`-Befehle und Plugins zur Integration von Intlayer in auf Create React App basierende Anwendungen. Diese Plugins basieren auf [craco](https://craco.js.org/) und enthalten zusätzliche Konfigurationen für den [Webpack](https://webpack.js.org/)-Bundler.

### Schritt 2: Konfiguration Ihres Projekts

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Ihre weiteren Sprachen
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
      // Ihre weiteren Sprachen
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
      // Ihre weiteren Sprachen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookienamen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen, das Deaktivieren von Intlayer-Logs in der Konsole und mehr einrichten. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Integration von Intlayer in Ihre CRA-Konfiguration

Ändern Sie Ihre Skripte, um react-intlayer zu verwenden:

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> Die `react-scripts-intlayer`-Skripte basieren auf [CRACO](https://craco.js.org/). Sie können auch Ihre eigene Einrichtung basierend auf dem Intlayer-Craco-Plugin implementieren. [Beispiel hier ansehen](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Schritt 4: Deklarieren Sie Ihre Inhalte

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

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
          Edita <code>src/App.tsx</code> y guarda para recargar
        </>
      ),
      de: (
        <>
          Bearbeiten Sie <code>src/App.tsx</code> und speichern Sie, um neu zu
          laden
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
        de: "React lernen",
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
      de: "Beginnen Sie mit dem Bearbeiten",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
        de: "React lernen",
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
      de: "Beginnen Sie mit dem Bearbeiten",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
        de: "React lernen",
      }),
    },
  },
};

module.exports = appContent;
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im `contentDir`-Verzeichnis (standardmäßig `./src`) enthalten sind und die Inhaltsdeklarationsdateierweiterung (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`) übereinstimmt.

> Weitere Details finden Sie in der [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

> Wenn Ihre Inhaltsdatei TSX-Code enthält, sollten Sie `import React from "react";` in Ihrer Inhaltsdatei importieren.

### Schritt 5: Verwenden Sie Intlayer in Ihrem Code

Greifen Sie in Ihrer gesamten Anwendung auf Ihre Inhaltswörterbücher zu:

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

> Hinweis: Wenn Sie Ihre Inhalte in einem `string`-Attribut wie `alt`, `title`, `href`, `aria-label` usw. verwenden möchten, müssen Sie den Wert der Funktion aufrufen, wie:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Weitere Informationen zum `useIntlayer`-Hook finden Sie in der [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md).

### (Optional) Schritt 6: Ändern Sie die Sprache Ihrer Inhalte

Um die Sprache Ihrer Inhalte zu ändern, können Sie die Funktion `setLocale` verwenden, die vom `useLocale`-Hook bereitgestellt wird. Mit dieser Funktion können Sie die Sprache der Anwendung festlegen und die Inhalte entsprechend aktualisieren.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.GERMAN)}>
      Sprache auf Deutsch ändern
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
    <button onClick={() => setLocale(Locales.GERMAN)}>
      Sprache auf Deutsch ändern
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
    <button onClick={() => setLocale(Locales.GERMAN)}>
      Sprache auf Deutsch ändern
    </button>
  );
};
```

> Weitere Informationen zum `useLocale`-Hook finden Sie in der [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md).

### (Optional) Schritt 7: Lokalisierte Routen zu Ihrer Anwendung hinzufügen

Das Ziel dieses Schritts ist es, für jede Sprache eindeutige Routen zu erstellen. Dies ist nützlich für SEO und SEO-freundliche URLs.
Beispiel:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Standardmäßig werden die Routen nicht für die Standardsprache vorangestellt. Wenn Sie die Standardsprache voranstellen möchten, können Sie die Option `middleware.prefixDefault` in Ihrer Konfiguration auf `true` setzen. Weitere Informationen finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

Um lokalisierte Routen zu Ihrer Anwendung hinzuzufügen, können Sie eine `LocaleRouter`-Komponente erstellen, die die Routen Ihrer Anwendung umschließt und lokalisierungsbasierte Routen verwaltet. Hier ist ein Beispiel mit [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { Locales, configuration, getPathWithoutLocale } from "intlayer";
import type { FC, PropsWithChildren } from "react";
import { IntlayerProvider } from "react-intlayer";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// Destrukturierung der Konfiguration aus Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Eine Komponente, die die Lokalisierung verwaltet und Kinder mit dem entsprechenden Lokalisierungskontext umschließt.
 * Sie verwaltet die URL-basierte Lokalisierungserkennung und -validierung.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Abrufen des aktuellen URL-Pfads

  // Bestimmen der aktuellen Lokalisierung, Standardwert ist die Standardsprache
  const currentLocale = locale ?? defaultLocale;

  // Entfernen des Lokalisierungsprefixes aus dem Pfad, um einen Basispfad zu erstellen
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault wahr ist, sollte die Standardsprache immer vorangestellt werden.
   */
  if (middleware.prefixDefault) {
    // Validieren der Lokalisierung
    if (!locale || !locales.includes(locale)) {
      // Umleiten zur Standardsprache mit dem aktualisierten Pfad
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Ersetzen des aktuellen Verlaufs mit dem neuen
        />
      );
    }

    // Umhüllen der Kinder mit dem IntlayerProvider und Festlegen der aktuellen Lokalisierung
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Wenn middleware.prefixDefault falsch ist, wird die Standardsprache nicht vorangestellt.
     * Sicherstellen, dass die aktuelle Lokalisierung gültig ist und nicht der Standardsprache entspricht.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Ausschließen der Standardsprache
        )
        .includes(currentLocale) // Überprüfen, ob die aktuelle Lokalisierung in der Liste der gültigen Lokalisierungen enthalten ist
    ) {
      // Umleiten zum Pfad ohne Lokalisierungsprefix
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Umhüllen der Kinder mit dem IntlayerProvider und Festlegen der aktuellen Lokalisierung
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Eine Router-Komponente, die lokalisierungsspezifische Routen einrichtet.
 * Sie verwendet React Router zur Navigation und zum Rendern lokalisierter Komponenten.
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
            // Routenmuster zum Erfassen der Lokalisierung (z. B. /en/, /fr/) und zum Abgleichen aller nachfolgenden Pfade
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Umhüllen der Kinder mit Lokalisierungsverwaltung
          />
        ))}

      {
        // Wenn das Voranstellen der Standardsprache deaktiviert ist, rendern Sie die Kinder direkt am Stammverzeichnis
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Umhüllen der Kinder mit Lokalisierungsverwaltung
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
import { Locales, configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// Destrukturierung der Konfiguration aus Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Eine Komponente, die die Lokalisierung verwaltet und Kinder mit dem entsprechenden Lokalisierungskontext umschließt.
 * Sie verwaltet die URL-basierte Lokalisierungserkennung und -validierung.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Abrufen des aktuellen URL-Pfads

  // Bestimmen der aktuellen Lokalisierung, Standardwert ist die Standardsprache
  const currentLocale = locale ?? defaultLocale;

  // Entfernen des Lokalisierungsprefixes aus dem Pfad, um einen Basispfad zu erstellen
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault wahr ist, sollte die Standardsprache immer vorangestellt werden.
   */
  if (middleware.prefixDefault) {
    // Validieren der Lokalisierung
    if (!locale || !locales.includes(locale)) {
      // Umleiten zur Standardsprache mit dem aktualisierten Pfad
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Ersetzen des aktuellen Verlaufs mit dem neuen
        />
      );
    }

    // Umhüllen der Kinder mit dem IntlayerProvider und Festlegen der aktuellen Lokalisierung
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Wenn middleware.prefixDefault falsch ist, wird die Standardsprache nicht vorangestellt.
     * Sicherstellen, dass die aktuelle Lokalisierung gültig ist und nicht der Standardsprache entspricht.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Ausschließen der Standardsprache
        )
        .includes(currentLocale) // Überprüfen, ob die aktuelle Lokalisierung in der Liste der gültigen Lokalisierungen enthalten ist
    ) {
      // Umleiten zum Pfad ohne Lokalisierungsprefix
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Umhüllen der Kinder mit dem IntlayerProvider und Festlegen der aktuellen Lokalisierung
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Eine Router-Komponente, die lokalisierungsspezifische Routen einrichtet.
 * Sie verwendet React Router zur Navigation und zum Rendern lokalisierter Komponenten.
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
            // Routenmuster zum Erfassen der Lokalisierung (z. B. /en/, /fr/) und zum Abgleichen aller nachfolgenden Pfade
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Umhüllen der Kinder mit Lokalisierungsverwaltung
          />
        ))}

      {
        // Wenn das Voranstellen der Standardsprache deaktiviert ist, rendern Sie die Kinder direkt am Stammverzeichnis
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Umhüllen der Kinder mit Lokalisierungsverwaltung
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider, useLocale } = require("react-intlayer");
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom");

// Destrukturierung der Konfiguration aus Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Eine Komponente, die die Lokalisierung verwaltet und Kinder mit dem entsprechenden Lokalisierungskontext umschließt.
 * Sie verwaltet die URL-basierte Lokalisierungserkennung und -validierung.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Abrufen des aktuellen URL-Pfads

  // Bestimmen der aktuellen Lokalisierung, Standardwert ist die Standardsprache
  const currentLocale = locale ?? defaultLocale;

  // Entfernen des Lokalisierungsprefixes aus dem Pfad, um einen Basispfad zu erstellen
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault wahr ist, sollte die Standardsprache immer vorangestellt werden.
   */
  if (middleware.prefixDefault) {
    // Validieren der Lokalisierung
    if (!locale || !locales.includes(locale)) {
      // Umleiten zur Standardsprache mit dem aktualisierten Pfad
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Ersetzen des aktuellen Verlaufs mit dem neuen
        />
      );
    }

    // Umhüllen der Kinder mit dem IntlayerProvider und Festlegen der aktuellen Lokalisierung
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Wenn middleware.prefixDefault falsch ist, wird die Standardsprache nicht vorangestellt.
     * Sicherstellen, dass die aktuelle Lokalisierung gültig ist und nicht der Standardsprache entspricht.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Ausschließen der Standardsprache
        )
        .includes(currentLocale) // Überprüfen, ob die aktuelle Lokalisierung in der Liste der gültigen Lokalisierungen enthalten ist
    ) {
      // Umleiten zum Pfad ohne Lokalisierungsprefix
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Umhüllen der Kinder mit dem IntlayerProvider und Festlegen der aktuellen Lokalisierung
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Eine Router-Komponente, die lokalisierungsspezifische Routen einrichtet.
 * Sie verwendet React Router zur Navigation und zum Rendern lokalisierter Komponenten.
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
            // Routenmuster zum Erfassen der Lokalisierung (z. B. /en/, /fr/) und zum Abgleichen aller nachfolgenden Pfade
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Umhüllen der Kinder mit Lokalisierungsverwaltung
          />
        ))}

      {
        // Wenn das Voranstellen der Standardsprache deaktiviert ist, rendern Sie die Kinder direkt am Stammverzeichnis
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Umhüllen der Kinder mit Lokalisierungsverwaltung
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

Dann können Sie die `LocaleRouter`-Komponente in Ihrer Anwendung verwenden:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... Ihre AppContent-Komponente

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.mjx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... Ihre AppContent-Komponente

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.cjx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... Ihre AppContent-Komponente

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

### (Optional) Schritt 8: Ändern der URL, wenn sich die Lokalisierung ändert

Um die URL zu ändern, wenn sich die Lokalisierung ändert, können Sie die `onLocaleChange`-Eigenschaft verwenden, die vom `useLocale`-Hook bereitgestellt wird. Parallel dazu können Sie die Hooks `useLocation` und `useNavigate` aus `react-router-dom` verwenden, um den URL-Pfad zu aktualisieren.

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
  const { pathname, search } = useLocation(); // Abrufen des aktuellen URL-Pfads. Beispiel: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Konstruktion der URL mit der aktualisierten Lokalisierung
      // Beispiel: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Aktualisieren des URL-Pfads
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
              {/* Lokalisierung - z. B. DE */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Lokalisierung - z. B. Deutsch */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in aktueller Lokalisierung - z. B. Alemán mit aktueller Lokalisierung auf Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z. B. German */}
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
  const { pathname, search } = useLocation(); // Abrufen des aktuellen URL-Pfads. Beispiel: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Konstruktion der URL mit der aktualisierten Lokalisierung
      // Beispiel: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Aktualisieren des URL-Pfads
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
              {/* Lokalisierung - z. B. DE */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Lokalisierung - z. B. Deutsch */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in aktueller Lokalisierung - z. B. Alemán mit aktueller Lokalisierung auf Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z. B. German */}
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
  const { pathname, search } = useLocation(); // Abrufen des aktuellen URL-Pfads. Beispiel: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Konstruktion der URL mit der aktualisierten Lokalisierung
      // Beispiel: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Aktualisieren des URL-Pfads
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
              {/* Lokalisierung - z. B. DE */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Lokalisierung - z. B. Deutsch */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in aktueller Lokalisierung - z. B. Alemán mit aktueller Lokalisierung auf Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z. B. German */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

> Dokumentationsreferenzen:
>
> - [`useLocale`-Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md)
> - [`getLocaleName`-Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl`-Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir`-Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang`-Attribut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=de)
> - [`lang`-Attribut](https://developer.mozilla.org/de/docs/Web/HTML/Global_attributes/lang)
> - [`dir`-Attribut](https://developer.mozilla.org/de/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current`-Attribut](https://developer.mozilla.org/de/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Optional) Schritt 9: Ändern der HTML-Sprach- und Richtungsattribute

Wenn Ihre Anwendung mehrere Sprachen unterstützt, ist es wichtig, die Attribute `lang` und `dir` des `<html>`-Tags an die aktuelle Lokalisierung anzupassen. Dies gewährleistet:

- **Barrierefreiheit**: Screenreader und unterstützende Technologien verlassen sich auf das richtige `lang`-Attribut, um Inhalte korrekt auszusprechen und zu interpretieren.
- **Textrendering**: Das Attribut `dir` (Richtung) stellt sicher, dass Text in der richtigen Reihenfolge gerendert wird (z. B. von links nach rechts für Englisch, von rechts nach links für Arabisch oder Hebräisch), was für die Lesbarkeit entscheidend ist.
- **SEO**: Suchmaschinen verwenden das `lang`-Attribut, um die Sprache Ihrer Seite zu bestimmen und die richtige lokalisierte Inhalte in den Suchergebnissen bereitzustellen.

Durch die dynamische Aktualisierung dieser Attribute bei Änderungen der Lokalisierung gewährleisten Sie ein konsistentes und barrierefreies Erlebnis für Benutzer in allen unterstützten Sprachen.

#### Implementierung des Hooks

Erstellen Sie einen benutzerdefinierten Hook, um die HTML-Attribute zu verwalten. Der Hook hört auf Lokalisierungsänderungen und aktualisiert die Attribute entsprechend:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aktualisiert die Attribute `lang` und `dir` des HTML-Elements <html> basierend auf der aktuellen Lokalisierung.
 * - `lang`: Informiert Browser und Suchmaschinen über die Sprache der Seite.
 * - `dir`: Stellt die richtige Leserichtung sicher (z. B. 'ltr' für Englisch, 'rtl' für Arabisch).
 *
 * Diese dynamische Aktualisierung ist entscheidend für korrektes Textrendering, Barrierefreiheit und SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aktualisieren des Sprachattributs auf die aktuelle Lokalisierung.
    document.documentElement.lang = locale;

    // Festlegen der Textrichtung basierend auf der aktuellen Lokalisierung.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aktualisiert die Attribute `lang` und `dir` des HTML-Elements <html> basierend auf der aktuellen Lokalisierung.
 * - `lang`: Informiert Browser und Suchmaschinen über die Sprache der Seite.
 * - `dir`: Stellt die richtige Leserichtung sicher (z. B. 'ltr' für Englisch, 'rtl' für Arabisch).
 *
 * Diese dynamische Aktualisierung ist entscheidend für korrektes Textrendering, Barrierefreiheit und SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aktualisieren des Sprachattributs auf die aktuelle Lokalisierung.
    document.documentElement.lang = locale;

    // Festlegen der Textrichtung basierend auf der aktuellen Lokalisierung.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Aktualisiert die Attribute `lang` und `dir` des HTML-Elements <html> basierend auf der aktuellen Lokalisierung.
 * - `lang`: Informiert Browser und Suchmaschinen über die Sprache der Seite.
 * - `dir`: Stellt die richtige Leserichtung sicher (z. B. 'ltr' für Englisch, 'rtl' für Arabisch).
 *
 * Diese dynamische Aktualisierung ist entscheidend für korrektes Textrendering, Barrierefreiheit und SEO.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aktualisieren des Sprachattributs auf die aktuelle Lokalisierung.
    document.documentElement.lang = locale;

    // Festlegen der Textrichtung basierend auf der aktuellen Lokalisierung.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Verwendung des Hooks in Ihrer Anwendung

Integrieren Sie den Hook in Ihre Hauptkomponente, sodass die HTML-Attribute aktualisiert werden, wenn sich die Lokalisierung ändert:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Anwenden des Hooks, um die Attribute `lang` und `dir` des <html>-Tags basierend auf der Lokalisierung zu aktualisieren.
  useI18nHTMLAttributes();

  // ... Rest Ihrer Komponente
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
  // Anwenden des Hooks, um die Attribute `lang` und `dir` des <html>-Tags basierend auf der Lokalisierung zu aktualisieren.
  useI18nHTMLAttributes();

  // ... Rest Ihrer Komponente
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
  // Anwenden des Hooks, um die Attribute `lang` und `dir` des <html>-Tags basierend auf der Lokalisierung zu aktualisieren.
  useI18nHTMLAttributes();

  // ... Rest Ihrer Komponente
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

Durch die Anwendung dieser Änderungen wird Ihre Anwendung:

- Sicherstellen, dass das **Sprachattribut** (`lang`) korrekt die aktuelle Lokalisierung widerspiegelt, was für SEO und Browserverhalten wichtig ist.
- Die **Textrichtung** (`dir`) entsprechend der Lokalisierung anpassen, wodurch die Lesbarkeit und Benutzerfreundlichkeit für Sprachen mit unterschiedlichen Leserichtungen verbessert wird.
- Ein barrierefreieres Erlebnis bieten, da unterstützende Technologien auf diese Attribute angewiesen sind, um optimal zu funktionieren.

### TypeScript konfigurieren

Intlayer verwendet Modulaugmentation, um die Vorteile von TypeScript zu nutzen und Ihre Codebasis robuster zu machen.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Einbeziehen der automatisch generierten Typen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch vermeiden Sie, dass diese in Ihr Git-Repository aufgenommen werden.

Fügen Sie dazu die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzu:

```plaintext fileName=".gitignore"
# Ignorieren der von Intlayer generierten Dateien
.intlayer
```

### Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mithilfe des [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.
