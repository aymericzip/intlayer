---
docName: introduction
url: /doc/get-started
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/introduction.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Einführung
description: Entdecken Sie, wie Intlayer funktioniert. Sehen Sie die Schritte, die von Intlayer in Ihrer Anwendung verwendet werden. Sehen Sie, was die verschiedenen Pakete tun.
keywords:
  - Einführung
  - Loslegen
  - Intlayer
  - Anwendung
  - Pakete
---

# Intlayer Dokumentation

Willkommen bei der offiziellen Intlayer-Dokumentation! Hier finden Sie alles, was Sie benötigen, um Intlayer für Ihre Internationalisierungsanforderungen (i18n) zu integrieren, zu konfigurieren und zu beherrschen, egal ob Sie mit Next.js, React, Vite, Express oder einer anderen JavaScript-Umgebung arbeiten.

## Einführung

### Was ist Intlayer?

**Intlayer** ist eine Internationalisierungsbibliothek, die speziell für JavaScript-Entwickler entwickelt wurde. Sie ermöglicht die Deklaration Ihrer Inhalte überall in Ihrem Code. Sie wandelt die Deklaration von mehrsprachigen Inhalten in strukturierte Wörterbücher um, die sich leicht in Ihren Code integrieren lassen. Mit TypeScript macht **Intlayer** Ihre Entwicklung robuster und effizienter.

Intlayer bietet auch einen optionalen visuellen Editor, mit dem Sie Ihre Inhalte einfach bearbeiten und verwalten können. Dieser Editor ist besonders nützlich für Entwickler, die eine visuelle Oberfläche für die Inhaltsverwaltung bevorzugen, oder für Teams, die Inhalte generieren, ohne sich um den Code kümmern zu müssen.

### Beispiel für die Nutzung

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

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## Hauptfunktionen

Intlayer bietet eine Vielzahl von Funktionen, die auf die Anforderungen der modernen Webentwicklung zugeschnitten sind. Nachfolgend finden Sie die wichtigsten Funktionen mit Links zu detaillierten Dokumentationen:

- **Unterstützung für Internationalisierung**: Erweitern Sie die globale Reichweite Ihrer Anwendung mit integrierter Unterstützung für Internationalisierung.
- **Visueller Editor**: Verbessern Sie Ihren Entwicklungsworkflow mit Editor-Plugins, die für Intlayer entwickelt wurden. Schauen Sie sich den [Leitfaden für den visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md) an.
- **Flexible Konfiguration**: Passen Sie Ihre Einrichtung mit umfangreichen Konfigurationsoptionen an, die im [Konfigurationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) beschrieben sind.
- **Erweiterte CLI-Tools**: Verwalten Sie Ihre Projekte effizient mit der Befehlszeilenschnittstelle von Intlayer. Entdecken Sie die Möglichkeiten in der [CLI-Tools-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md).

## Kernkonzepte

### Wörterbuch

Organisieren Sie Ihre mehrsprachigen Inhalte in der Nähe Ihres Codes, um alles konsistent und wartbar zu halten.

- **[Erste Schritte](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/get_started.md)**  
  Erfahren Sie die Grundlagen der Deklaration Ihrer Inhalte in Intlayer.

- **[Übersetzung](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/translation.md)**  
  Verstehen Sie, wie Übersetzungen generiert, gespeichert und in Ihrer Anwendung genutzt werden.

- **[Aufzählung](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/enumeration.md)**  
  Verwalten Sie wiederholte oder feste Datensätze in verschiedenen Sprachen einfach.

- **[Funktionales Abrufen](https://github.com/aymericzip/intlayer/blob/main/docs/de/dictionary/function_fetching.md)**  
  Erfahren Sie, wie Sie Inhalte dynamisch mit benutzerdefinierter Logik abrufen können, um den Workflow Ihres Projekts anzupassen.

### Umgebungen & Integrationen

Wir haben Intlayer mit Flexibilität im Hinterkopf entwickelt und bieten nahtlose Integration in beliebte Frameworks und Build-Tools:

- **[Intlayer mit Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md)**
- **[Intlayer mit Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_14.md)**
- **[Intlayer mit Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_page_router.md)**
- **[Intlayer mit React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md)**
- **[Intlayer mit Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_vite+react.md)**
- **[Intlayer mit Express](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_express.md)**

Jeder Integrationsleitfaden enthält Best Practices für die Nutzung der Funktionen von Intlayer – wie **Server-Side Rendering**, **dynamisches Routing** oder **Client-Side Rendering** – damit Sie eine schnelle, SEO-freundliche und hoch skalierbare Anwendung beibehalten können.

## Mitwirken & Feedback

Wir schätzen die Kraft von Open Source und Community-getriebener Entwicklung. Wenn Sie Verbesserungen vorschlagen, einen neuen Leitfaden hinzufügen oder Probleme in unserer Dokumentation korrigieren möchten, können Sie gerne eine Pull-Anfrage einreichen oder ein Problem in unserem [GitHub-Repository](https://github.com/aymericzip/intlayer/blob/main/docs) eröffnen.

**Bereit, Ihre Anwendung schneller und effizienter zu übersetzen?** Tauchen Sie in unsere Dokumentation ein, um Intlayer noch heute zu nutzen. Erleben Sie einen robusten, optimierten Ansatz für Internationalisierung, der Ihre Inhalte organisiert und Ihr Team produktiver macht.

Viel Erfolg beim Übersetzen!
