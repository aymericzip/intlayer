---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Vite + Preact i18n - Wie Sie eine Preact App übersetzen in 2026
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
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Init-Befehl hinzufügen
  - version: 5.5.10
    date: 2025-06-29
    changes: Historie initialisiert
---

# Übersetzen Sie Ihre Vite and Preact mit Intlayer | Internationalisierung (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Preact? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-preact-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

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
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer preact-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  Das Kernpaket, das Internationalisierungswerkzeuge für Konfigurationsmanagement, Übersetzung, [Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md), Transpilierung und [CLI-Befehle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md) bereitstellt.

- **preact-intlayer**
  Das Paket, das Intlayer in Preact-Anwendungen integriert. Es stellt Kontextanbieter und Hooks für die Internationalisierung in Preact bereit.

- **vite-intlayer**
  Enthält das Vite-Plugin zur Integration von Intlayer mit dem [Vite-Bundler](https://vite.dev/guide/why.html#why-bundle-for-production), sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, Verwaltung von Cookies und Handhabung von URL-Weiterleitungen.

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
  routing: {
    mode: "prefix-no-default", // Standard: Präfix für alle Locales außer der Standard-Locale
    storage: ["cookie", "header"], // Standard: Locale in Cookie speichern und aus Header erkennen
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
  routing: {
    mode: "prefix-no-default", // Standard: Präfix für alle Locales außer der Standard-Locale
    storage: ["cookie", "header"], // Standard: Locale in Cookie speichern und aus Header erkennen
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
  routing: {
    mode: "prefix-no-default", // Standard: Präfix für alle Locales außer der Standard-Locale
    storage: ["cookie", "header"], // Standard: Locale in Cookie speichern und aus Header erkennen
  },
};

module.exports = config;
```

> Durch diese Konfigurationsdatei können Sie lokalisierte URLs, Routing-Modi, Speicheroptionen, Cookie-Namen, den Speicherort und die Erweiterung Ihrer Inhaltsdeklarationen einrichten, Intlayer-Logs in der Konsole deaktivieren und vieles mehr. Für eine vollständige Liste der verfügbaren Parameter verweisen wir auf die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

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
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
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
// const { h } = require('preact'); // Wird benötigt, wenn Sie JSX direkt in .cjs verwenden

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
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite et Preact pour en savoir plus",
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
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact"
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
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sobald sie in das Verzeichnis `contentDir` aufgenommen sind (standardmäßig `./src`). Und sie müssen der Dateierweiterung für Inhaltsdeklarationen entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

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
      {/* Markdown-Inhalt */}
      <div>{content.myMarkdownContent}</div>

      {/* HTML-Inhalt */}
      <div>{content.myHtmlContent}</div>

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

> Wenn Ihre App bereits existiert, können Sie den [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/compiler.md) sowie den [Extraktionsbefehl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/extract.md) verwenden, um Tausende von Komponenten in einer Sekunde zu transformieren.

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

> Standardmäßig sind die Routen für die Standardsprache nicht mit einem Präfix versehen. Wenn Sie die Standardsprache mit einem Präfix versehen möchten, können Sie die Option `routing.mode` in Ihrer Konfiguration auf `"prefix-all"` setzen. Weitere Informationen finden Sie in der [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

Um lokalisierte Routen zu Ihrer Anwendung hinzuzufügen, können Sie eine `LocaleRouter`-Komponente erstellen, die die Routen Ihrer Anwendung umschließt und das sprachbasierte Routing verwaltet. Hier ist ein Beispiel unter Verwendung von [preact-iso](https://github.com/preactjs/preact-iso):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";
import type { ComponentChildren, FunctionalComponent } from "preact";

/**
 * Eine Router-Komponente, die lokalisierungsspezifische Routen einrichtet.
 * Sie verwendet preact-iso, um die Navigation zu verwalten und lokalisierte Komponenten zu rendern.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";

/**
 * Eine Router-Komponente, die lokalisierungsspezifische Routen einrichtet.
 * Sie verwendet preact-iso, um die Navigation zu verwalten und lokalisierte Komponenten zu rendern.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
const { localeMap } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, Router, Route } = require("preact-iso");

/**
 * Eine Router-Komponente, die lokalisierungsspezifische Routen einrichtet.
 * Sie verwendet preact-iso, um die Navigation zu verwalten und lokalisierte Komponenten zu rendern.
 */
const LocaleRouter = ({ children }) =>
  h(
    LocationProvider,
    {},
    h(
      Router,
      {},
      localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) =>
          h(Route, {
            key: locale,
            path: `${urlPrefix}/:rest*`,
            component: () => h(IntlayerProvider, { locale }, children),
          })
        )
    )
  );

module.exports = { LocaleRouter };
```

Dann können Sie die `LocaleRouter`-Komponente in Ihrer Anwendung verwenden:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";

// ... Ihre AppContent-Komponente

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... Ihre AppContent-Komponente

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... Ihre AppContent-Komponente

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

### (Optional) Schritt 8: Ändern der URL, wenn sich die Sprache ändert

Um die URL zu ändern, wenn sich die Sprache ändert, können Sie die `onLocaleChange`-Eigenschaft verwenden, die vom `useLocale`-Hook bereitgestellt wird. Parallel dazu können Sie die `route`-Methode von `useLocation` von `preact-iso` verwenden, um den URL-Pfad zu aktualisieren.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      // Erstellen Sie die URL mit der aktualisierten Locale
      // Beispiel: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(url, newLocale);

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
            href={getLocalizedUrl(url, localeItem)}
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
              {/* Locale - z.B. FR */}
              {localeItem}
            </span>
            <span>
              {/* Sprache in ihrem eigenen Locale - z.B. Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Sprache im aktuellen Locale - z.B. Francés, wenn das aktuelle Locale auf Locales.SPANISH gesetzt ist */}
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
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
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
const { useLocation } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return h(
    "div",
    {},
    h("button", { popovertarget: "localePopover" }, getLocaleName(locale)),
    h(
      "div",
      { id: "localePopover", popover: "auto" },
      availableLocales.map((localeItem) =>
        h(
          "a",
          {
            href: getLocalizedUrl(url, localeItem),
            hreflang: localeItem,
            "aria-current": locale === localeItem ? "page" : undefined,
            onClick: (e) => {
              e.preventDefault();
              setLocale(localeItem);
            },
            key: localeItem,
          },
          h("span", {}, localeItem),
          h("span", {}, getLocaleName(localeItem, localeItem)),
          h(
            "span",
            { dir: getHTMLTextDir(localeItem), lang: localeItem },
            getLocaleName(localeItem, locale)
          ),
          h(
            "span",
            { dir: "ltr", lang: Locales.ENGLISH },
            getLocaleName(localeItem, Locales.ENGLISH)
          )
        )
      )
    )
  );
};

module.exports = LocaleSwitcher;
```

> Dokumentationsverweise:
>
> > - [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useLocale.md) (API ist ähnlich für `preact-intlayer`)> - [`getLocaleName` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocaleName.md)> - [`getLocalizedUrl` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md)> - [`getHTMLTextDir` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getHTMLTextDir.md)> - [`hreflang` Attribut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=de)> - [`lang` Attribut](https://developer.mozilla.org/de/docs/Web/HTML/Global_attributes/lang)> - [`dir` Attribut](https://developer.mozilla.org/de/docs/Web/HTML/Global_attributes/dir)> - [`aria-current` Attribut](https://developer.mozilla.org/de/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/de/docs/Web/API/Popover_API)

### (Optional) Schritt 9: Wechseln der HTML-Sprach- und Richtungsattribute

Wenn Ihre Anwendung mehrere Sprachen unterstützt, ist es entscheidend, die `lang`- und `dir`-Attribute des `<html>`-Tags an die aktuelle Sprache anzupassen. Dies stellt sicher:

- **Barrierefreiheit**: Screenreader und unterstützende Technologien verlassen sich auf das korrekte `lang`-Attribut, um Inhalte richtig auszusprechen und zu interpretieren.
- **Textdarstellung**: Das `dir`-Attribut (Richtung) sorgt dafür, dass der Text in der richtigen Reihenfolge dargestellt wird (z. B. von links nach rechts für Englisch, von rechts nach links für Arabisch oder Hebräisch), was für die Lesbarkeit unerlässlich ist.
- **SEO**: Suchmaschinen verwenden das `lang`-Attribut, um die Sprache Ihrer Seite zu bestimmen und so die richtige lokalisierte Version in den Suchergebnissen anzuzeigen.

Indem Sie diese Attribute dynamisch aktualisieren, wenn sich die Sprache ändert, gewährleisten Sie eine konsistente und barrierefreie Benutzererfahrung für alle unterstützten Sprachen.

#### Implementierung des Hooks

Erstellen Sie einen benutzerdefinierten Hook, um die HTML-Attribute zu verwalten. Der Hook hört auf Sprachänderungen und aktualisiert die Attribute entsprechend:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aktualisiert die `lang`- und `dir`-Attribute des HTML-Elements `<html>` basierend auf der aktuellen Sprache.
 * - `lang`: Informiert Browser und Suchmaschinen über die Sprache der Seite.
 * - `dir`: Stellt die korrekte Leserichtung sicher (z.B. 'ltr' für Englisch, 'rtl' für Arabisch).
 *
 * Dieses dynamische Update ist essenziell für die korrekte Textdarstellung, Barrierefreiheit und SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Aktualisiert das Sprachattribut auf die aktuelle Sprache.
    document.documentElement.lang = locale;

    // Setzt die Textrichtung basierend auf der aktuellen Sprache.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Aktualisiert die `lang`- und `dir`-Attribute des HTML-Elements <html> basierend auf der aktuellen Sprache.
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
 * Aktualisiert die `lang`- und `dir`-Attribute des HTML-Elements <html> basierend auf der aktuellen Sprache.
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

Integrieren Sie den Hook in Ihre Hauptkomponente, damit die HTML-Attribute aktualisiert werden, sobald sich die Sprache ändert:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer bereits importiert, falls AppContent es benötigt
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// AppContent-Definition aus Schritt 5

const AppWithHooks: FunctionalComponent = () => {
  // Wenden Sie den Hook an, um die Attribute lang und dir des <html>-Tags basierend auf der Sprache zu aktualisieren.
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

### (Optional) Schritt 10: Erstellen einer lokalisierten Link-Komponente

Um sicherzustellen, dass die Navigation Ihrer Anwendung die aktuelle Sprache berücksichtigt, können Sie eine benutzerdefinierte `Link`-Komponente erstellen. Diese Komponente fügt automatisch das aktuelle Sprachpräfix zu internen URLs hinzu.

Dieses Verhalten ist aus mehreren Gründen nützlich:

- **SEO und Benutzererfahrung**: Lokalisierte URLs helfen Suchmaschinen, sprachspezifische Seiten korrekt zu indexieren, und bieten den Nutzern Inhalte in ihrer bevorzugten Sprache.
- **Konsistenz**: Durch die Verwendung eines lokalisierten Links in der gesamten Anwendung stellen Sie sicher, dass die Navigation innerhalb der aktuellen Sprache bleibt und unerwartete Sprachwechsel vermieden werden.
- **Wartbarkeit**: Die Zentralisierung der Lokalisierungslogik in einer einzigen Komponente vereinfacht die Verwaltung der URLs.

Hier ist die Implementierung einer lokalisierten `Link`-Komponente in Preact:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * Hilfsfunktion, um zu prüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Sprache anpasst.
 * Für interne Links wird `getLocalizedUrl` verwendet, um die URL mit dem Sprachpräfix zu versehen (z. B. /fr/about).
 * Dies stellt sicher, dass die Navigation im gleichen Sprachkontext bleibt.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Wenn der Link intern ist und ein gültiges href angegeben wurde, rufen Sie die lokalisierte URL ab.
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

```jsx fileName="src/components/Link.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";

/**
 * Hilfsfunktion, um zu prüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Sprache anpasst.
 * Für interne Links wird `getLocalizedUrl` verwendet, um die URL mit dem Sprachpräfix zu versehen (z. B. /fr/about).
 * Dies stellt sicher, dass die Navigation im gleichen Sprachkontext bleibt.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Wenn der Link intern ist und ein gültiges href angegeben wurde, rufen Sie die lokalisierte URL ab.
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

```jsx fileName="src/components/Link.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { forwardRef } = require("preact/compat");

/**
 * Hilfsfunktion, um zu prüfen, ob eine gegebene URL extern ist.
 * Wenn die URL mit http:// oder https:// beginnt, wird sie als extern betrachtet.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Eine benutzerdefinierte Link-Komponente, die das href-Attribut basierend auf der aktuellen Sprache anpasst.
 * Für interne Links wird `getLocalizedUrl` verwendet, um die URL mit dem Sprachpräfix zu versehen (z. B. /fr/about).
 * Dies stellt sicher, dass die Navigation im gleichen Sprachkontext bleibt.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Wenn der Link intern ist und ein gültiges href angegeben wurde, rufen Sie die lokalisierte URL ab.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return h(
    "a",
    {
      href: hrefI18n,
      ref: ref,
      ...props,
    },
    children
  );
});

Link.displayName = "Link";

module.exports = { Link, checkIsExternalLink };
```

#### Wie es funktioniert

- **Erkennung externer Links**:  
  Die Hilfsfunktion `checkIsExternalLink` bestimmt, ob eine URL extern ist. Externe Links bleiben unverändert, da sie keine Lokalisierung benötigen.
- **Abrufen der aktuellen Sprache**:  
  Der `useLocale`-Hook liefert die aktuelle Sprache (z. B. `fr` für Französisch).
- **Lokalisierung der URL**:  
  Für interne Links (d. h. nicht externe) wird `getLocalizedUrl` verwendet, um der URL automatisch das aktuelle Sprachpräfix voranzustellen. Das bedeutet, wenn Ihr Benutzer auf Französisch ist, wird `/about` als `href` in `/fr/about` umgewandelt.
- **Rückgabe des Links**:  
  Die Komponente gibt ein `<a>`-Element mit der lokalisierten URL zurück und stellt so sicher, dass die Navigation konsistent mit der Sprache ist.

### (Optional) Schritt 11: Markdown und HTML rendern

Intlayer unterstützt das Rendern von Markdown- und HTML-Inhalten in Preact.

Sie können das Rendern von Markdown- und HTML-Inhalten mit der Methode `.use()` anpassen. Diese Methode ermöglicht es Ihnen, das Standard-Rendering bestimmter Tags zu überschreiben.

```tsx
import { useIntlayer } from "preact-intlayer";

const { myMarkdownContent, myHtmlContent } = useIntlayer("my-component");

// ...

return (
  <div>
    {/* Grundlegendes Rendering */}
    {myMarkdownContent}

    {/* Benutzerdefiniertes Rendering für Markdown */}
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }} {...props} />,
    })}

    {/* Grundlegendes Rendering für HTML */}
    {myHtmlContent}

    {/* Benutzerdefiniertes Rendering für HTML */}
    {myHtmlContent.use({
      b: (props) => <strong style={{ color: "blue" }} {...props} />,
    })}
  </div>
);
```

### TypeScript konfigurieren

Intlayer verwendet Module Augmentation, um die Vorteile von TypeScript zu nutzen und Ihre Codebasis robuster zu machen.

![Autovervollständigung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Übersetzungsfehler](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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
    ".intlayer/**/*.ts", // Einbeziehung der automatisch generierten Typen
  ],
}
```

> Stellen Sie sicher, dass Ihre `tsconfig.json` für Preact eingerichtet ist, insbesondere `jsx` und `jsxImportSource` oder `jsxFactory`/`jsxFragmentFactory` für ältere Preact-Versionen, falls Sie nicht die Standardwerte von `preset-vite` verwenden.

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dies ermöglicht es Ihnen, zu vermeiden, dass sie in Ihr Git-Repository eingecheckt werden.

Dazu können Sie die folgenden Anweisungen in Ihre `.gitignore`-Datei einfügen:

```plaintext
# Ignorieren Sie die von Intlayer generierten Dateien
.intlayer
```

### VS Code Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Erweiterung** installieren.

[Vom VS Code Marketplace installieren](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** von übersetzten Inhalten.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Details zur Verwendung der Erweiterung finden Sie in der [Dokumentation zur Intlayer VS Code Erweiterung](https://intlayer.org/doc/vs-code-extension).

---

### Weiter gehen

Um weiterzugehen, können Sie den [visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) implementieren oder Ihre Inhalte mithilfe des [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) auslagern.

---
