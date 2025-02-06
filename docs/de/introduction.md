# Intlayer Dokumentation

Willkommen zur Intlayer Dokumentation. Diese Anleitung bietet einen Überblick über Intlayer, seine Hauptmerkmale und wie Sie diese Dokumente effektiv nutzen können, um Ihr Entwicklungserlebnis zu verbessern.

## Einführung

### Was ist Intlayer?

**Intlayer** ist eine Internationalisierungsbibliothek, die speziell für JavaScript-Entwickler entwickelt wurde. Es ermöglicht die Deklaration Ihres Inhalts überall in Ihrem Code. Es wandelt die Deklaration mehrsprachiger Inhalte in strukturierte Wörterbücher um, um sie einfach in Ihren Code zu integrieren. Mit TypeScript macht **Intlayer** Ihre Entwicklung stärker und effizienter.

Intlayer bietet auch einen optionalen visuellen Editor, der es Ihnen ermöglicht, Ihren Inhalt einfach zu bearbeiten und zu verwalten. Dieser Editor ist besonders nützlich für Entwickler, die eine visuelle Schnittstelle für das Content-Management bevorzugen, oder für Teams, die Inhalte erzeugen, ohne sich um den Code kümmern zu müssen.

## Beispiel für die Nutzung

```bash codeFormat="typescript"
.
└── Komponenten
    └── meinKomponente
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Komponenten
    └── meinKomponente
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── Komponenten
    └── meinKomponente
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="src/components/meinKomponente/meinKomponente.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/components/meinKomponente/meinKomponente.content.mjs" contentDeclarationFormat="esm"
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

```javascript fileName="src/components/meinKomponente/meinKomponente.content.cjs" contentDeclarationFormat="commonjs"
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

```json fileName="src/components/meinKomponente/meinKomponente.content.json" contentDeclarationFormat="json"
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

```tsx fileName="src/components/meinKomponente/MeinKomponente.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MeinKomponente: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/meinKomponente/MeinKomponente.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MeinKomponente = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/meinKomponente/MeinKomponente.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MeinKomponente = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Hauptmerkmale

Intlayer bietet eine Vielzahl von Funktionen, die auf die Bedürfnisse der modernen Webentwicklung zugeschnitten sind. Nachfolgend finden Sie die wichtigsten Merkmale, mit Links zu detaillierten Dokumentationen für jedes:

- **Internationalisierungsunterstützung**: Verbessern Sie die globale Reichweite Ihrer Anwendung mit integrierter Unterstützung für Internationalisierung.
- **Visueller Editor**: Verbessern Sie Ihren Entwicklungsworkflow mit Editor-Plugins, die für Intlayer entwickelt wurden. Schauen Sie sich die [Visueller Editor Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md) an.
- **Konfigurationsflexibilität**: Passen Sie Ihr Setup mit umfangreichen Konfigurationsmöglichkeiten an, die im [Konfigurationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) beschrieben sind.
- **Erweiterte CLI-Tools**: Verwalten Sie Ihre Projekte effizient mit der Befehlszeilenschnittstelle von Intlayer. Entdecken Sie die Funktionen in der [CLI-Tools Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md).
- **Kompatibilität mit i18n**: Intlayer funktioniert nahtlos mit anderen Internationalisierungsbibliotheken. Schauen Sie sich den [i18n Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_i18next.md) für weitere Informationen an.

### Unterstützte Plattformen

Intlayer ist so konzipiert, dass es nahtlos mit Next.js und React-Anwendungen funktioniert. Es unterstützt auch Vite und Create React App.

- **Next.js Integration**: Nutzen Sie die Leistung von Next.js innerhalb von Intlayer für serverseitiges Rendering und statische Seitengenerierung. Details sind in unserem [Next.js Integrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md) verfügbar.
- **Vite und React Integration**: Nutzen Sie Vite innerhalb von Intlayer für serverseitiges Rendering und statische Seitengenerierung. Details sind in unserem [Vite und React Integrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_vite+react.md) verfügbar.
- **Create React App Integration**: Nutzen Sie die Leistung von Create React App innerhalb von Intlayer für serverseitiges Rendering und statische Seitengenerierung. Details sind in unserem [Create React App Integrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md) verfügbar.

### So verwenden Sie diese Dokumentation

Um das Beste aus dieser Dokumentation herauszuholen:

1. **Navigieren Sie zu den relevanten Abschnitten**: Nutzen Sie die oben bereitgestellten Links, um direkt zu den Abschnitten zu gelangen, die Ihren Bedürfnissen entsprechen.
2. **Interaktive Beispiele**: Nutzen Sie, wo verfügbar, interaktive Beispiele, um zu sehen, wie Funktionen in Echtzeit funktionieren.
3. **Feedback und Beiträge**: Ihr Feedback ist wertvoll. Wenn Sie Vorschläge oder Korrekturen haben, ziehen Sie in Betracht, zur Dokumentation beizutragen.
