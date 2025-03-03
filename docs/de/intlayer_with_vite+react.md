# Erste Schritte mit der Internationalisierung (i18n) mit Intlayer, Vite und React

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die Unterstützung mehrerer Sprachen in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mit deklarativen Wörterbüchern auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamische Spracherkennung und -umschaltung.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Vite- und React-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete mit npm:

```bash packageManager="npm"
npm install intlayer react-intlayer vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer vite-intlayer
```

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md) bereitstellt.

- **react-intlayer**
  Das Paket, das Intlayer in React-Anwendungen integriert. Es bietet Kontextanbieter und Hooks für die Internationalisierung in React.

- **vite-intlayer**
  Beinhaltet das Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, Verwaltung von Cookies und URL-Weiterleitung.

### Schritt 2: Konfiguration Ihres Projekts

Erstellen Sie eine Konfigurationsdatei, um die Sprachen Ihrer Anwendung zu konfigurieren:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen, das Deaktivieren von Intlayer-Logs in der Konsole und mehr einrichten. Eine vollständige Liste der verfügbaren Parameter finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

### Schritt 3: Integration von Intlayer in Ihre Vite-Konfiguration

Fügen Sie das Intlayer-Plugin in Ihre Konfiguration ein.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin()],
});
```

> Das `intlayerPlugin()` Vite-Plugin wird verwendet, um Intlayer mit Vite zu integrieren. Es stellt sicher, dass Inhaltsdeklarationsdateien erstellt und im Entwicklungsmodus überwacht werden. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Zusätzlich bietet es Aliase zur Optimierung der Leistung.

### Schritt 4: Deklarieren Sie Ihre Inhalte

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
      de: "Vite-Logo",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
      de: "React-Logo",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      de: "die Anzahl ist ",
    }),

    edit: t<ReactNode>({
      // Vergessen Sie nicht, React zu importieren, wenn Sie einen React-Node in Ihrem Inhalt verwenden
      en: (
        <>
          Edit <code>src/App.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
      de: (
        <>
          Bearbeiten Sie <code>src/App.tsx</code> und speichern Sie, um HMR zu
          testen
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
      de: "Klicken Sie auf die Vite- und React-Logos, um mehr zu erfahren",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
      de: "Vite-Logo",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
      de: "React-Logo",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      de: "die Anzahl ist ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Vergessen Sie nicht, React zu importieren, wenn Sie einen React-Node in Ihrem Inhalt verwenden
        en: (
          <>
            Edit <code>src/App.tsx</code> and save to test HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
        de: (
          <>
            Bearbeiten Sie <code>src/App.tsx</code> und speichern Sie, um HMR zu
            testen
          </>
        ),
      },

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
      de: "Klicken Sie auf die Vite- und React-Logos, um mehr zu erfahren",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
      de: "Vite-Logo",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
      de: "React-Logo",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      de: "die Anzahl ist ",
    }),

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
        "de": "Vite-Logo"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React",
        "de": "React-Logo"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React",
        "de": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "de": "der Zähler ist "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR",
        "de": "Bearbeiten Sie src/App.tsx und speichern Sie, um HMR zu testen"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información",
        "de": "Klicken Sie auf die Vite- und React-Logos, um mehr zu erfahren"
      }
    }
  }
}
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im `contentDir`-Verzeichnis (standardmäßig `./src`) enthalten sind. Und sie müssen mit der Dateierweiterung der Inhaltsdeklaration übereinstimmen (standardmäßig `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Für weitere Details lesen Sie die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md).
> Wenn Ihre Inhaltsdatei TSX-Code enthält, sollten Sie `import React from "react";` in Ihrer Inhaltsdatei importieren.

### Schritt 5: Verwenden Sie Intlayer in Ihrem Code

Greifen Sie auf Ihre Inhaltswörterbücher in Ihrer gesamten Anwendung zu:

```tsx {5,9} fileName="src/App.tsx" codeFormat="typescript"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.msx" codeFormat="esm"
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
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

```tsx {5,9} fileName="src/App.csx" codeFormat="commonjs"
const { useState } = require("react");
const reactLogo = require("./assets/react.svg");
const viteLogo = require("/vite.svg");
require("./App.css");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
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

