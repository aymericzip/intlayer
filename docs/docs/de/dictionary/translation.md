---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Übersetzung
description: Entdecken Sie, wie Sie Übersetzungen in Ihrer mehrsprachigen Website deklarieren und verwenden können. Folgen Sie den Schritten in dieser Online-Dokumentation, um Ihr Projekt in wenigen Minuten einzurichten.
keywords:
  - Übersetzung
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - translation
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initialer Verlauf"
---

# Übersetzung

## Übersetzungen definieren

Die Funktion `t` in `intlayer` ermöglicht es Ihnen, Inhalte in mehreren Sprachen zu deklarieren. Diese Funktion gewährleistet Typsicherheit und löst einen Fehler aus, wenn Übersetzungen fehlen, was besonders in TypeScript-Umgebungen nützlich ist.

Hier ist ein Beispiel, wie man Inhalte mit Übersetzungen deklariert.

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

interface Content {
  welcomeMessage: string;
}

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies Dictionary<Content>;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "multi_lang",
  "content": {
    "welcomeMessage": {
      "nodeType": "translation",
      "translation": {
        "en": "Welcome to our application",
        "fr": "Bienvenue dans notre application",
        "es": "Bienvenido a nuestra aplicación"
      }
    }
  }
}
```

## Konfiguration der Sprachen

Um eine korrekte Übersetzungsverarbeitung sicherzustellen, können Sie die akzeptierten Sprachen in `intlayer.config.ts` konfigurieren. Diese Konfiguration ermöglicht es Ihnen, die Sprachen zu definieren, die Ihre Anwendung unterstützt:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

## Verwendung von Übersetzungen in React-Komponenten

Mit `react-intlayer` können Sie Übersetzungen in React-Komponenten verwenden. Hier ist ein Beispiel:

```jsx fileName="**/*.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const MyComponent: FC = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

Diese Komponente ruft die entsprechende Übersetzung basierend auf der aktuell in Ihrer Anwendung eingestellten Sprache ab.

## Benutzerdefinierte Inhaltsobjekte

`intlayer` unterstützt benutzerdefinierte Inhaltsobjekte für Übersetzungen, die es Ihnen ermöglichen, komplexere Strukturen zu definieren und dabei die Typensicherheit zu gewährleisten. Hier ist ein Beispiel mit einem benutzerdefinierten Objekt:

```typescript fileName="**/*.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

interface ICustomContent {
  title: string;
  content: string;
}

const customContent = {
  key: "custom_content",
  content: {
    profileText: t<ICustomContent>({
      en: {
        title: "Seitentitel",
        content: "Seiteninhalt",
      },
      fr: {
        title: "Titre de la Page",
        content: "Contenu de la Page",
      },
      es: {
        title: "Título de la Página",
        content: "Contenido de la Página",
      },
    }),
  },
} satisfies Dictionary;

export default customContent;
```

```json fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "custom_content",
  "content": {
    "profileText": {
      "nodeType": "translation",
      "translation": {
        "en": {
          "title": "Seitentitel",
          "content": "Seiteninhalt"
        },
        "fr": {
          "title": "Seitentitel",
          "content": "Seiteninhalt"
        },
        "es": {
          "title": "Seitentitel",
          "content": "Seiteninhalt"
        }
      }
    }
  }
}
```
