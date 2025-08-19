---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Paketdokumentation | intlayer
description: Siehe, wie man das intlayer-Paket verwendet
keywords:
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
---

# intlayer: NPM-Paket zur Verwaltung mehrsprachiger Wörterbücher (i18n)

**Intlayer** ist eine Sammlung von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist kompatibel mit Frameworks wie React, Next.js und Express.js.

**Das `intlayer`-Paket** ermöglicht es Ihnen, Ihre Inhalte überall in Ihrem Code zu deklarieren. Es wandelt mehrsprachige Inhaltsdeklarationen in strukturierte Wörterbücher um, die sich nahtlos in Ihre Anwendung integrieren lassen. Mit TypeScript verbessert **Intlayer** Ihre Entwicklung, indem es stärkere und effizientere Werkzeuge bereitstellt.

## Warum Intlayer integrieren?

- **JavaScript-gesteuertes Content-Management**: Nutzen Sie die Flexibilität von JavaScript, um Ihre Inhalte effizient zu definieren und zu verwalten.
- **Typensichere Umgebung**: Verwenden Sie TypeScript, um sicherzustellen, dass alle Ihre Inhaltsdefinitionen präzise und fehlerfrei sind.
- **Integrierte Inhaltsdateien**: Halten Sie Ihre Übersetzungen nahe bei den jeweiligen Komponenten, um Wartbarkeit und Übersichtlichkeit zu verbessern.

## Installation

Installieren Sie das erforderliche Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer
```

```bash packageManager="yarn"
yarn add intlayer
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

javascript fileName="intlayer.config.mjs" codeFormat="esm"
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

> Für eine vollständige Liste der verfügbaren Parameter verweisen wir auf die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

## Anwendungsbeispiel

Mit Intlayer können Sie Ihre Inhalte an beliebiger Stelle in Ihrem Codebase strukturiert deklarieren.

Standardmäßig durchsucht Intlayer Dateien mit der Erweiterung `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> Die Standarderweiterung kann durch Setzen der Eigenschaft `contentDir` in der [Konfigurationsdatei](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) geändert werden.

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    ├── ClientComponent
    │   ├── index.content.ts
    │   └── index.tsx
    └── ServerComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    ├── ClientComponent
    │   ├── index.content.mjs
    │   └── index.mjx
    └── ServerComponent
        ├── index.content.mjs
        └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    ├── ClientComponent
    │   ├── index.content.cjs
    │   └── index.cjx
    └── ServerComponent
        ├── index.content.cjs
        └── index.cjx
```

### Deklarieren Sie Ihre Inhalte

Hier ist ein Beispiel für die Inhaltsdeklaration:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      "0": "Keine Autos",
      "1": "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      "0": "Keine Autos",
      "1": "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
    }),
  },
};

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
    numberOfCar: enu({
      "<-1": "Weniger als minus ein Auto",
      "-1": "Minus ein Auto",
      "0": "Keine Autos",
      "1": "Ein Auto",
      ">5": "Einige Autos",
      ">19": "Viele Autos",
    }),
  },
};

module.exports = clientComponentContent;
```

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Weniger als minus ein Auto",
        "-1": "Minus ein Auto",
        "0": "Keine Autos",
        "1": "Ein Auto",
        ">5": "Einige Autos",
        ">19": "Viele Autos"
      }
    }
  }
}
```

### Erstellen Sie Ihre Wörterbücher

Sie können Ihre Wörterbücher mit dem [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md) erstellen.

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Dieser Befehl durchsucht alle `*.content.*`-Dateien, kompiliert sie und schreibt die Ergebnisse in das in Ihrer **`intlayer.config.ts`** angegebene Verzeichnis (standardmäßig `./.intlayer`).

Eine typische Ausgabe könnte wie folgt aussehen:

```bash
.
└── .intlayer
    ├── dictionary  # Enthält das Wörterbuch Ihres Inhalts
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # Enthält den Einstiegspunkt Ihres Wörterbuchs, das in Ihrer Anwendung verwendet wird
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # Enthält die automatisch generierten Typdefinitionen Ihres Wörterbuchs
        ├── intlayer.d.ts  # Enthält die automatisch generierten Typdefinitionen von Intlayer
        ├── client-component.d.ts
        └── server-component.d.ts
```

### i18next-Ressourcen erstellen

