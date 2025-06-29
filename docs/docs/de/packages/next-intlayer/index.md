---
docName: package__next-intlayer
url: https://intlayer.org/doc/packages/next-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/next-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Paketdokumentation | next-intlayer
description: Erfahren Sie, wie Sie das next-intlayer-Paket verwenden
keywords:
  - Intlayer
  - next-intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
---

# next-intlayer: NPM-Paket zur Internationalisierung (i18n) einer Next.js-Anwendung

**Intlayer** ist eine Suite von Paketen, die speziell für JavaScript-Entwickler entwickelt wurde. Es ist kompatibel mit Frameworks wie React, Next.js und Express.js.

**Das `next-intlayer`-Paket** ermöglicht es Ihnen, Ihre Next.js-Anwendung zu internationalisieren. Es bietet Kontext-Provider und Hooks für die Internationalisierung von Next.js. Darüber hinaus enthält es das Next.js-Plugin zur Integration von Intlayer mit [Webpack](https://webpack.js.org/) oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Weiterleitungen.

## Warum Ihre Next.js-Anwendung internationalisieren?

Die Internationalisierung Ihrer Next.js-Anwendung ist entscheidend, um ein globales Publikum effektiv zu bedienen. Sie ermöglicht es Ihrer Anwendung, Inhalte und Nachrichten in der bevorzugten Sprache jedes Benutzers bereitzustellen. Diese Fähigkeit verbessert die Benutzererfahrung und erweitert die Reichweite Ihrer Anwendung, indem sie für Menschen aus verschiedenen sprachlichen Hintergründen zugänglicher und relevanter wird.

## Warum Intlayer integrieren?

- **JavaScript-gestützte Inhaltsverwaltung**: Nutzen Sie die Flexibilität von JavaScript, um Ihre Inhalte effizient zu definieren und zu verwalten.
- **Typensicheres Umfeld**: Verwenden Sie TypeScript, um sicherzustellen, dass alle Ihre Inhaltsdefinitionen präzise und fehlerfrei sind.
- **Integrierte Inhaltsdateien**: Halten Sie Ihre Übersetzungen in der Nähe ihrer jeweiligen Komponenten, um die Wartbarkeit und Klarheit zu verbessern.

## Installation

Installieren Sie das erforderliche Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install next-intlayer
```

```bash packageManager="yarn"
yarn add next-intlayer
```

```bash packageManager="pnpm"
pnpm add next-intlayer
```

## Beispiel für die Verwendung

Mit Intlayer können Sie Ihre Inhalte strukturiert überall in Ihrem Code deklarieren.

Standardmäßig durchsucht Intlayer Dateien mit der Erweiterung `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> Sie können die Standarderweiterung ändern, indem Sie die Eigenschaft `contentDir` in der [Konfigurationsdatei](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) festlegen.

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
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
    └── components
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
    └── components
        ├── ClientComponent
        │   ├── index.content.cjs
        │   └── index.cjx
        └── ServerComponent
            ├── index.content.cjs
            └── index.cjx
```

### Deklarieren Sie Ihre Inhalte

`next-intlayer` ist für die Zusammenarbeit mit dem [`intlayer`-Paket](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/index.md) konzipiert. `intlayer` ist ein Paket, das es Ihnen ermöglicht, Ihre Inhalte überall in Ihrem Code zu deklarieren. Es wandelt mehrsprachige Inhaltsdeklarationen in strukturierte Wörterbücher um, die nahtlos in Ihre Anwendung integriert werden können.

Hier ist ein Beispiel für eine Inhaltsdeklaration:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

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

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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

### Inhalte in Ihrem Code verwenden

Sobald Sie Ihre Inhalte deklariert haben, können Sie sie in Ihrem Code verwenden. Hier ist ein Beispiel, wie Sie die Inhalte in einer React-Komponente verwenden können:

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Erstellen Sie eine zugehörige Inhaltsdeklaration

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Erstellen Sie eine zugehörige Inhaltsdeklaration

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Erstellen Sie eine zugehörige Inhaltsdeklaration

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Beherrschen der Internationalisierung Ihrer Next.js-Anwendung

Intlayer bietet viele Funktionen, um Ihnen bei der Internationalisierung Ihrer Next.js-Anwendung zu helfen. Hier sind einige der Hauptfunktionen:

- **Internationalisierung von Serverkomponenten**: Intlayer ermöglicht es Ihnen, Ihre Serverkomponenten auf die gleiche Weise wie Ihre Clientkomponenten zu internationalisieren. Das bedeutet, dass Sie dieselben Inhaltsdeklarationen für Client- und Serverkomponenten verwenden können.
- **Middleware zur Spracherkennung**: Intlayer bietet Middleware zur Erkennung der bevorzugten Sprache des Benutzers. Diese Middleware wird verwendet, um die bevorzugte Sprache des Benutzers zu erkennen und ihn auf die entsprechende URL weiterzuleiten, wie in der [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) angegeben.
- **Internationalisierung von Metadaten**: Intlayer bietet eine Möglichkeit, Ihre Metadaten, wie den Titel Ihrer Seite, mit der von Next.js bereitgestellten Funktion `generateMetadata` zu internationalisieren. Sie können die Funktion `getTranslation` verwenden, um Ihre Metadaten zu übersetzen.
- **Internationalisierung von sitemap.xml und robots.txt**: Intlayer ermöglicht es Ihnen, Ihre sitemap.xml- und robots.txt-Dateien zu internationalisieren. Sie können die Funktion `getMultilingualUrls` verwenden, um mehrsprachige URLs für Ihre Sitemap zu generieren.
- **Internationalisierung von URLs**: Intlayer ermöglicht es Ihnen, Ihre URLs mithilfe der Funktion `getMultilingualUrls` zu internationalisieren. Diese Funktion generiert mehrsprachige URLs für Ihre Sitemap.

**Um mehr über diese Funktionen zu erfahren, lesen Sie den Leitfaden [Next.js Internationalisierung (i18n) mit Intlayer und Next.js 15 App Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md).**

## Funktionen des `next-intlayer`-Pakets

Das `next-intlayer`-Paket bietet auch einige Funktionen, die Ihnen bei der Internationalisierung Ihrer Anwendung helfen.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useIntlayerAsync.md)
