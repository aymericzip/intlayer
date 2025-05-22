# Intlayer: Eine maßgeschneiderte Möglichkeit, Ihre Website zu übersetzen

**Intlayer** ist eine Internationalisierungsbibliothek, die speziell für JavaScript-Entwickler entwickelt wurde. Sie ermöglicht die Deklaration Ihrer Inhalte überall in Ihrem Code. Sie wandelt die Deklaration mehrsprachiger Inhalte in strukturierte Wörterbücher um, die sich leicht in Ihren Code integrieren lassen. Mit TypeScript macht **Intlayer** Ihre Entwicklung robuster und effizienter.

## Verwendungsbeispiel

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

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## Warum Intlayer wählen?

- **JavaScript-basierte Inhaltsverwaltung**: Nutzen Sie die Flexibilität von JavaScript, um Ihre Inhalte effizient zu definieren und zu verwalten.
- **Typsichere Umgebung**: Nutzen Sie TypeScript, um sicherzustellen, dass alle Ihre Inhaltsdefinitionen präzise und fehlerfrei sind.
- **Integrierte Inhaltsdateien**: Halten Sie Ihre Übersetzungen nahe an ihren jeweiligen Komponenten, was die Wartbarkeit und Klarheit verbessert.
- **Vereinfachte Einrichtung**: Starten Sie schnell mit minimaler Konfiguration, besonders optimiert für Next.js-Projekte.
- **Server-Komponenten-Unterstützung**: Perfekt geeignet für Next.js-Server-Komponenten, was ein reibungsloses Server-Side-Rendering gewährleistet.
- **Verbessertes Routing**: Vollständige Unterstützung für Next.js-App-Routing, das sich nahtlos an komplexe Anwendungsstrukturen anpasst.
- **Organisierte Codebasis**: Halten Sie Ihre Codebasis besser organisiert: 1 Komponente = 1 Wörterbuch im gleichen Ordner.
- **Automatische TypeScript-Typen**: TypeScript-Typen werden automatisch implementiert, was Code-Brüche durch umbenannte oder gelöschte Schlüssel verhindert.
- **CI-Automatische Übersetzung**: Füllen Sie Ihre Übersetzungen automatisch in Ihrem CI mit Ihrem eigenen OpenAI API-Schlüssel aus, was die Notwendigkeit einer L10n-Plattform eliminiert.
- **Markdown-Unterstützung**: Importieren und interpretieren Sie Markdown-Dateien für mehrsprachige Inhalte wie Datenschutzrichtlinien.
- **Kostenloser visueller Editor & CMS**: Ein kostenloser visueller Editor und CMS sind verfügbar, wenn Sie mit Content-Autoren für Ihre Übersetzungen arbeiten müssen, was wiederum die Notwendigkeit einer Lokalisierungsplattform beseitigt und die Externalisierung von Inhalten aus der Codebasis ermöglicht.
- **Vereinfachte Inhaltsabrufung**: Keine Notwendigkeit, Ihre `t`-Funktion für jedes Inhaltselement aufzurufen; rufen Sie alle Ihre Inhalte direkt mit einem einzigen Hook ab.
- **Konsistente Implementierung**: Die gleiche Implementierung für Client- und Server-Komponenten, keine Notwendigkeit, Ihre `t`-Funktion durch jede Server-Komponente zu übergeben.
- **Tree-shakable-Inhalte**: Die Inhalte sind tree-shakable, was das endgültige Bundle leichter macht.
- **Nicht-blockierendes statisches Rendering**: Intlayer blockiert das statische Rendering nicht wie `next-intl`.
- **Interoperabilität**: Ermöglicht Interoperabilität mit [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_next-intl.md), und [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_react-intl.md).
