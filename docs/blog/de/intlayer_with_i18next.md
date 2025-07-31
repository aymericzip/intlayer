---
createdAt: 2024-12-24
updatedAt: 2025-06-29
title: Intlayer und i18next
description: Integrieren Sie Intlayer mit i18next für optimale Internationalisierung. Vergleichen Sie die beiden Frameworks und lernen Sie, wie Sie sie zusammen konfigurieren.
keywords:
  - Intlayer
  - i18next
  - Internationalisierung
  - i18n
  - Lokalisierung
  - Übersetzung
  - React
  - Next.js
  - JavaScript
  - TypeScript
slugs:
  - blog
  - intlayer-with-i18next
---

# Internationalisierung mit Intlayer und i18next

i18next ist ein Open-Source-Internationalisierungs (i18n) Framework, das für JavaScript-Anwendungen entwickelt wurde. Es wird häufig für die Verwaltung von Übersetzungen, Lokalisierung und Sprachwechsel in Softwareprojekten verwendet. Es hat jedoch einige Einschränkungen, die die Skalierbarkeit und die Entwicklung erschweren können.

Intlayer ist ein weiteres Internationalisierungsframework, das diese Einschränkungen behebt und einen flexibleren Ansatz zur Inhaltsdeklaration und -verwaltung bietet. Lassen Sie uns einige wichtige Unterschiede zwischen i18next und Intlayer sowie deren Konfiguration für optimierte Internationalisierung erkunden.

## Intlayer vs. i18next: Hauptunterschiede

### 1. Inhaltsdeklaration

Bei i18next müssen Übersetzungswörterbücher in einem bestimmten Ordner deklariert werden, was die Skalierbarkeit der Anwendung erschweren kann. Im Gegensatz dazu ermöglicht Intlayer die Deklaration von Inhalten im selben Verzeichnis wie Ihre Komponente. Dies hat mehrere Vorteile:

- **Vereinfachte Inhaltsbearbeitung**: Benutzer müssen nicht nach dem richtigen Wörterbuch suchen, um Änderungen vorzunehmen, wodurch die Fehlerquote verringert wird.
- **Automatische Anpassung**: Wenn sich der Standort einer Komponente ändert oder sie entfernt wird, erkennt Intlayer dies und passt sich automatisch an.

### 2. Komplexität der Konfiguration

Die Konfiguration von i18next kann komplex sein, insbesondere bei der Integration mit serverseitigen Komponenten oder der Konfiguration von Middleware für Frameworks wie Next.js. Intlayer vereinfacht diesen Prozess und bietet eine unkompliziertere Konfiguration.

### 3. Konsistenz der Übersetzungswörterbücher

Die Gewährleistung, dass Übersetzungswörterbücher in verschiedenen Sprachen konsistent sind, kann mit i18next herausfordernd sein. Diese Inkonsistenz kann zu Anwendungsabstürzen führen, wenn sie nicht ordnungsgemäß behandelt wird. Intlayer behebt dies, indem es Einschränkungen für übersetzte Inhalte durchsetzt, um sicherzustellen, dass keine Übersetzung ausgelassen wird und dass der übersetzte Inhalt genau ist.

### 4. TypeScript-Integration

Intlayer bietet eine bessere Integration mit TypeScript, die automatische Vorschläge für Inhalte in Ihrem Code ermöglicht, wodurch die Effizienz der Entwicklung verbessert wird.

### 5. Teilen von Inhalten über Anwendungen hinaus

Intlayer erleichtert das Teilen von Inhaltsdeklarationsdateien über mehrere Anwendungen und gemeinsame Bibliotheken. Diese Funktion erleichtert die Pflege konsistenter Übersetzungen über einen größeren Codebase.

## Wie man i18next-Wörterbücher mit Intlayer generiert

### Konfiguration von Intlayer zum Export von i18next-Wörterbüchern

> Wichtige Hinweise

> Der Export von i18next-Wörterbüchern befindet sich derzeit in der Beta-Phase und gewährleistet keine 1:1-Kompatibilität mit anderen Frameworks. Es wird empfohlen, eine auf Intlayer basierende Konfiguration zu verwenden, um Probleme zu minimieren.

Um i18next-Wörterbücher zu exportieren, müssen Sie Intlayer entsprechend konfigurieren. Im Folgenden finden Sie ein Beispiel dafür, wie Sie Intlayer so einrichten, dass sowohl Intlayer- als auch i18next-Wörterbücher exportiert werden.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    // Geben Sie an, dass Intlayer sowohl Intlayer- als auch i18next-Wörterbücher exportieren wird
    dictionaryOutput: ["intlayer", "i18next"],
    // Relativer Pfad vom Projektstammverzeichnis zum Verzeichnis, in das die i18n-Wörterbücher exportiert werden
    i18nextResourcesDir: "./i18next/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // Geben Sie an, dass Intlayer sowohl Intlayer- als auch i18next-Wörterbücher exportieren wird
    dictionaryOutput: ["intlayer", "i18next"],
    // Relativer Pfad vom Projektstammverzeichnis zum Verzeichnis, in das die i18n-Wörterbücher exportiert werden
    i18nextResourcesDir: "./i18next/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // Geben Sie an, dass Intlayer sowohl Intlayer- als auch i18next-Wörterbücher exportieren wird
    dictionaryOutput: ["intlayer", "i18next"],
    // Relativer Pfad vom Projektstammverzeichnis zum Verzeichnis, in das die i18n-Wörterbücher exportiert werden
    i18nextResourcesDir: "./i18next/dictionaries",
  },
};

module.exports = config;
```

Durch das Hinzufügen von 'i18next' zur Konfiguration generiert Intlayer spezielle i18next-Wörterbücher zusätzlich zu den Intlayer-Wörterbüchern. Beachten Sie, dass das Entfernen von 'intlayer' aus der Konfiguration die Kompatibilität mit React-Intlayer oder Next-Intlayer beeinträchtigen kann.

### Importieren von Wörterbüchern in Ihre i18next-Konfiguration

Um die generierten Wörterbücher in Ihre i18next-Konfiguration zu importieren, können Sie 'i18next-resources-to-backend' verwenden. Hier ist ein Beispiel dafür, wie Sie Ihre i18next-Wörterbücher importieren können:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
// i18n/client.ts

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // Ihre i18next-Konfiguration
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../i18next/dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
// i18n/client.mjs

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // Ihre i18next-Konfiguration
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
// i18n/client.cjs

const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next
  // Ihre i18next-Konfiguration
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/dictionaries/${language}/${namespace}.json`)
    )
  );
```
