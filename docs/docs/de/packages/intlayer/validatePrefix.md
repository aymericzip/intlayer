---
createdAt: 2026-01-21
updatedAt: 2026-09-27
priority: 5
title: Dokumentation der validatePrefix-Funktion | intlayer
description: "Nutzen Sie validatePrefix, um zu prüfen, ob ein URL-Segment laut Ihrer Intlayer-Konfiguration ein gültiges Locale-Präfix ist."
keywords:
  - validatePrefix
  - Übersetzung
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - intlayer
  - validatePrefix
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "Dokumentation initialisiert"
author: aymericzip
---

# Dokumentation der validatePrefix-Funktion

Die Funktion `validatePrefix` prüft, ob ein angegebener Präfix gemäß der Konfiguration ein gültiger Locale-Präfix ist.

## Verwendung

```ts
import { validatePrefix } from "intlayer";

const isValid = validatePrefix("/fr");

// Ausgabe: true
```

## Parameter

| Parameter | Typ      | Beschreibung                |
| --------- | -------- | --------------------------- |
| `prefix`  | `string` | Das zu validierende Präfix. |

## Rückgabewert

`true`, wenn das Präfix gültig ist, ansonsten `false`.
