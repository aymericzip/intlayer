# Dokumentation: `getTranslationContent` Funktion in `intlayer`

## Beschreibung

Die Funktion `getTranslationContent` ruft den Inhalt ab, der einer bestimmten Sprache aus einem Satz anpassbarer Sprachinhalte entspricht. Wenn die angegebene Sprache nicht gefunden wird, wird standardmäßig der Inhalt für die im Projekt konfigurierte Standardsprache zurückgegeben.

## Parameter

- `languageContent: CustomizableLanguageContent<Content>`

  - **Beschreibung**: Ein Objekt, das Übersetzungen für verschiedene Sprachen enthält. Jeder Schlüssel repräsentiert eine Sprache, und sein Wert ist der entsprechende Inhalt.
  - **Typ**: `CustomizableLanguageContent<Content>`
    - `Content` kann jeder Typ sein, standardmäßig `string`.

- `locale: Locales`

  - **Beschreibung**: Die Sprache, für die der Inhalt abgerufen werden soll.
  - **Typ**: `Locales`

## Rückgabewerte

- **Typ**: `Content`
- **Beschreibung**: Der Inhalt, der der angegebenen Sprache entspricht. Wenn die Sprache nicht gefunden wird, wird der Inhalt der Standardsprache zurückgegeben.

## Beispielverwendung

### Grundlegende Verwendung

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Ausgabe: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Ausgabe: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Ausgabe: "Bonjour"
```

### Fehlende Sprache:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Ausgabe: "Hello" (Standardsprachinhalt)
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Ausgabe: "Hello" (Standardsprachinhalt)
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Ausgabe: "Hello" (Standardsprachinhalt)
```

### Verwendung benutzerdefinierter Inhaltstypen:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Ausgabe: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Ausgabe: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Ausgabe: "Bonjour"
```

## Randfälle

- **Sprache nicht gefunden:**
  - Wenn die `locale` nicht in `languageContent` gefunden wird, gibt die Funktion den Inhalt für die Standardsprache zurück.
- **Unvollständiger Sprachinhalt:**
  - Wenn eine Sprache nur teilweise definiert ist, führt die Funktion keine Zusammenführung der Inhalte durch. Sie ruft strikt den Wert der angegebenen Sprache ab oder fällt auf die Standardsprache zurück.
- **TypeScript-Durchsetzung:**
  - Wenn die Sprachen in `languageContent` nicht mit der Projektkonfiguration übereinstimmen, erzwingt TypeScript, dass alle erforderlichen Sprachen definiert werden, um sicherzustellen, dass der Inhalt vollständig und typensicher ist.
