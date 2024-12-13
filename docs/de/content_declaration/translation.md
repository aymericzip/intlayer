# Übersetzung

## Übersetzungen Definieren

Die `t`-Funktion in `intlayer` ermöglicht es Ihnen, Inhalte in mehreren Sprachen zu deklarieren. Diese Funktion stellt die Typensicherheit sicher und löst einen Fehler aus, wenn bestimmte Übersetzungen fehlen, was insbesondere in TypeScript-Umgebungen nützlich ist.

### Verwendung von TypeScript

Hier ist ein Beispiel, wie man Inhalte mit Übersetzungen in einer TypeScript-Datei deklariert:

```typescript
import { t, type DeclarationContent } from "intlayer";

const multiLangContent = {
  key: "multi_lang",
  content: {
    welcomeMessage: t({
      en: "Willkommen in unserer Anwendung",
      fr: "Bienvenue dans notre application",
      es: "Bienvenido a nuestra aplicación",
    }),
  },
} satisfies DeclarationContent;

export default multiLangContent;
```

### Verwendung von ECMAScript-Modulen

Wenn Sie ECMAScript-Module verwenden, sieht die Deklaration folgendermaßen aus:

```javascript
import { t } from "intlayer";

const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    en: "Willkommen in unserer Anwendung",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

export default multiLangContent;
```

### Verwendung von CommonJS-Modulen

In einem CommonJS-Setup können Sie Übersetzungen wie folgt deklarieren:

```javascript
const { t } = require("intlayer");

const multiLangContent = {
  id: "multi_lang",
  welcomeMessage: t({
    en: "Willkommen in unserer Anwendung",
    fr: "Bienvenue dans notre application",
    es: "Bienvenido a nuestra aplicación",
  }),
};

module.exports = multiLangContent;
```

### Verwendung von JSON

Für JSON-basierte Deklarationen können Sie Übersetzungen wie folgt definieren:

```json
{
  "id": "multi_lang",
  "welcomeMessage": {
    "nodeType": "translation",
    "en": "Willkommen in unserer Anwendung",
    "fr": "Bienvenue dans notre application",
    "es": "Bienvenido a nuestra aplicación"
  }
}
```

## Konfiguration für Lokalisierungen

Um eine ordnungsgemäße Übersetzungsbehandlung sicherzustellen, können Sie die akzeptierten Lokalisierungen in `intlayer.config.ts` konfigurieren. Diese Konfiguration ermöglicht es Ihnen, die Sprachen zu definieren, die Ihre Anwendung unterstützt:

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

Diese Komponente ruft die entsprechende Übersetzung basierend auf der aktuellen Sprache ab, die in Ihrer Anwendung eingestellt ist.

## Benutzerdefinierte Inhaltsobjekte

`intlayer` unterstützt benutzerdefinierte Inhaltsobjekte für Übersetzungen, sodass Sie komplexere Strukturen definieren können, während die Typensicherheit gewährleistet bleibt. Hier ist ein Beispiel mit einem benutzerdefinierten Objekt:

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
        title: "Seitenüberschrift",
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
} satisfies DeclarationContent;

export default customContent;
```
