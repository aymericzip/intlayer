---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getPathWithoutLocale Funktionsdokumentation | intlayer
description: Sehen Sie, wie die Funktion getPathWithoutLocale für das intlayer-Paket verwendet wird
keywords:
  - getPathWithoutLocale
  - Übersetzung
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getPathWithoutLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Initiale Historie
---

# Dokumentation: `getPathWithoutLocale` Funktionen in `intlayer`

## Beschreibung

Entfernt das Locale-Segment aus der angegebenen URL oder dem Pfadnamen, falls vorhanden. Funktioniert sowohl mit absoluten URLs als auch mit relativen Pfadnamen.

## Parameter

- `inputUrl: string`

  - **Beschreibung**: Der vollständige URL-String oder Pfadname, der verarbeitet werden soll.
  - **Typ**: `string`

- `locales: Locales[]`
  - **Beschreibung**: Optionale Liste der unterstützten Sprachen. Standardmäßig die im Projekt konfigurierten Sprachen.
  - **Typ**: `Locales[]`

## Rückgabewert

- **Typ**: `string`
- **Beschreibung**: Der URL-String oder Pfadname ohne das Locale-Segment.

## Beispielhafte Verwendung

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Ausgabe: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Ausgabe: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("/en/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/en/dashboard")); // Ausgabe: "https://example.com/dashboard"
```
