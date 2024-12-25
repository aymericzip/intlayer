# Dokumentation: `getPathWithoutLocale` Funktionen in `intlayer`

## Beschreibung:

Entfernt den Lokalisierungsabschnitt aus der angegebenen URL oder dem Pfadnamen, wenn vorhanden. Es funktioniert sowohl mit absoluten URLs als auch mit relativen Pfadnamen.

## Parameter:

- `inputUrl: string`

  - **Beschreibung**: Die vollständige URL-Zeichenfolge oder der Pfadname, der verarbeitet werden soll.
  - **Typ**: `string`

- `locales: Locales[]`
  - **Beschreibung**: Optionales Array unterstützter Lokalisierungen. Standardmäßig werden die konfigurierten Lokalisierungen im Projekt verwendet.
  - **Typ**: `Locales[]`

## Rückgaben:

- **Typ**: `string`
- **Beschreibung**: Die URL-Zeichenfolge oder der Pfadname ohne den Lokalisierungsabschnitt.

## Beispielverwendung:

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