Intlayer kann so konfiguriert werden, dass Wörterbücher für [i18next](https://www.i18next.com/) erstellt werden. Dazu müssen Sie die folgende Konfiguration in Ihre `intlayer.config.ts`-Datei hinzufügen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Teilt Intlayer mit, Nachrichtendateien für i18next zu generieren
    dictionaryOutput: ["i18next"],

    // Das Verzeichnis, in das Intlayer Ihre JSON-Nachrichtendateien schreibt
    i18nextResourcesDir: "./i18next/resources",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Teilt Intlayer mit, Nachrichten-Dateien für i18next zu generieren
    dictionaryOutput: ["i18next"],

    // Das Verzeichnis, in das Intlayer Ihre Nachrichten-JSON-Dateien schreibt
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Teilt Intlayer mit, Nachrichten-Dateien für i18next zu generieren
    dictionaryOutput: ["i18next"],

    // Das Verzeichnis, in das Intlayer Ihre Nachrichten-JSON-Dateien schreibt
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> Für eine vollständige Liste der verfügbaren Parameter siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

Ausgabe:

```bash
.
└── i18next
    └── resources
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Zum Beispiel könnte die **en/client-component.json** wie folgt aussehen:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Einige Autos"
}
```

### Erstellen von next-intl-Wörterbüchern

Intlayer kann so konfiguriert werden, dass Wörterbücher für [i18next](https://www.i18next.com/) oder [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl) erstellt werden. Dazu müssen Sie die folgende Konfiguration in Ihre `intlayer.config.ts`-Datei einfügen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Weist Intlayer an, Nachrichten-Dateien für i18next zu generieren
    dictionaryOutput: ["next-intl"],

    // Das Verzeichnis, in das Intlayer Ihre Nachrichten-JSON-Dateien schreibt
    nextIntlMessagesDir: "./i18next/messages",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Teilt Intlayer mit, Nachrichten-Dateien für i18next zu generieren
    dictionaryOutput: ["next-intl"],

    // Das Verzeichnis, in das Intlayer Ihre Nachrichten-JSON-Dateien schreibt
    nextIntlMessagesDir: "./i18next/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Teilt Intlayer mit, Nachrichten-Dateien für i18next zu generieren
    dictionaryOutput: ["next-intl"],

    // Das Verzeichnis, in das Intlayer Ihre Nachrichten-JSON-Dateien schreibt
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> Für eine vollständige Liste der verfügbaren Parameter siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md).

Ausgabe:

```bash
.
└── intl
    └── messages
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

Zum Beispiel könnte die Datei **en/client-component.json** so aussehen:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hallo Welt",
  "zero_numberOfCar": "Keine Autos",
  "one_numberOfCar": "Ein Auto",
  "two_numberOfCar": "Zwei Autos",
  "other_numberOfCar": "Einige Autos"
}
```

## CLI-Werkzeuge

Intlayer stellt ein CLI-Werkzeug bereit, um:

- Ihre Inhaltsdeklarationen zu prüfen und fehlende Übersetzungen zu ergänzen
- Wörterbücher aus Ihren Inhaltsdeklarationen zu erstellen
- entfernte Wörterbücher von Ihrem CMS in Ihr Lokalisierungsprojekt zu übertragen und abzurufen

Weitere Informationen finden Sie unter [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md).

## Verwendung von Intlayer in Ihrer Anwendung

Nachdem Ihre Inhalte deklariert sind, können Sie Ihre Intlayer-Wörterbücher in Ihrer Anwendung verwenden.

Intlayer ist als Paket für Ihre Anwendung verfügbar.

### React-Anwendung

Um Intlayer in Ihrer React-Anwendung zu verwenden, können Sie [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/index.md) nutzen.

### Next.js-Anwendung

Um Intlayer in Ihrer Next.js-Anwendung zu verwenden, können Sie [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/index.md) nutzen.

### Express-Anwendung

Um Intlayer in Ihrer Express-Anwendung zu verwenden, können Sie [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/express-intlayer/index.md) nutzen.

## Vom `intlayer`-Paket bereitgestellte Funktionen

Das `intlayer`-Paket stellt außerdem einige Funktionen bereit, die Ihnen helfen, Ihre Anwendung zu internationalisieren.

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getPathWithoutLocale.md)

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Historie initialisiert
