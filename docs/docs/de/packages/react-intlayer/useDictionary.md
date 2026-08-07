---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: useDictionary Hook - React Intlayer Dokumentation
description: Vollständige Anleitung zur Verwendung des useDictionary Hooks in React-Anwendungen mit Intlayer für eine effiziente Handhabung lokalisierter Inhalte ohne visuellen Editor.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - lokalisierung
  - i18n
  - wörterbuch
  - übersetzung
slugs:
  - doc
  - packages
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Historie initialisiert"
author: aymericzip
---

# useDictionary Hook Documentation

Der `useDictionary` Hook ermöglicht es dir, ein Objekt zu verarbeiten, das wie ein Dictionary aussieht (mit Schlüsseln und Inhalten), und Übersetzungen, Aufzählungen usw. darin zu handhaben. Im Gegensatz zu `useIntlayer`, das für die Arbeit mit generierten Dictionary-Deklarationen ausgelegt ist, ist `useDictionary` flexibler und kann mit jedem Objekt verwendet werden, das der Dictionary-Struktur folgt.

## Beispiel für die Verwendung in React

Nachfolgend ein Beispiel, wie der `useDictionary` Hook in einer React-Komponente verwendet wird:

```tsx fileName="./ComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
tsx fileName="./ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## Zusätzliche Tipps

- **Typensicherheit**: Verwenden Sie stets `Dictionary`, um Ihre Wörterbücher zu definieren und so Typensicherheit zu gewährleisten.
- **Aktualisierungen der Lokalisierung**: Stellen Sie bei Inhaltsaktualisierungen sicher, dass alle Sprachen konsistent sind, um fehlende Übersetzungen zu vermeiden.

Diese Dokumentation konzentriert sich auf die Integration des `useDictionary` Hooks und bietet einen optimierten Ansatz zur Verwaltung lokalisierter Inhalte, ohne auf Funktionen visueller Editoren angewiesen zu sein.
