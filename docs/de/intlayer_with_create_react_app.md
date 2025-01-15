# Getting Started Internationalizing (i18n) with Intlayer and React Create App

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Bibliothek für Internationalisierung (i18n), die entwickelt wurde, um multilingualen Support in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe von deklarativen Wörterbüchern auf Komponentenebene.
- **Metadaten**, Routen und Inhalte dynamisch lokalisieren.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamische Lokalisierungsdetektion und -wechsel.

---

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

  Das Hauptpaket, das Internationalisierungswerkzeuge für das Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md) bereitstellt.

- **react-intlayer**

  Das Paket, das Intlayer mit React-Anwendungen integriert. Es bietet Kontext-Provider und Hooks für die React-Internationalisierung. Darüber hinaus umfasst es das Plugin zur Integration von Intlayer in die auf Create React App basierende Anwendung.

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
      // Ihre anderen Sprachen
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
      // Ihre anderen Sprachen
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
      // Ihre anderen Sprachen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Durch diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Umleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen konfigurieren, Intlayer-Protokolle in der Konsole deaktivieren und mehr. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

### Schritt 3: Integrieren Sie Intlayer in Ihre CRA-Konfiguration

Ändern Sie Ihre Skripte, um react-intlayer zu verwenden

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> Die `react-scripts-intlayer` Skripte basieren auf [craco](https://craco.js.org/). Sie können auch Ihr eigenes Setup basierend auf dem intlayer craco-Plugin implementieren. [Siehe Beispiel hier](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Schritt 4: Deklarieren Sie Ihren Inhalt

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Bearbeiten Sie <code>src/App.tsx</code> und speichern Sie, um neu zu
          laden
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
        en: "React lernen",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies DeclarationContent;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Legen Sie los, indem Sie bearbeiten",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "React lernen",
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

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Legen Sie los, indem Sie bearbeiten",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "React lernen",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im `contentDir` Verzeichnis enthalten sind (standardmäßig `./src`). Und die Dateierweiterung der Inhaltsdeklaration entspricht (standardmäßig `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md).
> Wenn Ihre Inhaltsdatei TSX-Code enthält, sollten Sie in Ihrer Inhaltsdatei `import React from "react";` in Betracht ziehen.

### Schritt 5: Nutzen Sie Intlayer in Ihrem Code

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

> Hinweis: Wenn Sie Ihren Inhalt in einem `string` Attribut wie `alt`, `title`, `href`, `aria-label` usw. verwenden möchten, müssen Sie den Wert der Funktion aufrufen, wie:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Um mehr über den `useIntlayer` Hook zu erfahren, siehe die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useIntlayer.md).

### (Optional) Schritt 6: Ändern Sie die Sprache Ihres Inhalts

