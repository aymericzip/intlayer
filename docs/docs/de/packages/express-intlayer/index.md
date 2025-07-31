---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Paketdokumentation | express-intlayer
description: Siehe, wie man das express-intlayer Paket verwendet
keywords:
  - Intlayer
  - express-intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
---

# express-intlayer: JavaScript-Paket zur Internationalisierung (i18n) einer Express.js-Anwendung

**Intlayer** ist eine Sammlung von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist kompatibel mit Frameworks wie React, Next.js und Express.js.

**Das `express-intlayer` Paket** ermöglicht es Ihnen, Ihre Express.js-Anwendung zu internationalisieren. Es stellt eine Middleware bereit, die die bevorzugte Sprache des Benutzers erkennt und das passende Wörterbuch für den Benutzer zurückgibt.

## Warum sollten Sie Ihr Backend internationalisieren?

Die Internationalisierung Ihres Backends ist entscheidend, um ein globales Publikum effektiv zu bedienen. Sie ermöglicht es Ihrer Anwendung, Inhalte und Nachrichten in der bevorzugten Sprache jedes Benutzers bereitzustellen. Diese Fähigkeit verbessert die Benutzererfahrung und erweitert die Reichweite Ihrer Anwendung, indem sie für Menschen aus verschiedenen sprachlichen Hintergründen zugänglicher und relevanter wird.

### Praktische Anwendungsfälle

- **Anzeige von Backend-Fehlermeldungen in der Sprache des Benutzers**: Wenn ein Fehler auftritt, verbessert die Anzeige von Nachrichten in der Muttersprache des Benutzers das Verständnis und reduziert Frustration. Dies ist besonders nützlich für dynamische Fehlermeldungen, die in Frontend-Komponenten wie Toasts oder Modals angezeigt werden können.

- **Abrufen mehrsprachiger Inhalte**: Für Anwendungen, die Inhalte aus einer Datenbank abrufen, stellt die Internationalisierung sicher, dass diese Inhalte in mehreren Sprachen bereitgestellt werden können. Dies ist entscheidend für Plattformen wie E-Commerce-Websites oder Content-Management-Systeme, die Produktbeschreibungen, Artikel und andere Inhalte in der vom Benutzer bevorzugten Sprache anzeigen müssen.

- **Versand mehrsprachiger E-Mails**: Ob Transaktions-E-Mails, Marketingkampagnen oder Benachrichtigungen – das Versenden von E-Mails in der Sprache des Empfängers kann die Interaktion und Effektivität erheblich steigern.

- **Mehrsprachige Push-Benachrichtigungen**: Für mobile Anwendungen kann das Senden von Push-Benachrichtigungen in der bevorzugten Sprache des Benutzers die Interaktion und Bindung verbessern. Diese persönliche Note lässt Benachrichtigungen relevanter und handlungsorientierter erscheinen.

- **Andere Kommunikationsformen**: Jede Form der Kommunikation vom Backend, wie SMS-Nachrichten, Systemwarnungen oder Benutzeroberflächen-Updates, profitiert davon, in der Sprache des Benutzers zu erfolgen, was Klarheit schafft und die gesamte Benutzererfahrung verbessert.

Durch die Internationalisierung des Backends respektiert Ihre Anwendung nicht nur kulturelle Unterschiede, sondern richtet sich auch besser an die Bedürfnisse des globalen Marktes aus, was einen wichtigen Schritt zur Skalierung Ihrer Dienste weltweit darstellt.

## Warum Intlayer integrieren?

- **Typensichere Umgebung**: Nutzen Sie TypeScript, um sicherzustellen, dass alle Ihre Inhaltsdefinitionen präzise und fehlerfrei sind.

## Installation

Installieren Sie das notwendige Paket mit Ihrem bevorzugten Paketmanager:

```bash
npm install express-intlayer
```

```bash
yarn add express-intlayer
```

```bash
pnpm add express-intlayer
```

### Intlayer konfigurieren

Intlayer stellt eine Konfigurationsdatei zur Verfügung, um Ihr Projekt einzurichten. Platzieren Sie diese Datei im Stammverzeichnis Ihres Projekts.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Für eine vollständige Liste der verfügbaren Parameter siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

## Anwendungsbeispiel

Richten Sie Ihre Express-Anwendung so ein, dass `express-intlayer` verwendet wird:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Lade den Internationalisierungs-Request-Handler
app.use(intlayer());

// Routen
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Beispiel für zurückgegebenen Inhalt auf Französisch",
      "es-ES": "Beispiel für zurückgegebenen Inhalt auf Spanisch (Spanien)",
      "es-MX": "Beispiel für zurückgegebenen Inhalt auf Spanisch (Mexiko)",
    })
  );
});

// Server starten
app.listen(3000, () => console.log(`Höre auf Port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// Lade Internationalisierungs-Request-Handler
app.use(intlayer());

// Routen
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Beispiel für zurückgegebenen Inhalt auf Französisch",
      "es-MX": "Beispiel für zurückgegebenen Inhalt auf Spanisch (Mexiko)",
      "es-ES": "Beispiel für zurückgegebenen Inhalt auf Spanisch (Spanien)",
    })
  );
});

// Server starten
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Lade Internationalisierungs-Request-Handler
app.use(intlayer());

// Routen
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Server starten
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### Kompatibilität

`express-intlayer` ist vollständig kompatibel mit:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/index.md) für React-Anwendungen
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/index.md) für Next.js-Anwendungen
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/vite-intlayer/index.md) für Vite-Anwendungen

Es funktioniert auch nahtlos mit jeder Internationalisierungslösung in verschiedenen Umgebungen, einschließlich Browsern und API-Anfragen. Sie können die Middleware anpassen, um die Locale über Header oder Cookies zu erkennen:

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

typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

Standardmäßig interpretiert `express-intlayer` den `Accept-Language`-Header, um die bevorzugte Sprache des Clients zu bestimmen.

## Vom Paket `express-intlayer` bereitgestellte Funktionen

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/express-intlayer/t.md)

## Dokumentationsverlauf

- 5.5.10 - 2025-06-29: Initialer Verlauf
