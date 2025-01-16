# express-intlayer: JavaScript-Paket zur Internationalisierung (i18n) einer Express.js-Anwendung

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist mit Frameworks wie React, Next.js und Express.js kompatibel.

**Das `express-intlayer`-Paket** ermöglicht es Ihnen, Ihre Express.js-Anwendung zu internationalisieren. Es bietet Middleware, um die bevorzugte Sprache des Benutzers zu erkennen und das entsprechende Wörterbuch für den Benutzer zurückzugeben.

## Warum Ihre Backend-Internationalisierung?

Die Internationalisierung Ihres Backends ist entscheidend, um einem globalen Publikum effektiv zu dienen. Es ermöglicht Ihrer Anwendung, Inhalte und Nachrichten in der bevorzugten Sprache jedes Benutzers bereitzustellen. Diese Fähigkeit verbessert die Benutzererfahrung und erweitert die Reichweite Ihrer Anwendung, indem sie für Menschen aus verschiedenen Sprachräumen zugänglicher und relevanter wird.

### Praktische Anwendungsfälle

- **Backend-Fehler in der Sprache des Benutzers anzeigen**: Wenn ein Fehler auftritt, verbessert die Anzeige von Nachrichten in der Muttersprache des Benutzers das Verständnis und verringert die Frustration. Dies ist besonders nützlich für dynamische Fehlermeldungen, die möglicherweise in Front-End-Komponenten wie Toasts oder Modalen angezeigt werden.

- **Mehrsprachige Inhalte abrufen**: Für Anwendungen, die Inhalte aus einer Datenbank abrufen, stellt die Internationalisierung sicher, dass Sie diese Inhalte in mehreren Sprachen bereitstellen können. Dies ist entscheidend für Plattformen wie E-Commerce-Websites oder Content-Management-Systeme, die Produktbeschreibungen, Artikel und andere Inhalte in der vom Benutzer bevorzugten Sprache anzeigen müssen.

- **Mehrsprachige E-Mails senden**: Ob es sich um transaktionale E-Mails, Marketingkampagnen oder Benachrichtigungen handelt, das Senden von E-Mails in der Sprache des Empfängers kann das Engagement und die Effektivität erheblich steigern.

- **Mehrsprachige Push-Benachrichtigungen**: Für mobile Anwendungen kann das Senden von Push-Benachrichtigungen in der bevorzugten Sprache eines Benutzers die Interaktion und Bindung verbessern. Diese persönliche Note kann dazu führen, dass Benachrichtigungen relevanter und ansprechender wirken.

- **Andere Kommunikation**: Jede Form der Kommunikation vom Backend, wie SMS-Nachrichten, Systemwarnungen oder Benutzeroberflächenaktualisierungen, profitiert davon, in der Sprache des Benutzers verfasst zu sein, um Klarheit zu gewährleisten und die gesamte Benutzererfahrung zu verbessern.

Durch die Internationalisierung des Backends respektiert Ihre Anwendung nicht nur kulturelle Unterschiede, sondern entspricht auch besser den Bedürfnissen des globalen Marktes, was einen wichtigen Schritt beim Skalieren Ihrer Dienste weltweit darstellt.

## Warum Intlayer integrieren?

- **Typensichere Umgebung**: Nutzen Sie TypeScript, um sicherzustellen, dass alle Ihre Inhaltsdefinitionen präzise und fehlerfrei sind.

## Installation

Installieren Sie das erforderliche Paket mit Ihrem bevorzugten Paketmanager:

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

Intlayer bietet eine Konfigurationsdatei, um Ihr Projekt einzurichten. Platzieren Sie diese Datei im Stammverzeichnis Ihres Projekts.

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

> Für eine vollständige Liste der verfügbaren Parameter, siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

## Beispiel für die Verwendung

Richten Sie Ihre Express-Anwendung so ein, dass sie `express-intlayer` verwendet:

```typescript fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer, t } from "express-intlayer";

const app: Express = express();

// Internationale Anforderungsbearbeitung laden
app.use(intlayer());

// Routen
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Beispiel für zurückgegebene Inhalte in Englisch",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
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

// Internationale Anforderungsbearbeitung laden
app.use(intlayer());

// Routen
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Beispiel für zurückgegebene Inhalte in Englisch",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Server starten
app.listen(3000, () => console.log(`Höre auf Port 3000`));
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer, t } = require("express-intlayer");

const app = express();

// Internationale Anforderungsbearbeitung laden
app.use(intlayer());

// Routen
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Beispiel für zurückgegebene Inhalte in Englisch",
      fr: "Exemple de contenu renvoyé en français",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
    })
  );
});

// Server starten
app.listen(3000, () => console.log(`Höre auf Port 3000`));
```

### Kompatibilität

`express-intlayer` ist vollständig kompatibel mit:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/index.md) für React-Anwendungen
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/next-intlayer/index.md) für Next.js-Anwendungen
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/vite-intlayer/index.md) für Vite-Anwendungen

Es funktioniert auch nahtlos mit jeder Internationalisierungslösung in verschiedenen Umgebungen, einschließlich Browser und API-Anfragen. Sie können die Middleware anpassen, um die Sprache durch Header oder Cookies zu erkennen:

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

Standardmäßig wird `express-intlayer` den `Accept-Language`-Header interpretieren, um die bevorzugte Sprache des Clients zu bestimmen.

## Funktionen, die vom `express-intlayer`-Paket bereitgestellt werden

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/en-GB/packages/express-intlayer/t.md)
