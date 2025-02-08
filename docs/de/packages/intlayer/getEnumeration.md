# Dokumentation: `getEnumeration` Funktion in `intlayer`

## Beschreibung:

Die `getEnumeration` Funktion ruft Inhalte ab, die einer bestimmten Menge basierend auf vordefinierten Bedingungen in einem Aufzählungsobjekt entsprechen. Die Bedingungen sind als Schlüssel definiert, und ihre Priorität wird durch ihre Reihenfolge im Objekt bestimmt.

## Parameter:

- `enumerationContent: QuantityContent<Content>`

  - **Beschreibung**: Ein Objekt, in dem Schlüssel Bedingungen darstellen (z.B. `<=`, `<`, `>=`, `=`) und die Werte den entsprechenden Inhalt repräsentieren. Die Reihenfolge der Schlüssel definiert ihre Übereinstimmungspriorität.
  - **Typ**: `QuantityContent<Content>`
    - `Content` kann jeden Typ haben.

- `quantity: number`

  - **Beschreibung**: Der numerische Wert, der verwendet wird, um mit den Bedingungen in `enumerationContent` abzugleichen.
  - **Typ**: `number`

## Rückgaben:

- **Typ**: `Content`
- **Beschreibung**: Der Inhalt, der der ersten passenden Bedingung in `enumerationContent` entspricht. Wenn keine Übereinstimmung gefunden wird, wird standardmäßig auf die Implementierung zurückgegriffen (z.B. Fehler oder Fallback-Inhalt).

## Beispielverwendung:

### Grundlegende Verwendung:

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

### Priorität der Bedingungen:

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

## Randfälle:

- **Keine passende Bedingung:**

  - Wenn keine Bedingung mit der angegebenen Menge übereinstimmt, wird die Funktion entweder `undefined` zurückgeben oder das Standard-/Fallback-Szenario explizit behandeln.

- **Mehrdeutige Bedingungen:**

  - Wenn Bedingungen sich überschneiden, hat die erste passende Bedingung (basierend auf der Objektreihenfolge) Vorrang.

- **Ungültige Schlüssel:**

  - Die Funktion geht davon aus, dass alle Schlüssel in `enumerationContent` gültig und als Bedingungen analysierbar sind. Ungültige oder schlecht formatierte Schlüssel können zu unerwartetem Verhalten führen.

- **TypeScript Durchsetzung:**
  - Die Funktion sorgt dafür, dass der `Content`-Typ über alle Schlüssel hinweg konsistent ist, was Typensicherheit im abgerufenen Inhalt gewährleistet.

## Hinweise:

- Die `findMatchingCondition`-Hilfsfunktion wird verwendet, um die geeignete Bedingung basierend auf der angegebenen Menge zu bestimmen.
