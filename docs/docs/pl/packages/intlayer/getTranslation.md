---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentacja funkcji getTranslation | intlayer
description: Zobacz, jak używać funkcji getTranslation w pakiecie intlayer
keywords:
  - getTranslation
  - tłumaczenie
  - Intlayer
  - intlayer
  - Internacjonalizacja
  - Dokumentacja
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
    changes: Inicjalizacja historii
---

# Dokumentacja: funkcja `getTranslationContent` w `intlayer`

## Opis

Funkcja `getTranslationContent` pobiera zawartość odpowiadającą określonemu locale z zestawu konfigurowalnych treści językowych. Jeśli podany locale nie zostanie znaleziony, domyślnie zwraca zawartość dla domyślnego locale skonfigurowanego w projekcie.

## Parametry

- `languageContent: CustomizableLanguageContent<Content>`
  - **Opis**: Obiekt zawierający tłumaczenia dla różnych locale. Każdy klucz reprezentuje locale, a jego wartość to odpowiadająca zawartość.
  - **Typ**: `CustomizableLanguageContent<Content>`
    - `Content` może być dowolnym typem, domyślnie `string`.

- `locale: Locales`
  - **Opis**: Locale, dla którego ma zostać pobrana zawartość.
  - **Typ**: `Locales`

## Zwraca

- **Typ**: `Content`
- **Opis**: Zawartość odpowiadająca określonemu locale. Jeśli locale nie zostanie znalezione, zwracana jest zawartość domyślnego locale.

## Przykład użycia

### Podstawowe użycie

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Wynik: "Bonjour"
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

console.log(content); // Wynik: "Bonjour"
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

console.log(content); // Wynik: "Bonjour"
```

### Brak locale:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Wynik: "Hello" (zawartość domyślnego locale)
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

console.log(content); // Wynik: "Hello" (zawartość domyślnego locale)
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

console.log(content); // Wynik: "Hello" (zawartość domyślnego locale)
```

### Używanie niestandardowych typów zawartości:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Wynik: "Bonjour"
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

console.log(customContent.greeting); // Wynik: "Bonjour"
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

console.log(customContent.greeting); // Wynik: "Bonjour"
```

## Przypadki brzegowe

- **Nie znaleziono locale:**
  - Gdy `locale` nie zostanie znalezione w `languageContent`, funkcja zwraca zawartość dla domyślnego locale.
- **Niekompletna zawartość językowa:**
  - Jeśli locale jest zdefiniowane częściowo, funkcja nie łączy zawartości. Ściśle pobiera wartość określonego locale lub wraca do domyślnego.
- **Wymuszenie przez TypeScript:**
  - Jeśli locale w `languageContent` nie odpowiadają konfiguracji projektu, TypeScript wymusi zdefiniowanie wszystkich wymaganych locale, zapewniając, że zawartość jest kompletna i bezpieczna typowo.
