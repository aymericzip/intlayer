---
docName: intlayer_with_vite_preact
url: https://intlayer.org/doc/environment/vite-and-preact
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+preact.md
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Übersetzen Sie Ihre Vite und Preact-Website (i18n)
description: Erfahren Sie, wie Sie Ihre mit Vite und Preact erstellte Website mehrsprachig gestalten können. Folgen Sie der Dokumentation zur Internationalisierung (i18n) und Übersetzung.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Vite
  - Preact
  - JavaScript
---

# Erste Schritte mit der Internationalisierung (i18n) mit Intlayer, Vite und Preact

> Dieses Paket befindet sich in der Entwicklung. Siehe das [Issue](https://github.com/aymericzip/intlayer/issues/118) für weitere Informationen. Zeigen Sie Ihr Interesse an Intlayer für Preact, indem Sie das Issue liken.

Siehe [Anwendungsvorlage](https://github.com/aymericzip/intlayer-vite-preact-template) auf GitHub.

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die Unterstützung mehrerer Sprachen in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mit deklarativen Wörterbüchern auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Von erweiterten Funktionen profitieren**, wie dynamische Spracherkennung und -umschaltung.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Vite- und Preact-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die erforderlichen Pakete mit npm:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install --save-dev vite-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add --save-dev vite-intlayer
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add --save-dev vite-intlayer
```

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md), Transpilation und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) bereitstellt.

- **preact-intlayer**
  Das Paket, das Intlayer mit Preact-Anwendungen integriert. Es bietet Kontextanbieter und Hooks für die Internationalisierung in Preact.

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

> Über diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookienamen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Logs in der Konsole deaktivieren und mehr. Für eine vollständige Liste der verfügbaren Parameter lesen Sie die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Intlayer in Ihre Vite-Konfiguration integrieren

Fügen Sie das Intlayer-Plugin in Ihre Konfiguration ein.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin()],
});
```

> Das `intlayerPlugin()` Vite-Plugin wird verwendet, um Intlayer mit Vite zu integrieren. Es stellt sicher, dass Inhaltsdeklarationsdateien erstellt und im Entwicklungsmodus überwacht werden. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Zusätzlich bietet es Aliase zur Optimierung der Leistung.

### Schritt 4: Ihren Inhalt deklarieren

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      de: "Vite-Logo",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      de: "Preact-Logo",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      de: "Anzahl ist ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ComponentChildren>({
      de: (
        <>
          Bearbeiten Sie <code>src/app.tsx</code> und speichern Sie, um HMR zu
          testen
        </>
      ),
      en: (
        <>
          Edit <code>src/app.tsx</code> and save to test HMR
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
      de: "Klicken Sie auf die Vite- und Preact-Logos, um mehr zu erfahren",
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
// import { h } from 'preact'; // Erforderlich, wenn Sie JSX direkt in .mjs verwenden

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      de: "Vite-Logo",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      de: "Preact-Logo",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      de: "Anzahl ist ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      de: "Bearbeiten Sie src/app.jsx und speichern Sie, um HMR zu testen",
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      de: "Klicken Sie auf die Vite- und Preact-Logos, um mehr zu erfahren",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // Erforderlich, wenn Sie JSX direkt in .cjs verwenden

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      de: "Vite-Logo",
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      de: "Preact-Logo",
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      de: "Anzahl ist ",
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      de: "Bearbeiten Sie src/app.tsx und speichern Sie, um HMR zu testen",
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      de: "Klicken Sie auf die Logos von Vite und Preact, um mehr zu erfahren",
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
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
        "de": "Vite-Logo",
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "de": "Preact-Logo",
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "de": "Vite + Preact",
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "de": "Anzahl ist ",
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "de": "Bearbeiten Sie src/app.tsx und speichern Sie, um HMR zu testen",
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "de": "Klicken Sie auf die Logos von Vite und Preact, um mehr zu erfahren",
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, solange sie im `contentDir`-Verzeichnis (standardmäßig `./src`) enthalten sind. Und die Dateierweiterung der Inhaltsdeklaration übereinstimmt (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Weitere Details finden Sie in der [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

> Wenn Ihre Inhaltsdatei TSX-Code enthält, müssen Sie möglicherweise `import { h } from "preact";` importieren oder sicherstellen, dass Ihr JSX-Pragma korrekt für Preact eingestellt ist.

### Schritt 5: Verwenden Sie Intlayer in Ihrem Code

Greifen Sie in Ihrer gesamten Anwendung auf Ihre Inhaltswörterbücher zu:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // Angenommen, Sie haben eine preact.svg
import viteLogo from "/vite.svg";
import "./app.css"; // Angenommen, Ihre CSS-Datei heißt app.css
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

> Wenn Sie Ihren Inhalt in einem `string`-Attribut wie `alt`, `title`, `href`, `aria-label` usw. verwenden möchten, müssen Sie den Wert der Funktion aufrufen, wie:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Hinweis: In Preact wird `className` typischerweise als `class` geschrieben.

> Um mehr über den `useIntlayer`-Hook zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md) (Die API ist ähnlich für `preact-intlayer`).

### (Optional) Schritt 6: Ändern Sie die Sprache Ihres Inhalts

Um die Sprache Ihres Inhalts zu ändern, können Sie die Funktion `setLocale` verwenden, die vom `useLocale`-Hook bereitgestellt wird. Mit dieser Funktion können Sie die Locale der Anwendung festlegen und den Inhalt entsprechend aktualisieren.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Sprache auf Englisch ändern

import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Sprache zu Englisch ändern
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
      Sprache zu Englisch ändern
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> Um mehr über den `useLocale` Hook zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md) (Die API ist ähnlich für `preact-intlayer`).

### (Optional) Schritt 7: Lokalisierte Routen zu Ihrer Anwendung hinzufügen

Das Ziel dieses Schritts ist es, eindeutige Routen für jede Sprache zu erstellen. Dies ist nützlich für SEO und SEO-freundliche URLs.
Beispiel:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Standardmäßig werden die Routen für die Standardsprache nicht vorangestellt. Wenn Sie die Standardsprache voranstellen möchten, können Sie die Option `middleware.prefixDefault` in Ihrer Konfiguration auf `true` setzen. Weitere Informationen finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

Um lokalisierte Routen zu Ihrer Anwendung hinzuzufügen, können Sie eine `LocaleRouter`-Komponente erstellen, die die Routen Ihrer Anwendung umschließt und die sprachbasierte Routenverwaltung übernimmt. Hier ist ein Beispiel mit [preact-iso](https://github.com/preactjs/preact-iso):

Zuerst `preact-iso` installieren:

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
import { type Locales, configuration, getPathWithoutLocale } from "intlayer";
import { ComponentChildren, FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";

const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

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
 * Eine Komponente, die die Lokalisierung verwaltet und Kinder mit dem entsprechenden Sprachkontext umschließt.
 * Sie verwaltet die URL-basierte Spracherkennung und -validierung.
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locales;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Bestimmen der aktuellen Sprache, falls nicht angegeben, wird die Standardsprache verwendet
  const currentLocale = locale ?? defaultLocale;

  // Entfernen des Sprachpräfixes aus dem Pfad, um einen Basis-Pfad zu erstellen
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault wahr ist, sollte die Standardsprache immer vorangestellt werden.
   */
  if (middleware.prefixDefault) {
    // Sprache validieren
    if (!locale || !locales.includes(locale)) {
      // Umleiten zur Standardsprache mit dem aktualisierten Pfad
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Ersetzen des aktuellen Verlaufs-Eintrags durch den neuen
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
          (loc) => loc.toString() !== defaultLocale.toString() // Standardsprache ausschließen
        )
        .includes(currentLocale) // Überprüfen, ob die aktuelle Sprache in der Liste der gültigen Sprachen enthalten ist
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

const RouterContent: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1] as Locales;

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Eine Router-Komponente, die sprachspezifische Routen einrichtet.
 * Sie verwendet preact-iso, um die Navigation zu verwalten und lokalisierte Komponenten zu rendern.
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
// Importieren der notwendigen Abhängigkeiten und Funktionen
import { configuration, getPathWithoutLocale } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { h } from "preact"; // Erforderlich für JSX

// Destrukturierung der Konfiguration aus Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Eine Komponente, die die Lokalisierung verwaltet und Kinder mit dem entsprechenden Sprachkontext umschließt.
 * Sie verwaltet die URL-basierte Spracherkennung und -validierung.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Bestimmen der aktuellen Sprache, falls nicht angegeben, wird die Standardsprache verwendet
  const currentLocale = locale ?? defaultLocale;

  // Entfernen des Sprachpräfixes aus dem Pfad, um einen Basis-Pfad zu erstellen
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault wahr ist, sollte die Standardsprache immer vorangestellt werden.
   */
  if (middleware.prefixDefault) {
    // Sprache validieren
    if (!locale || !locales.includes(locale)) {
      // Umleiten zur Standardsprache mit dem aktualisierten Pfad
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Ersetzen des aktuellen Verlaufs-Eintrags durch den neuen
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
          (loc) => loc.toString() !== defaultLocale.toString() // Standardsprache ausschließen
        )
        .includes(currentLocale) // Überprüfen, ob die aktuelle Sprache in der Liste der gültigen Sprachen enthalten ist
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

* Wenn middleware.prefixDefault false ist, wird die Standardsprache nicht vorangestellt.
     * Stellen Sie sicher, dass die aktuelle Sprache gültig ist und nicht die Standardsprache ist.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Standardsprache ausschließen
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

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Eine Router-Komponente, die sprachspezifische Routen einrichtet.
 * Sie verwendet preact-iso, um die Navigation zu verwalten und lokalisierte Komponenten zu rendern.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
// Importieren der notwendigen Abhängigkeiten und Funktionen
const { configuration, getPathWithoutLocale } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, useLocation } = require("preact-iso");
const { useEffect } = require("preact/hooks");
const { h } = require("preact"); // Erforderlich für JSX

// Destrukturierung der Konfiguration von Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate = ({ to, replace }) => {
  const { route } = useLocation();
  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);
  return null;
};

/**
 * Eine Komponente, die Lokalisierung behandelt und Kinder mit dem entsprechenden Sprachkontext umhüllt.
 * Sie verwaltet die URL-basierte Spracherkennung und -validierung.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Bestimmen der aktuellen Sprache, falls nicht angegeben, wird die Standardsprache verwendet
  const currentLocale = locale ?? defaultLocale;

  // Entfernen des Sprachpräfixes aus dem Pfad, um einen Basis-Pfad zu erstellen
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault true ist, sollte die Standardsprache immer vorangestellt werden.
   */
  if (middleware.prefixDefault) {
    // Validieren der Sprache
    if (!locale || !locales.includes(locale)) {
      // Weiterleitung zur Standardsprache mit dem aktualisierten Pfad
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Ersetzen des aktuellen Verlaufs-Eintrags durch den neuen
        />
      );
    }

    // Umhüllen der Kinder mit dem IntlayerProvider und Festlegen der aktuellen Sprache
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Wenn middleware.prefixDefault false ist, wird die Standardsprache nicht vorangestellt.
     * Stellen Sie sicher, dass die aktuelle Sprache gültig ist und nicht die Standardsprache ist.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Standardsprache ausschließen
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

const RouterContent = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split("/")[1];

  const isLocaleRoute = locales
    .filter((locale) => middleware.prefixDefault || locale !== defaultLocale)
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={!middleware.prefixDefault ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * Eine Router-Komponente, die sprachspezifische Routen einrichtet.
 * Sie verwendet preact-iso, um die Navigation zu verwalten und lokalisierte Komponenten zu rendern.
 */
const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);

module.exports = { LocaleRouter };
```

Dann können Sie die `LocaleRouter`-Komponente in Ihrer Anwendung verwenden:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";
// ... Ihre AppContent-Komponente (definiert in Schritt 5)

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";
// ... Ihre AppContent-Komponente (definiert in Schritt 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");
// ... Ihre AppContent-Komponente (definiert in Schritt 5)

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

Parallel dazu können Sie auch das `intLayerMiddlewarePlugin` verwenden, um serverseitiges Routing zu Ihrer Anwendung hinzuzufügen. Dieses Plugin erkennt automatisch die aktuelle Sprache basierend auf der URL und setzt das entsprechende Sprach-Cookie. Wenn keine Sprache angegeben ist, bestimmt das Plugin die am besten geeignete Sprache basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn keine Sprache erkannt wird, wird zur Standardsprache umgeleitet.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayerPlugin, intLayerMiddlewarePlugin } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayerPlugin, intLayerMiddlewarePlugin } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayerPlugin(), intLayerMiddlewarePlugin()],
});
```

### (Optional) Schritt 8: Ändern der URL, wenn sich die Sprache ändert

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
      const currentFullPath = location.url; // preact-iso stellt die vollständige URL bereit
      // Konstruktion der URL mit der aktualisierten Sprache
      // Beispiel: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // Aktualisierung des URL-Pfads
      route(pathWithLocale, true); // true für Ersetzen
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
              // Programmatische Navigation nach dem Setzen der Sprache wird von onLocaleChange behandelt
            }}
            key={localeItem}
          >
            <span>
              {/* Sprache - z. B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrer eigenen Lokalisierung - z. B. Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache in der aktuellen Lokalisierung - z. B. Francés mit aktueller Sprache auf Locales.SPANISH gesetzt */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Sprache auf Englisch - z. B. French */}
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
import { h } from "preact"; // Für JSX

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
const { h } = require("preact"); // Für JSX

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

> Dokumentationsreferenzen:
>
> - [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md) (API ist ähnlich für `preact-intlayer`)
> - [`getLocaleName` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getHTMLTextDir.md)
> - [`hreflang` Attribut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` Attribut](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

Unten ist der aktualisierte **Schritt 9** mit zusätzlichen Erklärungen und verfeinerten Codebeispielen:

---

### (Optional) Schritt 9: Ändern der HTML-Sprach- und Richtungsattribute

Wenn Ihre Anwendung mehrere Sprachen unterstützt, ist es wichtig, die `lang`- und `dir`-Attribute des `<html>`-Tags an die aktuelle Sprache anzupassen. Dies stellt sicher:

- **Barrierefreiheit**: Screenreader und unterstützende Technologien verlassen sich auf das korrekte `lang`-Attribut, um Inhalte genau auszusprechen und zu interpretieren.
- **Textdarstellung**: Das `dir`-Attribut (Richtung) stellt sicher, dass der Text in der richtigen Reihenfolge gerendert wird (z. B. von links nach rechts für Englisch, von rechts nach links für Arabisch oder Hebräisch), was für die Lesbarkeit entscheidend ist.
- **SEO**: Suchmaschinen verwenden das `lang`-Attribut, um die Sprache Ihrer Seite zu bestimmen und die richtigen lokalisierten Inhalte in den Suchergebnissen bereitzustellen.

Durch die dynamische Aktualisierung dieser Attribute bei Sprachänderungen gewährleisten Sie eine konsistente und zugängliche Benutzererfahrung für alle unterstützten Sprachen.

#### Implementierung des Hooks

Erstellen Sie einen benutzerdefinierten Hook, um die HTML-Attribute zu verwalten. Der Hook hört auf Sprachänderungen und aktualisiert die Attribute entsprechend:

import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/\*\*

- Aktualisiert die `lang`- und `dir`-Attribute des HTML-<html>-Elements basierend auf der aktuellen Spracheinstellung.
- - `lang`: Informiert Browser und Suchmaschinen über die Sprache der Seite.
- - `dir`: Stellt die korrekte Leserichtung sicher (z. B. 'ltr' für Englisch, 'rtl' für Arabisch).
-
- Diese dynamische Aktualisierung ist essenziell für eine korrekte Textdarstellung, Barrierefreiheit und SEO.
  \*/
  export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

useEffect(() => {
// Aktualisiert das Sprachattribut auf die aktuelle Spracheinstellung.
document.documentElement.lang = locale;

    // Setzt die Leserichtung basierend auf der aktuellen Spracheinstellung.
    document.documentElement.dir = getHTMLTextDir(locale);

}, [locale]);
};

````

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aktualisiert die `lang`- und `dir`-Attribute des HTML-<html>-Elements basierend auf der aktuellen Spracheinstellung.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
````

```jsx fileName="src/hooks/useI18nHTMLAttributes.cjsx" codeFormat="commonjs"
const { useEffect } = require("preact/hooks");
const { useLocale } = require("preact-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Aktualisiert die `lang`- und `dir`-Attribute des HTML-<html>-Elements basierend auf der aktuellen Spracheinstellung.
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

#### Verwendung des Hooks in Ihrer Anwendung

Integrieren Sie den Hook in Ihre Hauptkomponente, damit die HTML-Attribute aktualisiert werden, sobald sich die Spracheinstellung ändert:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer ist bereits importiert, falls AppContent es benötigt
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// AppContent-Definition aus Schritt 5

const AppWithHooks: FunctionalComponent = () => {
  // Wendet den Hook an, um die `lang`- und `dir`-Attribute des <html>-Tags basierend auf der Spracheinstellung zu aktualisieren.
  useI18nHTMLAttributes();

  // Angenommen, AppContent ist Ihre Hauptanzeigekomponente aus Schritt 5
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
// AppContent-Definition aus Schritt 5

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
// AppContent-Definition aus Schritt 5

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

Durch die Anwendung dieser Änderungen wird Ihre Anwendung:

- Sicherstellen, dass das **Sprachattribut** (`lang`) die aktuelle Spracheinstellung korrekt widerspiegelt, was für SEO und das Verhalten des Browsers wichtig ist.
- Die **Leserichtung** (`dir`) entsprechend der Spracheinstellung anpassen, um die Lesbarkeit und Benutzerfreundlichkeit für Sprachen mit unterschiedlichen Leserichtungen zu verbessern.
- Eine **barrierefreie** Erfahrung bieten, da unterstützende Technologien auf diese Attribute angewiesen sind, um optimal zu funktionieren.

### (Optional) Schritt 10: Erstellen einer lokalisierten Link-Komponente

Um sicherzustellen, dass die Navigation Ihrer Anwendung die aktuelle Spracheinstellung berücksichtigt, können Sie eine benutzerdefinierte `Link`-Komponente erstellen. Diese Komponente fügt automatisch die aktuelle Sprache als Präfix zu internen URLs hinzu.

Dieses Verhalten ist aus mehreren Gründen nützlich:

- **SEO und Benutzererfahrung**: Lokalisierte URLs helfen Suchmaschinen, sprachspezifische Seiten korrekt zu indexieren, und bieten Benutzern Inhalte in ihrer bevorzugten Sprache.
- **Konsistenz**: Durch die Verwendung eines lokalisierten Links in Ihrer gesamten Anwendung stellen Sie sicher, dass die Navigation innerhalb der aktuellen Spracheinstellung bleibt und unerwartete Sprachwechsel vermieden werden.
- **Wartbarkeit**: Die Zentralisierung der Lokalisierungslogik in einer einzigen Komponente vereinfacht die Verwaltung von URLs.

Für Preact mit `preact-iso` werden normalerweise Standard-`<a>`-Tags für die Navigation verwendet, und `preact-iso` übernimmt das Routing. Wenn Sie eine programmatische Navigation beim Klicken benötigen (z. B. um Aktionen vor der Navigation auszuführen), können Sie die `route`-Funktion von `useLocation` verwenden. So können Sie eine benutzerdefinierte Ankerkomponente erstellen, die URLs lokalisiert:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // Angenommen, useLocation und route können von preact-iso über preact-intlayer re-exportiert werden, oder direkt importieren
// Falls nicht re-exportiert, direkt importieren: import { useLocation, route } from "preact-iso";
import type { JSX } from "preact"; // Für HTMLAttributes
import { forwardRef } from "preact/compat"; // Für das Weiterleiten von Refs

export interface LocalizedLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean; // Optional: um den Verlauf zu ersetzen
}

/**
 * Hilfsfunktion, um zu überprüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Spracheinstellung anpasst.
 * Für interne Links verwendet sie `getLocalizedUrl`, um die URL mit der Sprache zu präfixen (z. B. /de/about).
 * Dies stellt sicher, dass die Navigation im gleichen Sprachkontext bleibt.
 * Sie verwendet ein Standard-<a>-Tag, kann jedoch die clientseitige Navigation mit der `route`-Funktion von preact-iso auslösen.
 */
export const LocalizedLink = forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale();
    const location = useLocation(); // von preact-iso
    const isExternalLink = checkIsExternalLink(href);

    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    const handleClick = (event: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(event);
      }
      if (
        !isExternalLink &&
        href && // Sicherstellen, dass href definiert ist
        event.button === 0 && // Linksklick
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey && // Standard-Modifikatoren prüfen
        !props.target // Kein Ziel für neuen Tab/Fenster
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          // Nur navigieren, wenn die URL unterschiedlich ist
          route(hrefI18n, replace); // Verwenden von preact-iso's route
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

import { useLocation, route } from "preact-iso"; // Import aus preact-iso
import { forwardRef } from "preact/compat";
import { h } from "preact"; // Für JSX

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
const { useLocation, route } = require("preact-iso"); // Import aus preact-iso
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // Für JSX

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

#### Wie es funktioniert

- **Erkennung externer Links**:  
  Die Hilfsfunktion `checkIsExternalLink` bestimmt, ob eine URL extern ist. Externe Links bleiben unverändert.
- **Abrufen der aktuellen Spracheinstellung**:  
  Der Hook `useLocale` liefert die aktuelle Spracheinstellung.
- **Lokalisierung der URL**:  
  Für interne Links fügt `getLocalizedUrl` die aktuelle Spracheinstellung als Präfix zur URL hinzu.
- **Client-seitige Navigation**:  
  Die Funktion `handleClick` prüft, ob es sich um einen internen Link handelt und ob die Standardnavigation verhindert werden soll. Falls ja, wird die `route`-Funktion von `preact-iso` (über `useLocation` oder direkt importiert) verwendet, um eine client-seitige Navigation durchzuführen. Dies ermöglicht ein SPA-ähnliches Verhalten ohne vollständige Seitenneuladen.
- **Rückgabe des Links**:  
  Die Komponente gibt ein `<a>`-Element mit der lokalisierten URL und dem benutzerdefinierten Klick-Handler zurück.

### TypeScript konfigurieren

Intlayer verwendet Modulerweiterung, um die Vorteile von TypeScript zu nutzen und Ihren Code robuster zu machen.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Stellen Sie sicher, dass Ihre TypeScript-Konfiguration die automatisch generierten Typen enthält.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Empfohlen für Preact 10+
    // ...
  },
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Einbeziehen der automatisch generierten Typen
  ],
}
```

> Stellen Sie sicher, dass Ihre `tsconfig.json` für Preact eingerichtet ist, insbesondere `jsx` und `jsxImportSource` oder `jsxFactory`/`jsxFragmentFactory` für ältere Preact-Versionen, falls Sie nicht die Standardwerte von `preset-vite` verwenden.

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch vermeiden Sie, diese in Ihr Git-Repository einzufügen.

Fügen Sie dazu die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzu:

```plaintext
# Ignorieren der von Intlayer generierten Dateien
.intlayer
```

### VS Code-Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code-Erweiterung** installieren.

[Installieren Sie sie aus dem VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** von übersetzten Inhalten.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Details zur Verwendung der Erweiterung finden Sie in der [Intlayer VS Code-Erweiterungsdokumentation](https://intlayer.org/doc/vs-code-extension).

---

### Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.
