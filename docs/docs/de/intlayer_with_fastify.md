---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: So übersetzen Sie Ihr Fastify-Backend – i18n-Leitfaden 2026
description: Erfahren Sie, wie Sie Ihr Fastify-Backend mehrsprachig machen. Folgen Sie der Dokumentation, um es zu internationalisieren (i18n) und zu übersetzen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Fastify
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: Init-Befehl hinzugefügt
  - version: 7.6.0
    date: 2025-12-31
    changes: History initialisiert
---

# Übersetzen Sie Ihre Fastify-Backend-Website mit Intlayer | Internationalisierung (i18n)

`fastify-intlayer` ist ein leistungsfähiges Internationalisierungs-Plugin (i18n) für Fastify-Anwendungen, das entwickelt wurde, um Ihre Backend-Services global zugänglich zu machen, indem es lokalisierte Antworten basierend auf den Präferenzen des Clients bereitstellt.

### Praktische Anwendungsfälle

- **Anzeige von Backend-Fehlern in der Sprache des Nutzers**: Wenn ein Fehler auftritt, verbessert die Anzeige von Meldungen in der Muttersprache des Nutzers das Verständnis und reduziert Frustration. Dies ist besonders nützlich für dynamische Fehlermeldungen, die in Frontend-Komponenten wie Toasts oder Modals angezeigt werden können.
- **Abrufen mehrsprachiger Inhalte**: Für Anwendungen, die Inhalte aus einer Datenbank abrufen, stellt Internationalisierung sicher, dass Sie diese Inhalte in mehreren Sprachen bereitstellen können. Dies ist entscheidend für Plattformen wie E‑Commerce-Websites oder Content-Management-Systeme, die Produktbeschreibungen, Artikel und andere Inhalte in der vom Nutzer bevorzugten Sprache anzeigen müssen.
- **Versenden mehrsprachiger E-Mails**: Ob Transaktions-E-Mails, Marketingkampagnen oder Benachrichtigungen – das Versenden von E-Mails in der Sprache des Empfängers kann das Engagement und die Effektivität deutlich steigern.
- **Mehrsprachige Push-Benachrichtigungen**: Für mobile Anwendungen können Push-Benachrichtigungen in der bevorzugten Sprache des Nutzers die Interaktion und Bindung verbessern. Diese persönliche Note kann Benachrichtigungen relevanter erscheinen lassen und eher zu konkreten Aktionen anregen.
- **Andere Kommunikation**: Jede Form der Kommunikation vom Backend, wie SMS-Nachrichten, Systemwarnungen oder Benutzeroberflächen-Aktualisierungen, profitiert davon, in der Sprache des Nutzers verfügbar zu sein. Dies sorgt für Klarheit und verbessert das gesamte Benutzererlebnis.

Durch die Internationalisierung des Backends respektiert Ihre Anwendung nicht nur kulturelle Unterschiede, sondern passt sich auch besser den Anforderungen des globalen Marktes an und wird so zu einem wichtigen Schritt beim weltweiten Skalieren Ihrer Dienste.

## Erste Schritte

### Installation

Um `fastify-intlayer` zu verwenden, installieren Sie das Paket mit npm:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
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

