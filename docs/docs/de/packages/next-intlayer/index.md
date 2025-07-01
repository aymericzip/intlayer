---
docName: package__next-intlayer
url: https://intlayer.org/doc/packages/next-intlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/index.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Paketdokumentation | next-intlayer
description: Siehe, wie man das next-intlayer Paket verwendet
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

**Intlayer** ist eine Sammlung von Paketen, die speziell für JavaScript-Entwickler entwickelt wurden. Es ist kompatibel mit Frameworks wie React, Next.js und Express.js.

**Das `next-intlayer`-Paket** ermöglicht es Ihnen, Ihre Next.js-Anwendung zu internationalisieren. Es stellt Kontext-Provider und Hooks für die Internationalisierung in Next.js bereit. Zusätzlich enthält es das Next.js-Plugin zur Integration von Intlayer mit [Webpack](https://webpack.js.org/) oder [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) sowie Middleware zur Erkennung der bevorzugten Sprache des Benutzers, zur Verwaltung von Cookies und zur Handhabung von URL-Weiterleitungen.

## Warum sollten Sie Ihre Next.js-Anwendung internationalisieren?

Die Internationalisierung Ihrer Next.js-Anwendung ist entscheidend, um ein globales Publikum effektiv zu bedienen. Sie ermöglicht es Ihrer Anwendung, Inhalte und Nachrichten in der bevorzugten Sprache jedes Benutzers bereitzustellen. Diese Fähigkeit verbessert die Benutzererfahrung und erweitert die Reichweite Ihrer Anwendung, indem sie für Menschen aus verschiedenen sprachlichen Hintergründen zugänglicher und relevanter wird.

## Warum Intlayer integrieren?

- **JavaScript-basiertes Content-Management**: Nutzen Sie die Flexibilität von JavaScript, um Ihre Inhalte effizient zu definieren und zu verwalten.
- **Typensichere Umgebung**: Verwenden Sie TypeScript, um sicherzustellen, dass alle Ihre Inhaltsdefinitionen präzise und fehlerfrei sind.
- **Integrierte Content-Dateien**: Halten Sie Ihre Übersetzungen nahe bei den jeweiligen Komponenten, um Wartbarkeit und Übersichtlichkeit zu verbessern.

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

## Anwendungsbeispiel

Mit Intlayer können Sie Ihre Inhalte strukturiert an beliebiger Stelle in Ihrem Code deklarieren.

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

`next-intlayer` ist dafür gemacht, mit dem [`intlayer`-Paket](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/index.md) zu arbeiten. `intlayer` ist ein Paket, das es Ihnen ermöglicht, Ihren Inhalt überall im Code zu deklarieren. Es wandelt mehrsprachige Inhaltsdeklarationen in strukturierte Wörterbücher um, die sich nahtlos in Ihre Anwendung integrieren.

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
      "<-1": "Less than minus one car",
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

### Verwendung von Inhalten in Ihrem Code

Sobald Sie Ihren Inhalt deklariert haben, können Sie ihn in Ihrem Code verwenden. Hier ist ein Beispiel, wie Sie den Inhalt in einer React-Komponente verwenden:

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const { myTranslatedContent } = useIntlayer("client-component"); // Erstelle zugehörige Inhaltsdeklaration

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
  const { myTranslatedContent } = useIntlayer("client-component"); // Erstelle zugehörige Inhaltsdeklaration

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
  const { myTranslatedContent } = useIntlayer("client-component"); // Erstelle zugehörige Inhaltsdeklaration

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Beherrschung der Internationalisierung Ihrer Next.js-Anwendung

Intlayer bietet viele Funktionen, die Ihnen helfen, Ihre Next.js-Anwendung zu internationalisieren. Hier sind einige der wichtigsten Funktionen:

- **Internationalisierung von Server-Komponenten**: Intlayer ermöglicht es Ihnen, Ihre Server-Komponenten auf die gleiche Weise zu internationalisieren wie Ihre Client-Komponenten. Das bedeutet, dass Sie dieselben Inhaltsdeklarationen sowohl für Client- als auch für Server-Komponenten verwenden können.
- **Middleware zur Spracherkennung**: Intlayer stellt Middleware bereit, um die bevorzugte Sprache des Benutzers zu erkennen. Diese Middleware wird verwendet, um die bevorzugte Sprache des Benutzers zu ermitteln und ihn auf die entsprechende URL weiterzuleiten, wie in der [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) angegeben.
- **Internationalisierung von Metadaten**: Intlayer bietet eine Möglichkeit, Ihre Metadaten zu internationalisieren, wie z. B. den Titel Ihrer Seite, mithilfe der von Next.js bereitgestellten Funktion `generateMetadata`. Sie können die Funktion `getTranslation` verwenden, um Ihre Metadaten zu übersetzen.
- **Internationalisierung von sitemap.xml und robots.txt**: Intlayer ermöglicht die Internationalisierung Ihrer sitemap.xml- und robots.txt-Dateien. Sie können die Funktion `getMultilingualUrls` verwenden, um mehrsprachige URLs für Ihre Sitemap zu generieren.
- **Internationalisierung von URLs**: Intlayer ermöglicht die Internationalisierung Ihrer URLs durch die Verwendung der Funktion `getMultilingualUrls`. Diese Funktion generiert mehrsprachige URLs für Ihre Sitemap.

**Um mehr über diese Funktionen zu erfahren, lesen Sie den Leitfaden [Next.js Internationalisierung (i18n) mit Intlayer und Next.js 15 App Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md).**

## Vom Paket `next-intlayer` bereitgestellte Funktionen

- Das `next-intlayer`-Paket stellt auch einige Funktionen bereit, die Ihnen helfen, Ihre Anwendung zu internationalisieren.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/next-intlayer/useIntlayerAsync.md)

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Initiale Historie
