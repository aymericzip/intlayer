---
createdAt: 2024-03-07
updatedAt: 2025-12-10
title: Wie Sie Ihre Vite- und React-Anwendung übersetzen – i18n-Leitfaden 2025
description: Erfahren Sie, wie Sie Internationalisierung (i18n) zu Ihrer Vite- und React-Anwendung mit Intlayer hinzufügen. Folgen Sie dieser Anleitung, um Ihre App mehrsprachig zu machen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historie initialisiert
---

# Übersetzen Sie Ihre Vite- und React-Website mit Intlayer | Internationalisierung (i18n)

## Inhaltsverzeichnis

<TOC/>

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mit deklarativen Wörterbüchern auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** durch automatisch generierte Typen, die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamische Lokalerkennung und -umschaltung.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Vite- und React-Anwendung

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and React? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </TabItem>
  <TabItem label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Siehe [Application Template](https://github.com/aymericzip/intlayer-vite-react-template) auf GitHub.

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete mit npm:

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

- **intlayer**

Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltserklärung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md) bereitstellt.

- **react-intlayer**
  Das Paket, das Intlayer in React-Anwendungen integriert. Es stellt Kontext-Provider und Hooks für die Internationalisierung in React bereit.

- **vite-intlayer**
  Enthält das Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, Verwaltung von Cookies und Handhabung von URL-Weiterleitungen.

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
      // Ihre weiteren Sprachversionen
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
      // Ihre weiteren Sprachversionen
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
      // Ihre weiteren Sprachversionen
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Durch diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Protokolle in der Konsole deaktivieren und vieles mehr. Für eine vollständige Liste der verfügbaren Parameter verweisen wir auf die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Integrieren Sie Intlayer in Ihre Vite-Konfiguration

Fügen Sie das intlayer-Plugin in Ihre Konfiguration ein.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer()],
});
```

> Das `intlayer()` Vite-Plugin wird verwendet, um Intlayer mit Vite zu integrieren. Es stellt sicher, dass Inhaltsdeklarationsdateien erstellt und im Entwicklungsmodus überwacht werden. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Zusätzlich bietet es Aliase zur Optimierung der Leistung.

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
      de: "Der Zähler ist ",
    }),

    edit: t<ReactNode>({
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
            Edit <code>src/App.tsx</code> und speichern, um HMR zu testen
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

/** @type {import('intlayer').Dictionary} */
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
            Edit <code>src/App.tsx</code> und speichern, um HMR zu testen
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
      en: "Klicken Sie auf die Vite- und React-Logos, um mehr zu erfahren",
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
        "de": "Vite + React",
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "de": "Zähler ist ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "de": "Bearbeiten Sie src/App.tsx und speichern Sie, um HMR zu testen",
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "de": "Klicken Sie auf die Logos von Vite und React, um mehr zu erfahren",
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información"
      }
    }
  }
}
```

Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sobald sie in das `contentDir`-Verzeichnis (standardmäßig `./src`) aufgenommen werden. Und die Dateiendung der Inhaltsdeklaration muss übereinstimmen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

> Wenn Ihre Inhaltsdatei TSX-Code enthält, sollten Sie in Ihrer Inhaltsdatei `import React from "react";` importieren.

### Schritt 5: Verwenden Sie Intlayer in Ihrem Code

Greifen Sie in Ihrer gesamten Anwendung auf Ihre Inhaltswörterbücher zu:

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

const App = () => (
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

> Wenn Sie Ihren Inhalt in einem `string`-Attribut verwenden möchten, wie z. B. `alt`, `title`, `href`, `aria-label` usw., müssen Sie den Wert der Funktion aufrufen, zum Beispiel:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Um mehr über den `useIntlayer` Hook zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useIntlayer.md).

### (Optional) Schritt 6: Ändern Sie die Sprache Ihres Inhalts

Um die Sprache Ihres Inhalts zu ändern, können Sie die Funktion `setLocale` verwenden, die vom `useLocale` Hook bereitgestellt wird. Diese Funktion ermöglicht es Ihnen, die Locale der Anwendung festzulegen und den Inhalt entsprechend zu aktualisieren.

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

