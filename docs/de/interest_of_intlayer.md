# Intlayer: Ein näherer Weg, Ihre Anwendung zu übersetzen

**Intlayer** ist eine Internationalisierungsbibliothek, die speziell für JavaScript-Entwickler entwickelt wurde. Sie ermöglicht die Deklaration Ihrer Inhalte überall in Ihrem Code. Sie wandelt die Deklaration von mehrsprachigen Inhalten in strukturierte Wörterbücher um, die leicht in Ihren Code integriert werden können. Mit TypeScript macht **Intlayer** Ihre Entwicklung stärker und effizienter.

## Beispiel der Nutzung

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── MyComponent
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="./Components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Kommentar: Definition des Inhalts für die Komponente
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Kommentar: Definition des Inhalts für die Komponente
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./Components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

// Kommentar: Beispielkomponente, die den übersetzten Inhalt verwendet
const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

// Kommentar: Beispielkomponente, die den übersetzten Inhalt verwendet
const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## Warum Intlayer wählen?

- **JavaScript-gestützte Inhaltsverwaltung**: Nutzen Sie die Flexibilität von JavaScript, um Ihre Inhalte effizient zu definieren und zu verwalten.
- **Typensicheres Umfeld**: Verwenden Sie TypeScript, um sicherzustellen, dass alle Ihre Inhaltsdefinitionen präzise und fehlerfrei sind.
- **Integrierte Inhaltsdateien**: Halten Sie Ihre Übersetzungen nah an ihren jeweiligen Komponenten, um Wartbarkeit und Klarheit zu verbessern.
- **Vereinfachte Einrichtung**: Schnell einsatzbereit mit minimaler Konfiguration, besonders optimiert für Next.js-Projekte.
- **Unterstützung für Serverkomponenten**: Perfekt geeignet für Next.js-Serverkomponenten, um ein reibungsloses serverseitiges Rendering zu gewährleisten.
- **Verbessertes Routing**: Volle Unterstützung für Next.js-App-Routing, das sich nahtlos an komplexe Anwendungsstrukturen anpasst.
- **Interoperabilität**: Ermöglicht die Interoperabilität mit [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_next-intl.md) und [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_react-intl.md).
