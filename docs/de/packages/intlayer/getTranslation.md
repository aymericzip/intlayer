# Dokumentation: `getTranslation` Funktion in `intlayer`

## Beschreibung:

Die `getTranslation` Funktion ruft den Inhalt ab, der einem bestimmten Locale aus einer Reihe von anpassbaren Sprachinhalten entspricht. Wenn das angegebene Locale nicht gefunden wird, gibt es standardmäßig den Inhalt für das im Projekt konfigurierte Standardlocale zurück.

## Parameter:

- `languageContent: CustomizableLanguageContent<Content>`

  - **Beschreibung**: Ein Objekt, das Übersetzungen für verschiedene Locales enthält. Jeder Schlüssel repräsentiert ein Locale, und sein Wert ist der entsprechende Inhalt.
  - **Typ**: `CustomizableLanguageContent<Content>`
    - `Content` kann jeden Typ haben, standardmäßig auf `string` festgelegt.

- `locale: Locales`

  - **Beschreibung**: Das Locale, für das der Inhalt abgerufen werden soll.
  - **Typ**: `Locales`

## Rückgaben:

- **Typ**: `Content`
- **Beschreibung**: Der Inhalt, der dem angegebenen Locale entspricht. Wenn das Locale nicht gefunden wird, wird der Inhalt des Standardlocales zurückgegeben.

## Beispielverwendung:

### Grundlegende Verwendung:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    de: "Hallo",
    fr: "Bonjour",
  },
  Locales.GERMAN
);

console.log(content); // Ausgabe: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    de: "Hallo",
    fr: "Bonjour",
  },
  Locales.GERMAN
);

console.log(content); // Ausgabe: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    de: "Hallo",
    fr: "Bonjour",
  },
  Locales.GERMAN
);

console.log(content); // Ausgabe: "Bonjour"
```

### Fehlendes Locale:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    de: "Hallo",
    fr: "Bonjour",
  },
  Locales.SPANISCH
);

console.log(content); // Ausgabe: "Hallo" (Inhalt des Standardlocales)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    de: "Hallo",
    fr: "Bonjour",
  },
  Locales.SPANISCH
);

console.log(content); // Ausgabe: "Hallo" (Inhalt des Standardlocales)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    de: "Hallo",
    fr: "Bonjour",
  },
  Locales.SPANISCH
);

console.log(content); // Ausgabe: "Hallo" (Inhalt des Standardlocales)
```

### Verwendung benutzerdefinierter Inhaltstypen:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    de: { greeting: "Hallo" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRANZÖSISCH
);

console.log(customContent.greeting); // Ausgabe: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    de: { greeting: "Hallo" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRANZÖSISCH
);

console.log(customContent.greeting); // Ausgabe: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
  {
    de: { greeting: "Hallo" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRANZÖSISCH
);

console.log(customContent.greeting); // Ausgabe: "Bonjour"
```

## Randfälle:

- **Locale nicht gefunden:**
  - Wenn das `locale` nicht im `languageContent` gefunden wird, gibt die Funktion den Inhalt des Standardlocales zurück.
- **Unvollständiger Sprachinhalt:**

  - Wenn ein Locale teilweise definiert ist, wird der Inhalt nicht zusammengeführt. Es wird streng der Wert des angegebenen Locales abgerufen oder auf das Standardlocale zurückgegriffen.

- **TypeScript-Durchsetzung:**
  - Wenn die Locales im `languageContent` nicht mit der Projektkonfiguration übereinstimmen, wird TypeScript die Definition aller erforderlichen Locales erzwingen, um sicherzustellen, dass der Inhalt vollständig und Typsicher ist.