> Wenn Sie Ihren Inhalt in einem `string`-Attribut wie `alt`, `title`, `href`, `aria-label` usw. verwenden möchten, müssen Sie den Wert der Funktion aufrufen, wie:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Um mehr über den `useIntlayer`-Hook zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useIntlayer.md).

### (Optional) Schritt 6: Ändern Sie die Sprache Ihres Inhalts

Um die Sprache Ihres Inhalts zu ändern, können Sie die Funktion `setLocale` verwenden, die vom `useLocale`-Hook bereitgestellt wird. Diese Funktion ermöglicht es Ihnen, die Locale der Anwendung festzulegen und den Inhalt entsprechend zu aktualisieren.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Sprache auf Englisch ändern
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
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

> Um mehr über den `useLocale` Hook zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useLocale.md).

### (Optional) Schritt 7: Lokalisierte Routen zu Ihrer Anwendung hinzufügen

Das Ziel dieses Schritts ist es, eindeutige Routen für jede Sprache zu erstellen. Dies ist nützlich für SEO und SEO-freundliche URLs.
Beispiel:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Standardmäßig werden die Routen für die Standardsprache nicht vorangestellt. Wenn Sie die Standardsprache voranstellen möchten, können Sie die Option `middleware.prefixDefault` in Ihrer Konfiguration auf `true` setzen. Weitere Informationen finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

