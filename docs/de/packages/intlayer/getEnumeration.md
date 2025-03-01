# Dokumentation: `getEnumeration` Funktion in `intlayer`

## Beschreibung

Die Funktion `getEnumeration` ruft Inhalte ab, die einer bestimmten Menge entsprechen, basierend auf vordefinierten Bedingungen in einem Enumerationsobjekt. Die Bedingungen sind als Schlüssel definiert, und ihre Priorität wird durch ihre Reihenfolge im Objekt bestimmt.

## Parameter

- `enumerationContent: QuantityContent<Content>`

  - **Beschreibung**: Ein Objekt, bei dem die Schlüssel Bedingungen darstellen (z. B. `<=`, `<`, `>=`, `=`) und die Werte den entsprechenden Inhalt repräsentieren. Die Reihenfolge der Schlüssel definiert ihre Priorität beim Abgleich.
  - **Typ**: `QuantityContent<Content>`
    - `Content` kann jeden Typ haben.

- `quantity: number`

  - **Beschreibung**: Der numerische Wert, der verwendet wird, um mit den Bedingungen in `enumerationContent` abzugleichen.
  - **Typ**: `number`

## Rückgabewerte

- **Typ**: `Content`
- **Beschreibung**: Der Inhalt, der der ersten übereinstimmenden Bedingung in `enumerationContent` entspricht. Wenn keine Übereinstimmung gefunden wird, erfolgt die Handhabung basierend auf der Implementierung (z. B. Fehler oder Fallback-Inhalt).

## Beispielverwendung

### Grundlegende Verwendung

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "Sie haben weniger als -2.3",
    "<1": "Sie haben weniger als eins",
    "2": "Sie haben zwei",
    ">=3": "Sie haben drei oder mehr",
  },
  2
);

console.log(content); // Ausgabe: "Sie haben zwei"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "Sie haben weniger als eins",
    "2": "Sie haben zwei",
    ">=3": "Sie haben drei oder mehr",
  },
  2
);

console.log(content); // Ausgabe: "Sie haben zwei"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "Sie haben weniger als eins",
    "2": "Sie haben zwei",
    ">=3": "Sie haben drei oder mehr",
  },
  2
);

console.log(content); // Ausgabe: "Sie haben zwei"
```

### Priorität der Bedingungen

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Sie haben weniger als vier",
    "2": "Sie haben zwei",
  },
  2
);

console.log(content); // Ausgabe: "Sie haben weniger als vier"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Sie haben weniger als vier",
    "2": "Sie haben zwei",
  },
  2
);

console.log(content); // Ausgabe: "Sie haben weniger als vier"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "Sie haben weniger als vier",
    "2": "Sie haben zwei",
  },
  2
);

console.log(content); // Ausgabe: "Sie haben weniger als vier"
```

## Randfälle

- **Keine übereinstimmende Bedingung:**

  - Wenn keine Bedingung mit der angegebenen Menge übereinstimmt, gibt die Funktion entweder `undefined` zurück oder behandelt das Standard-/Fallback-Szenario explizit.

- **Mehrdeutige Bedingungen:**

  - Wenn sich Bedingungen überschneiden, hat die erste übereinstimmende Bedingung (basierend auf der Objektreihenfolge) Vorrang.

- **Ungültige Schlüssel:**

  - Die Funktion geht davon aus, dass alle Schlüssel in `enumerationContent` gültig und als Bedingungen interpretierbar sind. Ungültige oder falsch formatierte Schlüssel können zu unerwartetem Verhalten führen.

- **TypeScript-Durchsetzung:**
  - Die Funktion stellt sicher, dass der `Content`-Typ über alle Schlüssel hinweg konsistent ist, was Typsicherheit für den abgerufenen Inhalt ermöglicht.

## Hinweise

- Das Dienstprogramm `findMatchingCondition` wird verwendet, um die passende Bedingung basierend auf der angegebenen Menge zu bestimmen.

[Zurück zur Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/**/*.md)
