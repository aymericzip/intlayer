# Dokumentation: `getPathWithoutLocale` Funktionen in `intlayer`

## Beschreibung:

Entfernt das Locale-Segment aus der gegebenen URL oder dem Pfadnamen, falls vorhanden. Es funktioniert sowohl mit absoluten URLs als auch mit relativen Pfadnamen.

## Parameter:

- `inputUrl: string`

  - **Beschreibung**: Der vollständige URL-String oder Pfadname, der verarbeitet werden soll.
  - **Typ**: `string`

- `locales: Locales[]`
  - **Beschreibung**: optionale Array von unterstützten Locales. Standardmäßig werden die im Projekt konfigurierten Locales verwendet.
  - **Typ**: `Locales[]`

## Rückgaben:

- **Typ**: `string`
- **Beschreibung**: Der URL-String oder Pfadname ohne das Locale-Segment.

## Beispielverwendung:

```typescript
import { getPathWithoutLocale } from "intlayer";

console.log(getPathWithoutLocale("/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("/{{locale}}/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("/fr/dashboard")); // Ausgabe: "/dashboard"
console.log(getPathWithoutLocale("https://example.com/{{locale}}/dashboard")); // Ausgabe: "https://example.com/dashboard"
```
