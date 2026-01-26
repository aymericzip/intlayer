---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentation des useIntlayer-Hooks | solid-intlayer
description: Anleitung zur Verwendung des useIntlayer-Hooks im solid-intlayer-Paket
keywords:
  - useIntlayer
  - Wörterbuch
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useIntlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Einheitliche Dokumentation für alle Exporte
---

# useIntlayer-Hook-Dokumentation

Der `useIntlayer`-Hook ermöglicht es, lokalisierten Inhalt aus einem Wörterbuch über dessen Schlüssel abzurufen. In Solid gibt dieser Hook eine reaktive **Accessor**-Funktion zurück, die sich aktualisiert, sobald sich die Locale ändert.

## Verwendung

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my_dictionary_key");

  return (
    <div>
      <h1>{content().title}</h1>
      <p>{content().description}</p>
    </div>
  );
};
```

## Beschreibung

Der Hook führt die folgenden Aufgaben aus:

1. **Locale-Erkennung**: Er verwendet die aktuelle locale aus dem `IntlayerProvider`-Kontext.
2. **Wörterbuch-Injektion**: Er injiziert automatisch den Inhalt des Wörterbuchs, das dem angegebenen Schlüssel entspricht, unter Verwendung der vom Intlayer-Compiler generierten optimierten Deklarationen.
3. **Reaktivität**: Er gibt einen Solid-Accessor (`Accessor<T>`) zurück, der sich automatisch neu auswertet, wenn sich der globale locale-Zustand ändert.
4. **Übersetzungsverarbeitung**: Es löst den Inhalt basierend auf der erkannten locale auf und verarbeitet dabei alle im Wörterbuch gefundenen Definitionen wie `t()`, `enu()` usw.

## Parameter

- **key**: Der eindeutige Schlüssel des Wörterbuchs (wie in deinen content declaration files definiert).
- **locale** (optional): Überschreibt die aktuelle locale.

## Rückgabewert

Eine Accessor-Funktion (`() => Content`), die den lokalisierten Inhalt zurückgibt.
