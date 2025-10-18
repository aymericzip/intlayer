---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Dokumentation der Funktion getEnumeration | intlayer
description: Siehe, wie die Funktion getEnumeration für das intlayer-Paket verwendet wird
keywords:
  - getEnumeration
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
  - getEnumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Initiale Historie
---

# Dokumentation: Funktion `getEnumeration` in `intlayer`

## Beschreibung

Die Funktion `getEnumeration` ruft Inhalte ab, die einer bestimmten Menge entsprechen, basierend auf vordefinierten Bedingungen in einem Enumerationsobjekt. Die Bedingungen sind als Schlüssel definiert, und ihre Priorität wird durch ihre Reihenfolge im Objekt bestimmt.

## Parameter

- `enumerationContent: QuantityContent<Content>`

  - **Beschreibung**: Ein Objekt, bei dem die Schlüssel Bedingungen darstellen (z. B. `<=`, `<`, `>=`, `=`) und die Werte den entsprechenden Inhalt repräsentieren. Die Reihenfolge der Schlüssel definiert die Priorität der Übereinstimmung.
  - **Typ**: `QuantityContent<Content>`
    - `Content` kann jeden Typ haben.

- `quantity: number`

  - **Beschreibung**: Der numerische Wert, der verwendet wird, um die Bedingungen in `enumerationContent` abzugleichen.
  - **Typ**: `number`

## Rückgabewert

- **Typ**: `Content`
- **Beschreibung**: Der Inhalt, der der ersten passenden Bedingung im `enumerationContent` entspricht. Wenn keine Übereinstimmung gefunden wird, erfolgt die Behandlung entsprechend der Implementierung (z. B. Fehler oder Ersatzinhalt).

## Beispielhafte Verwendung

### Grundlegende Verwendung

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "Du hast weniger als -2.3",
    "<1": "Du hast weniger als eins",
    "2": "Du hast zwei",
    ">=3": "Du hast drei oder mehr",
  },
  2
);

console.log(content); // Ausgabe: "Du hast zwei"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "Du hast weniger als eins",
    "2": "Du hast zwei",
    ">=3": "Du hast drei oder mehr",
  },
  2
);

console.log(content); // Ausgabe: "Du hast zwei"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "Du hast weniger als eins",
    "2": "Du hast zwei",
    ">=3": "Du hast drei oder mehr",
  },
  2
);

console.log(content); // Ausgabe: "Du hast zwei"
```

### Priorität der Bedingungen

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Du hast weniger als vier",
    "2": "Du hast zwei",
  },
  2
);

console.log(content); // Ausgabe: "Du hast weniger als vier"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Du hast weniger als vier",
    "2": "Du hast zwei",
  },
  2
);

console.log(content); // Ausgabe: "Du hast weniger als vier"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "Du hast weniger als vier",
    "2": "Du hast zwei",
  },
  2
);

console.log(content); // Ausgabe: "Du hast weniger als vier"
```

## Randfälle

- **Keine passende Bedingung:**

  - Wenn keine Bedingung mit der angegebenen Menge übereinstimmt, gibt die Funktion entweder `undefined` zurück oder behandelt das Standard-/Fallback-Szenario explizit.

- **Mehrdeutige Bedingungen:**

  - Wenn Bedingungen sich überschneiden, hat die erste passende Bedingung (basierend auf der Reihenfolge im Objekt) Vorrang.

- **Ungültige Schlüssel:**

  - Die Funktion geht davon aus, dass alle Schlüssel in `enumerationContent` gültig und als Bedingungen interpretierbar sind. Ungültige oder falsch formatierte Schlüssel können zu unerwartetem Verhalten führen.

- **TypeScript-Überprüfung:**
  - Die Funktion stellt sicher, dass der `Content`-Typ über alle Schlüssel hinweg konsistent ist, was die Typensicherheit beim Abrufen des Inhalts gewährleistet.

## Hinweise

- Das Hilfsprogramm `findMatchingCondition` wird verwendet, um die passende Bedingung basierend auf der angegebenen Menge zu ermitteln.
