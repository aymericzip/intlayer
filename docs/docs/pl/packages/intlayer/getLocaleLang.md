---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentacja funkcji getLocaleLang | intlayer
description: Zobacz, jak używać funkcji getLocaleLang w pakiecie intlayer
keywords:
  - getLocaleLang
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
  - getLocaleLang
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Dokumentacja: funkcja `getLocaleLang` w `intlayer`

## Opis

Funkcja `getLocaleLang` wyodrębnia kod języka z ciągu lokalizacji (locale). Obsługuje lokalizacje z kodami krajów lub bez nich. Jeśli lokalizacja nie zostanie podana, domyślnie zwraca pusty ciąg znaków.

## Parametry

- `locale?: Locales`
  - **Opis**: Ciąg lokalizacji (np. `Locales.ENGLISH_UNITED_STATES`, `Locales.FRENCH_CANADA`), z którego wyodrębniany jest kod języka.
  - **Typ**: `Locales` (opcjonalny)

## Zwracana wartość

- **Typ**: `string`
- **Opis**: Kod języka wyodrębniony z lokalizacji. Jeśli lokalizacja nie zostanie podana, zwraca pusty ciąg znaków (`''`).

## Przykład użycia

### Wyodrębnianie kodów języków:

```typescript codeFormat="typescript"
import { getLocaleLang, Locales } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Wynik: "en"
getLocaleLang(Locales.ENGLISH); // Wynik: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Wynik: "fr"
getLocaleLang(Locales.FRENCH); // Wynik: "fr"
```

```javascript codeFormat="esm"
import { getLocaleLang } from "intlayer";

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Wynik: "en"
getLocaleLang(Locales.ENGLISH); // Wynik: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Wynik: "fr"
getLocaleLang(Locales.FRENCH); // Wynik: "fr"
```

```javascript codeFormat="commonjs"
const { getLocaleLang } = require("intlayer");

getLocaleLang(Locales.ENGLISH_UNITED_STATES); // Wynik: "en"
getLocaleLang(Locales.ENGLISH); // Wynik: "en"
getLocaleLang(Locales.FRENCH_CANADA); // Wynik: "fr"
getLocaleLang(Locales.FRENCH); // Wynik: "fr"
```

## Przypadki brzegowe

- **Brak podanej lokalizacji:**
  - Funkcja zwraca pusty ciąg znaków, gdy `locale` jest `undefined`.

- **Niepoprawne ciągi lokalizacji:**
  - Jeśli `locale` nie jest zgodne z formatem `language-country` (np. `Locales.ENGLISH-US`), funkcja bezpiecznie zwraca część przed `'-'` lub cały ciąg znaków, jeśli `'-'` nie występuje.
