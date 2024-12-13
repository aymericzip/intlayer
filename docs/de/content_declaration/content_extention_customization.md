# Inhaltserweiterung Anpassung

## Inhaltsdateiendungen

Intlayer ermöglicht es Ihnen, die Erweiterungen für Ihre Inhaltsdeklarationsdateien anzupassen. Diese Anpassung bietet Flexibilität bei der Verwaltung von Projekten in großem Maßstab und hilft, Konflikte mit anderen Modulen zu vermeiden.

### Standarterweiterungen

Standardmäßig überwacht Intlayer alle Dateien mit den folgenden Erweiterungen auf Inhaltsdeklarationen:

- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.mjs`
- `.content.cjs`

Diese Standarderweiterungen sind für die meisten Anwendungen geeignet. Wenn Sie jedoch spezifische Bedürfnisse haben, können Sie benutzerdefinierte Erweiterungen definieren, um den Build-Prozess zu optimieren und das Risiko von Konflikten mit anderen Komponenten zu reduzieren.

### Anpassung der Inhaltserweiterungen

Um die Dateierweiterungen anzupassen, die Intlayer verwendet, um Inhaltsdeklarationsdateien zu identifizieren, können Sie sie in der Intlayer-Konfigurationsdatei angeben. Dieser Ansatz ist vorteilhaft für Projekte in großem Maßstab, da die Begrenzung des Umfangs des Überwachungsprozesses die Build-Leistung verbessert.

Hier ist ein Beispiel, wie Sie benutzerdefinierte Inhaltserweiterungen in Ihrer Konfiguration definieren können:

```typescript
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    fileExtensions: [".my_content.ts", ".my_content.tsx"], // Ihre benutzerdefinierten Erweiterungen
  },
};

export default config;
```

In diesem Beispiel gibt die Konfiguration zwei benutzerdefinierte Erweiterungen an: `.my_content.ts` und `.my_content.tsx`. Intlayer wird nur Dateien mit diesen Erweiterungen überwachen, um Wörterbücher zu erstellen.

### Vorteile von benutzerdefinierten Erweiterungen

- **Build-Leistung**: Die Reduzierung des Umfangs der überwachten Dateien kann die Build-Leistung in großen Projekten erheblich verbessern.
- **Konfliktvermeidung**: Benutzerdefinierte Erweiterungen helfen, Konflikte mit anderen JavaScript- oder TypeScript-Dateien in Ihrem Projekt zu vermeiden.
- **Organisation**: Benutzerdefinierte Erweiterungen ermöglichen es Ihnen, Ihre Inhaltsdeklarationsdateien gemäß den Bedürfnissen Ihres Projekts zu organisieren.

### Richtlinien für benutzerdefinierte Erweiterungen

Bei der Anpassung von Inhaltsdateiendungen sollten Sie die folgenden Richtlinien beachten:

- **Einzigartigkeit**: Wählen Sie Erweiterungen, die innerhalb Ihres Projekts einzigartig sind, um Konflikte zu vermeiden.
- **Konsistente Benennung**: Verwenden Sie konsistente Benennungskonventionen für eine bessere Lesbarkeit und Wartbarkeit des Codes.
- **Vermeidung gängiger Erweiterungen**: Vermeiden Sie die Verwendung gängiger Erweiterungen wie `.ts` oder `.js`, um Konflikte mit anderen Modulen oder Bibliotheken zu verhindern.

## Fazit

Die Anpassung der Inhaltsdateiendungen in Intlayer ist eine wertvolle Funktion zur Optimierung der Leistung und Vermeidung von Konflikten in großen Anwendungen. Indem Sie die in dieser Dokumentation beschriebenen Richtlinien befolgen, können Sie Ihre Inhaltsdeklarationen effektiv verwalten und eine reibungslose Integration mit anderen Teilen Ihres Projekts sicherstellen.
