# Internationalisierung mit Intlayer und i18next

i18next ist ein Open-Source-Internationalisierungs (i18n) Framework, das für JavaScript-Anwendungen entwickelt wurde. Es wird weit verbreitet verwendet, um Übersetzungen, Lokalisierung und den Wechsel zwischen Sprachen in Softwareprojekten zu verwalten. Allerdings hat es einige Einschränkungen, die die Skalierbarkeit und Entwicklung komplizieren können.

Intlayer ist ein weiteres Internationalisierungsframework, das diese Einschränkungen adressiert und einen flexibleren Ansatz zur Inhaltsdeklaration und -verwaltung bietet. Lassen Sie uns einige der wichtigsten Unterschiede zwischen i18next und Intlayer erkunden und wie man beide für eine optimale Internationalisierung konfiguriert.

## Intlayer vs. i18next: Wichtige Unterschiede

### 1. Inhaltsdeklaration

Bei i18next müssen Übersetzungswörterbücher in einem bestimmten Ordner deklariert werden, was die Skalierbarkeit der Anwendung komplizieren kann. Im Gegensatz dazu erlaubt Intlayer, dass Inhalte im selben Verzeichnis wie Ihre Komponente deklariert werden. Dies hat mehrere Vorteile:

- **Vereinfachte Inhaltsbearbeitung**: Benutzer müssen nicht nach dem richtigen Wörterbuch suchen, um es zu bearbeiten, was die Fehlerwahrscheinlichkeit verringert.
- **Automatische Anpassung**: Wenn sich der Standort einer Komponente ändert oder sie entfernt wird, erkennt Intlayer dies und passt sich automatisch an.

### 2. Konfigurationskomplexität

Die Konfiguration von i18next kann komplex sein, insbesondere bei der Integration mit serverseitigen Komponenten oder der Konfiguration von Middleware für Frameworks wie Next.js. Intlayer vereinfacht diesen Prozess und bietet eine unkompliziertere Konfiguration.

### 3. Konsistenz der Übersetzungswörterbücher

Es kann eine Herausforderung sein, sicherzustellen, dass Übersetzungswörterbücher in verschiedenen Sprachen konsistent sind, wenn man i18next verwendet. Diese Inkonsistenz kann zu Anwendungsabstürzen führen, wenn sie nicht ordnungsgemäß behandelt wird. Intlayer geht dies an, indem es Einschränkungen für übersetzten Inhalt durchsetzt und sicherstellt, dass keine Übersetzung übersehen wird und dass der übersetzte Inhalt genau ist.

### 4. TypeScript-Integration

Intlayer bietet eine bessere Integration mit TypeScript, die Auto-Vervollständigung von Inhalten in Ihrem Code ermöglicht und damit die Effizienz der Entwicklung erhöht.

### 5. Teilen von Inhalten über Anwendungen hinweg

Intlayer erleichtert das Teilen von Inhaltsdeklarationsdateien über mehrere Anwendungen und gemeinsam genutzte Bibliotheken. Dieses Feature macht es einfacher, konsistente Übersetzungen über ein größeres Codebasis zu pflegen.

## Wie man i18next-Wörterbücher mit Intlayer generiert

### Konfigurieren von Intlayer zum Exportieren von i18next-Wörterbüchern

> Wichtige Hinweise
> Der Export von i18next-Wörterbüchern befindet sich derzeit in der Beta-Phase und gewährleistet keine 1:1-Kompatibilität mit anderen Frameworks. Es wird empfohlen, eine auf Intlayer basierende Konfiguration zu verwenden, um Probleme zu minimieren.

Um i18next-Wörterbücher zu exportieren, müssen Sie Intlayer entsprechend konfigurieren. Unten finden Sie ein Beispiel, wie Sie Intlayer einrichten, um sowohl Intlayer- als auch i18next-Wörterbücher zu exportieren.

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    // Geben Sie an, dass Intlayer sowohl Intlayer- als auch i18next-Wörterbücher exportiert
    dictionaryOutput: ["intlayer", "i18next"],
    // Relativer Pfad vom Projektstamm zum Verzeichnis, in dem i18n-Wörterbücher exportiert werden
    i18nDictionariesDir: "./i18n/dictionaries",
  },
};

export default config;
```

Indem 'i18next' in die Konfiguration aufgenommen wird, generiert Intlayer spezielle i18next-Wörterbücher zusätzlich zu den Intlayer-Wörterbüchern. Beachten Sie, dass das Entfernen von 'intlayer' aus der Konfiguration die Kompatibilität mit React-Intlayer oder Next-Intlayer beeinträchtigen kann.

### Importieren von Wörterbüchern in Ihre i18next-Konfiguration

Um die generierten Wörterbücher in Ihre i18next-Konfiguration zu importieren, können Sie 'i18next-resources-to-backend' verwenden. Hier ist ein Beispiel, wie Sie Ihre i18next-Wörterbücher importieren können:

```typescript
// i18n/client.ts

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // Ihre i18next-Konfiguration
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../i18n-dictionaries/${language}/${namespace}.json`)
    )
  );
```
