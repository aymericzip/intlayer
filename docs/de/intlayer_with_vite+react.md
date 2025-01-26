# Getting Started Internationalizing (i18n) with Intlayer and Vite and React

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Bibliothek für Internationalisierung (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mithilfe deklarativer Wörterbücher auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, was die Autovervollständigung und Fehlererkennung verbessert.
- **Von fortgeschrittenen Funktionen profitieren**, wie dynamischer Lokalisierungserkennung und -wechsel.

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

  Das Kernpaket, das Internationalisierungstools für die Konfigurationsverwaltung, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md) bereitstellt.

- **react-intlayer**
  Das Paket, das Intlayer mit der React-Anwendung integriert. Es bietet Kontextanbieter und Hooks für die React-Internationalisierung. Darüber hinaus enthält es das Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Lokalisierung des Benutzers, Verwaltung von Cookies und Handhabung der URL-Umleitung.

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

> Durch diese Konfigurationsdatei können Sie lokalisierten URLs, Middleware-Umleitungen, Cookie-Namen, den Standort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Protokolle in der Konsole deaktivieren und mehr. Für eine vollständige Liste der verfügbaren Parameter verweisen Sie auf die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

### Schritt 3: Integrieren Sie Intlayer in Ihre Vite-Konfiguration

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

> Das `intlayerPlugin()` Vite-Plugin wird verwendet, um Intlayer mit Vite zu integrieren. Es sorgt dafür, dass Inhaltedeklarationsdateien erstellt und im Entwicklungsmodus überwacht werden. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Darüber hinaus stellt es Aliase bereit, um die Leistung zu optimieren.

### Schritt 4: Deklarieren Sie Ihre Inhalte

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      // Vergessen Sie nicht, React zu importieren, wenn Sie einen React-Knoten in Ihrem Inhalt verwenden
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
    }),

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies DeclarationContent;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Vergessen Sie nicht, React zu importieren, wenn Sie einen React-Knoten in Ihrem Inhalt verwenden
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
      },

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Vergessen Sie nicht, React zu importieren, wenn Sie einen React-Knoten in Ihrem Inhalt verwenden
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
      },

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
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
        "es": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "React logo",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sodass sie in das Verzeichnis `contentDir` (standardmäßig `./src`) eingefügt werden. Und die Dateierweiterung der Inhaltsdeklaration übereinstimmt (standardmäßig `.content.{ts,tsx,js,jsx,mjs,cjs}`).
> Für weitere Details verweisen Sie auf die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/de/content_declaration/get_started.md).
> Wenn Ihre Inhaltsdatei TSX-Code enthält, sollten Sie in Ihrer Inhaltsdatei `import React from "react";` importieren.

### Schritt 5: Nutzen Sie Intlayer in Ihrem Code

Greifen Sie auf Ihre Inhaltsdictionaries in Ihrer Anwendung zu:

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

> Wenn Sie Ihre Inhalte in einem `string`-Attribut wie `alt`, `title`, `href`, `aria-label` usw. verwenden möchten, müssen Sie den Wert der Funktion aufrufen, wie:
>
> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Um mehr über den `useIntlayer`-Hook zu erfahren, verweisen Sie auf die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useIntlayer.md).

### (Optional) Schritt 6: Ändern Sie die Sprache Ihrer Inhalte