Um lokalisierte Routen zu Ihrer Anwendung hinzuzufügen, können Sie eine `LocaleRouter`-Komponente erstellen, die die Routen Ihrer Anwendung umschließt und lokalisierungsbasierte Routen verwaltet. Hier ist ein Beispiel mit [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Importieren der notwendigen Abhängigkeiten und Funktionen
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Dienstprogramme und Typen aus 'intlayer'
import { FC, PropsWithChildren } from "react"; // React-Typen für funktionale Komponenten und Props
import { IntlayerProvider } from "react-intlayer"; // Provider für den Internationalisierungskontext
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
 * Eine Komponente, die Lokalisierung verwaltet und Kinder mit dem entsprechenden Lokalisierungskontext umschließt.
 * Sie verwaltet die URL-basierte Lokalisierungserkennung und Validierung.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Aktuellen URL-Pfad abrufen

  // Bestimmen der aktuellen Sprache, Standardwert verwenden, falls nicht angegeben
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
      // Umleiten zur Standardsprache mit aktualisiertem Pfad
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Ersetzen des aktuellen Verlaufs mit dem neuen Eintrag
        />
      );
    }

    // Kinder mit dem IntlayerProvider umschließen und die aktuelle Sprache setzen
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
          (locale) => locale.toString() !== defaultLocale.toString() // Standardsprache ausschließen
        )
        .includes(currentLocale) // Überprüfen, ob die aktuelle Sprache in der Liste der gültigen Sprachen ist
    ) {
      // Umleiten zum Pfad ohne Sprachpräfix
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Kinder mit dem IntlayerProvider umschließen und die aktuelle Sprache setzen
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
            // Routenmuster, um die Sprache (z. B. /en/, /fr/) zu erfassen und alle nachfolgenden Pfade zuzuordnen
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Umschließt Kinder mit Sprachverwaltung
          />
        ))}

      {
        // Wenn das Voranstellen der Standardsprache deaktiviert ist, die Kinder direkt am Stamm-Pfad rendern
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Umschließt Kinder mit Sprachverwaltung
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Importieren der notwendigen Abhängigkeiten und Funktionen
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Dienstprogramme und Typen aus 'intlayer'
import { FC, PropsWithChildren } from "react"; // React-Typen für funktionale Komponenten und Props
import { IntlayerProvider } from "react-intlayer"; // Provider für den Internationalisierungskontext
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
 * Eine Komponente, die Lokalisierung verwaltet und Kinder mit dem entsprechenden Lokalisierungskontext umschließt.
 * Sie verwaltet die URL-basierte Lokalisierungserkennung und Validierung.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Aktuellen URL-Pfad abrufen

  // Bestimmen der aktuellen Sprache, Standardwert verwenden, falls nicht angegeben
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
      // Umleiten zur Standardsprache mit aktualisiertem Pfad
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Ersetzen des aktuellen Verlaufs mit dem neuen Eintrag
        />
      );
    }

    // Kinder mit dem IntlayerProvider umschließen und die aktuelle Sprache setzen
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
          (locale) => locale.toString() !== defaultLocale.toString() // Standardsprache ausschließen
        )
        .includes(currentLocale) // Überprüfen, ob die aktuelle Sprache in der Liste der gültigen Sprachen ist
    ) {
      // Umleiten zum Pfad ohne Sprachpräfix
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Kinder mit dem IntlayerProvider umschließen und die aktuelle Sprache setzen
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Ein Router-Komponente, die locale-spezifische Routen einrichtet.
 * Verwendet React Router, um die Navigation zu verwalten und lokalisierte Komponenten zu rendern.
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
            // Routenmuster, um die Locale zu erfassen (z. B. /de/, /fr/) und alle nachfolgenden Pfade zuzuordnen
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Umhüllt Kinder mit Locale-Management
          />
        ))}

      {
        // Wenn das Präfix für die Standard-Locale deaktiviert ist, rendere die Kinder direkt im Root-Pfad
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Umhüllt Kinder mit Locale-Management
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Importieren der notwendigen Abhängigkeiten und Funktionen
const { getConfiguration, getPathWithoutLocale } = require("intlayer"); // Dienstprogramme und Typen aus 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Provider für den Internationalisierungskontext
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Router-Komponenten zur Verwaltung der Navigation

// Destrukturierung der Konfiguration aus Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Eine Komponente, die Lokalisierung verwaltet und Kinder mit dem entsprechenden Locale-Kontext umhüllt.
 * Verarbeitet URL-basierte Locale-Erkennung und -Validierung.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Aktuellen URL-Pfad abrufen

  // Bestimmen der aktuellen Locale, Rückgriff auf die Standard-Locale, falls nicht angegeben
  const currentLocale = locale ?? defaultLocale;

  // Entfernen des Locale-Präfixes aus dem Pfad, um einen Basis-Pfad zu erstellen
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault wahr ist, sollte die Standard-Locale immer vorangestellt werden.
   */
  if (middleware.prefixDefault) {
    // Validieren der Locale
    if (!locale || !locales.includes(locale)) {
      // Weiterleitung zur Standard-Locale mit dem aktualisierten Pfad
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Ersetzt den aktuellen Verlaufseintrag durch den neuen
        />
      );
    }

    // Umhüllt Kinder mit dem IntlayerProvider und setzt die aktuelle Locale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Wenn middleware.prefixDefault falsch ist, wird die Standard-Locale nicht vorangestellt.
     * Sicherstellen, dass die aktuelle Locale gültig ist und nicht die Standard-Locale ist.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Ausschluss der Standard-Locale
        )
        .includes(currentLocale) // Überprüfen, ob die aktuelle Locale in der Liste der gültigen Locales ist
    ) {
      // Weiterleitung zum Pfad ohne Locale-Präfix
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Umhüllt Kinder mit dem IntlayerProvider und setzt die aktuelle Locale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Ein Router-Komponente, die locale-spezifische Routen einrichtet.
 * Verwendet React Router, um die Navigation zu verwalten und lokalisierte Komponenten zu rendern.
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
            // Routenmuster, um die Locale zu erfassen (z. B. /de/, /fr/) und alle nachfolgenden Pfade zuzuordnen
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Umhüllt Kinder mit Locale-Management
          />
        ))}

      {
        // Wenn das Präfix für die Standard-Locale deaktiviert ist, rendere die Kinder direkt im Root-Pfad
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Umhüllt Kinder mit Locale-Management
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
import { FC } from "react";

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

Parallel dazu können Sie auch das `intLayerMiddlewarePlugin` verwenden, um serverseitiges Routing zu Ihrer Anwendung hinzuzufügen. Dieses Plugin erkennt automatisch die aktuelle Locale basierend auf der URL und setzt das entsprechende Locale-Cookie. Wenn keine Locale angegeben ist, bestimmt das Plugin die am besten geeignete Locale basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn keine Locale erkannt wird, wird zur Standard-Locale weitergeleitet.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {5,10} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Optional) Schritt 8: Ändern der URL, wenn sich die Locale ändert

