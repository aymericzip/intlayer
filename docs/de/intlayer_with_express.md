# Getting Started internationalizing (i18n) with Intlayer und Express

`express-intlayer` ist ein leistungsstarker Internationalisierungs- (i18n) Middleware für Express-Anwendungen, die dafür entwickelt wurde, Ihre Backend-Dienste weltweit zugänglich zu machen, indem sie lokalisierten Antworten basierend auf den Vorlieben des Clients bietet.

## Warum Ihr Backend internationalisieren?

Die Internationalisierung Ihres Backends ist entscheidend, um ein globales Publikum effektiv zu bedienen. Es ermöglicht Ihrer Anwendung, Inhalte und Nachrichten in der bevorzugten Sprache jedes Benutzers bereitzustellen. Diese Fähigkeit verbessert das Nutzererlebnis und erweitert die Reichweite Ihrer Anwendung, indem sie für Menschen aus unterschiedlichen Sprach- und Kulturkreisen zugänglicher und relevanter wird.

### Praktische Anwendungsfälle

- **Backend-Fehler in der Sprache des Nutzers anzeigen**: Wenn ein Fehler auftritt, verbessert das Anzeigen von Nachrichten in der Muttersprache des Nutzers das Verständnis und reduziert Frustrationen. Dies ist besonders nützlich für dynamische Fehlermeldungen, die in Frontend-Komponenten wie Toasts oder Modalen angezeigt werden könnten.

- **Multilinguale Inhalte abrufen**: Für Anwendungen, die Inhalte aus einer Datenbank abrufen, stellt die Internationalisierung sicher, dass Sie diese Inhalte in mehreren Sprachen bereitstellen können. Dies ist entscheidend für Plattformen wie E-Commerce-Websites oder Content-Management-Systeme, die Produktbeschreibungen, Artikel und andere Inhalte in der vom Benutzer bevorzugten Sprache anzeigen müssen.

- **Multilinguale E-Mails senden**: Ob es sich um transaktionale E-Mails, Marketingkampagnen oder Benachrichtigungen handelt, das Senden von E-Mails in der Sprache des Empfängers kann das Engagement und die Effektivität erheblich steigern.

- **Multilinguale Push-Benachrichtigungen**: Für mobile Anwendungen kann das Senden von Push-Benachrichtigungen in der bevorzugten Sprache des Nutzers die Interaktion und Bindung verbessern. Diese persönliche Note kann dazu führen, dass Benachrichtigungen relevanter und umsetzbarer erscheinen.

- **Sonstige Kommunikationsmittel**: Jede Art von Kommunikation vom Backend, wie SMS-Nachrichten, Systemwarnungen oder Benutzeroberflächenaktualisierungen, profitiert davon, in der Sprache des Nutzers verfasst zu sein, was Klarheit gewährleistet und das gesamte Nutzererlebnis verbessert.

Durch die Internationalisierung des Backends respektiert Ihre Anwendung nicht nur kulturelle Unterschiede, sondern kann auch besser auf die Bedürfnisse des globalen Marktes eingehen, was einen entscheidenden Schritt zur Skalierung Ihrer Dienste weltweit darstellt.

## Getting Started

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

### Setup

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

### Express-Anwendungssetup

Richten Sie Ihre Express-Anwendung so ein, dass sie `express-intlayer` verwendet:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Lade Internationalisierungs-Anforderungs-Handler
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

// Lade Internationalisierungs-Anforderungs-Handler
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

// Lade Internationalisierungs-Anforderungs-Handler
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

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/index.md) für React-Anwendungen
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/next-intlayer/index.md) für Next.js-Anwendungen
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/vite-intlayer/index.md) für Vite-Anwendungen

Es funktioniert auch nahtlos mit jeder Internationalisierungslösung in verschiedenen Umgebungen, einschließlich Browsern und API-Anfragen. Sie können die Middleware anpassen, um die Lokalisierung über Header oder Cookies zu erkennen:

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

Standardmäßig wird `express-intlayer` den Header `Accept-Language` interpretieren, um die bevorzugte Sprache des Clients zu bestimmen.

> Für weitere Informationen zur Konfiguration und zu fortgeschrittenen Themen besuchen Sie unsere [Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

## Unterstützt von TypeScript

`express-intlayer` nutzt die robusten Fähigkeiten von TypeScript, um den Internationalisierungsprozess zu verbessern. Die statische Typisierung von TypeScript stellt sicher, dass jeder Übersetzungsschlüssel berücksichtigt wird, wodurch das Risiko fehlender Übersetzungen verringert und die Wartbarkeit verbessert wird.

> Stellen Sie sicher, dass die generierten Typen (standardmäßig unter ./types/intlayer.d.ts) in Ihrer tsconfig.json-Datei enthalten sind.
