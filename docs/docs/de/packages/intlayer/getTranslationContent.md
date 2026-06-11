---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: getTranslation Funktion - Intlayer JavaScript Dokumentation
description: Dokumentation für die Funktion getTranslation in Intlayer, die lokalisierte Inhalte für bestimmte Sprachen mit Fallback zur Standardsprache abruft.
keywords:
  - getTranslation
  - intlayer
  - funktion
  - lokalisierung
  - i18n
  - JavaScript
  - übersetzung
  - sprache
slugs:
  - doc
  - package
  - intlayer
  - getTranslationContent
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Initiale Historie"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Dokumentation: `getTranslation` Funktion in `intlayer`

## Beschreibung

Die Funktion `getTranslation` ruft den Inhalt ab, der einer bestimmten Sprache aus einem Satz anpassbarer Sprachinhalte entspricht. Wenn die angegebene Sprache nicht gefunden wird, wird standardmäßig der Inhalt der im Projekt konfigurierten Standardsprache zurückgegeben.

## Parameter

- `languageContent: CustomizableLanguageContent<Content>`
  - **Beschreibung**: Ein Objekt, das Übersetzungen für verschiedene Sprachen enthält. Jeder Schlüssel repräsentiert eine Sprache, und dessen Wert ist der entsprechende Inhalt.
  - **Typ**: `CustomizableLanguageContent<Content>`
    - `Content` kann ein beliebiger Typ sein, standardmäßig `string`.

- `locale: Locales`
  - **Beschreibung**: Die Sprache, für die der Inhalt abgerufen werden soll.
  - **Typ**: `Locales`

## Rückgabewert

- **Typ**: `Content`
- **Beschreibung**: Der Inhalt, der der angegebenen Sprache entspricht. Wenn die Sprache nicht gefunden wird, wird der Inhalt der Standardsprache zurückgegeben.

## Beispielhafte Verwendung

### Grundlegende Verwendung

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Ausgabe: "Bonjour"
```

### Fehlende Sprache:

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Ausgabe: "Hello" (Inhalt der Standardsprache)
```

### Verwendung benutzerdefinierter Inhaltstypen:

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
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
  - Wenn die `locale` im `languageContent` nicht gefunden wird, gibt die Funktion den Inhalt der Standardsprache zurück.
- **Unvollständiger Sprachinhalt:**
  - Wenn eine Locale nur teilweise definiert ist, werden die Inhalte nicht zusammengeführt. Es wird strikt der Wert der angegebenen Locale abgerufen oder auf die Standardsprache zurückgegriffen.
- **TypeScript-Durchsetzung:**
  - Wenn die Locales in `languageContent` nicht mit der Projektkonfiguration übereinstimmen, erzwingt TypeScript, dass alle erforderlichen Locales definiert sind, um sicherzustellen, dass der Inhalt vollständig und typensicher ist.
