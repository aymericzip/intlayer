---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Funkcja getTranslation - Dokumentacja JavaScript Intlayer
description: Dokumentacja funkcji getTranslation w Intlayer, która pobiera zlokalizowaną zawartość dla określonych lokalizacji z fallbackiem do domyślnej lokalizacji.
keywords:
  - getTranslation
  - intlayer
  - funkcja
  - lokalizacja
  - i18n
  - JavaScript
  - tłumaczenie
  - locale
slugs:
  - doc
  - package
  - intlayer
  - getTranslationContent
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Dokumentacja: Funkcja `getTranslation` w `intlayer`

## Opis

Funkcja `getTranslation` pobiera zawartość odpowiadającą określonej lokalizacji z zestawu konfigurowalnej zawartości językowej. Jeśli podana lokalizacja nie zostanie znaleziona, domyślnie zwracana jest zawartość dla domyślnej lokalizacji skonfigurowanej w projekcie.

## Parametry

- `languageContent: CustomizableLanguageContent<Content>`
  - **Opis**: Obiekt zawierający tłumaczenia dla różnych lokalizacji. Każdy klucz reprezentuje lokalizację, a jego wartość to odpowiadająca zawartość.
  - **Typ**: `CustomizableLanguageContent<Content>`
    - `Content` może być dowolnym typem, domyślnie `string`.

- `locale: Locales`
  - **Opis**: Lokalizacja, dla której ma zostać pobrana zawartość.
  - **Typ**: `Locales`

## Zwraca

- **Typ**: `Content`
- **Opis**: Zawartość odpowiadająca określonej lokalizacji. Jeśli lokalizacja nie zostanie znaleziona, zwracana jest zawartość domyślnej lokalizacji.

## Przykład użycia

### Podstawowe użycie

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Wynik: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Wynik: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Wynik: "Bonjour"
```

### Brak lokalizacji:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Wynik: "Hello" (zawartość domyślnej lokalizacji)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Wynik: "Hello" (zawartość domyślnej lokalizacji)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Wynik: "Hello" (zawartość domyślnej lokalizacji)
```

### Używanie niestandardowych typów zawartości:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Wynik: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Wynik: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Wynik: "Bonjour"
```

## Przypadki brzegowe

- **Nie znaleziono lokalizacji:**
  - Gdy `locale` nie zostanie znalezione w `languageContent`, funkcja zwraca zawartość dla domyślnej lokalizacji.
- **Niekompletna zawartość językowa:**
  - Jeśli lokalizacja jest częściowo zdefiniowana, funkcja nie łączy zawartości. Ściśle pobiera wartość określonej lokalizacji lub przełącza się na domyślną.
- **Wymuszanie w TypeScript:**
  - Jeśli lokalizacje w `languageContent` nie będą zgodne z konfiguracją projektu, TypeScript wymusi zdefiniowanie wszystkich wymaganych lokalizacji, zapewniając, że zawartość jest kompletna i bezpieczna typowo.
