# Intlayer: Eine nähere Möglichkeit, Ihre Anwendung zu übersetzen

**Intlayer** ist eine Internationalisierungsbibliothek, die speziell für JavaScript-Entwickler entwickelt wurde. Sie ermöglicht die Deklaration Ihres Inhalts überall in Ihrem Code. Es wandelt die Deklaration mehrsprachigen Inhalts in strukturierte Wörterbücher um, um eine einfache Integration in Ihren Code zu ermöglichen. Mit TypeScript macht **Intlayer** Ihre Entwicklung robuster und effizienter.

## Beispiel für die Verwendung

```bash codeFormat="typescript"
.
└── Komponenten
    └── meineKomponente
       ├── index.content.ts
       └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Komponenten
    └── meineKomponente
       ├── index.content.cjs
       └── index.mjs
```

```bash codeFormat="esm"
.
└── Komponenten
    └── meineKomponente
       ├── index.content.mjs
       └── index.js
```

```tsx fileName="./Komponenten/MeineKomponente/index.content.ts" codeFormat="typescript"
import { type DeclarationContent, t } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default componentExampleContent;
```

```jsx fileName="./Komponenten/MeineKomponente/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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

```jsx fileName="./Komponenten/MeineKomponente/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
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

```tsx fileName="./Komponenten/MeineKomponente/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Komponenten/MeineKomponente/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Komponenten/MeineKomponente/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## Warum Intlayer wählen?

- **JavaScript-gestütztes Inhaltsmanagement**: Nutzen Sie die Flexibilität von JavaScript, um Ihren Inhalt effizient zu definieren und zu verwalten.
- **Typensicheres Umfeld**: Nutzen Sie TypeScript, um sicherzustellen, dass alle Ihre Inhaltsdefinitionen präzise und fehlerfrei sind.
- **Integrierte Inhaltsdateien**: Halten Sie Ihre Übersetzungen in der Nähe ihrer jeweiligen Komponenten, um Wartbarkeit und Klarheit zu verbessern.
- **Vereinfachte Einrichtung**: Schnell einsatzbereit mit minimaler Konfiguration, speziell optimiert für Next.js-Projekte.
- **Unterstützung für Serverkomponenten**: Perfekt geeignet für Next.js-Serverkomponenten, die ein reibungsloses serverseitiges Rendering gewährleisten.
- **Verbesserte Navigation**: Vollständige Unterstützung für die Next.js-App-Navigation, die sich nahtlos an komplexe Anwendungsstrukturen anpasst.
- **Interoperabilität**: Ermöglicht die Interoperabilität mit i18next. (Beta)
