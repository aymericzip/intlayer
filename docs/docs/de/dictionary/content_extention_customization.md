---
docName: dictionary__content_extention_customization
url: https://intlayer.org/doc/concept/content
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dictionary/content_extention_customization.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Anpassung der Inhaltserweiterungen
description: Erfahren Sie, wie Sie die Erweiterungen für Ihre Inhaltsdeklarationsdateien anpassen können. Folgen Sie dieser Dokumentation, um Bedingungen effizient in Ihrem Projekt umzusetzen.
keywords:
  - Anpassung der Inhaltserweiterungen
  - Dokumentation
  - Intlayer
---

# Anpassung der Inhaltserweiterungen

## Erweiterungen von Inhaltsdateien

Intlayer ermöglicht es Ihnen, die Erweiterungen für Ihre Inhaltsdeklarationsdateien anzupassen. Diese Anpassung bietet Flexibilität bei der Verwaltung von Großprojekten und hilft, Konflikte mit anderen Modulen zu vermeiden.

### Standarderweiterungen

Standardmäßig überwacht Intlayer alle Dateien mit den folgenden Erweiterungen für Inhaltsdeklarationen:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Diese Standarderweiterungen sind für die meisten Anwendungen geeignet. Wenn Sie jedoch spezielle Anforderungen haben, können Sie benutzerdefinierte Erweiterungen definieren, um den Build-Prozess zu optimieren und das Risiko von Konflikten mit anderen Komponenten zu verringern.

### Anpassung der Inhaltserweiterungen

Um die Dateierweiterungen anzupassen, die Intlayer zur Identifizierung von Inhaltsdeklarationsdateien verwendet, können Sie diese in der Intlayer-Konfigurationsdatei angeben. Dieser Ansatz ist besonders vorteilhaft für Großprojekte, bei denen die Einschränkung des Überwachungsbereichs die Build-Leistung verbessert.

Hier ist ein Beispiel, wie Sie benutzerdefinierte Inhaltserweiterungen in Ihrer Konfiguration definieren können:

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

In diesem Beispiel gibt die Konfiguration zwei benutzerdefinierte Erweiterungen an: `.my_content.ts` und `.my_content.tsx`. Intlayer überwacht nur Dateien mit diesen Erweiterungen, um Wörterbücher zu erstellen.

### Vorteile benutzerdefinierter Erweiterungen

- **Build-Leistung**: Die Reduzierung des Überwachungsbereichs kann die Build-Leistung in großen Projekten erheblich verbessern.
- **Konfliktvermeidung**: Benutzerdefinierte Erweiterungen helfen, Konflikte mit anderen JavaScript- oder TypeScript-Dateien in Ihrem Projekt zu vermeiden.
- **Organisation**: Benutzerdefinierte Erweiterungen ermöglichen es Ihnen, Ihre Content-Deklarationsdateien entsprechend den Anforderungen Ihres Projekts zu organisieren.

### Richtlinien für benutzerdefinierte Erweiterungen

Beim Anpassen von Content-Dateierweiterungen sollten Sie die folgenden Richtlinien beachten:

- **Einzigartigkeit**: Wählen Sie Erweiterungen, die innerhalb Ihres Projekts einzigartig sind, um Konflikte zu vermeiden.
- **Konsistente Benennung**: Verwenden Sie konsistente Benennungskonventionen für bessere Lesbarkeit und Wartbarkeit des Codes.
- **Vermeidung gängiger Erweiterungen**: Vermeiden Sie die Verwendung gängiger Erweiterungen wie `.ts` oder `.js`, um Konflikte mit anderen Modulen oder Bibliotheken zu verhindern.

## Fazit

Beim Anpassen von Content-Dateierweiterungen in Intlayer handelt es sich um eine wertvolle Funktion zur Optimierung der Leistung und zur Vermeidung von Konflikten in groß angelegten Anwendungen. Wenn Sie die in dieser Dokumentation beschriebenen Richtlinien befolgen, können Sie Ihre Content-Deklarationen effektiv verwalten und eine reibungslose Integration mit anderen Teilen Ihres Projekts sicherstellen.

## Dokumentationshistorie

- 5.5.10 - 2025-06-29: Initiale Historie
