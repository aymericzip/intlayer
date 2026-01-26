---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: getLocale-Funktionsdokumentation | intlayer
description: Anleitung zur Verwendung der Funktion getLocale des intlayer-Pakets
keywords:
  - getLocale
  - Übersetzung
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - intlayer
  - getLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentation initialisiert
---

# getLocale-Funktionsdokumentation

Die Funktion `getLocale` ermöglicht das Ermitteln der Locale aus einer gegebenen Zeichenfolge, z. B. einer URL oder einem Pfad.

## Verwendung

```ts
import { getLocale } from "intlayer";

const locale = getLocale("/fr/about");

// Ausgabe: 'fr'
```

## Parameter

| Parameter | Typ      | Beschreibung                                                        |
| --------- | -------- | ------------------------------------------------------------------- |
| `path`    | `string` | Der Pfad oder die Zeichenfolge, aus der die Locale extrahiert wird. |

## Rückgabewert

Die erkannte Locale oder die Standard-Locale, falls keine Locale erkannt wurde.
