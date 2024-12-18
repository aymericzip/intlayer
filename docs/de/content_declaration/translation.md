# Übersetzung

## Übersetzungen definieren

Die `t`-Funktion in `intlayer` ermöglicht es Ihnen, Inhalte in mehreren Sprachen zu deklarieren. Diese Funktion gewährleistet die Typensicherheit und löst einen Fehler aus, wenn Übersetzungen fehlen, was in TypeScript-Umgebungen besonders nützlich ist.

### TypeScript verwenden

Hier ist ein Beispiel, wie man Inhalte mit Übersetzungen in einer TypeScript-Datei erklärt:

```typescript
import { t, type DeclarationContent } from "intlayer";

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
} satisfies DeclarationContent<Content>;
```

### ECMAScript-Module verwenden

Wenn Sie ECMAScript-Module verwenden, sieht die Deklaration so aus:

```javascript
import { t } from "intlayer";

export default {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
};
```

### CommonJS-Module verwenden

In einem CommonJS-Setup können Sie Übersetzungen wie folgt deklarieren:

```javascript
const { t } = require("intlayer");

module.exports = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Welcome to our application",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
};
```

### JSON verwenden

Für JSON-basierte Deklarationen können Sie Übersetzungen wie folgt definieren:

```json
{
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

## Konfiguration für Sprachen

Um eine ordnungsgemäße Handhabung der Übersetzungen zu gewährleisten, können Sie die akzeptierten Sprachen in `intlayer.config.ts` konfigurieren. Diese Konfiguration ermöglicht es Ihnen, die Sprachen zu definieren, die Ihre Anwendung unterstützt:

```typescript
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

```jsx
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const content = useIntlayer("multi_lang");

  return (
    <div>
      <p>{content.welcomeMessage}</p>
    </div>
  );
};

export default MyComponent;
```

Diese Komponente ruft die entsprechende Übersetzung basierend auf der aktuellen Sprache in Ihrer Anwendung ab.

## Benutzerdefinierte Inhaltsobjekte

`intlayer` unterstützt benutzerdefinierte Inhaltsobjekte für Übersetzungen, die es Ihnen ermöglichen, komplexere Strukturen zu definieren und dabei die Typensicherheit zu gewährleisten. Hier ist ein Beispiel mit einem benutzerdefinierten Objekt:

```typescript
import { t, type DeclarationContent } from "intlayer";

interface ICustomContent {
  title: string;
  content: string;
}

const customContent = {
  key: "custom_content",
  content: {
    profileText: t<ICustomContent>({
      en: {
        title: "Page Title",
        content: "Page Content",
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
} satisfies DeclarationContent;

export default customContent;
```
