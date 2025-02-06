# Inhaltserweiterung Anpassung

## Inhaltsdatei Erweiterungen

Intlayer ermöglicht es Ihnen, die Erweiterungen für Ihre Inhaltsdeklarationsdateien anzupassen. Diese Anpassung bietet Flexibilität bei der Verwaltung von Großprojekten und hilft, Konflikte mit anderen Modulen zu vermeiden.

### Standarderweiterungen

Standardmäßig überwacht Intlayer alle Dateien mit den folgenden Erweiterungen auf Inhaltsdeklarationen:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

Diese Standarderweiterungen sind für die meisten Anwendungen geeignet. Wenn Sie jedoch spezifische Anforderungen haben, können Sie benutzerdefinierte Erweiterungen definieren, um den Buildprozess zu optimieren und das Risiko von Konflikten mit anderen Komponenten zu reduzieren.

### Anpassung von Inhalts-erweiterungen

Um die Dateierweiterungen anzupassen, die Intlayer zur Identifizierung von Inhaltsdeklarationsdateien verwendet, können Sie diese in der Intlayer-Konfigurationsdatei angeben. Dieser Ansatz ist vorteilhaft für Großprojekte, bei denen die Eingrenzung des Überwachungsprozesses die Build-Leistung verbessert.

Hier ist ein Beispiel, wie Sie benutzerdefinierte Inhalteerweiterungen in Ihrer Konfiguration definieren können:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // Ihre benutzerdefinierten Erweiterungen
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.cjs", ".my_content.cjx"], // Ihre benutzerdefinierten Erweiterungen
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    fileExtensions: [".my_content.mjs", ".my_content.mjx"], // Ihre benutzerdefinierten Erweiterungen
  },
};

module.exports = config;
```

In diesem Beispiel gibt die Konfiguration zwei benutzerdefinierte Erweiterungen an: `.my_content.ts` und `.my_content.tsx`. Intlayer wird nur Dateien mit diesen Erweiterungen überwachen, um Wörterbücher zu erstellen.

### Vorteile benutzerdefinierter Erweiterungen

- **Build-Leistung**: Die Eingrenzung der überwachten Dateien kann die Build-Leistung in großen Projekten erheblich verbessern.
- **Konfliktvermeidung**: Benutzerdefinierte Erweiterungen helfen, Konflikte mit anderen JavaScript- oder TypeScript-Dateien in Ihrem Projekt zu vermeiden.
- **Organisation**: Benutzerdefinierte Erweiterungen ermöglichen es Ihnen, Ihre Inhaltsdeklarationsdateien entsprechend den Bedürfnissen Ihres Projekts zu organisieren.

### Richtlinien für benutzerdefinierte Erweiterungen

Bei der Anpassung von Inhaltsdateierweiterungen sollten Sie die folgenden Richtlinien berücksichtigen:

- **Einzigartigkeit**: Wählen Sie Erweiterungen, die innerhalb Ihres Projekts einzigartig sind, um Konflikte zu vermeiden.
- **Konsistente Benennung**: Verwenden Sie konsistente Benennungsarten für eine bessere Lesbarkeit und Wartbarkeit des Codes.
- **Vermeidung gängiger Erweiterungen**: Verzichten Sie auf gängige Erweiterungen wie `.ts` oder `.js`, um Konflikte mit anderen Modulen oder Bibliotheken zu vermeiden.

## Fazit

Die Anpassung von Inhaltsdateierweiterungen in Intlayer ist eine wertvolle Funktion zur Optimierung der Leistung und zur Vermeidung von Konflikten in großangelegten Anwendungen. Indem Sie die in dieser Dokumentation dargelegten Richtlinien befolgen, können Sie Ihre Inhaltsdeklarationen effektiv verwalten und eine reibungslose Integration mit anderen Teilen Ihres Projekts sicherstellen.
