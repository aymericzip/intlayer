# Dokumentation: `getTranslationContent` Funktion in `intlayer`

## Beschreibung:

Die `getTranslationContent` Funktion ruft den Inhalt ab, der einem bestimmten Locale aus einer Menge an anpassbarem Sprachinhalt entspricht. Wenn das angegebene Locale nicht gefunden wird, wird standardmäßig der Inhalt für das im Projekt konfigurierte Standardsprache zurückgegeben.

## Parameter:

- `languageContent: CustomizableLanguageContent<Content>`

  - **Beschreibung**: Ein Objekt, das Übersetzungen für verschiedene Locales enthält. Jeder Schlüssel repräsentiert ein Locale, und sein Wert ist der entsprechende Inhalt.
  - **Typ**: `CustomizableLanguageContent<Content>`
    - `Content` kann beliebigen Typs sein, standardmäßig auf `string`.

- `locale: Locales`

  - **Beschreibung**: Das Locale, für das der Inhalt abgerufen werden soll.
  - **Typ**: `Locales`

## Rückgaben:

- **Typ**: `Content`
- **Beschreibung**: Der Inhalt, der dem angegebenen Locale entspricht. Wenn das Locale nicht gefunden wird, wird der Inhalt des Standardsprache zurückgegeben.

## Beispielverwendung:

### Grundlegende Verwendung:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    de: "Hallo",
    fr: "Bonjour",
  },
  Locales.GERMAN
);

console.log(content); // Ausgabe: "Bonjour"
```

### Fehlendes Locale:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    de: "Hallo",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Ausgabe: "Hello" (Inhalt der Standardsprache)
```

### Verwendung von benutzerdefinierten Inhaltstypen:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    de: { greeting: "Hallo" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Ausgabe: "Bonjour"
```

## Randfälle:

- **Locale nicht gefunden:**
  - Wenn das `locale` im `languageContent` nicht gefunden wird, gibt die Funktion den Inhalt für die Standardsprache zurück.
- **Unvollständiger Sprachinhalt:**

  - Wenn ein Locale teilweise definiert ist, merges die Funktion keine Inhalte. Sie ruft strikt den Wert des angegebenen Locales ab oder fällt auf den Standard zurück.

- **TypeScript-Durchsetzung:**
  - Wenn die Locales im `languageContent` nicht mit der Projektkonfiguration übereinstimmen, wird TypeScript alle erforderlichen Locales durchsetzen, damit sichergestellt ist, dass der Inhalt vollständig und typensicher ist.
