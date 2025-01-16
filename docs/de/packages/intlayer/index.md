# intlayer: NPM-Paket zur Verwaltung der mehrsprachigen Inhaltsdeklaration (i18n)

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurde. Es ist mit Frameworks wie React, Next.js und Express.js kompatibel.

**Das `intlayer`-Pakets** ermöglicht es Ihnen, Ihren Inhalt überall in Ihrem Code zu deklarieren. Es konvertiert mehrsprachige Inhaltsdeklarationen in strukturierte Wörterbücher, die nahtlos in Ihre Anwendung integriert werden. Mit TypeScript verbessert **Intlayer** Ihre Entwicklung, indem es leistungsstärkere, effizientere Werkzeuge bereitstellt.

## Warum Intlayer integrieren?

- **JavaScript-basiertes Inhaltsmanagement**: Nutzen Sie die Flexibilität von JavaScript, um Ihre Inhalte effizient zu definieren und zu verwalten.
- **Typensichere Umgebung**: Nutzen Sie TypeScript, um sicherzustellen, dass alle Ihre Inhaltsdefinitionen präzise und fehlerfrei sind.
- **Integrierte Inhaltsdateien**: Halten Sie Ihre Übersetzungen in der Nähe ihrer jeweiligen Komponenten, was die Wartbarkeit und Klarheit erhöht.

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

### Konfigurieren Sie Intlayer

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

> Für eine vollständige Liste verfügbarer Parameter, siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

## Beispiel für die Verwendung

Mit Intlayer können Sie Ihren Inhalt überall in Ihrem Code strukturiert deklarieren.

Standardmäßig scannt Intlayer nach Dateien mit der Erweiterung `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> Sie können die Standarderweiterung ändern, indem Sie die `contentDir`-Eigenschaft in der [Konfigurationsdatei](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) festlegen.

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

### Deklarieren Sie Ihren Inhalt

Hier ist ein Beispiel für die Inhaltsdeklaration:

```tsx filePath="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
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
} satisfies DeclarationContent;

export default clientComponentContent;
```

```jsx filePath="src/ClientComponent/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
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

```jsx filePath="src/ClientComponent/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
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

```json filePath="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "Übersetzung",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "Enumeration",
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
npx intlayer build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

Dieser Befehl scannt alle `*.content.*`-Dateien, kompiliert sie und schreibt die Ergebnisse in das Verzeichnis, das in Ihrer **`intlayer.config.ts`** angegeben ist (standardmäßig `./.intlayer`).

Eine typische Ausgabe kann folgendermaßen aussehen:

```bash
.
├── .intlayer
│   ├── dictionary  # Enthält das Wörterbuch Ihres Inhalts
│   │   ├── client-component.json
│   │   └── server-component.json
│   ├── main  # Enthält den Einstiegspunkt Ihres Wörterbuchs für die Verwendung in Ihrer Anwendung
│   │   ├── dictionary.cjs
│   │   └── dictionary.mjs
│   └── types  # Enthält die automatisch generierten Typdefinitionen Ihres Wörterbuchs
│       ├── client-component.d.ts
│       └── server-component.d.ts
└── types
    └── intlayer.d.ts  # Enthält die automatisch generierten Typdefinitionen von Intlayer
```

### i18next-Ressourcen erstellen

Intlayer kann so konfiguriert werden, dass Wörterbücher für [i18next](https://www.i18next.com/) erstellt werden. Dazu müssen Sie die folgende Konfiguration in Ihre `intlayer.config.ts`-Datei einfügen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Weist Intlayer an, Nachrichten Dateien für i18next zu generieren
    dictionaryOutput: ["i18next"],

    // Das Verzeichnis, in dem Intlayer Ihre Nachrichten-JSON-Dateien schreiben wird
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
    // Weist Intlayer an, Nachrichten Dateien für i18next zu generieren
    dictionaryOutput: ["i18next"],

    // Das Verzeichnis, in dem Intlayer Ihre Nachrichten-JSON-Dateien schreiben wird
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
    // Weist Intlayer an, Nachrichten Dateien für i18next zu generieren
    dictionaryOutput: ["i18next"],

    // Das Verzeichnis, in dem Intlayer Ihre Nachrichten-JSON-Dateien schreiben wird
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> Für eine vollständige Liste verfügbarer Parameter, siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

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

Zum Beispiel könnte die **en/client-component.json** folgendermaßen aussehen:

```json filePath="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "Keine Autos",
  "one_numberOfCar": "Ein Auto",
  "two_numberOfCar": "Zwei Autos",
  "other_numberOfCar": "Einige Autos"
}
```

### i18next oder next-intl Wörterbücher erstellen

Intlayer kann so konfiguriert werden, dass Wörterbücher für [i18next](https://www.i18next.com/) oder [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl) erstellt werden. Dazu müssen Sie die folgende Konfiguration in Ihre `intlayer.config.ts`-Datei einfügen:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Weist Intlayer an, Nachrichten Dateien für i18next zu generieren
    dictionaryOutput: ["next-intl"],

    // Das Verzeichnis, in dem Intlayer Ihre Nachrichten-JSON-Dateien schreiben wird
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
    // Weist Intlayer an, Nachrichten Dateien für i18next zu generieren
    dictionaryOutput: ["next-intl"],

    // Das Verzeichnis, in dem Intlayer Ihre Nachrichten-JSON-Dateien schreiben wird
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
    // Weist Intlayer an, Nachrichten Dateien für i18next zu generieren
    dictionaryOutput: ["next-intl"],

    // Das Verzeichnis, in dem Intlayer Ihre Nachrichten-JSON-Dateien schreiben wird
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> Für eine vollständige Liste verfügbarer Parameter, siehe die [Konfigurationsdokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md).

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

Zum Beispiel könnte die **en/client-component.json** folgendermaßen aussehen:

```json filePath="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "Keine Autos",
  "one_numberOfCar": "Ein Auto",
  "two_numberOfCar": "Zwei Autos",
  "other_numberOfCar": "Einige Autos"
}
```

## CLI-Tools

Intlayer bietet ein CLI-Tool, um:

- Ihre Inhaltsdeklarationen zu überprüfen und fehlende Übersetzungen zu vervollständigen
- Wörterbücher aus Ihren Inhaltsdeklarationen zu erstellen
- entfernte Wörterbücher von Ihrem CMS in Ihr lokales Projekt zu pushen und zu pullen

Konsultieren Sie [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md) für weitere Informationen.

## Verwenden Sie Intlayer in Ihrer Anwendung

Sobald Ihr Inhalt deklariert ist, können Sie Ihre Intlayer-Wörterbücher in Ihrer Anwendung konsumieren.

Intlayer ist als Paket für Ihre Anwendung verfügbar.

### React-Anwendung

Um Intlayer in Ihrer React-Anwendung zu verwenden, können Sie [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/index.md) verwenden.

### Next.js-Anwendung

Um Intlayer in Ihrer Next.js-Anwendung zu verwenden, können Sie [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/next-intlayer/index.md) verwenden.

### Express-Anwendung

Um Intlayer in Ihrer Express-Anwendung zu verwenden, können Sie [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/express-intlayer/index.md) verwenden.

## Funktionen, die vom `intlayer`-Paket bereitgestellt werden

Das `intlayer`-Paket bietet auch einige Funktionen, um Ihnen zu helfen, Ihre Anwendung zu internationalisieren.

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getConfiguration.md)
- [`getTranslationContent()`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getTranslationContent.md)
- [`getEnumerationContent()`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getEnumerationContent.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/getPathWithoutLocale.md)
