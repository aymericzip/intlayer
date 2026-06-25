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

## Parameter

Der Hook akzeptiert zwei Parameter:

1. **`dictionary`**: Ein deklariertes Wörterbuchobjekt, das lokalisierte Inhalte für bestimmte Schlüssel enthält.
2. **`locale`** (optional): Die gewünschte Locale. Standardmäßig wird die Locale des aktuellen Kontexts verwendet, wenn keine angegeben ist.

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