Um die URL zu ändern, wenn sich die Locale ändert, können Sie die `onLocaleChange`-Eigenschaft verwenden, die vom `useLocale`-Hook bereitgestellt wird. Parallel dazu können Sie die Hooks `useLocation` und `useNavigate` aus `react-router-dom` verwenden, um den URL-Pfad zu aktualisieren.

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
  const { pathname, search } = useLocation(); // Aktuellen URL-Pfad abrufen. Beispiel: /de/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Konstruiere die URL mit der aktualisierten Sprache
      // Beispiel: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Aktualisiere den URL-Pfad
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
              {/* Sprache - z.B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Lokalisierung - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Lokalisierung - z.B. Francés mit aktueller Sprache auf Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
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
  const { pathname, search } = useLocation(); // Hole den aktuellen URL-Pfad. Beispiel: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Konstruiere die URL mit der aktualisierten Sprache
      // Beispiel: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Aktualisiere den URL-Pfad
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
              {/* Sprache - z.B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Lokalisierung - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Lokalisierung - z.B. Francés mit aktueller Sprache auf Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
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
  const { pathname, search } = useLocation(); // Hole den aktuellen URL-Pfad. Beispiel: /fr/about?foo=bar
  const navigate = useNavigate();

  const { availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Konstruiere die URL mit der aktualisierten Sprache
      // Beispiel: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Aktualisiere den URL-Pfad
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
              {/* Sprache - z.B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Lokalisierung - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Lokalisierung - z.B. Francés mit aktueller Sprache auf Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. French */}
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
> - [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` Attribut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` Attribut](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

---

### (Optional) Schritt 9: HTML-Sprach- und Richtungsattribute umschalten

Wenn Ihre Anwendung mehrere Sprachen unterstützt, ist es wichtig, die `lang`- und `dir`-Attribute des `<html>`-Tags an die aktuelle Sprache anzupassen. Dies gewährleistet:

- **Barrierefreiheit**: Screenreader und unterstützende Technologien verlassen sich auf das korrekte `lang`-Attribut, um Inhalte genau auszusprechen und zu interpretieren.
- **Textdarstellung**: Das `dir`-Attribut (Richtung) stellt sicher, dass der Text in der richtigen Reihenfolge dargestellt wird (z. B. von links nach rechts für Englisch, von rechts nach links für Arabisch oder Hebräisch), was für die Lesbarkeit entscheidend ist.
- **SEO**: Suchmaschinen verwenden das `lang`-Attribut, um die Sprache Ihrer Seite zu bestimmen und die richtigen lokalisierten Inhalte in den Suchergebnissen bereitzustellen.

Durch die dynamische Aktualisierung dieser Attribute bei einem Sprachwechsel gewährleisten Sie ein konsistentes und barrierefreies Erlebnis für Benutzer in allen unterstützten Sprachen.

#### Implementierung des Hooks

Erstellen Sie einen benutzerdefinierten Hook, um die HTML-Attribute zu verwalten. Der Hook hört auf Sprachänderungen und aktualisiert die Attribute entsprechend:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**

 * - `lang`: Informiert Browser und Suchmaschinen über die Sprache der Seite.
 * - `dir`: Stellt die korrekte Leserichtung sicher (z. B. 'ltr' für Englisch, 'rtl' für Arabisch).
 *
 * Diese dynamische Aktualisierung ist essenziell für eine korrekte Textrendering, Barrierefreiheit und SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aktualisiert das Sprachattribut auf die aktuelle Spracheinstellung.
    document.documentElement.lang = locale;

    // Setzt die Leserichtung basierend auf der aktuellen Spracheinstellung.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aktualisiert die `lang`- und `dir`-Attribute des HTML-Elements <html> basierend auf der aktuellen Spracheinstellung.
 * - `lang`: Informiert Browser und Suchmaschinen über die Sprache der Seite.
 * - `dir`: Stellt die korrekte Leserichtung sicher (z. B. 'ltr' für Englisch, 'rtl' für Arabisch).
 *
 * Diese dynamische Aktualisierung ist essenziell für eine korrekte Textrendering, Barrierefreiheit und SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aktualisiert das Sprachattribut auf die aktuelle Spracheinstellung.
    document.documentElement.lang = locale;

    // Setzt die Leserichtung basierend auf der aktuellen Spracheinstellung.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Aktualisiert die `lang`- und `dir`-Attribute des HTML-Elements <html> basierend auf der aktuellen Spracheinstellung.
 * - `lang`: Informiert Browser und Suchmaschinen über die Sprache der Seite.
 * - `dir`: Stellt die korrekte Leserichtung sicher (z. B. 'ltr' für Englisch, 'rtl' für Arabisch).
 *
 * Diese dynamische Aktualisierung ist essenziell für eine korrekte Textrendering, Barrierefreiheit und SEO.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aktualisiert das Sprachattribut auf die aktuelle Spracheinstellung.
    document.documentElement.lang = locale;

    // Setzt die Leserichtung basierend auf der aktuellen Spracheinstellung.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Verwendung des Hooks in Ihrer Anwendung

Integrieren Sie den Hook in Ihre Hauptkomponente, damit die HTML-Attribute aktualisiert werden, sobald sich die Spracheinstellung ändert:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Wendet den Hook an, um die lang- und dir-Attribute des <html>-Tags basierend auf der Spracheinstellung zu aktualisieren.
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
import { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent = () => {
  // Wendet den Hook an, um die lang- und dir-Attribute des <html>-Tags basierend auf der Spracheinstellung zu aktualisieren.
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
  // Wendet den Hook an, um die lang- und dir-Attribute des <html>-Tags basierend auf der Spracheinstellung zu aktualisieren.
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

Durch diese Änderungen wird Ihre Anwendung:

- Sicherstellen, dass das **Sprachattribut** (`lang`) die aktuelle Spracheinstellung korrekt widerspiegelt, was wichtig für SEO und das Verhalten des Browsers ist.
- Die **Leserichtung** (`dir`) entsprechend der Spracheinstellung anpassen, um die Lesbarkeit und Benutzerfreundlichkeit für Sprachen mit unterschiedlichen Leserichtungen zu verbessern.
- Eine **barrierefreie** Erfahrung bieten, da unterstützende Technologien auf diese Attribute angewiesen sind, um optimal zu funktionieren.

### (Optional) Schritt 10: Erstellen einer lokalisierten Link-Komponente

Um sicherzustellen, dass die Navigation Ihrer Anwendung die aktuelle Spracheinstellung berücksichtigt, können Sie eine benutzerdefinierte `Link`-Komponente erstellen. Diese Komponente fügt automatisch die aktuelle Sprache als Präfix zu internen URLs hinzu. Zum Beispiel wird ein französischsprachiger Benutzer, der auf einen Link zur Seite "Über uns" klickt, zu `/fr/about` anstelle von `/about` weitergeleitet.

Dieses Verhalten ist aus mehreren Gründen nützlich:

- **SEO und Benutzererfahrung**: Lokalisierte URLs helfen Suchmaschinen, sprachspezifische Seiten korrekt zu indexieren, und bieten Benutzern Inhalte in ihrer bevorzugten Sprache.
- **Konsistenz**: Durch die Verwendung eines lokalisierten Links in der gesamten Anwendung wird sichergestellt, dass die Navigation innerhalb der aktuellen Spracheinstellung bleibt und unerwartete Sprachwechsel vermieden werden.
- **Wartbarkeit**: Die Zentralisierung der Lokalisierungslogik in einer einzigen Komponente vereinfacht die Verwaltung von URLs und macht Ihren Code einfacher wartbar und erweiterbar, wenn Ihre Anwendung wächst.

Nachfolgend finden Sie die Implementierung einer lokalisierten `Link`-Komponente in TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

/**
 * Hilfsfunktion, um zu überprüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Spracheinstellung anpasst.
 * Für interne Links verwendet sie `getLocalizedUrl`, um die URL mit der Sprache zu präfixieren (z. B. /fr/about).
 * Dies stellt sicher, dass die Navigation im gleichen Sprachkontext bleibt.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Wenn der Link intern ist und eine gültige href angegeben ist, wird die lokalisierte URL abgerufen.
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { forwardRef } from "react";

/**
 * Hilfsfunktion, um zu überprüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Spracheinstellung anpasst.
 * Für interne Links verwendet sie `getLocalizedUrl`, um die URL mit der Sprache zu präfixieren (z. B. /fr/about).
 * Dies stellt sicher, dass die Navigation im gleichen Sprachkontext bleibt.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {

const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Wenn der Link intern ist und eine gültige href angegeben ist, wird die lokalisierte URL abgerufen.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return (
    <a href={hrefI18n} ref={ref} {...props}>
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("react-intlayer");
const { forwardRef } = require("react");

/**
 * Hilfsfunktion, um zu überprüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Sprache anpasst.
 * Für interne Links wird `getLocalizedUrl` verwendet, um die URL mit der Sprache zu versehen (z. B. /de/about).
 * Dies stellt sicher, dass die Navigation im gleichen Sprachkontext bleibt.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Wenn der Link intern ist und eine gültige href angegeben ist, wird die lokalisierte URL abgerufen.
  const localizedHref = isExternalLink ? href : getLocalizedUrl(href, locale);

  return (
    <a
      href={localizedHref}
      ref={ref}
      {...props}
      aria-current={isExternalLink ? "external" : undefined}
    >
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

#### Wie es funktioniert

- **Erkennung externer Links**:  
  Die Hilfsfunktion `checkIsExternalLink` bestimmt, ob eine URL extern ist. Externe Links bleiben unverändert, da sie keine Lokalisierung benötigen.

- **Abrufen der aktuellen Sprache**:  
  Der `useLocale`-Hook liefert die aktuelle Sprache (z. B. `de` für Deutsch).

- **Lokalisierung der URL**:  
  Für interne Links (d. h. nicht externe) wird `getLocalizedUrl` verwendet, um die URL automatisch mit der aktuellen Sprache zu versehen. Das bedeutet, dass wenn Ihr Benutzer auf Deutsch ist, das Übergeben von `/about` als `href` zu `/de/about` transformiert wird.

- **Rückgabe des Links**:  
  Die Komponente gibt ein `<a>`-Element mit der lokalisierten URL zurück und stellt sicher, dass die Navigation mit der Sprache konsistent ist.

Durch die Integration dieser `Link`-Komponente in Ihrer Anwendung erhalten Sie eine kohärente und sprachbewusste Benutzererfahrung und profitieren gleichzeitig von verbessertem SEO und Benutzerfreundlichkeit.

### TypeScript konfigurieren

Intlayer verwendet Modul-Erweiterungen, um die Vorteile von TypeScript zu nutzen und Ihren Code robuster zu machen.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  // Ihre benutzerdefinierte Konfiguration
  "include": [
    "src",
    "types", // <- Die automatisch generierten Typen einbeziehen
  ],
}
```

### TypeScript konfigurieren

Intlayer verwendet Modul-Erweiterungen, um die Vorteile von TypeScript zu nutzen und Ihren Code robuster zu machen.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Die automatisch generierten Typen einbeziehen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch vermeiden Sie, diese in Ihr Git-Repository aufzunehmen.

Fügen Sie dazu die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzu:

```plaintext
# Die von Intlayer generierten Dateien ignorieren
.intlayer
```

### Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_CMS.md) auslagern.
