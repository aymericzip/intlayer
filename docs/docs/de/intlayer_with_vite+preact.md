---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Wie Sie Ihre Vite and Preact übersetzen – i18n-Leitfaden 2025
description: Entdecken Sie, wie Sie Ihre Vite- und Preact-Website mehrsprachig gestalten. Folgen Sie der Dokumentation, um sie zu internationalisieren (i18n) und zu übersetzen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Vite
  - Preact
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-preact
applicationTemplate: https://github.com/aymericzip/intlayer-vite-preact-template
---

# Übersetzen Sie Ihre Vite and Preact mit Intlayer | Internationalisierung (i18n)

> Dieses Paket befindet sich in der Entwicklung. Weitere Informationen finden Sie im [Issue](https://github.com/aymericzip/intlayer/issues/118). Zeigen Sie Ihr Interesse an Intlayer für Preact, indem Sie das Issue liken.

Siehe [Anwendungsvorlage](https://github.com/aymericzip/intlayer-vite-preact-template) auf GitHub.

## Was ist Intlayer?

**Intlayer** ist eine innovative, Open-Source-Internationalisierungsbibliothek (i18n), die entwickelt wurde, um die mehrsprachige Unterstützung in modernen Webanwendungen zu vereinfachen.

Mit Intlayer können Sie:

- **Übersetzungen einfach verwalten** mit deklarativen Wörterbüchern auf Komponentenebene.
- **Metadaten, Routen und Inhalte dynamisch lokalisieren**.
- **TypeScript-Unterstützung sicherstellen** mit automatisch generierten Typen, die die Autovervollständigung und Fehlererkennung verbessern.
- **Profitieren Sie von erweiterten Funktionen**, wie dynamischer Spracherkennung und Umschaltung.

---

## Schritt-für-Schritt-Anleitung zur Einrichtung von Intlayer in einer Vite- und Preact-Anwendung

### Schritt 1: Abhängigkeiten installieren

Installieren Sie die notwendigen Pakete mit npm:

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

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) bereitstellt.

- **preact-intlayer**
  Das Paket, das Intlayer in Preact-Anwendungen integriert. Es stellt Kontextanbieter und Hooks für die Internationalisierung in Preact bereit.

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

> Durch diese Konfigurationsdatei können Sie lokalisierte URLs, Middleware-Weiterleitungen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Logs in der Konsole deaktivieren und vieles mehr. Für eine vollständige Liste der verfügbaren Parameter verweisen wir auf die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### Schritt 3: Integrieren Sie Intlayer in Ihre Vite-Konfiguration

Fügen Sie das Intlayer-Plugin in Ihre Konfiguration ein.

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

> Das `intlayer()` Vite-Plugin wird verwendet, um Intlayer mit Vite zu integrieren. Es sorgt für den Aufbau von Inhaltsdeklarationsdateien und überwacht diese im Entwicklungsmodus. Es definiert Intlayer-Umgebungsvariablen innerhalb der Vite-Anwendung. Zusätzlich stellt es Aliase bereit, um die Leistung zu optimieren.

### Schritt 4: Deklarieren Sie Ihren Inhalt

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

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
          Bearbeiten Sie <code>src/app.tsx</code> und speichern Sie, um HMR zu
          testen
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
// import { h } from 'preact'; // Wird benötigt, wenn Sie JSX direkt in .mjs verwenden

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
      en: "Bearbeiten Sie src/app.jsx und speichern Sie, um HMR zu testen",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Bearbeite src/app.jsx und speichere, um HMR zu testen",
    }),

    readTheDocs: t({
      en: "Klicke auf die Vite- und Preact-Logos, um mehr zu erfahren",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // Wird benötigt, wenn Sie JSX direkt in .cjs verwenden

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite-Logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact-Logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
      de: "Zähler ist ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
      de: "Bearbeiten Sie src/app.tsx und speichern Sie, um HMR zu testen",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
      de: "Klicken Sie auf die Vite- und Preact-Logos, um mehr zu erfahren",
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
        "de": "Vite-Logo"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact",
        "de": "Preact-Logo"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact",
        "de": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "de": "Zähler ist "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR",
        "de": "Bearbeiten Sie src/app.tsx und speichern Sie, um HMR zu testen"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información",
        "de": "Klicken Sie auf die Vite- und Preact-Logos, um mehr zu erfahren"
      }
    }
  }
}
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sobald sie in das Verzeichnis `contentDir` aufgenommen sind (standardmäßig `./src`). Und sie müssen der Dateierweiterung für Inhaltsdeklarationen entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Für weitere Details siehe die [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md).

