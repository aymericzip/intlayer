---
createdAt: 2024-08-14
updatedAt: 2025-06-29
title: Interesse an Intlayer
description: Entdecken Sie die Vorteile und Nutzen der Verwendung von Intlayer in Ihren Projekten. Verstehen Sie, warum Intlayer sich von anderen Frameworks abhebt.
keywords:
  - Vorteile
  - Nutzen
  - Intlayer
  - Framework
  - Vergleich
slugs:
  - doc
  - concept
  - interest
---

# Intlayer: Ein maßgeschneiderter Weg, Ihre Website zu übersetzen

**Intlayer** ist eine Internationalisierungsbibliothek, die speziell für JavaScript-Entwickler entwickelt wurde. Sie ermöglicht die Deklaration Ihres Inhalts überall in Ihrem Code. Sie wandelt die Deklaration von mehrsprachigem Inhalt in strukturierte Wörterbücher um, um eine einfache Integration in Ihren Code zu gewährleisten. Durch die Verwendung von TypeScript macht **Intlayer** Ihre Entwicklung robuster und effizienter.

## Anwendungsbeispiel

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
// Beispielinhalt für die Komponente mit mehrsprachigem Text
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
jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
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

| Funktion                                      | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **JavaScript-gesteuertes Content-Management** | Nutzen Sie die Flexibilität von JavaScript, um Ihre Inhalte effizient zu definieren und zu verwalten.                                                                                                                                                                                                                                                                                                                                                                               |
| **Typensichere Umgebung**                     | Nutzen Sie TypeScript, um sicherzustellen, dass alle Ihre Inhaltsdefinitionen präzise und fehlerfrei sind.                                                                                                                                                                                                                                                                                                                                                                          |
| **Integrierte Inhaltsdateien**                | Halten Sie Ihre Übersetzungen nahe bei den jeweiligen Komponenten, um die Wartbarkeit und Klarheit zu verbessern.                                                                                                                                                                                                                                                                                                                                                                   |
| **Vereinfachte Einrichtung**                  | Starten Sie schnell mit minimaler Konfiguration, speziell optimiert für Next.js-Projekte.                                                                                                                                                                                                                                                                                                                                                                                           |
| **Server-Komponenten-Unterstützung**          | Perfekt geeignet für Next.js-Serverkomponenten und gewährleistet ein reibungsloses serverseitiges Rendering.                                                                                                                                                                                                                                                                                                                                                                        |
| **Erweiterte Routing-Funktionalität**         | Vollständige Unterstützung für das Routing von Next.js-Apps, die sich nahtlos an komplexe Anwendungsstrukturen anpasst.                                                                                                                                                                                                                                                                                                                                                             |
| **Organisierte Codebasis**                    | Halten Sie Ihre Codebasis besser organisiert: 1 Komponente = 1 Wörterbuch im selben Ordner.                                                                                                                                                                                                                                                                                                                                                                                         |
| **CI Auto-Übersetzung**                       | Füllen Sie Ihre Übersetzungen in Ihrer CI automatisch mit Ihrem eigenen OpenAI API-Schlüssel aus, wodurch die Notwendigkeit einer L10n-Plattform entfällt.                                                                                                                                                                                                                                                                                                                          |
| **MCP-Server-Integration**                    | Bietet einen MCP (Model Context Protocol) Server für IDE-Automatisierung, der nahtloses Content-Management und i18n-Workflows direkt in Ihrer Entwicklungsumgebung ermöglicht. [Mehr erfahren](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/mcp_server.md).                                                                                                                                                                                                        |
| **Markdown-Unterstützung**                    | Importieren und Interpretieren von Markdown-Dateien für mehrsprachige Inhalte wie Datenschutzrichtlinien.                                                                                                                                                                                                                                                                                                                                                                           |
| **Kostenloser visueller Editor & CMS**        | Ein kostenloser visueller Editor und CMS stehen zur Verfügung, wenn Sie mit Content-Autoren für Ihre Übersetzungen zusammenarbeiten müssen. Dies eliminiert erneut die Notwendigkeit einer Lokalisierungsplattform und ermöglicht die Auslagerung von Inhalten aus dem Codebasis.                                                                                                                                                                                                   |
| **Vereinfachte Inhaltsabfrage**               | Es ist nicht erforderlich, Ihre `t`-Funktion für jeden einzelnen Inhalt aufzurufen; rufen Sie alle Ihre Inhalte direkt mit einem einzigen Hook ab.                                                                                                                                                                                                                                                                                                                                  |
| **Konsistente Implementierung**               | Dieselbe Implementierung für sowohl Client- als auch Server-Komponenten, es ist nicht notwendig, Ihre `t`-Funktion über jede Server-Komponente weiterzugeben.                                                                                                                                                                                                                                                                                                                       |
| **Tree-shakable Inhalte**                     | Der Inhalt ist tree-shakable, was das endgültige Bundle erleichtert.                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Nicht-blockierendes statisches Rendering**  | Intlayer blockiert das statische Rendering nicht, wie es `next-intl` tut.                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Interoperabilität**                         | Ermöglicht die Interoperabilität mit [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_next-intl.md) und [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_react-intl.md). |

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Initiale Historie