Um die Sprache Ihrer Inhalte zu ändern, können Sie die Funktion `setLocale` verwenden, die von dem `useLocale`-Hook bereitgestellt wird. Diese Funktion ermöglicht es Ihnen, die Lokalisierung der Anwendung festzulegen und die Inhalte entsprechend zu aktualisieren.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Ändern Sie die Sprache zu Englisch
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
      Ändern Sie die Sprache zu Englisch
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
      Ändern Sie die Sprache zu Englisch
    </button>
  );
};
```

> Um mehr über den `useLocale`-Hook zu erfahren, verweisen Sie auf die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useLocale.md).

### (Optional) Schritt 7: Fügen Sie lokalisierte Routen zu Ihrer Anwendung hinzu

Ziel dieses Schrittes ist es, eindeutige Routen für jede Sprache zu erstellen. Dies ist nützlich für SEO und SEO-freundliche URLs.
Beispiel:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Standardmäßig haben die Routen kein Präfix für die Standardsprache. Wenn Sie die Standardsprache voranstellen möchten, können Sie die `middleware.prefixDefault`-Option in Ihrer Konfiguration auf `true` setzen. Weitere Informationen finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

Um lokalisierte Routen zu Ihrer Anwendung hinzuzufügen, können Sie eine `LocaleRouter`-Komponente erstellen, die die Routen Ihrer Anwendung umschließt und die lokalisierte Routenbearbeitung übernimmt. Hier ist ein Beispiel mit [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Notwendige Abhängigkeiten und Funktionen importieren
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Hilfsfunktionen und Typen von 'intlayer'
import type { FC, PropsWithChildren } from "react"; // React-Typen für funktionale Komponenten und Requisiten
import { IntlayerProvider } from "react-intlayer"; // Anbieter für den Internationalisierungskontext
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Router-Komponenten zur Verwaltung der Navigation

// Konfiguration von Intlayer desktrukturieren
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Eine Komponente, die die Lokalisierung behandelt und Kinder mit dem entsprechenden Lokalisierungs Kontext umschließt.
 * Sie verwaltet URL-basierte Lokalisierungserkennung und -validierung.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Den aktuellen URL-Pfad abrufen
  const { locale } = useParams<{ locale: Locales }>(); // Den Locale-Parameter aus der URL extrahieren

  // Die aktuelle Lokalisierung bestimmen, die Standardlokalisierung verwenden, wenn sie nicht bereitgestellt wird
  const currentLocale = locale ?? defaultLocale;

  // Entfernen des Lokalisierungpräfixes vom Pfad, um einen Basis-Pfad zu erstellen
  const pathWithoutLocale = getPathWithoutLocale(
    path // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault true ist, sollte die Standardsprache immer vorangestellt werden.
   */
  if (middleware.prefixDefault) {
    // Validieren Sie die Lokalisierung
    if (!locale || !locales.includes(locale)) {
      // Umleitung zur Standardsprache mit dem aktualisierten Pfad
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Den aktuellen Verlaufseintrag mit dem neuen ersetzen
        />
      );
    }

    // Umschließen Sie Kinder mit dem IntlayerProvider und setzen Sie die aktuelle Lokalisierung
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Wenn middleware.prefixDefault false ist, wird die Standardsprache nicht vorangestellt.
     * Stellen Sie sicher, dass die aktuelle Lokalisierung gültig und nicht die Standardsprache ist.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Schließen Sie die Standardsprache aus
        )
        .includes(currentLocale) // Überprüfen Sie, ob die aktuelle Lokalisierung in der Liste der gültigen Lokalisierungen enthalten ist
    ) {
      // Umleitung zum Pfad ohne Lokalisierungspräfix
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Umschließen Sie Kinder mit dem IntlayerProvider und setzen Sie die aktuelle Lokalisierung
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Eine Router-Komponente, die lokalisierungsspezifische Routen einrichtet.
 * Sie verwendet React Router zur Verwaltung der Navigation und zum Rendern lokalisierten Komponenten.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Routenmuster zum Erfassen der Lokalisierung (z.B. /en/, /fr/) und Übereinstimmung aller nachfolgenden Pfade
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Umschließt Kinder mit Lokalisierungsverwaltung
      />

      {
        // Wenn das Voranstellen der Standardsprache deaktiviert ist, rendern Sie die Kinder direkt am Stammverzeichnis
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Umschließt Kinder mit Lokalisierungsverwaltung
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Notwendige Abhängigkeiten und Funktionen importieren
import { Locales, getConfiguration, getPathWithoutLocale } from "intlayer"; // Hilfsfunktionen und Typen von 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Anbieter für den Internationalisierungskontext
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom"; // Router-Komponenten zur Verwaltung der Navigation

// Konfiguration von Intlayer desktrukturieren
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Eine Komponente, die die Lokalisierung behandelt und Kinder mit dem entsprechenden Lokalisierungs Kontext umschließt.
 * Sie verwaltet URL-basierte Lokalisierungserkennung und -validierung.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Den aktuellen URL-Pfad abrufen
  const { locale } = useParams(); // Den Locale-Parameter aus der URL extrahieren

  // Die aktuelle Lokalisierung bestimmen, die Standardlokalisierung verwenden, wenn sie nicht bereitgestellt wird
  const currentLocale = locale ?? defaultLocale;

  // Entfernen des Lokalisierungpräfixes vom Pfad, um einen Basis-Pfad zu erstellen
  const pathWithoutLocale = getPathWithoutLocale(
    path // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault true ist, sollte die Standardsprache immer vorangestellt werden.
   */
  if (middleware.prefixDefault) {
    // Validieren Sie die Lokalisierung
    if (!locale || !locales.includes(locale)) {
      // Umleitung zur Standardsprache mit dem aktualisierten Pfad
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Den aktuellen Verlaufseintrag mit dem neuen ersetzen
        />
      );
    }

    // Umschließen Sie Kinder mit dem IntlayerProvider und setzen Sie die aktuelle Lokalisierung
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Wenn middleware.prefixDefault false ist, wird die Standardsprache nicht vorangestellt.
     * Stellen Sie sicher, dass die aktuelle Lokalisierung gültig und nicht die Standardsprache ist.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Schließen Sie die Standardsprache aus
        )
        .includes(currentLocale) // Überprüfen Sie, ob die aktuelle Lokalisierung in der Liste der gültigen Lokalisierungen enthalten ist
    ) {
      // Umleitung zum Pfad ohne Lokalisierungspräfix
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Umschließen Sie Kinder mit dem IntlayerProvider und setzen Sie die aktuelle Lokalisierung
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Eine Router-Komponente, die lokalisierungsspezifische Routen einrichtet.
 * Sie verwendet React Router zur Verwaltung der Navigation und zum Rendern lokalisierten Komponenten.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Routenmuster zum Erfassen der Lokalisierung (z.B. /en/, /fr/) und Übereinstimmung aller nachfolgenden Pfade
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Umschließt Kinder mit Lokalisierungsverwaltung
      />

      {
        // Wenn das Voranstellen der Standardsprache deaktiviert ist, rendern Sie die Kinder direkt am Stammverzeichnis
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Umschließt Kinder mit Lokalisierungsverwaltung
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Notwendige Abhängigkeiten und Funktionen importieren
const { getConfiguration, getPathWithoutLocale } = require("intlayer"); // Hilfsfunktionen und Typen von 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Anbieter für den Internationalisierungskontext
const {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Router-Komponenten zur Verwaltung der Navigation

// Konfiguration von Intlayer desktrukturieren
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * Eine Komponente, die die Lokalisierung behandelt und Kinder mit dem entsprechenden Lokalisierungs Kontext umschließt.
 * Sie verwaltet URL-basierte Lokalisierungserkennung und -validierung.
 */
const AppLocalized = ({ children }) => {
  const path = useLocation().pathname; // Den aktuellen URL-Pfad abrufen
  const { locale } = useParams(); // Den Locale-Parameter aus der URL extrahieren

  // Die aktuelle Lokalisierung bestimmen, die Standardlokalisierung verwenden, wenn sie nicht bereitgestellt wird
  const currentLocale = locale ?? defaultLocale;

  // Entfernen des Lokalisierungpräfixes vom Pfad, um einen Basis-Pfad zu erstellen
  const pathWithoutLocale = getPathWithoutLocale(
    path // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault true ist, sollte die Standardsprache immer vorangestellt werden.
   */
  if (middleware.prefixDefault) {
    // Validieren Sie die Lokalisierung
    if (!locale || !locales.includes(locale)) {
      // Umleitung zur Standardsprache mit dem aktualisierten Pfad
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}`}
          replace // Den aktuellen Verlaufseintrag mit dem neuen ersetzen
        />
      );
    }

    // Umschließen Sie Kinder mit dem IntlayerProvider und setzen Sie die aktuelle Lokalisierung
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Wenn middleware.prefixDefault false ist, wird die Standardsprache nicht vorangestellt.
     * Stellen Sie sicher, dass die aktuelle Lokalisierung gültig und nicht die Standardsprache ist.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Schließen Sie die Standardsprache aus
        )
        .includes(currentLocale) // Überprüfen Sie, ob die aktuelle Lokalisierung in der Liste der gültigen Lokalisierungen enthalten ist
    ) {
      // Umleitung zum Pfad ohne Lokalisierungspräfix
      return <Navigate to={pathWithoutLocale} replace />;
    }

    // Umschließen Sie Kinder mit dem IntlayerProvider und setzen Sie die aktuelle Lokalisierung
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Eine Router-Komponente, die lokalisierungsspezifische Routen einrichtet.
 * Sie verwendet React Router zur Verwaltung der Navigation und zum Rendern lokalisierten Komponenten.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      <Route
        // Routenmuster zum Erfassen der Lokalisierung (z.B. /en/, /fr/) und Übereinstimmung aller nachfolgenden Pfade
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Umschließt Kinder mit Lokalisierungsverwaltung
      />

      {
        // Wenn das Voranstellen der Standardsprache deaktiviert ist, rendern Sie die Kinder direkt am Stammverzeichnis
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Umschließt Kinder mit Lokalisierungsverwaltung
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

In parallel, you can also use the `intLayerMiddlewarePlugin` to add server-side routing to your application. This plugin will automatically detect the current locale based on the URL and set the appropriate locale cookie. If no locale is specified, the plugin will determine the most appropriate locale based on the user's browser language preferences. If no locale is detected, it will redirect to the default locale.

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

### (Optional) Schritt 8: Ändern Sie die URL, wenn sich die Sprache ändert

Um die URL zu ändern, wenn sich die Sprache ändert, können Sie die `onLocaleChange`-Eigenschaft verwenden, die vom `useLocale`-Hook bereitgestellt wird. Parallel dazu können Sie die Hooks `useLocation` und `useNavigate` von `react-router-dom` verwenden, um den URL-Pfad zu aktualisieren.

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
  const location = useLocation(); // Erhalte den aktuellen URL-Pfad. Beispiel: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale: Locales) => {
    // Konstruiere die URL mit der aktualisierten Lokalisierung
    // Beispiel: /es/about mit der Lokalisierung auf Spanisch gesetzt
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Aktualisiere den URL-Pfad
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
              {/* Sprache in ihrer eigenen Sprache - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Sprache - z.B. Francés mit der aktuellen Sprache auf Locales.SPANISH gesetzt */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Sprache - z.B. FR */}
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
  const location = useLocation(); // Erhalte den aktuellen URL-Pfad. Beispiel: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Konstruiere die URL mit der aktualisierten Lokalisierung
    // Beispiel: /es/about mit der Lokalisierung auf Spanisch gesetzt
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Aktualisiere den URL-Pfad
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
              {/* Sprache in ihrer eigenen Sprache - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Sprache - z.B. Francés mit der aktuellen Sprache auf Locales.SPANISH gesetzt */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Sprache - z.B. FR */}
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
  const location = useLocation(); // Erhalte den aktuellen URL-Pfad. Beispiel: /fr/about
  const navigate = useNavigate();

  const changeUrl = (locale) => {
    // Konstruiere die URL mit der aktualisierten Lokalisierung
    // Beispiel: /es/about mit der Lokalisierung auf Spanisch gesetzt
    const pathWithLocale = getLocalizedUrl(location.pathname, locale);

    // Aktualisiere den URL-Pfad
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
              {/* Sprache in ihrer eigenen Sprache - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Sprache - z.B. Francés mit der aktuellen Sprache auf Locales.SPANISH gesetzt */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z.B. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Sprache - z.B. FR */}
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
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` Attribut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` Attribut](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### TypeScript konfigurieren

Intlayer verwendet Modul-Augenbereitung, um die Vorteile von TypeScript zu nutzen und Ihre Codebasis zu stärken.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  // Ihre benutzerdefinierte Konfiguration
  "include": [
    "src",
    "types", // <- Die automatisch generierten Typen einfügen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dies verhindert, dass sie in Ihr Git-Repository committen.

Um dies zu tun, können Sie die folgenden Anweisungen in Ihre `.gitignore`-Datei hinzufügen:

```plaintext
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```
