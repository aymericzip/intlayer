# Erste Schritte mit der Internationalisierung (i18n) mit Intlayer und React Create App

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die Unterstützung mehrerer Sprachen in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mit deklarativen Wörterbüchern auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamische Lokalerkennung und -umschaltung.

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

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md) bereitstellt.

- **react-intlayer**

  Das Paket, das Intlayer in React-Anwendungen integriert. Es bietet Kontextanbieter und Hooks für die Internationalisierung in React.

- **react-scripts-intlayer**

  Enthält die `react-scripts-intlayer`-Befehle und Plugins zur Integration von Intlayer in auf Create React App basierende Anwendungen. Diese Plugins basieren auf [craco](https://craco.js.org/) und enthalten zusätzliche Konfigurationen für den [Webpack](https://webpack.js.org/) Bundler.

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

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookienamen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen festlegen, Intlayer-Logs in der Konsole deaktivieren und mehr. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

### Schritt 3: Intlayer in Ihre CRA-Konfiguration integrieren

Ändern Sie Ihre Skripte, um react-intlayer zu verwenden:

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> `react-scripts-intlayer`-Skripte basieren auf [CRACO](https://craco.js.org/). Sie können auch Ihre eigene Einrichtung basierend auf dem Intlayer-Craco-Plugin implementieren. [Beispiel hier ansehen](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Schritt 4: Ihre Inhalte deklarieren

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

module.exports = appContent;
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im `contentDir`-Verzeichnis (standardmäßig `./src`) enthalten sind und mit der Inhaltsdeklarationsdateierweiterung übereinstimmen (standardmäßig `.content.{ts,tsx,js,jsx,mjs,cjs}`). Weitere Details finden Sie in der [Inhaltsdeklarationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md). Wenn Ihre Inhaltsdatei TSX-Code enthält, sollten Sie `import React from "react";` in Ihrer Inhaltsdatei importieren.

### Schritt 5: Intlayer in Ihrem Code verwenden

Greifen Sie auf Ihre Inhaltswörterbücher in Ihrer gesamten Anwendung zu:

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

> Hinweis: Wenn Sie Ihren Inhalt in einem `string`-Attribut wie `alt`, `title`, `href`, `aria-label` usw. verwenden möchten, müssen Sie den Wert der Funktion aufrufen, wie:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Weitere Informationen zum `useIntlayer`-Hook finden Sie in der [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useIntlayer.md).

### (Optional) Schritt 6: Die Sprache Ihres Inhalts ändern

Um die Sprache Ihres Inhalts zu ändern, können Sie die `setLocale`-Funktion verwenden, die vom `useLocale`-Hook bereitgestellt wird. Diese Funktion ermöglicht es Ihnen, die Sprache der Anwendung festzulegen und den Inhalt entsprechend zu aktualisieren.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Sprache auf Englisch ändern
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
      Sprache auf Englisch ändern
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
      Sprache auf Englisch ändern
    </button>
  );
};
```

> Weitere Informationen zum `useLocale`-Hook finden Sie in der [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useLocale.md).

### (Optional) Schritt 7: Lokalisierte Routen zu Ihrer Anwendung hinzufügen

Der Zweck dieses Schritts besteht darin, eindeutige Routen für jede Sprache zu erstellen. Dies ist nützlich für SEO und SEO-freundliche URLs.
Beispiel:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Standardmäßig werden die Routen nicht für die Standardsprache vorangestellt. Wenn Sie die Standardsprache voranstellen möchten, können Sie die Option `middleware.prefixDefault` in Ihrer Konfiguration auf `true` setzen. Weitere Informationen finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

Um lokalisierte Routen zu Ihrer Anwendung hinzuzufügen, können Sie eine `LocaleRouter`-Komponente erstellen, die die Routen Ihrer Anwendung umschließt und lokalisierungsbasierte Routen verwaltet. Hier ist ein Beispiel mit [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Importieren der erforderlichen Abhängigkeiten und Funktionen
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Dienstprogramme und Typen aus 'intlayer'
import { FC, PropsWithChildren } from "react"; // React-Typen für funktionale Komponenten und Props
import { IntlayerProvider } from "react-intlayer"; // Anbieter für den Internationalisierungskontext
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Router-Komponenten zur Navigation

// Destrukturierung der Konfiguration aus Intlayer
const { internationalization, middleware } = getConfiguration();
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

  // Bestimmen der aktuellen Sprache, falls nicht angegeben, auf die Standardsprache zurückgreifen
  const currentLocale = locale ?? defaultLocale;

  // Entfernen des Sprachpräfixes aus dem Pfad, um einen Basispfad zu erstellen
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault wahr ist, sollte die Standardsprache immer vorangestellt werden.
   */
  if (middleware.prefixDefault) {
    // Validieren der Sprache
    if (!locale || !locales.includes(locale)) {
      // Weiterleitung zur Standardsprache mit dem aktualisierten Pfad
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Ersetzen des aktuellen Verlaufs mit dem neuen
        />
      );
    }

    // Umhüllen der Kinder mit dem IntlayerProvider und Festlegen der aktuellen Sprache
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Wenn middleware.prefixDefault falsch ist, wird die Standardsprache nicht vorangestellt.
     * Sicherstellen, dass die aktuelle Sprache gültig ist und nicht die Standardsprache ist.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Ausschließen der Standardsprache
        )
        .includes(currentLocale) // Überprüfen, ob die aktuelle Sprache in der Liste der gültigen Sprachen enthalten ist
    ) {
      // Weiterleitung zum Pfad ohne Sprachpräfix
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Umhüllen der Kinder mit dem IntlayerProvider und Festlegen der aktuellen Sprache
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Eine Router-Komponente, die sprachspezifische Routen einrichtet.
 * Sie verwendet React Router, um die Navigation zu verwalten und lokalisierte Komponenten zu rendern.
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
            // Routenmuster, um die Sprache zu erfassen (z. B. /en/, /fr/) und alle nachfolgenden Pfade abzugleichen
            path={`/${locale}/*`}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Umhüllt Kinder mit Sprachverwaltung
          />
        ))}

      {
        // Wenn das Präfixieren der Standardsprache deaktiviert ist, rendern Sie die Kinder direkt am Stammverzeichnis
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Umhüllt Kinder mit Sprachverwaltung
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```
