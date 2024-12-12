# Intlayer: Eine engere Möglichkeit, Ihre Anwendung zu übersetzen

**Intlayer** ist eine Internationalisierungsbibliothek, die speziell für JavaScript-Entwickler entwickelt wurde. Sie ermöglicht die Deklaration Ihrer Inhalte überall in Ihrem Code. Sie wandelt die Deklaration mehrsprachiger Inhalte in strukturierte Wörterbücher um, die sich leicht in Ihren Code integrieren lassen. Mit TypeScript macht **Intlayer** Ihre Entwicklung stärker und effizienter.

## Beispiel für die Verwendung

```bash
.
├── Komponente1
│   ├── index.content.ts
│   └── index.tsx
└── Komponente2
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./Komponente1/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const component1Content = {
  key: "komponente1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default component1Content;
```

```tsx
// ./Komponente1/index.tsx

import { useIntlayer } from "react-intlayer";

export const Component1 = () => {
  const { myTranslatedContent } = useIntlayer("komponente1");

  return <span>{myTranslatedContent}</span>;
};
```

## Warum Intlayer wählen?

- **JavaScript-gestütztes Inhaltsmanagement**: Nutzen Sie die Flexibilität von JavaScript, um Ihre Inhalte effizient zu definieren und zu verwalten.
- **Typensichere Umgebung**: Nutzen Sie TypeScript, um sicherzustellen, dass alle Ihre Inhaltsdefinitionen präzise und fehlerfrei sind.
- **Integrierte Inhaltsdateien**: Halten Sie Ihre Übersetzungen in der Nähe ihrer jeweiligen Komponenten, um die Wartbarkeit und Klarheit zu verbessern.
- **Vereinfachte Einrichtung**: Schnell einsatzbereit mit minimaler Konfiguration, besonders optimiert für Next.js-Projekte.
- **Unterstützung für Serverkomponenten**: Perfekt geeignet für Next.js-Serverkomponenten, die ein reibungsloses serverseitiges Rendering gewährleisten.
- **Verbesserte Routing**: Vollständige Unterstützung für das Routing von Next.js-Apps, das sich nahtlos an komplexe Anwendungsstrukturen anpasst.
- **Interoperabilität**: Ermöglicht i18next-Interoperabilität. (Beta)
