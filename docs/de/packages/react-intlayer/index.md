# react-intlayer: NPM-Paket zur Internationalisierung (i18n) einer React-Anwendung

**Intlayer** ist ein Paketestamm, der speziell für JavaScript-Entwickler entwickelt wurde. Es ist mit Frameworks wie React, React und Express.js kompatibel.

**Das `react-intlayer`-Paket** ermöglicht es Ihnen, Ihre React-Anwendung zu internationalisieren. Es bietet Kontextanbieter und Hooks zur Internationalisierung in React.

## Warum Ihre React-Anwendung internationalisieren?

Die Internationalisierung Ihrer React-Anwendung ist unerlässlich, um ein globales Publikum effektiv zu bedienen. Sie ermöglicht es Ihrer Anwendung, Inhalte und Nachrichten in der bevorzugten Sprache jedes Benutzers bereitzustellen. Diese Fähigkeit verbessert das Benutzererlebnis und erweitert die Reichweite Ihrer Anwendung, indem sie für Menschen aus unterschiedlichen Sprachhintergründen zugänglicher und relevanter wird.

## Warum Intlayer integrieren?

- **JavaScript-gestütztes Content-Management**: Nutzen Sie die Flexibilität von JavaScript, um Ihre Inhalte effizient zu definieren und zu verwalten.
- **Typensicheres Umfeld**: Nutzen Sie TypeScript, um sicherzustellen, dass alle Ihre Inhaltsdefinitionen genau und fehlerfrei sind.
- **Integrierte Inhaltsdateien**: Halten Sie Ihre Übersetzungen in der Nähe ihrer jeweiligen Komponenten, um die Wartbarkeit und Klarheit zu verbessern.

## Installation

Installieren Sie das notwendige Paket mit Ihrem bevorzugten Paketmanager:

```bash packageManager="npm"
npm install react-intlayer
```

```bash packageManager="yarn"
yarn add react-intlayer
```

```bash packageManager="pnpm"
pnpm add react-intlayer
```

## Beispiel der Verwendung

Mit Intlayer können Sie Ihre Inhalte an einer strukturierten Stelle in Ihrem Code deklarieren.

Standardmäßig durchsucht Intlayer nach Dateien mit der Erweiterung `.content.{ts,tsx,js,jsx,mjs,cjs}`.

> Sie können die Standarderweiterung ändern, indem Sie die `contentDir`-Eigenschaft in der [Konfigurationsdatei](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) festlegen.

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    └── components
        ├── Component1
        │   ├── index.content.ts
        │   └── index.tsx
        └── Component2
            ├── index.content.ts
            └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.mjs
        │   └── index.mjx
        └── Component2
            ├── index.content.mjs
            └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    └── components
        ├── Component1
        │   ├── index.content.cjs
        │   └── index.cjx
        └── Component2
            ├── index.content.cjs
            └── index.cjx
```

### Deklarieren Sie Ihre Inhalte

`react-intlayer` ist dafür gemacht, mit dem [`intlayer`-Paket](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/intlayer/index.md) zu arbeiten. `intlayer` ist ein Paket, das Ihnen ermöglicht, Ihre Inhalte überall in Ihrem Code zu deklarieren. Es konvertiert mehrsprachige Inhaltsdeklarationen in strukturierte Wörterbücher, die nahtlos in Ihre Anwendung integriert werden.

Hier ist ein Beispiel für eine Inhaltsdeklaration:

```tsx filePath="src/Component1/index.content.ts" codeFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const component1Content = {
  key: "component-1",
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

export default component1Content;
```

```jsx filePath="src/Component1/index.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const component1Content = {
  key: "component-1",
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

export default component1Content;
```

```jsx filePath="src/Component1/index.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const component1Content = {
  key: "component-1",
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

module.exports = component1Content;
```

```json filePath="src/Component1/index.content.json" codeFormat="json"
{
  "key": "component-1",
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

### Nutzen Sie Inhalte in Ihrem Code

Sobald Sie Ihre Inhalte deklariert haben, können Sie sie in Ihrem Code verwenden. Hier ist ein Beispiel, wie Sie die Inhalte in einer React-Komponente verwenden können:

```tsx {4,7} fileName="src/components/Component1Example.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const Component1Example: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Verknüpfen Sie die damit verbundene Inhaltsdeklaration

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "react-intlayer";

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Verknüpfen Sie die damit verbundene Inhaltsdeklaration

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/Component1Example.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("react-intlayer");

const Component1Example = () => {
  const { myTranslatedContent } = useIntlayer("component-1"); // Verknüpfen Sie die damit verbundene Inhaltsdeklaration

  return (
    <div>
      <p>{myTranslatedContent}</p>
    </div>
  );
};
```

## Die Internationalisierung Ihrer React-Anwendung meistern

Intlayer bietet viele Funktionen, um Ihnen bei der Internationalisierung Ihrer React-Anwendung zu helfen.

**Um mehr über diese Funktionen zu erfahren, lesen Sie den [React Internationalization (i18n) mit Intlayer und Vite und React](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_vite+react.md) Leitfaden für Vite und React-Anwendungen oder den [React Internationalization (i18n) mit Intlayer und React (CRA)](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md) Leitfaden für React Create App.**

## Funktionen des `react-intlayer`-Pakets

Das `react-intlayer`-Paket bietet auch einige Funktionen, die Ihnen helfen, Ihre Anwendung zu internationalisieren.

- [`t()`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/t.md)
- [`useIntlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useIntlayer.md)
- [`useDictionary()`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useDictionary.md)
- [`useLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useLocale.md)
- [`useIntlayerAsync()`](https://github.com/aymericzip/intlayer/blob/main/docs/de/packages/react-intlayer/useIntlayerAsync.md)