> Wenn Ihre Inhaltsdatei TSX-Code enthält, müssen Sie möglicherweise `import { h } from "preact";` importieren oder sicherstellen, dass Ihr JSX-Pragma korrekt für Preact gesetzt ist.

### Schritt 5: Nutzen Sie Intlayer in Ihrem Code

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

> Wenn Sie Ihren Inhalt in einem `string`-Attribut verwenden möchten, wie z.B. `alt`, `title`, `href`, `aria-label` usw., müssen Sie den Wert der Funktion aufrufen, zum Beispiel:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Hinweis: In Preact wird `className` typischerweise als `class` geschrieben.

> Um mehr über den `useIntlayer` Hook zu erfahren, lesen Sie die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md) (Die API ist ähnlich für `preact-intlayer`).

### (Optional) Schritt 6: Ändern Sie die Sprache Ihres Inhalts

Um die Sprache Ihres Inhalts zu ändern, können Sie die Funktion `setLocale` verwenden, die vom `useLocale` Hook bereitgestellt wird. Diese Funktion ermöglicht es Ihnen, die Locale der Anwendung festzulegen und den Inhalt entsprechend zu aktualisieren.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Sprache auf Englisch ändern
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
      Sprache auf Englisch ändern
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
      Sprache auf Englisch ändern
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> Um mehr über den `useLocale` Hook zu erfahren, siehe die [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md) (Die API ist ähnlich für `preact-intlayer`).

### (Optional) Schritt 7: Lokalisierte Routen zu Ihrer Anwendung hinzufügen

Zweck dieses Schrittes ist es, für jede Sprache eindeutige Routen zu erstellen. Dies ist nützlich für SEO und SEO-freundliche URLs.
Beispiel:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Standardmäßig sind die Routen für die Standardsprache nicht mit einem Präfix versehen. Wenn Sie die Standardsprache mit einem Präfix versehen möchten, können Sie in Ihrer Konfiguration die Option `middleware.prefixDefault` auf `true` setzen. Weitere Informationen finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