Erstellen und verwalten Sie Ihre Content-Deklarationen, um Übersetzungen zu speichern:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      de: "Beispiel eines zurückgegebenen Inhalts auf Englisch",
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
      de: "Beispiel für zurückgegebenen Inhalt auf Englisch",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      de: "Beispiel für zurückgegebenen Inhalt auf Englisch",
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
        "de": "Beispiel für zurückgegebenen Inhalt auf Englisch",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Ihre Content-Deklarationen können überall in Ihrer Anwendung definiert werden, solange sie im Verzeichnis `contentDir` (standardmäßig `./src`) enthalten sind. Und die Dateiendung der Content-Deklaration muss übereinstimmen (standardmäßig `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Für weitere Details siehe die [Dokumentation zur Content-Deklaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_file.md).

### Fastify-Anwendung einrichten

Konfigurieren Sie Ihre Fastify-Anwendung, um `fastify-intlayer` zu verwenden:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

typescript fileName="src/index.ts" codeFormat="typescript"
// Internationalisierungs-Plugin laden
await fastify.register(intlayer);

// Routen
fastify.get("/t_example", async (_req, reply) => {
  return t({
    de: "Beispiel für zurückgegebenen Inhalt auf Deutsch",
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Server starten
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Internationalisierungs-Plugin laden
await fastify.register(intlayer);

// Routen
fastify.get("/t_example", async (_req, reply) => {
  return t({
    de: "Beispiel für zurückgegebenen Inhalt auf Deutsch",
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Server starten
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// Wrapper zum Starten des Servers für async/await
const start = async () => {
  try {
    // Internationalisierungs-Plugin laden
    await fastify.register(intlayer);

    // Routen
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        de: "Beispiel für zurückgegebenen Inhalt auf Englisch",
        en: "Example of returned content in English",
        fr: "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Kompatibilität

`fastify-intlayer` ist vollständig kompatibel mit:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/index.md)>) für React-Anwendungen
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/index.md)>) für Next.js-Anwendungen

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/index.md)>) für React-Anwendungen
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/index.md)>) für Next.js-Anwendungen
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/index.md)>) für Vite-Anwendungen

Es funktioniert auch nahtlos mit jeder Internationalisierungslösung in verschiedenen Umgebungen, einschließlich Browsern und API-Anfragen. Sie können die Middleware anpassen, um die Locale über Header oder Cookies zu erkennen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Weitere Konfigurationsoptionen
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
  // ... Weitere Konfigurationsoptionen
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
  // ... Weitere Konfigurationsoptionen
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

Standardmäßig interpretiert `fastify-intlayer` den `Accept-Language`-Header, um die bevorzugte Sprache des Clients zu bestimmen.

> Für weitere Informationen zur Konfiguration und zu erweiterten Themen, besuchen Sie unsere [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### TypeScript konfigurieren

`fastify-intlayer` nutzt die leistungsstarken Möglichkeiten von TypeScript, um den Internationalisierungsprozess zu verbessern. Die statische Typisierung von TypeScript stellt sicher, dass jeder Übersetzungsschlüssel berücksichtigt wird, reduziert das Risiko fehlender Übersetzungen und verbessert die Wartbarkeit.

Stellen Sie sicher, dass die automatisch generierten Typen (standardmäßig unter ./types/intlayer.d.ts) in Ihrer tsconfig.json-Datei enthalten sind.

```json5 fileName="tsconfig.json"
{
  // ... Ihre bestehenden TypeScript-Konfigurationen
  "include": [
    // ... Ihre bestehenden TypeScript-Konfigurationen
    ".intlayer/**/*.ts", // Automatisch generierte Typen einbeziehen
  ],
}
```

### VS Code-Erweiterung

Um Ihre Entwicklungserfahrung mit Intlayer zu verbessern, können Sie die offizielle **Intlayer VS Code-Erweiterung** installieren.

[Installieren im VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Diese Erweiterung bietet:

- **Autovervollständigung** für Übersetzungsschlüssel.
- **Echtzeit-Fehlererkennung** für fehlende Übersetzungen.
- **Inline-Vorschauen** des übersetzten Inhalts.
- **Schnellaktionen**, um Übersetzungen einfach zu erstellen und zu aktualisieren.

Weitere Details zur Verwendung der Erweiterung finden Sie in der [Dokumentation der Intlayer VS Code-Erweiterung](https://intlayer.org/doc/vs-code-extension).

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. So vermeiden Sie, diese in Ihr Git-Repository zu committen.

Dazu können Sie die folgenden Einträge in Ihre `.gitignore`-Datei aufnehmen:

```plaintext fileName=".gitignore"
# Ignoriere die von Intlayer generierten Dateien
.intlayer
```
