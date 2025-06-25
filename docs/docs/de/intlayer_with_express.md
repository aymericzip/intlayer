---
docName: intlayer_with_express
url: https://intlayer.org/doc/environment/express
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_express.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Übersetzen Sie Ihren Express-Backend (i18n)
description: Entdecken Sie, wie Sie Ihre vite-Backend mehrsprachig gestalten können. Befolgen Sie die Dokumentation, um sie zu internationalisieren (i18n) und zu übersetzen.
keywords:
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Express
  - JavaScript
  - Backend
---

# Erste Schritte mit der Internationalisierung (i18n) mit Intlayer und Express

`express-intlayer` ist eine leistungsstarke Internationalisierungs-Middleware (i18n) für Express-Anwendungen, die entwickelt wurde, um Ihre Backend-Dienste global zugänglich zu machen, indem sie lokalisierte Antworten basierend auf den Präferenzen des Clients bereitstellt.

## Warum Ihr Backend internationalisieren?

Die Internationalisierung Ihres Backends ist entscheidend, um ein globales Publikum effektiv zu bedienen. Sie ermöglicht es Ihrer Anwendung, Inhalte und Nachrichten in der bevorzugten Sprache jedes Benutzers bereitzustellen. Diese Fähigkeit verbessert die Benutzererfahrung und erweitert die Reichweite Ihrer Anwendung, indem sie für Menschen aus verschiedenen sprachlichen Hintergründen zugänglicher und relevanter wird.

### Praktische Anwendungsfälle

- **Anzeige von Backend-Fehlern in der Sprache des Benutzers**: Wenn ein Fehler auftritt, verbessert die Anzeige von Nachrichten in der Muttersprache des Benutzers das Verständnis und reduziert Frustration. Dies ist besonders nützlich für dynamische Fehlermeldungen, die in Frontend-Komponenten wie Toasts oder Modals angezeigt werden könnten.

- **Abrufen von mehrsprachigen Inhalten**: Für Anwendungen, die Inhalte aus einer Datenbank abrufen, stellt die Internationalisierung sicher, dass Sie diese Inhalte in mehreren Sprachen bereitstellen können. Dies ist entscheidend für Plattformen wie E-Commerce-Websites oder Content-Management-Systeme, die Produktbeschreibungen, Artikel und andere Inhalte in der vom Benutzer bevorzugten Sprache anzeigen müssen.

- **Versand von mehrsprachigen E-Mails**: Ob Transaktions-E-Mails, Marketingkampagnen oder Benachrichtigungen – der Versand von E-Mails in der Sprache des Empfängers kann die Interaktion und Effektivität erheblich steigern.

- **Mehrsprachige Push-Benachrichtigungen**: Für mobile Anwendungen kann das Senden von Push-Benachrichtigungen in der bevorzugten Sprache eines Benutzers die Interaktion und Bindung verbessern. Diese persönliche Note kann Benachrichtigungen relevanter und handlungsorientierter machen.

- **Andere Kommunikationsformen**: Jede Form der Kommunikation vom Backend, wie SMS-Nachrichten, Systemwarnungen oder Benutzeroberflächen-Updates, profitiert davon, in der Sprache des Benutzers zu sein, was Klarheit gewährleistet und die allgemeine Benutzererfahrung verbessert.

Durch die Internationalisierung des Backends respektiert Ihre Anwendung nicht nur kulturelle Unterschiede, sondern passt sich auch besser an die Bedürfnisse des globalen Marktes an, was sie zu einem entscheidenden Schritt bei der Skalierung Ihrer Dienste weltweit macht.

## Erste Schritte

### Installation

Um `express-intlayer` zu verwenden, installieren Sie das Paket mit npm:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### Einrichtung

Konfigurieren Sie die Internationalisierungseinstellungen, indem Sie eine `intlayer.config.ts` in Ihrem Projektstammverzeichnis erstellen:

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

### Express-Anwendung einrichten

Richten Sie Ihre Express-Anwendung ein, um `express-intlayer` zu verwenden:

```typescript fileName="src/index.ts" codeFormat="typescript"
// Express-Anwendung einrichten
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Internationalisierungs-Request-Handler laden
app.use(intlayer());

// Routen
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

// Server starten
app.listen(3000, () => console.log(`Listening on port 3000`));
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer, t } from "express-intlayer";

const app = express();

// Internationalisierungs-Request-Handler laden
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

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Internationalisierungs-Request-Handler laden
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

Standardmäßig interpretiert `express-intlayer` den `Accept-Language`-Header, um die bevorzugte Sprache des Clients zu bestimmen.

> Für weitere Informationen zu Konfiguration und fortgeschrittenen Themen besuchen Sie unsere [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

### TypeScript konfigurieren

`express-intlayer` nutzt die robusten Fähigkeiten von TypeScript, um den Internationalisierungsprozess zu verbessern. Die statische Typisierung von TypeScript stellt sicher, dass jeder Übersetzungsschlüssel berücksichtigt wird, wodurch das Risiko fehlender Übersetzungen reduziert und die Wartbarkeit verbessert wird.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

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

### Git-Konfiguration

Es wird empfohlen, die von Intlayer generierten Dateien zu ignorieren. Dadurch vermeiden Sie, dass diese in Ihr Git-Repository aufgenommen werden.

Fügen Sie dazu die folgenden Anweisungen zu Ihrer `.gitignore`-Datei hinzu:

```plaintext fileName=".gitignore"
# Von Intlayer generierte Dateien ignorieren
.intlayer
```