Um lokalisierte Routen in Ihre Anwendung hinzuzufügen, können Sie eine `LocaleRouter`-Komponente erstellen, die die Routen Ihrer Anwendung umschließt und die sprachabhängige Navigation verwaltet. Hier ist ein Beispiel unter Verwendung von [preact-iso](https://github.com/preactjs/preact-iso):

Zuerst installieren Sie `preact-iso`:

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
/**
 * Eine Komponente, die die Lokalisierung verwaltet und die Kinder mit dem entsprechenden Locale-Kontext umschließt.
 * Sie verwaltet die auf der URL basierende Lokalerkennung und -validierung.
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

  // Bestimmt das aktuelle Locale, standardmäßig wird das Standard-Locale verwendet, wenn keines angegeben ist
  const currentLocale = locale ?? defaultLocale;

  // Entfernt das Locale-Präfix aus dem Pfad, um einen Basis-Pfad zu erstellen
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault wahr ist, sollte die Standardsprache immer vorangestellt werden.
   */
  if (middleware.prefixDefault) {
    // Überprüfe die Sprache
    if (!locale || !locales.includes(locale)) {
      // Weiterleitung zur Standardsprache mit dem aktualisierten Pfad
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Ersetzt den aktuellen Eintrag im Verlauf durch den neuen
        />
      );
    }

    // Umschließe die Kinder mit dem IntlayerProvider und setze die aktuelle Sprache
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Wenn middleware.prefixDefault falsch ist, wird die Standardsprache nicht vorangestellt.
     * Stellen Sie sicher, dass die aktuelle Locale gültig ist und nicht die Standard-Locale.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Standard-Locale ausschließen
        )
        .includes(currentLocale) // Prüfen, ob die aktuelle Locale in der Liste der gültigen Locales ist
    ) {
      // Weiterleitung zum Pfad ohne Locale-Präfix
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Kinder mit dem IntlayerProvider umschließen und die aktuelle Locale setzen
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
 * Eine Router-Komponente, die lokalisierungsspezifische Routen einrichtet.
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
 * Eine Komponente, die die Lokalisierung verwaltet und die Kinder mit dem entsprechenden Sprachkontext umschließt.
 * Sie verwaltet die sprachbasierte Erkennung und Validierung der URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Bestimmt die aktuelle Sprache, standardmäßig wird die Standardsprache verwendet, falls keine angegeben ist
  const currentLocale = locale ?? defaultLocale;

  // Entfernt das Sprachpräfix aus dem Pfad, um einen Basis-Pfad zu erstellen
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault true ist, sollte die Standardsprache immer als Präfix verwendet werden.
   */
  if (middleware.prefixDefault) {
    // Überprüfen der Locale
    if (!locale || !locales.includes(locale)) {
      // Weiterleitung zur Standard-Locale mit dem aktualisierten Pfad
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Ersetzt den aktuellen Eintrag im Verlauf durch den neuen
        />
      );
    }

    // Umschließen der Kinder mit dem IntlayerProvider und Setzen der aktuellen Locale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Wenn middleware.prefixDefault false ist, wird die Standard-Locale nicht vorangestellt.
     * Sicherstellen, dass die aktuelle Locale gültig ist und nicht die Standard-Locale ist.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Schließe die Standardsprache aus
        )
        .includes(currentLocale) // Prüfe, ob die aktuelle Sprache in der Liste der gültigen Sprachen enthalten ist
    ) {
      // Weiterleitung zum Pfad ohne Sprachpräfix
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Umschließe die Kinder mit dem IntlayerProvider und setze die aktuelle Sprache
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
 * Eine Router-Komponente, die lokalisierungsspezifische Routen einrichtet.
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
 * Eine Komponente, die die Lokalisierung verwaltet und Kinder mit dem entsprechenden Locale-Kontext umschließt.
 * Sie verwaltet die URL-basierte Lokalerkennung und -validierung.
 */
const AppLocalized = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Bestimmen der aktuellen Sprache, Standardwert verwenden, falls nicht angegeben
  const currentLocale = locale ?? defaultLocale;

  // Entfernen des Sprachpräfixes aus dem Pfad, um einen Basis-Pfad zu erstellen
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Aktueller URL-Pfad
  );

  /**
   * Wenn middleware.prefixDefault true ist, sollte die Standardsprache immer als Präfix verwendet werden.
   */
  if (middleware.prefixDefault) {
    // Validierung der Sprache
    if (!locale || !locales.includes(locale)) {
      // Weiterleitung zur Standardsprache mit aktualisiertem Pfad
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Ersetzt den aktuellen Eintrag im Verlauf durch den neuen
        />
      );
    }

    // Umschließt die Kinder mit dem IntlayerProvider und setzt die aktuelle Locale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Wenn middleware.prefixDefault false ist, wird die Standard-Locale nicht vorangestellt.
     * Stelle sicher, dass die aktuelle Locale gültig ist und nicht die Standard-Locale.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Schließt die Standard-Locale aus
        )
        .includes(currentLocale) // Überprüfen, ob die aktuelle Locale in der Liste der gültigen Locales enthalten ist
    ) {
      // Weiterleitung zum Pfad ohne Locale-Präfix
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Kinder mit dem IntlayerProvider umschließen und die aktuelle Locale setzen
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
 * Eine Router-Komponente, die lokalisierungsspezifische Routen einrichtet.
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
tsx fileName="src/app.tsx" codeFormat="typescript"
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

Parallel dazu können Sie auch das `intlayerMiddleware` verwenden, um serverseitiges Routing zu Ihrer Anwendung hinzuzufügen. Dieses Plugin erkennt automatisch die aktuelle Locale basierend auf der URL und setzt das entsprechende Locale-Cookie. Wenn keine Locale angegeben ist, bestimmt das Plugin die am besten geeignete Locale basierend auf den Spracheinstellungen des Browsers des Benutzers. Wenn keine Locale erkannt wird, erfolgt eine Weiterleitung zur Standard-Locale.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer(), intlayerMiddleware()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer, intlayerMiddleware } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer(), intlayerMiddleware()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer, intlayerMiddleware } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayer(), intlayerMiddleware()],
});
```

### (Optional) Schritt 8: Ändern der URL, wenn sich die Sprache ändert

Um die URL zu ändern, wenn sich die Sprache ändert, können Sie die `onLocaleChange`-Eigenschaft verwenden, die vom `useLocale`-Hook bereitgestellt wird. Parallel dazu können Sie `useLocation` und `route` von `preact-iso` verwenden, um den URL-Pfad zu aktualisieren.

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
      const currentFullPath = location.url; // preact-iso liefert die vollständige URL
      // Erstellen Sie die URL mit der aktualisierten Locale
      // Beispiel: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(currentFullPath, newLocale);

      // Aktualisieren Sie den URL-Pfad
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
              // Programmatische Navigation nach dem Setzen der Sprache wird von onLocaleChange übernommen
            }}
            key={localeItem}
          >
            <span>
              {/* Gebietsschema - z.B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrem eigenen Gebietsschema - z.B. Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache im aktuellen Gebietsschema - z.B. Francés, wenn das aktuelle Gebietsschema auf Locales.SPANISH gesetzt ist */}
              {getLocaleName(localeItem, locale)}
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

> Dokumentationsverweise:
>
> > - [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md) (API ist ähnlich für `preact-intlayer`)
>
> - [`getLocaleName` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getHTMLTextDir.md)
> - [`hreflang` Attribut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=de)
> - [`lang` Attribut](https://developer.mozilla.org/de/docs/Web/HTML/Global_attributes/lang)
> - [`dir` Attribut](https://developer.mozilla.org/de/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` Attribut](https://developer.mozilla.org/de/docs/Web/Accessibility/ARIA/Attributes/aria-current)
> - [Popover API](https://developer.mozilla.org/de/docs/Web/API/Popover_API) la.org/en-US/docs/Web/HTML/Global_attributes/dir)> - [`aria-current` Attribut](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

Unten finden Sie den aktualisierten **Schritt 9** mit zusätzlichen Erklärungen und verfeinerten Codebeispielen:

---

### (Optional) Schritt 9: Wechseln der HTML-Sprach- und Richtungsattribute

Wenn Ihre Anwendung mehrere Sprachen unterstützt, ist es entscheidend, die `lang`- und `dir`-Attribute des `<html>`-Tags an die aktuelle Locale anzupassen. Dies stellt sicher:

- **Barrierefreiheit**: Screenreader und unterstützende Technologien verlassen sich auf das korrekte `lang`-Attribut, um Inhalte richtig auszusprechen und zu interpretieren.
- **Textdarstellung**: Das `dir`-Attribut (Richtung) sorgt dafür, dass der Text in der richtigen Reihenfolge dargestellt wird (z. B. von links nach rechts für Englisch, von rechts nach links für Arabisch oder Hebräisch), was für die Lesbarkeit unerlässlich ist.
- **SEO**: Suchmaschinen verwenden das `lang`-Attribut, um die Sprache Ihrer Seite zu bestimmen und so die richtige lokalisierte Version in den Suchergebnissen anzuzeigen.

Indem Sie diese Attribute dynamisch aktualisieren, wenn sich die Locale ändert, gewährleisten Sie eine konsistente und barrierefreie Benutzererfahrung für alle unterstützten Sprachen.

#### Implementierung des Hooks

Erstellen Sie einen benutzerdefinierten Hook, um die HTML-Attribute zu verwalten. Der Hook hört auf Locale-Änderungen und aktualisiert die Attribute entsprechend:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aktualisiert die `lang`- und `dir`-Attribute des HTML-Elements `<html>` basierend auf der aktuellen Locale.
 * - `lang`: Informiert Browser und Suchmaschinen über die Sprache der Seite.
 * - `dir`: Stellt die korrekte Leserichtung sicher (z.B. 'ltr' für Englisch, 'rtl' für Arabisch).
 *
 * Dieses dynamische Update ist essenziell für die korrekte Textdarstellung, Barrierefreiheit und SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aktualisiert das Sprachattribut auf die aktuelle Locale.
    document.documentElement.lang = locale;

    // Setzt die Textrichtung basierend auf der aktuellen Locale.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aktualisiert die `lang`- und `dir`-Attribute des HTML-Elements <html> basierend auf der aktuellen Locale.
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
 * Aktualisiert die `lang`- und `dir`-Attribute des HTML-Elements <html> basierend auf der aktuellen Locale.
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

Integrieren Sie den Hook in Ihre Hauptkomponente, damit die HTML-Attribute aktualisiert werden, sobald sich die Locale ändert:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer bereits importiert, falls AppContent es benötigt
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// AppContent-Definition aus Schritt 5

const AppWithHooks: FunctionalComponent = () => {
  // Wenden Sie den Hook an, um die Attribute lang und dir des <html>-Tags basierend auf der Locale zu aktualisieren.
  useI18nHTMLAttributes();

  // Angenommen, AppContent ist Ihre Hauptkomponentenanzeige aus Schritt 5
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
// Definition von AppContent aus Schritt 5

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

- Sicherstellen, dass das **Sprach-** (`lang`) Attribut die aktuelle Locale korrekt widerspiegelt, was wichtig für SEO und das Verhalten des Browsers ist.
- Die **Schreibrichtung** (`dir`) entsprechend der Locale anpassen, um die Lesbarkeit und Benutzerfreundlichkeit für Sprachen mit unterschiedlichen Leserichtungen zu verbessern.
- Bieten Sie eine zugänglichere Erfahrung, da unterstützende Technologien auf diese Attribute angewiesen sind, um optimal zu funktionieren.

### (Optional) Schritt 10: Erstellen einer lokalisierten Link-Komponente

Um sicherzustellen, dass die Navigation Ihrer Anwendung die aktuelle Sprache berücksichtigt, können Sie eine benutzerdefinierte `Link`-Komponente erstellen. Diese Komponente fügt automatisch das aktuelle Sprachpräfix zu internen URLs hinzu.

Dieses Verhalten ist aus mehreren Gründen nützlich:

- **SEO und Benutzererfahrung**: Lokalisierte URLs helfen Suchmaschinen, sprachspezifische Seiten korrekt zu indexieren, und bieten den Nutzern Inhalte in ihrer bevorzugten Sprache.
- **Konsistenz**: Durch die Verwendung eines lokalisierten Links in der gesamten Anwendung stellen Sie sicher, dass die Navigation innerhalb der aktuellen Sprache bleibt und unerwartete Sprachwechsel vermieden werden.
- **Wartbarkeit**: Die Zentralisierung der Lokalisierungslogik in einer einzigen Komponente vereinfacht die Verwaltung der URLs.

Für Preact mit `preact-iso` werden typischerweise Standard-`<a>`-Tags für die Navigation verwendet, und `preact-iso` übernimmt das Routing. Wenn Sie eine programmatische Navigation bei einem Klick benötigen (z. B. um Aktionen vor der Navigation auszuführen), können Sie die `route`-Funktion aus `useLocation` verwenden. So können Sie eine benutzerdefinierte Anker-Komponente erstellen, die URLs lokalisiert:

```tsx fileName="src/components/LocalizedLink.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale, useLocation, route } from "preact-intlayer"; // Angenommen, useLocation und route können von preact-iso über preact-intlayer bereitgestellt werden, falls re-exportiert, oder direkt importiert werden
// Wenn nicht erneut exportiert, direkt importieren: import { useLocation, route } von "preact-iso";
import type { JSX } from "preact"; // Für HTMLAttributes
import { forwardRef } from "preact/compat"; // Für das Weiterreichen von Refs

export interface LocalizedLinkProps
  extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean; // Optional: um den Verlauf zu ersetzen
}

/**
 * Hilfsfunktion, um zu prüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Locale anpasst.
 * Für interne Links wird `getLocalizedUrl` verwendet, um die URL mit dem Locale-Präfix zu versehen (z. B. /fr/about).
 * Dies stellt sicher, dass die Navigation im gleichen Locale-Kontext bleibt.
 * Es wird ein standardmäßiges <a>-Tag verwendet, das jedoch eine clientseitige Navigation über `route` von preact-iso auslösen kann.
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
        !event.altKey && // Standard-Modifier-Überprüfung
        !props.target // Kein Ziel in einem neuen Tab/Fenster
      ) {
        event.preventDefault();
        if (location.url !== hrefI18n) {
          // Nur navigieren, wenn die URL unterschiedlich ist
          route(hrefI18n, replace); // Verwende preact-iso's route
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
import { useLocation, route } from "preact-iso"; // Importiert von preact-iso
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
const { useLocation, route } = require("preact-iso"); // Importiert von preact-iso
const { forwardRef } = require("preact/compat");
const { h } = require("preact"); // Für JSX

const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

// Überprüft, ob ein Link extern ist
const LocalizedLink = forwardRef(
  ({ href, children, onClick, replace = false, ...props }, ref) => {
    const { locale } = useLocale(); // Aktuelle Sprache abrufen
    const location = useLocation(); // Aktuellen Standort abrufen
    const isExternalLink = checkIsExternalLink(href); // Prüfen, ob Link extern ist

    // Lokalisierte URL generieren, wenn Link intern ist
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

#### Funktionsweise

- **Erkennung externer Links**:  
  Die Hilfsfunktion `checkIsExternalLink` bestimmt, ob eine URL extern ist. Externe Links bleiben unverändert.
- **Abrufen der aktuellen Locale**:  
  Der Hook `useLocale` liefert die aktuelle Locale.
- **Lokalisierung der URL**:  
  Für interne Links fügt `getLocalizedUrl` der URL das aktuelle Locale-Präfix hinzu.
- **Client-seitige Navigation**:
  Die Funktion `handleClick` prüft, ob es sich um einen internen Link handelt und ob die Standardnavigation verhindert werden soll. Falls ja, verwendet sie die `route`-Funktion von `preact-iso` (erhalten über `useLocation` oder direkt importiert), um eine clientseitige Navigation durchzuführen. Dies ermöglicht ein SPA-ähnliches Verhalten ohne vollständiges Neuladen der Seite.
- **Rückgabe des Links**:  
  Die Komponente gibt ein `<a>`-Element mit der lokalisierten URL und dem benutzerdefinierten Klick-Handler zurück.

### TypeScript konfigurieren

Intlayer verwendet Module Augmentation, um die Vorteile von TypeScript zu nutzen und Ihren Code robuster zu machen.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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
    ".intlayer/**/*.ts", // Einschluss der automatisch generierten Typen
  ],
}
```

> Stellen Sie sicher, dass Ihre `tsconfig.json` für Preact eingerichtet ist, insbesondere `jsx` und `jsxImportSource` oder `jsxFactory`/`jsxFragmentFactory` für ältere Preact-Versionen, falls Sie nicht die Standardwerte von `preset-vite` verwenden.

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. So vermeiden Sie, diese versehentlich in Ihr Git-Repository zu committen.

Um dies zu tun, können Sie die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzufügen:

```plaintext
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Im VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Für weitere Details zur Nutzung der Erweiterung lesen Sie bitte die [Intlayer VS Code Erweiterungsdokumentation](https://intlayer.org/doc/vs-code-extension).

---

### Weiterführende Schritte

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mit dem [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.

---

## Dokumentationsverlauf

- 5.5.10 - 2025-06-29: Historie initialisiert
