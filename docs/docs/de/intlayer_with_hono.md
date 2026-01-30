---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: Hono i18n - So übersetzen Sie Ihre Hono-App – Leitfaden 2026
description: Entdecken Sie, wie Sie Ihr Hono-Backend mehrsprachig machen. Folgen Sie der Dokumentation, um es zu internationalisieren (i18n) und zu übersetzen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Hono
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Init-Befehl hinzufügen
  - version: 5.5.10
    date: 2025-06-29
    changes: Verlauf initialisiert
---

# Übersetzen Sie Ihre Hono-Backend-Website mit Intlayer | Internationalisierung (i18n)

`hono-intlayer` ist eine leistungsstarke Internationalisierungs-Middleware (i18n) für Hono-Anwendungen, die entwickelt wurde, um Ihre Backend-Dienste weltweit zugänglich zu machen, indem sie lokalisierte Antworten basierend auf den Präferenzen des Clients bereitstellt.

### Praktische Anwendungsfälle

- **Anzeige von Backend-Fehlern in der Sprache des Benutzers**: Wenn ein Fehler auftritt, verbessert die Anzeige von Meldungen in der Muttersprache des Benutzers das Verständnis und verringert Frustration. Dies ist besonders nützlich für dynamische Fehlermeldungen, die in Front-End-Komponenten wie Toasts oder Modalen angezeigt werden könnten.

- **Abrufen mehrsprachiger Inhalte**: Für Anwendungen, die Inhalte aus einer Datenbank beziehen, stellt die Internationalisierung sicher, dass Sie diese Inhalte in mehreren Sprachen bereitstellen können. Dies ist entscheidend für Plattformen wie E-Commerce-Websites oder Content-Management-Systeme, die Produktbeschreibungen, Artikel und andere Inhalte in der vom Benutzer bevorzugten Sprache anzeigen müssen.

- **Versenden mehrsprachiger E-Mails**: Ob Transaktions-E-Mails, Marketingkampagnen oder Benachrichtigungen – das Versenden von E-Mails in der Sprache des Empfängers kann das Engagement und die Effektivität erheblich steigern.

- **Mehrsprachige Push-Benachrichtigungen**: Für mobile Anwendungen kann das Versenden von Push-Benachrichtigungen in der bevorzugten Sprache eines Benutzers die Interaktion und Kundenbindung verbessern. Diese persönliche Note kann dazu führen, dass sich Benachrichtigungen relevanter und handlungsorientierter anfühlen.

- **Andere Kommunikationen**: Jede Form der Kommunikation vom Backend, wie SMS-Nachrichten, Systemalarme oder Aktualisierungen der Benutzeroberfläche, profitiert davon, in der Sprache des Benutzers zu sein, was Klarheit gewährleistet und das allgemeine Benutzererlebnis verbessert.

Durch die Internationalisierung des Backends respektiert Ihre Anwendung nicht nur kulturelle Unterschiede, sondern passt sich auch besser an die Bedürfnisse des globalen Marktes an, was ein wichtiger Schritt zur weltweiten Skalierung Ihrer Dienste ist.

## Erste Schritte

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-hono-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

See [Application Template](https://github.com/aymericzip/intlayer-hono-template) on GitHub.

### Installation

Um `hono-intlayer` zu verwenden, installieren Sie das Paket mit npm:

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
bunx intlayer init
```

### Einrichtung

Konfigurieren Sie die Internationalisierungseinstellungen, indem Sie eine `intlayer.config.ts` im Stammverzeichnis Ihres Projekts erstellen:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
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
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
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
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Deklarieren Sie Ihre Inhalte

Erstellen und verwalten Sie Ihre Inhaltsdeklarationen, um Übersetzungen zu speichern:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Ihre Inhaltsdeklarationen können überall in Ihrer Anwendung definiert werden, sofern sie im Verzeichnis `contentDir` (standardmäßig `./src`) enthalten sind und der Dateiendung für Inhaltsdeklarationen entsprechen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Weitere Einzelheiten finden Sie in der [Dokumentation zur Inhaltsdeklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

### Einrichtung der Hono-Anwendung

Richten Sie Ihre Hono-Anwendung für die Verwendung von `hono-intlayer` ein:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// Internationalisierungs-Request-Handler laden
app.use("*", intlayer());

// Routen
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// Internationalisierungs-Request-Handler laden
app.use("*", intlayer());

// Routen
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t, getDictionary, getIntlayer } = require("hono-intlayer");
const dictionaryExample = require("./index.content");

const app = new Hono();

// Internationalisierungs-Request-Handler laden
app.use("*", intlayer());

// Routen
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

module.exports = app;
```

### Kompatibilität

`hono-intlayer` ist voll kompatibel mit:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/index.md) für React-Anwendungen
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/index.md) für Next.js-Anwendungen
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/index.md) für Vite-Anwendungen

Es funktioniert auch nahtlos mit jeder Internationalisierungslösung in verschiedenen Umgebungen, einschließlich Browsern und API-Anfragen. Sie können die Middleware anpassen, um die Sprache über Header oder Cookies zu erkennen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Andere Konfigurationsoptionen
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Andere Konfigurationsoptionen
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Andere Konfigurationsoptionen
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

Standardmäßig interpretiert `hono-intlayer` den `Accept-Language`-Header, um die bevorzugte Sprache des Clients zu bestimmen.

> Weitere Informationen zur Konfiguration und zu fortgeschrittenen Themen finden Sie in unserer [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### TypeScript konfigurieren

`hono-intlayer` nutzt die robusten Funktionen von TypeScript, um den Internationalisierungsprozess zu verbessern. Die statische Typisierung von TypeScript stellt sicher, dass jeder Übersetzungsschlüssel berücksichtigt wird, wodurch das Risiko fehlender Übersetzungen verringert und die Wartbarkeit verbessert wird.

![Autovervollständigung](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Übersetzungsfehler](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Stellen Sie sicher, dass die automatisch generierten Typen (standardmäßig unter ./types/intlayer.d.ts) in Ihrer tsconfig.json-Datei enthalten sind.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Die automatisch generierten Typen einschließen
  ],
}
```

### VS Code-Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code Extension** installieren.

[Installation über den VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Fehlererkennung in Echtzeit** für fehlende Übersetzungen.
- **Inline-Vorschauen** von übersetzten Inhalten.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Einzelheiten zur Verwendung der Erweiterung finden Sie in der [Dokumentation zur Intlayer VS Code-Erweiterung](https://intlayer.org/doc/vs-code-extension).

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dies ermöglicht es Ihnen, zu vermeiden, dass sie in Ihr Git-Repository übertragen werden.

Fügen Sie dazu die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzu:

```plaintext fileName=".gitignore"
# Die von Intlayer generierten Dateien ignorieren
.intlayer
```
