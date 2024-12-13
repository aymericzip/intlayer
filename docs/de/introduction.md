# Intlayer Dokumentation

Willkommen in der Intlayer-Dokumentation. Dieser Leitfaden bietet einen Überblick über Intlayer, seine Hauptmerkmale und wie Sie diese Dokumente effektiv nutzen können, um Ihre Entwicklererfahrung zu verbessern.

## Einführung

### Was ist Intlayer?

**Intlayer** ist eine Internationalisierungsbibliothek, die speziell für JavaScript-Entwickler entwickelt wurde. Es erlaubt die Deklaration Ihrer Inhalte überall in Ihrem Code. Es konvertiert die Deklaration mehrsprachiger Inhalte in strukturierte Wörterbücher, die sich leicht in Ihren Code integrieren lassen. Mit TypeScript macht **Intlayer** Ihre Entwicklung robuster und effizienter.

Intlayer bietet auch einen optionalen visuellen Editor, mit dem Sie Ihre Inhalte einfach bearbeiten und verwalten können. Dieser Editor ist besonders nützlich für Entwickler, die eine visuelle Oberfläche für das Content-Management bevorzugen, oder für Teams, die Inhalte generieren, ohne sich um den Code kümmern zu müssen.

## Beispiel für die Nutzung

```bash
.
├── ClientComponent
│   ├── index.content.ts
│   └── index.tsx
└── ServerComponent
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./ClientComponent/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentContent;
```

```tsx
// ./ClientComponent/index.tsx
"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponent = () => {
  const { myTranslatedContent } = useIntlayer("client-component");

  return <span>{myTranslatedContent}</span>;
};
```

### Hauptmerkmale

Intlayer bietet eine Vielzahl von Funktionen, die auf die Bedürfnisse der modernen Webentwicklung zugeschnitten sind. Im Folgenden sind die wichtigsten Merkmale aufgeführt, mit Links zu detaillierter Dokumentation für jedes:

- **Internationalisierungsunterstützung**: Erweitern Sie die globale Reichweite Ihrer Anwendung mit integrierter Unterstützung für Internationalisierung.
- **Visueller Editor**: Verbessern Sie Ihren Entwicklungsworkflow mit Editor-Plugins, die für Intlayer entwickelt wurden. Schauen Sie sich den [Visuellen Editor Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_editor.md) an.
- **Konfigurationsflexibilität**: Passen Sie Ihre Einrichtung mit umfangreichen Konfigurationsoptionen an, die im [Konfigurationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/configuration.md) detailliert beschrieben sind.
- **Erweiterte CLI-Tools**: Verwalten Sie Ihre Projekte effizient mit der Befehlszeilenschnittstelle von Intlayer. Erkunden Sie die Funktionen in der [CLI-Tools-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md).
- **Kompatibilität mit i18n**: Intlayer funktioniert nahtlos mit anderen Internationalisierungsbibliotheken. Prüfen Sie den [i18n-Leitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_i18next.md) für weitere Informationen.

### Unterstützte Plattformen

Intlayer ist so konzipiert, dass es nahtlos mit Next.js und React-Anwendungen funktioniert. Es unterstützt auch Vite und Create React App.

- **Next.js-Integration**: Nutzen Sie die Leistung von Next.js innerhalb von Intlayer für serverseitiges Rendering und statische Seitengenerierung. Details sind in unserem [Next.js-Integrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md) verfügbar.
- **Vite- und React-Integration**: Nutzen Sie Vite innerhalb von Intlayer für serverseitiges Rendering und statische Seitengenerierung. Details sind in unserem [Vite- und React-Integrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_vite+react.md) verfügbar.
- **Create React App-Integration**: Nutzen Sie die Leistung von Create React App innerhalb von Intlayer für serverseitiges Rendering und statische Seitengenerierung. Details sind in unserem [Create React App-Integrationsleitfaden](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md) verfügbar.

### So nutzen Sie diese Dokumentation

Um das Beste aus dieser Dokumentation herauszuholen:

1. **Navigieren Sie zu den relevanten Abschnitten**: Verwenden Sie die oben bereitgestellten Links, um direkt zu den Abschnitten zu gelangen, die Ihre Bedürfnisse ansprechen.
2. **Interaktive Beispiele**: Wo verfügbar, nutzen Sie interaktive Beispiele, um zu sehen, wie Funktionen in Echtzeit funktionieren.
3. **Feedback und Beiträge**: Ihr Feedback ist wertvoll. Wenn Sie Vorschläge oder Korrekturen haben, ziehen Sie bitte in Betracht, zur Dokumentation beizutragen.
