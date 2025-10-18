---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: getTranslation Funktionsdokumentation | intlayer
description: Siehe, wie die Funktion getTranslation für das intlayer-Paket verwendet wird
keywords:
  - getTranslation
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
  - getTranslation
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historie initialisiert
---

# Dokumentation: `getTranslationContent` Funktion in `intlayer`

## Beschreibung

Die Funktion `getTranslationContent` ruft den Inhalt ab, der einer bestimmten Locale aus einem Satz anpassbarer Sprachinhalte entspricht. Wenn die angegebene Locale nicht gefunden wird, gibt sie standardmäßig den Inhalt der im Projekt konfigurierten Standard-Locale zurück.

## Parameter

- `languageContent: CustomizableLanguageContent<Content>`

  - **Beschreibung**: Ein Objekt, das Übersetzungen für verschiedene Locales enthält. Jeder Schlüssel repräsentiert eine Locale, und sein Wert ist der entsprechende Inhalt.
  - **Typ**: `CustomizableLanguageContent<Content>`
    - `Content` kann ein beliebiger Typ sein, standardmäßig `string`.

- `locale: Locales`

  - **Beschreibung**: Die Locale, für die der Inhalt abgerufen werden soll.
  - **Typ**: `Locales`

## Rückgabewert

- **Typ**: `Content`
- **Beschreibung**: Der Inhalt, der der angegebenen Locale entspricht. Wenn die Locale nicht gefunden wird, wird der Inhalt der Standard-Locale zurückgegeben.

## Beispielhafte Verwendung

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

  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Ausgabe: "Bonjour"
```

### Fehlende Locale:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Ausgabe: "Hello" (Inhalt der Standard-Locale)
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

console.log(content); // Ausgabe: "Hello" (Inhalt der Standard-Locale)
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

console.log(content); // Ausgabe: "Hello" (Inhalt der Standard-Locale)
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

- **Locale nicht gefunden:**
  - Wenn die `locale` im `languageContent` nicht gefunden wird, gibt die Funktion den Inhalt der Standard-Locale zurück.
- **Unvollständiger Sprachinhalt:**
  - Wenn eine Locale nur teilweise definiert ist, werden die Inhalte nicht zusammengeführt. Es wird strikt der Wert der angegebenen Locale abgerufen oder auf die Standard-Locale zurückgegriffen.
- **TypeScript Durchsetzung:**
  - Wenn die Locales in `languageContent` nicht mit der Projektkonfiguration übereinstimmen, erzwingt TypeScript, dass alle erforderlichen Locales definiert sind, um sicherzustellen, dass der Inhalt vollständig und typensicher ist.