Um die Sprache Ihres Inhalts zu ändern, können Sie die `setLocale` Funktion verwenden, die von dem `useLocale` Hook bereitgestellt wird. Diese Funktion ermöglicht es Ihnen, die Locale der Anwendung zu setzen und den Inhalt entsprechend zu aktualisieren.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Ändern Sie die Sprache auf Englisch
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
      Ändern Sie die Sprache auf Englisch
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
      Ändern Sie die Sprache auf Englisch
    </button>
  );
};
```

> Um mehr über den `useLocale` Hook zu erfahren, siehe die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useLocale.md).

### (Optional) Schritt 7: Fügen Sie lokalisierte Routen zu Ihrer Anwendung hinzu

Zweck dieses Schrittes ist es, eindeutige Routen für jede Sprache zu erstellen. Dies ist nützlich für SEO und SEO-freundliche URLs.
Beispiel:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Standardmäßig sind die Routen für die Standard-Sprache nicht vorangestellt. Wenn Sie die Standard-Sprache voranstellen möchten, können Sie die Option `middleware.prefixDefault` in Ihrer Konfiguration auf `true` setzen. Siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) für weitere Informationen.

Um lokalisierte Routen zu Ihrer Anwendung hinzuzufügen, können Sie eine `LocaleRouter` Komponente erstellen, die die Routen Ihrer Anwendung umwickelt und die lokalisierte Routenverwaltung behandelt. Hier ist ein Beispiel mit [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Notwendige Abhängigkeiten und Funktionen importieren
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Utility-Funktionen und Typen von 'intlayer'
import type { FC, PropsWithChildren } from "react"; // React-Typen für funktionale Komponenten und Props
import { IntlayerProvider } from "react-intlayer"; // Provider für den Internationalisierungskontext
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Router-Komponenten für die Navigation

// Konfiguration von Intlayer destrukturieren
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Eine Komponente, die die Lokalisierung behandelt und Kinder mit dem entsprechenden Locale-Kontext umwickelt.
 * Sie verwaltet die lokalisierungsbasierte URL-Detektion und Validierung.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Aktuellen URL-Pfad abrufen
  const { locale } = useParams<{ locale: Locales }>(); // Das Locale-Parameter aus der URL extrahieren

  // Bestimmen Sie das aktuelle Locale, wobei auf die Standardlocale zurückgegriffen wird, wenn es nicht angegeben ist
  const currentLocale = locale ?? defaultLocale;

  // Entfernen Sie das Locale-Präfix aus dem Pfad, um einen Basis-Pfad zu erstellen
  const pathWithoutLocale = getPathWithoutLocale(
    path // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault wahr ist, sollte die Standardlocale immer vorangestellt werden.
   */
  if (middleware.prefixDefault) {
    // Validieren Sie das Locale
    if (!locale || !locales.includes(locale)) {
      // Leiten Sie zur Standardlocale mit dem aktualisierten Pfad weiter
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Den aktuellen Verlaufseintrag mit dem neuen ersetzen
        />
      );
    }

    // Wickeln Sie Kinder mit dem IntlayerProvider und setzen Sie die aktuelle Locale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Wenn middleware.prefixDefault falsch ist, wird die Standardlocale nicht vorangestellt.
     * Stellen Sie sicher, dass die aktuelle Locale gültig ist und nicht die Standardlocale ist.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Standardlocale ausschließen
        )
        .includes(currentLocale) // Überprüfen, ob die aktuelle Locale in der Liste der gültigen Locales ist
    ) {
      // Leiten Sie zum Pfad ohne Locale-Präfix weiter
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Wickeln Sie Kinder mit dem IntlayerProvider und setzen Sie die aktuelle Locale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Eine Router-Komponente, die lokale spezifische Routen einrichtet.
 * Sie verwendet React Router zur Verwaltung der Navigation und zum Rendern lokalisierter Komponenten.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Routenmuster, um das Locale (z. B. /en/, /fr/) zu erfassen und alle nachfolgenden Pfade anzupassen
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Wickelt Kinder mit Lokalisierungsverwaltung
      />

      {
        // Wenn das Voranstellen der Standardlocale deaktiviert ist, rendern Sie die Kinder direkt im Stammverzeichnis
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Wickelt Kinder mit Lokalisierungsverwaltung
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Notwendige Abhängigkeiten und Funktionen importieren
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Utility-Funktionen und Typen von 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Provider für den Internationalisierungskontext
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Router-Komponenten für die Navigation

// Konfiguration von Intlayer destrukturieren
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Eine Komponente, die die Lokalisierung behandelt und Kinder mit dem entsprechenden Locale-Kontext umwickelt.
 * Sie verwaltet die lokalisierungsbasierte URL-Detektion und Validierung.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Aktuellen URL-Pfad abrufen
  const { locale } = useParams(); // Das Locale-Parameter aus der URL extrahieren

  // Bestimmen Sie das aktuelle Locale, wobei auf die Standardlocale zurückgegriffen wird, wenn es nicht angegeben ist
  const currentLocale = locale ?? defaultLocale;

  // Entfernen Sie das Locale-Präfix aus dem Pfad, um einen Basis-Pfad zu erstellen
  const pathWithoutLocale = getPathWithoutLocale(
    path // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault wahr ist, sollte die Standardlocale immer vorangestellt werden.
   */
  if (middleware.prefixDefault) {
    // Validieren Sie das Locale
    if (!locale || !locales.includes(locale)) {
      // Leiten Sie zur Standardlocale mit dem aktualisierten Pfad weiter
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Den aktuellen Verlaufseintrag mit dem neuen ersetzen
        />
      );
    }

    // Wickeln Sie Kinder mit dem IntlayerProvider und setzen Sie die aktuelle Locale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Wenn middleware.prefixDefault falsch ist, wird die Standardlocale nicht vorangestellt.
     * Stellen Sie sicher, dass die aktuelle Locale gültig ist und nicht die Standardlocale ist.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Standardlocale ausschließen
        )
        .includes(currentLocale) // Überprüfen, ob die aktuelle Locale in der Liste der gültigen Locales ist
    ) {
      // Leiten Sie zum Pfad ohne Locale-Präfix weiter
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Wickeln Sie Kinder mit dem IntlayerProvider und setzen Sie die aktuelle Locale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Eine Router-Komponente, die lokale spezifische Routen einrichtet.
 * Sie verwendet React Router zur Verwaltung der Navigation und zum Rendern lokalisierter Komponenten.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Routenmuster, um das Locale (z. B. /en/, /fr/) zu erfassen und alle nachfolgenden Pfade anzupassen
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Wickelt Kinder mit Lokalisierungsverwaltung
      />

      {
        // Wenn das Voranstellen der Standardlocale deaktiviert ist, rendern Sie die Kinder direkt im Stammverzeichnis
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Wickelt Kinder mit Lokalisierungsverwaltung
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Notwendige Abhängigkeiten und Funktionen importieren
const { getConfiguration, getPathWithoutLocale } = require("intlayer"); // Utility-Funktionen und Typen von 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Provider für den Internationalisierungskontext
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Router-Komponenten für die Navigation

// Konfiguration von Intlayer destrukturieren
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Eine Komponente, die die Lokalisierung behandelt und Kinder mit dem entsprechenden Locale-Kontext umwickelt.
 * Sie verwaltet die lokalisierungsbasierte URL-Detektion und Validierung.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Aktuellen URL-Pfad abrufen
  const { locale } = useParams(); // Das Locale-Parameter aus der URL extrahieren

  // Bestimmen Sie das aktuelle Locale, wobei auf die Standardlocale zurückgegriffen wird, wenn es nicht angegeben ist
  const currentLocale = locale ?? defaultLocale;

  // Entfernen Sie das Locale-Präfix aus dem Pfad, um einen Basis-Pfad zu erstellen
  const pathWithoutLocale = getPathWithoutLocale(
    path // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault wahr ist, sollte die Standardlocale immer vorangestellt werden.
   */
  if (middleware.prefixDefault) {
    // Validieren Sie das Locale
    if (!locale || !locales.includes(locale)) {
      // Leiten Sie zur Standardlocale mit dem aktualisierten Pfad weiter
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Den aktuellen Verlaufseintrag mit dem neuen ersetzen
        />
      );
    }

    // Wickeln Sie Kinder mit dem IntlayerProvider und setzen Sie die aktuelle Locale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Wenn middleware.prefixDefault falsch ist, wird die Standardlocale nicht vorangestellt.
     * Stellen Sie sicher, dass die aktuelle Locale gültig ist und nicht die Standardlocale ist.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Standardlocale ausschließen
        )
        .includes(currentLocale) // Überprüfen, ob die aktuelle Locale in der Liste der gültigen Locales ist
    ) {
      // Leiten Sie zum Pfad ohne Locale-Präfix weiter
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Wickeln Sie Kinder mit dem IntlayerProvider und setzen Sie die aktuelle Locale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Eine Router-Komponente, die lokale spezifische Routen einrichtet.
 * Sie verwendet React Router zur Verwaltung der Navigation und zum Rendern lokalisierter Komponenten.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Routenmuster, um das Locale (z. B. /en/, /fr/) zu erfassen und alle nachfolgenden Pfade anzupassen
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Wickelt Kinder mit Lokalisierungsverwaltung
      />

      {
        // Wenn das Voranstellen der Standardlocale deaktiviert ist, rendern Sie die Kinder direkt im Stammverzeichnis
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Wickelt Kinder mit Lokalisierungsverwaltung
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

### (Optional) Schritt 8: Ändern Sie die URL, wenn sich die Locale ändert

Um die URL zu ändern, wenn sich die Locale ändert, können Sie die `onLocaleChange` Prop verwenden, die von dem `useLocale` Hook bereitgestellt wird. Parallel dazu können Sie die Hooks `useLocation` und `useNavigate` von `react-router-dom` verwenden, um den URL-Pfad zu aktualisieren.

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
  const location = useLocation(); // Aktuellen URL-Pfad abrufen. Beispiel: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Konstruieren Sie die URL mit der aktualisierten Locale
    // Beispiel: /es/about mit der Locale auf Spanisch gesetzt
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Aktualisieren Sie den URL-Pfad
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Sprache in seiner eigenen Locale - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Locale - z.B. Francés mit der aktuellen Locale auf Locales.SPANISH gesetzt */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Locale - z.B. FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const location = useLocation(); // Aktuellen URL-Pfad abrufen. Beispiel: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Konstruieren Sie die URL mit der aktualisierten Locale
    // Beispiel: /es/about mit der Locale auf Spanisch gesetzt
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Aktualisieren Sie den URL-Pfad
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Sprache in ihrer eigenen Locale - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Locale - z.B. Francés mit der aktuellen Locale auf Locales.SPANISH gesetzt */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Locale - z.B. FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

```tsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const location = useLocation(); // Aktuellen URL-Pfad abrufen. Beispiel: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Konstruieren Sie die URL mit der aktualisierten Locale
    // Beispiel: /es/about mit der Locale auf Spanisch gesetzt
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Aktualisieren Sie den URL-Pfad
    navigate(pathWithLocale);
  };

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: changeUrl,
  });

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
          >
            <span>
              {/* Sprache in ihrer eigenen Locale - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Locale - z.B. Francés mit der aktuellen Locale auf Locales.SPANISH gesetzt */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Locale - z.B. FR */}
              {localeItem}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
};
```

> Dokumentationsreferenzen:
>
> - [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` Attribut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` Attribut](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### TypeScript konfigurieren

Intlayer verwendet die Modulvergrößerung, um die Vorteile von TypeScript zu nutzen und Ihre Codebasis zu stärken.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  // ... Ihre vorhandenen TypeScript-Konfigurationen
  "include": [
    // ... Ihre vorhandenen TypeScript-Konfigurationen
    "types", // Fügen Sie die automatisch generierten Typen hinzu
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dies ermöglicht es Ihnen, zu vermeiden, dass sie in Ihr Git-Repository eingecheckt werden.

Dazu können Sie die folgenden Anweisungen zu Ihrer `.gitignore` Datei hinzufügen:

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```