> Um mehr über den `useLocale` Hook zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md).

### (Optional) Schritt 7: Lokalisierte Routen zu Ihrer Anwendung hinzufügen

Der Zweck dieses Schrittes ist es, für jede Sprache eindeutige Routen zu erstellen. Dies ist nützlich für SEO und SEO-freundliche URLs.
Beispiel:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Standardmäßig sind die Routen für die Standardsprache nicht mit einem Präfix versehen. Wenn Sie die Standardsprache mit einem Präfix versehen möchten, können Sie in Ihrer Konfiguration die Option `middleware.prefixDefault` auf `true` setzen. Weitere Informationen finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

Um lokalisierte Routen in Ihre Anwendung hinzuzufügen, können Sie eine `LocaleRouter`-Komponente erstellen, die die Routen Ihrer Anwendung umschließt und die sprachabhängige Navigation verwaltet. Hier ist ein Beispiel unter Verwendung von [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { localeMap } from "intlayer"; // Dienstprogramme und Typen von 'intlayer'
import type { FC, PropsWithChildren } from "react"; // React-Typen für funktionale Komponenten und Props
import { IntlayerProvider } from "react-intlayer"; // Provider für Internationalisierungskontext
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Router-Komponenten zur Verwaltung der Navigation

/**
 * Eine Router-Komponente, die locale-spezifische Routen einrichtet.
 * Sie verwendet React Router, um die Navigation zu verwalten und lokalisierte Komponenten zu rendern.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {localeMap(({ locale, urlPrefix }) => (
        <Route
          // Routenmuster zur Erfassung der Locale (z. B. /en/, /fr/) und zum Abgleich aller nachfolgenden Pfade
          path={`${urlPrefix}/*`}
          key={locale}
          element={
            <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
          } // Umschließt die Kinder mit der Locale-Verwaltung
        />
      ))}
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
import { localeMap } from 'intlayer'; // Dienstprogramme und Typen von 'intlayer'
import type { FC, PropsWithChildren } from 'react'; // React-Typen für funktionale Komponenten und Props
import { IntlayerProvider } from 'react-intlayer'; // Provider für den Internationalisierungskontext
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Router-Komponenten zur Verwaltung der Navigation

/**
 * Eine Router-Komponente, die locale-spezifische Routen einrichtet.
 * Sie verwendet React Router, um die Navigation zu verwalten und lokalisierte Komponenten zu rendern.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {localeMap(({ locale, urlPrefix }) => (
        <Route
          // Routenmuster zur Erfassung der Locale (z. B. /en/, /fr/) und zum Abgleich aller nachfolgenden Pfade
          path={`${urlPrefix}/*`}
          key={locale}
          element={
            <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
          } // Umschließt die Kinder mit der Locale-Verwaltung
        />
      ))}
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
const { localeMap } = require("intlayer"); // Dienstprogramme und Typen von 'intlayer'
const React = require("react"); // React importieren
const { IntlayerProvider } = require("react-intlayer"); // Provider für den Internationalisierungskontext
const { BrowserRouter, Route, Routes } = require("react-router-dom"); // Router-Komponenten zur Verwaltung der Navigation

/**
 * Eine Router-Komponente, die locale-spezifische Routen einrichtet.
 * Sie verwendet React Router, um die Navigation zu verwalten und lokalisierte Komponenten zu rendern.
 */
const LocaleRouter = ({ children }) =>
  React.createElement(
    BrowserRouter,
    {},
    React.createElement(
      Routes,
      {},
      localeMap(({ locale, urlPrefix }) =>
        React.createElement(Route, {
          path: `${urlPrefix}/*`,
          key: locale,
          element: React.createElement(IntlayerProvider, { locale }, children),
        })
      )
    )
  );

exports.LocaleRouter = LocaleRouter;
```

> Hinweis: Wenn Sie `routing.mode: 'no-prefix' | 'search-params'` verwenden, müssen Sie die Funktion `localeMap` wahrscheinlich nicht verwenden.

Dann können Sie die Komponente `LocaleRouter` in Ihrer Anwendung verwenden:

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

Parallel dazu können Sie auch das `intlayerProxy` verwenden, um serverseitiges Routing in Ihre Anwendung zu integrieren. Dieses Plugin erkennt automatisch die aktuelle Locale basierend auf der URL und setzt das entsprechende Locale-Cookie. Wenn keine Locale angegeben ist, bestimmt das Plugin die passendste Locale basierend auf den Spracheinstellungen des Browsers des Benutzers. Wird keine Locale erkannt, erfolgt eine Weiterleitung zur Standard-Locale.

> Beachten Sie, dass Sie für die Verwendung von `intlayerProxy` in der Produktion das Paket `vite-intlayer` von `devDependencies` zu `dependencies` verschieben müssen.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer(), intlayerProxy()],
});
```

### (Optional) Schritt 8: URL ändern, wenn sich die Sprache ändert

Um die URL zu ändern, wenn sich die Locale ändert, können Sie die `onLocaleChange`-Eigenschaft verwenden, die vom `useLocale`-Hook bereitgestellt wird. Parallel dazu können Sie die Hooks `useLocation` und `useNavigate` von `react-router-dom` verwenden, um den URL-Pfad zu aktualisieren.

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
  const { pathname, search } = useLocation(); // Hole den aktuellen URL-Pfad. Beispiel: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Erstelle die URL mit der aktualisierten Locale
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
              {/* Gebietsschema - z.B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache im eigenen Gebietsschema - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache im aktuellen Gebietsschema - z.B. Francés, wenn das aktuelle Gebietsschema auf Locales.SPANISH gesetzt ist */}
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
  const { pathname, search } = useLocation(); // Hole den aktuellen URL-Pfad. Beispiel: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Erstelle die URL mit der aktualisierten Locale
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
              {/* Gebietsschema - z.B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrem eigenen Gebietsschema - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Locale - z.B. Francés mit aktueller Locale auf Locales.SPANISH gesetzt */}
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
  const { pathname, search } = useLocation(); // Hole den aktuellen URL-Pfad. Beispiel: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Erstelle die URL mit der aktualisierten Locale
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
              {/* Gebietsschema - z.B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache im eigenen Gebietsschema - z.B. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache im aktuellen Gebietsschema - z.B. Francés, wenn das aktuelle Gebietsschema auf Locales.SPANISH gesetzt ist */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch – z.B. Französisch */}
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
> - [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` Attribut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` Attribut](https://developer.mozilla.org/de/docs/Web/HTML/Global_attributes/lang)
> - [`dir` Attribut](https://developer.mozilla.org/de/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` Attribut](https://developer.mozilla.org/de/docs/Web/Accessibility/ARIA/Attributes/aria-current)

Nachfolgend finden Sie den aktualisierten **Schritt 9** mit zusätzlichen Erklärungen und verfeinerten Codebeispielen:

---

### (Optional) Schritt 9: Wechseln der HTML-Sprach- und Richtungsattribute

Wenn Ihre Anwendung mehrere Sprachen unterstützt, ist es entscheidend, die `lang`- und `dir`-Attribute des `<html>`-Tags an die aktuelle Locale anzupassen. Dies stellt sicher:

- **Barrierefreiheit**: Screenreader und unterstützende Technologien verlassen sich auf das korrekte `lang`-Attribut, um Inhalte richtig auszusprechen und zu interpretieren.
- **Textdarstellung**: Das `dir`-Attribut (Richtung) sorgt dafür, dass der Text in der richtigen Reihenfolge dargestellt wird (z. B. von links nach rechts für Englisch, von rechts nach links für Arabisch oder Hebräisch), was für die Lesbarkeit unerlässlich ist.
- **SEO**: Suchmaschinen verwenden das `lang`-Attribut, um die Sprache Ihrer Seite zu bestimmen und so die passende lokalisierte Version in den Suchergebnissen anzuzeigen.

Indem Sie diese Attribute dynamisch aktualisieren, wenn sich die Spracheinstellung ändert, gewährleisten Sie eine konsistente und barrierefreie Erfahrung für Benutzer in allen unterstützten Sprachen.

#### Implementierung des Hooks

Erstellen Sie einen benutzerdefinierten Hook, um die HTML-Attribute zu verwalten. Der Hook hört auf Änderungen der Locale und aktualisiert die Attribute entsprechend:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aktualisiert die `lang`- und `dir`-Attribute des HTML-Elements `<html>` basierend auf der aktuellen Locale.
 * - `lang`: Informiert Browser und Suchmaschinen über die Sprache der Seite.
 * - `dir`: Stellt die korrekte Leserichtung sicher (z.B. 'ltr' für Englisch, 'rtl' für Arabisch).
 *
 * Dieses dynamische Update ist entscheidend für die korrekte Textdarstellung, Barrierefreiheit und SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aktualisiert das Sprachattribut auf die aktuelle Locale.
    document.documentElement.lang = locale;

    // Setzt die Schreibrichtung basierend auf der aktuellen Locale.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aktualisiert die `lang`- und `dir`-Attribute des HTML-<html>-Elements basierend auf der aktuellen Locale.
 * - `lang`: Informiert Browser und Suchmaschinen über die Sprache der Seite.
 * - `dir`: Stellt die korrekte Leserichtung sicher (z.B. 'ltr' für Englisch, 'rtl' für Arabisch).
 *
 * Dieses dynamische Update ist essentiell für die korrekte Textdarstellung, Barrierefreiheit und SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aktualisiert das Sprachattribut auf die aktuelle Locale.
    document.documentElement.lang = locale;

    // Setzt die Leserichtung basierend auf der aktuellen Locale.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Aktualisiert die `lang`- und `dir`-Attribute des HTML-Elements <html> basierend auf der aktuellen Locale.
 * - `lang`: Informiert Browser und Suchmaschinen über die Sprache der Seite.
 * - `dir`: Stellt die korrekte Leserichtung sicher (z. B. 'ltr' für Englisch, 'rtl' für Arabisch).
 *
 * Diese dynamische Aktualisierung ist essenziell für die korrekte Textdarstellung, Barrierefreiheit und SEO.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aktualisiere das Sprachattribut auf die aktuelle Locale.
    document.documentElement.lang = locale;

    // Setze die Textrichtung basierend auf der aktuellen Locale.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Verwendung des Hooks in Ihrer Anwendung

Integrieren Sie den Hook in Ihre Hauptkomponente, damit die HTML-Attribute aktualisiert werden, sobald sich die Locale ändert:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Wenden Sie den Hook an, um die lang- und dir-Attribute des <html>-Tags basierend auf der Locale zu aktualisieren.
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
  // Wenden Sie den Hook an, um die lang- und dir-Attribute des <html>-Tags basierend auf der Locale zu aktualisieren.
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
  // Wenden Sie den Hook an, um die lang- und dir-Attribute des <html>-Tags basierend auf der Locale zu aktualisieren.
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

- Sicherstellen, dass das **language** (`lang`) Attribut die aktuelle Locale korrekt widerspiegelt, was wichtig für SEO und das Verhalten des Browsers ist.
- Die **Schreibrichtung** (`dir`) entsprechend der Locale anpassen, um die Lesbarkeit und Benutzerfreundlichkeit für Sprachen mit unterschiedlicher Leserichtung zu verbessern.
- Eine bessere **Barrierefreiheit** bieten, da unterstützende Technologien auf diese Attribute angewiesen sind, um optimal zu funktionieren.

### (Optional) Schritt 10: Erstellen einer lokalisierten Link-Komponente

Um sicherzustellen, dass die Navigation Ihrer Anwendung die aktuelle Sprache berücksichtigt, können Sie eine benutzerdefinierte `Link`-Komponente erstellen. Diese Komponente fügt automatisch den aktuellen Sprachpräfix zu internen URLs hinzu. Zum Beispiel wird ein französischsprachiger Benutzer, der auf einen Link zur "Über uns"-Seite klickt, zu `/fr/about` statt zu `/about` weitergeleitet.

Dieses Verhalten ist aus mehreren Gründen nützlich:

- **SEO und Benutzererfahrung**: Lokalisierte URLs helfen Suchmaschinen, sprachspezifische Seiten korrekt zu indexieren, und bieten den Nutzern Inhalte in ihrer bevorzugten Sprache.
- **Konsistenz**: Durch die Verwendung eines lokalisierten Links in Ihrer gesamten Anwendung stellen Sie sicher, dass die Navigation innerhalb der aktuellen Sprache bleibt und unerwartete Sprachwechsel vermieden werden.
- **Wartbarkeit**: Die Zentralisierung der Lokalisierungslogik in einer einzigen Komponente vereinfacht die Verwaltung der URLs und macht Ihren Code leichter wartbar und erweiterbar, wenn Ihre Anwendung wächst.

Nachfolgend finden Sie die Implementierung einer lokalisierten `Link`-Komponente in TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps extends DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> {}

/**
 * Hilfsfunktion, um zu prüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Locale anpasst.
 * Für interne Links verwendet sie `getLocalizedUrl`, um die URL mit der Locale zu versehen (z.B. /fr/about).
 * Dies stellt sicher, dass die Navigation im gleichen Locale-Kontext bleibt.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Wenn der Link intern ist und ein gültiges href vorhanden ist, wird die lokalisierte URL verwendet.
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
 * Hilfsfunktion, um zu prüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Locale anpasst.
 * Für interne Links wird `getLocalizedUrl` verwendet, um die URL mit der Locale zu versehen (z.B. /fr/about).
 * Dies stellt sicher, dass die Navigation im gleichen Locale-Kontext bleibt.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Wenn der Link intern ist und eine gültige href vorhanden ist, wird die lokalisierte URL abgerufen.
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
 * Hilfsfunktion, um zu prüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Sprache anpasst.
 * Für interne Links wird `getLocalizedUrl` verwendet, um die URL mit der Sprachkennung zu versehen (z.B. /fr/about).
 * Dies stellt sicher, dass die Navigation im gleichen Sprachkontext bleibt.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Wenn der Link intern ist und eine gültige href angegeben ist, wird die lokalisierte URL ermittelt.
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

#### Funktionsweise

- **Erkennung externer Links**:  
  Die Hilfsfunktion `checkIsExternalLink` bestimmt, ob eine URL extern ist. Externe Links bleiben unverändert, da sie nicht lokalisiert werden müssen.

- **Abrufen der aktuellen Locale**:  
  Der Hook `useLocale` liefert die aktuelle Locale (z. B. `fr` für Französisch).

- **Lokalisierung der URL**:  
  Für interne Links (d. h. nicht extern) wird `getLocalizedUrl` verwendet, um die URL automatisch mit der aktuellen Locale zu versehen. Das bedeutet, wenn Ihr Benutzer Französisch eingestellt hat, wird aus `/about` als `href` automatisch `/fr/about`.

- **Rückgabe des Links**:  
  Die Komponente gibt ein `<a>`-Element mit der lokalisierten URL zurück, wodurch sichergestellt wird, dass die Navigation konsistent mit der Spracheinstellung erfolgt.

Indem Sie diese `Link`-Komponente in Ihrer gesamten Anwendung integrieren, gewährleisten Sie eine kohärente und sprachbewusste Benutzererfahrung und profitieren gleichzeitig von verbesserter SEO und Benutzerfreundlichkeit.

### TypeScript konfigurieren

Intlayer verwendet Module Augmentation, um die Vorteile von TypeScript zu nutzen und Ihre Codebasis robuster zu machen.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen einschließt.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Einschluss der automatisch generierten Typen
  ],
}
```

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch vermeiden Sie, diese in Ihr Git-Repository zu committen.

Fügen Sie dazu folgende Anweisungen in Ihre `.gitignore`-Datei ein:

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Extension** installieren.

[Installation aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Für weitere Details zur Nutzung der Erweiterung siehe die [Intlayer VS Code Extension Dokumentation](https://intlayer.org/doc/vs-code-extension).

---

### Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.
