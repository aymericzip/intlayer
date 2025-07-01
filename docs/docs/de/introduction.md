---
docName: einführung
url: https://intlayer.org/doc/get-started
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/einführung.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Einführung
description: Entdecken Sie, wie Intlayer funktioniert. Sehen Sie die Schritte, die Intlayer in Ihrer Anwendung verwendet. Erfahren Sie, was die verschiedenen Pakete tun.
keywords:
  - Einführung
  - Erste Schritte
  - Intlayer
  - Anwendung
  - Pakete
---

# Intlayer Dokumentation

Willkommen in der offiziellen Intlayer-Dokumentation! Hier finden Sie alles, was Sie benötigen, um Intlayer zu integrieren, zu konfigurieren und zu meistern – für all Ihre Internationalisierungs- (i18n) Anforderungen, egal ob Sie mit Next.js, React, Vite, Express oder einer anderen JavaScript-Umgebung arbeiten.

## Einführung

### Was ist Intlayer?

**Intlayer** ist eine Internationalisierungsbibliothek, die speziell für JavaScript-Entwickler entwickelt wurde. Sie ermöglicht die Deklaration Ihres Inhalts überall in Ihrem Code. Sie wandelt die Deklaration mehrsprachiger Inhalte in strukturierte Wörterbücher um, die sich leicht in Ihren Code integrieren lassen. Durch die Verwendung von TypeScript macht **Intlayer** Ihre Entwicklung robuster und effizienter.

Intlayer bietet außerdem einen optionalen visuellen Editor, mit dem Sie Ihre Inhalte einfach bearbeiten und verwalten können. Dieser Editor ist besonders nützlich für Entwickler, die eine visuelle Oberfläche für die Inhaltsverwaltung bevorzugen, oder für Teams, die Inhalte erstellen, ohne sich um den Code kümmern zu müssen.

### Beispiel für die Verwendung

```bash
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
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

// Exportiert den Komponenteninhalt als Standardexport
export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Definiert den Komponenteninhalt mit Übersetzungen
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

// Exportiert den Komponenteninhalt als Standardexport
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

// Exportiert den Komponenteninhalt als CommonJS-Modul
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

Intlayer bietet eine Vielzahl von Funktionen, die auf die Bedürfnisse der modernen Webentwicklung zugeschnitten sind. Nachfolgend sind die wichtigsten Funktionen mit Links zu detaillierter Dokumentation aufgeführt:

- **Unterstützung für Internationalisierung**: Erweitern Sie die globale Reichweite Ihrer Anwendung mit integrierter Unterstützung für Internationalisierung.
- **Visueller Editor**: Verbessern Sie Ihren Entwicklungsworkflow mit Editor-Plugins, die für Intlayer entwickelt wurden. Schauen Sie sich den [Leitfaden für den visuellen Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) an.
- **Konfigurationsflexibilität**: Passen Sie Ihre Einrichtung mit umfangreichen Konfigurationsoptionen an, die im [Konfigurationshandbuch](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) detailliert beschrieben sind.
- **Erweiterte CLI-Tools**: Verwalten Sie Ihre Projekte effizient mit der Befehlszeilenschnittstelle von Intlayer. Entdecken Sie die Möglichkeiten in der [CLI-Tools-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md).

## Kernkonzepte

### Wörterbuch

Organisieren Sie Ihre mehrsprachigen Inhalte nahe am Code, um alles konsistent und wartbar zu halten.

- **[Erste Schritte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/get_started.md)**  
  Lernen Sie die Grundlagen der Deklaration Ihrer Inhalte in Intlayer kennen.

- **[Übersetzung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/translation.md)**  
  Verstehen Sie, wie Übersetzungen in Ihrer Anwendung generiert, gespeichert und genutzt werden.

- **[Aufzählung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/enumeration.md)**  
  Verwalten Sie einfach wiederholte oder feste Datensätze über verschiedene Sprachen hinweg.

- **[Bedingung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/conditional.md)**  
  Lernen Sie, wie Sie bedingte Logik in Intlayer verwenden, um dynamische Inhalte zu erstellen.

- **[Einfügung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/insertion.md)**  
  Entdecken Sie, wie Sie Werte in einen String mit Einfügeplatzhaltern einfügen können.

- **[Funktionsabruf](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/function_fetching.md)**  
  Erfahren Sie, wie Sie Inhalte dynamisch mit benutzerdefinierter Logik abrufen, um den Workflow Ihres Projekts anzupassen.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/markdown.md)**  
  Lernen Sie, wie Sie Markdown in Intlayer verwenden, um reichhaltige Inhalte zu erstellen.

- **[Dateieinbettungen](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/file_embeddings.md)**  
  Entdecken Sie, wie Sie externe Dateien in Intlayer einbetten, um sie im Content-Editor zu verwenden.

- **[Verschachtelung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/nesting.md)**  
  Verstehen Sie, wie Sie Inhalte in Intlayer verschachteln, um komplexe Strukturen zu erstellen.

### Umgebungen & Integrationen

Wir haben Intlayer mit Blick auf Flexibilität entwickelt und bieten nahtlose Integration in beliebte Frameworks und Build-Tools:

- **[Intlayer mit Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md)**
- **[Intlayer mit Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_14.md)**
- **[Intlayer mit Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_page_router.md)**
- **[Intlayer mit React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md)**
- **[Intlayer mit Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_vite+react.md)**
- **[Intlayer mit React Native und Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_react_native+expo.md)**
- **[Intlayer mit Lynx und React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_lynx+react.md)**
- **[Intlayer mit Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_express.md)**

Jeder Integrationsleitfaden enthält bewährte Methoden zur Nutzung der Intlayer-Funktionen wie **Server-Side Rendering**, **dynamisches Routing** oder **Client-Side Rendering**, damit Sie eine schnelle, SEO-freundliche und hoch skalierbare Anwendung aufrechterhalten können.

## Beiträge & Feedback

Wir schätzen die Kraft von Open-Source und gemeinschaftsgetriebener Entwicklung. Wenn Sie Verbesserungen vorschlagen, einen neuen Leitfaden hinzufügen oder Fehler in unserer Dokumentation korrigieren möchten, können Sie gerne einen Pull Request einreichen oder ein Issue in unserem [GitHub-Repository](https://github.com/aymericzip/intlayer/blob/main/docs/docs) eröffnen.

**Bereit, Ihre Anwendung schneller und effizienter zu übersetzen?** Tauchen Sie in unsere Dokumentation ein, um noch heute mit Intlayer zu starten. Erleben Sie einen robusten, optimierten Ansatz zur Internationalisierung, der Ihre Inhalte organisiert und Ihr Team produktiver macht.

---

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Initiale Historie
