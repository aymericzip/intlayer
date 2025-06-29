---
docName: package__intlayer__getPathWithoutLocale
url: https://intlayer.org/doc/packages/intlayer/getPathWithoutLocale
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getPathWithoutLocale.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Dokumentation der t-Funktion | intlayer
description: Erfahren Sie, wie Sie die t-Funktion für das intlayer-PakegetPathWithoutLocale verwenden
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
---

# Dokumentation: `getPathWithoutLocale` Funktionen in `intlayer`

## Beschreibung

Entfernt das Locale-Segment aus der angegebenen URL oder dem Pfadnamen, falls vorhanden. Funktioniert sowohl mit absoluten URLs als auch mit relativen Pfadnamen.

## Parameter

- `inputUrl: string`

  - **Beschreibung**: Die vollständige URL-Zeichenkette oder der zu verarbeitende Pfadname.
  - **Typ**: `string`

- `locales: Locales[]`
  - **Beschreibung**: Optionale Liste der unterstützten Locales. Standardmäßig werden die im Projekt konfigurierten Locales verwendet.
  - **Typ**: `Locales[]`

## Rückgabewerte

- **Typ**: `string`
- **Beschreibung**: Die URL-Zeichenkette oder der Pfadname ohne das Locale-Segment.

## Beispielverwendung

```typescript codeFormat="typescript"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("/de/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/de/dashboard")); // Ausgabe: "https://example.com/dashboard"
```

```javascript codeFormat="esm"
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("/de/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/de/dashboard")); // Ausgabe: "https://example.com/dashboard"
```

```javascript codeFormat="commonjs"
const { getPathWithoutLocale } = require("intlayer");

console.log(getPathWithoutLocale("/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("/de/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/de/dashboard")); // Ausgabe: "https://example.com/dashboard"
```
